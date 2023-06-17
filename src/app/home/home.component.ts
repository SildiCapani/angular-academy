import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemService) {

  }
  
  getItemData(): void {
    this.itemService.getItems().subscribe(items => this.items = items)
  }
  
  ngOnInit(): void {
    this.getItemData();
  }

}
