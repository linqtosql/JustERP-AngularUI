import { Component, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserServiceProxy, UserOUnitDto } from '@shared/service-proxies/service-proxies';
import { MDatatableComponent } from '../../shared/m-datatable/m-datatable.component';
import { ModalComponentBase } from '@shared/modal-component-base';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'select-user-modal',
  templateUrl: './select-user.component.html'
})
export class SelectUserComponent extends ModalComponentBase {

  @ViewChild("selectUserModal") private mDatatable: MDatatableComponent
  @Output("modalSave") modalSave = new EventEmitter<Array<UserOUnitDto>>()

  config: any = {
    url: "/api/services/app/User/GetMetronicTable",
    columns: [
      {
        field: "id",
        title: "#",
        width: 40,
        selector: { class: 'm-checkbox--solid m-checkbox--brand' }
      },
      {
        field: "fullName",
        title: "全名",
        width: 120
      }
    ]
  }

  constructor(injector: Injector, private _userService: UserServiceProxy) {
    super(injector);
  }

  save(): void {
    console.log(this.mDatatable.getSelectedRecords());
    this.modalSave.emit(this.mDatatable.getSelectedRecords());
    this.close();
  }

}
