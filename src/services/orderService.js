import { orderAPI, paymentAPI } from './api';
import { handleApiError, formatResponse } from './api';

// Order Service
class OrderService {
  // Get all orders
  static async getAllOrders(params = {}) {
    try {
      const response = await orderAPI.getAll(params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load orders'),
        data: [],
        total: 0
      };
    }
  }

  // Get order by ID
  static async getOrderById(orderId) {
    try {
      const response = await orderAPI.getById(orderId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load order details'),
        data: null
      };
    }
  }

  // Get orders by user
  static async getOrdersByUser(userId, params = {}) {
    try {
      const response = await orderAPI.getByUser(userId, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load your orders'),
        data: [],
        total: 0
      };
    }
  }

  // Get orders by farmer
  static async getOrdersByFarmer(farmerId, params = {}) {
    try {
      const response = await orderAPI.getByFarmer(farmerId, params);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load farmer orders'),
        data: [],
        total: 0
      };
    }
  }

  // Create new order
  static async createOrder(orderData) {
    try {
      const response = await orderAPI.create(orderData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to create order'),
        data: null
      };
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, status) {
    try {
      const response = await orderAPI.updateStatus(orderId, status);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to update order status'),
        data: null
      };
    }
  }

  // Cancel order
  static async cancelOrder(orderId) {
    try {
      const response = await orderAPI.cancel(orderId);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to cancel order'),
        data: null
      };
    }
  }

  // Get order statistics
  static async getOrderStatistics() {
    try {
      const response = await orderAPI.getStatistics();
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load order statistics'),
        data: {}
      };
    }
  }

  // Get recent orders
  static async getRecentOrders(limit = 10) {
    try {
      const response = await orderAPI.getRecent(limit);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Failed to load recent orders'),
        data: []
      };
    }
  }

  // Initiate payment
  static async initiatePayment(paymentData) {
    try {
      const response = await paymentAPI.initiatePayment(paymentData);
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, 'Payment initiation failed'),
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
        error: handleApiError(error, 'Payment verification failed'),
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
        data: []
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
        error: handleApiError(error, 'Mobile payment processing failed'),
        data: null
      };
    }
  }

  // Format order number
  static formatOrderNumber(orderId) {
    return `ORD-${orderId.toString().padStart(8, '0')}`;
  }

  // Format order date
  static formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Calculate order total
  static calculateOrderTotal(items, shipping = 0) {
    const subtotal = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    return subtotal + shipping;
  }

  // Get order status badge color
  static getStatusColor(status) {
    const statusColors = {
      'pending': 'warning',
      'processing': 'info',
      'confirmed': 'primary',
      'shipped': 'secondary',
      'delivered': 'success',
      'cancelled': 'danger',
      'refunded': 'dark'
    };
    
    return statusColors[status] || 'secondary';
  }

  // Get order status label
  static getStatusLabel(status) {
    const statusLabels = {
      'pending': 'Pending',
      'processing': 'Processing',
      'confirmed': 'Confirmed',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
      'refunded': 'Refunded'
    };
    
    return statusLabels[status] || 'Unknown';
  }

  // Check if order can be cancelled
  static canCancelOrder(status) {
    const cancellableStatuses = ['pending', 'processing', 'confirmed'];
    return cancellableStatuses.includes(status);
  }

  // Check if order can be rated
  static canRateOrder(status) {
    return status === 'delivered';
  }

  // Generate invoice data
  static generateInvoice(order) {
    const invoice = {
      invoiceNumber: this.formatOrderNumber(order.id),
      invoiceDate: this.formatOrderDate(order.createdAt),
      customerName: order.customer?.name || 'Customer',
      customerEmail: order.customer?.email || '',
      customerPhone: order.customer?.phone || '',
      shippingAddress: order.shippingAddress,
      items: order.items,
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      tax: order.tax || 0,
      total: order.total || 0,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.status
    };
    
    return invoice;
  }

  // Validate order data
  static validateOrderData(orderData) {
    const errors = {};
    
    if (!orderData.items || orderData.items.length === 0) {
      errors.items = 'Order must contain at least one item';
    }
    
    if (!orderData.shippingAddress) {
      errors.shippingAddress = 'Shipping address is required';
    }
    
    if (!orderData.paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Calculate estimated delivery date
  static calculateDeliveryDate(orderDate) {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 3); // Default 3-day delivery
    return date;
  }

  // Format delivery date range
  static formatDeliveryRange(orderDate) {
    const startDate = new Date(orderDate);
    startDate.setDate(startDate.getDate() + 2);
    
    const endDate = new Date(orderDate);
    endDate.setDate(endDate.getDate() + 5);
    
    const format = (date) => date.toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric'
    });
    
    return `${format(startDate)} - ${format(endDate)}`;
  }
}

export default OrderService;