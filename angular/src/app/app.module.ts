import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

import { LayoutModule } from '@app/layout/metronic/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBodyComponent } from './app-body.component';

import { AbpModule } from '@abp/abp.module';
import { ResourceLoaderService } from '@shared/services/resources-loader.service';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizationunitsComponent } from './organizationunits/organizationunits.component';
import { CreateOunitComponent } from './organizationunits/create-ounit/create-ounit.component';
import { MDatatableComponent } from './shared/m-datatable/m-datatable.component';

@NgModule({
    declarations: [
        AppComponent,
        AppBodyComponent,
        HomeComponent,
        TenantsComponent,
        CreateTenantComponent,
        UsersComponent,
        CreateUserComponent,
        RolesComponent,
        CreateRoleComponent,
        TopBarLanguageSwitchComponent,
        NotFoundComponent,
        OrganizationunitsComponent,
        CreateOunitComponent,
        MDatatableComponent
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
        SharedModule
    ],
    providers: [
        ResourceLoaderService
    ]
})
export class AppModule { }
