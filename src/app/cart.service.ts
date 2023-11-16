import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db : AngularFireDatabase) { }

  // first step, creat shopping cart category in the database with datetime
  create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map( x => {
      let cart : any = x;
      return new ShoppingCart(cart.payload.val().items);
    }

    ));
  }

  // second step, store the cartId in localstorage
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key? result.key : "");
    return result.key? result.key : "";

  }

  private getItem(cartId : string, productId : string) {
    return this.db.object('/shopping-carts/' + cartId + "/items/" + productId);
  }

  // third step, store the quality and product details in the database
  async addToCart(product : any) {
    this.changeCart(product, 1);
  }

  async removeFromCart(product : any) {
    this.changeCart(product, -1);
  }

  async changeCart(product: any, change: number) {
    let cartId = await this.getOrCreateCartId();
    // console.log(cartId);
    let key = product.key;
    let ref = this.getItem(cartId, key);
    let productData = product;

    if (product.payload) { 
      //it used for comform the product data type as it is different in shopping cart(product.title) and product card(product.payload.val().title)
      productData = product.payload.val(); 
    }
    let item$ : Observable<any> = ref.valueChanges();
    item$.pipe(take(1)).subscribe(item => {
      // Be careful using product.payload.val() to get the data as product gotten by snapshotChanges()
      
      // if (item) ref.update({ quantity : item.quantity + 1 });
      // else ref.set({ product : product.payload.val(), quantity : 1 });

      // above condition structure can be written to as follow:
      // console.log(product);
      ref.update({ 
        title: productData.title,
        imageUrl: productData.imageUrl,
        price: productData.price,
        
        quantity : (item? item.quantity : 0) + change });
    })
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

}
