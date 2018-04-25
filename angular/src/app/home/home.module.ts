import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from "../shared/components/layout/layout.module";
import { HomeComponent } from './home.component';
import { AppBodyComponent } from '@shared/components/layout/body/app-body.component';

const routes: Routes = [
    {
        path: "",
        component: AppBodyComponent,
        children: [
            {
                path: "",
                component: HomeComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LayoutModule,
        RouterModule.forChild(routes)
    ], exports: [
        RouterModule
    ], declarations: [
        HomeComponent
    ]
})
export class HomeModule {

}