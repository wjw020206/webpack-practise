const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    // 配置模块打包规则
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
}

module.exports = merge(prodConfig, commonConfig)
