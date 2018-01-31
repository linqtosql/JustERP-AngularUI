import { Component, Injector } from '@angular/core';
import { AuditLogServiceProxy, AuditLogDto } from '../shared/services/api-proxies/api-proxies';
import { MDatatableListingComponent } from '../shared/components/plugins/m-datatable/m-datatable-listing-component';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './auditlogs.component.html'
})
export class AuditlogsComponent extends MDatatableListingComponent {

  config: any = {
    url: '/api/services/app/AuditLog/GetMetronicTable',
    columns: [
      {
        field: "serviceName",
        title: "服务名称",
        width: 200
      },
      {
        field: "methodName",
        title: "方法名称",
        width: 200
      },
      {
        field: "parameters",
        title: "执行参数",
        width: 200,
        responsive: {visible: 'lg'}
      },
      {
        field: "clientIpAddress",
        title: "IP地址",
        width: 150,
        responsive: {visible: 'lg'}
      },
      {
        field: "clientName",
        title: "客户名称",
        width: 100,
        responsive: {visible: 'lg'}
      },
      {
        field: "browserInfo",
        title: "浏览器信息",
        width: 200,
        responsive: {visible: 'lg'}
      },
      {
        field: "executionTime",
        title: "执行时间",
        width: 160
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
