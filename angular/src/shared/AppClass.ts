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