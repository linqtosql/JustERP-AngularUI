import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TenantsComponent } from "./tenants.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TenantsComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class TenantsRoutingModule { }
