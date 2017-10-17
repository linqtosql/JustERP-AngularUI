import { Component, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from "shared/service-proxies/service-proxies";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateRoleComponent } from "app/roles/create-role/create-role.component";
import { EditRoleComponent } from "app/roles/edit-role/edit-role.component";

@Component({
	selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
	templateUrl: './roles.component.html',
	animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {

	@ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
	@ViewChild('editRoleModal') editRoleModal: EditRoleComponent;

	roles: RoleDto[] = [];

	constructor(
		private injector: Injector,
		private rolesService: RoleServiceProxy
	) {
		super(injector);
	}

	list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
		this.rolesService.getAll(request.skipCount, request.maxResultCount)
			.finally(() => {
				finishedCallback();
			})
			.subscribe((result: PagedResultDtoOfRoleDto) => {
				this.roles = result.items;
				let datatable = $('.m_datatable').mDatatable({
					// datasource definition
					data: {
						type: 'local',
						source: result.items,
						pageSize: 10
					},

					// layout definition
					layout: {
						theme: 'default', // datatable theme
						class: '', // custom wrapper class
						scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
						height: 450, // datatable's body's fixed height
						footer: false // display/hide footer
					},

					// column sorting(refer to Kendo UI)
					sortable: true,

					// column based filtering(refer to Kendo UI)
					filterable: false,

					pagination: true,

					columns: [
						{
							field: "id",
							title: "#",
							width: 40,
							selector: { class: 'm-checkbox--solid m-checkbox--brand' }
						},
						{
							field: "name",
							title: "角色名称",
							width: 80
						},
						{
							field: "displayName",
							title: "显示名字",
							width: 80
						},
						{
							title: "操作"
						}
					]
				});
			});
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

	editRole(role: RoleDto): void {
		this.editRoleModal.show(role.id);
	}
}
