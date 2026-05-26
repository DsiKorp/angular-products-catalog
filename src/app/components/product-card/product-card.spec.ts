import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { CartService } from '../../services/CartService';
import { ProductMapped } from '../../models/products.model';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let mockCartService: any;

  const mockProduct: ProductMapped = {
    id: 1,
    title: 'Essence Mascara',
    price: 9.99,
    category: 'beauty' as any,
    stock: 10,
    rating: 2.5,
    images: ['img1.jpg'],
    description: 'Test product',
    dimensions: { width: 15, height: 13, depth: 22 },
    reviews: []
  };

  beforeEach(async () => {
    mockCartService = {
      addToCart: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar producto al carrito cuando hay stock', () => {
    component.addToCart();

    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('no debería agregar producto sin stock', () => {
    component.product = { ...mockProduct, stock: 0 };
    component.addToCart();

    expect(mockCartService.addToCart).not.toHaveBeenCalled();
  });

  it('debería emitir cartUpdated cuando se agrega al carrito', () => {
    vi.spyOn(component.cartUpdated, 'emit');
    component.addToCart();

    expect(component.cartUpdated.emit).toHaveBeenCalled();
  });

  it('debería tener stock disponible', () => {
    expect(component.product.stock).toBeGreaterThan(0);
  });

  it('debería mostrar la información del producto correcta', () => {
    expect(component.product.title).toBe('Essence Mascara');
    expect(component.product.price).toBe(9.99);
    expect(component.product.rating).toBe(2.5);
  });
});
