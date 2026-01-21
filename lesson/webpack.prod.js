const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
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
  output: {
    filename: '[name].[contenthash].js', // 入口文件使用 filename
    chunkFilename: '[name].[contenthash].js', // 被入口文件所引用的模块文件名使用 chunkFilename
  },
}

module.exports = prodConfig
