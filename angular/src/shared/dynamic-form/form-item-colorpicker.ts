import { FormItemTextBox } from "./form-item-textbox"

export class FormItemColorPicker extends FormItemTextBox {

    control = "colorpicker"

    constructor(options: {
        label: string,
        name: string,
        value: string
    }) {
        super(options)
    }
}
