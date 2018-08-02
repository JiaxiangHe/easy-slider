/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/index.js":
/*!***********************!*\
  !*** ./demo/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");
/* harmony import */ var _src_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/index.scss */ "./src/index.scss");
/* harmony import */ var _src_index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_index_scss__WEBPACK_IMPORTED_MODULE_1__);




const test = new _src__WEBPACK_IMPORTED_MODULE_0__["default"]('.simple-carousel');
console.log(test);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleCarousel; });
function log(type = 'log', ...info) {
    if (this.config.debug) {
        console[type](info);
    }
}

/**
 * @const ATTRIBUTES
 * @description Collection of constant values for related data attributes of the module
 * @type {{CONTROLS: string, EXPANDED: string, HIDDEN: string}}
 */
const CLASSES = {
    CAROUSEL_WRAPPER: 'simple-carousel__wrapper',
    CAROUSEL_ITEM: 'simple-carousel__item',
    CAROUSEL_PAGINATION: 'simple-carousel__pagination'
};

class SimpleCarousel {
    constructor(selector = '.simple-carousel', config = {
        initialSlide: 0,
        debug: false,
        loop: false,
        effect: 'slide'
    }) {
        // parent element
        this.element = document.querySelector(selector);

        // properties
        this.config = config; // config
        this.currentIndex = this.config.initialSlide;
        this.total = null;
        this.slideWidth = null;

        // class
        this.elementStyle = window.getComputedStyle(this.element, null);
        this.wrapperStyle = null;

        // node
        this.wrapper = null;
        this.slides = null;
        this.pagination = null;
        this.next = null;
        this.prev = null;

        if (this.element) {
            this.init();
        } else {
            log.call(this, 'error', `wrong selector: '${selector}'`);
        }
    }

    init() {
        // cacheDom
        this.cacheDom();

        // prepare properties
        this.total = this.slides.length;
        this.slideWidth = this.element.clientWidth
            - parseFloat(this.elementStyle.getPropertyValue('padding-left'))
            - parseFloat(this.elementStyle.getPropertyValue('padding-right'));

        // init nodes
        switch (this.config.effect) {
            case 'slide':
            default:
                break;
        }
        this.slides.forEach((item) => {
            item.style.width = `${this.slideWidth}px`;
        });
    }

    goTo(index) {
        // if (index === this.currentIndex) {
        //     break;
        // }
        switch (this.config.effect) {
            case 'slide':
            default:
                this.wrapper.style.transform = `translateX(-${this.slideWidth * index}px)`;
                break;
        }
    }

    nextSlide() {
        const nextIndex = this.config.loop ? this.currentIndex - 1 % this.total : Math.max(this.currentIndex + 1, this.total);
        this.goTo(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.config.loop ? this.currentIndex + this.total - 1 % this.total : Math.max(this.currentIndex - 1, 0);
        this.goTo(prevIndex);
    }

    cacheDom() {
        this.wrapper = this.element.querySelector(`.${CLASSES.CAROUSEL_WRAPPER}`);
        this.slides = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_ITEM}`));
        this.pagination = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_PAGINATION}`));
        this.next = null;
        this.prev = null;
    }
}

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3M/MjMzOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTs7QUFFQTtBQUNBLGtCOzs7Ozs7Ozs7Ozs7O0FDTEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCx3REFBd0QsU0FBUztBQUNqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdCQUFnQjtBQUNsRCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsd0JBQXdCO0FBQ3RGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRCx5QkFBeUI7QUFDL0UsbUVBQW1FLHNCQUFzQjtBQUN6Rix1RUFBdUUsNEJBQTRCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDckdBLHVDIiwiZmlsZSI6ImRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgU2ltcGxlQ2Fyb3VzZWwgZnJvbSBcIi4uL3NyY1wiO1xuXG5pbXBvcnQgXCIuLi9zcmMvaW5kZXguc2Nzc1wiXG5cbmNvbnN0IHRlc3QgPSBuZXcgU2ltcGxlQ2Fyb3VzZWwoJy5zaW1wbGUtY2Fyb3VzZWwnKTtcbmNvbnNvbGUubG9nKHRlc3QpOyIsImZ1bmN0aW9uIGxvZyh0eXBlID0gJ2xvZycsIC4uLmluZm8pIHtcbiAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcbiAgICAgICAgY29uc29sZVt0eXBlXShpbmZvKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGNvbnN0IEFUVFJJQlVURVNcbiAqIEBkZXNjcmlwdGlvbiBDb2xsZWN0aW9uIG9mIGNvbnN0YW50IHZhbHVlcyBmb3IgcmVsYXRlZCBkYXRhIGF0dHJpYnV0ZXMgb2YgdGhlIG1vZHVsZVxuICogQHR5cGUge3tDT05UUk9MUzogc3RyaW5nLCBFWFBBTkRFRDogc3RyaW5nLCBISURERU46IHN0cmluZ319XG4gKi9cbmNvbnN0IENMQVNTRVMgPSB7XG4gICAgQ0FST1VTRUxfV1JBUFBFUjogJ3NpbXBsZS1jYXJvdXNlbF9fd3JhcHBlcicsXG4gICAgQ0FST1VTRUxfSVRFTTogJ3NpbXBsZS1jYXJvdXNlbF9faXRlbScsXG4gICAgQ0FST1VTRUxfUEFHSU5BVElPTjogJ3NpbXBsZS1jYXJvdXNlbF9fcGFnaW5hdGlvbidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZUNhcm91c2VsIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciA9ICcuc2ltcGxlLWNhcm91c2VsJywgY29uZmlnID0ge1xuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgIGVmZmVjdDogJ3NsaWRlJ1xuICAgIH0pIHtcbiAgICAgICAgLy8gcGFyZW50IGVsZW1lbnRcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gcHJvcGVydGllc1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZzsgLy8gY29uZmlnXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jb25maWcuaW5pdGlhbFNsaWRlO1xuICAgICAgICB0aGlzLnRvdGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zbGlkZVdpZHRoID0gbnVsbDtcblxuICAgICAgICAvLyBjbGFzc1xuICAgICAgICB0aGlzLmVsZW1lbnRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCk7XG4gICAgICAgIHRoaXMud3JhcHBlclN0eWxlID0gbnVsbDtcblxuICAgICAgICAvLyBub2RlXG4gICAgICAgIHRoaXMud3JhcHBlciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2xpZGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5jYWxsKHRoaXMsICdlcnJvcicsIGB3cm9uZyBzZWxlY3RvcjogJyR7c2VsZWN0b3J9J2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gY2FjaGVEb21cbiAgICAgICAgdGhpcy5jYWNoZURvbSgpO1xuXG4gICAgICAgIC8vIHByZXBhcmUgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnRvdGFsID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLnNsaWRlV2lkdGggPSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgICAgICAgIC0gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKSlcbiAgICAgICAgICAgIC0gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0JykpO1xuXG4gICAgICAgIC8vIGluaXQgbm9kZXNcbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbmZpZy5lZmZlY3QpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NsaWRlJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5zdHlsZS53aWR0aCA9IGAke3RoaXMuc2xpZGVXaWR0aH1weGA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdvVG8oaW5kZXgpIHtcbiAgICAgICAgLy8gaWYgKGluZGV4ID09PSB0aGlzLmN1cnJlbnRJbmRleCkge1xuICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgIC8vIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbmZpZy5lZmZlY3QpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NsaWRlJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3RoaXMuc2xpZGVXaWR0aCAqIGluZGV4fXB4KWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0U2xpZGUoKSB7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY29uZmlnLmxvb3AgPyB0aGlzLmN1cnJlbnRJbmRleCAtIDEgJSB0aGlzLnRvdGFsIDogTWF0aC5tYXgodGhpcy5jdXJyZW50SW5kZXggKyAxLCB0aGlzLnRvdGFsKTtcbiAgICAgICAgdGhpcy5nb1RvKG5leHRJbmRleCk7XG4gICAgfVxuXG4gICAgcHJldlNsaWRlKCkge1xuICAgICAgICBjb25zdCBwcmV2SW5kZXggPSB0aGlzLmNvbmZpZy5sb29wID8gdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnRvdGFsIC0gMSAlIHRoaXMudG90YWwgOiBNYXRoLm1heCh0aGlzLmN1cnJlbnRJbmRleCAtIDEsIDApO1xuICAgICAgICB0aGlzLmdvVG8ocHJldkluZGV4KTtcbiAgICB9XG5cbiAgICBjYWNoZURvbSgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0NMQVNTRVMuQ0FST1VTRUxfV1JBUFBFUn1gKTtcbiAgICAgICAgdGhpcy5zbGlkZXMgPSBBcnJheS5mcm9tKHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU0VTLkNBUk9VU0VMX0lURU19YCkpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSBBcnJheS5mcm9tKHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU0VTLkNBUk9VU0VMX1BBR0lOQVRJT059YCkpO1xuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9