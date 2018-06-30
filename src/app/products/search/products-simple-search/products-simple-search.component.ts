
import { Component, OnInit, Directive, AfterViewInit, ViewChild, ElementRef, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged, filter, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ProductsService } from '../../../_services/products.service';
import { Product } from '../../../models/product';
import { SavedSearchService } from 'src/app/_services/saved-search.service';
import { SavedSearch } from 'src/app/models/saved-search';

@Component({
  selector: 'app-products-simple-search',
  templateUrl: './products-simple-search.component.html',
  styleUrls: ['./products-simple-search.component.css']
})
export class ProductSimpleSearchComponent implements OnInit, OnDestroy{
  @Output() searchResultsReady: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();
  @Output() loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDropDown: boolean = false;
  values: string[] = [];
  searchForm: FormGroup;
  acSubscription: Subscription;
  productServiceSubscription: Subscription;
  loadSearchFromObsSubscription: Subscription;

  constructor(private productService: ProductsService,
    private router: Router,
    private savedSearchService: SavedSearchService) {

      this.loadSearchFromObsSubscription = this.savedSearchService
      .searchCriteriaDefault
      .subscribe(data=>{ console.log('will load simple search', data); 
      this.searchForm.setValue(data)
    }
    );
     }

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
    console.log('destroying simple search');

    try {
      this.loadSearchFromObsSubscription.unsubscribe();
      this.acSubscription.unsubscribe();
      this.productServiceSubscription.unsubscribe();
    } catch (err) {
      
    }
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

  saveSearch(): void {
    let searchName: string = `simple: ${this.searchForm.value.search}`;

    var ss: SavedSearch = Object.assign({ name: searchName, searchType: 'simple', criteria: this.searchForm.value });
    console.log(ss);
    this.savedSearchService.saveSearch(ss);
  }
}
