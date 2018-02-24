import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { TenantsRoutingModule } from "./tenants-routing.module";
import { TenantsComponent } from './tenants.component';
import { CreateTenantComponent } from "./create-tenant/create-tenant.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    SharedModule,
    TenantsRoutingModule
  ],
  declarations: [TenantsComponent, CreateTenantComponent]
})
export class TenantsModule { }