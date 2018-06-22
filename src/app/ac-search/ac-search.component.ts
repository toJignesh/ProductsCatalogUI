import { ProductsService } from './../_services/products.service';

import { Component, OnInit, Directive, AfterViewInit, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ac-search',
  templateUrl: './ac-search.component.html',
  styleUrls: ['./ac-search.component.css']
})
export class AcSearchComponent implements OnInit, OnDestroy {

  showDropDown: boolean = false;
  values: string[] = [];
  searchForm: FormGroup;
  acSubscription: Subscription;

  constructor(private productService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.searchForm = new FormGroup(
      {
        search: new FormControl()
      }
    );
    this.acSubscription = this.searchForm.get('search').valueChanges
                          .pipe(
                            debounceTime(500),
                            //filter(d=>d.length>2),
                            distinctUntilChanged(),
                            switchMap(v => this.productService.startsWith(v))
                          )
                          .subscribe(
                            results => {
                              console.log(results);
                              this.values = results;
                              this.showDropDown = this.values.length > 0;
                            }
                          );
  }

  ngOnDestroy(){
    this.acSubscription.unsubscribe();
  }
  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
    if (this.values.length = 0) {
      this.showDropDown = false;
    }
  }

  itemSelected(product: any){
    console.log('id of the item selected', product.id);
    this.router.navigate(['products', product.id]);
    this.showDropDown=false;
  }
}
