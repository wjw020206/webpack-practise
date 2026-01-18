const path = require('path') // node.js 的 path 核心模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 在打包结束后自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中

module.exports = {
  mode: 'development', // 模式, 'production' 打包会压缩代码，'development' 不会，默认是 'production', 不添加 mode，打包时控制台会有警告
  // entry: './src/index.js', // 打包的入口文件,默认为 index.js
  entry: {
    main: './src/index.js', // 该写法是上一行代码的完整写法，main 为 chunk 名
  },
  module: {
    // 配置模块打包规则
    rules: [
      /* {
        test: /\.(jpg|png|gif)$/, // 匹配 .jpg、.png、.gif 结尾的文件
        type: 'asset/resource', // 使用 webpack 5 内置的资源模块，将文件发送到输出目录，等价于 file-loader
        generator: {
          filename: '[name]_[hash][ext]', // （占位符）配置与原始图片的名称和后缀相同，此处 [ext] 前不用加 .，但在 webpack 4 中是需要加 .
          publicPath: 'images/', // 请求资源访问的路径，也可以是线上的 'https://cdn/assets/'
          outputPath: 'images/', // 实际资源的路径
        },
        // webpack 5 之前的版本需要单独安装 loader
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name]_[hash].[ext]', // （占位符）配置与原始图片的名称和后缀相同
        //     outputPath: 'images/',
        //   },
        // },
      }, */
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
            maxSize: 10240, // 等价于 url-loader 的 limit
          },
        },
        // webpack 5 之前的版本需要单独安装 loader
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     name: '[name]_[hash].[ext]', // （占位符）配置与原始图片的名称和后缀相同
        //     outputPath: 'images/',
        //     limit: 2048, // 当图片大小超过 2kb(2048Byte) 时，使用 file-loader 一样的效果，反之则使用 base64
        //   },
        // },
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'], // css-loader 负责处理 css 文件之间的关系，style-loader 负责将处理好的 css 文件插入到页面的 head 标签的 style 标签中
      // },
      // {
      //   test: /\.scss$/,
      //   // loader 执行顺序为从下到上，从右到左
      //   use: [
      //     'style-loader', // 将 JS 字符串生成为 style 节点
      //     'css-loader', // 将 CSS 转化成 CommonJS 模块
      //     'sass-loader', // 将 Sass 编译成 CSS
      //     'postcss-loader', // 为 CSS 语句自动添加加浏览器前缀
      //   ],
      // },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 通过 @import 的样式文件也需要先经过 postcss-loader 和 sass-loader
              // modules: true, // 开启 CSS 模块化打包
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
        // webpack 5 之前的版本需要单独安装 loader
        // use: {
        //   loader: 'file-loader',
        // },
      },
    ],
  },
  output: {
    filename: 'bundle.js', // 打包输出的文件名，默认为 main.js
    path: path.resolve(__dirname, 'dist'), // 打包输出的目录名(绝对路径)，默认为 dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 指定 html 的模版文件（相对或绝对路径）
    }),
  ],
}
