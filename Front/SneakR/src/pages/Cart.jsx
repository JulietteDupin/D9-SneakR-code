import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import "../../css/sneaker.css";
import "../../css/cart.css";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'
import Navbar from '../tools/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'; // ShadCN Alert
import { CheckCircle2 } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, removeFromCart, clearCart } = useCart();
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // For showing the alert

  useEffect(() => {
    try {
      cartItems.forEach(async (sneaker) => {
        const response = await fetch(import.meta.env.VITE_APP_PRODUCTS_ROUTE + "/" + sneaker.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await response.json();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }, [cartItems]);

  // Handle setting selected sneaker when clicking on a sneaker in the cart
  const handleSelectedSneaker = (sneaker) => {
    setSelectedSneaker(sneaker);
  };

  // Show the alert for a few seconds after removing an item
  const handleRemoveFromCart = (sneaker) => {
    removeFromCart(sneaker);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Alert disappears after 3 seconds
  };

  const handlePayment = async () => {
    try {
      let response = await fetch(import.meta.env.VITE_APP_PAYMENT_ROUTE + '/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ line_items: cartItems, email: localStorage.getItem('email') })
      });

      const data = await response.json();
      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        });
        if (result.error) {
          console.error("Payment error", result.error);
        }
      }
      if (response.ok) {
        navigate('/login');
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="sneaker-grid">
            {cartItems.map((sneaker) => (
              <li
                key={sneaker.id}
                className="sneaker-item"
                onClick={() => handleSelectedSneaker(sneaker)}
              >
                <img
                  src={sneaker.image || 'default-image-url.jpg'}
                  alt={sneaker.name || 'Sneaker'}
                  className="sneaker-image"
                />
                <div className="sneaker-details">
                  <p className="sneaker-name">{sneaker.name || 'Unknown Sneaker'}</p>
                  <p className="sneaker-price">Price: ${parseInt(sneaker.price).toFixed(2)}</p>
                  <p>Size: {parseInt(sneaker.size)}</p>
                  <p className="sneaker-quantity">Quantity: {sneaker.quantity}</p>
                  {sneaker.stock[sneaker.size].stock < sneaker.quantity ? <p style={{ color: 'red' }}>Stock insuffisant</p> : ""}
                  <button
                    onClick={() => handleRemoveFromCart(sneaker)} // Modified to show alert
                    className="remove-from-cart"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="total-amount">Total: ${parseInt(totalAmount).toFixed(2)}</p>
            <div className="cart-buttons">
              <button onClick={clearCart} className="clear-cart">Clear Cart</button>
              <button disabled={cartItems.some(item => item.stock[item.size].stock < item.quantity)} onClick={handlePayment} className="payment-button">Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed bottom-4 right-4">
          <Alert variant="success" className="bg-white border">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            <AlertTitle>Item successfully removed</AlertTitle>
            <AlertDescription>The item was removed from your cart.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Cart;
