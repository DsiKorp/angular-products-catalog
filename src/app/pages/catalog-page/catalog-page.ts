import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from '../../services/ProductService';
import { ProductMapped } from '../../models/products.model';
import { ProductList } from '../../components/product-list/product-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-page',
  imports: [CommonModule, ProductList],
  templateUrl: `./catalog-page.html`,
})
export class CatalogPage implements OnInit {
  private productService = inject(ProductService);

  products = signal<ProductMapped[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data.productsMapped);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error.set('Failed to load products. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  retryLoading() {
    this.loadProducts();
  }
}

