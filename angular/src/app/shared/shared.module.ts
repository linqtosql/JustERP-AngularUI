import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';

import { AppSessionService } from './services/app-session.service';
import { AppUrlService } from './services/nav/app-url.service';
import { AppAuthService } from './services/auth/app-auth.service';
import { AppRouteGuard } from './services/auth/auth-route-guard';

import { MDatatableComponent } from './components/plugins/m-datatable/m-datatable.component';
import { MJsTreeComponent } from './components/plugins/m-jstree/m-jstree.component';
import { SelectUserComponent } from "./components/widgets/select-user/select-user.component";

@NgModule({
    declarations: [
        MDatatableComponent,
        MJsTreeComponent,
        SelectUserComponent
    ],
    exports: [
        MDatatableComponent,
        MJsTreeComponent,
        SelectUserComponent
    ],
    imports: [
        CommonModule,
        ModalModule,
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
