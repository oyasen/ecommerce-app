import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filter();
    });

    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  filter(): void {
    this.filtered = this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }
}
