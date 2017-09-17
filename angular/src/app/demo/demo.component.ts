import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class DemoComponent implements OnInit {

    ngOnInit(): void {
        $.AdminBSB.select.activate();
        $.AdminBSB.colorpicker.activate();
        $.AdminBSB.inputmask.activate();
        $.AdminBSB.tagsinput.activate();
        $.AdminBSB.spinner.activate();
        $.AdminBSB.dropzone.activate();
        $.AdminBSB.nouislider.activate({
            id: "nouislider_basic",
            start: 30,
            connect: 'lower',
            step: 1,
            range: {
                'min': [0],
                'max': [100]
            }
        });
        $.AdminBSB.nouislider.activate({
            id: "nouislider_range",
            start: [32500, 62500],
            connect: true,
            range: {
                'min': 25000,
                'max': 100000
            }
        });

    }

}
