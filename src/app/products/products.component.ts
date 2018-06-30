import { SavedSearchService } from './../_services/saved-search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productServiceSubscription: Subscription;
  products: Product[];
  searchTried: boolean = false;
  searchText: string = '';
  showAdvSearch: boolean=false;
  loading: boolean;
  searchTypeSubscription: Subscription;
  constructor(private productService: ProductsService,
    private savedSearchService: SavedSearchService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams.subscribe(params => this.searchText = params['search']);
  }

  ngOnInit() {
    this.search();
    this.searchTypeSubscription = this.savedSearchService
                                      .specificSearchObservable
                                      .pipe(
                                        tap(v=>this.showAdvSearch = (v.searchType === 'advanced')),
                                        delay(0)  // this is a must here
                                      )
                                      .subscribe(ss=> 
                                      {
                                        this.savedSearchService.setSearchCriteriaDefaults(ss.criteria);
                                      }
                                    );
  }

  search(): void {
    if (!this.searchText) { return; }

    this.productServiceSubscription = this.productService.find(this.searchText)
      .subscribe(
        d => {
          console.log(d);
          this.products = d;
        },
        e => console.log('error block', e, `${e.status} [${e.statusText}]`));

  }

  ngOnDestroy() {
    if (this.productServiceSubscription) {
      this.productServiceSubscription.unsubscribe();
    }

    this.searchTypeSubscription.unsubscribe();
  }

  advSearchResultsReady(value: Product[]){
    this.products = value;
  }

  simpleSearchResultsReady(value: Product[]){
    this.products = value;
  }

  showHideLoader(value: boolean){
    this.loading = value;
  }

  switchSearchForm(){
    this.showAdvSearch = !this.showAdvSearch;
    delete this.products; // clear the array when 
  }

}

