import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import Pagination from '../tools/Pagination';
import sneakersData from '../../../../Back/sneakers.json'

import '../../css/style.css';

export default function Catalog({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [error, setError] = useState(null);
  const sneakers = sneakersData.data;


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

  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 25;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  let filteredSneakers = !gender
    ? sneakers
    : sneakers.filter(sneaker => sneaker.attributes.gender.toLowerCase() === gender.toLowerCase());

  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='frame'>
      <Navbar />
      <SneakerList
        sneakers={currentSneakers}
        gender={gender || "all"}
        setSelectedSneaker={setSelectedSneaker}
      />
      <Pagination
        sneakersPerPage={sneakersPerPage}
        totalSneakers={filteredSneakers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
