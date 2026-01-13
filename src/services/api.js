import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mkulimasoko_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle specific error codes
      switch (status) {
        case 401:
          // Unauthorized - clear local storage and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('mkulimasoko_token');
            localStorage.removeItem('mkulimasoko_user');
            window.location.href = '/login?session_expired=true';
          }
          break;
          
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
          
        case 404:
          console.error('Resource not found');
          break;
          
        case 500:
          console.error('Internal server error');
          break;
          
        default:
          console.error(`API Error: ${status}`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response received from server');
    } else {
      // Something else happened
      console.error('API Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // User registration
  register: (userData) => api.post('/auth/register', userData),
  
  // User login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Verify token
  verifyToken: (token) => api.post('/auth/verify', { token }),
  
  // Refresh token
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  
  // Update profile
  updateProfile: (userId, profileData) => api.put(`/auth/profile/${userId}`, profileData),
  
  // Get user profile
  getProfile: (userId) => api.get(`/auth/profile/${userId}`),
  
  // Upload profile picture
  uploadProfilePicture: (userId, formData) => api.post(`/auth/profile/${userId}/picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

// Products API endpoints
export const productAPI = {
  // Get all products
  getAll: (params) => api.get('/products', { params }),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Get products by category
  getByCategory: (category, params) => api.get(`/products/category/${category}`, { params }),
  
  // Search products
  search: (query, params) => api.get(`/products/search/${query}`, { params }),
  
  // Get featured products
  getFeatured: () => api.get('/products/featured'),
  
  // Get products by farmer
  getByFarmer: (farmerId) => api.get(`/products/farmer/${farmerId}`),
  
  // Create new product
  create: (productData) => api.post('/products', productData),
  
  // Update product
  update: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete product
  delete: (id) => api.delete(`/products/${id}`),
  
  // Upload product images
  uploadImages: (productId, formData) => api.post(`/products/${productId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // Get product categories
  getCategories: () => api.get('/products/categories'),
  
  // Get product statistics
  getStatistics: () => api.get('/products/statistics'),
  
  // Get similar products
  getSimilar: (productId) => api.get(`/products/${productId}/similar`)
};

// Orders API endpoints
export const orderAPI = {
  // Get all orders
  getAll: (params) => api.get('/orders', { params }),
  
  // Get order by ID
  getById: (id) => api.get(`/orders/${id}`),
  
  // Get orders by user
  getByUser: (userId, params) => api.get(`/orders/user/${userId}`, { params }),
  
  // Get orders by farmer
  getByFarmer: (farmerId, params) => api.get(`/orders/farmer/${farmerId}`, { params }),
  
  // Create new order
  create: (orderData) => api.post('/orders', orderData),
  
  // Update order status
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  
  // Cancel order
  cancel: (id) => api.delete(`/orders/${id}`),
  
  // Get order statistics
  getStatistics: () => api.get('/orders/statistics'),
  
  // Get recent orders
  getRecent: (limit = 10) => api.get(`/orders/recent/${limit}`)
};

// Cart API endpoints
export const cartAPI = {
  // Get user cart
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (itemData) => api.post('/cart/items', itemData),
  
  // Update cart item
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}`),
  
  // Clear cart
  clearCart: () => api.delete('/cart'),
  
  // Get cart count
  getCartCount: () => api.get('/cart/count'),
  
  // Merge local cart with server cart
  mergeCart: (localCart) => api.post('/cart/merge', { items: localCart })
};

// Farmers API endpoints
export const farmerAPI = {
  // Get all farmers
  getAll: (params) => api.get('/farmers', { params }),
  
  // Get farmer by ID
  getById: (id) => api.get(`/farmers/${id}`),
  
  // Get farmer profile
  getProfile: (farmerId) => api.get(`/farmers/${farmerId}/profile`),
  
  // Update farmer profile
  updateProfile: (farmerId, profileData) => api.put(`/farmers/${farmerId}/profile`, profileData),
  
  // Get farmer statistics
  getStatistics: (farmerId) => api.get(`/farmers/${farmerId}/statistics`),
  
  // Get farmer reviews
  getReviews: (farmerId, params) => api.get(`/farmers/${farmerId}/reviews`, { params }),
  
  // Add farmer review
  addReview: (farmerId, reviewData) => api.post(`/farmers/${farmerId}/reviews`, reviewData),
  
  // Get top farmers
  getTopFarmers: (limit = 10) => api.get(`/farmers/top/${limit}`),
  
  // Verify farmer
  verifyFarmer: (farmerId) => api.post(`/farmers/${farmerId}/verify`)
};

// Reviews API endpoints
export const reviewAPI = {
  // Get product reviews
  getProductReviews: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  
  // Get farmer reviews
  getFarmerReviews: (farmerId, params) => api.get(`/reviews/farmer/${farmerId}`, { params }),
  
  // Add review
  addReview: (reviewData) => api.post('/reviews', reviewData),
  
  // Update review
  updateReview: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  
  // Delete review
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
  
  // Get review statistics
  getStatistics: (entityId, entityType) => api.get(`/reviews/statistics/${entityType}/${entityId}`)
};

// Payments API endpoints
export const paymentAPI = {
  // Initiate payment
  initiatePayment: (paymentData) => api.post('/payments/initiate', paymentData),
  
  // Verify payment
  verifyPayment: (paymentId) => api.get(`/payments/verify/${paymentId}`),
  
  // Get payment methods
  getPaymentMethods: () => api.get('/payments/methods'),
  
  // Get payment history
  getPaymentHistory: (userId, params) => api.get(`/payments/history/${userId}`, { params }),
  
  // Process mobile payment
  processMobilePayment: (paymentData) => api.post('/payments/mobile', paymentData)
};

// Notifications API endpoints
export const notificationAPI = {
  // Get user notifications
  getUserNotifications: (userId, params) => api.get(`/notifications/user/${userId}`, { params }),
  
  // Mark notification as read
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  
  // Mark all notifications as read
  markAllAsRead: (userId) => api.put(`/notifications/user/${userId}/read-all`),
  
  // Delete notification
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
  
  // Get unread count
  getUnreadCount: (userId) => api.get(`/notifications/user/${userId}/unread-count`),
  
  // Create notification
  createNotification: (notificationData) => api.post('/notifications', notificationData)
};

// Analytics API endpoints
export const analyticsAPI = {
  // Get sales analytics
  getSalesAnalytics: (farmerId, period) => api.get(`/analytics/sales/${farmerId}`, { params: { period } }),
  
  // Get visitor analytics
  getVisitorAnalytics: (period) => api.get('/analytics/visitors', { params: { period } }),
  
  // Get popular products
  getPopularProducts: (limit = 10) => api.get(`/analytics/products/popular/${limit}`),
  
  // Get revenue analytics
  getRevenueAnalytics: (farmerId, period) => api.get(`/analytics/revenue/${farmerId}`, { params: { period } }),
  
  // Get customer analytics
  getCustomerAnalytics: (farmerId) => api.get(`/analytics/customers/${farmerId}`)
};

// Market Updates API endpoints
export const marketAPI = {
  // Get market prices
  getPrices: (params) => api.get('/market/prices', { params }),
  
  // Get market trends
  getTrends: (commodity, period) => api.get(`/market/trends/${commodity}`, { params: { period } }),
  
  // Get market news
  getNews: (params) => api.get('/market/news', { params }),
  
  // Get commodity prices by location
  getPricesByLocation: (location, params) => api.get(`/market/prices/location/${location}`, { params }),
  
  // Get market statistics
  getStatistics: () => api.get('/market/statistics'),
  
  // Subscribe to market alerts
  subscribeAlerts: (alertData) => api.post('/market/alerts/subscribe', alertData),
  
  // Unsubscribe from market alerts
  unsubscribeAlerts: (alertId) => api.delete(`/market/alerts/${alertId}`)
};

// Weather API endpoints
export const weatherAPI = {
  // Get current weather
  getCurrent: (location) => api.get(`/weather/current/${location}`),
  
  // Get weather forecast
  getForecast: (location, days = 7) => api.get(`/weather/forecast/${location}`, { params: { days } }),
  
  // Get weather alerts
  getAlerts: (location) => api.get(`/weather/alerts/${location}`),
  
  // Get agricultural weather advice
  getAgriAdvice: (location) => api.get(`/weather/agri-advice/${location}`),
  
  // Get weather history
  getHistory: (location, days = 30) => api.get(`/weather/history/${location}`, { params: { days } }),
  
  // Subscribe to weather alerts
  subscribeAlerts: (alertData) => api.post('/weather/alerts/subscribe', alertData),
  
  // Unsubscribe from weather alerts
  unsubscribeAlerts: (alertId) => api.delete(`/weather/alerts/${alertId}`)
};

// Utility function to handle API errors
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response) {
    return error.response.data.message || defaultMessage;
  } else if (error.request) {
    return 'Network error: Please check your internet connection';
  } else {
    return error.message || defaultMessage;
  }
};

// Utility function to format API response
export const formatResponse = (response) => {
  return {
    success: true,
    data: response.data,
    message: response.data.message || 'Request successful',
    status: response.status
  };
};

// Export the axios instance for custom requests
export default api;