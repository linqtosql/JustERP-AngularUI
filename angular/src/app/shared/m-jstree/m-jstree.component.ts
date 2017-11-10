import { Component, AfterViewInit, ElementRef, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { JsTreeItem } from '@shared/AppClass';

@Component({
  selector: 'm-jstree',
  template: '<p *ngIf="emptyTree">{{emptyText}}</p><div #jstree></div>'
})
export class MJsTreeComponent implements AfterViewInit {

  private treeOuo: any
  private emptyTree = false

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
    this.treeOuo = $(this.jstree.nativeElement)
      .on("changed.jstree", (e, data) => {
        // tslint:disable-next-line:curly
        if (!data.node || (this.selectedItem && data.node.id === this.selectedItem.id))
          return;
        this.selectedItem = data.node;
        this.onSelectNodeChanged.emit(this.selectedItem);
      })
      .jstree({
        plugins: ["types", "contextmenu", "wholerow"],
        contextmenu: options.contextmenu,
        core: {
          multiple: false,
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
}
