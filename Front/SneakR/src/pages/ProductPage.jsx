import React from 'react';
import "../../css/sneaker.css";
import Navbar from '../tools/Navbar';
import { useCart } from '../context/CartContext';

const ProductPage = ({ sneaker }) => {
  console.log("sneaker", sneaker);
  const { addToCart } = useCart();

  if (!sneaker) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <Navbar />
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
        {/* Pass addToCart and sneaker to ProductActions */}
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

// Update ProductActions to accept addToCart and product props
const ProductActions = ({ addToCart, product }) => {
  // Structure the product data to match what addToCart expects
  const item = {
    id: product.id,
    name: product.name,
    price: product.estimatedMarketValue,
    stripe_price_id: product.stripe_price_id,
    image: JSON.parse(product.image).small,
  };

  return (
    <div className="product-actions">
      <button onClick={() => addToCart(item)} className="add-to-cart">
        Add to Cart
      </button>
      <button className="add-to-wishlist">Add to Wishlist</button>
    </div>
  );
};
