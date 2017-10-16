import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './about.component.html',
    animations: [appModuleAnimation()]
})
export class AboutComponent extends AppComponentBase {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}