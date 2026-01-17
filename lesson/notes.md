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

默认配置文件名为 `webpack.config.js`。

如果修改为其它的文件名称例如：`webpackconfig.js`，运行 `webpack` 命令时就需要手动指定配置文件。

```bash
npx webpack --config webpackconfig.js
```
