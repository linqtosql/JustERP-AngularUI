import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppBodyComponent } from "./app-body/app-body.component";
import { AppRouteGuard } from './shared/services/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
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
                            { path: 'organizationunits', loadChildren: "./organizationunits/organizationunits.module#OrganizationUnitsModule", data: { permission: 'Pages.OrganizationUnits' } },
                            { path: 'users', loadChildren: "./users/users.module#UsersModule", data: { permission: 'Pages.Users' } },
                            { path: 'roles', loadChildren: "./roles/roles.module#RolesModule", data: { permission: 'Pages.Roles' } },
                            { path: 'tenants', loadChildren: "./tenants/tenants.module#TenantsModule", data: { permission: 'Pages.Tenants' } },
                            { path: 'auditlogs', loadChildren: "./auditlogs/auditlogs.module#AuditLogsModule", data: { permission: 'Pages.AuditLogs' } },
                            { path: 'languages', loadChildren: "./languages/languages.module#LanguagesModule", data: { permission: 'Pages.Languages' } },
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