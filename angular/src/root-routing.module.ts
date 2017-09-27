import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './app/auth/logout/logout.component';

const routes: Routes = [
    { path: 'login', loadChildren: './app/auth/auth.module#AuthModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }