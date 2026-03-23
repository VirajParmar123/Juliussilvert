import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ShopBySidebar } from '../components/ShopBySidebar';
import { SortBySelect } from '../components/SortBySelect';
import {
  CATEGORY_SLUG_TITLE,
  categoryProducts,
  countFacets,
  getProductFacets,
} from '../data/catalog';
import { sortProducts, type SortByValue } from '../utils/productSort';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const categoryKey = category?.toLowerCase().replace(/ /g, '-') || '';
  const products = categoryProducts[categoryKey] || [];

  const categoryName =
    CATEGORY_SLUG_TITLE[categoryKey] ||
    category
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') ||
    '';

  const { subcategories, brands } = useMemo(() => countFacets(products), [products]);

  const positionOrder = useMemo(
    () => new Map(products.map((p, i) => [p.id, i])),
    [products]
  );

  const [sortBy, setSortBy] = useState<SortByValue>('position');
  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSortBy('position');
  }, [categoryKey]);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());

  const toggleSubcategory = useCallback((label: string) => {
    setSelectedSubcategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const toggleBrand = useCallback((label: string) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedSubcategories(new Set());
    setSelectedBrands(new Set());
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const f = getProductFacets(p);
      const subOk =
        selectedSubcategories.size === 0 || selectedSubcategories.has(f.subcategory);
      const brandOk = selectedBrands.size === 0 || selectedBrands.has(f.brand);
      return subOk && brandOk;
    });
  }, [products, selectedSubcategories, selectedBrands]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy, positionOrder),
    [filteredProducts, sortBy, positionOrder]
  );

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
        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          {products.length > 0 && (
            <ShopBySidebar
              pageTitle={categoryName}
              subcategories={subcategories.map(([label, count]) => ({ label, count }))}
              brands={brands.map(([label, count]) => ({ label, count }))}
              selectedSubcategories={selectedSubcategories}
              selectedBrands={selectedBrands}
              onToggleSubcategory={toggleSubcategory}
              onToggleBrand={toggleBrand}
              onClearAll={clearFilters}
            />
          )}

          <div className="flex-1 min-w-0 w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-gray-600">
                  Browse our selection of premium {categoryName.toLowerCase()} products. All items are
                  restaurant-quality and professionally sourced.
                </p>
                {products.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    Showing {filteredProducts.length} of {products.length} items
                  </p>
                )}
              </div>
              {products.length > 0 && filteredProducts.length > 0 && (
                <SortBySelect value={sortBy} onValueChange={setSortBy} />
              )}
            </div>

            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center">
                  <p className="text-gray-700 font-medium mb-2">No products match these filters</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-[#6b8e6f] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
                <p className="text-gray-500">Please check back later or browse our other categories.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
