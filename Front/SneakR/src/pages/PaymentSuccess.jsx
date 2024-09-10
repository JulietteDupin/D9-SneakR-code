import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from '../context/CartContext';

import "../../css/style.css";
import { jwtDecode } from "jwt-decode";

export default function PaymentSuccess({ setSelectedSneaker }) {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handlePaymentSuccess = async () => {
        try {
            let response = await fetch(import.meta.env.VITE_APP_PAYMENT_ROUTE + '/payment-success/' + jwtDecode(localStorage.getItem('token')).id, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
              },
              body: JSON.stringify({})
            })
          } catch (error) {
            console.error('Error:', error)
            setError(error.message)
        }
    }

  useEffect(() => {
    handlePaymentSuccess()

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='frame'>
        <h1>Payment success</h1>
        <button onClick="window.location.href='/products'">Return to product list</button>
    </div>
  );
}
