import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sneakersData from '../../../../Back/sneakers.json';

export default function Home() {
  const navigate = useNavigate();
  const [sneakers, setSneakers] = useState(sneakersData.data);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {sneakers.map(sneaker => (
          <li key={sneaker.id}>
            {/* ici à terme au lieu de faire du hard code je ferai une fonction pour mapper */}
            <img src={sneaker.attributes.image.small} alt={sneaker.name} />
            <p>{sneaker.attributes.name}</p>
            <p>Brand: {sneaker.attributes.brand}</p>
            <p>Colorway: {sneaker.attributes.colorway}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
