import { Component, ElementRef, ViewChild, Input, Injector, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'm-datatable',
  template: '<ng-template></ng-template>'
})
export class MDatatableComponent implements AfterViewInit {

  @Output() onButtonClick = new EventEmitter<{ command: string, data: any }>()
  @Input() config: {
    url: string,
    query: any,
    columns: [{ field: string, title: string, width?: number, selector?: any, sortable?: boolean, overflow?: string, template?: any }],
    buttons: Array<string>
  }

  private datatable: any

  constructor(private ele: ElementRef) { }

  ngAfterViewInit(): void {
    //events
    $(this.ele.nativeElement).on("click", ".dropdown-item,.m-portlet__nav-link.btn.m-btn.m-btn--icon.m-btn--icon.m-btn--pill", (e) => {
      this.onButtonClick.emit({
        command: $(e.target).attr("tag"),
        data: $(e.target).parentsUntil(this.ele.nativeElement, ".m-datatable__row").data("obj")
      });
    })
    if (this.config) {
      this.init(this.config);
    }
  }

  init(config: any): MDatatableComponent {
    if (this.datatable) {
      return this;
    }
    if (config.buttons && config.buttons.length > 0) {
      config.columns.push({
        field: "Actions",
        width: 110,
        title: "操作",
        sortable: false,
        overflow: 'visible',
        template: function (row) {
          let dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';

          return '\
            <div class="dropdown ' + dropup + '">\
                <a href="javascript:;" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                    <i class="la la-ellipsis-h"></i>\
                </a>\
                  <div class="dropdown-menu dropdown-menu-right">\
                    <a tag="edit" class="dropdown-item" href="javascript:;"><i class="la la-edit"></i> Edit Details</a>\
                    <a tag="update" class="dropdown-item" href="javascript:;"><i class="la la-leaf"></i> Update Status</a>\
                    <a tag="generate" class="dropdown-item" href="javascript:;"><i class="la la-print"></i> Generate Report</a>\
                  </div>\
            </div>\
            <a tag="edit" href="javascript:;" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
                <i class="la la-edit"></i>\
            </a>\
            <a tag="delete" href="javascript:;" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
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
            url: config.url,
            mapCallback: function (r) { return r.result; },
            paramsDataMap: function (data) { return $.extend({}, data.datatable.pagination, data.datatable.sort, data.datatable.query); },
            params: {
              query: config.query || null
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

      columns: config.columns
    });
    this.config = config;
    return this;
  }

  getDataSourceQuery(): any {
    return this.datatable.getDataSourceQuery();
  }

  setDataSourceQuery(query: any): MDatatableComponent {
    this.datatable.setDataSourceQuery(query);
    return this;
  }

  getSelectedRecords() {
    return this.datatable.getSelectedRecords().map((rowIndex, row) => {
      return $(row).data("obj");
    });
  }

  reload(): void {
    this.setDataSourceQuery(this.getDataSourceQuery());
    this.datatable.load();
  }

  mDataTableInited(): boolean {
    return this.datatable !== null;
  }

}
