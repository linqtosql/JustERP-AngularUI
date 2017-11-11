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
export class CreateRoleComponent extends CreateUpdateComponentBase<RoleDto, CreateRoleDto> implements AfterViewInit {

    permissions: CheckItem<PermissionDto>[] = null;
    treeConfig: any = {
        data: [],
        checkbox: true
    }

    @ViewChild(MJsTreeComponent) jsTree: MJsTreeComponent;

    protected create(): Observable<any> {
        this.model.permissions = this.getPermissions();
        return this._roleService.create(<CreateRoleDto>this.model);
    }

    protected update(): Observable<any> {
        this.model.permissions = this.getPermissions();
        return this._roleService.update(<RoleDto>this.model);
    }

    protected get(id: number): Observable<RoleDto> {
        return this._roleService.get(id);
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

    ngAfterViewInit(): void {
        this._roleService.getAllPermissions()
            .subscribe((permissions) => {
                this.permissions = permissions.items.map(p => new CheckItem(p));
                let data = permissions.items.map(p => new JsTreeItem(p.id, null, p.displayName))
                this.jsTree.refresh(data);
            });
    }

    private getPermissions(): string[] {
        return this.permissions.filter(p => p.checked).map(p => p.data.name);
    }
}
