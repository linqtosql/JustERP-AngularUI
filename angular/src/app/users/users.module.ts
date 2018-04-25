import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../shared/components/layout/layout.module";
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { UsersComponent } from "./users.component";
import { CreateUserComponent } from "./create-user/create-user.component";

import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ModalModule,
        LayoutModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        CreateUserComponent
    ],
    providers: [

    ]
})
export class UsersModule {

}