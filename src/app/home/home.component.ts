import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Subject } from 'rxjs';
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


  constructor(private itemService: ItemService, private searchService: SearchService, private route: ActivatedRoute,private cartService: CartService, private router: Router) {
  
  }
  
  getItemData(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items)
  }

  getSearchItem(): void {
    this.searchService.search$
    .pipe(debounceTime(500))
    .subscribe(search => {
      if (search) {
        this.itemService.getItems().subscribe(items => {
          this.items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
          this.items.length == 0? this.nothingFound = true : this.nothingFound = false; console.log(this.nothingFound)
        });
      } else {
        this.getItemData();
      }

      this.route.params.subscribe(params => {
        if(params['tag']) {
          this.itemService.getItems().subscribe(items => {
            this.items = items.filter(item => item.tags.includes(params['tag']));
          });
        }
      })
    });
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);
    this.router.navigateByUrl('/cart-page')
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
