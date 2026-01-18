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
