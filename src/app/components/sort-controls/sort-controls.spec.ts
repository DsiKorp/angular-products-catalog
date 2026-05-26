import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortControls, SortBy } from './sort-controls';
import { vi } from 'vitest';

describe('SortControls', () => {
  let component: SortControls;
  let fixture: ComponentFixture<SortControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortControls]
    }).compileComponents();

    fixture = TestBed.createComponent(SortControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir sortChanged con none cuando se selecciona "No sorting"', () => {
    vi.spyOn(component.sortChanged, 'emit');
    const event = { target: { value: 'none' } } as any;
    component.onSortChange(event);

    expect(component.sortChanged.emit).toHaveBeenCalledWith('none');
  });

  it('debería emitir sortChanged con price-asc cuando se selecciona "Price: Low to High"', () => {
    vi.spyOn(component.sortChanged, 'emit');
    const event = { target: { value: 'price-asc' } } as any;
    component.onSortChange(event);

    expect(component.sortChanged.emit).toHaveBeenCalledWith('price-asc');
  });

  it('debería emitir sortChanged con price-desc cuando se selecciona "Price: High to Low"', () => {
    vi.spyOn(component.sortChanged, 'emit');
    const event = { target: { value: 'price-desc' } } as any;
    component.onSortChange(event);

    expect(component.sortChanged.emit).toHaveBeenCalledWith('price-desc');
  });

  it('debería emitir sortChanged con rating-asc cuando se selecciona "Rating: Low to High"', () => {
    vi.spyOn(component.sortChanged, 'emit');
    const event = { target: { value: 'rating-asc' } } as any;
    component.onSortChange(event);

    expect(component.sortChanged.emit).toHaveBeenCalledWith('rating-asc');
  });

  it('debería emitir sortChanged con rating-desc cuando se selecciona "Rating: High to Low"', () => {
    vi.spyOn(component.sortChanged, 'emit');
    const event = { target: { value: 'rating-desc' } } as any;
    component.onSortChange(event);

    expect(component.sortChanged.emit).toHaveBeenCalledWith('rating-desc');
  });

  it('debería tener un EventEmitter para sortChanged', () => {
    expect(component.sortChanged).toBeDefined();
  });

  it('debería emitir múltiples cambios de ordenamiento', () => {
    vi.spyOn(component.sortChanged, 'emit');

    const event1 = { target: { value: 'price-asc' } } as any;
    component.onSortChange(event1);
    expect(component.sortChanged.emit).toHaveBeenCalledWith('price-asc');

    const event2 = { target: { value: 'rating-desc' } } as any;
    component.onSortChange(event2);
    expect(component.sortChanged.emit).toHaveBeenCalledWith('rating-desc');
  });
});
