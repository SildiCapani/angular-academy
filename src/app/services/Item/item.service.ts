import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/Item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ItemService {

  private readonly url: string;
  private readonly itemUrl: string

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseUrl}`
    this.itemUrl = `${this.url}/api/items`
   }

  getItems(search?: string):  Observable<Item[]> {
    
    return this.httpClient.get<Item[]>(this.itemUrl)
  }

}
