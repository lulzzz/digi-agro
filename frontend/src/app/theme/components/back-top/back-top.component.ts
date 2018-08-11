import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-back-top',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./back-top.component.scss'],
    template: `
        <i #backTop class="fa fa-angle-up back-to-top" title="Back to Top"></i>
    `
})
export class BackTopComponent implements AfterViewInit {

    @Input() position = 400;
    @Input() showSpeed = 500;
    @Input() moveSpeed = 1000;

    @ViewChild('backTop') private _selector: ElementRef;

    ngAfterViewInit() {
        this._onWindowScroll();
    }

    @HostListener('click')
    _onClick(): boolean {
        jQuery('html, body').animate({scrollTop: 0}, {duration: this.moveSpeed});
        return false;
    }

    @HostListener('window:scroll')
    _onWindowScroll(): void {
        const el = this._selector.nativeElement;
        window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
    }
}
