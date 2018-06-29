import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Array<Product>=[];
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  itemSelected(id: number):void{
    this.router.navigate([id],{relativeTo: this.route});
  }

}
