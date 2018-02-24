import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { SharedModule } from '../app/shared/shared.module';
import { ApiProxiesModule } from '../app/shared/services/api-proxies/api-proxies.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '../app/shared/AppConsts';
import { AppSessionService } from '../app/shared/services/app-session.service';
import { API_BASE_URL } from '../app/shared/services/api-proxies/api-proxies';

import { LayoutModule } from '../app/shared/components/layout/layout.module';
import { RootComponent } from './root.component';
import { AppPreBootstrap } from './AppPreBootstrap';
import { ModalModule } from 'ngx-bootstrap';


export function appInitializerFactory(injector: Injector) {
  return () => {

    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
        var appSessionService: AppSessionService = injector.get(AppSessionService);
        appSessionService.init().then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
  return abp.localization.currentLanguage.name;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    AbpModule,
    LayoutModule,
    ApiProxiesModule,
    RootRoutingModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    ABP_HTTP_PROVIDER,//ABP Http Provider
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },//API Base Url Provider
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,//App Initializer Factory
      deps: [Injector],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage
    }
  ],
  bootstrap: [RootComponent]
})
export class RootModule {

}
