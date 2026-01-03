import { productAPI, reviewAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Product Service
class ProductService {
  // Get all products
  static async getAllProducts(params = {}) {
    try {
      const response = await productAPI.getAll(params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load products'),
        data: [],
        total: 0
      };
    }
  }

  // Get product by ID
  static async getProductById(productId) {
    try {
      const response = await productAPI.getById(productId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load product details'),
        data: null
      };
    }
  }

  // Get products by category
  static async getProductsByCategory(category, params = {}) {
    try {
      const response = await productAPI.getByCategory(category, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, `Failed to load ${category} products`),
        data: [],
        total: 0
      };
    }
  }

  // Search products
  static async searchProducts(query, params = {}) {
    try {
      const response = await productAPI.search(query, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Search failed'),
        data: [],
        total: 0
      };
    }
  }

  // Get featured products
  static async getFeaturedProducts() {
    try {
      const response = await productAPI.getFeatured();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load featured products'),
        data: []
      };
    }
  }

  // Get products by farmer
  static async getProductsByFarmer(farmerId) {
    try {
      const response = await productAPI.getByFarmer(farmerId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load farmer products'),
        data: []
      };
    }
  }

  // Create new product
  static async createProduct(productData) {
    try {
      const response = await productAPI.create(productData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to create product'),
        data: null
      };
    }
  }

  // Update product
  static async updateProduct(productId, updates) {
    try {
      const response = await productAPI.update(productId, updates);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to update product'),
        data: null
      };
    }
  }

  // Delete product
  static async deleteProduct(productId) {
    try {
      const response = await productAPI.delete(productId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to delete product'),
        data: null
      };
    }
  }

  // Upload product images
  static async uploadProductImages(productId, images) {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      
      const response = await productAPI.uploadImages(productId, formData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to upload images'),
        data: null
      };
    }
  }

  // Get product categories
  static async getCategories() {
    try {
      const response = await productAPI.getCategories();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load categories'),
        data: []
      };
    }
  }

  // Get product reviews
  static async getProductReviews(productId, params = {}) {
    try {
      const response = await reviewAPI.getProductReviews(productId, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load reviews'),
        data: []
      };
    }
  }

  // Add product review
  static async addProductReview(productId, reviewData) {
    try {
      const response = await reviewAPI.addReview({
        ...reviewData,
        productId
      });
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to add review'),
        data: null
      };
    }
  }

  // Get similar products
  static async getSimilarProducts(productId) {
    try {
      const response = await productAPI.getSimilar(productId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load similar products'),
        data: []
      };
    }
  }

  // Get product statistics
  static async getProductStatistics() {
    try {
      const response = await productAPI.getStatistics();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load product statistics'),
        data: {}
      };
    }
  }

  // Format price
  static formatPrice(price, currency = 'KES') {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  // Calculate discount percentage
  static calculateDiscount(originalPrice, salePrice) {
    if (!originalPrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  }

  // Format product rating
  static formatRating(rating) {
    return rating ? rating.toFixed(1) : '0.0';
  }

  // Get product availability status
  static getAvailabilityStatus(quantity) {
    if (quantity <= 0) {
      return {
        status: 'out-of-stock',
        label: 'Out of Stock',
        color: 'danger'
      };
    } else if (quantity <= 10) {
      return {
        status: 'low-stock',
        label: 'Low Stock',
        color: 'warning'
      };
    } else {
      return {
        status: 'in-stock',
        label: 'In Stock',
        color: 'success'
      };
    }
  }

  // Sort products
  static sortProducts(products, sortBy, sortOrder = 'asc') {
    const sorted = [...products];
    
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
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'date':
          aValue = new Date(a.createdAt || a.addedAt);
          bValue = new Date(b.createdAt || b.addedAt);
          break;
        case 'popularity':
          aValue = a.soldCount || 0;
          bValue = b.soldCount || 0;
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
  }

  // Filter products
  static filterProducts(products, filters) {
    return products.filter(product => {
      // Filter by category
      if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Filter by price range
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      
      // Filter by rating
      if (filters.minRating && (product.rating || 0) < filters.minRating) {
        return false;
      }
      
      // Filter by availability
      if (filters.inStockOnly && product.quantity <= 0) {
        return false;
      }
      
      // Filter by farmer (if specified)
      if (filters.farmerId && product.farmerId !== filters.farmerId) {
        return false;
      }
      
      // Filter by organic (if specified)
      if (filters.organicOnly && !product.isOrganic) {
        return false;
      }
      
      return true;
    });
  }

  // Paginate products
  static paginateProducts(products, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = products.slice(startIndex, endIndex);
    
    return {
      products: paginated,
      total: products.length,
      page,
      totalPages: Math.ceil(products.length / itemsPerPage),
      hasNext: endIndex < products.length,
      hasPrev: page > 1
    };
  }

  // Calculate average rating from reviews
  static calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  // Generate product slug
  static generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }

  // Validate product data
  static validateProductData(productData) {
    const errors = {};
    
    if (!productData.name || productData.name.trim().length < 3) {
      errors.name = 'Product name must be at least 3 characters';
    }
    
    if (!productData.category) {
      errors.category = 'Category is required';
    }
    
    if (!productData.price || isNaN(productData.price) || productData.price <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (!productData.quantity || isNaN(productData.quantity) || productData.quantity < 0) {
      errors.quantity = 'Valid quantity is required';
    }
    
    if (!productData.description || productData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default ProductService;