import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { OrganizationUnitServiceProxy, UserServiceProxy, OrganizationUnitDto, UserOUnitDto } from '@shared/service-proxies/service-proxies';
import { CreateOunitComponent } from './create-ounit/create-ounit.component';
import { JsTreeItem } from '@shared/AppClass';
import { MDatatableListingComponent } from '../shared/m-datatable/m-datatable-listing-component';
import { MJsTreeComponent } from '../shared/m-jstree/m-jstree.component';
import { SelectUserComponent } from '../users/select-user/select-user.component';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './organizationunits.component.html'
})
export class OrganizationunitsComponent extends MDatatableListingComponent implements OnInit {

  @ViewChild(CreateOunitComponent) createOUnitModal: CreateOunitComponent;
  @ViewChild(MJsTreeComponent) jsTree: MJsTreeComponent;
  @ViewChild(SelectUserComponent) selectUserModal: SelectUserComponent;

  config: any = {
    url: '/api/services/app/User/GetUsersInOUnit',
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
      }
    ],
    buttons: ["delete"]
  }

  constructor(injector: Injector, private _ouoService: OrganizationUnitServiceProxy, private _userService: UserServiceProxy) {
    super(injector);
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
    this.jsTree.init({
      data: [],
      contextmenu: {
        show_at_node: false,
        items: {
          edit: {
            label: "修改",
            title: "修改",
            action: (e) => {
              this.createOUnitModal.show(<number>this.jsTree.selectedItem.id);
            }
          },
          create: {
            label: "添加子组织",
            title: "添加子组织",
            action: (e) => {
              this.createOUnitModal.show();
              this.createOUnitModal.setParent(this.jsTree.selectedItem.id);
            }
          },
          delete: {
            label: "删除",
            title: "删除组织",
            action: (e) => {
              let data = new OrganizationUnitDto();
              data.init({ id: this.jsTree.selectedItem.id, displayName: this.jsTree.selectedItem.text });
              this.delete(data);
            }
          }
        }
      }
    })
    this.refresh();
  }

  createOUnit(): void {
    this.createOUnitModal.show();
  }

  actionClick(e: any) {

  }

  selectOuoChanged(treeItem: JsTreeItem) {
    let query = { organizationUnitId: treeItem.id };
    if (this.mDataTableInited()) {
      this.query(query);
      return;
    }
    this.config.query = query;
  }

  refresh(): void {
    this._ouoService.getOrganizationUnits().subscribe(result => {
      let units = result.map(r => new JsTreeItem(r.id, r.parentId, r.displayName));
      this.jsTree.refresh(units);
    });
  }

  showUserModal(): void {
    this.selectUserModal.show();
  }

  userSelectComplete(users: Array<UserOUnitDto>) {
    this._userService.addToOUnit(users).subscribe(r => {
      super.refresh();
    });
  }

}
