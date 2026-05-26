import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

import { Product, ProductsResponse } from '../models/productsResponse';
import { ProductMapped, ProductsMapped } from '../models/products.model';
import { ProductMapper } from '../mappers/product.mapper';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(): Observable<ProductsMapped> {

    return this.http.get<ProductsResponse>(`${environment.apiUrl}/products`)
      .pipe(map(response => ProductMapper.mapResponseToProductsMapped(response)),
        catchError(error => {
          console.error('Error fetching products:', error);
          return throwError(() => new Error('Failed to fetch products. Please try again later.'));
        })
      );
  }

  getProductById(id: number): Observable<ProductMapped> {

    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
      .pipe(map(response => ProductMapper.mapResponseToProductMapped(response)),
        catchError(error => {
          console.error(`Error fetching product with id ${id}:`, error);
          return throwError(() => new Error('Failed to fetch product. Please try again later.'));
        })
      );
  }
}
