import { Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ModalComponentBase } from './modal-component-base';

export abstract class EditComponentBase extends ModalComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

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
}
