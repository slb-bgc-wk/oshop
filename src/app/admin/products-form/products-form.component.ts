import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

interface productType {
  category: string,
  imageUrl: string,
  price: number,
  title: string
}

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})



export class ProductsFormComponent implements OnDestroy {
  categories$ : any[];
  subscribetion;
  product$ : productType = {
    category: "",
    imageUrl: "",
    price: 0,
    title: ""
  };
  id : string | null;
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private categoryService : CategoryService, 
    private productService : ProductService) {
    this.subscribetion = categoryService.getCategories().subscribe(response => {
      this.categories$ = response;
    })
    this.id = route.snapshot.paramMap.get('id');
    productService.getProduct(this.id).pipe(take(1)).subscribe(product => {
      if (product != null) {
        this.product$ = product as productType;
      }
      
      console.log(product);
    });
  }
  ngOnDestroy(): void {
    this.subscribetion.unsubscribe();
    //throw new Error('Method not implemented.');
  }

  save(product : any){
    if (this.id) {
      this.productService.update(this.id, this.product$);
    } else {
      this.productService.create(product);
    }
    
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm('Are you sure to delete this product')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }


  

}
