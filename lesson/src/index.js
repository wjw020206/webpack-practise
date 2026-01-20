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

/* import avatar from './avatar.jpg' // 资源模块对图片进行了处理
import createAvatar from './createAvatar'
// import './index.scss' // 全局引入样式，样式会被插入在 head 的 style 标签中
import * as style from './index.scss' // css-loader 7.0 开始的写法，一定要 * as 写法导入

createAvatar()

var img = new Image()
img.src = avatar
img.classList.add(style.avatar)

var root = document.getElementById('root')
root.append(img) */

// import './index.scss'

// var root = document.getElementById('root')

// root.innerHTML = '<div class="iconfont icon-home"></div>'

// import './index.css'

// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function () {
//   var div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

// import counter from './counter'
// import number from './number'

// counter()
// number()

// // 配置 JS 模块的 HMR 刷新
// // 当 loader 中没有内置 HMR 的相关配置时，需要编写如下代码来支持 HMR
// // 判断当前模块的 HMR 是否开启
// if (module.hot) {
//   // 监听相关的依赖，更新时触发回调
//   module.hot.accept('./number', () => {
//     document.body.removeChild(document.getElementById('number'))
//     number()
//   })
// }

// const arr = [new Promise(() => {}), new Promise(() => {})]

// arr.map((item) => {
//   console.log(item)
// })

// import { createRoot } from "react-dom/client";

// function App() {
//   return <div>Hello World</div>;
// }

// createRoot(document.getElementById("root")).render(<App />);

// Tree Shaking 只支持 ES Module 引入方式，
// import { add } from './math.js'

// add(1, 7)

// import _ from 'lodash'

// console.log(_.join(['a', 'b', 'c'], '***'))

function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['Code', 'Pencil'], '-')
    return element
  })
}

getComponent().then((element) => {
  document.body.appendChild(element)
})
