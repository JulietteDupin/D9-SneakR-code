import React from 'react';
import "../../css/sneaker.css"
import Navbar from '../tools/Navbar';

const ProductPage = ({ sneaker }) => {
  if (!sneaker) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <Navbar></Navbar>
      <div className="product-left">
        <ProductImage src={sneaker.image.small} alt={sneaker.name} />
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
        <ProductActions />
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
        {/* <span>${price.toFixed(2)}</span> */}
      </div>
    </div>
  );
};


const ProductActions = () => {
  return (
    <div className="product-actions">
      <button className="add-to-cart">Add to cart</button>
      <button className="add-to-wishlist">Add to wishlist</button>
    </div>
  );
};




