import { Product } from './../models/product';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<Product[]>('/api/products')
      .pipe(
        map(data=>{
          return data.map( d=>({
            id: d.productId,
            name: d.name,
            briefDescription: d.briefDescription,
            price: d.price,
            quantity: d.quantity
          }))
        }),
        catchError(err=> throwError(err))
      );
  }

  find(q: string):Observable<any>{
    return this.http.get<Product[]>(`/api/products/find?q=${q}`)
      .pipe(
        map(data=>{
          return data.map( d=>({
            id: d.productId,
            name: d.name,
            briefDescription: d.briefDescription,
            price: d.price,
            quantity: d.quantity
          }))
        }),
        catchError(err=> throwError(err))
      );
  }
}
