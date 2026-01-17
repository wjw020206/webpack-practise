/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.js"
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
(module) {

eval("{function Content() {\n  var dom = document.getElementById('root')\n  var content = document.createElement('div')\n  content.innerText = 'content'\n  dom.append(content)\n}\n\nmodule.exports = Content\n\n\n//# sourceURL=webpack://lesson/./src/content.js?\n}");

/***/ },

/***/ "./src/header.js"
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
(module) {

eval("{function Header() {\n  var dom = document.getElementById('root')\n  var header = document.createElement('div')\n  header.innerText = 'header'\n  dom.append(header)\n}\n\nmodule.exports = Header\n\n\n//# sourceURL=webpack://lesson/./src/header.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("{// ES Module 默认引入方式\n// import Header from './header.js'\n// import Sidebar from './sidebar.js'\n// import Content from './content.js'\n\n// CommonJS 模块引入规范\nvar Header = __webpack_require__(/*! ./header.js */ \"./src/header.js\")\nvar Sidebar = __webpack_require__(/*! ./sidebar.js */ \"./src/sidebar.js\")\nvar Content = __webpack_require__(/*! ./content.js */ \"./src/content.js\")\n\nnew Header()\nnew Sidebar()\nnew Content()\n\n\n//# sourceURL=webpack://lesson/./src/index.js?\n}");

/***/ },

/***/ "./src/sidebar.js"
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
(module) {

eval("{function Sidebar() {\n  var dom = document.getElementById('root')\n  var sidebar = document.createElement('div')\n  sidebar.innerText = 'sidebar'\n  dom.append(sidebar)\n}\n\nmodule.exports = Sidebar\n\n\n//# sourceURL=webpack://lesson/./src/sidebar.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;