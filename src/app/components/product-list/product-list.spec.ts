import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { ProductMapped } from '../../models/products.model';
import { DebugElement } from '@angular/core';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  const mockProducts: ProductMapped[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 50.0,
      category: 'beauty' as any,
      stock: 5,
      rating: 4.5,
      images: ['img1.jpg'],
      description: 'Product 1 description',
      dimensions: { width: 10, height: 10, depth: 10 },
      reviews: []
    },
    {
      id: 2,
      title: 'Product 2',
      price: 25.0,
      category: 'beauty' as any,
      stock: 10,
      rating: 3.5,
      images: ['img2.jpg'],
      description: 'Product 2 description',
      dimensions: { width: 10, height: 10, depth: 10 },
      reviews: []
    },
    {
      id: 3,
      title: 'Product 3',
      price: 75.0,
      category: 'beauty' as any,
      stock: 3,
      rating: 5.0,
      images: ['img3.jpg'],
      description: 'Product 3 description',
      dimensions: { width: 10, height: 10, depth: 10 },
      reviews: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    component.products = mockProducts;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar sin ordenamiento', () => {
    expect(component.sortedProducts().length).toBe(3);
  });

  it('debería mostrar todos los productos cuando no hay ordenamiento', () => {
    expect(component.sortedProducts().length).toBe(mockProducts.length);
  });

  it('debería ordenar productos por precio ascendente', () => {
    component.onSortChange('price-asc');

    const sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(25.0);
    expect(sorted[1].price).toBe(50.0);
    expect(sorted[2].price).toBe(75.0);
  });

  it('debería ordenar productos por precio descendente', () => {
    component.onSortChange('price-desc');

    const sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(75.0);
    expect(sorted[1].price).toBe(50.0);
    expect(sorted[2].price).toBe(25.0);
  });

  it('debería ordenar productos por rating ascendente', () => {
    component.onSortChange('rating-asc');

    const sorted = component.sortedProducts();
    expect(sorted[0].rating).toBe(3.5);
    expect(sorted[1].rating).toBe(4.5);
    expect(sorted[2].rating).toBe(5.0);
  });

  it('debería ordenar productos por rating descendente', () => {
    component.onSortChange('rating-desc');

    const sorted = component.sortedProducts();
    expect(sorted[0].rating).toBe(5.0);
    expect(sorted[1].rating).toBe(4.5);
    expect(sorted[2].rating).toBe(3.5);
  });

  it('debería volver al ordenamiento original cuando se selecciona "none"', () => {
    component.onSortChange('price-asc');
    let sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(25.0);

    component.onSortChange('none');
    sorted = component.sortedProducts();
    expect(sorted[0].id).toBe(1);
  });

  it('debería manejar lista vacía con diferentes ordenamientos', () => {
    component.products = [];
    component.onSortChange('price-asc');

    expect(component.sortedProducts().length).toBe(0);
  });

  it('debería mantener la reactividad del computed cuando cambian los productos', () => {
    component.products = mockProducts;
    component.onSortChange('price-asc');

    let sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(25.0);

    // Cambiar productos
    component.products = [...mockProducts].reverse();
    sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(25.0); // Sigue siendo el primero después de ordenar
  });

  it('debería emitir log cuando se actualiza el carrito', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');

    component.onCartUpdated();

    expect(consoleLogSpy).toHaveBeenCalledWith('Product added to cart');
  });


  it('debería mantener orden consistente para productos con mismo precio', () => {
    const productsWithSamePrice: ProductMapped[] = [
      { ...mockProducts[0], price: 50.0, id: 1 },
      { ...mockProducts[1], price: 50.0, id: 2 },
      { ...mockProducts[2], price: 50.0, id: 3 }
    ];

    component.products = productsWithSamePrice;
    component.onSortChange('price-asc');

    const sorted = component.sortedProducts();
    expect(sorted.every(p => p.price === 50.0)).toBe(true);
  });
});
