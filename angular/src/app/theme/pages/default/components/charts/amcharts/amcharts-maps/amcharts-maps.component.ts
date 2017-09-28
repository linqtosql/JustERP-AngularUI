import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '@shared/helpers';
import { ScriptLoaderService } from '@shared/services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./amcharts-maps.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AmchartsMapsComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            '//www.amcharts.com/lib/3/maps/js/usaLow.js',
            '//www.amcharts.com/lib/3/maps/js/worldLow.js',
            '//www.amcharts.com/lib/3/maps/js/worldHigh.js',
            '//www.amcharts.com/lib/3/plugins/export/export.min.js',
            'assets/demo/default/custom/components/charts/amcharts/maps.js');
        Helpers.loadStyles('.m-grid__item.m-grid__item--fluid.m-wrapper', [
            '//www.amcharts.com/lib/3/plugins/export/export.css']);
    }

}