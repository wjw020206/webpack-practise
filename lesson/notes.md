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
