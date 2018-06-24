import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  searchSubmit(f: NgForm) {
    this.searchTried = true;
    console.log(f.value);
    this.router.navigate(['products'], { queryParams: { search: f.value.searchText } }).then(_ => this.search());
  }


  testProductsService() {
    this.productServiceSubscription = this.productService.getAll()
      .subscribe(d => {
        console.log(d);
        this.products = d;
      },
        e => console.log('error block', e, `${e.status} [${e.statusText}]`));
  }

  itemSelected(id: number):void{
    this.router.navigate(['products',id]);
  }

  ngOnDestroy() {
    if (this.productServiceSubscription) {
      this.productServiceSubscription.unsubscribe();
    }
  }

  someoneHitEnter(value: string):void{
    console.log('value has reached the parent component', value);
    
    this.router.navigate(['products'], { queryParams: { search: value } }).then(_ => this.search());
  }
}

