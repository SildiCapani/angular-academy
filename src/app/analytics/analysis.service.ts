import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Analytics, Item } from '../shared/models/Item';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private readonly url: string;
  private readonly salesUrl: string;
  private readonly addsalesUrl: string;
  private readonly usersUrl: string;

  constructor(private httpClient: HttpClient,private toastrService: ToastrService) {
    this.url = `${environment.baseUrl}/api` 
    this.salesUrl = `${this.url}/items/sales`,
    this.addsalesUrl = `${this.url}/items/totalsales`,
    this.usersUrl = `${this.url}/users`
   }

  getSale(): Observable<Analytics> {
    return this.httpClient.get<Analytics>(this.salesUrl)
  }

  addSale(sales: number,earnings: number): Observable<Analytics> {
    return this.httpClient.put<Analytics>(this.addsalesUrl, { sales, earnings }).pipe(
      tap({
        next: (sale) => {
          this.toastrService.success(
            `Purchase Successful`,
            'Purchase Successful'
          )
        },
        error: (errorRespone) => {
          this.toastrService.error(errorRespone.error, 'Purchase Faild')
        }
      })
    )
  }
  
  getItems(): Observable<Item[]>{
    return this.httpClient.get<Item[]>(`${this.url}/items`)
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl)
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(`${this.url}/items/${id}`)
  }

}
