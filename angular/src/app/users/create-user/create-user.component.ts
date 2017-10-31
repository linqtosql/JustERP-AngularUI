import { Component, Injector, OnInit } from '@angular/core';
import { UserServiceProxy, CreateUserDto, RoleDto, UserDto } from '@shared/service-proxies/service-proxies';
import { CreateUpdateComponentBase } from '@shared/create-update-component-base';
import { CheckItem } from '@shared/AppClass';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'create-update-user-modal',
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends CreateUpdateComponentBase<UserDto, CreateUserDto> implements OnInit {

    roles: CheckItem<RoleDto>[] = null;

    protected instanceCreateEntityDto(): CreateUserDto {
        let createUserDto = new CreateUserDto();
        createUserDto.init({ isActive: true });
        return createUserDto;
    }

    protected get(id: number): Observable<UserDto> {
        return this._userService.get(id);
    }

    protected create(): Observable<UserDto> {
        this.model.roleNames = this.getRoleNames();
        return this._userService.create(<CreateUserDto>this.model);
    }
    protected update(): Observable<UserDto> {
        this.model.roleNames = this.getRoleNames();
        return this._userService.update(<UserDto>this.model);
    }

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._userService
            .getRoles()
            .subscribe((result) => {
                this.roles = result.items.map(r => new CheckItem(r));
            });
    }

    getRoleNames(): string[] {
        return this.roles.filter(r => r.checked).map(r => r.data.normalizedName);
    }
}
