import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { LayoutModule } from "@shared/components/layout/layout.module";
import { AppBodyComponent } from "@shared/components/layout/body/app-body.component";

const routes: Routes = [
    {
        "path": "",
        "component": AppBodyComponent,
        "children": [
            {
                "path": "profile",
                "component": UserProfileComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        UserProfileComponent
    ]
})
export class UserProfileModule {

}