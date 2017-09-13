import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class DemoComponent implements OnInit {

    ngOnInit(): void {
        $.AdminBSB.select.activate();
        $.AdminBSB.colorpicker.activate();
        $.AdminBSB.inputmask.activate();
    }

}
