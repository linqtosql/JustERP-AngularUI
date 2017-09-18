import { FormItemBase } from "./form-item-base"

export class FormItemTextBox extends FormItemBase<string> {

    control = "textbox"

    constructor(options: {
        label: string,
        name: string,
        value: string
    }) {
        super(options)
    }
}
