import { Component, Injector, Input } from "@angular/core"
import { FormItemBase } from "../form-item-base"
import { AppComponentBase } from "@shared/app-component-base"

@Component({
    selector: "form-item",
    templateUrl: "./form-item-component.html"
})
export class FormItemComponent extends AppComponentBase {

    @Input() item: FormItemBase<any>

    constructor(injector: Injector) {
        super(injector);
    }
}
