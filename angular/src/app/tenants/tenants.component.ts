import { Component, Injector, ViewChild } from '@angular/core';
import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';
import { CreateTenantComponent } from "app/tenants/create-tenant/create-tenant.component";
import { MDatatableListingComponent } from '../shared/m-datatable/m-datatable-listing-component';
import { UpdateActionButton, DeleteActionButton } from '../shared/m-datatable/m-datatable.component';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './tenants.component.html'
})
export class TenantsComponent extends MDatatableListingComponent {

    @ViewChild('createTenantModal') createTenantModal: CreateTenantComponent;

    config: any = {
        url: '/api/services/app/Tenant/GetMetronicTable',
        columns: [
            {
                field: "tenancyName",
                title: "租户名称",
                width: 100
            },
            {
                field: "name",
                title: "名字",
                width: 180
            },
            {
                field: "isActive",
                title: "是否启用",
                width: 80
            }
        ],
        buttons: [
            new UpdateActionButton((data: TenantDto) => { this.createTenantModal.show(data.id); }),
            new DeleteActionButton((data: TenantDto) => { this.delete(data); })
        ]
    }

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    delete(tenant: TenantDto): void {
        abp.message.confirm(
            "Delete tenant '" + tenant.name + "'?",
            (result: boolean) => {
                if (result) {
                    this._tenantService.delete(tenant.id)
                        .finally(() => {
                            abp.notify.info("Deleted tenant: " + tenant.name);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show modals
    createTenant(): void {
        this.createTenantModal.show();
    }
}