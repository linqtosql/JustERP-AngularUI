import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { LayoutModule } from '@app/layout/metronic/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBodyComponent } from './app-body.component';

import { AbpModule } from '@abp/abp.module';
import { ScriptLoaderService } from '@shared/services/script-loader.service';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { MaterialInput } from '@shared/directives/material-input.directive';

@NgModule({
    declarations: [
        AppComponent,
        AppBodyComponent,
        HomeComponent,
        AboutComponent,
        TenantsComponent,
        CreateTenantComponent,
        EditTenantComponent,
        UsersComponent,
        CreateUserComponent,
        EditUserComponent,
        RolesComponent,
        CreateRoleComponent,
        EditRoleComponent,
        TopBarLanguageSwitchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        LayoutModule,
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule
    ],
    providers: [
        ScriptLoaderService
    ]
})
export class AppModule { }
