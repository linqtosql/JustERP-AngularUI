///<reference path="../node_modules/moment/moment.d.ts"/>
///<reference path="../node_modules/@types/moment-timezone/index.d.ts"/>
///<reference path="../node_modules/@types/toastr/index.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.jquery.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var Push: any;

interface JQuery {
  countTo(...any): any;
  sparkline(...any): any;
  mMenu(options: any): JQuery;
  animateClass(options: any): JQuery;
  setActiveItem(item: any): JQuery;
  getPageTitle(item: any): JQuery;
  getBreadcrumbs(item: any): JQuery;
  validate(options: any): JQuery;
  valid(): JQuery;
  resetForm(): JQuery;
  mDatatable(options: any): any;
  jstree(options: any): any;
}