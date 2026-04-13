import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Award, Truck, ChevronRight, Star, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { formatPrice, cn } from '@/src/lib/utils';
import { useCart } from '@/src/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/src/components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, fetch by slug
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const p = data.find((item: any) => item.slug === slug);
          setProduct(p);
          if (p?.variants?.length > 0) {
            setSelectedVariant(p.variants[0]);
          }

          // Find related products
          if (p) {
            const related = data
              .filter((item: any) => 
                item.id !== p.id && 
                (item.brandId === p.brandId || item.categoryId === p.categoryId)
              )
              .slice(0, 4);
            setRelatedProducts(related);
          }
        } else {
          console.error('Expected array of products, got:', data);
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const averageRating = product.reviews?.length > 0
    ? product.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
      price: selectedVariant?.price || product.price,
      quantity: 1,
      image: product.images[0]?.url,
      brand: product.brand.name,
      variantId: selectedVariant?.id
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-gray-400 mb-10 uppercase tracking-widest">
        <Link to="/" className="hover:text-brand-royal transition-colors">HOME</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-brand-royal transition-colors">SHOP</Link>
        <ChevronRight size={12} />
        <span className="text-brand-dark font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="relative">
            <motion.div 
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="aspect-[4/5] bg-brand-soft rounded-2xl overflow-hidden luxury-card cursor-zoom-in relative"
            >
              <img 
                src={product.images[selectedImage]?.url || 'https://picsum.photos/seed/bag/800/1000'} 
                alt={product.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-200 ease-out",
                  isZoomed ? "scale-[2.5]" : "scale-100"
                )}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                }}
                referrerPolicy="no-referrer"
              />

              {/* Zoom Indicator */}
              <AnimatePresence>
                {!isZoomed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-brand-royal shadow-sm pointer-events-none"
                  >
                    <Search size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img: any, idx: number) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  selectedImage === idx ? "border-brand-royal" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img.url} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs tracking-[0.3em] font-bold text-brand-royal uppercase">
                {product.brand.name}
              </span>
              <div className="h-3 w-[1px] bg-gray-200" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                {product.condition}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-serif font-bold text-brand-deep">
                {formatPrice(selectedVariant?.price || product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Variants Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 pt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Style</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={cn(
                      "px-6 py-3 rounded-full border text-xs font-bold transition-all uppercase tracking-widest",
                      selectedVariant?.id === variant.id
                        ? "bg-brand-dark text-white border-brand-dark shadow-md"
                        : "bg-white text-gray-500 border-gray-200 hover:border-brand-royal hover:text-brand-royal"
                    )}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Specs */}
          <div className="grid grid-cols-2 gap-y-4 border-y border-gray-100 py-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</p>
              <p className="text-sm font-medium text-brand-dark">{product.category.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Condition</p>
              <p className="text-sm font-medium text-brand-dark">{product.condition}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Material</p>
              <p className="text-sm font-medium text-brand-dark">{product.material || 'Premium Leather'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authenticity</p>
              <p className="text-sm font-medium text-green-600 flex items-center space-x-1">
                <ShieldCheck size={14} />
                <span>Verified Authentic</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-grow btn-premium flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>ADD TO BAG</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-md text-gray-400 hover:text-red-500 hover:border-red-100 transition-all">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-soft rounded-full text-brand-royal">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Authentic</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-soft rounded-full text-brand-royal">
                <Truck size={20} />
              </div>
              <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Secure Ship</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-soft rounded-full text-brand-royal">
                <Award size={20} />
              </div>
              <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Inspected</span>
            </div>
          </div>

          {/* Condition Guide */}
          <div className="pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Condition Guide</h3>
              <span className="text-xs font-bold text-brand-royal bg-blue-50 px-3 py-1 rounded-full">
                {product.condition}
              </span>
            </div>
            
            <div className="relative h-2 bg-gray-100 rounded-full mb-8 flex overflow-hidden">
              {['Good', 'Very Good', 'Excellent', 'Like New', 'Brand New'].map((grade) => (
                <div 
                  key={grade}
                  className={cn(
                    "flex-grow h-full transition-all duration-500",
                    product.condition === grade ? "bg-brand-royal" : "bg-transparent"
                  )}
                />
              ))}
              <div className="absolute inset-0 flex">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-grow border-r border-white/50" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Brand New', desc: 'Unused, with original tags and packaging.' },
                { label: 'Like New', desc: 'Mint condition, no visible signs of wear.' },
                { label: 'Excellent', desc: 'Very light signs of wear, well-maintained.' },
                { label: 'Very Good', desc: 'Minor visible wear, still in great shape.' },
                { label: 'Good', desc: 'Visible signs of wear, but fully functional.' }
              ].map((item) => (
                <div 
                  key={item.label}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    product.condition === item.label 
                      ? "bg-blue-50 border-brand-royal/20" 
                      : "bg-white border-gray-50 opacity-60"
                  )}
                >
                  <div className="flex items-center space-x-3 mb-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      product.condition === item.label ? "bg-brand-royal" : "bg-gray-300"
                    )} />
                    <span className="text-xs font-bold text-brand-dark">{item.label}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 border-t border-gray-100 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-2">Customer Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="flex text-brand-royal">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill={star <= Math.round(averageRating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {averageRating > 0 ? averageRating.toFixed(1) : 'No'} / 5.0 ({product.reviews?.length || 0} Reviews)
              </span>
            </div>
          </div>
          <button className="btn-outline py-3">WRITE A REVIEW</button>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {product.reviews.map((review: any) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 p-8 bg-brand-soft rounded-2xl border border-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex text-brand-royal">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} fill={star <= review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-brand-dark font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-8 h-8 bg-brand-royal text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {review.user?.name?.charAt(0) || 'C'}
                  </div>
                  <span className="text-sm font-bold text-brand-dark">{review.user?.name || 'Verified Customer'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-soft rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-brand-royal shadow-sm">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">No reviews yet</h3>
            <p className="text-gray-500 font-light mb-8">Be the first to review this luxury piece and share your experience.</p>
            <button className="btn-premium">BE THE FIRST TO REVIEW</button>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-32 border-t border-gray-100 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-brand-royal uppercase mb-2 block">YOU MAY ALSO LIKE</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Related Products</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold text-brand-royal hover:underline flex items-center space-x-1">
              <span>VIEW ALL</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
