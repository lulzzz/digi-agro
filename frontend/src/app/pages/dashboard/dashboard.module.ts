import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../../theme/directives/directives.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {DashboardComponent} from './dashboard.component';
import {TodoComponent} from './todo/todo.component';
import {ChatComponent} from './chat/chat.component';
import {FeedComponent} from './feed/feed.component';
import {DatamapComponent} from './datamap/datamap.component';
import {DynamicChartComponent} from './dynamic-chart/dynamic-chart.component';
import {ChartsModule} from 'ng2-charts';
import 'chart.js/dist/Chart.js';
import {BriefParcelMapComponent} from './brief-parcel-map/brief-parcel-map.component';
import {NguiMapModule} from '@ngui/map';
import {TranslateModule} from '@ngx-translate/core';
import {Constants} from '../../common/constants';

export const routes = [
    {path: '', component: DashboardComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        DirectivesModule,
        PipesModule,
        RouterModule.forChild(routes),
        TranslateModule,
        NguiMapModule.forRoot({apiUrl: Constants.GOOGLE_MAP_API})
    ],
    declarations: [
        DashboardComponent,
        // TodoComponent,
        // ChatComponent,
        // FeedComponent,
        // DatamapComponent,
        DynamicChartComponent,
        BriefParcelMapComponent
    ]
})
export class DashboardModule {
}
