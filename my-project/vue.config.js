const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
  },
})
