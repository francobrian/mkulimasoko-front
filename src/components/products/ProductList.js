import React, { useState } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaFilter } from 'react-icons/fa';
import './ProductList.css';

const ProductList = ({ products, loading, error }) => {
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    organicOnly: false,
    inStockOnly: false
  });

  if (loading) {
    return (
      <div className="product-list-loading">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-error">
        <div className="error-message">
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="empty-state">
          <h3>No Products Found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      </div>
    );
  }

  const sortProducts = (products) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        sorted.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default:
        // Recommended (default)
        break;
    }
    
    return sorted;
  };

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    if (filters.organicOnly && !product.isOrganic) {
      return false;
    }
    
    if (filters.inStockOnly && product.quantity === 0) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="results-info">
          <h2>Fresh Farm Products</h2>
          <p>{sortedProducts.length} products found</p>
        </div>
        
        <div className="product-list-controls">
          <button
            className="btn-filter"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filter
          </button>
          
          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="product-filters">
          <div className="filter-section">
            <h4>Category</h4>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="grains">Grains</option>
              <option value="meat">Meat & Poultry</option>
            </select>
          </div>
          
          <div className="filter-section">
            <h4>Price Range (KSh)</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </div>
          
          <div className="filter-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.organicOnly}
                onChange={(e) => setFilters({...filters, organicOnly: e.target.checked})}
              />
              Organic Only
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters({...filters, inStockOnly: e.target.checked})}
              />
              In Stock Only
            </label>
          </div>
          
          <button
            className="btn-clear-filters"
            onClick={() => setFilters({
              category: 'all',
              minPrice: '',
              maxPrice: '',
              organicOnly: false,
              inStockOnly: false
            })}
          >
            Clear All Filters
          </button>
        </div>
      )}

      <div className="product-list-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length > 0 && (
        <div className="product-list-pagination">
          <button className="btn-pagination" disabled>
            Previous
          </button>
          <span className="page-info">Page 1 of 3</span>
          <button className="btn-pagination">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;