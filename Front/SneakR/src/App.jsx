import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
    <div>
        <Routes>
          <Route path="/" element={<Home setSelectedSneaker={setSelectedSneaker} />} />
          <Route path="/product" element={<ProductPage sneaker={selectedSneaker} />} />
          <Route path="/category/:gender" element={<CategoryPage setSelectedSneaker={setSelectedSneaker} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

