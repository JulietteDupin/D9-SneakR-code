import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import ForgotPassword from './components/ForgotPassword';
import { ResetPassword } from './components/reset-password';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import CategoryPage from './pages/CategoryPage';
import PrivateRoute from './tools/PrivateRoute';
import PublicRoute from './tools/PublicRoute';
import ProfileSettings from './pages/Account';
import Cart from './pages/Cart';
import CGU from './pages/CGU';
import AdminRoute from './tools/AdminRoute';
import Home from './pages/admin/Home';
import Users from './pages/admin/Users';
import Stock from './pages/admin/Stock';

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
    <CartProvider>
      <div>
        <Routes>
          {/* Main route */}
          <Route path="/" element={
            <PrivateRoute>
              <Catalog setSelectedSneaker={setSelectedSneaker} />
            </PrivateRoute >
          } />

          <Route path="/products" element={
            <PrivateRoute>
              <Catalog setSelectedSneaker={setSelectedSneaker} />
            </PrivateRoute >
          } />

          {/* token protected routes */}
          <Route path="/products/category/:gender" element={
            <PrivateRoute>
              <CategoryPage setSelectedSneaker={setSelectedSneaker} />
            </PrivateRoute >
          } />

          <Route path="/product" element={<PrivateRoute>
            <ProductPage sneaker={selectedSneaker} /></PrivateRoute>} />

          <Route path="/account" element={<PrivateRoute>
            <ProfileSettings />
          </PrivateRoute>
          } />

          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute >
          } />

          {/* payment routes */}
          <Route path="/payment" element={<PrivateRoute>
            <Payment />
          </PrivateRoute>
          } />
          
          {/* admin routes */}
            <Route path="/admin/home" element={<AdminRoute>
              <Home />
            </AdminRoute>} /> 
            <Route path="/admin/users" element={<AdminRoute>
              <Users />
            </AdminRoute>} /> 
            <Route path="/admin/inventory" element={<AdminRoute>
              <Stock />
            </AdminRoute>} /> 

          <Route path="/cgu" element={
            <PrivateRoute>
              <CGU />
            </PrivateRoute >
          } />

          <Route path="/payment/success" element={<PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
          } />

          <Route path="/payment/cancel" element={<PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
          } />


          {/* public routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute >
          } />
          <Route path="/reset-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute >
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute >
          } />
          <Route path="/reset-password/:token" element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute >
          } />
        </Routes>
      </div >
    </CartProvider>
  );
}
