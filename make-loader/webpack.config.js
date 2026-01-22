const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  // 配置 loaders 路径的映射
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [
      {
        test: /\.js/,

        use: [
          {
            // 使用自定义的 loader
            // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            loader: 'replaceLoader.js',
          },
          {
            // 使用自定义的异步 loader
            // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
            loader: 'replaceLoaderAsync.js',
            options: {
              name: 'Pencil',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
}
