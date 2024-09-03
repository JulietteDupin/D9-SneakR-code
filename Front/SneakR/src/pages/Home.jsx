import { useEffect, useState, } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import sneakersData from '../../../../Back/sneakers.json';
import Navbar from '../tools/Navbar';
import SneakerList from '../tools/SneakerList';

import '../../css/style.css';

export default function Home({ setSelectedSneaker }) {
  const navigate = useNavigate();
  const { gender } = useParams();
  const [sneakers, setSneakers] = useState(sneakersData.data);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
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

