import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { LanguagesRoutingModule } from "./languages-routing.module";
import { LanguagesComponent } from './languages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ModalModule,
    LanguagesRoutingModule
  ],
  declarations: [LanguagesComponent]
})
export class LanguagesModule { }