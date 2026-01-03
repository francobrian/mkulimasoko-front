import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingBag, 
  FaHeart, 
  FaHistory, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaUser,
  FaBell,
  FaCog,
  FaStar,
  FaTruck,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        totalOrders: 15,
        totalSpent: 24500,
        wishlistItems: 8,
        pendingOrders: 2
      });

      setRecentOrders([
        {
          id: 'ORD-001234',
          date: '2024-01-15',
          total: 3200,
          status: 'delivered',
          items: 3
        },
        {
          id: 'ORD-001233',
          date: '2024-01-12',
          total: 1800,
          status: 'processing',
          items: 2
        }
      ]);

      setWishlist([
        {
          id: '1',
          name: 'Organic Avocados',
          price: 450,
          image: '/images/avocado.jpg'
        },
        {
          id: '2',
          name: 'Fresh Spinach',
          price: 150,
          image: '/images/spinach.jpg'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="buyer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="user-welcome">
            <p>Welcome back, <strong>{user?.name}</strong>!</p>
            <span className="member-since">Member since {user?.joined || '2023'}</span>
          </div>
        </div>

        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="dashboard-sidebar">
            <div className="user-profile-card">
              <div className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h3>{user?.name}</h3>
              <p className="user-email">{user?.email}</p>
              <div className="user-role">
                <FaUser />
                <span>Buyer Account</span>
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
              </button>
              <button
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <FaHeart />
                <span>Wishlist</span>
                <span className="badge">{wishlist.length}</span>
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
                    <div className="stat-icon pending">
                      <FaClock />
                    </div>
                    <div className="stat-info">
                      <h3>{stats?.pendingOrders}</h3>
                      <p>Pending Orders</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="recent-orders-card">
                  <div className="card-header">
                    <h3>Recent Orders</h3>
                    <Link to="/orders" className="view-all">View All</Link>
                  </div>
                  <div className="orders-list">
                    {recentOrders.map(order => (
                      <div key={order.id} className="order-item">
                        <div className="order-info">
                          <h4>{order.id}</h4>
                          <p className="order-date">{order.date}</p>
                          <p className="order-items">{order.items} items</p>
                        </div>
                        <div className="order-right">
                          <div className="order-total">KSh {order.total.toLocaleString()}</div>
                          {getStatusBadge(order.status)}
                          <Link to={`/orders/${order.id}`} className="view-order">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wishlist */}
                <div className="wishlist-card">
                  <div className="card-header">
                    <h3>My Wishlist</h3>
                    <Link to="/wishlist" className="view-all">View All</Link>
                  </div>
                  <div className="wishlist-items">
                    {wishlist.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p className="item-price">KSh {item.price.toLocaleString()}</p>
                        </div>
                        <button className="btn-add-to-cart">Add to Cart</button>
                        <button className="btn-remove">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-tab">
                <h2>My Orders</h2>
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
                          <td>{order.items}</td>
                          <td>KSh {order.total.toLocaleString()}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <Link to={`/orders/${order.id}`}>View</Link>
                            {order.status === 'pending' && (
                              <button className="btn-cancel">Cancel</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add other tabs content similarly... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;