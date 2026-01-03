import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaStar, FaShoppingCart, FaEye, FaLeaf } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const {
    id,
    name,
    price,
    images,
    farmer,
    rating,
    reviewCount,
    category,
    isOrganic,
    isFeatured,
    discount
  } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        {isFeatured && <span className="badge featured">Featured</span>}
        {isOrganic && (
          <span className="badge organic">
            <FaLeaf /> Organic
          </span>
        )}
        {discount > 0 && (
          <span className="badge discount">-{discount}%</span>
        )}
        <div className="product-actions">
          <button className="btn-action btn-quick-view" title="Quick View">
            <FaEye />
          </button>
          <button
            className={`btn-action btn-cart ${isInCart(id) ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            title={isInCart(id) ? 'In Cart' : 'Add to Cart'}
          >
            <FaShoppingCart />
            {isInCart(id) && <span className="cart-indicator"></span>}
          </button>
        </div>
      </div>

      <Link to={`/product/${id}`} className="product-image-link">
        <div className="product-image">
          <img
            src={images[0] || '/images/placeholder-product.jpg'}
            alt={name}
            onError={(e) => {
              e.target.src = '/images/placeholder-product.jpg';
            }}
          />
        </div>
      </Link>

      <div className="product-card-body">
        <div className="product-category">{category}</div>
        <h3 className="product-name">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>

        <div className="product-farmer">
          <div className="farmer-avatar">
            {farmer?.name?.charAt(0) || 'F'}
          </div>
          <div className="farmer-info">
            <span className="farmer-name">By {farmer?.name || 'Local Farmer'}</span>
            <span className="farmer-location">{farmer?.location || 'Nairobi'}</span>
          </div>
        </div>

        <div className="product-rating">
          <div className="stars">{renderStars(rating)}</div>
          <span className="rating-text">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>

        <div className="product-price-section">
          <div className="price-info">
            <span className="current-price">KSh {price.toLocaleString()}</span>
            {discount > 0 && (
              <span className="original-price">
                KSh {Math.round(price / (1 - discount / 100)).toLocaleString()}
              </span>
            )}
          </div>
          <span className="unit">per kg</span>
        </div>

        <div className="product-stock">
          <div className="stock-indicator">
            <div className="stock-bar">
              <div
                className="stock-level"
                style={{ width: `${Math.min(product.quantity / 10 * 100, 100)}%` }}
              ></div>
            </div>
            <span className="stock-text">
              {product.quantity > 10 ? 'In Stock' : `${product.quantity} left`}
            </span>
          </div>
        </div>

        <div className="product-card-footer">
          <button
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            <FaShoppingCart />
            {isInCart(id) ? 'Added to Cart' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <Link to={`/product/${id}`} className="btn-view-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;