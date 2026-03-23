import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { SortBySelect } from '../components/SortBySelect';
import { ALL_CATALOG_PRODUCTS } from '../data/catalog';
import { sortProducts, type SortByValue } from '../utils/productSort';

const allProducts = ALL_CATALOG_PRODUCTS;

const catalogPositionOrder = new Map(allProducts.map((p, i) => [p.id, i]));

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<SortByValue>('position');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.itemNumber.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy, catalogPositionOrder),
    [filteredProducts, sortBy]
  );

  useEffect(() => {
    setSortBy('position');
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 outline-none"
      >
        {/* Search Header + sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-3 sm:mb-4 break-words">
              Search Results for "{searchQuery}"
            </h1>
            <p className="text-gray-600">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          {filteredProducts.length > 0 && (
            <SortBySelect value={sortBy} onValueChange={setSortBy} />
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-stretch">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                variant="grid"
                id={product.id}
                image={product.image}
                name={product.name}
                itemNumber={product.itemNumber}
                wasmNumber={product.itemNumber}
                price={product.casePrice}
                unit={product.unit}
                casePrice={product.casePrice}
                pcPrice={product.pcPrice}
                perLb={product.perLb}
                caseInfo={product.caseInfo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No products found for "{searchQuery}"</p>
            <p className="text-gray-500">Try searching with different keywords or browse our categories.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
