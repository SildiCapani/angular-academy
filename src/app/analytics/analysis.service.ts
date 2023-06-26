import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Analytics } from '../shared/models/Item';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private readonly salesUrl: string;
  private readonly addsalesUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.salesUrl = `${environment.baseUrl}/api/items/sales`,
    this.addsalesUrl = `${environment.baseUrl}/api/items/buy`
   }

  getSale(): Observable<Analytics> {
    return this.httpClient.get<Analytics>(this.salesUrl)
  }

  addSale(amount: number): Observable<Analytics> {
    return this.httpClient.post<Analytics>(this.addsalesUrl, amount )
  } 


}
