import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()]
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
    @ViewChild('editUserModal') editUserModal: EditUserComponent;

    active = false;
    users: UserDto[] = [];

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        let datatable = $('#user_data').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                method: "GET",
                source: {
                    read: {
                        url: '/api/services/app/User/GetAllWithSort',
                        mapCallback: r => r.result,
                        paramsDataMap: data => {
                            return $.extend({}, data.datatable.pagination, data.datatable.sort, data.datatable.query);
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
                    field: "userName",
                    title: "用户名",
                    width: 80
                },
                {
                    field: "emailAddress",
                    title: "邮箱",
                    width: 120
                },
                {
                    field: "fullName",
                    title: "全名",
                    width: 80
                },
                {
                    field: "roleNames",
                    title: "角色",
                    width: 120
                },
                {
                    field: "isActive",
                    title: "是否激活",
                    width: 80
                }
            ]
        });
    }

    protected delete(user: UserDto): void {
        abp.message.confirm(
            "Delete user '" + user.fullName + "'?",
            (result: boolean) => {
                if (result) {
                    this._userService.delete(user.id)
                        .finally(() => {
                            abp.notify.info("Deleted User: " + user.fullName);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    createUser(): void {
        this.createUserModal.show();
    }

    editUser(user: UserDto): void {
        this.editUserModal.show(user.id);
    }
}