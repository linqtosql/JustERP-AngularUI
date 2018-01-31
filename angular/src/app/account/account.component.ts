import { Component, ViewContainerRef, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Helpers } from "../shared/services/helpers/Helpers";

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

    private viewContainerRef: ViewContainerRef;

    versionText: string;
    currentYear: number;

    ngOnInit(): void {
        Helpers.setLoading(false);
    }
}
