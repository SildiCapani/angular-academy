import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: Item[] = [];
  search: string;
  search$: Subject<string>;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
    this.search = '';
    this.search$ = new Subject<string>();
  }
  
  getItemData(): void {
    this.itemService.getItems(this.search).subscribe(items => this.items = items)
  }

  ngOnInit(): void {
    this.getItemData();
  }

}
