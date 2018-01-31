import { Component, Injector } from '@angular/core';
import { CreateUpdateComponentBase } from '../../shared/components/page/create-update-component-base';
import { OrganizationUnitServiceProxy, CreateOrganizationUnitDto, OrganizationUnitDto } from '../../shared/services/api-proxies/api-proxies';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'create-update-ounit-modal',
  templateUrl: './create-ounit.component.html'
})
export class CreateOunitComponent extends CreateUpdateComponentBase<OrganizationUnitDto, CreateOrganizationUnitDto> {

  protected create(): Observable<any> {
    return this._organizationUnitService.create(<CreateOrganizationUnitDto>this.model);
  }
  protected update(): Observable<any> {
    return this._organizationUnitService.update(<OrganizationUnitDto>this.model);
  }
  protected get(id: number): Observable<OrganizationUnitDto> {
    return this._organizationUnitService.get(id);
  }
  protected instanceCreateEntityDto(): CreateOrganizationUnitDto {
    return new CreateOrganizationUnitDto();
  }

  setParent(parentId: any): void {
    this.model.parentId = parentId;
  }

  constructor(
    injector: Injector,
    private _organizationUnitService: OrganizationUnitServiceProxy
  ) {
    super(injector);
  }

}
