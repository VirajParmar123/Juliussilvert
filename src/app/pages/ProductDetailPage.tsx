import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Heart, Menu, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import {
  DEPARTMENT_BY_CATEGORY,
  getProductById,
  getRelatedProducts,
  type CatalogProduct,
} from '../data/catalog';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const DEFAULT_FEATURES = [
  'Restaurant-quality sourcing and handling',
  'Consistent portioning for foodservice',
  'Professional cold-chain packaging',
  'Ask your rep about delivery windows',
];

const BRAND_COPY =
  'Julius Silvert supplies chefs and operators with premium proteins and pantry staples. We focus on traceability, consistent specs, and the kind of quality that holds up on the line every service.';

/** Four gallery slots — query variants keep Unsplash happy; thumbs may differ slightly in crop. */
function galleryUrlsForProduct(imageUrl: string): string[] {
  const base = imageUrl.split('?')[0];
  return [
    imageUrl,
    `${base}?w=500&h=500&fit=crop&auto=format`,
    `${base}?w=500&fit=crop&q=85`,
    `${base}?w=500&auto=format&fm=webp`,
  ];
}

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedUnit, setSelectedUnit] = useState<'case' | 'pc'>('case');
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'brand' | 'reviews'>('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [productId]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.gallery?.length) return product.gallery;
    return galleryUrlsForProduct(product.image);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50">
          <Header />
          <Navigation />
        </div>
        <main
          id="main-content"
          tabIndex={-1}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center outline-none"
        >
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Product not found</h1>
          <Link to="/" className="text-[#6b8e6f] font-medium hover:underline">
            Back to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const dept = DEPARTMENT_BY_CATEGORY[product.category];
  const currentPrice = selectedUnit === 'case' ? product.casePrice : product.pcPrice;
  const rating = product.rating ?? 4.3;
  const reviewCount = product.reviewCount ?? 93;
  const favorite = isFavorite(product.id);
  const related = getRelatedProducts(product, 4);
  const features = product.keyFeatures?.length ? product.keyFeatures : DEFAULT_FEATURES;
  const mainImageSrc = galleryImages[activeImageIndex] ?? product.image;

  const handleAddClick = () => {
    if (!showQuantitySelector) {
      setShowQuantitySelector(true);
    } else {
      addToCart(
        {
          id: product.id,
          image: product.image,
          name: product.name,
          itemNumber: product.itemNumber,
          wasmNumber: product.itemNumber,
          price: currentPrice,
          unit: selectedUnit,
        },
        quantity
      );
      setQuantity(1);
      setShowQuantitySelector(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 outline-none"
      >
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500 uppercase tracking-wide mb-8">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          {dept && (
            <>
              <Link to={`/category/${dept.slug}`} className="hover:text-gray-900">
                {dept.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 font-medium line-clamp-2">{product.name}</span>
        </nav>

        {/* Top: gallery + buy box — gallery a bit wider than square for a slightly “wide” hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] gap-10 lg:gap-16 mb-14">
          <div className="w-full max-w-[520px] mx-auto lg:mx-0">
            <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm">
              <img
                key={activeImageIndex}
                src={mainImageSrc}
                alt={product.name}
                className="h-full w-full object-cover animate-in fade-in-0 zoom-in-95 duration-300"
              />
              <button
                type="button"
                onClick={() =>
                  toggleFavorite({
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    itemNumber: product.itemNumber,
                    wasmNumber: product.itemNumber,
                    price: product.casePrice,
                    unit: product.unit,
                  })
                }
                className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-start">
              {galleryImages.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImageIndex === i}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-header focus-visible:ring-offset-1 sm:h-16 sm:w-16 ${
                    activeImageIndex === i
                      ? 'ring-2 ring-brand-header ring-offset-1'
                      : 'border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">{product.name}</h1>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-gray-800">Brand:</span> JULIUS SILVERT
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-gray-800">Item:</span> {product.itemNumber}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
              <span>({reviewCount} reviews)</span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Size:</p>
              <div className="grid grid-cols-2 gap-2 max-w-xs">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('case')}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedUnit === 'case'
                      ? 'bg-brand-header text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CASE
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('pc')}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedUnit === 'pc'
                      ? 'bg-brand-header text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  PC
                </button>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
                {product.perLb != null && (
                  <span className="text-gray-500 text-sm">
                    / {product.perLb.toFixed(3)} {product.unit} ({selectedUnit})
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">{product.caseInfo}</p>
            </div>

            <div
              className={`mt-8 flex w-full flex-row items-stretch gap-3 ${showQuantitySelector ? 'max-w-lg' : 'max-w-sm'}`}
            >
              {!showQuantitySelector ? (
                <>
                  <button
                    type="button"
                    onClick={handleAddClick}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-header px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-header-hover hover:shadow-md active:scale-[0.99]"
                  >
                    <ShoppingCart className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
                    aria-label="More options"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex min-h-[44px] min-w-0 flex-1 items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-full min-w-[44px] items-center justify-center px-2 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4 text-gray-700" />
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                      className="min-w-0 flex-1 border-x border-gray-200 py-2.5 text-center text-base font-semibold tabular-nums"
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-full min-w-[44px] items-center justify-center px-2 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddClick}
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6b8e6f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5a7a5e] hover:shadow-md"
                  >
                    <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                    Add to cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 pt-2 mb-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200">
            {(
              [
                ['description', 'Product Description'],
                ['features', 'Key Features'],
                ['brand', 'About the Brand'],
                ['reviews', `Reviews (${reviewCount})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`pb-4 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8 text-gray-700">
            {activeTab === 'description' && <p className="max-w-3xl leading-relaxed">{product.description}</p>}
            {activeTab === 'features' && (
              <ul className="list-disc pl-5 space-y-2 max-w-3xl">
                {features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            {activeTab === 'brand' && <p className="max-w-3xl leading-relaxed">{product.brandAbout ?? BRAND_COPY}</p>}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Reviews</h3>
                <p className="text-gray-600 max-w-3xl">
                  Customer reviews and verified ratings will appear here. Demo listing shows {reviewCount} reviews at{' '}
                  {rating.toFixed(1)} average — connect your review provider to go live.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p: CatalogProduct) => (
                <ProductCard
                  key={p.id}
                  variant="grid"
                  id={p.id}
                  image={p.image}
                  name={p.name}
                  itemNumber={p.itemNumber}
                  wasmNumber={p.itemNumber}
                  price={p.casePrice}
                  unit={p.unit}
                  casePrice={p.casePrice}
                  pcPrice={p.pcPrice}
                  perLb={p.perLb}
                  caseInfo={p.caseInfo}
                  priceLabel={p.priceLabel}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
