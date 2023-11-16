import { Component, Input, OnInit } from '@angular/core';
import { CartService as ShoppingCartService } from '../cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product : any; 
  @Input('shopping-cart') shoppingCart :any;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product : any) {
    console.log(product);
    this.cartService.addToCart(product);
  }

  removeFromCart(product : any) {
    this.cartService.removeFromCart(product);
  }

  
}
