import { Component, Injector } from '@angular/core';
import { AuditLogServiceProxy, AuditLogDto } from '@shared/service-proxies/service-proxies';
import { MDatatableListingComponent } from '../shared/m-datatable/m-datatable-listing-component';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './auditlogs.component.html'
})
export class AuditlogsComponent extends MDatatableListingComponent {

  config: any = {
    url: '/api/services/app/AuditLog/GetMetronicTable',
    columns: [
      {
        field: "userName",
        title: "用户名",
        width: 80
      },
      {
        field: "executionTime",
        title: "执行时间",
        width: 100
      },
      {
        field: "serviceName",
        title: "服务名称",
        width: 150
      },
      {
        field: "methodName",
        title: "方法名称",
        width: 150
      },
      {
        field: "clientIpAddress",
        title: "IP地址",
        width: 120
      },
      {
        field: "clientName",
        title: "客户名称",
        width: 100
      }
    ]
  }

  constructor(
    injector: Injector,
    private _auditLogService: AuditLogServiceProxy
  ) {
    super(injector);
  }

}
