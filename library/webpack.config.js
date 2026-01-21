const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'root', // 通过 <script> 引入后挂载到全局对象上的名字
      type: 'umd', // 打包结果为 UMD(通用模块定义)，同时兼容 ES、AMD、CommonJS 方式使用
      // type: 'this', // 将 library 挂载在 this 上，在浏览器环境中就是 window
    },
  },
  // 忽略第三方依赖库的打包
  externals: 'lodash',
  // externals: {
  //   lodash: {
  //     root: '_', // 如果是通过  <script> 全局挂载的 lodash，就必须使用 _ 的全局变量
  //     commonjs: 'lodash', // 如果在外部通过 commonjs 使用这个库，要求 lodash 加载时导出的名字必须是 lodash
  //   },
  // },
}
