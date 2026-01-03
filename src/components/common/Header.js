import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaFacebook, FaTwitter, FaInstagram, FaLeaf } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="contact-info">
              <span>📞 +254 712 345 678</span>
              <span>✉️ info@mkulimasoko.com</span>
            </div>
            <div className="social-links">
              <a href="https://facebook.com/mkulimasoko" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com/mkulimasoko" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com/mkulimasoko" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <div className="logo-section">
              <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <Link to="/" className="logo">
                <FaLeaf className="logo-icon" />
                <div className="logo-text">
                  <span className="logo-primary">Mkulima</span>
                  <span className="logo-secondary">Soko</span>
                </div>
              </Link>
            </div>

            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for vegetables, fruits, dairy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>

            <div className="header-actions">
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>

              {isAuthenticated ? (
                <div className="user-menu">
                  <div className="user-avatar">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="user-dropdown">
                    <div className="user-info">
                      <strong>{user?.name}</strong>
                      <small>{user?.email}</small>
                    </div>
                    <div className="dropdown-menu">
                      <Link to="/profile">Profile</Link>
                      {user?.role === 'farmer' && (
                        <Link to="/farmer-dashboard">Dashboard</Link>
                      )}
                      {user?.role === 'buyer' && (
                        <Link to="/buyer-dashboard">Dashboard</Link>
                      )}
                      <Link to="/orders">My Orders</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn-login">Login</Link>
                  <Link to="/register" className="btn-register">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <span>Categories</span>
              <div className="dropdown-content">
                <Link to="/products/vegetables">Vegetables</Link>
                <Link to="/products/fruits">Fruits</Link>
                <Link to="/products/dairy">Dairy</Link>
                <Link to="/products/grains">Grains</Link>
                <Link to="/products/meat">Meat & Poultry</Link>
              </div>
            </li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/farmers">Farmers</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {user?.role === 'farmer' && (
              <li><Link to="/farmer-dashboard" className="farmer-link">Farmer Portal</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;