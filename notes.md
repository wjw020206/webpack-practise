# 运行 webpack 打包的命令

## 1. 运行全局安装的 webpack

```bash
webpack index.js
```

## 2. 运行项目本地依赖安装的 webpack

```bash
npx webpack index.js
```

## 3. 运行项目本地依赖安装的 webpack，通过 npm script 方式运行

```json
{
  "scripts": {
    "bundle": "webpack"
  }
}
```

执行 `npm run bundle`。

## webpack-cli 依赖项的作用

安装了它，就可以在命令行中使用 `webpack` 命令。

## webpack 配置文件

默认配置文件名为 `webpack.config.js`，它的大体框架如下：

```js
// webpack.config.js
module.exports = {
  // 入口
  entry: {},
  // 打包输出
  output: {},
  // 配置模块如何解析
  resolve: {},
  // 配置各种 loader
  moudle: {},
  // 配置插件
  plugins: [],
  // 优化（可以进行代码分割）
  optimization: {},
  // webpack-dev-server 开发时的配置，一般用于development模式
  devServer: {},
}
```

如果修改为其它的文件名称例如：`webpackconfig.js`，运行 `webpack` 命令时就需要手动指定配置文件。

```bash
npx webpack --config webpackconfig.js
```

## loaders

告诉 webpack 处理模块的规则

## plugin

在 webpack 运行到某个时刻时做一些事情

## html-webpack-plugin

在打包结束后自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中。

## clean-webpack-plugin

在打包前先清理已经存在的打包文件夹。

## sourceMap

是打包文件和源代码文件之间的映射关系。

**devtool 关键字的含义**

- `source-map`
  - 是否生成 .map 文件，决定调试能力上限

- `inline`
  - 不生成 .map 的文件，已 base64 的形式内嵌进代码中

- `cheap`
  - 不包含列信息，只定位到行（更快）

- `module`
  - 能映射 loader 转译前的源码（babel / ts 必须）

- `eval`
  - 速度快，用 eval() 包代码

- `hidden`
  - 生成 .map 的文件，但浏览器看不不到，错误监控平台能用

- `false`
  - 关闭 sourceMap

**最佳实践**

在生产环境中

- 不暴露源码（浏览器中不可见） + 可监控错误（最常见）

  ```js
  devtool: 'hidden-source-map'
  ```

- 需要完整调试能力（内部系统）

  ```js
  devtool: 'source-map',
  ```

- 预发布的时候

  ```js
  devtool: 'cheap-module-source-map',
  ```

在开发环境中推荐使用

```js
devtool: 'eval-cheap-module-source-map'
```

## 提升 webpack 的开发效率

1. **配置 --watch**

   在 package.json 中添加如下 script。

   ```js
    "watch": "webpack --watch"
   ```

   可以让 webpack 监听文件的变化，自动进行打包。

   **缺点：** 只能通过 file:// 方式打开页面，页面需要手动刷新。

2. **使用 webpack-dev-server 开发（推荐）**

   先通过 npm 安装 `webpack-dev-server` 依赖，在 package.json 中添加如下 script。

   ```js
   "start": "webpack-dev-server",
   ```

   可以让 webpack 监听文件的变化，自动进行打包，并启动一个 http 服务器来实时刷新网页。

3. **在 node 中使用 webpack**

   ```js
   const express = require('express')
   const webpack = require('webpack')
   const webpackDevMiddleware = require('webpack-dev-middleware')
   const config = require('./webpack.config.js')
   const complier = webpack(config) // 获取 webpack 编译器

   const app = express()

   // express 使用 webpack-dev-middleware 中间件
   app.use(
     webpackDevMiddleware(complier, {
       publicPath: config.output.publicPath, // 与配置文件中的 publicPath 保持一致
     }),
   )

   app.listen(3000, () => {
     console.log('server is running')
   })
   ```

## Tree Shaking

只支持 ES Module 引入方式，不支持 CommonJS 和 AMD 引入方式。

因为后两者无法提供静态分析能力，需要运行时才能知道，在运行时动态改变。

在 webpack5 中，当 `mode: 'production'` 时打包会自动开启 Tree Shanking

对于没有明确导入的模块，webpack 依旧会打包进该模块。

例如：

```js
import './index.css'
```

以及

```js
import 'core-js/stable'
```

以上模块没有明确使用导出，但是会有副作用（例如：css 会直接影响页面样式， core.js 会在 window 对象上添加属性）。

可以在 `package.json` 中添加如果配置

```json
{
  "sideEffects": ["*.css", "core-js/stable"]
}
```

告诉 webpack 这两个模块即使没有明确使用导出也必须打包，其它未使用导出的模块，如果没有副作用，则会被 Tree Shaking 删除。

如果整个项目/库没有副作用，可以直接写 `false`。

```json
{
  "sideEffects": false
}
```

如果不写 sideEffects 配置，默认情况下，对于未使用导出的模块，有副作用的保留，没副作用的删除。

若不想使用 Tree Shaking 可以在 webpack 中使用如下配置关闭。

```js
optimization: {
  usedExports: false,
},
```

## Code Splitting

代码拆分，默认情况下 Webpack 会将所有模块打包成一个文件（假设 main.js，有 2MB 大小），这样做有以下缺点：

1. 首次访问页面时，需要加载 main.js（2MB）
2. 当业务逻辑模块修改时，又要加载 2MB 的内容

通过使用 Code Splitting，可以将模块拆分，有以下优点：

1. 假设 main.js 被拆分为 lodash.js（1MB）、main.js（1MB），浏览器可以并行加载文件来提升速度（不绝对）
2. 当业务逻辑模块（main.js）发生变化，只需要重新加载 main.js 文件即可

**在 webpack 中有两种方式启用 Code Splitting：**

1. 编写同步代码，在 webpack.config.js 中写入如下配置

   ```js
   optimization: {
     splitChunks: {
       chunks: 'all'
     }
   }
   ```

   可以直接在代码中编写同步代码：

   ```js
   import _ from 'lodash'

   var element = document.createElement('div')
   element.innerHTML = _.join(['Code', 'Pencil'], '-')
   document.body.appendChild(element)
   ```

2. 使用 `import()` 异步导入，无需编写其它配置

   ```js
   function getComponent() {
     return import('lodash').then(({ default: _ }) => {
       var element = document.createElement('div')
       element.innerHTML = _.join(['Code', 'Pencil'], '-')
       return element
     })
   }

   getComponent().then((element) => {
     document.body.appendChild(element)
   })
   ```

   webpack 会自动识别 `import()` 进行代码分割。

## Lazy Loading 懒加载

指的是使用 `import()` 异步动态加载模块的语法，例如：

```js
function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(
    ({ default: _ }) => {
      var element = document.createElement('div')
      element.innerHTML = _.join(['Code', 'Pencil'], '-')
      return element
    },
  )
}

// 只有当点击事件触发了才会加载 lodash
document.addEventListener('click', () => {
  getComponent().then((element) => {
    document.body.appendChild(element)
  })
})
```

优点：按需加载，页面加载速度更快。

## Chunk

打包工具在构建过程中生成的代码块单位。

例如打包出了 loadash.js、main.js。

在构建过程中生成了 main chunk 和 lodash chunk，它们最终分别输出为 main.js 和 lodash.js 这两个 bundle 文件。

## 预获取/预加载模块

在前端性能优化中，缓存所能带来的性能提升十分有限，应该提升代码的使用的覆盖率。

可以通过 webpack 的预获取/预加载的魔法注释结合 `import()` 异步加载的方式

**预获取（Prefetching）：** 指优先加载页面主要模块，对于 `import()` 异步加载的模块会在主要模块加载完成后，浏览器空闲时在后台自行下载，等到使用的时候会从缓存中再次加载

**预加载（Preloading）：** 指页面的主要模块和其它的异步模块并行下载，预加载的数据块应立即被父数据块请求

例如：

```js
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click').then(({ default: func }) => {
    func()
  })
```

上述代码的魔法注释是**预获取**，当点击事件触发时，从缓存（浏览器空闲时预获取了）中加载 `click` 模块。

```js
document.addEventListener('click', () => {
  import(/* webpackPreload: true */ './click').then(({ default: func }) => {
    func()
  })
```

上述代码的魔法注释是**预加载**，主模块和 `click` 模块一起并行加载。

## 打包分析

可以通过一些插件或者第三方的网站来对打包结果进行分析。

推荐：https://github.com/webpack/webpack-bundle-analyzer

## webpack 和浏览器缓存

通常默认情况下，例如浏览器下载了 a.js 文件就会进行缓存，除非文件名发生变化、后台返回 200 的状态或者携带了 `Cache-Control: no-cache` 响应头等情况才会重新下载新的文件而非走缓存。

**推荐在 webbpack 配置 contenthash**，文件内容发生了变化，对应的文件名中的 hash 值就发生了变化，内容没变的文件，hash 值依旧是之前的，可以确保不变的文件依旧使用缓存中的，变化的文件下载是最新的。

```js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js',
}
```

然后在服务器配置响应头为强缓存。

```
200 OK
Cache-Control: public, max-age=31536000, immutable
```

- `max-age=31536000`：缓存 1 年
- `immutable`：这一年内内容绝不会变

**⚠️ 注意：**

- 入口文件的 `index.html` 需要配置不强缓存，除非文件本身也使用 contenthash，否则即使 JS 文件名已经变了，也没机会被加载

- 在老的 webpack 4 版本中，可能存在即使没改动源代码，打包出来的文件 contenthash 名依旧发生变化的问题，这是因为老版本的 webpack 4 打包时产生的 mainfest（管理模块映射、chunk 加载关系的一段 “运行时代码 + 数据”） 存在差异，这个 mainfest 嵌套在每个文件的内部，每次打包都会发生变化，所以导致 contenthash 也每次都变化，可以使用如下配置，将 mainfest 关系相关的代码抽离出来，单独放在 single 文件中，这样老版本的 Webpack 4 中就没有这个问题了

  ```js
  runtimeChunk: {
    name: 'single',
  }
  ```

## Shimming

对于一些 ES2015 之前的库，这些第三方库可能需要全局依赖项（例如 jQuery 的 $ ），这些库可能创建需要导出的全局变量，此时就可以使用 Shimming 来兼容，在 webpack.config.js 中进行如下配置

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: ['jquery', 'default'], // 获取 default 导出 jquery
      _: 'lodash', // 导出 lodash
    }),
  ],
}
```

如果要让模块中的 `this`（默认指向模块自身）执行全局变量 `window`，可以使用如下配置：

```js
// 配置模块打包规则
rules: [
  {
    test: /\.js$/,
    use: [
      {
        loader: 'imports-loader',
        options: {
          wrapper: 'window', // 将每个模块的 this 指向 window，原本默认 this 指向模块自身
        },
      },
    ],
  },
]
```

## webpack 性能优化

1. 使用新版本的 Node.js、Webpack 以及包管理工具（npm、yarn、pnpm）

2. 通过配置 Loader 的 `include` 和 `exclude` 限制打包返回，从而降低打包频率，提高性能

3. 合理的使用可靠、Webpack 官方推荐的第三方的 Plugin，例如在开发环境下就不需要使用 CSS 压缩插件

4. 合理的使用 resolve 中的配置，例如：
   ```js
   resolve: {
    // 对于图片资源应该不省略扩展名，不要过多的使用 extensions
     extensions: ['.js', '.jsx'], // 按顺序依次解析没有扩展名的导入
     mainFiles: ['index'], // 解析目录时要使用的文件名
     alias: {
       '@': path.resolve(__dirname, './src'), // 路径别名
     },
   },
   ```
