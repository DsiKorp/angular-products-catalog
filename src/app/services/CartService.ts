import { Injectable, signal, computed } from '@angular/core';
import { ProductMapped } from '../models/products.model';

export interface CartItem {
  product: ProductMapped;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartItemsArray = computed(() => this.cartItems());

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: ProductMapped, quantity: number = 1) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems();
    this.cartItems.set(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set([...currentItems]);
    }
  }

  clearCart() {
    this.cartItems.set([]);
  }

  getTotalItems() {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}
