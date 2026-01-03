// Application Constants
export const APP_NAME = 'MkulimaSoko';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Connecting farmers directly to consumers';

// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PRODUCTS: {
    BASE: '/products',
    CATEGORY: '/products/category',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    FARMER: '/products/farmer',
  },
  ORDERS: {
    BASE: '/orders',
    USER: '/orders/user',
    FARMER: '/orders/farmer',
    STATUS: '/orders/status',
  },
  CART: {
    BASE: '/cart',
    ITEMS: '/cart/items',
    MERGE: '/cart/merge',
  },
  FARMERS: {
    BASE: '/farmers',
    PROFILE: '/farmers/profile',
    REVIEWS: '/farmers/reviews',
  },
  PAYMENTS: {
    BASE: '/payments',
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
    METHODS: '/payments/methods',
  },
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'dairy', name: 'Dairy Products', icon: '🥛' },
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾' },
  { id: 'meat', name: 'Meat & Poultry', icon: '🍗' },
  { id: 'herbs', name: 'Herbs & Spices', icon: '🌿' },
  { id: 'others', name: 'Others', icon: '📦' },
];

// User Roles
export const USER_ROLES = {
  BUYER: 'buyer',
  FARMER: 'farmer',
  ADMIN: 'admin',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

// Payment Methods
export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  CARD: 'card',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  BANK_TRANSFER: 'bank_transfer',
};

// Delivery Options
export const DELIVERY_OPTIONS = {
  STANDARD: { id: 'standard', name: 'Standard (2-3 days)', price: 200 },
  EXPRESS: { id: 'express', name: 'Express (Next Day)', price: 500 },
  FREE: { id: 'free', name: 'Free (Orders above 2000)', price: 0 },
};

// Color Scheme
export const COLORS = {
  PRIMARY: '#2e7d32',
  SECONDARY: '#4caf50',
  ACCENT: '#ff9800',
  BACKGROUND: '#f8f9fa',
  TEXT: '#333333',
  TEXT_LIGHT: '#666666',
  BORDER: '#e0e0e0',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ff9800',
  INFO: '#2196f3',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mkulimasoko_token',
  USER_DATA: 'mkulimasoko_user',
  CART: 'mkulimasoko_cart',
  WISHLIST: 'mkulimasoko_wishlist',
  RECENT_SEARCHES: 'mkulimasoko_recent_searches',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
};

// Application Settings
export const SETTINGS = {
  ITEMS_PER_PAGE: 12,
  MAX_CART_QUANTITY: 10,
  FREE_SHIPPING_THRESHOLD: 2000,
  DELIVERY_FEE: 200,
  TAX_RATE: 0.16, // 16% VAT
  CURRENCY: 'KES',
  CURRENCY_SYMBOL: 'KSh',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DEFAULT: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment successful!',
  CART_ADDED: 'Item added to cart!',
  CART_REMOVED: 'Item removed from cart!',
};