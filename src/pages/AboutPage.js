import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaLeaf, FaUsers, FaHandshake, FaAward } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - MkulimaSoko</title>
        <meta name="description" content="Learn about MkulimaSoko's mission to connect farmers and buyers" />
      </Helmet>

      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="container">
            <div className="hero-content">
              <h1>About MkulimaSoko</h1>
              <p>Connecting farmers and buyers for a sustainable agricultural future</p>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Mission Section */}
          <div className="about-section">
            <div className="section-content">
              <h2>Our Mission</h2>
              <p>
                MkulimaSoko is dedicated to revolutionizing the agricultural marketplace by creating
                direct connections between farmers and consumers. We believe in fair trade, sustainable
                farming practices, and supporting local communities.
              </p>
              <p>
                Our platform empowers farmers to reach wider markets while providing consumers with
                fresh, locally-sourced produce at competitive prices.
              </p>
            </div>
            <div className="section-image">
              <FaLeaf className="mission-icon" />
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h3>Community</h3>
                <p>
                  We foster strong relationships between farmers, buyers, and local communities,
                  creating a supportive ecosystem for agricultural growth.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FaHandshake />
                </div>
                <h3>Integrity</h3>
                <p>
                  We maintain transparency and honesty in all our dealings, ensuring fair prices
                  and quality products for everyone involved.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FaAward />
                </div>
                <h3>Quality</h3>
                <p>
                  We are committed to promoting high-quality, sustainable agricultural products
                  that meet the highest standards of excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="story-section">
            <h2>Our Story</h2>
            <div className="story-content">
              <div className="story-text">
                <p>
                  Founded in 2020, MkulimaSoko emerged from a simple observation: farmers were
                  struggling to sell their produce at fair prices, while consumers were paying
                  premium prices for imported goods that lacked freshness and quality.
                </p>
                <p>
                  Our founders, a group of agricultural experts and technology enthusiasts,
                  recognized the potential of digital platforms to bridge this gap. Today,
                  MkulimaSoko serves thousands of farmers and consumers across Kenya,
                  contributing to food security and economic growth.
                </p>
              </div>
              <div className="story-stats">
                <div className="stat">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Registered Farmers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Product Categories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate individuals driving our mission forward
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <span>JD</span>
                </div>
                <h3>John Doe</h3>
                <p>CEO & Co-founder</p>
              </div>

              <div className="team-member">
                <div className="member-avatar">
                  <span>JS</span>
                </div>
                <h3>Jane Smith</h3>
                <p>CTO & Co-founder</p>
              </div>

              <div className="team-member">
                <div className="member-avatar">
                  <span>MK</span>
                </div>
                <h3>Mike Johnson</h3>
                <p>Head of Operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;