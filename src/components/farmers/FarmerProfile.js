import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';
import ProductCard from '../products/ProductCard';
import './FarmerProfile.css';

const FarmerProfile = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock farmer data
        const mockFarmer = {
          id,
          name: 'John Kamau',
          businessName: 'Kamau Organic Farm',
          location: 'Kiambu County, Kenya',
          phone: '+254 712 345 678',
          email: 'john@kamaufarm.com',
          rating: 4.8,
          reviewCount: 245,
          totalProducts: 24,
          joined: 'March 2022',
          verified: true,
          organicCertified: true,
          description: 'A family-owned organic farm specializing in fresh vegetables and fruits. Committed to sustainable farming practices.',
          specialties: ['Organic Vegetables', 'Fresh Fruits', 'Herbs'],
          deliveryAreas: ['Nairobi', 'Kiambu', 'Thika'],
          profileImage: '/images/farmer-profile.jpg',
          coverImage: '/images/farm-cover.jpg'
        };

        // Mock products
        const mockProducts = [
          {
            id: '1',
            name: 'Organic Tomatoes',
            price: 250,
            images: ['/images/tomatoes1.jpg'],
            farmer: { name: 'John Kamau', location: 'Kiambu' },
            rating: 4.5,
            reviewCount: 128,
            category: 'vegetables',
            isOrganic: true,
            isFeatured: true,
            discount: 17,
            quantity: 50
          },
          // Add more mock products...
        ];

        setTimeout(() => {
          setFarmer(mockFarmer);
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (!farmer) {
    return (
      <div className="farmer-not-found">
        <h2>Farmer not found</h2>
        <p>The farmer profile you're looking for doesn't exist.</p>
        <a href="/farmers" className="btn-back">Back to Farmers</a>
      </div>
    );
  }

  return (
    <div className="farmer-profile">
      {/* Cover Image */}
      <div className="farmer-cover">
        <img
          src={farmer.coverImage || '/images/farm-cover-default.jpg'}
          alt={`${farmer.name}'s farm`}
          onError={(e) => {
            e.target.src = '/images/farm-cover-default.jpg';
          }}
        />
      </div>

      <div className="container">
        {/* Farmer Header */}
        <div className="farmer-header">
          <div className="farmer-avatar-section">
            <div className="farmer-avatar">
              <img
                src={farmer.profileImage || '/images/avatar-placeholder.jpg'}
                alt={farmer.name}
                onError={(e) => {
                  e.target.src = '/images/avatar-placeholder.jpg';
                }}
              />
              {farmer.verified && (
                <span className="verified-badge" title="Verified Farmer">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            <div className="farmer-basic-info">
              <h1>{farmer.name}</h1>
              <p className="business-name">{farmer.businessName}</p>
              <div className="farmer-rating">
                <div className="stars">{renderStars(farmer.rating)}</div>
                <span className="rating-value">{farmer.rating.toFixed(1)}</span>
                <span className="review-count">({farmer.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="farmer-actions">
            <button className="btn-contact">Contact Farmer</button>
            <button className="btn-follow">Follow</button>
            <button className="btn-share">Share</button>
          </div>
        </div>

        {/* Farmer Details */}
        <div className="farmer-details">
          <div className="farmer-info-card">
            <h3>About the Farmer</h3>
            <p className="farmer-description">{farmer.description}</p>
            
            <div className="info-grid">
              <div className="info-item">
                <FaMapMarkerAlt />
                <div>
                  <strong>Location</strong>
                  <p>{farmer.location}</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone />
                <div>
                  <strong>Phone</strong>
                  <p>{farmer.phone}</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope />
                <div>
                  <strong>Email</strong>
                  <p>{farmer.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <strong>Joined</strong>
                  <p>{farmer.joined}</p>
                </div>
              </div>
            </div>

            {farmer.organicCertified && (
              <div className="organic-certification">
                <FaLeaf />
                <span>Organically Certified</span>
              </div>
            )}

            <div className="specialties">
              <h4>Specialties</h4>
              <div className="specialty-tags">
                {farmer.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            </div>

            <div className="delivery-areas">
              <h4>Delivery Areas</h4>
              <div className="area-tags">
                {farmer.deliveryAreas.map((area, index) => (
                  <span key={index} className="area-tag">{area}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="farmer-stats-card">
            <h3>Farm Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{farmer.totalProducts}</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{farmer.reviewCount}</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{farmer.rating.toFixed(1)}</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Positive Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="farmer-tabs">
          <div className="tab-headers">
            <button
              className={`tab-header ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products ({products.length})
            </button>
            <button
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({farmer.reviewCount})
            </button>
            <button
              className={`tab-header ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About the Farm
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'products' && (
              <div className="products-tab">
                <div className="products-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-list">
                  {/* Reviews would go here */}
                  <p>No reviews yet. Be the first to review this farmer!</p>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="about-tab">
                <h3>Our Farming Philosophy</h3>
                <p>We believe in sustainable farming practices that respect the environment and produce healthy, nutritious food.</p>
                
                <h3>Farming Practices</h3>
                <ul>
                  <li>Organic farming methods</li>
                  <li>No chemical pesticides or fertilizers</li>
                  <li>Water conservation techniques</li>
                  <li>Crop rotation for soil health</li>
                </ul>

                <h3>Certifications</h3>
                <div className="certifications">
                  {farmer.organicCertified && (
                    <div className="certification">
                      <FaLeaf />
                      <span>Organic Certified (2023)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="farmer-cta">
          <h2>Want to buy from {farmer.name}?</h2>
          <p>Browse their products or contact them directly</p>
          <div className="cta-buttons">
            <button className="btn-browse-products">Browse All Products</button>
            <button className="btn-contact-farmer">Contact Farmer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;