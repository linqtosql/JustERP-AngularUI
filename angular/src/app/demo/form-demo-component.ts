import { Component, Injector, ViewChild, OnInit, ElementRef } from "@angular/core"

@Component({
    templateUrl: "./form-demo-component.html"
})
export class FormDemoComponent implements OnInit {

    @ViewChild("formContent") formContent: ElementRef;

    ngOnInit(): void {
        $.AdminBSB.input.activate($(this.formContent.nativeElement));
    }

}
