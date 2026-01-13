import { marketAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Market Service
class MarketService {
  // Get market prices
  static async getPrices(params = {}) {
    try {
      const response = await marketAPI.getPrices(params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch market prices'),
        data: null
      };
    }
  }

  // Get market trends for a commodity
  static async getTrends(commodity, period = '7d') {
    try {
      const response = await marketAPI.getTrends(commodity, period);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch market trends'),
        data: null
      };
    }
  }

  // Get market news
  static async getNews(params = {}) {
    try {
      const response = await marketAPI.getNews(params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch market news'),
        data: null
      };
    }
  }

  // Get prices by location
  static async getPricesByLocation(location, params = {}) {
    try {
      const response = await marketAPI.getPricesByLocation(location, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch location prices'),
        data: null
      };
    }
  }

  // Get market statistics
  static async getStatistics() {
    try {
      const response = await marketAPI.getStatistics();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to fetch market statistics'),
        data: null
      };
    }
  }

  // Subscribe to market alerts
  static async subscribeAlerts(alertData) {
    try {
      const response = await marketAPI.subscribeAlerts(alertData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to subscribe to alerts'),
        data: null
      };
    }
  }

  // Unsubscribe from market alerts
  static async unsubscribeAlerts(alertId) {
    try {
      const response = await marketAPI.unsubscribeAlerts(alertId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to unsubscribe from alerts'),
        data: null
      };
    }
  }
}

export default MarketService;