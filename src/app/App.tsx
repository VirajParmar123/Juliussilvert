import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RequisitionListsProvider } from './context/RequisitionListsContext';
import { router } from './routes';
import { CartToaster } from './components/CartToaster';
import { PageLoadingFallback } from './components/PageLoadingFallback';

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <RequisitionListsProvider>
          <Suspense fallback={<PageLoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
          <CartToaster />
        </RequisitionListsProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}