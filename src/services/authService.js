import apiService from './api';

class AuthService {
  async login(credentials) {
    try {
      this.validateCredentials(credentials);
      
      const response = await apiService.post('/auth/login', credentials);
      
      if (response.data?.token) {
        apiService.setToken(response.data.token);
        return {
          success: true,
          data: response.data,
          user: response.data.user
        };
      } else {
        throw new Error('Invalid response: No token received');
      }
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      this.validateRegistrationData(userData);
      
      const response = await apiService.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
        message: response.message || 'Registration successful'
      };
    } catch (error) {
      console.error('Registration service error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiService.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  async updateProfile(userData) {
    try {
      const response = await apiService.put('/auth/profile', userData);
      return {
        success: true,
        data: response.data,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  logout() {
    apiService.clearToken();
    // Clear any other stored data
    localStorage.removeItem('mkulimasoko_user');
  }

  isAuthenticated() {
    const token = apiService.getToken();
    if (!token) return false;

    // Basic token validation (in real app, decode and check expiry)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (error) {
      console.error('Token validation error:', error);
      this.logout();
      return false;
    }
  }

  getStoredUser() {
    try {
      const user = localStorage.getItem('mkulimasoko_user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  storeUser(user) {
    try {
      localStorage.setItem('mkulimasoko_user', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
    }
  }

  // Validation methods
  validateCredentials(credentials) {
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  }

  validateRegistrationData(userData) {
    const { name, email, password, userType } = userData;
    
    if (!name || !email || !password || !userType) {
      throw new Error('All fields are required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (!['farmer', 'buyer'].includes(userType)) {
      throw new Error('Invalid user type');
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new AuthService();