// Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import "../../css/sneaker.css";

const Cart = () => {
  const { cartItems, totalAmount, removeFromCart, clearCart } = useCart();
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  // Handle setting selected sneaker when clicking on a sneaker in the cart
  const handleSelectedSneaker = (sneaker) => {
    setSelectedSneaker(sneaker);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="sneaker-grid">
            {cartItems.map((sneaker) => (
              <li
                key={sneaker.id}
                className="sneaker-item"
                onClick={() => handleSelectedSneaker(sneaker)}
              >
                <img
                  src={sneaker.image || 'default-image-url.jpg'} // Default image if none provided
                  alt={sneaker.name || 'Sneaker'}
                  className="sneaker-image"
                />
                <p className="sneaker-name">{sneaker.name || 'Unknown Sneaker'}</p>
                <p className="sneaker-price">Price: ${sneaker.price.toFixed(2)}</p>
                <p className="sneaker-quantity">Quantity: {sneaker.quantity}</p>
                <button
                  onClick={() => removeFromCart(sneaker)}
                  className="remove-from-cart"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Display Total Amount */}
          <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>

          {/* Clear Cart Button */}
          <button onClick={clearCart} className="clear-cart">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
