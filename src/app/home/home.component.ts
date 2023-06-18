import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemService, private searchService: SearchService) {

  }
  
  getItemData(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items)
  }

  ngOnInit(): void {
    this.searchService.search$.subscribe(search => {
      if (search) {
        this.itemService.getItems().subscribe(items => {
          this.items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        });
      } else {
        this.getItemData();
      }
    });
  }

}
