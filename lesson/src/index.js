// import './style.css'
// import './style1.css'

// console.log('hello world')

import _ from 'lodash'
import $ from 'jquery'

const dom = $('div')
dom.html(_.join(['Code', 'Pencil', ' ---']))

$('body').append(dom)
