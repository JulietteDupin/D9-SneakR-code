import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
    <div>
        <Routes>
          <Route path="/products" element={<Catalog setSelectedSneaker={setSelectedSneaker} />} />
          <Route path="/product" element={<ProductPage sneaker={selectedSneaker} />} />
          <Route path="/products/category/:gender" element={<Catalog setSelectedSneaker={setSelectedSneaker} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}
