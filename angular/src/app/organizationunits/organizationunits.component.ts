import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './organizationunits.component.html'
})
export class OrganizationunitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#m_tree_3").jstree({
      plugins: ["wholerow", "checkbox", "types"],
      core: {
        themes: {
          responsive: !1
        },
        data: [{
          text: "Same but with checkboxes",
          children: [{
            text: "initially selected",
            state: {
              selected: !0
            }
          }, {
            text: "custom icon",
            icon: "fa fa-warning m--font-danger"
          }, {
            text: "initially open",
            icon: "fa fa-folder m--font-default",
            state: {
              opened: !0
            },
            children: ["Another node"]
          }, {
            text: "custom icon",
            icon: "fa fa-warning m--font-waring"
          }, {
            text: "disabled node",
            icon: "fa fa-check m--font-success",
            state: {
              disabled: !0
            }
          }]
        }, "And wholerow selection"]
      },
      types: {
        default: {
          icon: "fa fa-folder m--font-warning"
        },
        file: {
          icon: "fa fa-file  m--font-warning"
        }
      }
    })
  }

}
