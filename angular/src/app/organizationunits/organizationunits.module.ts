import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../shared/components/layout/layout.module";
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { OrganizationunitsComponent } from "./organizationunits.component";
import { CreateOunitComponent } from "./create-ounit/create-ounit.component";
import { OrganizationUnitsRoutingModule } from "./organizationunits-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    SharedModule,
    LayoutModule,
    OrganizationUnitsRoutingModule
  ],
  declarations: [OrganizationunitsComponent, CreateOunitComponent]
})
export class OrganizationUnitsModule { }