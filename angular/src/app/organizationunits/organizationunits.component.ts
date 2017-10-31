import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { OrganizationUnitServiceProxy, OrganizationUnitDto, UserOUnitDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateOunitComponent } from './create-ounit/create-ounit.component';
import { JsTreeItem } from '@shared/AppClass';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './organizationunits.component.html'
})
export class OrganizationunitsComponent extends PagedListingComponentBase<OrganizationUnitDto> implements OnInit {

  @ViewChild('createOUnitModal') createOUnitModal: CreateOunitComponent;

  private _units: JsTreeItem[];
  private _currentUnit: JsTreeItem;

  constructor(injector: Injector, private _ouoService: OrganizationUnitServiceProxy) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._ouoService.getOrganizationUnits()
      .finally(() => {
        finishedCallback();
      }).subscribe(result => {
        this._units = result.map(r => new JsTreeItem(r.id, r.parentId, r.displayName));
        $("#m_tree_ouo")
          .on("changed.jstree", (e, data) => {
            this._currentUnit = data.node;
          }).jstree({
            plugins: ["types", "contextmenu", "wholerow"],
            contextmenu: {
              show_at_node: false,
              items: {
                edit: {
                  label: "修改",
                  title: "修改",
                  action: (e) => {
                    this.createOUnitModal.show(<number>this._currentUnit.id);
                  }
                },
                create: {
                  label: "添加子组织",
                  title: "添加子组织",
                  action: (e) => {
                    this.createOUnitModal.show();
                    this.createOUnitModal.setParent(this._currentUnit.id);
                  }
                },
                delete: {
                  label: "删除",
                  title: "删除组织",
                  action: (e) => {
                    let data = new OrganizationUnitDto();
                    data.init({ id: this._currentUnit.id, displayName: this._currentUnit.text });
                    this.delete(data);
                  }
                }
              }
            },
            core: {
              multiple: false,
              themes: {
                responsive: !1
              },
              data: this._units
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
      });
  }

  protected delete(entity: OrganizationUnitDto): void {
    abp.message.confirm(
      "Delete OrganizationUnit '" + entity.displayName + "'?",
      (result: boolean) => {
        if (result) {
          this._ouoService.delete(entity.id)
            .finally(() => {
              abp.notify.info("Deleted OrganizationUnit: " + entity.displayName);
              this.refresh();
            })
            .subscribe(() => { });
        }
      }
    );
  }

  ngOnInit() {

    // let datatable = $('#orgusers_data').mDatatable({
    //   // datasource definition
    //   data: {
    //     type: 'remote',
    //     source: {
    //       read: {
    //         method: "GET",
    //         url: '/api/services/app/User/GetUsersInOUnit',
    //         mapCallback: r => r.result,
    //         paramsDataMap: data => {
    //           return $.extend({}, data.datatable.pagination, data.datatable.sort, data.datatable.query);
    //         }
    //       }
    //     },
    //     pageSize: 10,
    //     saveState: {
    //       cookie: true,
    //       webstorage: true
    //     },
    //     serverPaging: true,
    //     serverFiltering: true,
    //     serverSorting: true
    //   },

    //   // layout definition
    //   layout: {
    //     theme: 'default', // datatable theme
    //     class: '', // custom wrapper class
    //     scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
    //     footer: false // display/hide footer
    //   },

    //   // column sorting(refer to Kendo UI)
    //   sortable: true,

    //   // column based filtering(refer to Kendo UI)
    //   filterable: false,

    //   pagination: true,

    //   columns: [
    //     {
    //       field: "id",
    //       title: "#",
    //       width: 40,
    //       selector: { class: 'm-checkbox--solid m-checkbox--brand' }
    //     },
    //     {
    //       field: "userName",
    //       title: "用户名",
    //       width: 80
    //     },
    //     {
    //       field: "fullName",
    //       title: "全名",
    //       width: 100,
    //       template: '{{surName}} - {{name}}'
    //     },
    //     {
    //       field: "Actions",
    //       title: "操作",
    //       sortable: false,
    //       overflow: 'visible',
    //       template: function (row) {
    //         let dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';

    //         return '\
    // 				<div class="dropdown ' + dropup + '">\
    // 					<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
    //                             <i class="la la-ellipsis-h"></i>\
    //                         </a>\
    // 				  	<div class="dropdown-menu dropdown-menu-right">\
    // 				    	<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
    // 				    	<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
    // 				    	<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
    // 				  	</div>\
    // 				</div>\
    // 				<a (click)="createUser()" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
    // 					<i class="la la-edit"></i>\
    // 				</a>\
    // 				<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
    // 					<i class="la la-trash"></i>\
    // 				</a>\
    // 			';
    //       }
    //     }
    //   ]
    // });

    super.ngOnInit();
  }

  createOUnit(): void {
    this.createOUnitModal.show();
  }

}
