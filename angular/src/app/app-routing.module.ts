import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppBodyComponent } from "./app-body.component";
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";
import { OrganizationunitsComponent } from "./organizationunits/organizationunits.component";
import { AuditlogsComponent } from './auditlogs/auditlogs.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        component: AppBodyComponent,
                        children: [
                            { path: 'home', component: HomeComponent },
                            { path: 'organizationunits', component: OrganizationunitsComponent, data: { permission: 'Pages.OrganizationUnits' } },
                            { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' } },
                            { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' } },
                            { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' } },
                            { path: 'auditlogs', component: AuditlogsComponent, data: { permission: 'Pages.AuditLogs' } },
                            { path: '404', component: NotFoundComponent }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }