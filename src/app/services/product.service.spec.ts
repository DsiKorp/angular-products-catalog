import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './ProductService';
import { environment } from '../../environments/environment';
import { ProductsResponse, Product } from '../models/productsResponse';
import { firstValueFrom } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara.',
    category: 'beauty' as any,
    price: 9.99,
    discountPercentage: 8.87,
    rating: 2.56,
    stock: 99,
    tags: ['mascara', 'beauty', 'eye makeup'],
    brand: 'Essence',
    sku: 'ESSENCE001',
    weight: 2,
    dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock' as any,
    reviews: [],
    returnPolicy: '30 days return policy' as any,
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      barcode: 'ABC123',
      qrCode: 'QR123'
    },
    images: ['img1.jpg'],
    thumbnail: 'thumb.jpg'
  };

  const mockProductsResponse: ProductsResponse = {
    products: [mockProduct],
    total: 1,
    skip: 0,
    limit: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los productos', async () => {
    const promise = firstValueFrom(service.getProducts());
    
    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductsResponse);

    const data = await promise;
    expect(data.productsMapped.length).toBe(1);
    expect(data.productsMapped[0].title).toBe('Essence Mascara Lash Princess');
    expect(data.total).toBe(1);
  });

  it('debería obtener un producto por ID', async () => {
    const promise = firstValueFrom(service.getProductById(1));
    
    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);

    const data = await promise;
    expect(data.id).toBe(1);
    expect(data.title).toBe('Essence Mascara Lash Princess');
    expect(data.price).toBe(9.99);
  });

  it('debería manejar error al obtener productos', async () => {
    const promise = firstValueFrom(service.getProducts()).catch(error => error);
    
    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    req.error(new ErrorEvent('Network error'), { status: 500 });

    const error = await promise;
    expect(error.message).toContain('Failed to fetch products');
  });

  it('debería manejar error al obtener producto por ID', async () => {
    const promise = firstValueFrom(service.getProductById(999)).catch(error => error);
    
    const req = httpMock.expectOne(`${environment.apiUrl}/products/999`);
    req.error(new ErrorEvent('Network error'), { status: 404 });

    const error = await promise;
    expect(error.message).toContain('Failed to fetch product');
  });

  it('debería mapear respuesta correctamente', async () => {
    const promise = firstValueFrom(service.getProducts());
    
    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    req.flush(mockProductsResponse);

    const data = await promise;
    expect(data.productsMapped).toBeDefined();
    expect(Array.isArray(data.productsMapped)).toBe(true);
  });
});
