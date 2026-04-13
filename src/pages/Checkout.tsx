import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/src/context/CartContext';
import { formatPrice, cn } from '@/src/lib/utils';
import { paymentService } from '@/src/lib/paymentService';
import { ShieldCheck, CreditCard, Truck, ChevronLeft, MapPin, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'manual'>('stripe');
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const isShippingComplete = shippingAddress.address && shippingAddress.city && shippingAddress.postalCode;
  const isBillingComplete = sameAsShipping || (billingAddress.address && billingAddress.city && billingAddress.postalCode);

  useEffect(() => {
    if (isShippingComplete && isBillingComplete) {
      // Mock shipping calculation
      // For example, flat rate for Thailand, higher for international (mocked by postal code length)
      const cost = shippingAddress.postalCode.length === 5 ? 150 : 500;
      setShippingCost(cost);
    } else {
      setShippingCost(null);
    }
  }, [shippingAddress, billingAddress, sameAsShipping, isShippingComplete, isBillingComplete]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
  };

  const finalTotal = total + (shippingCost || 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingCost === null) return;
    
    setLoading(true);
    try {
      const result = await paymentService.checkout(paymentMethod, finalTotal);
      if (result.success) {
        clearCart();
        navigate('/success');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Your bag is empty</h1>
        <button onClick={() => navigate('/shop')} className="btn-premium">GO SHOPPING</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button onClick={() => navigate('/cart')} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-brand-royal mb-8 transition-colors">
        <ChevronLeft size={16} />
        <span>BACK TO BAG</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <form onSubmit={handleCheckout} className="space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-brand-dark">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required name="firstName" value={shippingAddress.firstName} onChange={handleShippingChange} placeholder="First Name" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="lastName" value={shippingAddress.lastName} onChange={handleShippingChange} placeholder="Last Name" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="email" value={shippingAddress.email} onChange={handleShippingChange} placeholder="Email Address" type="email" className="md:col-span-2 px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="phone" value={shippingAddress.phone} onChange={handleShippingChange} placeholder="Phone Number" className="md:col-span-2 px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="address" value={shippingAddress.address} onChange={handleShippingChange} placeholder="Address" className="md:col-span-2 px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="city" value={shippingAddress.city} onChange={handleShippingChange} placeholder="City" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
              <input required name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingChange} placeholder="Postal Code" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-brand-dark">Billing Address</h2>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={sameAsShipping} 
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-4 h-4 text-brand-royal border-gray-300 rounded focus:ring-brand-royal"
                />
                <span className="text-sm text-gray-500">Same as shipping</span>
              </label>
            </div>

            <AnimatePresence>
              {!sameAsShipping && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <input required name="firstName" value={billingAddress.firstName} onChange={handleBillingChange} placeholder="First Name" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
                    <input required name="lastName" value={billingAddress.lastName} onChange={handleBillingChange} placeholder="Last Name" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
                    <input required name="address" value={billingAddress.address} onChange={handleBillingChange} placeholder="Address" className="md:col-span-2 px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
                    <input required name="city" value={billingAddress.city} onChange={handleBillingChange} placeholder="City" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
                    <input required name="postalCode" value={billingAddress.postalCode} onChange={handleBillingChange} placeholder="Postal Code" className="px-4 py-3 bg-brand-soft rounded-md border-none focus:ring-1 focus:ring-brand-royal" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-brand-dark">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={cn(
                  "p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all",
                  paymentMethod === 'stripe' ? "border-brand-royal bg-blue-50" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <CreditCard size={24} className={paymentMethod === 'stripe' ? "text-brand-royal" : "text-gray-400"} />
                <span className="text-sm font-bold">Credit Card</span>
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={cn(
                  "p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all",
                  paymentMethod === 'paypal' ? "border-brand-royal bg-blue-50" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="h-6 flex items-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4" />
                </div>
                <span className="text-sm font-bold">PayPal</span>
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod('manual')}
                className={cn(
                  "p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all",
                  paymentMethod === 'manual' ? "border-brand-royal bg-blue-50" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <Landmark size={24} className={paymentMethod === 'manual' ? "text-brand-royal" : "text-gray-400"} />
                <span className="text-sm font-bold text-center">Manual Transfer</span>
              </button>
            </div>

            <AnimatePresence>
              {paymentMethod === 'manual' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-soft p-6 rounded-xl border border-brand-royal/20 space-y-4"
                >
                  <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Bank Transfer Details</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Bank Name</span>
                      <span className="font-bold text-brand-dark">Kasikorn Bank (K-Bank)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Account Name</span>
                      <span className="font-bold text-brand-dark">Basket Brand Name Co., Ltd.</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Account Number</span>
                      <span className="font-bold text-brand-royal tracking-widest">123-4-56789-0</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">
                    * Please upload your transfer slip in the next step or send it to our LINE Official Account with your Order ID.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <button 
            type="submit" 
            disabled={loading || shippingCost === null}
            className="w-full btn-premium py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={20} />
                <span>PLACE ORDER • {formatPrice(finalTotal)}</span>
              </>
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="bg-brand-soft p-8 rounded-2xl h-fit sticky top-32">
          <h2 className="text-xl font-serif font-bold text-brand-dark mb-8">Order Summary</h2>
          <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-16 h-20 bg-white rounded-md overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-brand-royal uppercase">{item.brand}</p>
                  <h4 className="text-sm font-medium text-brand-dark line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-brand-deep">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-bold text-brand-dark">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 items-center">
              <span>Shipping</span>
              {shippingCost !== null ? (
                <span className="font-bold text-brand-dark">{formatPrice(shippingCost)}</span>
              ) : (
                <span className="text-[10px] text-gray-400 italic">Enter address to calculate</span>
              )}
            </div>
            <div className="flex justify-between text-xl font-serif font-bold text-brand-dark pt-2">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <ShieldCheck size={16} className="text-green-600" />
              <span>Authenticity Guaranteed</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <Truck size={16} className="text-brand-royal" />
              <span>Insured Express Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
