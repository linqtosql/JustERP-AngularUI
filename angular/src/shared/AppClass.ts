export class CheckItem<Dto> {
    checked: boolean;
    data: Dto;

    constructor(data: Dto, checked?: boolean) {
        this.checked = checked || true;
        this.data = data;
    }
}

export interface BaseEntityDto {
    init(): void;
}

export class JsTreeItem {
    id: string | number;
    parent: string | number;
    text: string;
    icon: string;
    state: {
        opened: boolean,
        disabled: boolean,
        selected: boolean
    };
    li_attr: any;
    a_attr: any;

    constructor(id: string | number, parent: string | number, text: string, icon: string = "", state: { opened: boolean, disabled: boolean, selected: boolean } = { opened: true, disabled: false, selected: false }) {
        this.id = id.toString();
        this.parent = parent === null ? "#" : parent.toString();
        this.text = text;
        this.icon = icon;
        this.state = state;
    }
}