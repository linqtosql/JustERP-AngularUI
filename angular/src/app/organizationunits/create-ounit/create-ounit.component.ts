import { Component, Injector } from '@angular/core';
import { CreateUpdateComponentBase } from '@shared/create-update-component-base';
import { OrganizationUnitServiceProxy, CreateOrganizationUnitDto, OrganizationUnitDto } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'create-update-ounit-modal',
  templateUrl: './create-ounit.component.html'
})
export class CreateOunitComponent extends CreateUpdateComponentBase<OrganizationUnitDto, CreateOrganizationUnitDto> {

  protected create(): Observable<any> {
    return this._organizationUnitService.create(this.createEntityDto);
  }
  protected update(): Observable<any> {
    return this._organizationUnitService.update(this.entityDto);
  }
  protected get(id: number): Observable<OrganizationUnitDto> {
    return this._organizationUnitService.get(id);
  }
  protected instanceCreateEntityDto(): CreateOrganizationUnitDto {
    return new CreateOrganizationUnitDto();
  }

  constructor(
    injector: Injector,
    private _organizationUnitService: OrganizationUnitServiceProxy
  ) {
    super(injector);
  }

}
