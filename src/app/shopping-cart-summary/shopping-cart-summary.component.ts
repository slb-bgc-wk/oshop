import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnChanges {

  items: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.shoppingCart && this.shoppingCart) {
      for (let item of this.shoppingCart.items) {
        if (item.quantity > 0) {
          console.log(item.quantity);
          this.items.push(item);
        }
      }
    }
  }

  @Input('cart') shoppingCart :any;

  ngOnInit(): void {
  }

}
