import { Component } from '@angular/core';
import { SearchService } from '../services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  search: string = '';


  constructor(private searchService: SearchService, private router: Router) {}

    onSearch(event: Event): void {
    this.searchService.setSearch(this.search);

    const { target } = event;
    const { value } = target as HTMLInputElement;

    this.router.navigate([], {
      queryParams: {search: value}
    })
  }

}
