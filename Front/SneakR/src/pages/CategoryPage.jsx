import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sneakersData from '../../../../Back/sneakers.json';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';
import Pagination from '../tools/Pagination';

import '../../css/style.css';

export default function CategoryPage({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [sneakers, setSneakers] = useState(sneakersData.data);

  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 25;
  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;

  const filteredSneakers = !gender
    ? sneakers
    : sneakers.filter(sneaker => sneaker.gender.toLowerCase() === gender.toLowerCase());


  const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // TODO: changer pour un token JWT
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='frame'>
      <Navbar />
      <SneakerList
        sneakers={sneakers}
        gender={gender}
        setSelectedSneaker={setSelectedSneaker}
      />

      <Pagination
        sneakersPerPage={sneakersPerPage}
        totalSneakers={currentSneakers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

    </div>
  );
}

