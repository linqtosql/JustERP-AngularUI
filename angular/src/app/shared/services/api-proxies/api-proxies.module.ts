import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
    ApiProxies.AuditLogServiceProxy
  ]
})
export class ApiProxiesModule { }
