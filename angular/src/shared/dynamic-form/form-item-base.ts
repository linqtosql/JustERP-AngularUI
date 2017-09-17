import { FormItemControlBase } from "./form-item-control-base"

export class FormItemBase {
    label: string;
    order: number;
    control: FormItemControlBase<any>

    constructor(options: {
        label: string,
        control: FormItemControlBase<any>,
        order?: number
    }) {
        this.label = options.label || '';
        this.order = options.order === undefined ? 0 : options.order;
        this.control = options.control;
    }
}
