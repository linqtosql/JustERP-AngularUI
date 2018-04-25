import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LayoutModule } from "../shared/components/layout/layout.module";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AccountComponent } from './account.component';

import { LoginService } from './login/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent
  ],
  providers: [
    LoginService
  ]
})
export class AccountModule { }
