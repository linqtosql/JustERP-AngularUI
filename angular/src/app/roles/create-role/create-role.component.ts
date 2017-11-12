import { Component, Injector, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RoleServiceProxy, CreateRoleDto, PermissionDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { CreateUpdateComponentBase } from '@shared/create-update-component-base';
import { MJsTreeComponent, JsTreeItem } from '../../shared/m-jstree/m-jstree.component';
import { CheckItem } from '@shared/AppClass';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'create-update-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent extends CreateUpdateComponentBase<RoleDto, CreateRoleDto> implements OnInit {

    permissions: CheckItem<PermissionDto>[] = null;
    treeConfig: { data: JsTreeItem[], checkbox: boolean } = {
        data: [],
        checkbox: true
    }

    @ViewChild(MJsTreeComponent) jsTree: MJsTreeComponent;

    protected create(): Observable<any> {
        this.model.permissions = this.jsTree.getCheckedNodes();
        return this._roleService.create(<CreateRoleDto>this.model);
    }

    protected update(): Observable<any> {
        this.model.permissions = this.jsTree.getCheckedNodes();
        return this._roleService.update(<RoleDto>this.model);
    }

    protected get(id: number): Observable<RoleDto> {
        return this._roleService.get(id);
    }

    protected beforeShow(entityDto: any): void {
        if (entityDto instanceof CreateRoleDto) {
            this.treeConfig.data.forEach(item => {
                item.state.selected = true;
            });
        } else {
            this.treeConfig.data.forEach(item => {
                item.state.selected = entityDto.permissions.indexOf(<string>item.id) !== -1;
            });
        }
    }

    protected instanceCreateEntityDto(): CreateRoleDto {
        let createRoleDto = new CreateRoleDto();
        createRoleDto.init({ isStatic: false });
        return createRoleDto;
    }

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAllPermissions()
            .subscribe((permissions) => {
                let data = permissions.items.map(p => new JsTreeItem(p.name, p.parentName, p.displayName));
                this.treeConfig.data = data;
            });
    }
}
