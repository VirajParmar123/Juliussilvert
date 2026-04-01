import { Minus, Plus, Heart, Menu, ShoppingCart } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
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
  variant?: 'carousel' | 'grid';
}

const CARD_W = 320;
const CARD_IMG_H = 220;
/** Outer radius — matches reference ~20–24px */
const CARD_RADIUS = 24;

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
      addToCart(
        {
          id,
          image,
          name,
          itemNumber,
          wasmNumber,
          price: currentPrice,
          unit: selectedUnit,
        },
        quantity
      );
      setQuantity(1);
      setShowQuantitySelector(false);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ id, image, name, itemNumber, wasmNumber, price, unit });
  };

  const isGrid = variant === 'grid';

  const cardStyle: CSSProperties = {
    boxSizing: 'border-box',
    width: isGrid ? '100%' : `min(${CARD_W}px, calc(100vw - 2rem))`,
    maxWidth: CARD_W,
  };

  return (
    <div
      className={`group relative flex shrink-0 flex-col overflow-hidden border border-[#d4c9bc] bg-[#faf8f4] shadow-sm transition-shadow hover:shadow-md ${
        isGrid ? 'mx-auto w-full' : ''
      }`}
      style={{
        ...cardStyle,
        borderRadius: CARD_RADIUS,
      }}
    >
      {/* Image — rounded top only; square bottom edge */}
      <div className="relative shrink-0 overflow-hidden bg-stone-200/50" style={{ height: CARD_IMG_H }}>
        <Link to={`/product/${id}`} className="block h-full w-full" aria-label={`View ${name}`}>
          <img
            src={image}
            alt={name}
            width={320}
            height={220}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavorite();
          }}
          className="absolute right-3 top-3 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-200/95 shadow-sm ring-1 ring-white/60 transition-colors hover:bg-gray-100"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        <div className="absolute bottom-2.5 left-3 right-3 z-[1] flex items-end justify-between gap-2">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-md">
            JULIUS SILVERT
          </p>
          <span className="inline-flex shrink-0 items-center rounded-full bg-gray-200/95 px-2.5 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-white/40">
            Item #{itemNumber}
          </span>
        </div>
      </div>

      <div className="flex flex-col px-3.5 pb-2 pt-3 sm:px-4 sm:pb-2">
        {/* Top block: stacks directly above price — no flex-1 here (avoids a dead gap above price) */}
        <div className="shrink-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
          <Link to={`/product/${id}`} className="block group/title">
            <h3 className="mb-1.5 line-clamp-2 min-h-[40px] font-['Libre_Baskerville',Georgia,serif] text-[15px] font-bold leading-snug text-[#1a3d2e] transition-colors group-hover/title:text-[#234d3a]">
              {name}
            </h3>
          </Link>

          <div className="mb-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-gray-600">
            <span>WASM:</span>
            <span className="tabular-nums">{wasmNumber}</span>
            {caseInfo && (
              <>
                <span className="text-gray-400">•</span>
                <span className="line-clamp-1">{caseInfo}</span>
              </>
            )}
          </div>

          {casePrice && pcPrice && (
            <div
              className="rounded-full bg-[#ece8e0] p-1"
              title="Case: order by the case. PC: price per piece — switch to compare."
            >
              <div className="grid grid-cols-2 gap-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('case')}
                  className={`rounded-full px-2 py-2 text-xs transition-all ${
                    selectedUnit === 'case'
                      ? 'border border-gray-300 bg-white font-bold text-gray-800 shadow-sm'
                      : 'bg-transparent font-normal text-gray-600 hover:text-gray-800'
                  }`}
                >
                  CASE
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('pc')}
                  className={`rounded-full px-2 py-2 text-xs transition-all ${
                    selectedUnit === 'pc'
                      ? 'border border-gray-300 bg-white font-bold text-gray-800 shadow-sm'
                      : 'bg-transparent font-normal text-gray-600 hover:text-gray-800'
                  }`}
                >
                  PC
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 space-y-2 pt-0">
          {/* Price block — inset panel slightly lighter than card */}
          <div className="rounded-2xl bg-[#f3efe6] px-3 py-2.5 ring-1 ring-[#e5dfd4]">
            {priceLabel && (
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">{priceLabel}</p>
            )}
            <div className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-[26px] font-bold tracking-tight text-gray-900">${currentPrice.toFixed(2)}</span>
              {perLb != null ? (
                <span className="text-sm font-normal text-gray-500">
                  / {perLb.toFixed(3)} {unit}
                </span>
              ) : (
                <span className="text-sm text-gray-500">/{unit}</span>
              )}
            </div>
          </div>

          {!showQuantitySelector ? (
            /* Single pill: ADD (~75%) | menu (~25%) */
            <div className="flex min-h-[46px] w-full overflow-hidden rounded-full border border-[#c9bfb2] bg-[#ebe6dc] shadow-sm">
              <button
                type="button"
                onClick={handleAddClick}
                className="flex min-w-0 flex-[3] items-center justify-center gap-2 bg-[#1e4a35] py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1a402f] active:bg-[#163828]"
                aria-label={`Add ${name} to cart`}
              >
                <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                ADD
              </button>
              <div className="w-px shrink-0 self-stretch bg-white/25" aria-hidden />
              <button
                type="button"
                className="flex min-w-[52px] flex-[1] items-center justify-center bg-[#ebe6dc] py-2.5 text-gray-700 transition-colors hover:bg-[#e3ddd2]"
                aria-label={`More options for ${name}`}
              >
                <Menu className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex min-h-[46px] items-stretch overflow-hidden rounded-full border border-[#c9bfb2] bg-white shadow-sm">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="flex w-11 items-center justify-center hover:bg-[#f3efe6]"
                >
                  <Minus className="h-4 w-4 text-gray-700" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(val);
                  }}
                  className="min-w-0 flex-1 border-x border-[#e5dfd4] py-2 text-center text-base font-semibold tabular-nums text-gray-900"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="flex w-11 items-center justify-center hover:bg-[#f3efe6]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-gray-700" aria-hidden />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddClick}
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#c9bfb2] bg-[#1e4a35] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a402f]"
                aria-label={`Add ${name} to cart`}
              >
                <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
