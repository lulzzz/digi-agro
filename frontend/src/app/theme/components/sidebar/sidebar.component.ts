import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppState} from '../../../app.state';
import {SidebarService} from './sidebar.service';

@Component({
    selector: 'app-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [SidebarService]
})
export class SidebarComponent implements OnInit, AfterViewInit {
    public sidebarItems: Array<any>;
    public menuHeight: number;
    public isMenuCollapsed = false;
    public isMenuShouldCollapsed = false;
    public showHoverElem: boolean;
    public hoverElemHeight: number;
    public hoverElemTop: number;

    constructor(private _elementRef: ElementRef,
                private _sidebarService: SidebarService,
                private _state: AppState,
                private _router: Router,
                private _activatedRoute: ActivatedRoute) {

        this.sidebarItems = _sidebarService.getSidebarItems();
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
            if (isCollapsed) {
                this._sidebarService.closeAllSubMenus();
            } else {
                this._sidebarService.showActiveSubMenu(this.sidebarItems);
            }
        });

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                if (width <= 768) {
                    this._state.notifyDataChanged('menu.isCollapsed', true);
                }
                window.scrollTo(0, 0);
                const activeLink = this._sidebarService.getActiveLink(this.sidebarItems);
                this._sidebarService.setActiveLink(this.sidebarItems, activeLink);
            }
        });

        this._state.subscribe('menu.hovered', ($event) => {
            this.hoverItem($event);
        });

    }

    public ngOnInit(): void {
        const sidebar_menu = document.getElementById('sidebar-menu');
        this._sidebarService.createSidebarMenu(this.sidebarItems, sidebar_menu);
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
        this.updateSidebarHeight();
    }

    ngAfterViewInit() {
        this._sidebarService.showActiveSubMenu(this.sidebarItems);
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        const isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
        if (isMenuShouldCollapsed) {
            this._sidebarService.closeAllSubMenus();
        } else {
            this._sidebarService.showActiveSubMenu(this.sidebarItems);
        }
    }

    private _shouldMenuCollapse(): boolean {
        return window.innerWidth <= 768;
    }

    public menuCollapse(): void {
        this.menuCollapseStateChange(true);
    }

    public menuCollapseStateChange(isCollapsed: boolean): void {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        this._sidebarService.closeAllSubMenus();
    }

    public updateSidebarHeight(): void {
        this.menuHeight = this._elementRef.nativeElement.children[0].clientHeight - 60;
    }

    public hoverItem($event): void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 60;
    }
}
