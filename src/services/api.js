import axios from 'axios';
import config from '../config/config';

class ApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: config.api.baseURL,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.initializeToken();
  }

  initializeToken() {
    // Set initial token if available
    const token = this.getToken();
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params
        });
        
        return config;
      },
      (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        console.log(`✅ ${response.status} ${response.config.url}`, response.data);
        return response;
      },
      (error) => {
        const normalizedError = this.normalizeError(error);
        console.error('❌ Response error:', normalizedError);
        
        // Auto logout on 401
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        
        return Promise.reject(normalizedError);
      }
    );
  }

  normalizeError(error) {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'Server error occurred';
      
      const normalizedError = new Error(message);
      normalizedError.status = status;
      normalizedError.data = error.response.data;
      
      return normalizedError;
    } else if (error.request) {
      // Request made but no response received
      return new Error('Network error: Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  handleUnauthorized() {
    this.clearToken();
    // Redirect to login page if we're not already there
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  // Token management
  getToken() {
    return localStorage.getItem('mkulimasoko_token');
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('mkulimasoko_token', token);
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      this.clearToken();
    }
  }

  clearToken() {
    localStorage.removeItem('mkulimasoko_token');
    delete this.instance.defaults.headers.common['Authorization'];
  }

  // HTTP methods with enhanced error handling
  async request(config) {
    try {
      const response = await this.instance(config);
      return response.data;
    } catch (error) {
      throw error; // Already normalized by interceptor
    }
  }

  async get(url, params = {}) {
    return this.request({ method: 'GET', url, params });
  }

  async post(url, data = {}) {
    return this.request({ method: 'POST', url, data });
  }

  async put(url, data = {}) {
    return this.request({ method: 'PUT', url, data });
  }

  async patch(url, data = {}) {
    return this.request({ method: 'PATCH', url, data });
  }

  async delete(url) {
    return this.request({ method: 'DELETE', url });
  }

  // File upload helper
  async upload(url, formData, onProgress = null) {
    return this.request({
      method: 'POST',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    });
  }
}

export default new ApiService();