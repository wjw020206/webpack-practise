const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const complier = webpack(config) // 获取 webpack 编译器

const app = express()

// express 使用 webpack-dev-middleware 中间件
app.use(webpackDevMiddleware(complier))

app.listen(3000, () => {
  console.log('server is running')
})
