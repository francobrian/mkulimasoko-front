import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaLeaf, 
  FaTruck, 
  FaShieldAlt, 
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useProducts } from '../contexts/ProductsContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HomePage.css';

const HomePage = () => {
  const { featuredProducts, loading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const heroSlides = [
    {
      title: 'Fresh Farm Produce',
      subtitle: 'Directly from farmers to your table',
      image: '/images/hero1.jpg',
      cta: 'Shop Now',
      link: '/products'
    },
    {
      title: 'Organic & Healthy',
      subtitle: '100% natural produce without chemicals',
      image: '/images/hero2.jpg',
      cta: 'Browse Organic',
      link: '/products?organic=true'
    },
    {
      title: 'Support Local Farmers',
      subtitle: 'Empower Kenyan agriculture',
      image: '/images/hero3.jpg',
      cta: 'Meet Farmers',
      link: '/farmers'
    }
  ];

  const features = [
    {
      icon: <FaLeaf />,
      title: 'Fresh Produce',
      description: 'Direct from farm to your doorstep'
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: 'Same day delivery in Nairobi'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed'
    },
    {
      icon: <FaStar />,
      title: 'Verified Farmers',
      description: 'All farmers are verified'
    }
  ];

  const topCategories = [
    { name: 'Vegetables', icon: '🥦', count: 45, link: '/products/vegetables' },
    { name: 'Fruits', icon: '🍎', count: 32, link: '/products/fruits' },
    { name: 'Dairy', icon: '🥛', count: 28, link: '/products/dairy' },
    { name: 'Grains', icon: '🌾', count: 24, link: '/products/grains' },
    { name: 'Meat', icon: '🍗', count: 18, link: '/products/meat' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to={slide.link} className="btn-hero">
                  {slide.cta} <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
          <button className="slider-btn prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slider-btn next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <div className="container">
          <form className="home-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What are you looking for? (e.g., tomatoes, milk, eggs...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-search">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link to="/products" className="view-all">
              View All Categories <FaArrowRight />
            </Link>
          </div>
          <div className="categories-grid">
            {topCategories.map((category, index) => (
              <Link key={index} to={category.link} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>Fresh from the Farm</h2>
            <Link to="/products" className="view-all">
              View All Products <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="featured-products-grid">
              {featuredProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="featured-product-card">
                  <img src={product.images[0]} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">KSh {product.price.toLocaleString()}</p>
                    <Link to={`/product/${product.id}`} className="btn-view">
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose MkulimaSoko?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-number">01</div>
              <h3>Direct from Farmers</h3>
              <p>Cut out middlemen, get fresher produce at better prices</p>
            </div>
            <div className="reason-card">
              <div className="reason-number">02</div>
              <h3>Support Local</h3>
              <p>Your purchase directly supports Kenyan farmers</p>
            </div>
            <div className="reason-card">
              <div className="reason-number">03</div>
              <h3>Quality Assured</h3>
              <p>All products go through quality checks</p>
            </div>
            <div className="reason-card">
              <div className="reason-number">04</div>
              <h3>Easy Returns</h3>
              <p>7-day return policy for fresh produce</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to experience farm-fresh goodness?</h2>
            <p>Join thousands of happy customers enjoying fresh produce</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Sign Up Free
              </Link>
              <Link to="/products" className="btn-cta-secondary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;