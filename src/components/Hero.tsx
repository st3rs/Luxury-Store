import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000"
          alt="Luxury Handbag"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-white"
        >
          <span className="text-xs tracking-[0.3em] font-bold uppercase mb-4 block text-brand-soft">
            AUTHENTIC LUXURY
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Carefully <br />
            <span className="italic font-normal">Curated</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-soft/90 mb-10 leading-relaxed font-light">
            Discover a world of timeless elegance. Shop brand-new and pre-owned designer pieces with absolute confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-premium flex items-center justify-center space-x-2 group">
              <span>SHOP NOW</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/sell" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-md hover:bg-white/20 transition-all flex items-center justify-center">
              SELL WITH US
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-10 left-6 right-6 z-10 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white/70 text-[10px] tracking-[0.2em] font-bold">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-white rounded-full" />
            <span>100% AUTHENTIC GUARANTEE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-white rounded-full" />
            <span>SECURE WORLDWIDE SHIPPING</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-white rounded-full" />
            <span>EXPERTLY INSPECTED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
