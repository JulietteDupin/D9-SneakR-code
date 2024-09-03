import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
        body: JSON.stringify({ amount: 1000 })
      })
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
    <div>
          <form onSubmit={handlePayment}>
          <button type="submit" id="checkout-button">Checkout</button>
          </form>
    </div>
    );
}
