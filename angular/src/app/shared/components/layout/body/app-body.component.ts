import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '@shared/services/helpers/Helpers';
import { AppConsts } from '@shared/AppConsts';
import { ResourceLoaderService } from '@shared/services/resources-loader/resources-loader.service';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
declare let document: any;

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body',
    templateUrl: './app-body.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppBodyComponent implements OnInit {

    constructor(private _script: ResourceLoaderService, private _router: Router) {

    }

    ngOnInit(): void {
        this._script.load("body", ["./assets/demo/default/base/scripts.bundle.js"]).then(() => {
            Helpers.setLoading(false);
            this._script.load('head',
                ['assets/vendors/custom/fullcalendar/fullcalendar.bundle.css',
                'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js']);
        })

        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                (<any>mApp).scrollTop();
                Helpers.setLoading(true);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up';
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
                    $('.m-wrapper').removeClass(animation);
                }).removeClass(animation).addClass(animation);
            }
        });
    }

}