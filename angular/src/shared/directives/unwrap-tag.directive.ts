import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Helpers } from '@shared/helpers';


@Directive({
    selector: "[appunwraptag]",
})
export class UnwrapTagDirective implements AfterViewInit {


    constructor(private el: ElementRef) {

    }
    ngAfterViewInit() {
        let nativeElement: HTMLElement = this.el.nativeElement;
        Helpers.unwrapTag(nativeElement);
    }

}