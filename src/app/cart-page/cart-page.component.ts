import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { AnalysisService } from '../analytics/analysis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})


export class CartPageComponent implements OnInit {
 
  cart!: Cart;

  constructor(private cartService: CartService,private analysisService: AnalysisService,private router: Router,private toastrService: ToastrService) {
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

  addSale(earnings: number, ids: CartItem[]): void {
    const idList = ids.map((element: CartItem) => element.item.id);

     this.analysisService.addSale(earnings, ids).pipe(
       tap({
         next: () => {
           this.cartService.clearCart(); 
           this.router.navigateByUrl('home') }
     }))
     .subscribe();
    console.log(earnings, idList, ids)
  }
}
