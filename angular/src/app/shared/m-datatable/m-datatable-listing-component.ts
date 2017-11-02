import { Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from "@shared/app-component-base";
import { MDatatableComponent } from './m-datatable.component';

export abstract class MDatatableListingComponent extends AppComponentBase {

    @ViewChild(MDatatableComponent) mDatatable: MDatatableComponent

    constructor(injector: Injector) {
        super(injector);
    }

    query(query: any): void {
        this.mDatatable.setDataSourceQuery(query);
    }

    refresh(): void {
        this.mDatatable.reload();
    }

}
