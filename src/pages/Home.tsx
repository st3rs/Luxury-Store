import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/src/components/Hero';
import ProductCard from '@/src/components/ProductCard';
import QuickViewModal from '@/src/components/QuickViewModal';
import { ShieldCheck, Award, Truck, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else {
          console.error('Expected array of products, got:', data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800', slug: 'handbags' },
    { name: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800', slug: 'wallets' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800', slug: 'shoes' },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800', slug: 'watches' },
  ];

  const trustPoints = [
    { icon: <ShieldCheck size={32} />, title: "100% Authentic", desc: "Every item is verified by our experts" },
    { icon: <Award size={32} />, title: "Premium Quality", desc: "Only the finest condition items" },
    { icon: <Truck size={32} />, title: "Secure Delivery", desc: "Insured shipping to your doorstep" },
    { icon: <RefreshCw size={32} />, title: "Easy Consignment", desc: "Turn your luxury into liquidity" },
  ];

  return (
    <div className="space-y-24 pb-20">
      <Hero />

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-royal uppercase mb-2 block">EXPLORE</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold text-brand-royal hover:underline flex items-center space-x-1">
            <span>VIEW ALL</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg luxury-card"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-2">{cat.name}</h3>
                <Link to={`/shop?category=${cat.slug}`} className="text-xs font-bold tracking-widest border-b border-white/50 pb-1 hover:border-white transition-all">
                  EXPLORE
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-royal uppercase mb-2 block">LATEST</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold text-brand-royal hover:underline flex items-center space-x-1">
            <span>VIEW ALL</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/5] bg-gray-100 rounded-lg" />
                <div className="h-4 bg-gray-100 w-1/2 rounded" />
                <div className="h-4 bg-gray-100 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="bg-brand-soft py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Why Shop With Us?</h2>
            <p className="text-gray-500 font-light leading-relaxed">
              We understand that luxury is an investment. That's why we prioritize trust, transparency, and authenticity in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-brand-royal shadow-sm mb-2">
                  {point.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-dark">{point.title}</h3>
                <p className="text-sm text-gray-500 font-light">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell With Us CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden bg-brand-deep text-white p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Turn Your Luxury <br />
              <span className="italic font-normal">Into Liquidity</span>
            </h2>
            <p className="text-brand-soft/80 font-light text-lg">
              Consign your designer pieces with us and reach thousands of luxury enthusiasts. We offer competitive rates and a hassle-free process.
            </p>
            <Link to="/sell" className="inline-flex px-8 py-4 bg-white text-brand-deep font-bold rounded-md hover:bg-brand-soft transition-colors">
              START SELLING
            </Link>
          </div>
          <div className="relative w-full md:w-1/3 aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=800" 
              alt="Luxury Items" 
              className="w-full h-full object-cover rounded-xl shadow-2xl rotate-3"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
}
