import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Analytics, Item } from 'src/app/shared/models/Item';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/User';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})


export class AnalyticsComponent implements OnInit {
  
  sales?: Analytics;
  users?: User[];
  items?: Item[];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  
  constructor(private httpClient: HttpClient,private analysisService: AnalysisService) { 

   }

   displayedColumns: string[] = ['id', 'name', 'email', 'isAdmin'];
  
  getSales(): void {
    this.analysisService.getSale().subscribe(sales => this.sales = sales)
  }

  getUsers(): void {
    this.analysisService.getUsers().subscribe(users => {this.users = users, this.dataSource.data = users;})
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
