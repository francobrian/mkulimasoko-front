import { paymentAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Payment Service
class PaymentService {
  // Initiate payment
  static async initiatePayment(paymentData) {
    try {
      const response = await paymentAPI.initiatePayment(paymentData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to initiate payment'),
        data: null
      };
    }
  }

  // Verify payment
  static async verifyPayment(paymentId) {
    try {
      const response = await paymentAPI.verifyPayment(paymentId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to verify payment'),
        data: null
      };
    }
  }

  // Get payment methods
  static async getPaymentMethods() {
    try {
      const response = await paymentAPI.getPaymentMethods();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load payment methods'),
        data: []
      };
    }
  }

  // Get payment history
  static async getPaymentHistory(userId, params = {}) {
    try {
      const response = await paymentAPI.getPaymentHistory(userId, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load payment history'),
        data: [],
        total: 0
      };
    }
  }

  // Process mobile payment
  static async processMobilePayment(paymentData) {
    try {
      const response = await paymentAPI.processMobilePayment(paymentData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to process mobile payment'),
        data: null
      };
    }
  }
}

export default PaymentService;