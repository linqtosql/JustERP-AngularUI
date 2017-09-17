import { Component, Input, Injector } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { AppComponentBase } from "@shared/app-component-base"
import { FormItemControlBase } from "../form-item-control-base"

@Component({
    selector: "form-item-control",
    templateUrl: "form-item-control-component.html"
})
export class FormItemControlComponent extends AppComponentBase {

    @Input() input: FormItemControlBase<any>;
    @Input() form: FormGroup;
    constructor(
        injector: Injector
    ) {
        super(injector);
    }

}
