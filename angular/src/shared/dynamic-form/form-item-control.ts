import { Component, Input } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { FormItemBase } from "./form-item-base"

@Component({
    selector: "form-item-control",
    templateUrl: "form-item-control.html"
})
export class FormItemControl {

    @Input() formItem: FormItemBase<any>;
    @Input() form: FormGroup;

}
