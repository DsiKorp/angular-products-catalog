import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'catalog',
    component: CatalogPage
  },
  {
    path: 'product/:id',
    component: ProductDetail
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    // 404 page
    path: '**',
    redirectTo: ''
  }
];
