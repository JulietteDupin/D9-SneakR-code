import React from "react";
import "../../css/productcard.css";

const ProductCard = ({ name, image, colorway, price }) => {
  return (
    <div className="product-card-container">
      <article className="product-card">
        <div>
          <img className="product-image" src={image} alt={name} />
        </div>

        <div className="product-info">
          <h2 className="product-name">{name}</h2>
          <span className="product-description">{colorway}</span>
          <span className="product-price">${price || "N/A"}</span>
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn">
            <span className="add-to-cart-text">Add to Cart</span>
            <svg
              className="add-to-cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
