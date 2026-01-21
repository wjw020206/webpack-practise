const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: 'asset',
        generator: {
          filename: '[name]_[hash][ext]',
          publicPath: 'images/',
          outputPath: 'images/',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10240,
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
      },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new ESLintPlugin({
      failOnError: false,
      failOnWarning: false,
    }),
  ],
  cache: {
    type: 'filesystem', // 构建缓存存在磁盘（默认是在 'memory' 内存中缓存，重启电脑后缓存消失）
  },
  optimization: {
    runtimeChunk: 'single', // 将 webpack 运行时代码单独打包一个文件
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors', // 将第三方依赖单独打包进 vendors.js 中
        },
      },
    },
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
    client: {
      overlay: true,
    },
    proxy: [
      {
        context: ['/react/api'],
        target: 'http://www.dell-lee.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          'header.json': 'demo.json',
        },
      },
    ],
  },
}
