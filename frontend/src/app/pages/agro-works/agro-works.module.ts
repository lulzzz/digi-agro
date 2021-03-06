import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DirectivesModule} from '../../theme/directives/directives.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {FormErrorBlockModule} from '../../modules/form-error-block/form-error-block.module';
import {AgGridModule} from 'ag-grid-angular';
import {SowingWorksComponent} from './sowing-works/sowing-works.component';
import {OtherWorksComponent} from './other-works/other-works.component';
import {HarvestingWorksComponent} from './harvesting-works/harvesting-works.component';
import {ImageRendererComponent} from '../../modules/aggrid/image-renderer/image-renderer.component';
import {ImageRendererModule} from '../../modules/aggrid/image-renderer/image-renderer.module';
import {PinnedRowRendererModule} from '../../modules/aggrid/pinned-row-renderer/pinned-row-renderer.module';
import {PinnedRowRendererComponent} from '../../modules/aggrid/pinned-row-renderer/pinned-row-renderer.component';

export const routes = [
    {path: '', redirectTo: 'agro-works', pathMatch: 'full'},
    {path: 'sowing', component: SowingWorksComponent, data: {breadcrumb: 'sowing'}},
    {path: 'works', component: OtherWorksComponent, data: {breadcrumb: 'other works'}},
    {path: 'harvesting', component: HarvestingWorksComponent, data: {breadcrumb: 'harvesting'}},
];

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        DirectivesModule,
        FormErrorBlockModule,
        ImageRendererModule,
        PinnedRowRendererModule,
        AgGridModule.withComponents([ImageRendererComponent, PinnedRowRendererComponent]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        SowingWorksComponent,
        OtherWorksComponent,
        HarvestingWorksComponent
    ]
})

export class AgroWorksModule {
}
