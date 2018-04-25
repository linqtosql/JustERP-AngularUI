import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '../shared/components/app-component-base';
import { ResourceLoaderService } from '../shared/services/resources-loader/resources-loader.service';

@Component({
    selector: "app-home",
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
        this._script.load('app-home',
            ['assets/app/js/dashboard.js'], false);
    }
}
