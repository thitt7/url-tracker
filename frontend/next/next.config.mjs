const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        isServer ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,  // Enable CSS Modules
            sourceMap: true,
            importLoaders: 1,
          },
        },
        'sass-loader',
      ],
    });

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/, // Regular SCSS files
      use: [
        isServer ? MiniCssExtractPlugin.loader : 'style-loader',
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
