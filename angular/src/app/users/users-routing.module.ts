import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
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
            component: UsersComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
