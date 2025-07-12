import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
  {
    id: 1,
    name: 'Running Shoes',
    description: 'Comfortable and stylish shoes for jogging.',
    price: 120,
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    category: 'Shoes'
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features.',
    price: 900,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Leather Jacket',
    description: 'Stylish leather jacket for winter.',
    price: 250,
    imageUrl: 'https://cdn-images.farfetch-contents.com/17/81/19/24/17811924_37690679_600.jpg',
    category: 'Clothing'
  }
  ];



  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getCategories(): Observable<string[]> {
    return of(['All', ...new Set(this.products.map(p => p.category))]);
  }
}
