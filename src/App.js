import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import Marketplace from './pages/Marketplace';
import Farms from './pages/Farms';
import './App.css';

// Layout component for pages with navbar and footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Dashboard selector based on user type
const UserDashboard = () => {
  const { user } = useAuth();
  
  if (user?.userType === 'farmer') {
    return <FarmerDashboard />;
  } else {
    return <ConsumerDashboard />;
  }
};

// Main app content with routing
const AppContent = () => {
  return (
    <Routes>
      {/* Public routes without navbar/footer */}
      <Route 
        path="/login" 
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected routes with navbar/footer */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/marketplace" 
        element={
          <ProtectedRoute>
            <Layout>
              <Marketplace />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farms" 
        element={
          <ProtectedRoute>
            <Layout>
              <Farms />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Home route redirects to dashboard */}
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
      />
      
      {/* 404 page */}
      <Route 
        path="*" 
        element={
          <Layout>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a 
                  href="/" 
                  className="btn-primary text-lg px-6 py-3"
                >
                  Return to Dashboard
                </a>
              </div>
            </div>
          </Layout>
        } 
      />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;