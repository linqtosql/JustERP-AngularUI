import { Component, OnInit, ElementRef, ViewChild, Input, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'm-datatable',
  templateUrl: './m-datatable.component.html'
})
export class MDatatableComponent extends AppComponentBase implements OnInit {

  @Input() url: string;
  @Input() columns: [{ field: string, title: string, width?: number, selector?: any, sortable?: boolean, overflow?: string, template?: any }]
  @Input() buttons: Array<string>
  @ViewChild("ele") ele: ElementRef

  datatable: any

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if (this.buttons && this.buttons.length > 0) {
      this.columns.push({
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
      })
    }
    this.datatable = $(this.ele.nativeElement).mDatatable({
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            method: "GET",
            url: this.url,
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

      columns: this.columns
    });
  }

}
