import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/services/auth/auth-route-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                children: [
                    { path: 'home', loadChildren: "./home/home.module#HomeModule" },
                    { path: 'organizationunits', loadChildren: "./organizationunits/organizationunits.module#OrganizationUnitsModule", data: { permission: 'Pages.OrganizationUnits' } },
                    { path: 'users', loadChildren: "./users/users.module#UsersModule", data: { permission: 'Pages.Users' } },
                    { path: 'users', loadChildren: "./users/profile/user-profile.module#UserProfileModule" },
                    { path: 'roles', loadChildren: "./roles/roles.module#RolesModule", data: { permission: 'Pages.Roles' } },
                    { path: 'tenants', loadChildren: "./tenants/tenants.module#TenantsModule", data: { permission: 'Pages.Tenants' } },
                    { path: 'auditlogs', loadChildren: "./auditlogs/auditlogs.module#AuditLogsModule", data: { permission: 'Pages.AuditLogs' } },
                    { path: 'languages', loadChildren: "./languages/languages.module#LanguagesModule", data: { permission: 'Pages.Languages' } },
                    { path: '404', loadChildren: "./not-found/not-found.module#NotFoundModule" }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }