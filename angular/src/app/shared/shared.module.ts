import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';

import { AppSessionService } from './services/app-session.service';
import { AppUrlService } from './services/nav/app-url.service';
import { AppAuthService } from './services/auth/app-auth.service';
import { AppRouteGuard } from './services/auth/auth-route-guard';

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule,
        LayoutModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}
