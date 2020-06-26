import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';


import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    
    PanelModule,
    ChartModule,

    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent],
  providers: [ DecimalPipe ]
})
export class DashboardModule { }
