
import { ProductsService } from './../../../_services/products.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { delay, filter, tap } from 'rxjs/operators';
import { SavedSearch } from '../../../models/saved-search';

import { Subscription } from 'rxjs';
import { SavedSearchService } from './../../../_services/saved-search.service';

@Component({
  selector: 'app-products-advanced-search',
  templateUrl: './products-advanced-search.component.html',
  styleUrls: ['./products-advanced-search.component.css']
})
export class ProductsAdvancedSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchForm') searchForm: NgForm;
  @Output() searchResultsReady: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();
  @Output() loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isValidForm: boolean = true;
  products: Array<Product>;
  searchCriteriaDefaultSubscription: Subscription;

  constructor(private productsService: ProductsService,
    private savedSearchService: SavedSearchService) {

  }
    
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.searchCriteriaDefaultSubscription = this.savedSearchService
    .searchCriteriaDefault
    .subscribe(data=>{ console.log('will load adv search', data);
     this.searchForm.form.setValue(data)
  });
  }
  ngOnDestroy(){
    console.log('destroying advanced search');
    this.searchCriteriaDefaultSubscription.unsubscribe();
  }
  searchAdvanced(form: NgForm) {
    this.isValidForm = true;
    const formValue = form.value;
    if (!formValue.name && !formValue.description && !formValue.price && !formValue.quantity) {
      this.isValidForm = false;
      return;
     }

    console.log('name', formValue.name);
    console.log('description', formValue.description);
    console.log('price', formValue.price);
    console.log('quantity', formValue.quantity);

    this.loadingEvent.emit(true);
    this.productsService.advSearch(formValue.name, formValue.description, formValue.price, formValue.quantity)
      .pipe(delay(2000))
      .subscribe(data => {
        this.products = data;
        this.searchResultsReady.emit(this.products);
        this.loadingEvent.emit(false);
      });

  }

  saveSearch(form: NgForm): void {
    // console.log(form.value, 'willbesaved');
    // // form.setValue({
    // //   name:'test name',
    // //   description:'more desc',
    // //   price:'1 million',
    // //   quantity:'last one'
    // // })
    this.isValidForm = true;
    const formValue = form.value;
    if (!formValue.name && !formValue.description && !formValue.price && !formValue.quantity) {
      this.isValidForm = false;
      return;
    }
    let searchName: string = formValue.name ? 'name=' + formValue.name :
      formValue.description ? 'description=' + formValue.description :
        formValue.price ? 'price=' + formValue.price :
          'quantity=' + formValue.quantity;

    var ss: SavedSearch = Object.assign({ name: searchName, searchType: 'advanced', criteria: formValue });
    console.log(ss);
    this.savedSearchService.saveSearch(ss);
  }
}
