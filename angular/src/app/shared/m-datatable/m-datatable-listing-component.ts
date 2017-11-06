import { Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from "@shared/app-component-base";
import { MDatatableComponent } from './m-datatable.component';

export abstract class MDatatableListingComponent extends AppComponentBase {

    @ViewChild("mDatatable") private mDatatable: MDatatableComponent

    constructor(injector: Injector) {
        super(injector);
    }

    initMDataTable(config: any): MDatatableComponent {
        //这里要等待视图初始化完成后才能初始化mdatatable
        setTimeout(function () {
            //this.mDatatable.init(config);
        }, 0);
        return this.mDatatable;
    }

    query(query: any): void {
        this.mDatatable.setDataSourceQuery(query).reload();
    }

    refresh(): void {
        this.mDatatable.reload();
    }

    mDataTableInited(): boolean {
        return this.mDatatable && this.mDatatable.mDataTableInited();
    }

}
