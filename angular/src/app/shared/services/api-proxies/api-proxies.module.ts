import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ApiProxiesComponent from './api-proxies.component';

@NgModule({
  providers: [
    ApiProxiesComponent.RoleServiceProxy,
    ApiProxiesComponent.SessionServiceProxy,
    ApiProxiesComponent.TenantServiceProxy,
    ApiProxiesComponent.UserServiceProxy,
    ApiProxiesComponent.TokenAuthServiceProxy,
    ApiProxiesComponent.AccountServiceProxy,
    ApiProxiesComponent.ConfigurationServiceProxy,
    ApiProxiesComponent.OrganizationUnitServiceProxy,
    ApiProxiesComponent.AuditLogServiceProxy
  ]
})
export class ApiProxiesModule { }
