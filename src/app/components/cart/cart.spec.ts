import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { CartService } from '../../services/CartService';
import { signal } from '@angular/core';
import { ProductMapped } from '../../models/products.model';
import { vi } from 'vitest';

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let mockCartService: any;

  const mockProduct: ProductMapped = {
    id: 1,
    title: 'Test Product',
    price: 10.0,
    category: 'beauty' as any,
    stock: 5,
    rating: 4.0,
    images: ['img1.jpg'],
    description: 'Test description',
    dimensions: { width: 10, height: 10, depth: 10 },
    reviews: []
  };

  const mockCartItem = { product: mockProduct, quantity: 2 };

  beforeEach(async () => {
    mockCartService = {
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartItems: vi.fn().mockReturnValue(signal([mockCartItem])),
      addToCart: vi.fn(),
      getTotalItems: vi.fn(),
      getTotalPrice: vi.fn(),
      cartItems: signal([mockCartItem])
    };

    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [{ provide: CartService, useValue: mockCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería inyectar CartService', () => {
    expect(component.cartService).toBeTruthy();
  });

  it('debería eliminar producto del carrito', () => {
    component.removeFromCart(1);

    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('debería actualizar cantidad del producto', () => {
    component.updateQuantity(1, 3);

    expect(mockCartService.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('no debería actualizar cantidad si es menor o igual a 0', () => {
    component.updateQuantity(1, 0);

    expect(mockCartService.updateQuantity).not.toHaveBeenCalled();
  });

  it('debería aumentar cantidad del producto', () => {
    component.increaseQuantity(1);

    expect(mockCartService.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('debería disminuir cantidad del producto', () => {
    component.decreaseQuantity(1);

    expect(mockCartService.updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('no debería disminuir cantidad si es 1', () => {
    mockCartService.getCartItems.mockReturnValue(signal([{ product: mockProduct, quantity: 1 }]));

    component.decreaseQuantity(1);

    expect(mockCartService.updateQuantity).not.toHaveBeenCalled();
  });

  it('no debería aumentar cantidad de producto inexistente', () => {
    mockCartService.getCartItems.mockReturnValue(signal([]));

    component.increaseQuantity(999);

    expect(mockCartService.updateQuantity).not.toHaveBeenCalled();
  });

  it('no debería disminuir cantidad de producto inexistente', () => {
    mockCartService.getCartItems.mockReturnValue(signal([]));

    component.decreaseQuantity(999);

    expect(mockCartService.updateQuantity).not.toHaveBeenCalled();
  });

  it('debería tener métodos para manipular el carrito', () => {
    expect(typeof component.removeFromCart).toBe('function');
    expect(typeof component.updateQuantity).toBe('function');
    expect(typeof component.increaseQuantity).toBe('function');
    expect(typeof component.decreaseQuantity).toBe('function');
  });
});
