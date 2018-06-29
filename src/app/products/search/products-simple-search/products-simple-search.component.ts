import { Component, OnInit, Directive, AfterViewInit, ViewChild, ElementRef, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged, filter, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ProductsService } from '../../../_services/products.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products-simple-search',
  templateUrl: './products-simple-search.component.html',
  styleUrls: ['./products-simple-search.component.css']
})
export class ProductSimpleSearchComponent implements OnInit, OnDestroy {
  @Output() searchResultsReady: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();
  @Output() loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDropDown: boolean = false;
  values: string[] = [];
  searchForm: FormGroup;
  acSubscription: Subscription;
  productServiceSubscription: Subscription;

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

  ngOnDestroy() {
    this.acSubscription.unsubscribe();
  }
  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
    if (this.values.length = 0) {
      this.showDropDown = false;
    }
  }

  itemSelected(product: any) {
    console.log('id of the item selected', product.id);
    this.router.navigate(['products', product.id]);
    // search results ready with single item in array
    this.searchResultsReady.emit([product]);

    this.showDropDown = false;
  }

  enterPressed(ctrl: FormGroup): void {
    const newValue = ctrl.get('search').value;
    if (!newValue) { return; }

    this.showDropDown = false;
    this.loadingEvent.emit(true);

    this.productServiceSubscription = this.productService.find(newValue)
      .pipe(delay(2000))
      .subscribe(
        d => {
          console.log(d);
          this.searchResultsReady.emit(d);
          this.loadingEvent.emit(false);
        },
        e => console.log('error block', e, `${e.status} [${e.statusText}]`));

  }
}
