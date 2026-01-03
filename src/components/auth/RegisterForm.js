import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import './RegisterForm.css';

const RegisterForm = () => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
    role: Yup.string()
      .oneOf(['buyer', 'farmer'], 'Invalid role')
      .required('Role is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    address: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      role: 'buyer',
      password: '',
      confirmPassword: '',
      address: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        // Remove confirmPassword from submission
        const { confirmPassword, ...registerData } = values;
        
        const result = await register(registerData);
        if (result.success) {
          setSuccess('Registration successful! Redirecting...');
          formik.resetForm();
          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="register-form-container">
      <h2>Create Account</h2>
      <p className="form-subtitle">Join MkulimaSoko today</p>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <FaUser className="input-icon" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? 'error' : ''}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="input-icon" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'error' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <FaPhone className="input-icon" />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="07XX XXX XXX"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error-message">{formik.errors.phone}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">
            <FaUser className="input-icon" />
            I want to
          </label>
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${formik.values.role === 'buyer' ? 'active' : ''}`}
              onClick={() => formik.setFieldValue('role', 'buyer')}
            >
              Buy Products
            </button>
            <button
              type="button"
              className={`role-btn ${formik.values.role === 'farmer' ? 'active' : ''}`}
              onClick={() => formik.setFieldValue('role', 'farmer')}
            >
              Sell Products
            </button>
          </div>
          {formik.touched.role && formik.errors.role && (
            <div className="error-message">{formik.errors.role}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FaLock className="input-icon" />
            Password
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Create a strong password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
          <div className="password-hints">
            <small>Must contain at least 6 characters, one uppercase letter, and one number</small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <FaLock className="input-icon" />
            Confirm Password
          </label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">
            <FaMapMarkerAlt className="input-icon" />
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your full address including town/city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className={formik.touched.address && formik.errors.address ? 'error' : ''}
            rows="3"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="error-message">{formik.errors.address}</div>
          )}
        </div>

        <div className="form-group terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="btn-register-submit"
          disabled={isLoading || !formik.isValid}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="form-footer">
          <p>
            Already have an account?{' '}
            <a href="/login">Sign in here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;