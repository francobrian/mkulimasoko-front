import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import { Helmet } from 'react-helmet-async';
import './AuthPages.css';

const RegisterPage = () => {
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
        <title>Register - MkulimaSoko</title>
        <meta name="description" content="Create a new MkulimaSoko account" />
      </Helmet>

      <div className="auth-page register-page">
        <div className="auth-container">
          <div className="auth-left">
            <div className="auth-brand">
              <h1>Join MkulimaSoko</h1>
              <p>Connect with farmers and buyers across Kenya</p>
            </div>
            <div className="benefits">
              <h3>Benefits of Joining</h3>
              <ul>
                <li>Access to fresh farm produce</li>
                <li>Direct communication with farmers</li>
                <li>Exclusive discounts and offers</li>
                <li>Fast and reliable delivery</li>
                <li>Secure payment options</li>
              </ul>
            </div>
          </div>

          <div className="auth-right">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;