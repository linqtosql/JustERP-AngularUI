import { Component, Injector, OnInit } from '@angular/core';
import { RoleServiceProxy, CreateRoleDto, PermissionDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { CreateUpdateComponentBase } from '@shared/create-update-component-base';
import { CheckItem } from '@shared/AppClass';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'create-update-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent extends CreateUpdateComponentBase<RoleDto, CreateRoleDto> implements OnInit {

    protected create(): Observable<any> {
        this.createEntityDto.permissions = this.getPermissions();
        return this._roleService.create(this.createEntityDto);
    }

    protected update(): Observable<any> {
        this.entityDto.permissions = this.getPermissions();
        return this._roleService.update(this.entityDto);
    }

    protected get(id: number): Observable<RoleDto> {
        return this._roleService.get(id);
    }

    protected instanceCreateEntityDto(): CreateRoleDto {
        let createRoleDto = new CreateRoleDto();
        createRoleDto.init({ isStatic: false });
        return createRoleDto;
    }

    permissions: CheckItem<PermissionDto>[] = null;

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAllPermissions()
            .subscribe((permissions) => {
                this.permissions = permissions.items.map(p => new CheckItem(p));
            });
    }

    private getPermissions(): string[] {
        return this.permissions.filter(p => p.checked).map(p => p.data.name);
    }
}
