import { React, useEffect, useState } from 'react';
import "../../css/sneaker.css";
import Navbar from '../tools/Navbar';
import { useCart } from '../context/CartContext';

const ProductPage = ({ sneaker }) => {
  const { addToCart } = useCart();

  if (!sneaker) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <Navbar></Navbar>
      <div className="product-left">
        <ProductImage src={JSON.parse(sneaker.image).small} alt={sneaker.name} />
      </div>
      <div className="product-right">
        <ProductDetails 
          title={sneaker.name} 
          description={sneaker.description} 
          highlights={sneaker.highlights} 
        />
        <ProductOptions 
          color={sneaker.colorway} 
          size={sneaker.size} 
          price={sneaker.estimatedMarketValue} 
        />
        <ProductActions addToCart={addToCart} product={sneaker} />
      </div>
    </div>
  );
};

export default ProductPage;

const ProductImage = ({ src, alt }) => {
  return (
    <div className="product-image">
      <img src={src} alt={alt} />
    </div>
  );
};

const ProductDetails = ({ title, description }) => {
  return (
    <div className="product-details">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const ProductOptions = ({ color, size, price }) => {
  return (
    <div className="product-options">
      <div className="option">
        <span>COLOR</span>
        <span>{color}</span>
      </div>
      <div className="option">
        <span>SIZE</span>
        <span>{size}</span>
      </div>
      <div className="price">
        <span>${parseInt(price).toFixed(2)}</span>
      </div>
    </div>
  );
};


const ProductActions = ({ addToCart, product }) => {
  const [buttonSizes, setButtonSizes] = useState([]);

  const item = {
    id: product.id,
    name: product.name,
    price: product.retailPrice,
    stripe_price_id: product.stripe_price_id,
    image: JSON.parse(product.image).small,
    stock: JSON.parse(product.stock),
    gender: product.gender,
    size: 0
  };

  const handleAddToCart= (size) => {
    const updatedItem = { ...item, size };
    addToCart(updatedItem);
  }

  useEffect(() => {
    if (item && item.stock) {
    const buttonList = Object.entries(item.stock).map(([size, stockValue]) => (
      <button
        key={size}
        onClick={() => {handleAddToCart(size)}}
        className="add-to-cart"
      >
        {`${item.gender} Size ${size} - Stock: ${stockValue.stock}`}
      </button>
    ));
    setButtonSizes(buttonList);
    }
  })

  return (
    <div>
      <div className="product-actions">
        {buttonSizes}
      </div>
      <div className="product-actions">
        <button className="add-to-wishlist">Add to wishlist</button>
      </div>
    </div>
  );
};




