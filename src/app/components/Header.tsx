import { Search, ShoppingCart, Heart, User, HelpCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Link, useNavigate } from 'react-router';
import { useMemo, useState } from 'react';
import {
  ALL_CATALOG_PRODUCTS,
  categoryProducts,
  DEPARTMENT_BY_CATEGORY,
} from '../data/catalog';

export function Header() {
  const { getItemCount } = useCart();
  const { favorites } = useFavorites();
  const itemCount = getItemCount();
  const wishlistCount = favorites.length;
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { categoryMatches, productMatches } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return { categoryMatches: [] as { slug: string; label: string; itemCount: number }[], productMatches: [] };
    }

    const categoryMatches = Object.entries(DEPARTMENT_BY_CATEGORY)
      .filter(
        ([categoryKey, { label, slug }]) =>
          label.toLowerCase().startsWith(q) ||
          categoryKey.toLowerCase().startsWith(q) ||
          slug.toLowerCase().startsWith(q)
      )
      .map(([categoryKey, { label, slug }]) => ({
        slug,
        label,
        itemCount: categoryProducts[slug]?.length ?? 0,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
      .slice(0, 6);

    const productMatches = ALL_CATALOG_PRODUCTS.filter((p) => {
      const name = p.name.toLowerCase();
      const sku = p.itemNumber.toLowerCase();
      return name.startsWith(q) || sku.startsWith(q);
    })
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10);

    return { categoryMatches, productMatches };
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-brand-header text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-5 md:gap-6">
        <Link
          to="/"
          className="flex-shrink-0 min-w-0 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-header rounded-sm"
        >
          <img
            src="/images/branding/julius-silvert-logo.png"
            alt="Julius Silvert Est. 1915 logo"
            width={234}
            height={32}
            className="block h-8 sm:h-9 w-auto max-h-9 max-w-[min(100vw-8rem,280px)] object-contain object-left mix-blend-lighten"
            decoding="async"
          />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-[600px] relative order-3 w-full sm:order-none sm:w-auto">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              aria-hidden
            />
            <input
              type="search"
              enterKeyHint="search"
              placeholder="Search products, SKU, categories…"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-black/5 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/50 focus:ring-offset-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setShowSearchResults(false)}
              />
              
              {/* Results Panel — mousedown keeps focus on input until navigation */}
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl max-h-[600px] overflow-y-auto z-50"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="p-4">
                  {categoryMatches.length === 0 && productMatches.length === 0 ? (
                    <p className="text-sm text-gray-600 py-4 text-center">
                      No products or categories starting with &quot;{searchQuery.trim()}&quot;
                    </p>
                  ) : (
                    <>
                      {categoryMatches.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Categories
                          </h3>
                          <div className="space-y-2">
                            {categoryMatches.map((cat) => (
                              <Link
                                key={cat.slug}
                                to={`/category/${cat.slug}`}
                                className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                onClick={() => setShowSearchResults(false)}
                              >
                                <span className="text-base text-gray-900 group-hover:text-gray-700">
                                  {cat.label}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {cat.itemCount} items
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {productMatches.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Products
                          </h3>
                          <div className="space-y-2">
                            {productMatches.map((product) => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                onClick={() => {
                                  setShowSearchResults(false);
                                  setSearchQuery('');
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group text-left"
                              >
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={product.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 mb-1 line-clamp-2">
                                    {product.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Item {product.itemNumber}</span>
                                    <span aria-hidden>•</span>
                                    <span>{product.category}</span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </form>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 ml-auto sm:ml-0">
          {/* User Icon with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors"
              aria-label="Account menu"
            >
              <User className="w-5 h-5" />
            </button>

            {/* User Dropdown Menu — pt-2 is inside the panel so the gap is still hoverable (mt-2 left a dead zone) */}
            {showUserMenu && (
              <div className="absolute top-full right-0 z-50 w-56 pt-2">
                <div className="bg-white text-gray-900 shadow-xl rounded-lg py-2">
                <Link to="/account" className="block px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors">
                  Account Dashboard
                </Link>
                <Link
                  to="/account?tab=address-book"
                  className="block px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                >
                  Address Book
                </Link>
                <Link
                  to="/account?tab=order-guide"
                  className="block px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                >
                  Order Guide/Requisition Lists
                </Link>
                <Link
                  to="/account?tab=wishlist"
                  className="block px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
                >
                  My Wishlist
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors text-gray-900"
                  onClick={() => setShowUserMenu(false)}
                >
                  Sign Out
                </button>
                </div>
              </div>
            )}
          </div>

          {/* My Wishlist */}
          <Link
            to="/favorites"
            className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors"
            title="My Wishlist"
            aria-label={
              wishlistCount > 0
                ? `My Wishlist, ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`
                : 'My Wishlist'
            }
          >
            <Heart className="w-5 h-5 text-white" strokeWidth={1.75} aria-hidden />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6b8e6f] text-white text-xs font-semibold rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Cart */}
          <Link 
            to="/cart"
            className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6b8e6f] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Help — Submit a Request */}
          <Link
            to="/submit-request"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors"
            title="Submit a Request"
            aria-label="Submit a Request"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
