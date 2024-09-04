import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import sneakersData from '../../../../Back/sneakers.json'

import '../../css/style.css';

export default function Catalog({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [error, setError] = useState(null);

  //On every render of the page, this function calls the sneakers api to create sneakers.json, and we retrieve the sneakers from sneakers.json. 
  //TODO: put the sneakers.json directly in the database and change the request
  async function fetchData() {
    try {
      fetch(import.meta.env.VITE_APP_PRODUCTS_ROUTE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  return (
    <div className='frame'>
      <Navbar />
      <SneakerList
        sneakers={sneakersData.data}
        gender={gender || "all"}
        setSelectedSneaker={setSelectedSneaker}
      />
    </div>
  );
}