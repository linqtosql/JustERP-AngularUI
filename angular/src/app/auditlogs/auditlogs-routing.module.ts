import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuditlogsComponent } from "./auditlogs.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AuditlogsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuditLogsRoutingModule { }
