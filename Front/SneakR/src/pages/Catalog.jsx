import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import Pagination from '../tools/Pagination';

import '../../css/style.css';

export default function Catalog({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [sneakers, setSneakers] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 25;

  // Vérification de l'authentification (à remplacer par token JWT plus tard)
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
