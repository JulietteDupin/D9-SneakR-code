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
    : sneakers.filter(sneaker => sneaker.gender.toLowerCase() === gender.toLowerCase());

  return (
<<<<<<< HEAD
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
=======
    <ul className="sneaker-grid">
      {filteredSneakers.map(sneaker => {
        const parsedImage = JSON.parse(sneaker.image);

        return (
          <li
            key={sneaker.id}
            className="sneaker-item"
            onClick={() => handleClick(sneaker)}
          >
            <img src={parsedImage.small} alt={sneaker.name} />
            <p className="sneaker-name">{sneaker.name}</p>
            <p className="sneaker-colorway">Colorway: {sneaker.colorway}</p>
          </li>
        );
      })}
>>>>>>> origin/shadcn
    </ul>
  );
};

export default SneakerList;