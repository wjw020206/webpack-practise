const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
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
    extensions: ['.js', '.jsx'], // 按顺序依次解析没有扩展名的导入
    mainFiles: ['index', 'child'], // 解析目录时要使用的文件名
    alias: {
      child: path.resolve(__dirname, './src/a/b/c/child'), // 路径别名
    },
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
