import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CreditCard, Building2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'invoice'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    }, 2000);
  };

  const subtotal = getTotal();
  const shipping = 25.00;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      
      <main className="flex-1 bg-gray-50 py-8 outline-none" id="main-content" tabIndex={-1}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6 sm:mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Delivery Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Delivery Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>
                  
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-[#6b8e6f]"
                      />
                      <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="invoice"
                        checked={paymentMethod === 'invoice'}
                        onChange={() => setPaymentMethod('invoice')}
                        className="w-4 h-4 text-[#6b8e6f]"
                      />
                      <Building2 className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                      <span className="font-medium">Invoice (Net 30)</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'invoice' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Your order will be invoiced with Net 30 payment terms. 
                        Invoice will be sent to your registered email address.
                      </p>
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-4 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" />
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24 z-10">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-semibold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p className="mb-2">✓ Secure SSL encryption</p>
                  <p className="mb-2">✓ 100% Purchase Protection</p>
                  <p>✓ Next-day delivery available</p>
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
