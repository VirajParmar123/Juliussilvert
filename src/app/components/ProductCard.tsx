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
      className={`flex h-full flex-col self-stretch bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 ${
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
            className="w-full h-full object-cover"
          />
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavorite();
          }}
          className="absolute top-3 right-3 z-[2] p-2.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <div className="min-h-0">
          <Link to={`/product/${id}`} className="block group">
            <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[44px] group-hover:text-[#6b8e6f] transition-colors">
              {name}
            </h3>
          </Link>
          
          {/* Brand */}
          <p className="text-xs font-semibold text-[#6b8e6f] mb-2 uppercase tracking-wide">JULIUS SILVERT</p>
          
          {/* Item Number */}
          <p className="text-xs text-gray-600 mb-1">Item#: {itemNumber}</p>
          
          {/* Case Info */}
          {caseInfo && <p className="text-xs text-gray-600 mb-2">{caseInfo}</p>}
          
          {/* Unit Toggle - Only show if we have both prices */}
          {casePrice && pcPrice && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setSelectedUnit('case')}
                className={`py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedUnit === 'case'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                CASE
              </button>
              <button
                onClick={() => setSelectedUnit('pc')}
                className={`py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedUnit === 'pc'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                PC
              </button>
            </div>
          )}
        </div>

        {/* Price + actions pinned to bottom so ADD aligns across the row */}
        <div className="mt-auto pt-3 space-y-3">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
              {perLb && (
                <span className="text-xs text-gray-500">/ {perLb.toFixed(3)} {unit}</span>
              )}
              {!perLb && (
                <span className="text-xs text-gray-500">/{unit}</span>
              )}
            </div>
          </div>

        {/* Add Button or Quantity Selector */}
        {!showQuantitySelector ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddClick}
              className="flex-1 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors uppercase tracking-wide text-sm"
              aria-label={`Add ${name} to cart`}
            >
              ADD
            </button>
            <button
              type="button"
              className="px-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={`More options for ${name}`}
            >
              <Menu className="w-4 h-4 text-gray-700" aria-hidden />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={handleDecrement}
                className="px-3 py-3 hover:bg-gray-100 transition-colors"
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
                className="w-12 text-center text-base font-semibold border-x-2 border-gray-300 py-3"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="px-3 py-3 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-gray-700" aria-hidden />
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddClick}
              className="flex-1 px-4 py-3 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-lg font-semibold transition-colors text-sm"
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
