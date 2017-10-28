import { AppComponentBase } from "shared/app-component-base";
import { Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from "rxjs/Observable";
import { BaseEntityDto } from './AppClass';

export abstract class EditComponentBase extends AppComponentBase {

    @ViewChild('createUpdateModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    constructor(injector: Injector) {
        super(injector);
    }

    save(service: Observable<any>): void {
        this.saving = true;
        service.finally(() => {
            this.saving = false;
        }).subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.modalSave.emit(null);
        });
    }

    show(id?: number): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}
