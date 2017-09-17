import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";
import { AuditLogComponent } from "./auditlog/auditlog.component";
import { DemoComponent } from "@app/demo/demo.component";
import { FormDemoComponent } from "@app/demo/form-demo-component"

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                children: [
                    { path: 'home', component: HomeComponent },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' } },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' } },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' } },
                    { path: 'about', component: AboutComponent },
                    { path: 'auditlogs', component: AuditLogComponent },
                    { path: 'demo', component: DemoComponent },
                    { path: 'dynamicform', component: FormDemoComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
