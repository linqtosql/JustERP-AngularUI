import { Component, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserDto } from '@shared/service-proxies/service-proxies';
import { MDatatableComponent } from '../../shared/m-datatable/m-datatable.component';
import { ModalComponentBase } from '@shared/modal-component-base';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'select-user-modal',
  templateUrl: './select-user.component.html'
})
export class SelectUserComponent extends ModalComponentBase {

  @ViewChild("selectUserModal") private mDatatable: MDatatableComponent
  @Output("modalSave") modalSave = new EventEmitter<UserDto[]>()

  config: any = {
    url: "/api/services/app/User/GetMetronicTable",
    columns: [
      {
        field: "userName",
        title: "用户名",
        width: 100
      },
      {
        field: "fullName",
        title: "全名",
        width: 100
      }
    ]
  }

  constructor(injector: Injector) {
    super(injector);
  }

  save(): void {
    console.log(this.mDatatable.getSelectedRecords());
    this.modalSave.emit(this.mDatatable.getSelectedRecords());
    this.close();
  }

}
