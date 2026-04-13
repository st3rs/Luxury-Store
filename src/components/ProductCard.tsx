import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { formatPrice } from '@/src/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    brand: { name: string };
    type: string;
    condition: string;
    images: { url: string }[];
  };
  onQuickView?: (product: any) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-soft rounded-lg luxury-card">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.type === 'new' && (
            <span className="bg-brand-royal text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              New
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            {product.condition}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
            <Heart size={16} />
          </button>
          {onQuickView && (
            <button 
              onClick={() => onQuickView(product)}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-brand-royal transition-colors shadow-sm"
              title="Quick View"
            >
              <Eye size={16} />
            </button>
          )}
        </div>

        {/* Image */}
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]?.url || 'https://picsum.photos/seed/bag/800/1000'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-brand-dark text-white py-3 text-sm font-medium rounded-md flex items-center justify-center space-x-2 hover:bg-brand-royal transition-colors">
            <ShoppingBag size={16} />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-[10px] tracking-[0.2em] font-bold text-brand-royal uppercase">
          {product.brand.name}
        </p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium text-brand-dark hover:text-brand-royal transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-serif font-bold text-brand-deep">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
