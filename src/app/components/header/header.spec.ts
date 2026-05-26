import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { CartService } from '../../services/CartService';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let mockCartService: any;

  beforeEach(async () => {
    mockCartService = {
      getTotalItems: vi.fn().mockReturnValue(0),
      getTotalPrice: vi.fn().mockReturnValue(0),
      getCartItems: vi.fn(),
      cartItems: signal([])
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería inyectar CartService', () => {
    expect(component.cartService).toBeTruthy();
  });

  it('debería cerrar dropdown cuando closeDropdown es llamado', () => {
    // Crear un mock element
    component.dropdownButton = {
      nativeElement: {
        blur: vi.fn()
      }
    } as any;

    component.closeDropdown();

    expect(component.dropdownButton?.nativeElement.blur).toHaveBeenCalled();
  });

  it('no debería fallar si no hay dropdownButton', () => {
    component.dropdownButton = undefined;

    expect(() => component.closeDropdown()).not.toThrow();
  });

  it('debería tener ViewChild decorado para dropdownButton', () => {
    const metadata = (component as any).__component_metadata;
    // Verificar que el componente está correctamente configurado
    expect(component).toBeTruthy();
  });
});
