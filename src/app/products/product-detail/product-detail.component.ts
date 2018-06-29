import { switchMap, delay, tap } from 'rxjs/operators';
import { ProductsService } from './../../_services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: number;
  productSubscription:Subscription;
  product: Product;
  loading:boolean;

  constructor(private route: ActivatedRoute, 
              private productsService:ProductsService) { 
                this.loading=true;
    this.route.params
    .pipe(
      tap(()=>this.loading=true),
      delay(2000),
      switchMap(params=>this.productsService.getById(+params['id']))
    )
    .subscribe(p=>
      {
        this.product = p
        this.loading = false;
      }
    );                

    //this.productId=this.route.snapshot.params['id'];
    console.log(`product with id= ${this.productId} is selected`);
  }

  ngOnInit() {
    // this.productSubscription = this.productsService.getById(this.productId)
    //                           .subscribe(p=> this.product=p);
  }

  ngOnDestroy(){
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }
}
