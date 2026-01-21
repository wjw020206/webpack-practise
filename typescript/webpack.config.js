const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use: 'ts-loader',
      },
    ],
  },
}
