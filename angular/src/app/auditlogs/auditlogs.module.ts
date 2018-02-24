import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { AuditlogsComponent } from "./auditlogs.component";
import { AuditLogsRoutingModule } from "./auditlogs-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    SharedModule,
    AuditLogsRoutingModule
  ],
  declarations: [AuditlogsComponent]
})
export class AuditLogsModule { }