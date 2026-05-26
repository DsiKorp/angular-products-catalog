import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/ProductService';
import { ProductMapped } from '../../models/products.model';
import { signal } from '@angular/core';
import { ImageCarousel } from '../image-carousel/image-carousel';
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ImageCarousel, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<ProductMapped | null>(null);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe({
          next: (product) => {
            this.product.set(product);
          },
          error: (error) => {
            console.error('Error loading product:', error);
          }
        });
      }
    });
  }

  addToCart() {
    const prod = this.product();
    if (prod && prod.stock > 0) {
      this.cartService.addToCart(prod, 1);
    }
  }
}

