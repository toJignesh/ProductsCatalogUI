import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productServiceSubscription: Subscription;
  products: Product[] = [];
  searchTried: boolean = false;
  searchText: string = '';
  showAdvSearch: boolean=false;
  loading: boolean;

  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams.subscribe(params => this.searchText = params['search']);
  }

  ngOnInit() {
    this.search();
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
}

