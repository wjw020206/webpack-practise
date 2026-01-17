// ES Module 默认引入方式
// import Header from './header.js'
// import Sidebar from './sidebar.js'
// import Content from './content.js'

// CommonJS 模块引入规范
var Header = require('./header.js')
var Sidebar = require('./sidebar.js')
var Content = require('./content.js')

new Header()
new Sidebar()
new Content()
