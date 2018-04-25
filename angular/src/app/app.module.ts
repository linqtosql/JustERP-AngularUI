import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

import { LayoutModule } from './shared/components/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';
import { ResourceLoaderService } from './shared/services/resources-loader/resources-loader.service';

import { ApiProxiesModule } from './shared/services/api-proxies/api-proxies.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from "./users/users.module";
import { TenantsModule } from "./tenants/tenants.module";
import { RolesModule } from "./roles/roles.module";
import { OrganizationUnitsModule } from "./organizationunits/organizationunits.module";
import { AuditLogsModule } from "./auditlogs/auditlogs.module";
import { LanguagesModule } from "./languages/languages.module";
import { HomeModule } from "./home/home.module";
import { NotFoundModule } from "./not-found/not-found.module";

@NgModule({
    declarations: [
        AppComponent
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
        HomeModule,
        NotFoundModule,
        UsersModule,
        TenantsModule,
        RolesModule,
        OrganizationUnitsModule,
        AuditLogsModule,
        LanguagesModule
    ],
    providers: [
        ResourceLoaderService
    ]
})
export class AppModule { }
