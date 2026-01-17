const path = require('path') // node.js 的 path 核心模块

module.exports = {
  entry: './src/index.js', // 打包的入口文件,默认问 index.js
  output: {
    filename: 'bundle.js', // 打包输出的文件名，默认为 main.js
    path: path.resolve(__dirname, 'dist'), // 打包输出的目录名(绝对路径)，默认为 dist
  },
}