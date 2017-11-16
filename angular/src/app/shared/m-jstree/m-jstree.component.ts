import { Component, AfterViewInit, ElementRef, EventEmitter, Output, Input, ViewChild } from '@angular/core';

export class JsTreeItem {
  id: string | number;
  parent: string | number;
  text: string;
  icon: string;
  state: {
    opened: boolean,
    disabled: boolean,
    selected: boolean
  };
  li_attr: any;
  a_attr: any;

  constructor(id: string | number, parent: string | number, text: string, icon = "", state: { opened: boolean, disabled: boolean, selected: boolean } = { opened: true, disabled: false, selected: false }) {
    this.id = id.toString();
    this.parent = parent === null ? "#" : parent.toString();
    this.text = text;
    this.icon = icon;
    this.state = state;
  }
}

@Component({
  selector: 'm-jstree',
  template: '<p *ngIf="emptyTree">{{emptyText}}</p><div #jstree></div>'
})
export class MJsTreeComponent implements AfterViewInit {

  private treeOuo: any
  private defaultTreePlugins = ["types", "wholerow"]

  emptyTree = false
  selectedItem: JsTreeItem;
  @Input() config: any
  @Input() emptyText: string
  @Output() onSelectNodeChanged = new EventEmitter<JsTreeItem>()
  @ViewChild('jstree') jstree: ElementRef

  ngAfterViewInit(): void {
    if (this.config) {
      this.init(this.config)
    }
  }

  init(options: any): void {
    let plugins = [...this.defaultTreePlugins];
    if (options.contextmenu) { plugins.push("contextmenu"); }
    if (options.checkbox) { plugins.push("checkbox"); }

    this.treeOuo = $(this.jstree.nativeElement)
      .on("changed.jstree", (e, data) => {
        // tslint:disable-next-line:curly
        if (!data.node || (this.selectedItem && data.node.id === this.selectedItem.id))
          return;
        this.selectedItem = data.node;
        this.onSelectNodeChanged.emit(this.selectedItem);
      })
      .jstree({
        plugins: plugins,
        contextmenu: options.contextmenu,
        core: {
          multiple: !!options.checkbox,
          themes: {
            responsive: !1
          },
          data: options.data
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
  }

  refresh(data: Array<JsTreeItem>): void {
    let jstree = this.treeOuo.jstree(true);
    //检测是否做了删除操作
    if (data.length < jstree.settings.core.data.length) {
      this.selectedItem = null;
      this.onSelectNodeChanged.emit(this.selectedItem);
    }
    jstree.settings.core.data = data;
    jstree.refresh();
    this.emptyTree = data.length === 0;
  }

  getCheckedNodes(): string[] {
    return this.treeOuo.jstree(true).get_checked();
  }
}
