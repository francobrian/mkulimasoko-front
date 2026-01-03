import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaMapMarkerAlt, FaCreditCard, FaTruck, FaLock, FaCheckCircle } from 'react-icons/fa';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, calculateShipping, calculateTotalWithShipping } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    county: '',
    deliveryNotes: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'mpesa',
    mpesaNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }

    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
      return;
    }

    // Pre-fill shipping info with user data
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [isAuthenticated, cartItems, navigate, user, orderPlaced]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateShippingInfo = () => {
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'city', 'county'];
    for (const field of requiredFields) {
      if (!shippingInfo[field]?.trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const validatePaymentInfo = () => {
    if (paymentInfo.method === 'mpesa' && !paymentInfo.mpesaNumber) {
      alert('Please enter your M-Pesa number');
      return false;
    }
    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.cardExpiry || !paymentInfo.cardCVC) {
        alert('Please fill in all card details');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShippingInfo()) {
      setStep(2);
    } else if (step === 2 && validatePaymentInfo()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      const orderTotal = calculateTotalWithShipping();
      
      setOrderDetails({
        orderNumber,
        total: orderTotal,
        shippingAddress: shippingInfo.address,
        paymentMethod: paymentInfo.method,
        estimatedDelivery: '3-5 business days'
      });
      
      setOrderPlaced(true);
      clearCart();
      
      // In real app, you would save the order to the database
      
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => cartTotal;
  const calculateShippingCost = () => calculateShipping();
  const calculateTotal = () => calculateTotalWithShipping();

  if (orderPlaced && orderDetails) {
    return (
      <>
        <Helmet>
          <title>Order Confirmed - MkulimaSoko</title>
          <meta name="description" content="Your order has been placed successfully" />
        </Helmet>

        <div className="checkout-success">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h1>Order Confirmed!</h1>
              <p className="success-message">
                Thank you for your order. We've received it and will process it shortly.
              </p>
              
              <div className="order-summary-card">
                <h3>Order Details</h3>
                <div className="order-details">
                  <div className="detail-item">
                    <span>Order Number:</span>
                    <strong>{orderDetails.orderNumber}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Total Amount:</span>
                    <strong>KSh {orderDetails.total.toLocaleString()}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Payment Method:</span>
                    <strong>
                      {orderDetails.paymentMethod === 'mpesa' ? 'M-Pesa' : 
                       orderDetails.paymentMethod === 'card' ? 'Credit Card' : 
                       orderDetails.paymentMethod}
                    </strong>
                  </div>
                  <div className="detail-item">
                    <span>Shipping Address:</span>
                    <strong>{orderDetails.shippingAddress}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Estimated Delivery:</span>
                    <strong>{orderDetails.estimatedDelivery}</strong>
                  </div>
                </div>
              </div>
              
              <div className="success-actions">
                <button 
                  onClick={() => navigate('/orders')} 
                  className="btn-view-orders"
                >
                  View My Orders
                </button>
                <button 
                  onClick={() => navigate('/')} 
                  className="btn-continue-shopping"
                >
                  Continue Shopping
                </button>
              </div>
              
              <div className="whats-next">
                <h3>What's Next?</h3>
                <ul>
                  <li>You will receive an order confirmation email shortly</li>
                  <li>Our team will prepare your order for shipping</li>
                  <li>You will be notified when your order is shipped</li>
                  <li>Track your order from your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <p>Your cart is empty. Add some products to checkout.</p>
          <button onClick={() => navigate('/products')} className="btn-shopping">
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - MkulimaSoko</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>

      <div className="checkout-page">
        <div className="container">
          {/* Checkout Header */}
          <div className="checkout-header">
            <h1>Checkout</h1>
            <div className="checkout-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Shipping</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Payment</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Confirmation</div>
              </div>
            </div>
          </div>

          <div className="checkout-content">
            {/* Left Column - Forms */}
            <div className="checkout-left">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="checkout-step shipping-step">
                  <h2>
                    <FaMapMarkerAlt /> Shipping Information
                  </h2>
                  
                  <form className="shipping-form">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          required
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Address *</label>
                      <textarea
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                        rows="3"
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>County *</label>
                        <select
                          name="county"
                          value={shippingInfo.county}
                          onChange={handleShippingChange}
                          required
                        >
                          <option value="">Select County</option>
                          <option value="nairobi">Nairobi</option>
                          <option value="kiambu">Kiambu</option>
                          <option value="machakos">Machakos</option>
                          <option value="nakuru">Nakuru</option>
                          <option value="kisumu">Kisumu</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Delivery Notes (Optional)</label>
                      <textarea
                        name="deliveryNotes"
                        value={shippingInfo.deliveryNotes}
                        onChange={handleShippingChange}
                        rows="2"
                        placeholder="Any special instructions for delivery"
                      />
                    </div>
                    
                    <div className="delivery-options">
                      <h3>Delivery Options</h3>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          id="standard"
                          name="delivery"
                          defaultChecked
                        />
                        <label htmlFor="standard">
                          <div className="option-content">
                            <h4>Standard Delivery</h4>
                            <p>3-5 business days</p>
                            <span className="option-price">
                              {calculateShippingCost() === 0 ? 'FREE' : `KSh ${calculateShippingCost()}`}
                            </span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="delivery-option">
                        <input
                          type="radio"
                          id="express"
                          name="delivery"
                        />
                        <label htmlFor="express">
                          <div className="option-content">
                            <h4>Express Delivery</h4>
                            <p>Next business day</p>
                            <span className="option-price">KSh 500</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="checkout-step payment-step">
                  <h2>
                    <FaCreditCard /> Payment Method
                  </h2>
                  
                  <div className="payment-methods">
                    <div className="payment-method">
                      <input
                        type="radio"
                        id="mpesa"
                        name="paymentMethod"
                        value="mpesa"
                        checked={paymentInfo.method === 'mpesa'}
                        onChange={() => setPaymentInfo(prev => ({ ...prev, method: 'mpesa' }))}
                      />
                      <label htmlFor="mpesa">
                        <div className="method-content">
                          <div className="method-icon">M-Pesa</div>
                          <div className="method-info">
                            <h4>M-Pesa</h4>
                            <p>Pay instantly via M-Pesa</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {paymentInfo.method === 'mpesa' && (
                      <div className="mpesa-details">
                        <div className="form-group">
                          <label>M-Pesa Phone Number *</label>
                          <input
                            type="tel"
                            name="mpesaNumber"
                            value={paymentInfo.mpesaNumber}
                            onChange={handlePaymentChange}
                            required
                            placeholder="07XX XXX XXX"
                          />
                        </div>
                        <div className="mpesa-instructions">
                          <p>You will receive an M-Pesa prompt to complete payment</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="payment-method">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentInfo.method === 'card'}
                        onChange={() => setPaymentInfo(prev => ({ ...prev, method: 'card' }))}
                      />
                      <label htmlFor="card">
                        <div className="method-content">
                          <div className="method-icon">💳</div>
                          <div className="method-info">
                            <h4>Credit/Debit Card</h4>
                            <p>Pay with your card</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {paymentInfo.method === 'card' && (
                      <div className="card-details">
                        <div className="form-group">
                          <label>Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            required
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiry Date *</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={paymentInfo.cardExpiry}
                              onChange={handlePaymentChange}
                              required
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="form-group">
                            <label>CVC *</label>
                            <input
                              type="text"
                              name="cardCVC"
                              value={paymentInfo.cardCVC}
                              onChange={handlePaymentChange}
                              required
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="payment-method">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentInfo.method === 'cod'}
                        onChange={() => setPaymentInfo(prev => ({ ...prev, method: 'cod' }))}
                      />
                      <label htmlFor="cod">
                        <div className="method-content">
                          <div className="method-icon">💰</div>
                          <div className="method-info">
                            <h4>Cash on Delivery</h4>
                            <p>Pay when you receive your order</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="security-notice">
                    <FaLock />
                    <p>Your payment information is secure and encrypted</p>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="checkout-step review-step">
                  <h2>Review Your Order</h2>
                  
                  <div className="review-section">
                    <h3>Shipping Information</h3>
                    <div className="review-info">
                      <p><strong>Name:</strong> {shippingInfo.fullName}</p>
                      <p><strong>Phone:</strong> {shippingInfo.phone}</p>
                      <p><strong>Email:</strong> {shippingInfo.email}</p>
                      <p><strong>Address:</strong> {shippingInfo.address}</p>
                      <p><strong>City:</strong> {shippingInfo.city}</p>
                      <p><strong>County:</strong> {shippingInfo.county}</p>
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <div className="review-info">
                      <p>
                        <strong>Method:</strong> 
                        {paymentInfo.method === 'mpesa' ? 'M-Pesa' : 
                         paymentInfo.method === 'card' ? 'Credit Card' : 
                         'Cash on Delivery'}
                      </p>
                      {paymentInfo.method === 'mpesa' && (
                        <p><strong>M-Pesa Number:</strong> {paymentInfo.mpesaNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h3>Order Items</h3>
                    <div className="review-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="review-item">
                          <img src={item.images?.[0]} alt={item.name} />
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                          <div className="item-price">
                            KSh {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="terms-agreement">
                    <label>
                      <input type="checkbox" required />
                      <span>
                        I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="checkout-navigation">
                {step > 1 && (
                  <button 
                    onClick={handlePrevStep} 
                    className="btn-prev"
                  >
                    Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button 
                    onClick={handleNextStep} 
                    className="btn-next"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={handlePlaceOrder} 
                    className="btn-place-order"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="checkout-right">
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="summary-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>KSh {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>
                      {calculateShippingCost() === 0 ? 'FREE' : `KSh ${calculateShippingCost()}`}
                    </span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total</span>
                    <span>KSh {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="security-badge">
                  <FaLock />
                  <p>Secure checkout</p>
                </div>
                
                <div className="customer-support">
                  <h4>Need Help?</h4>
                  <p>Call us: +254 712 345 678</p>
                  <p>Email: support@mkulimasoko.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;