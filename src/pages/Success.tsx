import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Success() {
  return (
    <div className="max-w-xl mx-auto px-6 py-40 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10"
      >
        <ShieldCheck size={48} />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Order Confirmed!</h1>
      <p className="text-gray-500 font-light text-lg mb-12 leading-relaxed">
        Thank you for your purchase. Your order has been received and is being processed by our luxury specialists. You will receive a confirmation email shortly.
      </p>

      <div className="bg-brand-soft p-8 rounded-2xl mb-12 text-left space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">Order Number</span>
          <span className="font-bold text-brand-dark">#BBN-82910</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">Estimated Delivery</span>
          <span className="font-bold text-brand-dark">3-5 Business Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/shop" className="flex-grow btn-premium flex items-center justify-center space-x-2">
          <ShoppingBag size={18} />
          <span>CONTINUE SHOPPING</span>
        </Link>
        <Link to="/account" className="flex-grow btn-outline flex items-center justify-center space-x-2">
          <span>VIEW ORDER</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
