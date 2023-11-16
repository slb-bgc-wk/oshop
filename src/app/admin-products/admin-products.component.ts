import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from '../product.service';

export interface PeriodicElement {
  title: string;
  price: number;
}

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  filterProducts: any[];
  products : any[];
  subscription : Subscription;
  dtOptions : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(productService : ProductService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true
    };
    this.subscription = productService.getAll().subscribe(products => {
        this.filterProducts = this.products = products;
        console.log(this.products);
        this.dtTrigger.next();
      });
    // this.products$ = productService.getAll();
    }
  

   filter(query : string) {
    this.filterProducts = (query) ? 
                          this.products.filter(p => 
                          p.payload.val().title.toLowerCase().includes(query.toLowerCase())) 
                          : this.products;
   }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.dtTrigger.unsubscribe();
  }

}
