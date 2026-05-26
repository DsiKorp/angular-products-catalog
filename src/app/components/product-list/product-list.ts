import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMapped } from '../../models/products.model';
import { ProductCard } from '../product-card/product-card';
import { SortControls, SortBy } from '../sort-controls/sort-controls';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard, SortControls],
  template: `
    <div class="space-y-6">
      <app-sort-controls (sortChanged)="onSortChange($event)" />
      
      <div *ngIf="sortedProducts().length === 0" class="text-center py-8">
        <p class="text-gray-500">No products found</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <app-product-card
          *ngFor="let product of sortedProducts()"
          [product]="product"
          (cartUpdated)="onCartUpdated()"
        />
      </div>
    </div>
  `,
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  @Input() products: ProductMapped[] = [];

  private sortBy = signal<SortBy>('none');

  sortedProducts = computed(() => {
    const products = [...this.products];
    const sortType = this.sortBy();

    switch (sortType) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating-asc':
        return products.sort((a, b) => a.rating - b.rating);
      case 'rating-desc':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  });

  onSortChange(sortType: SortBy) {
    this.sortBy.set(sortType);
  }

  onCartUpdated() {
    // Toast or other feedback can be added here
    console.log('Product added to cart');
  }
}

