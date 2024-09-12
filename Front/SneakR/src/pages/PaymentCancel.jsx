import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../tools/Navbar';

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <h1 style={{ marginTop: '20px' }}>Payment Cancel</h1>
      <button 
        onClick={() => navigate('/products')} 
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: "#c33035", borderRadius: "25px" }}
      >
        Return to Product List
      </button>
    </div>
  );
}
