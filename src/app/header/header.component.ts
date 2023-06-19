import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;

  constructor(cartService: CartService) {
    cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    } )
  }

  
  ngOnInit(): void {
    
  }

}
