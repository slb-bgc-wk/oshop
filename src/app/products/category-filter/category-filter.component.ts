import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  @Input() category : string;

  categories$ : Observable<any[]>;
  constructor(categoryService : CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
