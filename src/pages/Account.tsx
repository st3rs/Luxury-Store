import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Shield, Package, Heart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Account() {
  const { user, profile, logout, loginWithGoogle, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-brand-soft rounded-full flex items-center justify-center mb-8 text-brand-royal">
          <UserIcon size={40} />
        </div>
        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">My Account</h1>
        <p className="text-gray-500 max-w-md mb-10 font-light">
          Sign in to track your orders, manage your wishlist, and access exclusive member benefits.
        </p>
        <button 
          onClick={loginWithGoogle}
          className="btn-premium px-12 py-4 flex items-center space-x-3"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" className="w-5 h-5" />
          <span>SIGN IN WITH GOOGLE</span>
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: <Package size={20} />, label: 'My Orders', desc: 'Track and view your purchase history' },
    { icon: <Heart size={20} />, label: 'Wishlist', desc: 'Items you have saved for later' },
    { icon: <Settings size={20} />, label: 'Settings', desc: 'Manage your profile and preferences' },
  ];

  if (isAdmin) {
    menuItems.unshift({ icon: <Shield size={20} />, label: 'Admin Dashboard', desc: 'Manage products and orders' });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-8">
          <div className="bg-brand-soft rounded-2xl p-8 text-center border border-gray-50">
            <div className="relative inline-block mb-4">
              <img 
                src={user.photoURL || 'https://picsum.photos/seed/user/200'} 
                alt={user.displayName || 'User'} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
              />
              {isAdmin && (
                <div className="absolute -bottom-1 -right-1 bg-brand-royal text-white p-1.5 rounded-full shadow-md">
                  <Shield size={14} />
                </div>
              )}
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-dark">{user.displayName}</h2>
            <p className="text-sm text-gray-500 font-light mb-6">{user.email}</p>
            <button 
              onClick={logout}
              className="w-full py-3 text-xs font-bold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
            >
              <LogOut size={14} />
              <span>SIGN OUT</span>
            </button>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-brand-soft transition-all text-left group"
              >
                <div className="p-2 bg-white rounded-lg text-gray-400 group-hover:text-brand-royal shadow-sm transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-dark">{item.label}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-12">
          <header>
            <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2">Welcome back, {user.displayName?.split(' ')[0]}</h1>
            <p className="text-gray-500 font-light">Manage your profile and view your recent activity below.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white border border-gray-100 rounded-2xl luxury-card"
            >
              <h3 className="text-lg font-serif font-bold text-brand-dark mb-4">Recent Orders</h3>
              <div className="text-center py-10">
                <Package size={32} className="mx-auto text-gray-200 mb-4" />
                <p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
                <button className="mt-4 text-xs font-bold text-brand-royal hover:underline">START SHOPPING</button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white border border-gray-100 rounded-2xl luxury-card"
            >
              <h3 className="text-lg font-serif font-bold text-brand-dark mb-4">Saved Items</h3>
              <div className="text-center py-10">
                <Heart size={32} className="mx-auto text-gray-200 mb-4" />
                <p className="text-sm text-gray-400">Your wishlist is currently empty.</p>
                <button className="mt-4 text-xs font-bold text-brand-royal hover:underline">EXPLORE COLLECTION</button>
              </div>
            </motion.div>
          </div>

          <section className="p-8 bg-brand-soft rounded-2xl border border-gray-50">
            <h3 className="text-lg font-serif font-bold text-brand-dark mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                <p className="text-sm font-medium text-brand-dark">{user.displayName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-medium text-brand-dark">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member Since</p>
                <p className="text-sm font-medium text-brand-dark">
                  {profile?.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : 'Recently'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Type</p>
                <p className="text-sm font-medium text-brand-dark capitalize">{profile?.role || 'Customer'}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
