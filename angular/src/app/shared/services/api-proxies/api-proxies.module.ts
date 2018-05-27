import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import * as ApiProxies from "./api-proxies";

@NgModule({
  providers: [
    ApiProxies.RoleServiceProxy,
    ApiProxies.SessionServiceProxy,
    ApiProxies.TenantServiceProxy,
    ApiProxies.UserServiceProxy,
    ApiProxies.TokenAuthServiceProxy,
    ApiProxies.AccountServiceProxy,
    ApiProxies.ConfigurationServiceProxy,
    ApiProxies.OrganizationUnitServiceProxy,
    ApiProxies.AuditLogServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
  ]
})
export class ApiProxiesModule { }
