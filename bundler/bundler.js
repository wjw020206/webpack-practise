const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const babel = require('@babel/core')
const traverse = require('@babel/traverse').default

/** 模块分析
 * @param {string} filename 文件路径
 */
const moduleAnalyser = (filename) => {
  // 读取入口文件的内容
  const content = fs.readFileSync(filename, 'utf-8')

  // 将文件内容解析为 AST（抽象语法树），并使用字符串替换方便
  const ast = parser.parse(content, {
    sourceType: 'module', // 如果使用的是 ES6 模块，需要配置这个选项为 'module'
  })

  const dependencies = {}

  // 遍历 AST，
  traverse(ast, {
    // 当有 import 引入的语句时会执行该函数
    ImportDeclaration({ node }) {
      // 获取文件所在的目录
      const dirname = path.dirname(filename)

      // 导入语句的路径和入口文件所在的目录进行路径拼接（绝对路径）
      const newFile = './' + path.join(dirname, node.source.value)

      // 保存为相对路径（键）和绝对路径（值）的键值对对象
      dependencies[node.source.value] = newFile
    },
  })

  // 对 AST 进行转译，生成在浏览器上可以运行的代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  })

  return {
    filename,
    dependencies,
    code,
  }
}

/** 生成依赖图谱，存放所有模块的模块信息
 * @param {string} entry 入口文件路径
 */
const makeDependenciesGraph = (entry) => {
  // 分析入口模块
  const entryModule = moduleAnalyser(entry)

  const graphArray = [entryModule]

  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]

    // 获取入口文件的依赖
    const { dependencies } = item

    if (dependencies) {
      // 遍历入口文件的依赖进行遍历分析
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }

  const graph = {}

  // 转换依赖图谱的输出格式
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    }
  })

  return graph
}

/** 打包生成代码
 * @param {string} entry 入口文件路径
 */
const generateCode = (entry) => {
  console.log(makeDependenciesGraph(entry))

  const graph = JSON.stringify(makeDependenciesGraph(entry))

  return `(function(graph) {
    function require(module) {
      function localRequire(relativePath) {
        return require(graph[module].dependencies[relativePath])
      }
      var exports = {};
      (function(require, exports, code) {
        eval(code)
      })(localRequire, exports, graph[module].code)
      return exports;
    }
    require('${entry}')
  })(${graph})`
}

const code = generateCode('./src/index.js')
console.log(code)
