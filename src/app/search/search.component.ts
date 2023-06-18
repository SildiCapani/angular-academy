import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  search: string = '';


  constructor(private searchService: SearchService) {}

    onSearch(): void {
    this.searchService.setSearch(this.search)
  }

}
