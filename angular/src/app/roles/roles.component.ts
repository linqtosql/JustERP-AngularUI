import { Component, Injector, ViewChild } from '@angular/core';
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from "shared/service-proxies/service-proxies";
import { CreateRoleComponent } from "app/roles/create-role/create-role.component";
import { MDatatableListingComponent } from '../shared/m-datatable/m-datatable-listing-component';
import { UpdateActionButton, DeleteActionButton } from '../shared/m-datatable/m-datatable.component';

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: './roles.component.html'
})
export class RolesComponent extends MDatatableListingComponent {

	@ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;

	config: any = {
		url: '/api/services/app/Role/GetMetronicTable',
		columns: [
			{
				field: "name",
				title: "角色名称",
				width: 180
			},
			{
				field: "displayName",
				title: "显示名字",
				width: 80
			},
			{
				field: "permissions",
				title: "权限",
				width: 80
			}
		],
		buttons: [
			new UpdateActionButton((data: RoleDto) => { this.createRoleModal.show(data.id); }),
			new DeleteActionButton((data: RoleDto) => { this.delete(data); })
		]
	}

	constructor(
		private injector: Injector,
		private rolesService: RoleServiceProxy
	) {
		super(injector);
	}

	delete(role: RoleDto): void {
		abp.message.confirm(
			"Remove Users from Role and delete Role '" + role.displayName + "'?",
			"Permanently delete this Role",
			(result: boolean) => {
				if (result) {
					this.rolesService.delete(role.id)
						.finally(() => {
							abp.notify.info("Deleted Role: " + role.displayName);
							this.refresh();
						})
						.subscribe(() => { });
				}
			}
		);
	}

	// Show Modals
	createRole(): void {
		this.createRoleModal.show();
	}
}
