import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import "../../css/sneaker.css";
import "../../css/cart.css";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, totalAmount, removeFromCart, clearCart } = useCart();
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  useEffect(() => {
      try {
        cartItems.forEach(async (sneaker) =>  {
          const response = await fetch(import.meta.env.VITE_APP_PRODUCTS_ROUTE + sneaker.id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          const data = await response.json();
      })
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
  }, [cartItems]);

  // Handle setting selected sneaker when clicking on a sneaker in the cart
  const handleSelectedSneaker = (sneaker) => {
    setSelectedSneaker(sneaker);
  };

  // Placeholder function for handling payment
  const handlePayment = async () => {
    console.log("handlepayment");

    // Simulate storing the user's credentials in localStorage, to take down once we have the backend working
    try {
      let response = await fetch(import.meta.env.VITE_APP_PAYMENT_ROUTE + '/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ line_items: cartItems, email: localStorage.getItem('email')})
      })

      const data = await response.json();
      
      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        })
        if (result.error) {
          setError("Payment error", result.error)
        }
      }
      if (response.ok) {
        console.log('User created')
        navigate('/login');
      } else {
        console.error(response)
        setError("User not created")
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error.message)
    }
  };

  return (
    <div className="cart-page">
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
                  <button
                    onClick={() => removeFromCart(sneaker)}
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
              <button onClick={handlePayment} className="payment-button">Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
