import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { RolesComponent } from "./roles.component";
import { CreateRoleComponent } from "./create-role/create-role.component";
import { RolesRoutingModule } from "./roles-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    SharedModule,
    RolesRoutingModule
  ],
  declarations: [RolesComponent, CreateRoleComponent]
})
export class RolesModule { }