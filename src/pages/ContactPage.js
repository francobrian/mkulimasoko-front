import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MkulimaSoko</title>
        <meta name="description" content="Get in touch with MkulimaSoko for inquiries and support" />
      </Helmet>

      <div className="contact-page">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Get in Touch</h1>
              <p>We're here to help you with any questions or concerns</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="section-subtitle">
                Reach out to us through any of the following channels
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <FaPhone />
                  </div>
                  <div className="method-content">
                    <h3>Phone</h3>
                    <p>+254 712 345 678</p>
                    <p>+254 734 567 890</p>
                    <p className="method-note">Mon-Fri, 8AM-6PM</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FaEnvelope />
                  </div>
                  <div className="method-content">
                    <h3>Email</h3>
                    <p>info@mkulimasoko.com</p>
                    <p>support@mkulimasoko.com</p>
                    <p className="method-note">Response within 24 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="method-content">
                    <h3>Address</h3>
                    <p>123 Farm Road</p>
                    <p>Nairobi, Kenya</p>
                    <p className="method-note">Visit our headquarters</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FaClock />
                  </div>
                  <div className="method-content">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-contact">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="https://facebook.com/mkulimasoko" className="social-link facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebook /> Facebook
                  </a>
                  <a href="https://twitter.com/mkulimasoko" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter /> Twitter
                  </a>
                  <a href="https://instagram.com/mkulimasoko" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram /> Instagram
                  </a>
                  <a href="https://linkedin.com/company/mkulimasoko" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <p className="section-subtitle">
                Fill out the form below and we'll get back to you as soon as possible
              </p>

              {submitted && (
                <div className="success-message">
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your message here..."
                    rows="6"
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;