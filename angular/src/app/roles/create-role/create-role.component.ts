import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { RoleServiceProxy, CreateRoleDto, PermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { CheckItem } from '@shared/AppClass';

@Component({
    selector: 'create-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {
    @ViewChild('createRoleModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active: boolean = false;
    saving: boolean = false;

    permissions: CheckItem<PermissionDto>[] = null;
    role: CreateRoleDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
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

    show(): void {
        this.active = true;
        this.role = new CreateRoleDto();
        this.role.init({ isStatic: false });

        this.modal.show();
    }

    save(): void {
        var permissions = this.permissions.filter(p => p.checked).map(p => p.data.name);
        this.role.permissions = permissions;

        this.saving = true;
        this._roleService.create(this.role)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
