import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Heart, Plus, Minus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const setQuantity = (id: string, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, value) }));
  };

  const handleAddToCart = (item: typeof favorites[0]) => {
    const quantity = getQuantity(item.id);
    addToCart(item, quantity);
    navigate('/cart');
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="sticky top-0 z-50">
          <Header />
          <Navigation />
        </div>
        
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex items-center justify-center py-20 outline-none"
        >
          <div className="text-center">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start adding your favorite products</p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-brand-header hover:bg-brand-header-hover text-white rounded-md transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      
      <main className="flex-1 bg-gray-50 py-8 outline-none" id="main-content" tabIndex={-1}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 fill-red-500 shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">My Favorites</h1>
            <span className="text-gray-500 text-sm sm:text-base">({favorites.length} items)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-[200px] bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all hover:scale-110"
                    title="Remove from favorites"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
                    {item.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    <div>Item: {item.itemNumber}</div>
                    <div>Wasm: {item.wasmNumber}</div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/{item.unit}</span>
                  </div>

                  {/* Quantity Controls and Add to Cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button 
                        onClick={() => setQuantity(item.id, getQuantity(item.id) - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input 
                        type="text" 
                        value={getQuantity(item.id)} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setQuantity(item.id, val);
                        }}
                        className="w-12 text-center text-sm border-x border-gray-300 py-2"
                      />
                      <button 
                        onClick={() => setQuantity(item.id, getQuantity(item.id) + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 px-4 py-2 bg-brand-header hover:bg-brand-header-hover text-white text-sm rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
