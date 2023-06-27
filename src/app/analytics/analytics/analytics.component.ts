import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Analytics, Item } from 'src/app/shared/models/Item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})


export class AnalyticsComponent implements OnInit {
  
  sales?: Analytics;
  users?: User[];
  items!: Item[]; 
  
  constructor(private httpClient: HttpClient,private analysisService: AnalysisService) { 

   }
  
  getSales(): void {
    this.analysisService.getSale().subscribe(sales => this.sales = sales)
  }

  getUsers(): void {
    this.analysisService.getUsers().subscribe(users => this.users = users)
  }

  getItems(): void {
    this.analysisService.getItems().subscribe(items => this.items = items)
  }

  ngOnInit(): void {
    this.getSales();
    this.getUsers();
    this.getItems();
  }

}
