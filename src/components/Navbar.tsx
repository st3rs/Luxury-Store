import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { useCart } from '@/src/context/CartContext';
import { useAuth } from '@/src/context/AuthContext';

export default function Navbar() {
  const { items } = useCart();
  const { user, profile } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Pre-Owned', path: '/shop?filter=pre-owned' },
    { name: 'Sell With Us', path: '/sell' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-royal">
            BASKET
          </span>
          <span className="text-[10px] tracking-[0.2em] font-medium -mt-1 text-brand-deep">
            BRAND NAME
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-wide hover:text-brand-royal transition-colors",
                location.pathname === link.path ? "text-brand-royal" : "text-gray-600"
              )}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="p-2 text-gray-600 hover:text-brand-royal transition-colors">
            <Search size={20} />
          </button>
          <Link to="/account" className="p-2 text-gray-600 hover:text-brand-royal transition-colors flex items-center">
            {user ? (
              <img 
                src={user.photoURL || ''} 
                alt="Profile" 
                className="w-6 h-6 rounded-full border border-gray-200"
              />
            ) : (
              <User size={20} />
            )}
          </Link>
          <Link to="/wishlist" className="p-2 text-gray-600 hover:text-brand-royal transition-colors hidden sm:block">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="p-2 text-gray-600 hover:text-brand-royal transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-royal text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-serif font-medium text-brand-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link to="/account" className="flex items-center space-x-2 text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>
              <User size={20} />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
