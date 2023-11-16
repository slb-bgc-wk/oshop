import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products : any[] = [];
  filterProducts : any[] = [];
  category: string;
  cart: any;
  subscription : Subscription;
  // subscription : Subscription;
  constructor(
    private shoppingCartService: CartService,
    route: ActivatedRoute,
    productService : ProductService, 
  ) {

    // this.subscription = productService.getAll().subscribe(products => {
    //   this.products$ = products;
    // });
    productService.getAll().subscribe(result => {
      this.filterProducts = this.products = result;
      // console.log(result)
    });


    route.queryParams.subscribe(param => {
      // console.log(param);
      this.category = param.category;
      this.filterProducts = (this.category) ? 
        this.products.filter(p => p.payload.val().category === this.category) : this.products;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() { 
     this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
       this.cart = cart;
      // console.log(this.cart);
     });

  }

}
