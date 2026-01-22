class CopyrightWebpackPlugin {
  // 在构造函数中接收参数
  constructor(options) {
    // console.log(options)
  }

  // 调用插件时会触发 apply 方法
  /**
   *
   * @param {object} compiler webpack 的实例
   */
  apply(compiler) {
    // 在将资源输出到输出目录之前执行
    /* compiler.hooks.emit.tapAsync(
      'CopyrightWebpackPlugin',
      (compilation, callback) => {
        // 打包生成的内容放在 compilation.assets 中
        // console.log(compilation.assets)

        // Webpack 4 版本的写法向打包生成的内容中添加版权信息
        const content = 'copyright by CodePencil'
        compilation.assets['copyright.txt'] = {
          source: function () {
            return content
          },
          size: function () {
            return content.length
          },
        }

        // 使用 tapAsync 一定要调用 callback
        callback()
      },
    ) */

    compiler.hooks.thisCompilation.tap(
      'CopyrightWebpackPlugin',
      (compilation) => {
        // 使用 processAssets 钩子替代 emit 钩子
        compilation.hooks.processAssets.tap(
          {
            name: 'CopyrightWebpackPlugin',
            // 选择合适的阶段，STAGE_ADDITIONAL 用于添加额外资源
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          (assets) => {
            debugger
            const content = 'copyright by CodePencil'

            // 使用 RawSource 创建新资源
            compilation.emitAsset(
              'copyright.txt',
              new compiler.webpack.sources.RawSource(content),
            )
          },
        )
      },
    )
  }
}

module.exports = CopyrightWebpackPlugin
