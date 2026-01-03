import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - MkulimaSoko</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <div className="not-found-page">
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="error-code">404</div>
            <h1>Page Not Found</h1>
            <p>
              Sorry, the page you're looking for doesn't exist.
              It might have been moved, deleted, or you entered the wrong URL.
            </p>

            <div className="not-found-actions">
              <Link to="/" className="home-btn">
                <FaHome />
                Go Home
              </Link>
              <Link to="/products" className="browse-btn">
                <FaSearch />
                Browse Products
              </Link>
            </div>

            <div className="not-found-help">
              <p>If you believe this is an error, please contact our support team.</p>
            </div>
          </div>

          <div className="not-found-image">
            <div className="illustration">
              <div className="circle"></div>
              <div className="circle small"></div>
              <div className="leaf"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;