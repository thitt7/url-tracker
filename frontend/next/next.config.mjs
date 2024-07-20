// import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config({ path: '../../.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config, { isServer }) => {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        // usedExports: true,
        // Additional optimizations can be added here
      };
  
      if (!isServer) {
        // Client-side only optimizations
        config.optimization.splitChunks = {
          chunks: 'all',
          automaticNameDelimiter: '.',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        };
  
        // Ensure production mode is enabled
        config.mode = 'production';
      }
  
      return config;
    },
  };
export default nextConfig;