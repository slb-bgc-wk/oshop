import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: CartService) { }

  placeOrder(order: any) {
    let storeOrder = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return storeOrder;
  }
}
