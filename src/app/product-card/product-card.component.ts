import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { CartService as ShoppingCartService } from '../cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input('product') product : any; 
  @Input('shopping-cart') shoppingCart : ShoppingCart;
  product$ = {
    title: "",
    imageUrl: "",
    price: "",
    key: ""
  };

  constructor(private cartService : ShoppingCartService) {
    
    // this.quanity = this.shoppingCart.getQuantity(this.product);
   }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.product$.title = this.product.payload.val().title;
      this.product$.imageUrl = this.product.payload.val().imageUrl;
      this.product$.price = this.product.payload.val().price;
      this.product$.key = this.product.key;
      // console.log(this.product$)
    }
  }

  ngOnInit(): void {
  }

  addToCart(product : any) {
    // console.log(product);
    this.cartService.addToCart(product);
  }

}
