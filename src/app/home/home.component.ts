import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: Item[] = [];
  nothingFound: boolean = false;


  constructor(private itemService: ItemService, private searchService: SearchService, private route: ActivatedRoute,private cartService: CartService) {
  
  }
  
  getItemData(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items)
  }

  getSearchItem(): void {
    this.searchByInput();
    this.searchByTag();
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);
  }

  resetSearch(): void {
    
  }

  searchByInput(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      const search: string = paramMap.get('search') || ''; // Get the search parameter or set it as an empty string if it's null
      
      this.itemService.getItems().subscribe(searchedItems => {
        if (search.trim() !== '') {
          this.items = searchedItems.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        } else {
          this.items = searchedItems;
        }
      });
    });
  }

  searchByTag(): void{
    this.itemService.getItems().subscribe(searchByTag => {
      this.route.params.subscribe(params => {
        if(params['tag']) {
          this.itemService.getItems().subscribe(items => {
            this.items = items.filter(item => item.tags.includes(params['tag']));
          });
        }
      })
    })
  }
  

  ngOnInit(): void {
    this.getSearchItem();
    setTimeout(() => {
      if(!this.items){
        this.nothingFound = true
      } console.log(this.items)
    }, 1000);
  }

}
