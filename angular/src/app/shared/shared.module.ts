import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';

import { AppSessionService } from './services/app-session.service';
import { AppUrlService } from './services/nav/app-url.service';
import { AppAuthService } from './services/auth/app-auth.service';
import { AppRouteGuard } from './services/auth/auth-route-guard';

import { MDatatableComponent } from './components/plugins/m-datatable/m-datatable.component';
import { MJsTreeComponent } from './components/plugins/m-jstree/m-jstree.component';

@NgModule({
    declarations: [
        MDatatableComponent,
        MJsTreeComponent
    ],
    exports: [
        MDatatableComponent,
        MJsTreeComponent
    ],
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
