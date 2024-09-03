import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../../css/sneaker.css"


const SneakerList = ({ sneakers, gender, setSelectedSneaker }) => {
  const navigate = useNavigate();

  const handleClick = (sneaker) => {
    setSelectedSneaker(sneaker);
    navigate('/product');
  };

  const filteredSneakers = gender === 'all'
    ? sneakers
    : sneakers.filter(sneaker => sneaker.attributes.gender.toLowerCase() === gender.toLowerCase());

  return (
    <ul className="sneaker-grid">
      {filteredSneakers.map(sneaker => (
        <li
          key={sneaker.id}
          className="sneaker-item"
          onClick={() => handleClick(sneaker)}
        >
          <img src={sneaker.attributes.image.small} alt={sneaker.attributes.name} />
          <p className="sneaker-name">{sneaker.attributes.name}</p>
          <p className="sneaker-colorway">Colorway: {sneaker.attributes.colorway}</p>
        </li>
      ))}
    </ul>
  );
};

export default SneakerList;
