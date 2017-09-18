export class FormItemBase<TValue> {
    name: string
    value: TValue
    label: string
    order: number
    control: string
    required: boolean

    constructor(options: {
        name?: string
        value?: TValue
        label?: string,
        control?: string,
        order?: number,
        required?: boolean
    } = {}) {
        this.name = options.name;
        this.value = options.value;
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.control = options.control;
        this.required = !options.required ? false : options.required;
    }
}
