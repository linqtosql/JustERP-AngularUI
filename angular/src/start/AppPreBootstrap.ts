import * as moment from 'moment';
import { AppConsts } from '../app/shared/AppConsts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { environment } from '../environments/environment';

export class AppPreBootstrap {

    //App Startup function
    static run(callback: () => void): void {
        // for ajax request authorization
        $(document).ajaxSend((event, request, settings) => {
            if (!settings.url.startsWith('http://')) {
                settings.url = AppConsts.remoteServiceBaseUrl + settings.url;
            }
            request.setRequestHeader("Authorization", "Bearer " + abp.auth.getToken());
        });
        // Init Application Config
        AppPreBootstrap.getApplicationConfig(() => {
            // Init User Configration
            AppPreBootstrap.getUserConfiguration(callback);
        });
    }

    // Bootstrap App
    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(callback: () => void) {
        AppConsts.appBaseUrl = environment.appBaseUrl;
        AppConsts.remoteServiceBaseUrl = environment.remoteServiceBaseUrl;
        callback();
    }

    private static getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
        if (currentProviderName === "unspecifiedClockProvider") {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === "utcClockProvider") {
            return abp.timing.utcClockProvider;
        }

        return abp.timing.localClockProvider;
    }

    private static getUserConfiguration(callback: () => void): JQueryPromise<any> {
        return abp.ajax({
            url: AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll',
            method: 'GET',
            headers: {
                '.AspNetCore.Culture': abp.utils.getCookieValue("Abp.Localization.CultureName"),
                'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
            }
        }).done(result => {
            $.extend(true, abp, result);

            abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

            moment.locale(abp.localization.currentLanguage.name);

            if (abp.clock.provider.supportsMultipleTimezone) {
                moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
            }

            callback();
        });
    }
}