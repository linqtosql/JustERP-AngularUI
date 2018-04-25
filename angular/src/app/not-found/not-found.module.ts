import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from "../shared/components/layout/layout.module";
import { SharedModule } from '../shared/shared.module';
import { AppBodyComponent } from '@shared/components/layout/body/app-body.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
    {
        'path': '',
        'component': AppBodyComponent,
        'children': [
            {
                'path': '',
                'component': NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, 
        LayoutModule,
        RouterModule.forChild(routes), 
        SharedModule
    ], exports: [
        RouterModule,
    ], declarations: [
        NotFoundComponent,
    ],
})
export class NotFoundModule {
}