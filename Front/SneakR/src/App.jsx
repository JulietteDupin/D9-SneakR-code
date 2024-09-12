import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import Payment from './pages/Payment';
import CategoryPage from './pages/CategoryPage';
import PrivateRoute from './tools/PrivateRoute';
import PublicRoute from './tools/PublicRoute';
import ProfileSettings from './pages/Account';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
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

          {/* public routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute >
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute >
          } />

        </Routes>
      </div >
    </CartProvider>
  );
}
