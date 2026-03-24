import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { SortBySelect } from '../components/SortBySelect';
import { ALL_CATALOG_PRODUCTS } from '../data/catalog';
import { getEmptySearchRecovery, productMatchesSearch } from '../utils/catalogSearch';
import { sortProducts, type SortByValue } from '../utils/productSort';

const allProducts = ALL_CATALOG_PRODUCTS;

const catalogPositionOrder = new Map(allProducts.map((p, i) => [p.id, i]));

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<SortByValue>('position');

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => productMatchesSearch(product, searchQuery));
  }, [searchQuery]);

  const emptyRecovery = useMemo(
    () => (searchQuery.trim() ? getEmptySearchRecovery(searchQuery, allProducts) : null),
    [searchQuery]
  );

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
          <div className="py-10 sm:py-14 max-w-3xl mx-auto text-center">
            <div
              role="alert"
              className="mb-8 flex gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-4 sm:px-5 sm:py-5 text-left max-w-xl mx-auto shadow-sm"
            >
              <AlertCircle
                className="h-6 w-6 shrink-0 text-rose-600 mt-0.5"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-rose-950 text-base sm:text-lg font-semibold mb-1">
                  We don&apos;t have any items that match &quot;{searchQuery}&quot;.
                </p>
                <p className="text-rose-900/85 text-sm sm:text-base">
                  Try a different search term, or use the links below to find something else.
                </p>
              </div>
            </div>

            {emptyRecovery && (
              <div className="text-left space-y-8">
                {emptyRecovery.didYouMean.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
                      Did you mean
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {emptyRecovery.didYouMean.map((s) => (
                        <Link
                          key={s.href}
                          to={s.href}
                          className="inline-flex items-center rounded-full bg-[#6b8e6f]/15 text-[#3d5a40] px-4 py-2 text-sm font-medium hover:bg-[#6b8e6f]/25 transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {emptyRecovery.relatedDepartments.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
                      Related departments
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {emptyRecovery.relatedDepartments.map((s) => (
                        <Link
                          key={s.href}
                          to={s.href}
                          className="inline-flex items-center rounded-full ring-1 ring-gray-200 bg-white text-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
                    Browse departments
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {emptyRecovery.browseDepartments.map((d) => (
                      <Link
                        key={d.href}
                        to={d.href}
                        className="text-sm text-[#3d5a40] underline underline-offset-2 hover:text-[#2d4330]"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
                    Popular right now
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-stretch">
                    {emptyRecovery.popularProducts.map((product) => (
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
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
