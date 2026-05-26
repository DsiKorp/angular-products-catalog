import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductMapped } from '../../models/products.model';
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input() product!: ProductMapped;
  @Output() cartUpdated = new EventEmitter<void>();

  private cartService = inject(CartService);

  addToCart() {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product, 1);
      this.cartUpdated.emit();
    }
  }
}

