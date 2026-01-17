/* ES Module 默认引入方式
import Header from './header.js'
import Sidebar from './sidebar.js'
import Content from './content.js'

CommonJS 模块引入规范
var Header = require('./header.js')
var Sidebar = require('./sidebar.js')
var Content = require('./content.js')
var avatar = require('./avatar.jpg') // 资源模块对图片进行了处理

console.log(avatar)

new Header()
new Sidebar()
new Content() */

import avatar from './avatar.jpg' // 资源模块对图片进行了处理

var img = new Image()
img.src = avatar

var root = document.getElementById('root')
root.append(img)
