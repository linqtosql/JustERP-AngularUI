import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '@shared/helpers';
import { ScriptLoaderService } from '@shared/services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./widgets-dropzone.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class WidgetsDropzoneComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/components/forms/widgets/dropzone.js');

    }

}