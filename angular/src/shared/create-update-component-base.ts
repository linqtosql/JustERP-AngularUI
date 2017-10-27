import { AppComponentBase } from "shared/app-component-base";
import { Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from "rxjs/Observable";

interface BaseEntityDto {
    init(): void;
}

export abstract class CreateUpdateComponentBase<EntityDto extends BaseEntityDto, CreateEntityDto extends BaseEntityDto> extends AppComponentBase implements OnInit {

    @ViewChild('createUpdateModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    entityDto: EntityDto = null;
    createEntityDto: CreateEntityDto = null;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {

    }

    show(id?: number): void {
        if (id) {
            this.get(id).finally(() => {
                this.active = true;
                this.modal.show();
            }).subscribe((result: EntityDto) => {
                this.entityDto = result;
            });
        } else {
            this.createEntityDto = this.instanceCreateEntityDto();
            this.active = true;
            this.modal.show();
        }
    }

    save(): void {
        var serviceMethod = this.createEntityDto != null ? this.create : this.update;
        this.saving = true;
        serviceMethod().finally(() => {
            this.saving = false;
        }).subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.modalSave.emit(null);
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    protected abstract create(): Observable<any>;
    protected abstract update(): Observable<any>;
    protected abstract get(id: number): Observable<EntityDto>;
    protected abstract instanceCreateEntityDto(): CreateEntityDto;
}
