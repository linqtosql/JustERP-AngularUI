import { Component, OnInit, ViewEncapsulation, AfterViewInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent extends AppComponentBase implements OnInit, AfterViewInit {

    showLoginName: string = "";

    constructor(injector: Injector, private _authService: AppAuthService) {
        super(injector);
    }
    ngOnInit() {
        this.showLoginName = this.appSession.getShownLoginName();
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}