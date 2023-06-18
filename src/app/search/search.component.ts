import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  search: string;
  search$: Subject<string>;

  constructor() {
    this.search = '';
    this.search$ = new Subject<string>();
  }

  onSearch(search: string): void {
    this.search = search;
    this.search$.next(this.search);
  }

}
