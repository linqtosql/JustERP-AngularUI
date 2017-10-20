import { Component, ViewEncapsulation, AfterViewInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent extends AppComponentBase implements AfterViewInit {

    constructor(private injector: Injector) {
        super(injector);
    }

    menuItems: MenuItem[] = [
        new MenuItem(this.l("仪表盘"), "", "home", "/app/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        
        new MenuItem(this.l("订单中心"), "", "menu", "#", [
            new MenuItem("销售订单", "", "", "/app/order", [
                new MenuItem("待接单", "", "", "/app/order/wait"),
                new MenuItem("待审核", "", "", "/app/order/audit"),
                new MenuItem("待付款", "", "", "/app/order/pay"),
                new MenuItem("待发货", "", "", "/app/order/send")
            ]),
            new MenuItem("退货单", "", "", "#", [
                new MenuItem("待审核", "", "", "/app/return/audit"),
                new MenuItem("待退货", "", "", "/app/return/waitreturn"),
                new MenuItem("待退款", "", "", "/app/return/waitrefund"),
                new MenuItem("已完成", "", "", "/app/return/complete")
            ])
        ]),
        new MenuItem("仓储库存", "", "", "#", [
            new MenuItem("等待出库", "", "", "/app/store/waitout"),
            new MenuItem("等待入库", "", "", "/app/store/waitin"),
            new MenuItem("库存查询", "", "", "/app/store/search"),
            new MenuItem("库存流水", "", "", "/app/store/details"),
            new MenuItem("入库单查询", "", "", "/app/store/in"),
            new MenuItem("出库单查询", "", "", "/app/store/out")
        ])
    ];

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }

    ngAfterViewInit() {

        mLayout.initAside();
        let menu = (<any>$('#m_aside_left')).mMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }

}