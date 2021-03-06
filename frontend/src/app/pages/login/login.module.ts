import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {TranslateModule} from '@ngx-translate/core';
import {TenantSelectorComponent} from './tenant-selector/tenant-selector.component';

export const routes = [
    {path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [LoginComponent, TenantSelectorComponent]
})

export class LoginModule {
}
