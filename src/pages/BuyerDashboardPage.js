import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaUser, 
  FaShoppingBag, 
  FaHeart, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaStar,
  FaBell,
  FaCog,
  FaHistory,
  FaTruck,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import './BuyerDashboardPage.css';

const BuyerDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        totalOrders: 15,
        totalSpent: 24500,
        wishlistItems: 8,
        pendingOrders: 2,
        completedOrders: 13,
        reviewsWritten: 7
      });

      setRecentOrders([
        {
          id: 'ORD-001234',
          date: '2024-01-15',
          total: 3200,
          status: 'delivered',
          items: 3,
          trackingNumber: 'TRK-789456'
        },
        {
          id: 'ORD-001233',
          date: '2024-01-12',
          total: 1800,
          status: 'processing',
          items: 2,
          trackingNumber: null
        }
      ]);

      setWishlist([
        {
          id: '1',
          name: 'Organic Avocados',
          price: 450,
          image: '/images/avocado.jpg',
          farmer: 'Kamau Organic Farm'
        },
        {
          id: '2',
          name: 'Fresh Spinach',
          price: 150,
          image: '/images/spinach.jpg',
          farmer: 'Green Valley Farm'
        }
      ]);

      setAddresses([
        {
          id: '1',
          type: 'home',
          name: 'Home Address',
          address: '123 Main Street, Nairobi',
          isDefault: true
        },
        {
          id: '2',
          type: 'work',
          name: 'Work Address',
          address: '456 Business Avenue, Westlands',
          isDefault: false
        }
      ]);

      setNotifications([
        {
          id: '1',
          title: 'Order Delivered',
          message: 'Your order #ORD-001234 has been delivered',
          time: '2 days ago',
          read: false
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { class: 'pending', text: 'Pending', icon: <FaClock /> },
      'processing': { class: 'processing', text: 'Processing', icon: <FaClock /> },
      'shipped': { class: 'shipped', text: 'Shipped', icon: <FaTruck /> },
      'delivered': { class: 'delivered', text: 'Delivered', icon: <FaCheckCircle /> },
      'cancelled': { class: 'cancelled', text: 'Cancelled', icon: <FaClock /> }
    };
    
    const config = statusConfig[status] || { class: 'pending', text: 'Pending', icon: <FaClock /> };
    return (
      <span className={`status-badge ${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleMarkNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  if (loading) {
    return (
      <div className="loading-dashboard">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Buyer Dashboard - MkulimaSoko</title>
        <meta name="description" content="Your personal dashboard for managing orders and profile" />
      </Helmet>

      <div className="buyer-dashboard-page">
        <div className="container">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome back, {user?.name || 'Customer'}!</h1>
              <p>Manage your account, track orders, and more</p>
            </div>
            <div className="header-actions">
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

          <div className="dashboard-layout">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
              <div className="user-profile-card">
                <div className="user-avatar">
                  {user?.name?.charAt(0) || 'C'}
                </div>
                <h3>{user?.name}</h3>
                <p className="user-email">{user?.email}</p>
                <div className="user-role">
                  <FaUser />
                  <span>Buyer Account</span>
                </div>
                <div className="member-since">
                  Member since {user?.joined || '2023'}
                </div>
              </div>

              <nav className="dashboard-nav">
                <button
                  className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FaUser />
                  <span>Overview</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingBag />
                  <span>My Orders</span>
                  {stats?.pendingOrders > 0 && (
                    <span className="nav-badge">{stats.pendingOrders}</span>
                  )}
                </button>
                <button
                  className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <FaHeart />
                  <span>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="nav-badge">{wishlist.length}</span>
                  )}
                </button>
                <button
                  className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <FaMapMarkerAlt />
                  <span>Addresses</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payments')}
                >
                  <FaCreditCard />
                  <span>Payment Methods</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  <FaStar />
                  <span>My Reviews</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FaBell />
                  <span>Notifications</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="nav-badge">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <button
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FaCog />
                  <span>Account Settings</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  {/* Stats Cards */}
                  <div className="stats-cards">
                    <div className="stat-card">
                      <div className="stat-icon orders">
                        <FaShoppingBag />
                      </div>
                      <div className="stat-info">
                        <h3>{stats?.totalOrders}</h3>
                        <p>Total Orders</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon spent">
                        <FaCreditCard />
                      </div>
                      <div className="stat-info">
                        <h3>KSh {stats?.totalSpent?.toLocaleString()}</h3>
                        <p>Total Spent</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon wishlist">
                        <FaHeart />
                      </div>
                      <div className="stat-info">
                        <h3>{stats?.wishlistItems}</h3>
                        <p>Wishlist Items</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon reviews">
                        <FaStar />
                      </div>
                      <div className="stat-info">
                        <h3>{stats?.reviewsWritten}</h3>
                        <p>Reviews Written</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="recent-orders-card">
                    <div className="card-header">
                      <h3>Recent Orders</h3>
                      <a href="/orders" className="view-all">View All</a>
                    </div>
                    <div className="orders-list">
                      {recentOrders.map(order => (
                        <div key={order.id} className="order-item">
                          <div className="order-info">
                            <h4>{order.id}</h4>
                            <p className="order-date">{order.date}</p>
                            <p className="order-items">{order.items} items</p>
                            {order.trackingNumber && (
                              <p className="tracking-number">
                                Tracking: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                          <div className="order-right">
                            <div className="order-total">
                              KSh {order.total.toLocaleString()}
                            </div>
                            {getStatusBadge(order.status)}
                            <a href={`/orders/${order.id}`} className="view-order">
                              View Details
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wishlist Preview */}
                  <div className="wishlist-preview-card">
                    <div className="card-header">
                      <h3>My Wishlist</h3>
                      <a href="/wishlist" className="view-all">View All</a>
                    </div>
                    <div className="wishlist-items">
                      {wishlist.slice(0, 3).map(item => (
                        <div key={item.id} className="wishlist-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p className="farmer-name">By {item.farmer}</p>
                            <p className="item-price">KSh {item.price.toLocaleString()}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-add-to-cart">
                              Add to Cart
                            </button>
                            <button 
                              className="btn-remove"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-tab">
                  <div className="orders-header">
                    <h2>My Orders</h2>
                    <div className="order-filters">
                      <select>
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                  <div className="orders-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.items} items</td>
                            <td>KSh {order.total.toLocaleString()}</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>
                              <div className="order-actions">
                                <a href={`/orders/${order.id}`} className="btn-view">
                                  View
                                </a>
                                {order.status === 'pending' && (
                                  <button className="btn-cancel">Cancel</button>
                                )}
                                {order.status === 'delivered' && (
                                  <button className="btn-review">Review</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-tab">
                  <div className="wishlist-header">
                    <h2>My Wishlist</h2>
                    <p>{wishlist.length} items saved for later</p>
                  </div>
                  <div className="wishlist-grid">
                    {wishlist.map(item => (
                      <div key={item.id} className="wishlist-item-card">
                        <img src={item.image} alt={item.name} />
                        <div className="item-content">
                          <h4>{item.name}</h4>
                          <p className="farmer">By {item.farmer}</p>
                          <p className="price">KSh {item.price.toLocaleString()}</p>
                          <div className="item-actions">
                            <button className="btn-add-to-cart">
                              Add to Cart
                            </button>
                            <button 
                              className="btn-remove"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="addresses-tab">
                  <div className="addresses-header">
                    <h2>My Addresses</h2>
                    <button className="btn-add-address">
                      Add New Address
                    </button>
                  </div>
                  <div className="addresses-grid">
                    {addresses.map(address => (
                      <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                        <div className="address-header">
                          <div className="address-type">
                            {address.type === 'home' ? '🏠' : '🏢'}
                            <span>{address.name}</span>
                          </div>
                          {address.isDefault && (
                            <span className="default-badge">Default</span>
                          )}
                        </div>
                        <p className="address-text">{address.address}</p>
                        <div className="address-actions">
                          <button className="btn-edit">Edit</button>
                          <button className="btn-delete">Delete</button>
                          {!address.isDefault && (
                            <button className="btn-set-default">
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="notifications-tab">
                  <div className="notifications-header">
                    <h2>Notifications</h2>
                    <button className="btn-mark-all-read">
                      Mark All as Read
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                        <div className="notification-icon">
                          <FaBell />
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">
                            {notification.time}
                          </span>
                        </div>
                        <div className="notification-actions">
                          {!notification.read && (
                            <button 
                              className="btn-mark-read"
                              onClick={() => handleMarkNotificationAsRead(notification.id)}
                            >
                              Mark as Read
                            </button>
                          )}
                          <button className="btn-delete-notification">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="settings-tab">
                  <h2>Account Settings</h2>
                  <div className="settings-sections">
                    <div className="settings-section">
                      <h3>Personal Information</h3>
                      <form className="settings-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input type="text" defaultValue={user?.name || ''} />
                        </div>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input type="email" defaultValue={user?.email || ''} />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input type="tel" defaultValue="0712345678" />
                        </div>
                        <button type="submit" className="btn-save">
                          Save Changes
                        </button>
                      </form>
                    </div>

                    <div className="settings-section">
                      <h3>Change Password</h3>
                      <form className="password-form">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input type="password" />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input type="password" />
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input type="password" />
                        </div>
                        <button type="submit" className="btn-change-password">
                          Change Password
                        </button>
                      </form>
                    </div>

                    <div className="settings-section">
                      <h3>Notification Preferences</h3>
                      <div className="notification-preferences">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Order updates</span>
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Promotional offers</span>
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>New product alerts</span>
                        </label>
                        <button className="btn-save-preferences">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboardPage;