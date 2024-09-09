import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'


export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { totalAmount } = location.state || { totalAmount: 0 };

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [navigate]);

const handlePayment = async (e) => {
    e.preventDefault();
    console.log("handlepayment");

    // Simulate storing the user's credentials in localStorage, to take down once we have the backend working
    try {

      let response = await fetch(import.meta.env.VITE_APP_PAYMENT_ROUTE + '/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ amount: totalAmount * 100})
      })

      const data = await response.json();
      
      console.log("response", data.session_id);
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
    <div>
          <form onSubmit={handlePayment}>
          <button type="submit" id="checkout-button">Checkout</button>
          </form>
    </div>
    );
}
 