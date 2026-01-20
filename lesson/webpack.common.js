const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { optimize } = require('webpack')

module.exports = {
  entry: {
    // lodash: './src/lodash.js',
    main: './src/index.js',
  },
  module: {
    // 配置模块打包规则
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/, // 排除目录
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: 'asset', // 使用 webpack 5 内置的资源模块，导出一个资源的 data URI，等价于 url-loader
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
      {
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 指定 html 的模版文件（相对或绝对路径）
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
