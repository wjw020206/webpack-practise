const devCofig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    // 配置模块打包规则
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    static: './dist',
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
    port: 8080,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
}

module.exports = devCofig
