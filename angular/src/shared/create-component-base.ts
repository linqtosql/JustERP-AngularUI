import { Injector } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BaseEntityDto } from './AppClass';
import { EditComponentBase } from './edit-component-base';

export abstract class CreateComponentBase<CreateEntityDto extends BaseEntityDto> extends EditComponentBase {

    model: CreateEntityDto = null;

    constructor(injector: Injector) {
        super(injector);
    }

    show(): void {
        this.model = this.instanceCreateEntityDto();
        this.beforeShow(this.model);
        super.show();
    }

    save(): void {
        super.save(this.create());
    }

    protected abstract create(): Observable<any>;
    protected abstract instanceCreateEntityDto(): CreateEntityDto;
}
