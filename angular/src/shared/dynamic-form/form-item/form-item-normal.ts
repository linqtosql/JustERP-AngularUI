import { FormItemControlBase } from "../form-item-control-base"
import { FormItemBase } from "../form-item-base"

export class FormItemNormal extends FormItemBase {

    constructor(options: {
        label: string,
        control: FormItemControlBase<any>,
        order?: number
    }) {
        super(options)
    }
}
