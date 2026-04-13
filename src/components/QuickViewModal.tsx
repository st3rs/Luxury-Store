import { X, ShoppingBag, ShieldCheck, Award, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice, cn } from '@/src/lib/utils';
import { useCart } from '@/src/context/CartContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url,
      brand: product.brand.name
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-brand-dark hover:text-brand-royal transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-brand-soft aspect-[4/5] md:aspect-auto">
              <img
                src={product.images[0]?.url || 'https://picsum.photos/seed/bag/800/1000'}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-brand-royal uppercase block mb-2">
                    {product.brand.name}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-2">
                    {product.name}
                  </h2>
                  <p className="text-xl font-serif font-bold text-brand-deep">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-4">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Condition</p>
                    <p className="text-xs font-medium text-brand-dark">{product.condition}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</p>
                    <p className="text-xs font-medium text-brand-dark">{product.category.name}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-premium flex items-center justify-center space-x-2 py-4"
                  >
                    <ShoppingBag size={18} />
                    <span>ADD TO BAG</span>
                  </button>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="w-full py-4 text-center text-xs font-bold text-brand-dark hover:text-brand-royal transition-colors uppercase tracking-widest border border-gray-100 rounded-md"
                  >
                    View Full Details
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex flex-col items-center space-y-1">
                    <ShieldCheck size={18} className="text-brand-royal" />
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Authentic</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Truck size={18} className="text-brand-royal" />
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Secure</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Award size={18} className="text-brand-royal" />
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Inspected</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
