import { Component, Injector, ViewChild, OnInit, ElementRef, AfterViewInit } from "@angular/core"
import { FormItemBase } from "@shared/dynamic-form/form-item-base"
import { FormItemTextBox } from "@shared/dynamic-form/form-item-textbox"
import { FormItemColorPicker } from "@shared/dynamic-form/form-item-colorpicker"

@Component({
    templateUrl: "./form-demo-component.html"
})
export class FormDemoComponent implements AfterViewInit {

    @ViewChild("formContent") formContent: ElementRef;

    public formItems: Array<any> = [
        new FormItemTextBox({ label: "用户名", name: "UserName", value: "" }),
        new FormItemTextBox({ label: "昵称", name: "NickName", value: "" }),
        new FormItemTextBox({ label: "邮箱", name: "Email", value: "" }),
        new FormItemTextBox({ label: "公司名称", name: "CompanyName", value: "" }),
        new FormItemTextBox({ label: "手机号", name: "Phone", value: "" })
    ]

    ngAfterViewInit(): void {
        console.log(this.formContent.nativeElement);
        $.AdminBSB.input.activate($(this.formContent.nativeElement));
    }

}
