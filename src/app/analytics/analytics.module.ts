import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalysisService } from './analysis.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    AnalysisService,
    ReactiveFormsModule
  ]
})
export class AnalyticsModule { }
