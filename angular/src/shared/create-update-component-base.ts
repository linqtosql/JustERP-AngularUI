import { Injector } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BaseEntityDto } from './AppClass';
import { EditComponentBase } from './edit-component-base';

export abstract class CreateUpdateComponentBase<EntityDto extends BaseEntityDto, CreateEntityDto extends BaseEntityDto> extends EditComponentBase {

    model: EntityDto | CreateEntityDto = null;

    constructor(injector: Injector) {
        super(injector);
    }

    show(id?: number): void {
        if (id) {
            this.get(id).finally(() => {
                super.show();
            }).subscribe((result: EntityDto) => {
                this.model = result;
                this.beforeShow(this.model);
            });
        } else {
            this.model = this.instanceCreateEntityDto();
            this.beforeShow(this.model);
            super.show();
        }
    }

    save(): void {
        !this.model["id"] ? super.save(this.create()) : super.save(this.update());
    }

    protected abstract create(): Observable<any>;
    protected abstract update(): Observable<any>;
    protected abstract get(id: number): Observable<EntityDto>;
    protected abstract instanceCreateEntityDto(): CreateEntityDto;
}
