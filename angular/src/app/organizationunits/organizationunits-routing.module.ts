import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrganizationunitsComponent } from "./organizationunits.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrganizationunitsComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrganizationUnitsRoutingModule { }
