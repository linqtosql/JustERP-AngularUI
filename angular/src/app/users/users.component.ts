import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { MDatatableComponent } from '../shared/m-datatable/m-datatable.component';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './users.component.html'
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
    @ViewChild(MDatatableComponent) mDatatable: MDatatableComponent;

    active = false;
    users: UserDto[] = [];
    config: any = {
        url: "/api/services/app/User/GetMetronicTable",
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
        ],
        buttons: ["update", "delete"]
    }

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

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

    actionClick(e: any): void {
        console.log(e);
        this.createUserModal.show(e.data.id);
    }
}