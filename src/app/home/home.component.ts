import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/Item';
import { ItemService } from '../services/Item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  items: Item[] = [];
  nothingFound: boolean = false;
  currentUser?: User;


  constructor(private itemService: ItemService,private userService: UserService, private route: ActivatedRoute,private router: Router,private cartService: CartService) {
  
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

  getUser(): void {
    this.userService.userObservable.subscribe(user => this.currentUser = user)
  }

  resetSearch(): void {
    this.router.navigateByUrl('/home')
  }

  likeItem(itemId: number, userId?: number): void {
    
      if(userId){
      this.userService.likeItem(itemId, userId).subscribe()
      
    }
  }

  searchByInput(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      const search: string = paramMap.get('search') || ''; // Get the search parameter or set it as an empty string if it's null
      
      this.itemService.getItems().subscribe(searchedItems => {
        if (search.trim() !== '') {
          this.items = searchedItems.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
          if(this.items.length == 0){
            this.nothingFound = true
          }
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
    this.getUser();
  }

}
