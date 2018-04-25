import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguagesComponent } from "./languages.component";
import { AppBodyComponent } from "@shared/components/layout/body/app-body.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppBodyComponent,
                children: [
                    {
                        path: '',
                        component: LanguagesComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LanguagesRoutingModule { }
