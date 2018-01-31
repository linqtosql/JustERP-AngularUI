import { Component, Injector, ViewChild } from '@angular/core';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/services/api-proxies/api-proxies';
import { CreateUserComponent } from "./create-user/create-user.component";
import { MDatatableListingComponent } from '@shared/components/plugins/m-datatable/m-datatable-listing-component';
import { UpdateActionButton, DeleteActionButton } from '@shared/components/plugins/m-datatable/m-datatable.component';

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
        buttons: [
            new UpdateActionButton((data: UserDto) => { this.createUserModal.show(data.id); }),
            new DeleteActionButton((data: UserDto) => { this.delete(data); })
        ]
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
}