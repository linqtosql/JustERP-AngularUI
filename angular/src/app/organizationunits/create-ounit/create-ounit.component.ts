import { Component, Injector, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { OrganizationUnitServiceProxy, CreateOrganizationUnitDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-ounit-modal',
  templateUrl: './create-ounit.component.html'
})
export class CreateOunitComponent extends AppComponentBase implements OnInit {

  @ViewChild('createOUnitModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active: boolean = false;
  saving: boolean = false;
  createOUnit: CreateOrganizationUnitDto = null;

  constructor(
    injector: Injector,
    private _organizationUnitService: OrganizationUnitServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {

  }

  show(id?: number): void {
    this.active = true;
    this.modal.show();
    this.createOUnit = new CreateOrganizationUnitDto();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  save(): void {
    this._organizationUnitService.create(this.createOUnit)
      .finally(() => { this.saving = false; })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

}
