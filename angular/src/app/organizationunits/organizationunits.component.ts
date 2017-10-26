import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { UserServiceProxy, UserOUnitDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateOunitComponent } from './create-ounit/create-ounit.component';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './organizationunits.component.html'
})
export class OrganizationunitsComponent extends PagedListingComponentBase<UserOUnitDto> implements OnInit {

  @ViewChild('createOUnitModal') createOUnitModal: CreateOunitComponent;

  constructor(injector: Injector) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

  }

  protected delete(entity: UserOUnitDto): void {

  }

  ngOnInit() {
    $("#m_tree_3").jstree({
      plugins: ["types", "contextmenu"],
      core: {
        themes: {
          responsive: !1
        },
        data: [{
          text: "Same but with checkboxes",
          children: [{
            text: "initially selected",
            state: {
              selected: !0
            }
          }, {
            text: "custom icon",
            icon: "fa fa-warning m--font-danger"
          }, {
            text: "initially open",
            icon: "fa fa-folder m--font-default",
            state: {
              opened: !0
            },
            children: ["Another node"]
          }, {
            text: "custom icon",
            icon: "fa fa-warning m--font-waring"
          }, {
            text: "disabled node",
            icon: "fa fa-check m--font-success",
            state: {
              disabled: !0
            }
          }]
        }, "And wholerow selection"]
      },
      types: {
        default: {
          icon: "fa fa-folder m--font-warning"
        },
        file: {
          icon: "fa fa-file  m--font-warning"
        }
      }
    });

    let datatable = $('#orgusers_data').mDatatable({
      // datasource definition
      data: {
        type: 'remote',
        method: "GET",
        source: {
          read: {
            url: '/api/services/app/User/GetUsersInOUnit',
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
        height: 450, // datatable's body's fixed height
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
          field: "userName",
          title: "用户名",
          width: 80
        },
        {
          field: "fullName",
          title: "全名",
          width: 100,
          template: '{{surName}} - {{name}}'
        },
        {
          field: "Actions",
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

  createOUnit(): void {
    this.createOUnitModal.show();
  }

}
