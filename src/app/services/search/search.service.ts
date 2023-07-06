import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SearchService {

  private search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public search = this.search$.asObservable();

  setSearch(search: string): void {
    this.search$.next(search)
  }

}
