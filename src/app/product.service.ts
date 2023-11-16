import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }


  create(product : any) {
    return this.db.list('/products').push(product);
  }

  // snapshotChanges(): to get data: product.payload.val().title
  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(id : string | null) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(pid : string, product: any) {
    this.db.object('/products/' + pid).update(product);
  }

  delete(pid: string | null) {
    return this.db.object('/products/' + pid).remove();
  }
}
