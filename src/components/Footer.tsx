import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-soft pt-20 pb-10 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-royal">
              BASKET
            </span>
            <span className="text-[10px] tracking-[0.2em] font-medium -mt-1 text-brand-deep">
              BRAND NAME
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Authentic Luxury, Carefully Curated. We specialize in brand-new and pre-owned designer pieces, ensuring quality and authenticity in every item.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-royal hover:bg-brand-royal hover:text-white transition-all shadow-sm">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-royal hover:bg-brand-royal hover:text-white transition-all shadow-sm">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-royal hover:bg-brand-royal hover:text-white transition-all shadow-sm">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-brand-dark">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/shop" className="hover:text-brand-royal transition-colors">Shop All</Link></li>
            <li><Link to="/shop?filter=new" className="hover:text-brand-royal transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop?filter=pre-owned" className="hover:text-brand-royal transition-colors">Pre-Owned</Link></li>
            <li><Link to="/sell" className="hover:text-brand-royal transition-colors">Sell With Us</Link></li>
            <li><Link to="/guarantee" className="hover:text-brand-royal transition-colors">Authenticity Guarantee</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-brand-dark">Customer Service</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/about" className="hover:text-brand-royal transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-royal transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-brand-royal transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-brand-royal transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-brand-royal transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg font-bold mb-6 text-brand-dark">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-brand-royal shrink-0" />
              <span>47/138 Moo 16 Khlong-Luang Pathum Thani Thailand 12120</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-brand-royal shrink-0" />
              <span>+66 815399974</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-brand-royal shrink-0" />
              <span>hello@basketbrandname.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-xs text-gray-400">
          © 2026 Basket Brand Name. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
        </div>
      </div>
    </footer>
  );
}
