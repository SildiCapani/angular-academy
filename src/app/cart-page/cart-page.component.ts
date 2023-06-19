import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})


export class CartPageComponent implements OnInit {
 cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart
    })
  }

  ngOnInit(): void {
    
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem.item.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.item.id, quantity);
  }
}
