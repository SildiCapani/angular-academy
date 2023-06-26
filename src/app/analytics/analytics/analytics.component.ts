import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Analytics } from 'src/app/shared/models/Item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})


export class AnalyticsComponent implements OnInit {
  
  sales?: Analytics;
  
  constructor(private httpClient: HttpClient,private analysisService: AnalysisService) { 

   }
  
  getSales(): void {
    this.analysisService.getSale().subscribe(sales => this.sales = sales)
  }

  ngOnInit(): void {
    this.getSales();
  }

}
