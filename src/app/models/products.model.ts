import { Category, Dimensions, Review } from "./productsResponse";

export interface ProductsMapped {
  productsMapped: ProductMapped[];
  total: number;
}

export interface ProductMapped {
  id: number;
  title: string;
  price: number;
  category: Category;
  stock: number;
  rating: number;
  images: string[];
  description: string;
  dimensions: Dimensions;
  reviews: Review[];
}
