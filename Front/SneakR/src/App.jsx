import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import Payment from './pages/Payment';
import CategoryPage from './pages/CategoryPage';
import ProtectedRoute from './tools/ProtectedRoute';

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
    <div>
      <Routes>
      <Route path="/" element={<Catalog setSelectedSneaker={setSelectedSneaker} />} />
        <Route path="/products" element={<Catalog setSelectedSneaker={setSelectedSneaker} />} />
        <Route path="/products/category/:gender" element={<CategoryPage setSelectedSneaker={setSelectedSneaker} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product" element={<ProtectedRoute>
          <ProductPage sneaker={selectedSneaker} /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute>
          <Payment />
        </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}
