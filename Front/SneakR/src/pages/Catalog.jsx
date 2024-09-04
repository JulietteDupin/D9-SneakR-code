import { useEffect, useState, } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';

import '../../css/style.css';

export default function Catalog({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [sneakers, setSneakers] = useState();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
      navigate('/login');
    }
  
    fetch('https://localhost:5000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
    })
      .then(response => response.json())  
      .then(data => setSneakers(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, [navigate]);

  return (
    <div className='frame'>
      <Navbar />
      <SneakerList
        sneakers={sneakers}
        gender={gender || "all"}
        setSelectedSneaker={setSelectedSneaker}
      />
    </div>
  );
}

