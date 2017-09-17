import { FormItemControlBase } from "../form-item-control-base"

export class FormItemControlTextbox extends FormItemControlBase<string> {
    constructor(options: {
        name: string,
        value?: string,
        required?: boolean
    }) {
        super({ name: options.name, value: options.name, control: "textbox", required: options.required })
    }
}
