import { Minus, Plus, Heart, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  itemNumber: string;
  wasmNumber: string;
  price: number;
  unit: string;
  priceLabel?: string;
  casePrice?: number;
  pcPrice?: number;
  perLb?: number;
  caseInfo?: string;
  /** carousel: horizontal scroll row; grid: same 280px card width in category/search (matches home carousels) */
  variant?: 'carousel' | 'grid';
}

export function ProductCard({ 
  id, 
  image, 
  name, 
  itemNumber, 
  wasmNumber, 
  price, 
  unit, 
  priceLabel,
  casePrice,
  pcPrice,
  perLb,
  caseInfo,
  variant = 'carousel',
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<'case' | 'pc'>('case');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(id);
  
  // Use provided prices or fall back to base price
  const currentPrice = selectedUnit === 'case' ? (casePrice || price) : (pcPrice || price);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddClick = () => {
    if (!showQuantitySelector) {
      setShowQuantitySelector(true);
    } else {
      // Add to cart
      addToCart({ 
        id, 
        image, 
        name, 
        itemNumber, 
        wasmNumber, 
        price: currentPrice, 
        unit: selectedUnit 
      }, quantity);
      // Reset
      setQuantity(1);
      setShowQuantitySelector(false);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ id, image, name, itemNumber, wasmNumber, price, unit });
  };

  const isGrid = variant === 'grid';

  return (
    <div
      className={`group relative flex h-full flex-col self-stretch overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl ${
        isGrid
          ? 'w-full min-w-0 max-w-none min-h-[520px] sm:min-h-[580px]'
          : 'min-h-[580px] w-[280px] max-w-[280px] flex-shrink-0'
      }`}
    >
      {/* Product Image — link to product detail */}
      <div className="relative shrink-0 h-56">
        <Link
          to={`/product/${id}`}
          className="block h-full w-full bg-gray-50 overflow-hidden"
          aria-label={`View ${name}`}
        >
          <img
            src={image}
            alt={name}
            width={224}
            height={224}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavorite();
          }}
          className="absolute top-3 right-3 z-[2] inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
          />
        </button>

        <div className="absolute left-3 bottom-3 right-3 z-[1] flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-white/90">
            Julius Silvert
          </p>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-gray-900 shadow-sm">
              Item #{itemNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="min-h-0">
          <Link to={`/product/${id}`} className="block group">
            <h3 className="mb-2 line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-snug text-gray-950 transition-colors group-hover:text-[#5a7a5e]">
              {name}
            </h3>
          </Link>
          
          {/* Specs row */}
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
            <span className="font-medium text-gray-700">WASM:</span>
            <span className="tabular-nums">{wasmNumber}</span>
            {caseInfo && (
              <>
                <span className="text-gray-300">•</span>
                <span className="line-clamp-1">{caseInfo}</span>
              </>
            )}
          </div>
          
          {/* Unit Toggle - Only show if we have both prices */}
          {casePrice && pcPrice && (
            <div className="mb-3 rounded-2xl bg-gray-50 p-1">
              <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setSelectedUnit('case')}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedUnit === 'case'
                    ? 'bg-white text-gray-950 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
                }`}
              >
                CASE
              </button>
              <button
                onClick={() => setSelectedUnit('pc')}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedUnit === 'pc'
                    ? 'bg-white text-gray-950 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
                }`}
              >
                PC
              </button>
              </div>
            </div>
          )}
        </div>

        {/* Price + actions */}
        <div className="mt-auto space-y-3 pt-0">
          {/* Price */}
          <div className="rounded-2xl bg-gray-50 px-3 py-2.5">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {priceLabel ?? 'Price'}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] font-bold tracking-tight text-gray-950">
                    ${currentPrice.toFixed(2)}
                  </span>
                  {perLb != null ? (
                    <span className="text-xs text-gray-500">/{perLb.toFixed(3)} {unit}</span>
                  ) : (
                    <span className="text-xs text-gray-500">/{unit}</span>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
                  {selectedUnit.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

        {/* Add Button or Quantity Selector */}
        {!showQuantitySelector ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddClick}
              className="flex-1 rounded-2xl bg-brand-header py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-brand-header-hover hover:shadow-md active:scale-[0.99]"
              aria-label={`Add ${name} to cart`}
            >
              ADD
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-3 py-3 text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              aria-label={`More options for ${name}`}
            >
              <Menu className="w-4 h-4 text-gray-700" aria-hidden />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button 
                onClick={handleDecrement}
                className="px-3 py-3 transition-colors hover:bg-gray-50"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <input 
                type="text" 
                value={quantity} 
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(val);
                }}
                className="w-12 border-x border-gray-200 py-3 text-center text-base font-semibold tabular-nums text-gray-950"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="px-3 py-3 transition-colors hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-gray-700" aria-hidden />
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddClick}
              className="flex-1 rounded-2xl bg-[#6b8e6f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5a7a5e] hover:shadow-md active:scale-[0.99]"
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
