const path = require('path') // node.js 的 path 核心模块

module.exports = {
  mode: 'production', // 模式, 'production' 打包会压缩代码，'development' 不会，默认是 'production', 不添加 mode，打包时控制台会有警告
  // entry: './src/index.js', // 打包的入口文件,默认为 index.js
  entry: {
    main: './src/index.js', // 该写法是上一行代码的完整写法，main 为 chunk 名
  },
  output: {
    filename: 'bundle.js', // 打包输出的文件名，默认为 main.js
    path: path.resolve(__dirname, 'dist'), // 打包输出的目录名(绝对路径)，默认为 dist
  },
}