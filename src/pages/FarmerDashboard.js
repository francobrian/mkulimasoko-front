import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeListings: 0,
    totalSales: 0,
    pendingOrders: 0
  });

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching farmer data
    setStats({
      totalProducts: 12,
      activeListings: 8,
      totalSales: 24,
      pendingOrders: 3
    });

    setRecentProducts([
      { id: 1, name: 'Fresh Tomatoes', price: 200, quantity: 50, status: 'active' },
      { id: 2, name: 'Organic Kale', price: 150, quantity: 30, status: 'active' },
      { id: 3, name: 'Avocados', price: 300, quantity: 20, status: 'sold out' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your farm products and track your sales
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              color="bg-green-100 text-green-600"
              icon="🌱"
            />
            <StatCard
              title="Active Listings"
              value={stats.activeListings}
              color="bg-blue-100 text-blue-600"
              icon="📦"
            />
            <StatCard
              title="Total Sales"
              value={stats.totalSales}
              color="bg-purple-100 text-purple-600"
              icon="💰"
            />
            <StatCard
              title="Pending Orders"
              value={stats.pendingOrders}
              color="bg-yellow-100 text-yellow-600"
              icon="⏳"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/marketplace?add-product=true"
                className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add New Product
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Marketplace
              </Link>
              <Link
                to="/farms"
                className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Manage Farm
              </Link>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                View Orders
              </button>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Products
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your recently added or updated products
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentProducts.map((product) => (
                <li key={product.id}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">🌽</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          KSh {product.price} per kg • {product.quantity} kg available
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                      <button className="ml-4 text-sm text-green-600 hover:text-green-900">
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;