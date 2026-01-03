import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import ProductList from '../components/products/ProductList';
import { Helmet } from 'react-helmet-async';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const {
    getPaginatedProducts,
    setSelectedCategory,
    setSearchQuery,
    setCurrentPage,
    loading,
    error
  } = useProducts();

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [category, search, page, setSelectedCategory, setSearchQuery, setCurrentPage]);

  const products = getPaginatedProducts();

  return (
    <>
      <Helmet>
        <title>Products - MkulimaSoko</title>
        <meta name="description" content="Browse fresh farm products on MkulimaSoko" />
      </Helmet>

      <div className="products-page">
        <div className="container">
          <div className="page-header">
            <h1>Farm Fresh Products</h1>
            <p>Direct from farmers to your doorstep</p>
          </div>

          <div className="products-content">
            <aside className="products-sidebar">
              <div className="sidebar-section">
                <h3>Categories</h3>
                <ul className="category-list">
                  <li><a href="/products">All Products</a></li>
                  <li><a href="/products/vegetables">Vegetables</a></li>
                  <li><a href="/products/fruits">Fruits</a></li>
                  <li><a href="/products/dairy">Dairy Products</a></li>
                  <li><a href="/products/grains">Grains & Cereals</a></li>
                  <li><a href="/products/meat">Meat & Poultry</a></li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h3>Filter by Price</h3>
                <div className="price-filter">
                  <input type="range" min="0" max="5000" />
                  <div className="price-range">
                    <span>KSh 0</span>
                    <span>KSh 5,000</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Farm Practices</h3>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" /> Organic
                  </label>
                  <label>
                    <input type="checkbox" /> Local
                  </label>
                  <label>
                    <input type="checkbox" /> Sustainable
                  </label>
                </div>
              </div>
            </aside>

            <main className="products-main">
              <ProductList 
                products={products}
                loading={loading}
                error={error}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;