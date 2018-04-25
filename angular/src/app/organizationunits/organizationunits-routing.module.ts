import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationunitsComponent } from "./organizationunits.component";
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
            component: OrganizationunitsComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrganizationUnitsRoutingModule { }
