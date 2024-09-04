import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import Payment from './pages/Payment';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';

export default function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  return (
    <CartProvider>
        <div>
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Catalog setSelectedSneaker={setSelectedSneaker} />} />
              <Route path="/product" element={<ProductPage sneaker={selectedSneaker} />} />
              <Route path="/products/category/:gender" element={<CategoryPage setSelectedSneaker={setSelectedSneaker} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    </CartProvider>
  );
}

