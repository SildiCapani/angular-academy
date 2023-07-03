import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Analytics, Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})


export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart')
  chartElement!: ElementRef;

  private chart!: Chart;

  sales?: Analytics;
  users?: User[];
  items?: Item[];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  
  
  constructor(private analysisService: AnalysisService) { 
    console.log(this.sales) 
   }

   displayedColumns: string[] = ['id', 'name', 'email', 'isAdmin'];
  
  getSales(): void {
    this.analysisService.getSale().subscribe( sales =>
      {
        this.sales = sales
        const salesNames = Object.keys(sales.sales);

        if (this.chart) {
          this.chart.data.labels = salesNames;
          this.chart.data.datasets![0].data = salesNames.map(name =>sales.sales[name].sales);
          this.chart.update(); // Update the chart
        }
    })
  }

  getUsers(): void {
    this.analysisService.getUsers().subscribe(users => {this.users = users, this.dataSource.data = users;})
  }

  getItems(): void {
    this.analysisService.getItems().subscribe(items => this.items = items)
  }

  ngAfterViewInit() {
   this.initializeChart();
  }

  private initializeChart(): void {
    const ctx = this.chartElement.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Sales in $',
          data: [],
          backgroundColor: [
            'rgba(240, 109, 12, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(225, 79, 104, 0.7)',
            'rgba(225, 79, 54, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(225, 9, 54, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as any // Use "as any" to bypass type checking for the scales property
    });
  }
  
  ngOnInit(): void {
    this.getSales();
    this.getUsers();
    this.getItems();
  }

}
