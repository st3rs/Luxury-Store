import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Tag, Users, MessageSquare, Settings, TrendingUp, DollarSign, Package } from 'lucide-react';
import { formatPrice, cn } from '@/src/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    sales: 1250000,
    orders: 42,
    customers: 156,
    inventory: 84
  });

  const recentOrders = [
    { id: 'BBN-82910', customer: 'Jane Doe', amount: 350000, status: 'Processing', date: '2026-04-03' },
    { id: 'BBN-82909', customer: 'John Smith', amount: 8900, status: 'Shipped', date: '2026-04-02' },
    { id: 'BBN-82908', customer: 'Alice Brown', amount: 16900, status: 'Delivered', date: '2026-04-01' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 pt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-8 hidden lg:block">
        <div className="flex flex-col">
          <span className="font-serif text-xl font-bold text-brand-royal">BASKET</span>
          <span className="text-[8px] tracking-widest font-bold text-brand-deep -mt-1">ADMIN PANEL</span>
        </div>
        
        <nav className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 bg-brand-royal text-white rounded-lg font-medium">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <ShoppingBag size={18} />
            <span>Orders</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <Package size={18} />
            <span>Products</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <Tag size={18} />
            <span>Brands</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <Users size={18} />
            <span>Customers</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <MessageSquare size={18} />
            <span>Consignments</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-10">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome back, Admin</span>
            <div className="w-10 h-10 bg-brand-royal rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-50 text-brand-royal rounded-lg"><DollarSign size={20} /></div>
              <span className="text-xs font-bold text-green-600">+12%</span>
            </div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Total Sales</p>
            <p className="text-2xl font-serif font-bold text-brand-dark">{formatPrice(stats.sales)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShoppingBag size={20} /></div>
              <span className="text-xs font-bold text-green-600">+5%</span>
            </div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Orders</p>
            <p className="text-2xl font-serif font-bold text-brand-dark">{stats.orders}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Users size={20} /></div>
              <span className="text-xs font-bold text-green-600">+8%</span>
            </div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Customers</p>
            <p className="text-2xl font-serif font-bold text-brand-dark">{stats.customers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
              <span className="text-xs font-bold text-red-600">-2%</span>
            </div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Inventory</p>
            <p className="text-2xl font-serif font-bold text-brand-dark">{stats.inventory}</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-serif font-bold text-brand-dark">Recent Orders</h3>
            <button className="text-sm font-bold text-brand-royal hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-brand-dark">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 font-bold">{formatPrice(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        order.status === 'Processing' ? "bg-blue-50 text-blue-600" :
                        order.status === 'Shipped' ? "bg-purple-50 text-purple-600" :
                        "bg-green-50 text-green-600"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-brand-royal font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
