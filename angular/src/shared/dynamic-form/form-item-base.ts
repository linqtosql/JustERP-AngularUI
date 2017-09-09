export class FormItemBase<TValue> {
    value: TValue;
    name: string;
    label: string;
    required: boolean;
    order: number;
    control: string;

    constructor(options: {
        value?: TValue,
        name: string,
        label: string,
        required?: boolean,
        order?: number,
        control?: string
    }) {
        this.value = options.value;
        this.name = options.name || '';
        this.label = options.label || '';
        this.required = options.required === undefined ? false : options.required;
        this.order = options.order === undefined ? 0 : options.order;
        this.control = options.control;
    }
}
