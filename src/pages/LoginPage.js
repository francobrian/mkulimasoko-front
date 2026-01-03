import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { Helmet } from 'react-helmet-async';
import './AuthPages.css';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Helmet>
        <title>Login - MkulimaSoko</title>
        <meta name="description" content="Login to your MkulimaSoko account" />
      </Helmet>

      <div className="auth-page login-page">
        <div className="auth-container">
          <div className="auth-left">
            <div className="auth-brand">
              <h1>MkulimaSoko</h1>
              <p>Fresh farm produce delivered to you</p>
            </div>
            <div className="auth-features">
              <div className="feature">
                <h3>Shop Fresh</h3>
                <p>Direct from farmers to your table</p>
              </div>
              <div className="feature">
                <h3>Support Local</h3>
                <p>Empower Kenyan agriculture</p>
              </div>
              <div className="feature">
                <h3>Fast Delivery</h3>
                <p>Same day delivery in Nairobi</p>
              </div>
            </div>
          </div>

          <div className="auth-right">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;