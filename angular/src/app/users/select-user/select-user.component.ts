import { Component, OnInit, Injector } from '@angular/core';
import { UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";

@Component({
  selector: 'select-user-modal',
  templateUrl: './select-user.component.html'
})
export class SelectUserComponent extends PagedListingComponentBase<UserDto> implements OnInit {

  constructor(injector: Injector, private _userService: UserServiceProxy) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error("Method not implemented.");
  }
  protected delete(entity: UserDto): void { }


  ngOnInit() {
  }

}
