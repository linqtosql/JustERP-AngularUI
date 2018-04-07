import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguagesComponent } from "./languages.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LanguagesComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LanguagesRoutingModule { }
