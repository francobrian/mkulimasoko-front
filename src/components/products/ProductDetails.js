import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaShareAlt,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulated API call
        const mockProduct = {
          id,
          name: 'Fresh Organic Tomatoes',
          category: 'vegetables',
          price: 250,
          originalPrice: 300,
          discount: 17,
          images: [
            '/images/tomatoes1.jpg',
            '/images/tomatoes2.jpg',
            '/images/tomatoes3.jpg',
            '/images/tomatoes4.jpg'
          ],
          description: 'Fresh organic tomatoes grown locally without pesticides. Perfect for salads, sauces, and cooking.',
          detailedDescription: 'Our organic tomatoes are grown using sustainable farming practices. They are rich in vitamins A, C, and K, and are packed with antioxidants like lycopene which promotes heart health.',
          specifications: {
            type: 'Organic',
            weight: '1 kg',
            shelfLife: '7-10 days',
            origin: 'Nairobi, Kenya',
            farmingMethod: 'Organic, Sustainable'
          },
          farmer: {
            id: '1',
            name: 'John Kamau',
            location: 'Kiambu County',
            rating: 4.8,
            totalProducts: 24,
            joined: '2022'
          },
          rating: 4.5,
          reviewCount: 128,
          soldCount: 1560,
          quantity: 50,
          isOrganic: true,
          isFeatured: true,
          createdAt: '2023-10-15'
        };
        
        setTimeout(() => {
          setProduct(mockProduct);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStar key={i} className="star half" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return (
      <div className="product-error">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error}</p>
          <a href="/products" className="btn-back">Back to Products</a>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const cartQuantity = getItemQuantity(id);

  return (
    <div className="product-details">
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Home</a> &gt;
          <a href="/products">Products</a> &gt;
          <a href={`/products/${product.category}`}>{product.category}</a> &gt;
          <span>{product.name}</span>
        </div>

        <div className="product-details-content">
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images[selectedImage] || '/images/placeholder-product.jpg'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.jpg';
                }}
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <div className="product-badges">
                {product.isOrganic && (
                  <span className="badge organic">
                    <FaLeaf /> Organic
                  </span>
                )}
                {product.isFeatured && (
                  <span className="badge featured">Featured</span>
                )}
                {product.discount > 0 && (
                  <span className="badge discount">-{product.discount}%</span>
                )}
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating-overview">
                <div className="stars">{renderStars(product.rating)}</div>
                <span className="rating-value">{product.rating.toFixed(1)}</span>
                <span className="review-count">({product.reviewCount} reviews)</span>
                <span className="sold-count">{product.soldCount.toLocaleString()} sold</span>
              </div>
              
              <div className="product-price-section">
                <div className="current-price">
                  KSh {product.price.toLocaleString()}
                </div>
                {product.originalPrice > product.price && (
                  <div className="original-price">
                    KSh {product.originalPrice.toLocaleString()}
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="discount-amount">
                    Save KSh {(product.originalPrice - product.price).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-specifications">
              <div className="spec-item">
                <span className="spec-label">Type:</span>
                <span className="spec-value">{product.specifications.type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight:</span>
                <span className="spec-value">{product.specifications.weight}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Shelf Life:</span>
                <span className="spec-value">{product.specifications.shelfLife}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Origin:</span>
                <span className="spec-value">{product.specifications.origin}</span>
              </div>
            </div>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= product.quantity) {
                      setQuantity(value);
                    }
                  }}
                  min="1"
                  max={product.quantity}
                />
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>
              <span className="stock-info">
                {product.quantity} units available
              </span>
            </div>

            <div className="product-actions">
              <button
                className={`btn-add-to-cart ${isInCart(id) ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                <FaShoppingCart />
                {isInCart(id) ? `Added (${cartQuantity})` : 'Add to Cart'}
              </button>
              <button className="btn-buy-now">
                Buy Now
              </button>
              <button
                className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart />
              </button>
              <button className="btn-share">
                <FaShareAlt />
              </button>
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <FaTruck />
                <div>
                  <strong>Free Delivery</strong>
                  <p>For orders above KSh 2,000 in Nairobi</p>
                </div>
              </div>
              <div className="delivery-item">
                <FaShieldAlt />
                <div>
                  <strong>Quality Guarantee</strong>
                  <p>Freshness and quality assured</p>
                </div>
              </div>
            </div>

            <div className="farmer-info">
              <h3>Sold By</h3>
              <div className="farmer-card">
                <div className="farmer-avatar">
                  {product.farmer.name.charAt(0)}
                </div>
                <div className="farmer-details">
                  <h4>{product.farmer.name}</h4>
                  <p>{product.farmer.location}</p>
                  <div className="farmer-stats">
                    <span>⭐ {product.farmer.rating}</span>
                    <span>📦 {product.farmer.totalProducts} products</span>
                    <span>👤 Member since {product.farmer.joined}</span>
                  </div>
                </div>
                <a href={`/farmer/${product.farmer.id}`} className="btn-view-farmer">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewCount})
            </button>
            <button
              className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>About This Product</h3>
                <p>{product.detailedDescription}</p>
                <ul>
                  <li>Freshly harvested daily</li>
                  <li>Grown without chemical pesticides</li>
                  <li>Rich in vitamins and antioxidants</li>
                  <li>Perfect for salads and cooking</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <table>
                  <tbody>
                    <tr>
                      <td>Category</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{product.specifications.type}</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>{product.specifications.weight}</td>
                    </tr>
                    <tr>
                      <td>Shelf Life</td>
                      <td>{product.specifications.shelfLife}</td>
                    </tr>
                    <tr>
                      <td>Origin</td>
                      <td>{product.specifications.origin}</td>
                    </tr>
                    <tr>
                      <td>Farming Method</td>
                      <td>{product.specifications.farmingMethod}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <h2>{product.rating.toFixed(1)}</h2>
                    <div className="stars">{renderStars(product.rating)}</div>
                    <p>Based on {product.reviewCount} reviews</p>
                  </div>
                  <div className="rating-breakdown">
                    <div className="rating-bar">
                      <span>5 stars</span>
                      <div className="bar">
                        <div className="fill" style={{ width: '70%' }}></div>
                      </div>
                      <span>70%</span>
                    </div>
                    <div className="rating-bar">
                      <span>4 stars</span>
                      <div className="bar">
                        <div className="fill" style={{ width: '20%' }}></div>
                      </div>
                      <span>20%</span>
                    </div>
                    <div className="rating-bar">
                      <span>3 stars</span>
                      <div className="bar">
                        <div className="fill" style={{ width: '5%' }}></div>
                      </div>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
                <div className="write-review">
                  <h4>Write a Review</h4>
                  <textarea placeholder="Share your experience with this product..."></textarea>
                  <button className="btn-submit-review">Submit Review</button>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="shipping-content">
                <h3>Shipping Information</h3>
                <ul>
                  <li>Free delivery for orders above KSh 2,000 in Nairobi</li>
                  <li>Standard delivery: KSh 200 (2-3 business days)</li>
                  <li>Express delivery: KSh 500 (next day)</li>
                  <li>Delivery available within Nairobi and surrounding areas</li>
                </ul>
                <h3>Return Policy</h3>
                <ul>
                  <li>7-day return policy for fresh produce</li>
                  <li>Products must be in original condition</li>
                  <li>Contact customer service for returns</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {/* Related products would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;