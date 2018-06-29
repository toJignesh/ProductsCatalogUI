import { ProductsService } from './../../_services/products.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Product } from '../../models/product';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-products-advanced-search',
  templateUrl: './products-advanced-search.component.html',
  styleUrls: ['./products-advanced-search.component.css']
})
export class ProductsAdvancedSearchComponent implements OnInit {
  @Output() searchResultsReady: EventEmitter<Array<Product>>=new EventEmitter<Array<Product>>();
  @Output() loadingEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
  advSearchForm: FormGroup;
  isValidForm: boolean = true;
  products: Array<Product>=[];
  constructor(private productsService:ProductsService) {



  }

  ngOnInit() {
  }

  searchAdvanced(form: NgForm) {
    this.isValidForm=true;
    const formValue = form.value;
    if (!formValue.name && !formValue.description && !formValue.price && !formValue.quantity) {
      this.isValidForm = false;
      return;
    }

    console.log('name',formValue.name);
    console.log('description', formValue.description);
    console.log('price',formValue.price);
    console.log('quantity', formValue.quantity);

    this.loadingEvent.emit(true);

        this.productsService.advSearch(formValue.name, formValue.description, formValue.price, formValue.quantity)
        .pipe(delay(2000))
        .subscribe(data=>{
          this.products=data;
          this.searchResultsReady.emit(this.products);
          this.loadingEvent.emit(false);
        });

  }
}
