// 这里不能使用箭头函数，因为 Webpack 在调用 loader 时会对 this 指向进行变更
// 变更之后才能用 this 中的一些方法
/**
 * @param {string} source 源代码文本
 * @returns
 */
module.exports = function (source) {
  // const options = this.getOptions() // 将字符串的查询参数解析为原始值
  // console.log(options)

  // return source.replace('CodePencil', this.query.name) // 可以从 this.query 中读取 options 配置的参数

  // const result = source.replace('CodePencil', options.name)
  // this.callback(null, result) // 等价于 return，将结果返回，但可以携带 SourceMap 和错误信息

  return source.replace('Pencil', 'World')
}
