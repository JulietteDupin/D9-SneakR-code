import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../tools/Navbar";

import "../../css/style.css";
import { jwtDecode } from "jwt-decode";

export default function PaymentSuccess({ setSelectedSneaker }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handlePaymentSuccess = async () => {
    try {
      let response = await fetch(
        import.meta.env.VITE_APP_PAYMENT_ROUTE +
          "/payment-success/" +
          jwtDecode(localStorage.getItem("token")).id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({}),
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header>
        <Navbar />
      </header>
      <body>
        <h1 style={{ marginTop: "60px", zIndex: 100000, overflow: "visible" }}>
          Thanks for your order! The payment was successful.
        </h1>
        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "60px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "white",
            borderRadius: "25px",
          }}
        >
          Return to Product List
        </button>
      </body>
    </div>
  );
}
