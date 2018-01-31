import { Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from "../app-component-base";

export abstract class ModalComponentBase extends AppComponentBase {

    @ViewChild('modal') modal: ModalDirective;

    active = false;
    saving = false;

    constructor(injector: Injector) {
        super(injector);
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
