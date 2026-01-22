/**
 * @param {string} source 源代码文本
 * @returns
 */
module.exports = function (source) {
  const options = this.getOptions()

  const callback = this.async() // 声明一个异步操作

  setTimeout(() => {
    const result = source.replace('CodePencil', options.name)
    callback(null, result) // 调用刚才声明的异步操作，将源代码返回
  }, 1000)
}
