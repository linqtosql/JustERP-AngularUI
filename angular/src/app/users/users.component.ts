import { Component, Injector, ViewChild } from '@angular/core';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { MDatatableListingComponent } from '../shared/m-datatable/m-datatable-listing-component';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './users.component.html'
})
export class UsersComponent extends MDatatableListingComponent {

    @ViewChild(CreateUserComponent) createUserModal: CreateUserComponent;

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
                width: 120
            },
            {
                field: "roleNames",
                title: "角色",
                width: 180
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
        console.log(e.command);
        this.createUserModal.show(e.data.id);
    }
}