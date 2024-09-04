import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

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
    <ul className="sneaker-list">
      {filteredSneakers.map(sneaker => (
        <li
          key={sneaker.id}
          className="sneaker-item"
          onClick={() => handleClick(sneaker)}
        >
          <ProductCard
            name={sneaker.attributes.name}
            image={sneaker.attributes.image.small}
            colorway={sneaker.attributes.colorway}
            price={sneaker.attributes.estimatedMarketValue}
          />
        </li>
      ))}
    </ul>
  );
};

export default SneakerList;
