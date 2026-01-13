import { weatherAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Weather Service
class WeatherService {
  // Get current weather
  static async getCurrent(location) {
    try {
      const response = await weatherAPI.getCurrent(location);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch current weather'),
        data: null
      };
    }
  }

  // Get weather forecast
  static async getForecast(location, days = 7) {
    try {
      const response = await weatherAPI.getForecast(location, days);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch weather forecast'),
        data: null
      };
    }
  }

  // Get weather alerts
  static async getAlerts(location) {
    try {
      const response = await weatherAPI.getAlerts(location);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch weather alerts'),
        data: null
      };
    }
  }

  // Get agricultural weather advice
  static async getAgriAdvice(location) {
    try {
      const response = await weatherAPI.getAgriAdvice(location);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch agricultural advice'),
        data: null
      };
    }
  }

  // Get weather history
  static async getHistory(location, days = 30) {
    try {
      const response = await weatherAPI.getHistory(location, days);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch weather history'),
        data: null
      };
    }
  }

  // Subscribe to weather alerts
  static async subscribeAlerts(alertData) {
    try {
      const response = await weatherAPI.subscribeAlerts(alertData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to subscribe to weather alerts'),
        data: null
      };
    }
  }

  // Unsubscribe from weather alerts
  static async unsubscribeAlerts(alertId) {
    try {
      const response = await weatherAPI.unsubscribeAlerts(alertId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to unsubscribe from weather alerts'),
        data: null
      };
    }
  }
}

export default WeatherService;