import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { productAPI } from '../services/api';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Load all products on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll();
      const allProducts = response.data;
      
      setProducts(allProducts);
      
      // Set featured products (first 6 products or based on featured flag)
      const featured = allProducts
        .filter(product => product.featured)
        .slice(0, 6);
      setFeaturedProducts(featured);
      
      // Calculate total pages
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const categoriesData = [
        { id: 'vegetables', name: 'Vegetables', icon: '🥦', count: 0 },
        { id: 'fruits', name: 'Fruits', icon: '🍎', count: 0 },
        { id: 'dairy', name: 'Dairy Products', icon: '🥛', count: 0 },
        { id: 'grains', name: 'Grains & Cereals', icon: '🌾', count: 0 },
        { id: 'meat', name: 'Meat & Poultry', icon: '🍗', count: 0 },
        { id: 'herbs', name: 'Herbs & Spices', icon: '🌿', count: 0 }
      ];
      
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Get product by ID
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id);
  }, [products]);

  // Get products by category
  const getProductsByCategory = useCallback((categoryId) => {
    if (categoryId === 'all') {
      return products;
    }
    return products.filter(product => product.category === categoryId);
  }, [products]);

  // Search products
  const searchProducts = useCallback((query) => {
    if (!query.trim()) {
      return products;
    }
    
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }, [products]);

  // Sort products
  const sortProducts = useCallback((productsToSort) => {
    const sorted = [...productsToSort];
    
    sorted.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }, [sortBy, sortOrder]);

  // Filter products based on current filters
  const getFilteredProducts = useCallback(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }
    
    // Sort products
    filtered = sortProducts(filtered);
    
    return filtered;
  }, [products, selectedCategory, searchQuery, searchProducts, sortProducts]);

  // Get paginated products
  const getPaginatedProducts = useCallback(() => {
    const filtered = getFilteredProducts();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return filtered.slice(startIndex, endIndex);
  }, [getFilteredProducts, currentPage, itemsPerPage]);

  // Add new product (for farmers)
  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await productAPI.create(productData);
      const newProduct = response.data;
      
      setProducts(prev => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to add product' };
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (productId, updates) => {
    try {
      setLoading(true);
      const response = await productAPI.update(productId, updates);
      const updatedProduct = response.data;
      
      setProducts(prev => prev.map(product => 
        product.id === productId ? updatedProduct : product
      ));
      
      return { success: true, product: updatedProduct };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to update product' };
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await productAPI.delete(productId);
      
      setProducts(prev => prev.filter(product => product.id !== productId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to delete product' };
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const value = {
    products,
    featuredProducts,
    categories,
    loading,
    error,
    selectedCategory,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    totalPages,
    setSelectedCategory,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getFilteredProducts,
    getPaginatedProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    resetFilters,
    fetchProducts,
    fetchCategories
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};