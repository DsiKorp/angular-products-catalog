import { ProductMapped } from "../models/products.model";
import { CartService } from "./CartService";


describe('CartService', () => {
  let service: CartService;
  const mockProduct: ProductMapped = {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    price: 9.99,
    category: 'beauty' as any,
    stock: 99,
    rating: 2.56,
    images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'],
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
    dimensions: {
      width: 15.14,
      height: 13.08,
      depth: 22.99
    },
    reviews: [
      {
        rating: 3,
        comment: 'Would not recommend!',
        date: new Date('2025-04-30T09:41:02.053Z'),
        reviewerName: 'Eleanor Collins',
        reviewerEmail: 'eleanor.collins@x.dummyjson.com'
      }
    ]
  };

  beforeEach(() => {
    // Instanciación limpia y rápida sin TestBed
    service = new CartService();
  });

  it('debería inicializar el carrito vacío', () => {
    expect(service.cartItems()).toEqual([]);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });

  it('debería agregar un producto y calcular correctamente los totales (Signals Computados)', () => {
    // Act
    service.addToCart(mockProduct);

    // Assert
    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(1);
    expect(service.getTotalItems()).toBe(1);
    expect(service.getTotalPrice()).toBe(9.99);
  });

  it('debería incrementar la cantidad si el producto ya existe en el carrito', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct); // Agregar por segunda vez

    expect(service.cartItems()[0].quantity).toBe(2);
    expect(service.getTotalItems()).toBe(2);
    expect(service.getTotalPrice()).toBe(19.98);
  });

  it('debería eliminar un producto por completo del carrito', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.id);

    expect(service.cartItems()).toEqual([]);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });

  it('debería actualizar la cantidad de un producto en el carrito', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 5);

    expect(service.cartItems()[0].quantity).toBe(5);
    expect(service.getTotalItems()).toBe(5);
    expect(service.getTotalPrice()).toBe(49.95);
  });

  it('debería limpiar el carrito completamente', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct, 2);
    
    service.clearCart();

    expect(service.cartItems()).toEqual([]);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });

  it('debería manejar múltiples productos diferentes', () => {
    const product2: ProductMapped = {
      ...mockProduct,
      id: 2,
      title: 'Red Lipstick',
      price: 12.99
    };

    service.addToCart(mockProduct, 2);
    service.addToCart(product2, 1);

    expect(service.cartItems().length).toBe(2);
    expect(service.getTotalItems()).toBe(3);
    expect(service.getTotalPrice()).toBeCloseTo(32.97, 2);
  });

  it('debería no agregar producto con cantidad 0', () => {
    service.addToCart(mockProduct, 0);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(0);
  });

  it('debería mantener reactividad con Signals', () => {
    service.addToCart(mockProduct);
    const initialTotal = service.getTotalItems();

    service.addToCart(mockProduct);
    const newTotal = service.getTotalItems();

    expect(newTotal).toBe(initialTotal + 1);
  });
});