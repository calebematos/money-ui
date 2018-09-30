import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';


import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,

    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
