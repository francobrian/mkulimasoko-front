import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaTractor, 
  FaChartLine, 
  FaBox, 
  FaShoppingBag,
  FaMoneyBillWave,
  FaUsers,
  FaStar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBell
} from 'react-icons/fa';
import './FarmerDashboardPage.css';

const FarmerDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        totalProducts: 24,
        totalSales: 1560,
        totalRevenue: 385600,
        pendingOrders: 8,
        averageRating: 4.8,
        customers: 245
      });

      setProducts([
        {
          id: '1',
          name: 'Organic Tomatoes',
          price: 250,
          stock: 50,
          sold: 1560,
          status: 'active'
        },
        {
          id: '2',
          name: 'Fresh Kale',
          price: 120,
          stock: 35,
          sold: 890,
          status: 'active'
        }
      ]);

      setOrders([
        {
          id: 'ORD-001',
          customer: 'Mary Wanjiku',
          total: 3200,
          status: 'pending',
          date: '2024-01-15'
        },
        {
          id: 'ORD-002',
          customer: 'James Omondi',
          total: 1800,
          status: 'processing',
          date: '2024-01-14'
        }
      ]);

      setNotifications([
        {
          id: '1',
          title: 'New Order Received',
          message: 'Order #ORD-003 has been placed',
          time: '2 hours ago',
          read: false
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleAddProduct = () => {
    // Navigate to add product page
    window.location.href = '/farmer/products/add';
  };

  const handleViewAllProducts = () => {
    window.location.href = '/farmer/products';
  };

  const handleViewAllOrders = () => {
    window.location.href = '/farmer/orders';
  };

  if (loading) {
    return (
      <div className="loading-dashboard">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Farmer Dashboard - MkulimaSoko</title>
        <meta name="description" content="Farmer dashboard for managing products and orders" />
      </Helmet>

      <div className="farmer-dashboard-page">
        <div className="container">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome back, {user?.name || 'Farmer'}!</h1>
              <p>Manage your farm products and track your sales</p>
            </div>
            <div className="header-actions">
              <button className="btn-add-product" onClick={handleAddProduct}>
                <FaPlus /> Add New Product
              </button>
              <button className="btn-notifications">
                <FaBell />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-card revenue">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>
              <div className="stat-info">
                <h3>KSh {stats?.totalRevenue?.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div className="stat-card sales">
              <div className="stat-icon">
                <FaShoppingBag />
              </div>
              <div className="stat-info">
                <h3>{stats?.totalSales}</h3>
                <p>Total Sales</p>
              </div>
            </div>
            <div className="stat-card products">
              <div className="stat-icon">
                <FaBox />
              </div>
              <div className="stat-info">
                <h3>{stats?.totalProducts}</h3>
                <p>Products</p>
              </div>
            </div>
            <div className="stat-card customers">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-info">
                <h3>{stats?.customers}</h3>
                <p>Customers</p>
              </div>
            </div>
            <div className="stat-card rating">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-info">
                <h3>{stats?.averageRating}</h3>
                <p>Average Rating</p>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-info">
                <h3>{stats?.pendingOrders}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="dashboard-tabs">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button
                className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
              <button
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  {/* Recent Orders */}
                  <div className="card recent-orders">
                    <div className="card-header">
                      <h3>Recent Orders</h3>
                      <button onClick={handleViewAllOrders} className="view-all">
                        View All
                      </button>
                    </div>
                    <div className="orders-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.date}</td>
                              <td>KSh {order.total.toLocaleString()}</td>
                              <td>
                                <span className={`status-badge ${order.status}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <button className="btn-view-order">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Top Products */}
                  <div className="card top-products">
                    <div className="card-header">
                      <h3>Top Selling Products</h3>
                      <button onClick={handleViewAllProducts} className="view-all">
                        View All
                      </button>
                    </div>
                    <div className="products-list">
                      {products.map(product => (
                        <div key={product.id} className="product-item">
                          <div className="product-info">
                            <h4>{product.name}</h4>
                            <p className="price">KSh {product.price.toLocaleString()}</p>
                            <p className="stock">Stock: {product.stock} units</p>
                            <p className="sold">Sold: {product.sold} units</p>
                          </div>
                          <div className="product-actions">
                            <button className="btn-edit">
                              <FaEdit />
                            </button>
                            <button className="btn-delete">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="card quick-stats">
                    <h3>Quick Statistics</h3>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-label">Today's Sales</div>
                        <div className="stat-value">KSh 12,500</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">This Week</div>
                        <div className="stat-value">KSh 45,800</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">This Month</div>
                        <div className="stat-value">KSh 156,300</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Growth Rate</div>
                        <div className="stat-value positive">+15%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="products-tab">
                  <div className="products-header">
                    <h2>My Products</h2>
                    <button className="btn-add-product" onClick={handleAddProduct}>
                      <FaPlus /> Add New Product
                    </button>
                  </div>
                  <div className="products-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>
                              <div className="product-cell">
                                <img 
                                  src="/images/tomatoes1.jpg" 
                                  alt={product.name}
                                  className="product-thumb"
                                />
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td>Vegetables</td>
                            <td>KSh {product.price.toLocaleString()}</td>
                            <td>{product.stock} units</td>
                            <td>
                              <span className={`status-badge ${product.status}`}>
                                {product.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-edit">
                                  <FaEdit />
                                </button>
                                <button className="btn-delete">
                                  <FaTrash />
                                </button>
                                <button className="btn-view">
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-tab">
                  <div className="orders-header">
                    <h2>Order Management</h2>
                    <div className="order-filters">
                      <select>
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="orders-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>3 items</td>
                            <td>KSh {order.total.toLocaleString()}</td>
                            <td>
                              <select className="status-select" defaultValue={order.status}>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td>{order.date}</td>
                            <td>
                              <button className="btn-view-order">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="analytics-tab">
                  <div className="analytics-header">
                    <h2>Sales Analytics</h2>
                    <div className="period-selector">
                      <select>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="charts-grid">
                    <div className="chart-card">
                      <h4>Revenue Overview</h4>
                      <div className="chart-placeholder">
                        <p>Chart would appear here</p>
                      </div>
                    </div>
                    <div className="chart-card">
                      <h4>Top Products</h4>
                      <div className="chart-placeholder">
                        <p>Chart would appear here</p>
                      </div>
                    </div>
                    <div className="chart-card">
                      <h4>Customer Growth</h4>
                      <div className="chart-placeholder">
                        <p>Chart would appear here</p>
                      </div>
                    </div>
                    <div className="chart-card">
                      <h4>Order Trends</h4>
                      <div className="chart-placeholder">
                        <p>Chart would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="profile-tab">
                  <div className="profile-header">
                    <h2>Farm Profile</h2>
                    <button className="btn-edit-profile">Edit Profile</button>
                  </div>
                  <div className="profile-content">
                    <div className="profile-info">
                      <div className="info-section">
                        <h4>Farm Information</h4>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>Farm Name</label>
                            <p>Kamau Organic Farm</p>
                          </div>
                          <div className="info-item">
                            <label>Location</label>
                            <p>Kiambu County, Kenya</p>
                          </div>
                          <div className="info-item">
                            <label>Phone</label>
                            <p>+254 712 345 678</p>
                          </div>
                          <div className="info-item">
                            <label>Email</label>
                            <p>john@kamaufarm.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="info-section">
                        <h4>Farm Description</h4>
                        <p>
                          A family-owned organic farm specializing in fresh vegetables and fruits. 
                          Committed to sustainable farming practices.
                        </p>
                      </div>

                      <div className="info-section">
                        <h4>Certifications</h4>
                        <div className="certifications-list">
                          <span className="certification-badge">Organic Certified</span>
                          <span className="certification-badge">Sustainable Farming</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`activity-item ${notification.read ? 'read' : 'unread'}`}>
                  <div className="activity-icon">
                    <FaBell />
                  </div>
                  <div className="activity-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="activity-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerDashboardPage;