import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChartLine, FaBell, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import MarketService from '../services/marketService';
import './MarketPage.css';

const MarketPage = () => {
  const [prices, setPrices] = useState([]);
  const [news, setNews] = useState([]);
  const [trends, setTrends] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCommodity, setSelectedCommodity] = useState('maize');
  const [location, setLocation] = useState('nairobi');
  const [alertEmail, setAlertEmail] = useState('');

  const loadMarketData = useCallback(async () => {
    setLoading(true);
    try {
      const [pricesResult, newsResult, trendsResult] = await Promise.all([
        MarketService.getPricesByLocation(location),
        MarketService.getNews(),
        MarketService.getTrends(selectedCommodity)
      ]);

      if (pricesResult.success) setPrices(pricesResult.data);
      if (newsResult.success) setNews(newsResult.data);
      if (trendsResult.success) setTrends(trendsResult.data);
    } catch (error) {
      console.error('Error loading market data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCommodity, location]);

  useEffect(() => {
    loadMarketData();
  }, [loadMarketData]);

  const handleSubscribeAlerts = async () => {
    if (!alertEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      const result = await MarketService.subscribeAlerts({
        email: alertEmail,
        commodity: selectedCommodity,
        location: location
      });

      if (result.success) {
        alert('Successfully subscribed to market alerts!');
        setAlertEmail('');
      } else {
        alert('Failed to subscribe: ' + result.error);
      }
    } catch (error) {
      alert('Error subscribing to alerts');
    }
  };

  const commodities = ['maize', 'beans', 'rice', 'potatoes', 'tomatoes', 'onions', 'cabbage'];
  const locations = ['nairobi', 'kisumu', 'mombasa', 'eldoret', 'nakuru', 'thika'];

  return (
    <>
      <Helmet>
        <title>Market Updates - MkulimaSoko</title>
        <meta name="description" content="Get real-time market prices, trends, and news for agricultural commodities in Kenya." />
      </Helmet>

      <div className="market-page">
        <div className="market-header">
          <h1><FaChartLine /> Market Updates</h1>
          <p>Stay informed with real-time market prices and trends</p>
        </div>

        <div className="market-controls">
          <div className="control-group">
            <label><FaSearch /> Commodity:</label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              {commodities.map(commodity => (
                <option key={commodity} value={commodity}>
                  {commodity.charAt(0).toUpperCase() + commodity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label><FaMapMarkerAlt /> Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc.charAt(0).toUpperCase() + loc.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading market data...</div>
        ) : (
          <div className="market-content">
            <div className="market-section">
              <h2>Current Prices</h2>
              <div className="prices-grid">
                {prices.length > 0 ? prices.map((price, index) => (
                  <div key={index} className="price-card">
                    <h3>{price.commodity}</h3>
                    <div className="price-info">
                      <span className="price">KSh {price.price}</span>
                      <span className="unit">per {price.unit}</span>
                    </div>
                    <div className="price-change">
                      {price.change > 0 ? '+' : ''}{price.change} KSh
                    </div>
                  </div>
                )) : (
                  <p>No price data available for this location</p>
                )}
              </div>
            </div>

            <div className="market-section">
              <h2>Market Trends</h2>
              <div className="trends-chart">
                {trends.data ? (
                  <div className="trend-info">
                    <p><strong>{selectedCommodity.toUpperCase()}</strong> prices have
                      {trends.trend === 'up' ? ' increased ' :
                       trends.trend === 'down' ? ' decreased ' : ' remained stable '}
                      by {Math.abs(trends.change)}% in the last 7 days.</p>
                    <div className="trend-stats">
                      <div className="stat">
                        <span className="label">7-Day Average:</span>
                        <span className="value">KSh {trends.average}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Highest:</span>
                        <span className="value">KSh {trends.highest}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Lowest:</span>
                        <span className="value">KSh {trends.lowest}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No trend data available</p>
                )}
              </div>
            </div>

            <div className="market-section">
              <h2>Market News</h2>
              <div className="news-list">
                {news.length > 0 ? news.map((item, index) => (
                  <div key={index} className="news-item">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span className="news-date">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                )) : (
                  <p>No market news available</p>
                )}
              </div>
            </div>

            <div className="market-section">
              <h2><FaBell /> Market Alerts</h2>
              <div className="alerts-section">
                <p>Get notified when prices change significantly</p>
                <div className="alert-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                  />
                  <button onClick={handleSubscribeAlerts} className="btn-subscribe">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketPage;