import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TenantsComponent } from "./tenants.component";
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
            component: TenantsComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class TenantsRoutingModule { }
