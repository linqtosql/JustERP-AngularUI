import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AuditLogServiceProxy, AuditLogDto, PagedResultDtoOfAuditLogDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";

@Component({
    templateUrl: "./auditlog.component.html",
    animations: [appModuleAnimation()]
})

export class AuditLogComponent extends PagedListingComponentBase<AuditLogDto>{

    logs: AuditLogDto[] = [];

    constructor(
        injector: Injector,
        private _auditLogService: AuditLogServiceProxy) {
        super(injector);
    }


    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._auditLogService.getAll(request.skipCount, request.maxResultCount)
            .finally(() => {
                finishedCallback();
            }).subscribe((result: PagedResultDtoOfAuditLogDto) => {
                this.logs = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(entity: AuditLogDto): void {
        throw new Error("Method not implemented.");
    }

}


