import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DirectivesModule} from '../theme/directives/directives.module';
import {PipesModule} from '../theme/pipes/pipes.module';
import {routing} from './pages.routing';
import {PagesComponent} from './pages.component';
import {BlankComponent} from './blank/blank.component';
import {MenuComponent} from '../theme/components/menu/menu.component';
import {SidebarComponent} from '../theme/components/sidebar/sidebar.component';
import {NavbarComponent} from '../theme/components/navbar/navbar.component';
import {MessagesComponent} from '../theme/components/messages/messages.component';
import {BreadcrumbComponent} from '../theme/components/breadcrumb/breadcrumb.component';
import {BackTopComponent} from '../theme/components/back-top/back-top.component';
import {SearchComponent} from './search/search.component';
import {AdminGuard} from '../guards/admin-guard';
import {UserGuard} from '../guards/user-guard';
import {AuthGuard} from '../guards/auth-guard';
import {SuperAdminGuard} from '../guards/super-admin-guard';
import {SuperAdminOrAdminGuard} from '../guards/super-admin-or-admin-guard';
import {TenantService} from '../services/tenant.service';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormErrorBlockModule} from '../modules/form-error-block/form-error-block.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReminderService} from '../services/reminder.service';
import {SeasonYearSelectorComponent} from '../components/season-year-selector/season-year-selector.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        DirectivesModule,
        PipesModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        FormErrorBlockModule,
        TranslateModule
    ],
    declarations: [
        PagesComponent,
        BlankComponent,
        MenuComponent,
        SidebarComponent,
        NavbarComponent,
        MessagesComponent,
        BreadcrumbComponent,
        BackTopComponent,
        SearchComponent,
        UserProfileComponent,
        SeasonYearSelectorComponent
    ],
    providers: [
        AuthGuard,
        SuperAdminGuard,
        SuperAdminOrAdminGuard,
        AdminGuard,
        UserGuard,
        TenantService,
        ReminderService,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ]
})
export class PagesModule {
}
