import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { formatPrice } from '@/src/lib/utils';
import { motion } from 'framer-motion';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center">
        <div className="w-20 h-20 bg-brand-soft text-brand-royal rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Your Bag is Empty</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added any luxury pieces to your bag yet. Explore our collection and find something special.
        </p>
        <Link to="/shop" className="btn-premium">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-bold text-brand-dark mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <motion.div 
              key={`${item.id}-${item.variantId || 'default'}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-6 pb-8 border-b border-gray-100"
            >
              <div className="w-24 h-32 bg-brand-soft rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow space-y-1">
                <p className="text-[10px] font-bold text-brand-royal uppercase tracking-widest">{item.brand}</p>
                <h3 className="text-lg font-serif font-bold text-brand-dark">{item.name}</h3>
                <p className="text-sm font-bold text-brand-deep">{formatPrice(item.price)}</p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
                      className="p-2 hover:text-brand-royal transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                      className="p-2 hover:text-brand-royal transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.variantId)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1 text-xs"
                  >
                    <Trash2 size={14} />
                    <span>REMOVE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-soft p-8 rounded-2xl space-y-6 sticky top-32">
            <h2 className="text-xl font-serif font-bold text-brand-dark">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-brand-dark">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Calculated at checkout</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-serif font-bold text-brand-dark">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full btn-premium py-4 flex items-center justify-center space-x-2 group">
              <span>CHECKOUT NOW</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
              Secure checkout powered by Stripe & PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
