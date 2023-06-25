import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {

    cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    } )

    userService.userObservable.subscribe(user => this.user = user)
  
  }

  onLogout(): void {
    this.userService.logout();
  }

  
  ngOnInit(): void {
    
  }

}
