import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCloud, FaSun, FaCloudRain, FaWind, FaThermometerHalf, FaBell, FaMapMarkerAlt } from 'react-icons/fa';
import WeatherService from '../services/weatherService';
import './WeatherPage.css';

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('nairobi');
  const [alertEmail, setAlertEmail] = useState('');

  const loadWeatherData = useCallback(async () => {
    setLoading(true);
    try {
      const [currentResult, forecastResult, alertsResult, adviceResult] = await Promise.all([
        WeatherService.getCurrent(location),
        WeatherService.getForecast(location),
        WeatherService.getAlerts(location),
        WeatherService.getAgriAdvice(location)
      ]);

      if (currentResult.success) setCurrentWeather(currentResult.data);
      if (forecastResult.success) setForecast(forecastResult.data);
      if (alertsResult.success) setAlerts(alertsResult.data);
      if (adviceResult.success) setAdvice(adviceResult.data);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  const handleSubscribeAlerts = async () => {
    if (!alertEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      const result = await WeatherService.subscribeAlerts({
        email: alertEmail,
        location: location
      });

      if (result.success) {
        alert('Successfully subscribed to weather alerts!');
        setAlertEmail('');
      } else {
        alert('Failed to subscribe: ' + result.error);
      }
    } catch (error) {
      alert('Error subscribing to alerts');
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': <FaSun />,
      'cloudy': <FaCloud />,
      'rainy': <FaCloudRain />,
      'windy': <FaWind />
    };
    return iconMap[condition.toLowerCase()] || <FaCloud />;
  };

  const locations = ['nairobi', 'kisumu', 'mombasa', 'eldoret', 'nakuru', 'thika', 'machakos'];

  return (
    <>
      <Helmet>
        <title>Weather Advisory - MkulimaSoko</title>
        <meta name="description" content="Get weather forecasts and agricultural advice for better farming decisions." />
      </Helmet>

      <div className="weather-page">
        <div className="weather-header">
          <h1><FaCloud /> Weather Advisory</h1>
          <p>Get weather forecasts and agricultural recommendations</p>
        </div>

        <div className="weather-controls">
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
          <div className="loading">Loading weather data...</div>
        ) : (
          <div className="weather-content">
            {currentWeather && (
              <div className="weather-section current-weather">
                <h2>Current Weather</h2>
                <div className="weather-card current">
                  <div className="weather-icon">
                    {getWeatherIcon(currentWeather.condition)}
                  </div>
                  <div className="weather-info">
                    <h3>{location.charAt(0).toUpperCase() + location.slice(1)}</h3>
                    <div className="temperature">
                      <FaThermometerHalf />
                      {currentWeather.temperature}°C
                    </div>
                    <div className="condition">{currentWeather.condition}</div>
                    <div className="details">
                      <span>Humidity: {currentWeather.humidity}%</span>
                      <span>Wind: {currentWeather.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="weather-section">
              <h2>7-Day Forecast</h2>
              <div className="forecast-grid">
                {forecast.length > 0 ? forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <div className="day">{day.day}</div>
                    <div className="weather-icon">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="temp-range">
                      <span className="high">{day.highTemp}°</span>
                      <span className="low">{day.lowTemp}°</span>
                    </div>
                    <div className="condition">{day.condition}</div>
                  </div>
                )) : (
                  <p>No forecast data available</p>
                )}
              </div>
            </div>

            {advice && (
              <div className="weather-section">
                <h2>Agricultural Advice</h2>
                <div className="advice-card">
                  <div className="advice-content">
                    <h3>Today's Recommendations</h3>
                    <div className="advice-list">
                      {advice.recommendations.map((rec, index) => (
                        <div key={index} className="advice-item">
                          <strong>{rec.activity}:</strong> {rec.advice}
                        </div>
                      ))}
                    </div>
                    <div className="risk-level">
                      <span className={`risk ${advice.riskLevel.toLowerCase()}`}>
                        Risk Level: {advice.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {alerts.length > 0 && (
              <div className="weather-section">
                <h2>Weather Alerts</h2>
                <div className="alerts-list">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`}>
                      <div className="alert-header">
                        <span className="severity">{alert.severity}</span>
                        <span className="date">{new Date(alert.date).toLocaleDateString()}</span>
                      </div>
                      <div className="alert-message">{alert.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="weather-section">
              <h2><FaBell /> Weather Alerts</h2>
              <div className="alerts-section">
                <p>Get notified about severe weather conditions</p>
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

export default WeatherPage;