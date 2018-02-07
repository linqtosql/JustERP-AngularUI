import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

import { LayoutModule } from './shared/components/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBodyComponent } from './app-body/app-body.component';

import { AbpModule } from '@abp/abp.module';
import { ResourceLoaderService } from './shared/services/resources-loader/resources-loader.service';

import { ApiProxiesModule } from './shared/services/api-proxies/api-proxies.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from "./users/users.module";

import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { TenantsComponent } from './tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizationunitsComponent } from './organizationunits/organizationunits.component';
import { CreateOunitComponent } from './organizationunits/create-ounit/create-ounit.component';
import { AuditlogsComponent } from './auditlogs/auditlogs.component';

@NgModule({
    declarations: [
        AppComponent,
        AppBodyComponent,
        HomeComponent,
        TenantsComponent,
        CreateTenantComponent,
        RolesComponent,
        CreateRoleComponent,
        NotFoundComponent,
        OrganizationunitsComponent,
        CreateOunitComponent,
        AuditlogsComponent
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
        ApiProxiesModule,
        SharedModule,
        UsersModule
    ],
    providers: [
        ResourceLoaderService
    ]
})
export class AppModule { }
