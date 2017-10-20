import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ResourceLoaderService } from '@shared/services/resources-loader.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './home.component.html'
})
export class HomeComponent extends AppComponentBase implements AfterViewInit {

    constructor(
        injector: Injector,
        private _script: ResourceLoaderService
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/app/js/dashboard.js');
    }
}
