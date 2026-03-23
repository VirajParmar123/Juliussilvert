import { createBrowserRouter } from 'react-router';

/**
 * Route-level code splitting improves initial JS parse/compile and LCP on deep links.
 * Each page becomes its own chunk.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./pages/HomePage').then((m) => ({ Component: m.HomePage })),
  },
  {
    path: '/cart',
    lazy: () => import('./pages/CartPage').then((m) => ({ Component: m.CartPage })),
  },
  {
    path: '/checkout',
    lazy: () => import('./pages/CheckoutPage').then((m) => ({ Component: m.CheckoutPage })),
  },
  {
    path: '/favorites',
    lazy: () => import('./pages/FavoritesPage').then((m) => ({ Component: m.FavoritesPage })),
  },
  {
    path: '/account',
    lazy: () => import('./pages/AccountPage').then((m) => ({ Component: m.AccountPage })),
  },
  {
    path: '/category/:category',
    lazy: () => import('./pages/CategoryPage').then((m) => ({ Component: m.CategoryPage })),
  },
  {
    path: '/search',
    lazy: () => import('./pages/SearchResultsPage').then((m) => ({ Component: m.SearchResultsPage })),
  },
  {
    path: '/product/:productId',
    lazy: () => import('./pages/ProductDetailPage').then((m) => ({ Component: m.ProductDetailPage })),
  },
  {
    path: '/submit-request',
    lazy: () => import('./pages/SubmitRequestPage').then((m) => ({ Component: m.SubmitRequestPage })),
  },
]);
