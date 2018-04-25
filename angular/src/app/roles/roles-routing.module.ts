import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesComponent } from "./roles.component";
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
            component: RolesComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RolesRoutingModule { }
