import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-products-advanced-search',
  templateUrl: './products-advanced-search.component.html',
  styleUrls: ['./products-advanced-search.component.css']
})
export class ProductsAdvancedSearchComponent implements OnInit {
  advSearchForm: FormGroup;
  isValidForm: boolean = true;
  constructor() {



  }

  ngOnInit() {
  }

  searchAdvanced(form: NgForm) {
    this.isValidForm=true;
    const formValue = form.value;
    if (!formValue.id && !formValue.name && !formValue.description && !formValue.price && !formValue.quantity) {
      this.isValidForm = false;
      return;
    }

    console.log('id',formValue.id);
    console.log('name',formValue.name);
    console.log('description', formValue.description);
    console.log('price',formValue.price);
    console.log('quantity', formValue.quantity);
  }
}
