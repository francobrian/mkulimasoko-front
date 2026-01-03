import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import './CartPage.css';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal,
    itemCount,
    calculateShipping,
    calculateTotalWithShipping
  } = useCart();
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Mock coupon validation
    const validCoupons = {
      'FRESH10': 0.1, // 10% off
      'MKS20': 0.2,   // 20% off
      'WELCOME5': 0.05 // 5% off
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: validCoupons[couponCode.toUpperCase()]
      });
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return cartTotal * appliedCoupon.discount;
  };

  const getSubtotal = () => cartTotal;
  const getShipping = () => calculateShipping();
  const getDiscount = () => calculateDiscount();
  const getTotal = () => {
    return calculateTotalWithShipping() - getDiscount();
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart - MkulimaSoko</title>
          <meta name="description" content="Your shopping cart" />
        </Helmet>

        <div className="cart-page empty-cart">
          <div className="container">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">
                <FaShoppingBag />
              </div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any products to your cart yet.</p>
              <Link to="/products" className="btn-shopping">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart ({itemCount} items) - MkulimaSoko</title>
        <meta name="description" content="Your shopping cart" />
      </Helmet>

      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <div className="column product">Product</div>
                <div className="column price">Price</div>
                <div className="column quantity">Quantity</div>
                <div className="column total">Total</div>
                <div className="column actions">Actions</div>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="column product">
                      <div className="product-info">
                        <img 
                          src={item.images?.[0] || '/images/placeholder-product.jpg'} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = '/images/placeholder-product.jpg';
                          }}
                        />
                        <div className="product-details">
                          <h4>{item.name}</h4>
                          <p className="category">{item.category}</p>
                          {item.farmer && (
                            <p className="farmer">By {item.farmer.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="column price">
                      <div className="price-amount">
                        KSh {item.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="column quantity">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            updateQuantity(item.id, value);
                          }}
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="column total">
                      <div className="total-amount">
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <div className="column actions">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="btn-remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-actions">
                <button onClick={clearCart} className="btn-clear-cart">
                  Clear Cart
                </button>
                <Link to="/products" className="btn-continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary-card">
                <h3>Order Summary</h3>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>KSh {getSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>
                      {getShipping() === 0 ? 'FREE' : `KSh ${getShipping().toLocaleString()}`}
                    </span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="summary-row discount">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>- KSh {getDiscount().toLocaleString()}</span>
                    </div>
                  )}

                  <div className="summary-row total">
                    <span>Total</span>
                    <span>KSh {getTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="coupon-section">
                  <h4>Have a coupon code?</h4>
                  <div className="coupon-input">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="coupon-error">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="coupon-success">
                      Coupon {appliedCoupon.code} applied successfully!
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  className="btn-checkout"
                >
                  Proceed to Checkout <FaArrowRight />
                </button>

                {/* Security Info */}
                <div className="security-info">
                  <p>
                    <span className="secure-icon">🔒</span>
                    Secure checkout. Your information is safe with us.
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods">
                  <h4>We Accept</h4>
                  <div className="method-icons">
                    <span className="method mpesa">M-Pesa</span>
                    <span className="method visa">Visa</span>
                    <span className="method mastercard">MasterCard</span>
                    <span className="method cash">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              {/* Cart Tips */}
              <div className="cart-tips">
                <h4>Cart Tips</h4>
                <ul>
                  <li>Free shipping on orders over KSh 2,000</li>
                  <li>Orders are processed within 24 hours</li>
                  <li>Freshness guaranteed on all produce</li>
                  <li>Easy returns within 7 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;