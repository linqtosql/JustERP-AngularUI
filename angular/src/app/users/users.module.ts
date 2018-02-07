import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';

import { UsersComponent } from "./users.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { SelectUserComponent } from "./select-user/select-user.component";

import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ModalModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        CreateUserComponent,
        SelectUserComponent
    ],
    exports: [
        SelectUserComponent
    ],
    providers: [

    ]
})
export class UsersModule {

}