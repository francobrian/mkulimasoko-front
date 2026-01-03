import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaLock, FaBell, FaHistory, FaCreditCard, FaEdit } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderUpdates: true,
    promotional: false,
    productAlerts: true
  });
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser(formData);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password changed successfully!');
    } catch (error) {
      alert('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // In real app, upload to server
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="profile-error">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile - MkulimaSoko</title>
        <meta name="description" content="Manage your profile and account settings" />
      </Helmet>

      <div className="profile-page">
        <div className="container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                <div className="profile-avatar">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                  ) : (
                    <span>{user.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <label htmlFor="profile-image-upload" className="avatar-upload-btn">
                  <FaCamera />
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              </div>
              <div className="profile-info">
                <h1>{user.name}</h1>
                <p className="user-email">{user.email}</p>
                <div className="user-role">
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </div>
                <p className="member-since">
                  Member since {user.joined || '2023'}
                </p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">15</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">7</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">8</div>
                <div className="stat-label">Wishlist</div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            {/* Sidebar */}
            <div className="profile-sidebar">
              <nav className="profile-nav">
                <button
                  className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  <FaUser />
                  <span>Personal Info</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaLock />
                  <span>Security</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FaBell />
                  <span>Notifications</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <FaHistory />
                  <span>Order History</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment')}
                >
                  <FaCreditCard />
                  <span>Payment Methods</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="profile-main">
              {activeTab === 'personal' && (
                <div className="personal-info-tab">
                  <div className="tab-header">
                    <h2>Personal Information</h2>
                    <button
                      className="btn-edit-toggle"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? 'Cancel' : <><FaEdit /> Edit</>}
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="profile-form">
                    <div className="form-group">
                      <label>
                        <FaUser /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaEnvelope /> Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaPhone /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        placeholder="07XX XXX XXX"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaMapMarkerAlt /> Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        rows="3"
                        placeholder="Enter your full address"
                      />
                    </div>

                    <div className="form-group">
                      <label>Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        rows="4"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {editMode && (
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="btn-save"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="security-tab">
                  <div className="tab-header">
                    <h2>Security Settings</h2>
                  </div>

                  <form onSubmit={handleChangePassword} className="password-form">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="password-requirements">
                      <p>Password must contain:</p>
                      <ul>
                        <li>At least 6 characters</li>
                        <li>One uppercase letter</li>
                        <li>One number</li>
                      </ul>
                    </div>

                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn-change-password"
                        disabled={loading}
                      >
                        {loading ? 'Changing...' : 'Change Password'}
                      </button>
                    </div>
                  </form>

                  <div className="security-options">
                    <h3>Account Security</h3>
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-enable-2fa">
                        Enable
                      </button>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <h4>Login Sessions</h4>
                        <p>View and manage your active login sessions</p>
                      </div>
                      <button className="btn-view-sessions">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="notifications-tab">
                  <div className="tab-header">
                    <h2>Notification Preferences</h2>
                  </div>

                  <div className="notification-settings">
                    <div className="notification-category">
                      <h3>Email Notifications</h3>
                      <div className="notification-options">
                        <label className="notification-toggle">
                          <input
                            type="checkbox"
                            checked={notifications.emailUpdates}
                            onChange={() => handleNotificationToggle('emailUpdates')}
                          />
                          <span>Account updates</span>
                        </label>
                        <label className="notification-toggle">
                          <input
                            type="checkbox"
                            checked={notifications.orderUpdates}
                            onChange={() => handleNotificationToggle('orderUpdates')}
                          />
                          <span>Order updates</span>
                        </label>
                        <label className="notification-toggle">
                          <input
                            type="checkbox"
                            checked={notifications.promotional}
                            onChange={() => handleNotificationToggle('promotional')}
                          />
                          <span>Promotional offers</span>
                        </label>
                        <label className="notification-toggle">
                          <input
                            type="checkbox"
                            checked={notifications.productAlerts}
                            onChange={() => handleNotificationToggle('productAlerts')}
                          />
                          <span>Product alerts</span>
                        </label>
                      </div>
                    </div>

                    <div className="notification-category">
                      <h3>Push Notifications</h3>
                      <div className="notification-options">
                        <label className="notification-toggle">
                          <input type="checkbox" defaultChecked />
                          <span>Order status updates</span>
                        </label>
                        <label className="notification-toggle">
                          <input type="checkbox" defaultChecked />
                          <span>Price drop alerts</span>
                        </label>
                        <label className="notification-toggle">
                          <input type="checkbox" />
                          <span>New product alerts</span>
                        </label>
                      </div>
                    </div>

                    <div className="notification-actions">
                      <button className="btn-save-notifications">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-tab">
                  <div className="tab-header">
                    <h2>Order History</h2>
                  </div>
                  <div className="orders-history">
                    <p>View and manage your order history</p>
                    <a href="/orders" className="btn-view-orders">
                      View All Orders
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="payment-tab">
                  <div className="tab-header">
                    <h2>Payment Methods</h2>
                  </div>
                  <div className="payment-methods-list">
                    <div className="payment-method-card">
                      <div className="method-icon">M-Pesa</div>
                      <div className="method-info">
                        <h4>M-Pesa</h4>
                        <p>Phone: 0712 345 678</p>
                      </div>
                      <div className="method-actions">
                        <button className="btn-edit-method">Edit</button>
                        <button className="btn-remove-method">Remove</button>
                      </div>
                    </div>

                    <button className="btn-add-payment-method">
                      Add New Payment Method
                    </button>
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

export default ProfilePage;