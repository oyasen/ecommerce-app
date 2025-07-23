import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.products.map((item: any) => this.mapToProduct(item)))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.mapToProduct(item))
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const productCategories = new Set(response.products.map((item: any) => item.category));
        return ['All', ...Array.from(productCategories)];
      })
    );
  }

  private mapToProduct(item: any): Product {
    return {
      id: item.id,
      name: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.images[0] || '',
      category: item.category
    };
  }
}
