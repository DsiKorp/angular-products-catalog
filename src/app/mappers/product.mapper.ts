import { ProductMapped, ProductsMapped } from "../models/products.model";
import { Product, ProductsResponse } from "../models/productsResponse";

export class ProductMapper {

  static mapResponseToProductMapped(product: Product): ProductMapped {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      images: product.images,
      description: product.description,
      dimensions: product.dimensions,
      reviews: product.reviews
    };
  }

  static mapResponseToProductsMapped(productsResponse: ProductsResponse): ProductsMapped {
    return {
      productsMapped: productsResponse.products.map(this.mapResponseToProductMapped),
      total: productsResponse.total
    };
  }
}

// Another version of the mapResponseToProductsMapped method without using the helper method mapResponseToProductMapped

// static mapResponseToProductsMapped(productsResponse: ProductsResponse): ProductsMapped {
//   return {
//     products: productsResponse.products.map(product => ({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       category: product.category,
//       stock: product.stock,
//       rating: product.rating,
//       images: product.images,
//       description: product.description,
//       dimensions: product.dimensions,
//       reviews: product.reviews
//     })),
//     total: productsResponse.total
//   };
// }
