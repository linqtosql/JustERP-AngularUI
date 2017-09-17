export class FormItemControlBase<TValue> {
    value: TValue;
    name: string;
    required: boolean;
    control: string;

    constructor(options: {
        name: string,
        value?: TValue,
        control?: string,
        required?: boolean
    }) {
        this.name = options.name;
        this.value = options.value;
        this.control = options.control || "textbox";
        this.required = options.required === undefined ? false : options.required;
    }
}
