import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
    };

    if (!isServer) {
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

      config.mode = 'production';
    }

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        isServer ? MiniCssExtractPlugin.loader : 'style-loader',  // Use MiniCssExtractPlugin for SSR
        'css-loader',
        'sass-loader',
      ],
    });

    if (isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }

    return config;
  },
};
export default nextConfig;
