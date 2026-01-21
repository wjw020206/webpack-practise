const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

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
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'imports-loader',
            options: {
              wrapper: 'window', // 将每个模块的 this 指向 window，原本默认 this 指向模块自身
            },
          },
        ],
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
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 指定 html 的模版文件（相对或绝对路径）
    }),
    new webpack.ProvidePlugin({
      $: ['jquery', 'default'], // 获取 default 导出
      _join: ['lodash', 'join'],
    }),
  ],
  optimization: {
    // 在老的 webpack 4 版本中，可能存在即使没改动源代码，打包出来的文件 contenthash 名依旧发生变化的问题
    // 是因为老版本的 webpack 4 打包时产生的 mainfest（管理模块映射、chunk 加载关系的一段“运行时代码 + 数据”） 存在差异，这个 mainfest 嵌套在每个文件的内部，每次打包都会发生变化，所以导致 contenthash 也每次都变化。
    // 可以使用如下配置，将 mainfest 关系相关的代码抽离出来，单独放在 runtime 文件中，这样老版本的 Webpack 4 中就没有这个问题了
    runtimeChunk: {
      name: 'single',
    },
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 只对异步导入（import() 导入）进行分割，如果要对同步异步的代码都进行分割可以配置 'all'，'initial' 是只对同步代码进行分割
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: 'vendors',
        },
      },
      // minSize: 20000, // 当库大小超过 20000 字节（20KB）时，进行代码分割，反之不分割
      // minRemainingSize: 0, // 生成新数据块所需的最小大小缩减量（以字节为单位）
      // minChunks: 1, // 当一个模块被引入多少次时才进行代码分割
      // maxAsyncRequests: 30, // 同时加载的模块数的最大数量
      // maxInitialRequests: 30, // 入口文件引入的库做代码分割的最大数量
      // enforceSizeThreshold: 50000, // 大小阈值，超过该阈值将强制执行拆分，其他限制（minRemainingSize、maxAsyncRequests、maxInitialRequests）将被忽略
      // automaticNameDelimiter: '~', // 指定生成文件名时使用的分隔符
      // // 当 chunks 的值为 'all' 或者 'initial' 时，代码分割满足前面条件后，还需要进行 cacheGroups 缓存组中分配
      // // 打包时，如果满足 defaultVendors 的要求，则放入 defaultVendors 组中，反之则放入 default 组中，最后打包结束后再生成
      // // 如果两个组都符合，则根据 priority 的来值来判断优先级，值越大优先级越高
      // cacheGroups: {
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/, // 判断是否是 node_modules 中的库
      //     priority: -10,
      //     reuseExistingChunk: true, // 如果一个模块已经被打包过了，再次打包时忽略该模块，复用之前打包过的模块
      //     // name: 'vendors.js', // 分割的文件名
      //   },
      //   default: {
      //     priority: -20,
      //     reuseExistingChunk: true,
      //     // name: 'common.js',
      //   },
      // },
    },
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
