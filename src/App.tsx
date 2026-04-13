/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import SellWithUs from './pages/SellWithUs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import AdminDashboard from './pages/AdminDashboard';
import AuthGuarantee from './pages/AuthGuarantee';
import Account from './pages/Account';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/sell" element={<SellWithUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/guarantee" element={<AuthGuarantee />} />
              <Route path="/account" element={<Account />} />
              {/* Add more routes as needed */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-40">
                <h1 className="text-4xl font-serif font-bold mb-4">Page Not Found</h1>
                <p className="text-gray-500 mb-8">The page you are looking for doesn't exist.</p>
                <a href="/" className="btn-premium">BACK TO HOME</a>
              </div>
            } />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

