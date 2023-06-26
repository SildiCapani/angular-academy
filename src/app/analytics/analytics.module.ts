import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalysisService } from './analysis.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    HttpClientModule
  ],
  providers: [
    AnalysisService
  ]
})
export class AnalyticsModule { }
