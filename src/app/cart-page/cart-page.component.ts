import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { ItemService } from '../services/Item/item.service';
import { AnalysisService } from '../analytics/analysis.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})


export class CartPageComponent implements OnInit {
 cart!: Cart;

  constructor(private cartService: CartService,private analysisService: AnalysisService) {
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

  addSale(amount: number): void {
    this.analysisService.addSale(amount)
  }
}
