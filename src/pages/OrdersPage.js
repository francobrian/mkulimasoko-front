import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaSearch, FaFilter, FaDownload, FaPrint, FaEye, FaTimes, FaCheckCircle, FaTruck } from 'react-icons/fa';
import './OrdersPage.css';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading orders
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001234',
          date: '2024-01-15',
          customer: user?.name || 'John Doe',
          items: 3,
          total: 3200,
          status: 'delivered',
          paymentMethod: 'M-Pesa',
          deliveryAddress: '123 Main Street, Nairobi',
          trackingNumber: 'TRK-789456',
          estimatedDelivery: '2024-01-18',
          farmer: 'Kamau Organic Farm'
        },
        {
          id: 'ORD-001233',
          date: '2024-01-12',
          customer: user?.name || 'John Doe',
          items: 2,
          total: 1800,
          status: 'processing',
          paymentMethod: 'M-Pesa',
          deliveryAddress: '456 Business Avenue',
          trackingNumber: null,
          estimatedDelivery: '2024-01-16',
          farmer: 'Green Valley Farm'
        },
        {
          id: 'ORD-001232',
          date: '2024-01-10',
          customer: user?.name || 'John Doe',
          items: 1,
          total: 450,
          status: 'shipped',
          paymentMethod: 'Cash on Delivery',
          deliveryAddress: '789 Home Lane',
          trackingNumber: 'TRK-123456',
          estimatedDelivery: '2024-01-14',
          farmer: 'Fresh Harvest Farm'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { class: 'pending', text: 'Pending' },
      'processing': { class: 'processing', text: 'Processing' },
      'shipped': { class: 'shipped', text: 'Shipped' },
      'delivered': { class: 'delivered', text: 'Delivered' },
      'cancelled': { class: 'cancelled', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { class: 'pending', text: 'Pending' };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      alert('Order cancelled successfully');
    }
  };

  const handleReorder = (order) => {
    // Logic to reorder
    alert(`Reorder functionality for ${order.id} would be implemented here`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getTotalOrdersValue = () => {
    return filteredOrders.reduce((total, order) => total + order.total, 0);
  };

  const getOrderCountByStatus = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders - MkulimaSoko</title>
        <meta name="description" content="View and manage your orders" />
      </Helmet>

      <div className="orders-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-left">
              <h1>My Orders</h1>
              <p>Track and manage all your purchases</p>
            </div>
            <div className="header-actions">
              <button className="btn-print" onClick={() => window.print()}>
                <FaPrint /> Print
              </button>
              <button className="btn-export">
                <FaDownload /> Export
              </button>
            </div>
          </div>

          {/* Orders Summary */}
          <div className="orders-summary">
            <div className="summary-card">
              <div className="summary-icon total">
                <FaEye />
              </div>
              <div className="summary-content">
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon pending">
                <FaTimes />
              </div>
              <div className="summary-content">
                <h3>{getOrderCountByStatus('pending')}</h3>
                <p>Pending</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon processing">
                <FaTruck />
              </div>
              <div className="summary-content">
                <h3>{getOrderCountByStatus('processing')}</h3>
                <p>Processing</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon delivered">
                <FaCheckCircle />
              </div>
              <div className="summary-content">
                <h3>{getOrderCountByStatus('delivered')}</h3>
                <p>Delivered</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon value">
                <FaFilter />
              </div>
              <div className="summary-content">
                <h3>KSh {getTotalOrdersValue().toLocaleString()}</h3>
                <p>Total Value</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="orders-toolbar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders by ID or farmer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-actions">
              <button 
                className="btn-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filter
              </button>
              <select 
                className="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-inputs">
                  <input type="date" />
                  <span>to</span>
                  <input type="date" />
                </div>
              </div>
              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-inputs">
                  <input type="number" placeholder="Min" />
                  <span>to</span>
                  <input type="number" placeholder="Max" />
                </div>
              </div>
              <div className="filter-group">
                <label>Farmer</label>
                <select>
                  <option value="all">All Farmers</option>
                  <option value="kamau">Kamau Organic Farm</option>
                  <option value="green">Green Valley Farm</option>
                </select>
              </div>
              <button className="btn-apply-filters">Apply Filters</button>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="bulk-actions">
              <div className="bulk-info">
                <span>{selectedOrders.length} order(s) selected</span>
              </div>
              <div className="bulk-buttons">
                <button className="btn-bulk-cancel">
                  Cancel Selected
                </button>
                <button className="btn-bulk-export">
                  Export Selected
                </button>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.length === filteredOrders.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Farmer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className={selectedOrders.includes(order.id) ? 'selected' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td>
                      <div className="order-id-cell">
                        <strong>{order.id}</strong>
                        {order.trackingNumber && (
                          <small>Tracking: {order.trackingNumber}</small>
                        )}
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{order.farmer}</td>
                    <td>{order.items} item(s)</td>
                    <td>
                      <div className="order-total-cell">
                        <strong>KSh {order.total.toLocaleString()}</strong>
                        <small>{order.paymentMethod}</small>
                      </div>
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      <div className="order-actions">
                        <button className="btn-view-order">
                          <FaEye /> View
                        </button>
                        {order.status === 'pending' && (
                          <button 
                            className="btn-cancel-order"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button 
                            className="btn-reorder"
                            onClick={() => handleReorder(order)}
                          >
                            Reorder
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Orders Message */}
          {filteredOrders.length === 0 && (
            <div className="no-orders-message">
              <div className="empty-icon">
                <FaEye />
              </div>
              <h3>No orders found</h3>
              <p>
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t placed any orders yet'
                }
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <a href="/products" className="btn-start-shopping">
                  Start Shopping
                </a>
              )}
            </div>
          )}

          {/* Order Details Modal would go here */}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;