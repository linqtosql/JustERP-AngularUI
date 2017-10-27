import { Component, Injector } from '@angular/core';
import { TenantServiceProxy, CreateTenantDto, TenantDto } from '@shared/service-proxies/service-proxies';
import { CreateUpdateComponentBase } from '@shared/create-update-component-base';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'create-update-tenant-modal',
    templateUrl: './create-tenant.component.html'
})
export class CreateTenantComponent extends CreateUpdateComponentBase<TenantDto, CreateTenantDto> {

    protected create(): Observable<any> {
        return this._tenantService.create(this.createEntityDto)
    }
    protected update(): Observable<any> {
        return this._tenantService.update(this.entityDto);
    }
    protected get(id: number): Observable<TenantDto> {
        return this._tenantService.get(id);
    }
    protected instanceCreateEntityDto(): CreateTenantDto {
        let createTenant = new CreateTenantDto();
        createTenant.init({ isActive: true });
        return createTenant;
    }

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }
}
