import React, { useState, useEffect } from 'react';
// NEW (Correct path within src)
import { useAuth } from '../contexts/AuthContext';

const Farms = () => {
  const { user } = useAuth();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching farms
    setTimeout(() => {
      const mockFarms = [
        {
          id: 1,
          name: 'Green Valley Farm',
          location: 'Nairobi',
          specialty: 'Vegetables',
          rating: 4.5,
          products: 15,
          joined: '2023',
          image: '🏞️',
          description: 'Family-owned organic farm specializing in fresh vegetables',
          certifications: ['Organic', 'Sustainable'],
          delivery: true
        },
        {
          id: 2,
          name: 'Sunshine Organics',
          location: 'Kiambu',
          specialty: 'Leafy Greens',
          rating: 4.8,
          products: 12,
          joined: '2022',
          image: '🌞',
          description: 'Premium organic produce grown with sustainable methods',
          certifications: ['Organic', 'Non-GMO'],
          delivery: true
        },
        {
          id: 3,
          name: 'Mountain View Farm',
          location: 'Muranga',
          specialty: 'Fruits',
          rating: 4.7,
          products: 20,
          joined: '2023',
          image: '⛰️',
          description: 'High-altitude fruit farm with exceptional quality produce',
          certifications: ['Sustainable'],
          delivery: false
        },
        {
          id: 4,
          name: 'Golden Grains Farm',
          location: 'Nakuru',
          specialty: 'Grains',
          rating: 4.6,
          products: 8,
          joined: '2021',
          image: '🌾',
          description: 'Traditional grain farming with modern sustainable practices',
          certifications: ['Traditional'],
          delivery: true
        },
        {
          id: 5,
          name: 'Dairy Fresh Farm',
          location: 'Limuru',
          specialty: 'Dairy',
          rating: 4.9,
          products: 6,
          joined: '2020',
          image: '🐄',
          description: 'Fresh dairy products from free-range, grass-fed cows',
          certifications: ['Organic', 'Free-Range'],
          delivery: true
        },
        {
          id: 6,
          name: 'Herb Garden',
          location: 'Thika',
          specialty: 'Herbs',
          rating: 4.4,
          products: 10,
          joined: '2023',
          image: '🌿',
          description: 'Specialized herb farm with rare and common varieties',
          certifications: ['Organic'],
          delivery: true
        }
      ];

      setFarms(mockFarms);
      setFilteredFarms(mockFarms);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = farms.filter(farm =>
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFarms(filtered);
  }, [searchTerm, farms]);

  const FarmCard = ({ farm }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="text-4xl mr-4">{farm.image}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{farm.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm text-gray-600 ml-1">{farm.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{farm.location}</span>
              </div>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            farm.delivery ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {farm.delivery ? 'Delivery Available' : 'Pickup Only'}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{farm.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Specialty</h4>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {farm.specialty}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-1">
            {farm.certifications.map((cert, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{farm.products} products</span>
          <span>Member since {farm.joined}</span>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            View Products
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            Contact Farm
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Local Farms</h1>
            <p className="mt-2 text-sm text-gray-600">
              Discover and connect with local farmers in your area
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search farms by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Farms Grid */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Featured Farms ({filteredFarms.length} farms)
            </h2>
          </div>

          {filteredFarms.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">🏞️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No farms found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredFarms.map(farm => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farms;