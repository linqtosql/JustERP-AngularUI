import { Component, ViewContainerRef, OnInit, ViewEncapsulation, Injector } from '@angular/core';

@Component({
    selector: 'app-account',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

    private viewContainerRef: ViewContainerRef;

    versionText: string;
    currentYear: number;

    ngOnInit(): void {

    }
}
