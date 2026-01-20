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
  - 能映射 loader 之前的源码（babel / ts 必须）

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
