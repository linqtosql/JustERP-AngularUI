import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuditlogsComponent } from "./auditlogs.component";
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
                        component: AuditlogsComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuditLogsRoutingModule { }
