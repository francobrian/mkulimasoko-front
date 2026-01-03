import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShareAlt, FaTruck, FaShieldAlt, FaLeaf, FaStar, FaCheckCircle } from 'react-icons/fa';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading: productsLoading } = useProducts();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, you would fetch from API
        // For now, we'll use mock data
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
            joined: '2022',
            verified: true
          },
          rating: 4.5,
          reviewCount: 128,
          soldCount: 1560,
          quantity: 50,
          isOrganic: true,
          isFeatured: true,
          createdAt: '2023-10-15',
          nutritionFacts: {
            calories: '18 kcal',
            protein: '0.9g',
            carbs: '3.9g',
            fiber: '1.2g'
          },
          reviews: [
            {
              id: '1',
              user: 'Mary Wanjiku',
              rating: 5,
              comment: 'Very fresh and tasty tomatoes! Will order again.',
              date: '2024-01-10'
            }
          ]
        };

        setProduct(mockProduct);

        // Load related products
        const mockRelated = [
          {
            id: '2',
            name: 'Organic Bell Peppers',
            price: 320,
            image: '/images/peppers.jpg',
            category: 'vegetables'
          },
          {
            id: '3',
            name: 'Fresh Carrots',
            price: 180,
            image: '/images/carrots.jpg',
            category: 'vegetables'
          }
        ];
        setRelatedProducts(mockRelated);

      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on MkulimaSoko`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <button onClick={() => navigate(-1)} className="btn-back">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const cartQuantity = getItemQuantity(id);
  const isInCartStatus = isInCart(id);

  return (
    <>
      <Helmet>
        <title>{product.name} - MkulimaSoko</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="product-details-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button onClick={() => navigate(-1)} className="breadcrumb-back">
              <FaArrowLeft /> Back
            </button>
            <span className="breadcrumb-separator">/</span>
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/products">Products</a>
            <span className="breadcrumb-separator">/</span>
            <a href={`/products/${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </a>
            <span className="breadcrumb-separator">/</span>
            <span className="current">{product.name}</span>
          </nav>

          {/* Product Main */}
          <div className="product-details-main">
            {/* Images */}
            <div className="product-images-section">
              <div className="main-image-container">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="main-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-product.jpg';
                  }}
                />
              </div>
              <div className="image-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
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

                <div className="product-meta">
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="rating-value">{product.rating.toFixed(1)}</span>
                    <span className="review-count">({product.reviewCount} reviews)</span>
                    <span className="sold-count">• {product.soldCount.toLocaleString()} sold</span>
                  </div>

                  <div className="product-sku">
                    <span>SKU: PROD-{id.padStart(6, '0')}</span>
                  </div>
                </div>

                <div className="product-price">
                  <div className="current-price">
                    KSh {product.price.toLocaleString()}
                  </div>
                  {product.originalPrice > product.price && (
                    <>
                      <div className="original-price">
                        KSh {product.originalPrice.toLocaleString()}
                      </div>
                      <div className="savings">
                        Save KSh {(product.originalPrice - product.price).toLocaleString()}
                      </div>
                    </>
                  )}
                </div>

                <div className="product-description-short">
                  <p>{product.description}</p>
                </div>

                {/* Farmer Info */}
                <div className="product-farmer-info">
                  <h3>Sold by</h3>
                  <div className="farmer-card">
                    <div className="farmer-avatar">
                      {product.farmer.name.charAt(0)}
                      {product.farmer.verified && (
                        <span className="verified-badge">
                          <FaCheckCircle />
                        </span>
                      )}
                    </div>
                    <div className="farmer-details">
                      <h4>{product.farmer.name}</h4>
                      <p className="farmer-location">
                        <FaLeaf /> {product.farmer.location}
                      </p>
                      <div className="farmer-stats">
                        <span className="farmer-rating">
                          ⭐ {product.farmer.rating}
                        </span>
                        <span className="farmer-products">
                          📦 {product.farmer.totalProducts} products
                        </span>
                      </div>
                    </div>
                    <a 
                      href={`/farmer/${product.farmer.id}`} 
                      className="btn-view-farmer"
                    >
                      View Profile
                    </a>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="product-actions">
                  <div className="quantity-selector">
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
                          const value = parseInt(e.target.value) || 1;
                          const max = product.quantity || 10;
                          if (value >= 1 && value <= max) {
                            setQuantity(value);
                          }
                        }}
                        min="1"
                        max={product.quantity || 10}
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.quantity || 10)}
                      >
                        +
                      </button>
                    </div>
                    <span className="stock-status">
                      {product.quantity > 0 
                        ? `${product.quantity} units available` 
                        : 'Out of Stock'
                      }
                    </span>
                  </div>

                  <div className="action-buttons">
                    <button
                      className={`btn-add-to-cart ${isInCartStatus ? 'added' : ''}`}
                      onClick={handleAddToCart}
                      disabled={product.quantity === 0}
                    >
                      <FaShoppingCart />
                      {isInCartStatus ? `Added (${cartQuantity})` : 'Add to Cart'}
                    </button>
                    <button
                      className="btn-buy-now"
                      onClick={handleBuyNow}
                      disabled={product.quantity === 0}
                    >
                      Buy Now
                    </button>
                    <button
                      className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className="btn-share"
                      onClick={handleShare}
                    >
                      <FaShareAlt />
                    </button>
                  </div>
                </div>

                {/* Delivery Info */}
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
                      <strong>Quality Guaranteed</strong>
                      <p>Freshness and quality assured</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="product-tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-pane description">
                  <h3>Product Description</h3>
                  <p>{product.detailedDescription}</p>
                  
                  <h4>Key Features</h4>
                  <ul>
                    <li>Freshly harvested daily</li>
                    <li>Grown without chemical pesticides</li>
                    <li>Rich in vitamins and antioxidants</li>
                    <li>Perfect for salads, sauces, and cooking</li>
                    <li>Locally grown by trusted farmers</li>
                  </ul>

                  <h4>Nutritional Information (per 100g)</h4>
                  <div className="nutrition-table">
                    <div className="nutrition-row">
                      <span>Calories</span>
                      <span>{product.nutritionFacts?.calories || '18 kcal'}</span>
                    </div>
                    <div className="nutrition-row">
                      <span>Protein</span>
                      <span>{product.nutritionFacts?.protein || '0.9g'}</span>
                    </div>
                    <div className="nutrition-row">
                      <span>Carbohydrates</span>
                      <span>{product.nutritionFacts?.carbs || '3.9g'}</span>
                    </div>
                    <div className="nutrition-row">
                      <span>Fiber</span>
                      <span>{product.nutritionFacts?.fiber || '1.2g'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="tab-pane specifications">
                  <h3>Product Specifications</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Product Name</td>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
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
                      <tr>
                        <td>Storage</td>
                        <td>Store in a cool, dry place. Refrigerate after opening.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="tab-pane reviews">
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

                  <div className="reviews-list">
                    {product.reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-avatar">
                            {review.user.charAt(0)}
                          </div>
                          <div className="reviewer-info">
                            <h4>{review.user}</h4>
                            <div className="review-rating">
                              {renderStars(review.rating)}
                              <span className="review-date">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="write-review">
                    <h4>Write a Review</h4>
                    <textarea 
                      placeholder="Share your experience with this product..."
                      rows="4"
                    ></textarea>
                    <div className="review-actions">
                      <div className="review-rating-input">
                        <span>Your Rating:</span>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map(star => (
                            <FaStar key={star} className="star selectable" />
                          ))}
                        </div>
                      </div>
                      <button className="btn-submit-review">
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section">
              <h2>You May Also Like</h2>
              <div className="related-products-grid">
                {relatedProducts.map(related => (
                  <div key={related.id} className="related-product-card">
                    <img src={related.image} alt={related.name} />
                    <div className="related-product-info">
                      <h4>{related.name}</h4>
                      <p className="price">KSh {related.price.toLocaleString()}</p>
                      <a href={`/product/${related.id}`} className="btn-view-related">
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;