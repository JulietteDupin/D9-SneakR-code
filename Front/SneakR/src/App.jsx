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

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
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

        <Route path="/payment" element={<PrivateRoute>
          <Payment />
        </PrivateRoute>
        } />

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
  );
}