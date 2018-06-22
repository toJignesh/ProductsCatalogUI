import { ProductsService } from './../_services/products.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  productServiceSubscription: Subscription;
  constructor(private productService: ProductsService) { }
  products: Product[] = [];
  searchTried: boolean=false;

  ngOnInit() {
  }

  searchSubmit(f: NgForm){
    this.searchTried =true;
    console.log(f.value);
    this.productServiceSubscription=this.productService.find(f.value.searchText)
    .subscribe(d=>{
      console.log(d);
      this.products=d;},
  e=>console.log('error block',e,`${e.status} [${e.statusText}]`));
  }


  testProductsService(){
    this.productServiceSubscription=this.productService.getAll()
    .subscribe(d=>{
      console.log(d);
      this.products=d;},
  e=>console.log('error block',e,`${e.status} [${e.statusText}]`));
  }

  ngOnDestroy(){
    this.productServiceSubscription.unsubscribe();
  }
}
