import React, { useState, useEffect } from 'react';
// NEW (Correct path within src)
import { useAuth } from '../contexts/AuthContext';

const Marketplace = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'vegetables',
    'fruits',
    'grains',
    'dairy',
    'herbs',
    'organic'
  ];

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Fresh Tomatoes',
          category: 'vegetables',
          price: 200,
          unit: 'kg',
          farmer: 'Green Valley Farm',
          location: 'Nairobi',
          rating: 4.5,
          image: '🍅',
          description: 'Fresh, ripe tomatoes from our organic farm',
          available: 50
        },
        {
          id: 2,
          name: 'Organic Kale',
          category: 'vegetables',
          price: 150,
          unit: 'bunch',
          farmer: 'Sunshine Organics',
          location: 'Kiambu',
          rating: 4.8,
          image: '🥬',
          description: 'Fresh organic kale, packed with nutrients',
          available: 30
        },
        {
          id: 3,
          name: 'Avocados',
          category: 'fruits',
          price: 300,
          unit: 'kg',
          farmer: 'Mountain View Farm',
          location: 'Muranga',
          rating: 4.7,
          image: '🥑',
          description: 'Creamy Hass avocados, perfect for your recipes',
          available: 20
        },
        {
          id: 4,
          name: 'Maize Flour',
          category: 'grains',
          price: 180,
          unit: 'kg',
          farmer: 'Golden Grains Farm',
          location: 'Nakuru',
          rating: 4.6,
          image: '🌽',
          description: 'Finely ground maize flour for ugali',
          available: 100
        },
        {
          id: 5,
          name: 'Fresh Milk',
          category: 'dairy',
          price: 80,
          unit: 'liter',
          farmer: 'Dairy Fresh Farm',
          location: 'Limuru',
          rating: 4.9,
          image: '🥛',
          description: 'Fresh pasteurized milk from happy cows',
          available: 40
        },
        {
          id: 6,
          name: 'Basil',
          category: 'herbs',
          price: 100,
          unit: 'bunch',
          farmer: 'Herb Garden',
          location: 'Thika',
          rating: 4.4,
          image: '🌿',
          description: 'Fresh basil for cooking and garnishing',
          available: 25
        }
      ];

      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{product.image}</div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-green-600">KSh {product.price}</span>
            <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {product.farmer}
          </div>
          <div>{product.location}</div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product.available} {product.unit} available
          </span>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            Add to Cart
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
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="mt-2 text-sm text-gray-600">
              Discover fresh produce from local farmers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products, farms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Fresh Produce ({filteredProducts.length} items)
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="font-medium">Popularity</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;