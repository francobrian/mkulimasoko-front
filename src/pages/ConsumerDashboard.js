import React, { useState, useEffect } from 'react';
// NEW (Correct path within src)
import { useAuth } from '../contexts/AuthContext';

import { Link } from 'react-router-dom';

const ConsumerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    ordersThisMonth: 0,
    favoriteFarms: 0,
    totalSpent: 0,
    pendingDeliveries: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching consumer data
    setStats({
      ordersThisMonth: 8,
      favoriteFarms: 5,
      totalSpent: 12500,
      pendingDeliveries: 2
    });

    setRecentOrders([
      { id: 1, product: 'Fresh Tomatoes', farm: 'Green Valley Farm', amount: 800, status: 'delivered', date: '2024-01-15' },
      { id: 2, product: 'Organic Kale', farm: 'Sunshine Organics', amount: 450, status: 'in transit', date: '2024-01-14' },
      { id: 3, product: 'Avocados', farm: 'Mountain View Farm', amount: 1200, status: 'processing', date: '2024-01-13' }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Consumer Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track your orders and discover fresh produce
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Orders This Month"
              value={stats.ordersThisMonth}
              color="bg-green-100 text-green-600"
              icon="📦"
            />
            <StatCard
              title="Favorite Farms"
              value={stats.favoriteFarms}
              color="bg-red-100 text-red-600"
              icon="❤️"
            />
            <StatCard
              title="Total Spent"
              value={`KSh ${stats.totalSpent.toLocaleString()}`}
              color="bg-purple-100 text-purple-600"
              icon="💰"
            />
            <StatCard
              title="Pending Deliveries"
              value={stats.pendingDeliveries}
              color="bg-yellow-100 text-yellow-600"
              icon="🚚"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/marketplace"
                className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Shop Marketplace
              </Link>
              <Link
                to="/farms"
                className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Browse Farms
              </Link>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Order History
              </button>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Favorites
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Orders
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your recent purchases and their status
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">📦</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.product}
                          </div>
                          <div className="text-sm text-gray-500">
                            From {order.farm} • {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-900">
                          KSh {order.amount}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <button className="text-sm text-green-600 hover:text-green-900">
                          View Details
                        </button>
                      </div>
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

export default ConsumerDashboard;