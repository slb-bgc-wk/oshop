import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

interface Shipping {
  name: string,
  addressLine1: string,
  addressLine2: string,
  city: string
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping : Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };  

  cart : ShoppingCart;
  cartSubscription : Subscription;
  userID: string;
  userSubscription : Subscription;

  constructor(
    private shoppingCartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
    ){ }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userID = user!.uid);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let x = new Order(this.userID, this.shipping, this.cart);
    let result = this.orderService.placeOrder(x);
    this.router.navigate(['/order-success', result.key]);
  }   

 

}
