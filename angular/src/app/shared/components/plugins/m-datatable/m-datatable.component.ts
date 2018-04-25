import { Component, ElementRef, ViewChild, Input, Injector, EventEmitter, Output, AfterViewInit } from '@angular/core';

export class ActionButton {
  command: string
  text?: string
  icon?: string
  handler?: (row: any) => void
  buttons?: Array<ActionButton>

  constructor(command: string, text?: string, icon?: string, handler?: (row: any) => void, buttons?: Array<ActionButton>) {
    this.command = command;
    this.text = text || '';
    this.icon = icon || 'la-ellipsis-h';
    this.handler = handler;
    this.buttons = buttons || [];
  }
}

export class DeleteActionButton extends ActionButton {
  constructor(handler: (row: any) => void) {
    super("delete", null, "la-trash", handler)
  }
}

export class UpdateActionButton extends ActionButton {
  constructor(handler: (row: any) => void) {
    super("edit", null, "la-edit", handler)
  }
}

export class DropdownItemActionButton extends ActionButton {
  constructor(command: string, text: string, handler: (row: any) => void) {
    super(command, text, null, handler);
  }
}

export class DropdownActionButton extends ActionButton {
  constructor(buttons: Array<DropdownItemActionButton>) {
    super("dropdown", null, null, null, buttons);
  }
}

@Component({
  selector: 'm-datatable',
  template: '<ng-template></ng-template>'
})
export class MDatatableComponent implements AfterViewInit {

  @Input() config: {
    url: string,
    query: any,
    columns: [{ field: string, title: string, width?: number, selector?: any, sortable?: boolean, overflow?: string, template?: any }],
    buttons: ActionButton[]
  }

  private datatable: any

  constructor(private ele: ElementRef) { }

  ngAfterViewInit(): void {
    let self = this;
    let btns = this.config.buttons;
    if (btns && btns.length) {
      //events
      $(this.ele.nativeElement).on("click", ".dropdown-item,.m-portlet__nav-link.btn.m-btn.m-btn--icon.m-btn--icon.m-btn--pill", function () {
        let command = $(this).attr("name");
        let button = btns.find((btn, i) => { return btn.command === command });
        // tslint:disable-next-line:no-unused-expression
        button && typeof (button.handler) === "function" && button.handler($(this).parentsUntil(self.ele.nativeElement, ".m-datatable__row").data("obj"));
      })
    }

    if (this.config) {
      this.init(this.config);
    }
  }

  init(config: any): MDatatableComponent {
    if (this.datatable) {
      return this;
    }
    let columns = [...config.columns];
    if (config.checkbox !== false) {
      columns.splice(0, 0, {
        field: "id",
        sortable: false,
        title: "#",
        width: 40,
        selector: { class: 'm-checkbox--solid m-checkbox--brand' }
      });
    }
    if (config.buttons && config.buttons.length > 0) {
      columns.push({
        field: "Actions",
        width: 110,
        title: "操作",
        sortable: false,
        overflow: 'visible',
        template: (function (buttons: ActionButton[]) {
          let html = $.map(buttons, btn => {
            if (btn.buttons && btn.buttons.length) {
              return '\
              <div class="dropdown ">\
                  <a href="javascript:;" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                      <i class="la la-ellipsis-h"></i>\
                  </a>\
                    <div class="dropdown-menu dropdown-menu-right">\
                      ' + ($.map(btn.buttons, subBtn => { return '<a name="' + subBtn.command + '" class="dropdown-item" href="javascript:;"><i class="la ' + subBtn.icon + '"></i> ' + subBtn.text + '</a>' })).join('') + '\
                    </div>\
              </div>\
              ';
            } else {
              return '\
              <a name="' + btn.command + '" href="javascript:;" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="' + btn.text + '">\
                  <i class="la ' + btn.icon + '"></i>\
              </a>\
              ';
            }
          });

          return function (row) {
            let dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
            return html.join('');
          }
        })(config.buttons)
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
            params: {
              query: config.query || {}
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
        scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
        footer: false // display/hide footer
      },

      // column sorting(refer to Kendo UI)
      sortable: true,

      // column based filtering(refer to Kendo UI)
      filterable: false,

      pagination: true,

      toolbar: {
        // toolbar items
        items: {
          // pagination
          pagination: {
            // page size select
            pageSizeSelect: [10, 20, 30, 50, 100],
          },
        },
      },

      search: {
        input: $('#search')
      },

      columns: columns
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

  reload(query: any = {}): void {
    let q = { ...this.getDataSourceQuery(), ...query };
    this.setDataSourceQuery(q);
    //reset init query params
    this.datatable.setOption("data.source.read.params.query", {});
    this.datatable.load();
  }

  mDataTableInited(): boolean {
    return this.datatable !== null;
  }

}
