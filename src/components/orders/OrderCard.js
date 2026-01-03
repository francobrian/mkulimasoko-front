import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="icon delivered" />;
      case 'shipped':
        return <FaTruck className="icon shipped" />;
      case 'processing':
        return <FaClock className="icon processing" />;
      case 'cancelled':
        return <FaTimesCircle className="icon cancelled" />;
      default:
        return <FaClock className="icon pending" />;
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || 'Pending';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-id">
          <h3>Order #{order.id}</h3>
          <span className="order-date">Placed on {formatDate(order.date)}</span>
        </div>
        <div className="order-status">
          {getStatusIcon(order.status)}
          <span className={`status-text ${order.status}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="order-items">
        {order.items.slice(0, 3).map((item, index) => (
          <div key={index} className="order-item">
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.target.src = '/images/placeholder-product.jpg';
              }}
            />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-quantity">Quantity: {item.quantity}</p>
              <p className="item-price">KSh {item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
        {order.items.length > 3 && (
          <div className="more-items">
            +{order.items.length - 3} more items
          </div>
        )}
      </div>

      <div className="order-footer">
        <div className="order-total">
          <span>Total Amount:</span>
          <strong>KSh {order.total.toLocaleString()}</strong>
        </div>
        <div className="order-actions">
          <Link to={`/orders/${order.id}`} className="btn-view-order">
            View Details
          </Link>
          {order.status === 'pending' && (
            <button className="btn-cancel-order">
              Cancel Order
            </button>
          )}
          {order.status === 'delivered' && (
            <button className="btn-reorder">
              Reorder
            </button>
          )}
          {order.status === 'delivered' && !order.reviewed && (
            <button className="btn-review">
              Write Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;