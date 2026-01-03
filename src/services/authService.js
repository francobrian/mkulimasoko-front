import { authAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Authentication Service
class AuthService {
  // Register new user
  static async register(userData) {
    try {
      const response = await authAPI.register(userData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Registration failed'),
        data: null
      };
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      
      // Store token and user data
      if (response.data.token) {
        this.setAuthToken(response.data.token);
        this.setUserData(response.data.user);
      }
      
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Login failed'),
        data: null
      };
    }
  }

  // Logout user
  static logout() {
    this.clearAuthData();
  }

  // Get current user
  static getCurrentUser() {
    const userData = localStorage.getItem('mkulimasoko_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = this.getAuthToken();
    return !!token;
  }

  // Check if user has specific role
  static hasRole(role) {
    const user = this.getCurrentUser();
    return user && (user.roles?.includes(role) || user.role === role);
  }

  // Check if user has any of the specified roles
  static hasAnyRole(roles) {
    return roles.some(role => this.hasRole(role));
  }

  // Get auth token
  static getAuthToken() {
    return localStorage.getItem('mkulimasoko_token');
  }

  // Set auth token
  static setAuthToken(token) {
    localStorage.setItem('mkulimasoko_token', token);
  }

  // Set user data
  static setUserData(user) {
    localStorage.setItem('mkulimasoko_user', JSON.stringify(user));
  }

  // Clear auth data
  static clearAuthData() {
    localStorage.removeItem('mkulimasoko_token');
    localStorage.removeItem('mkulimasoko_user');
  }

  // Update user profile
  static async updateProfile(userId, profileData) {
    try {
      const response = await authAPI.updateProfile(userId, profileData);
      
      // Update local storage if successful
      if (response.data.user) {
        this.setUserData(response.data.user);
      }
      
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Profile update failed'),
        data: null
      };
    }
  }

  // Forgot password
  static async forgotPassword(email) {
    try {
      const response = await authAPI.forgotPassword(email);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Password reset request failed'),
        data: null
      };
    }
  }

  // Reset password
  static async resetPassword(token, newPassword) {
    try {
      const response = await authAPI.resetPassword(token, newPassword);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Password reset failed'),
        data: null
      };
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(userId, imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await authAPI.uploadProfilePicture(userId, formData);
      
      // Update local storage if successful
      if (response.data.user) {
        this.setUserData(response.data.user);
      }
      
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Profile picture upload failed'),
        data: null
      };
    }
  }

  // Get user profile
  static async getProfile(userId) {
    try {
      const response = await authAPI.getProfile(userId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load profile'),
        data: null
      };
    }
  }

  // Verify token
  static async verifyToken(token) {
    try {
      const response = await authAPI.verifyToken(token);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Token verification failed'),
        data: null
      };
    }
  }

  // Refresh token
  static async refreshToken(refreshToken) {
    try {
      const response = await authAPI.refreshToken(refreshToken);
      
      // Store new token if successful
      if (response.data.token) {
        this.setAuthToken(response.data.token);
      }
      
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Token refresh failed'),
        data: null
      };
    }
  }

  // Check session validity
  static async checkSession() {
    const token = this.getAuthToken();
    
    if (!token) {
      return {
        success: false,
        authenticated: false,
        message: 'No authentication token found'
      };
    }

    try {
      const result = await this.verifyToken(token);
      return {
        success: true,
        authenticated: result.success,
        user: result.data?.user || null
      };
    } catch (error) {
      return {
        success: false,
        authenticated: false,
        message: 'Session expired or invalid'
      };
    }
  }

  // Get user initials for avatar
  static getUserInitials() {
    const user = this.getCurrentUser();
    if (!user || !user.name) return 'U';
    
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  // Get user display name
  static getDisplayName() {
    const user = this.getCurrentUser();
    return user?.name || user?.username || 'User';
  }

  // Get user email
  static getEmail() {
    const user = this.getCurrentUser();
    return user?.email || '';
  }

  // Get user role
  static getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || user?.roles?.[0] || 'user';
  }

  // Check if user is farmer
  static isFarmer() {
    return this.hasAnyRole(['farmer', 'admin']);
  }

  // Check if user is buyer
  static isBuyer() {
    return this.hasAnyRole(['buyer', 'admin']);
  }

  // Check if user is admin
  static isAdmin() {
    return this.hasRole('admin');
  }
}

export default AuthService;