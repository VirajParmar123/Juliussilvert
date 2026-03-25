import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
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
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-brand-header hover:bg-brand-header-hover text-white rounded-md transition-colors"
            >
              Continue Shopping
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
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6 sm:mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      {/* Product Image */}
                      <div className="w-full max-w-[8rem] h-20 sm:h-24 mx-auto sm:mx-0 sm:w-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 mb-3">
                          <div>Item: {item.itemNumber}</div>
                          <div>Wasm: {item.wasmNumber}</div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity} 
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                updateQuantity(item.id, val);
                              }}
                              className="w-14 text-center py-1.5 border-x border-gray-300"
                            />
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-left sm:text-right sm:shrink-0">
                        <div className="text-2xl font-semibold text-gray-900 mb-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} / {item.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <Link 
                to="/"
                className="inline-flex items-center mt-6 text-sm text-brand-header hover:text-brand-header-hover"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24 z-10">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-semibold text-gray-900">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  Secure checkout powered by Julius Silvert
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
