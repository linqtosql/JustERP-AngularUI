import { Component, ViewEncapsulation, AfterViewInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../app-component-base';
import { MenuItem } from '../menu-item';

declare let mLayout: any;
declare let abp: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent extends AppComponentBase implements AfterViewInit {

    menuItems: MenuItem[] = [];

    constructor(private injector: Injector) {
        super(injector);
        this.menuItems = abp.nav.menus.MainMenu.items;
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }

    ngAfterViewInit() {
        mLayout.initAside();
    }

}