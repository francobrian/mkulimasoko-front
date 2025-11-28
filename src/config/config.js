const config = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 15000,
    retryAttempts: 3
  },
  app: {
    name: process.env.REACT_APP_APP_NAME || 'MkulimaSoko',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development'
  },
  features: {
    enableAuth: true,
    enableProducts: true,
    enableNotifications: true
  },
  security: {
    tokenRefreshInterval: 14 * 60 * 1000, // 14 minutes
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
  }
};

// Configuration validation
export const validateConfig = () => {
  const errors = [];
  
  if (!config.api.baseURL) {
    errors.push('REACT_APP_API_BASE_URL is required');
  }
  
  if (!config.api.baseURL.startsWith('http')) {
    errors.push('REACT_APP_API_BASE_URL must be a valid URL');
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
  }
};

validateConfig();

export default config;