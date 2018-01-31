import { Injector } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BaseEntityDto } from '../../AppClass';
import { EditComponentBase } from './edit-component-base';

export abstract class UpdateComponentBase<EntityDto extends BaseEntityDto> extends EditComponentBase {

    model: EntityDto = null;
    constructor(injector: Injector) {
        super(injector);
    }

    show(id: number): void {
        this.get(id).finally(() => {
            super.show();
        }).subscribe((result: EntityDto) => {
            this.model = result;
            this.beforeShow(this.model);
        });
    }

    save(): void {
        super.save(this.update());
    }

    protected abstract update(): Observable<any>;
    protected abstract get(id: number): Observable<EntityDto>;
}
