import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';

import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateTenantComponent } from "app/tenants/create-tenant/create-tenant.component";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './tenants.component.html'
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {

    @ViewChild('createTenantModal') createTenantModal: CreateTenantComponent;

    tenants: TenantDto[] = [];

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        let datatable = $('#tenant_data').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "GET",
                        url: '/api/services/app/Tenant/GetMetronicTable',
                        mapCallback: r => r.result,
                        paramsDataMap: data => {
                            return $.extend({}, data.datatable.pagination, data.datatable.sort, data.datatable.query);
                        }
                    }
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting(refer to Kendo UI)
            sortable: true,

            // column based filtering(refer to Kendo UI)
            filterable: false,

            pagination: true,

            columns: [
                {
                    field: "id",
                    title: "#",
                    width: 40,
                    selector: { class: 'm-checkbox--solid m-checkbox--brand' }
                },
                {
                    field: "tenancyName",
                    title: "租户名称",
                    width: 80
                },
                {
                    field: "name",
                    title: "名字",
                    width: 80
                },
                {
                    field: "isActive",
                    title: "是否启用",
                    width: 80
                },
                {
                    field: "Actions",
                    width: 110,
                    title: "操作",
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        let dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
                        return '\
                        <div class="dropdown ' + dropup + '">\
                            <a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
                              <div class="dropdown-menu dropdown-menu-right">\
                                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                                <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                              </div>\
                        </div>\
                        <a (click)="createUser()" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
                            <i class="la la-edit"></i>\
                        </a>\
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
                            <i class="la la-trash"></i>\
                        </a>\
                    ';
                    }
                }
            ]
        });
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