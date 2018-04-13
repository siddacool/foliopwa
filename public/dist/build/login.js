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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "public/dist/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = exports.Router = exports.DataComponent = exports.Component = undefined;

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

var _DataComponent = __webpack_require__(6);

var _DataComponent2 = _interopRequireDefault(_DataComponent);

var _Router = __webpack_require__(7);

var _Router2 = _interopRequireDefault(_Router);

var _utils = __webpack_require__(12);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _Component2.default;
exports.DataComponent = _DataComponent2.default;
exports.Router = _Router2.default;
exports.utils = _utils2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocationSet = __webpack_require__(10);

var _hashLocationSet2 = _interopRequireDefault(_hashLocationSet);

var _hashLocationGet = __webpack_require__(11);

var _hashLocationGet2 = _interopRequireDefault(_hashLocationGet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loc() {
  var originalHash = location.hash;
  var path = originalHash;
  var search = '';
  var query = '';

  if (path.includes('?')) {
    var searchQuery = path.split('?');
    path = searchQuery[0];
    search = searchQuery[1].replace(/\//g, '');

    if (search !== '') {
      var obj = {};
      var filterString = search.split('&');

      for (var i = 0; i < filterString.length; i++) {
        var splitString = filterString[i].split('=');
        var field = splitString[0];
        var value = splitString[1];

        obj[field] = value;
      }
      query = obj;
    }
  }

  if (path.endsWith('/') && !path.endsWith('#/')) {
    var pathSlice = path.slice(0, -1);

    path = pathSlice.replace('#', '');
  } else {
    path = path.replace('#', '');
  }

  return {
    hash: originalHash.replace('#', ''),
    path: path,
    search: search,
    query: query,
    set: _hashLocationSet2.default,
    get: _hashLocationGet2.default
  };
}

var hashLocation = loc;

exports.default = hashLocation;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createElement(str, domrDataId) {
  var div = document.createElement('div');
  div.innerHTML = str;
  var container = document.createDocumentFragment();
  for (var i = 0; i < div.childNodes.length; i++) {
    var node = div.childNodes[i].cloneNode(true);
    container.appendChild(node);
  }

  if (domrDataId) {
    container.childNodes[1].setAttribute('data-domr-id', domrDataId);
  }
  return container.childNodes[1].outerHTML;
}

exports.default = createElement;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function Lookup(elmId) {
  var targetSelector = document.querySelector("[data-domr-id=\"" + elmId + "\"]");

  if (targetSelector) {
    return targetSelector;
  }
}

exports.default = Lookup;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomizer() {
  var stringLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;

  return Math.random().toString(36).substr(2, stringLength);
}

exports.default = randomizer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = __webpack_require__(2);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(3);

var _lookup2 = _interopRequireDefault(_lookup);

var _randomizer = __webpack_require__(4);

var _randomizer2 = _interopRequireDefault(_randomizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  parent: document.getElementById('wrapper'),
  dom: '\n    <div>\n      Domr Component\n    </div>\n  '
};

var _class = function () {
  function _class() {
    var _this = this;

    var domrid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'domr-component';

    _classCallCheck(this, _class);

    this.parentDefault = defaults.parent;
    this.domContent = defaults.dom;
    this.createElement = _createElement2.default;
    this.domrid = domrid + '-' + (0, _randomizer2.default)(7);
    this.target = function () {
      return (0, _lookup2.default)(_this.domrid);
    };
    this.handlingParent = this.parentDefault || document.querySelector('body');
  }

  _createClass(_class, [{
    key: 'dom',
    value: function dom() {
      return '';
    }
  }, {
    key: 'events',
    value: function events() {}
  }, {
    key: 'deligateEvents',
    value: function deligateEvents(childen, eventName, eventAction) {
      this.handlingParent.addEventListener(eventName, function (e) {
        if (e.target && e.target.matches(childen)) {
          eventAction(e.target, e);
        }
      });
    }
  }, {
    key: 'addEvent',
    value: function addEvent(eventName, eventAction) {
      if (this.target()) {
        this.addEventOn('[data-domr-id="' + this.domrid + '"]', eventName, eventAction);
      }
    }
  }, {
    key: 'addEventOn',
    value: function addEventOn(childen, eventName, eventAction) {
      var _this2 = this;

      if (eventName instanceof Array && !eventAction) {
        var eventList = eventName;

        eventList.forEach(function (eventConfig) {
          _this2.deligateEvents(childen, eventConfig[0], eventConfig[1]);
        });
      } else {
        this.deligateEvents(childen, eventName, eventAction);
      }
    }
  }, {
    key: 'delay',
    value: function delay() {}
  }, {
    key: 'delayedContent',
    value: function delayedContent() {
      var _this3 = this;

      setTimeout(function () {
        if (_this3.target()) {
          _this3.delay();
        }
      }, 50);
    }
  }, {
    key: 'optimizedDom',
    value: function optimizedDom() {
      this.events();
      return this.createElement(this.dom(), this.domrid);
    }
  }, {
    key: 'render',
    value: function render() {
      this.delayedContent();
      return this.optimizedDom();
    }
  }, {
    key: 'addTo',
    value: function addTo(parent) {
      if (parent) {
        parent.insertAdjacentHTML('beforeend', this.optimizedDom());
        this.delayedContent();
      } else {
        console.warn('parent not found');
      }
    }
  }, {
    key: 'addFromStartTo',
    value: function addFromStartTo(parent) {
      if (parent) {
        parent.insertAdjacentHTML('afterbegin', this.optimizedDom());
        this.delayedContent();
      } else {
        console.warn('parent not found');
      }
    }
  }, {
    key: 'addBefore',
    value: function addBefore(sibling) {
      if (sibling) {
        sibling.insertAdjacentHTML('beforebegin', this.optimizedDom());
        this.delayedContent();
      } else {
        console.error('sibling not found');
      }
    }
  }, {
    key: 'addAfter',
    value: function addAfter(sibling) {
      if (sibling) {
        sibling.insertAdjacentHTML('afterend', this.optimizedDom());
        this.delayedContent();
      } else {
        console.error('sibling not found');
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(sibling) {
      if (sibling) {
        var parent = sibling.parentElement;

        if (parent) {
          sibling.insertAdjacentHTML('afterend', this.optimizedDom());
          parent.removeChild(sibling);
          this.delayedContent();
        } else {
          console.warn('sibling has no parentElement');
        }
      } else {
        console.warn('sibling not found');
      }
    }
  }, {
    key: 'replaceContentOf',
    value: function replaceContentOf(parent) {
      if (parent) {
        var thisParent = parent;
        thisParent.innerHTML = this.optimizedDom();
        this.delayedContent();
      } else {
        console.warn('parent not found');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomizer = __webpack_require__(4);

var _randomizer2 = _interopRequireDefault(_randomizer);

var _createElement = __webpack_require__(2);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(3);

var _lookup2 = _interopRequireDefault(_lookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(api) {
    var _this = this;

    var domrid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-component';

    _classCallCheck(this, _class);

    this.api = api;
    this.domrid = domrid + '-' + (0, _randomizer2.default)(7);
    this.createElement = _createElement2.default;
    this.target = function () {
      return (0, _lookup2.default)(_this.domrid);
    };
  }

  _createClass(_class, [{
    key: 'dom',
    value: function dom(elm) {}
  }, {
    key: 'loadApi',
    value: function loadApi(parent, param) {
      var _this2 = this;

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', this.api, true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            var responseText = xmlhttp.responseText.trim();
            if (responseText.length) {
              if (responseText.charAt(0) === '[' || responseText.charAt(0) === '{') {
                var obj = JSON.parse(responseText);
                var makeElement = function makeElement(elm) {
                  return _this2.createElement(_this2.dom(elm), _this2.domrid);
                };
                var ajaxContent = '';

                if (responseText.charAt(0) === '[') {
                  ajaxContent = '' + obj.map(function (elm) {
                    return '' + makeElement(elm);
                  }).join('');
                } else if (responseText.charAt(0) === '{') {
                  ajaxContent = makeElement(obj);
                }

                if (param === 'replaceContentOf') {
                  parent.innerHTML = ajaxContent;
                } else if (param === 'addTo') {
                  parent.insertAdjacentHTML('beforeend', ajaxContent);
                } else if (param === 'addFromStartTo') {
                  parent.insertAdjacentHTML('afterbegin', ajaxContent);
                } else if (param === 'addBefore') {
                  parent.insertAdjacentHTML('beforebegin', ajaxContent);
                } else if (param === 'addAfter') {
                  parent.insertAdjacentHTML('afterend', ajaxContent);
                } else {
                  console.log(obj);
                }

                _this2.events();
                _this2.delayedContent(obj);
              } else {
                console.warn('not a suitable API');
              }
            } else {
              console.warn('Empty API');
            }
          }
        }
      };
      xmlhttp.send(null);
    }
  }, {
    key: 'delay',
    value: function delay(obj) {}
  }, {
    key: 'delayedContent',
    value: function delayedContent(obj) {
      this.delay(obj);
    }
  }, {
    key: 'events',
    value: function events() {}
  }, {
    key: 'eventMain',
    value: function eventMain(parent, childen, eventName, eventAction) {
      var child = parent.querySelectorAll(childen);

      var _loop = function _loop(i) {
        child[i].addEventListener(eventName, function (e) {
          eventAction(child[i], e);
        });
      };

      for (var i = 0; i < child.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'eventGrouping',
    value: function eventGrouping(parent, childen, eventName, eventAction) {
      var _this3 = this;

      if (eventName instanceof Array && !eventAction) {
        var eventList = eventName;

        eventList.forEach(function (eventConfig) {
          _this3.eventMain(parent, childen, eventConfig[0], eventConfig[1]);
        });
      } else {
        this.eventMain(parent, childen, eventName, eventAction);
      }
    }
  }, {
    key: 'addEvent',
    value: function addEvent(eventName, eventAction) {
      this.eventGrouping(document, '[data-domr-id="' + this.domrid + '"]', eventName, eventAction);
    }
  }, {
    key: 'addEventOn',
    value: function addEventOn(childen, eventName, eventAction) {
      var allObj = document.querySelectorAll('[data-domr-id="' + this.domrid + '"]');

      for (var i = 0; i < allObj.length; i++) {
        this.eventGrouping(allObj[i], childen, eventName, eventAction);
      }
    }
  }, {
    key: 'logData',
    value: function logData() {
      this.loadApi();
    }
  }, {
    key: 'replaceContentOf',
    value: function replaceContentOf(parent) {
      this.loadApi(parent, 'replaceContentOf');
    }
  }, {
    key: 'addTo',
    value: function addTo(parent) {
      this.loadApi(parent, 'addTo');
    }
  }, {
    key: 'addFromStartTo',
    value: function addFromStartTo(parent) {
      this.loadApi(parent, 'addFromStartTo');
    }
  }, {
    key: 'addBefore',
    value: function addBefore(sibling) {
      if (sibling) {
        this.loadApi(sibling, 'addBefore');
      } else {
        console.error('sibling not found');
      }
    }
  }, {
    key: 'addAfter',
    value: function addAfter(sibling) {
      if (sibling) {
        this.loadApi(sibling, 'addAfter');
      } else {
        console.error('sibling not found');
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(sibling) {
      if (sibling) {
        var parent = sibling.parentElement;

        if (parent) {
          this.addAfter(sibling);
          parent.removeChild(sibling);
        } else {
          console.warn('sibling has no parentElement');
        }
      } else {
        console.error('sibling not found');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addView = __webpack_require__(8);

var _addView2 = _interopRequireDefault(_addView);

var _hashLocation = __webpack_require__(1);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filterRoutes = function filterRoutes(routes) {
  var arr = [];
  routes.forEach(function (route) {
    if (route.path && route.view) {
      arr.push(route);
    }
  });

  return arr;
};
var defaults = {
  routes: [],
  config: {
    redirectDefault: false,
    refreshPage: false,
    clearLog: false
  }
};

var _class = function () {
  function _class() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.routes;
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.config;

    _classCallCheck(this, _class);

    this.routes = filterRoutes(routes);
    this.redirectDefault = config.redirectDefault || true;
    this.refreshPage = config.refreshPage || false;
    this.clearLog = config.clearLog || false;
    this.addView = _addView2.default;
  }

  _createClass(_class, [{
    key: 'showRoutes',
    value: function showRoutes() {
      console.log(this.routes);
    }
  }, {
    key: 'reloadOnHashChange',
    value: function reloadOnHashChange() {
      var _this = this;

      addEventListener('hashchange', function (e) {
        if (_this.clearLog) {
          console.API;
          if (typeof console._commandLineAPI !== 'undefined') {
            console.API = console._commandLineAPI;
          } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
            console.API = console._inspectorCommandLineAPI;
          } else if (typeof console.clear !== 'undefined') {
            console.API = console;
          }

          console.API.clear();
        }

        if (_this.refreshPage) {
          location.reload();
        } else {
          _this.start();
          e.stopImmediatePropagation();
        }
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var loc = (0, _hashLocation2.default)();
      var locPath = loc.path;
      var candidate = void 0;

      if (locPath === '') {
        location.hash = '#/';
      }

      this.routes.forEach(function (route) {
        var path = route.path;
        if (path.endsWith('/') && path !== '/') {
          path = path.slice(0, -1);
        }

        var routeDataVal = [];
        var routePathMod = path.replace(/([:*])(\w+)/g, function (full, dots, name) {
          routeDataVal.push(name);
          return '([^/]+)';
        }) + '(?:/|$)';
        var routePathModRegEx = locPath.match(new RegExp(routePathMod));

        if (routePathModRegEx) {
          var params = routePathModRegEx.slice(1, routePathModRegEx.length).reduce(function (params, value, index) {
            if (params === null) params = {};
            params[routeDataVal[index]] = value;
            return params;
          }, null);

          route.metadata = params || '';
          route.query = loc.query;
          candidate = route;
        }
      });

      if (candidate) {
        this.addView(candidate);
      } else {
        var routeDefault = this.routes.find(function (o) {
          return o.isDefault === true;
        });
        if (this.redirectDefault && routeDefault) {
          this.addView(routeDefault);
        } else {
          console.error('Page Not Found');
        }
      }

      this.reloadOnHashChange();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneObject = __webpack_require__(9);

var _cloneObject2 = _interopRequireDefault(_cloneObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addView(candidate) {
  var view = candidate.view;
  var skiplist = ['view'];
  var routeData = (0, _cloneObject2.default)(candidate, skiplist);

  if (candidate && view) {
    if (typeof view === 'function') {
      view(routeData);
    } else {
      view;
    }
  }
}

exports.default = addView;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultSkipList = ['view'];

function findInArr(arr, itm) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === itm) {
      return true;
    }
  }
}

function cloneObject(obj) {
  var skipList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSkipList;

  var newObj = {};

  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    var skip = findInArr(skipList, key);

    if (!skip) {
      newObj[key] = value;
    }
  });

  return newObj;
}

exports.default = cloneObject;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(1);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setHash(option) {
  var hash = option;
  if (!hash.startsWith('#')) {
    hash = '#' + hash;
  }

  return hash;
}

function setPath(option) {
  var loc = (0, _hashLocation2.default)();
  var searchQuery = loc.search;
  var path = option;

  if (path.startsWith('#')) {
    path = path.slice(0, -1);
  }

  if (searchQuery) {
    if (!path.endsWith('/')) {
      path = path + '/';
    }

    path = path + '?' + searchQuery;
  }

  path = setHash(path);
  return path;
}

function setSearch(option) {
  var search = option;
  var loc = (0, _hashLocation2.default)();
  var path = loc.path;

  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (!search.startsWith('?')) {
    search = '?' + search;
  }

  search = setHash(path + '/' + search);

  return search;
}

function loopSearchQuery(obj) {
  var arr = [];
  for (var key in obj) {
    arr.push(key + '=' + obj[key]);
  }

  return '?' + arr.join('&');
}

function setQuery(obj) {
  var searchQuery = loopSearchQuery(obj);
  var query = setSearch(searchQuery);

  return query;
}

function redirectTo(hash) {
  location.hash = hash;
}

function hashLocationSet(field, opt) {
  var setField = field;
  var option = opt;
  var link = void 0;

  switch (setField) {
    case 'search':
      link = setSearch(option);
      break;
    case 'query':
      link = setQuery(option);
      break;
    case 'path':
      link = setPath(option);
      break;
    case 'hash':
      link = setHash(option);
      break;
  }

  if (link) {
    redirectTo(link);
  } else {
    console.error('incorrect set location params');
  }
}

exports.default = hashLocationSet;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(1);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hashLocationGet(field) {
  var loc = (0, _hashLocation2.default)();
  var thisField = loc[field];

  if (thisField) {
    return thisField;
  } else {
    console.error('incorrect get location params');
  }
}

exports.default = hashLocationGet;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(1);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  hashLocation: _hashLocation2.default
};

exports.default = utils;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _clearFormatting = __webpack_require__(19);

var _clearFormatting2 = _interopRequireDefault(_clearFormatting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrA.Component {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.name = name;
    this.type = config.type || 'text';
    this.title = config.title || config.placeholder || '';
    this.placeholder = config.placeholder || config.title || '';
    this.example = config.example || '';
    this.value = config.value || '';
    this.label_class = config.labelClass || '';
  }

  dom() {
    return '\n      <div class="' + this.label_class + ' no-input no-input--' + this.type + '">\n        <div class="text" data-name="' + this.name + '" lang="clusterf*ck" spellcheck="false" contenteditable="true">' + this.value + '</div>\n        <span class="placeholder">' + this.placeholder + '</span>\n        <span class="example">' + this.example + '</span>\n        <span class="title">' + this.title + '</span>\n        <span class="backdrop"></span>\n        <span class="border"></span>\n      </div>\n    ';
  }

  events() {
    this.addEventOn('[data-name=\'' + this.name + '\']', 'paste', function (self, e) {
      (0, _clearFormatting2.default)(self, e);
    });
  }
};

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var firebaseConfig = {
  apiKey: 'AIzaSyByLhhClB2fpoApnZWz0RFhTz6NxVYMLes',
  authDomain: 'sid-mangela-folio-db.firebaseapp.com',
  databaseURL: 'https://sid-mangela-folio-db.firebaseio.com',
  projectId: 'sid-mangela-folio-db',
  storageBucket: 'sid-mangela-folio-db.appspot.com',
  messagingSenderId: '803380125475'
};

exports.default = firebaseConfig;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = exports.Password = exports.Text = undefined;

var _Text = __webpack_require__(15);

var _Text2 = _interopRequireDefault(_Text);

var _Password = __webpack_require__(41);

var _Password2 = _interopRequireDefault(_Password);

var _TextArea = __webpack_require__(42);

var _TextArea2 = _interopRequireDefault(_TextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Text = _Text2.default;
exports.Password = _Password2.default;
exports.TextArea = _TextArea2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function clearFormatting(self, e) {
  e.preventDefault();
  var thisSelf = self;
  var clipboard = e.clipboardData || window.clipboardData;
  var filteredText = clipboard.getData('Text');

  thisSelf.textContent = filteredText;
}

exports.default = clearFormatting;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function scrollAction(target) {
  var previous = window.scrollY;
  addEventListener('scroll', function () {
    var main = target.querySelector('.scroll');
    var head = main.querySelector('.scroll__head');
    var topBtn = main.querySelector('.scroll__top-btn');
    var offSet = head.offsetTop + 30;

    if (window.scrollY >= offSet) {
      window.scrollY > previous ? topBtn.classList.remove('active') : topBtn.classList.add('active');
      previous = window.scrollY;

      if (!main.classList.contains('scroll--fixed')) {
        main.classList.add('scroll--fixed');
      }
    } else {
      if (main.classList.contains('scroll--fixed')) {
        main.classList.remove('scroll--fixed');
        topBtn.classList.remove('active');
      }
    }
  });
}

exports.default = scrollAction;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor(fire) {
    super();
    this.firebase = fire;
  }

  dom() {
    var firebaseAuth = this.firebase.auth();

    return '\n     <header>\n        <div class="logo">\n          <img src="./public/dist/favicon/favicon.png" alt="Logo" />\n        </div>\n        <div class="account">\n          <a href="#" class="account__pop"><svg role="img" class="icon"><use xlink:href="#icon-Actions-05"></use></svg></a>\n          <div class="account__drop">\n            <div class="account__welcome">Hola ' + firebaseAuth.currentUser.email + '</div>\n            <a href="#" class="btn btn--primary account__logout">Logout</a>\n          </div>\n          <div class="account-cloak"></div>\n        </div>\n     </header>\n    ';
  }

  events() {
    var _this = this;

    this.addEventOn('.account__logout', 'click', function (self, e) {
      e.preventDefault();
      _this.firebase.auth().signOut();
    });

    this.addEventOn('.account__pop', 'click', function (self, e) {
      e.preventDefault();
      var parent = self.parentElement;
      var accountDrop = parent.querySelector('.account__drop');

      accountDrop.classList.add('account__drop--active');
    });

    this.addEventOn('.account-cloak', 'click', function (self, e) {
      var parent = self.parentElement;
      var accountDrop = parent.querySelector('.account__drop');

      accountDrop.classList.remove('account__drop--active');
    });
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor() {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scroll-to-top';

    super();
    this.classNames = classNames;
  }

  dom() {
    return '\n     <a href="" class="' + this.classNames + ' scroll__top-btn"><svg role="img" class="icon"><use xlink:href="#icon-Design-14"></use></svg></a>\n    ';
  }

  events() {
    this.addEventOn('.scroll__top-btn', 'click', function (self, e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }
};

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(37);

__webpack_require__(49);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domrA = __webpack_require__(0);

var _routes = __webpack_require__(38);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _domrA.Router(_routes2.default, {
  redirectDefault: true
});

router.start();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdminPanelHomeView = __webpack_require__(39);

var _AdminPanelHomeView2 = _interopRequireDefault(_AdminPanelHomeView);

var _AdminPanelAlbumFolderView = __webpack_require__(46);

var _AdminPanelAlbumFolderView2 = _interopRequireDefault(_AdminPanelAlbumFolderView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  name: 'Home Page',
  path: '/',
  view: _AdminPanelHomeView2.default,
  isDefault: true
}, {
  name: 'Album',
  path: '/album/:id',
  view: _AdminPanelAlbumFolderView2.default
}, {
  name: 'Image',
  path: '/image/:id',
  view: console.log('called')
}, {
  name: 'Create',
  path: '/create',
  view: console.log('called')
}];

exports.default = routes;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = firebase;

  if (!fire.apps.length) {
    fire.initializeApp(config);
  }

  wrapper.innerHTML = 'waiting';

  fire.auth().onAuthStateChanged(function (fireUser) {
    if (fireUser) {
      var streamType = 'album';
      if (data.query && data.query.stream) {
        streamType = data.query.stream;
      }
      var stream = new _AdminPanelStreamContainer2.default(fire, streamType);
      wrapper.innerHTML = stream.render();
    } else {
      var login = new _AdminPanelLoginContainer2.default(fire);
      wrapper.innerHTML = login.render();
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(17);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelLoginContainer = __webpack_require__(40);

var _AdminPanelLoginContainer2 = _interopRequireDefault(_AdminPanelLoginContainer);

var _AdminPanelStreamContainer = __webpack_require__(43);

var _AdminPanelStreamContainer2 = _interopRequireDefault(_AdminPanelStreamContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _NoInput = __webpack_require__(18);

exports.default = class extends _domrA.Component {
  constructor(fire) {
    super();
    this.firebase = fire;
  }

  dom() {
    var email = new _NoInput.Text('login-email', {
      title: 'Email',
      placeholder: 'Enter Your Email',
      example: 'yourid@somemail.com',
      labelClass: 'login__email'
    });

    var password = new _NoInput.Password('login-password', {
      title: 'Password',
      placeholder: 'Enter Your Password',
      labelClass: 'login__password'
    });

    return '\n      <div class="login">\n        <div class="login__well">\n          ' + email.render() + '\n          ' + password.render() + '\n          <a href="#" class="btn btn--primary login__login">Login</a>\n        </div>\n      </div>\n    ';
  }

  events() {
    var _this = this;

    this.addEventOn('.login__login', 'click', function (self, e) {
      e.preventDefault();
      var parent = self.parentElement;
      var email = parent.querySelector('[data-name="login-email"]').textContent.trim();
      var password = parent.querySelector('[data-name="login-password"]').textContent.trim();

      var auth = _this.firebase.auth();

      var promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(function (msg) {
        console.log(msg.message);
      });
    });
  }

  delay() {
    var thisSelf = this.target();
    var email = thisSelf.querySelector('[data-name="login-email"]');

    email.focus();
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(15);

var _Text2 = _interopRequireDefault(_Text);

var _clearFormatting = __webpack_require__(19);

var _clearFormatting2 = _interopRequireDefault(_clearFormatting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _Text2.default {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super(name, config);
    this.type = 'password';
  }

  events() {
    this.addEventOn('[data-name=\'' + this.name + '\']', 'paste', function (self, e) {
      (0, _clearFormatting2.default)(self, e);
    });
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(15);

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _Text2.default {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super(name, config);
    this.type = 'text-area';
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _scrollAction = __webpack_require__(20);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _AdminPanelHeader = __webpack_require__(21);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(22);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumThumb = __webpack_require__(44);

var _AdminPanelAlbumThumb2 = _interopRequireDefault(_AdminPanelAlbumThumb);

var _AdminPanelImageThumb = __webpack_require__(45);

var _AdminPanelImageThumb2 = _interopRequireDefault(_AdminPanelImageThumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = { AdminPanelAlbumThumb: _AdminPanelAlbumThumb2.default, AdminPanelImageThumb: _AdminPanelImageThumb2.default };

function dynamicClass(name) {
  return classes[name];
}

exports.default = class extends _domrA.Component {
  constructor(fire, streamType) {
    super();
    this.firebase = fire;
    this.stream_type = streamType;
    this.db_ref_object = this.firebase.database().ref();
  }

  dom() {
    var header = new _AdminPanelHeader2.default(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');

    return '\n      <div class="stream-main-container">\n        ' + header.render() + '\n        <div class="stream scroll">\n          <div class="tab">\n            <div class="tab__head scroll__head">\n              <div class="container tab__head__container">\n                <a href="#/?stream=album" class="tab__pick stream__pick" data-tab-pick="album">Albums</a>\n                <a href="#/?stream=image" class="tab__pick stream__pick" data-tab-pick="image">Images</a>\n              </div>\n            </div>\n            <div class="tab__body">\n              <div class="container tab__body__container">\n              </div>\n            </div>\n          </div>\n          ' + topButton.render() + '\n        </div>\n      </div>\n    ';
  }

  delay() {
    var _this = this;

    var thisSelf = this.target();
    var tabBody = thisSelf.querySelector('.tab__body__container');
    var tabPick = thisSelf.querySelector('[data-tab-pick="' + this.stream_type + '"]');
    tabPick.classList.add('tab__pick--active');
    this.db_ref_object.once('value', function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;
        if (content[_this.stream_type + '_id']) {
          var className = 'AdminPanel' + (_this.stream_type[0].toUpperCase() + _this.stream_type.slice(1)) + 'Thumb';
          var Thumb = dynamicClass(className);
          var thumb = new Thumb(content, _this.db_ref_object);
          thumb.addTo(tabBody);
        }
      });
    });

    (0, _scrollAction2.default)(thisSelf);
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var dbRefObject = arguments[1];

    super();
    this.content = content;
    this.db_ref_object = dbRefObject;
    this.name = this.content.name || '';
    this.description = this.content.description || '';
    this.photos_list = this.content.photos_list || [];
  }

  dom() {
    return '\n     <li data-key="' + this.content.key + '" class="thumb thumb--album">\n      <a href="#/album/' + this.content.album_id + '" data-id="' + this.content.album_id + '">\n        <div class="img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" /></div>\n        <div class="name"><span>' + this.name + '</span></div>\n      </a>\n     </li>\n    ';
  }

  delay() {
    var _this = this;

    var thisSelf = this.target();
    var img = thisSelf.querySelector('img');

    if (this.content.cover_pic) {
      this.db_ref_object.once('value', function (snap) {
        var valueSnap = snap.val();
        Object.keys(valueSnap).forEach(function (key) {
          var content = valueSnap[key];
          content.key = key;
          if (content.image_id && content.image_id === _this.content.cover_pic) {
            img.src = content.img.thumb_small;
            img.setAttribute('data-src', content.img.thumb_medium);
          }
        });
      }).then(function () {
        setTimeout(function () {
          var dataSrc = img.getAttribute('data-src');
          img.src = dataSrc;
        }, 1500);
      });
    }
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    super();
    this.content = content;
    this.name = this.content.name || '';
    this.description = this.content.description || '';
  }

  dom() {
    return '\n     <li data-key="' + this.content.key + '" class="thumb thumb--image">\n      <a href="#/image/' + this.content.image_id + '" data-id="' + this.content.image_id + '">\n        <div class="img"><img src="' + this.content.img.thumb_small + '" data-src="' + this.content.img.thumb_medium + '" alt="" /></div>\n      </a>\n     </li>\n    ';
  }

  delay() {
    var thisSelf = this.target();
    var img = thisSelf.querySelector('img');
    var dataSrc = img.getAttribute('data-src');

    setTimeout(function () {
      img.src = dataSrc;
    }, 1500);
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = firebase;

  if (!fire.apps.length) {
    fire.initializeApp(config);
  }

  wrapper.innerHTML = 'waiting';

  fire.auth().onAuthStateChanged(function (fireUser) {
    if (fireUser) {
      var albumFolder = new _AdminPanelAlbumFolderContainer2.default(fire, data.metadata.id);
      wrapper.innerHTML = albumFolder.render();
    } else {
      location.hash = '#/';
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(17);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelAlbumFolderContainer = __webpack_require__(47);

var _AdminPanelAlbumFolderContainer2 = _interopRequireDefault(_AdminPanelAlbumFolderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _scrollAction = __webpack_require__(20);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _NoInput = __webpack_require__(18);

var _AdminPanelHeader = __webpack_require__(21);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(22);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumFolderGroup = __webpack_require__(48);

var _AdminPanelAlbumFolderGroup2 = _interopRequireDefault(_AdminPanelAlbumFolderGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrA.Component {
  constructor(fire, albumId) {
    super();
    this.firebase = fire;
    this.album_id = albumId;
    this.db_ref_object = this.firebase.database().ref();
  }

  dom() {
    var header = new _AdminPanelHeader2.default(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');

    return '\n      <div class="album-folder-main-container">\n        ' + header.render() + '\n        <div class="album-folder scroll">\n          <div class="album-folder__head scroll__head">\n            <div class="container album-folder__head__container">\n              <a href="#/?stream=album" class="back-button"><svg role="img" class="icon"><use xlink:href="#icon-Design-12"></use></svg><span>Back</span></a>\n              <span class="album-name"></span>\n              <a href="#" class="btn btn--primary edit-button">Edit Album</a>\n              <div class="decision">\n                <a href="#" class="btn btn--primary save-button">Save</a>\n                <a href="#" class="btn cancel-button">Cancel</a>\n              </div>\n            </div>\n          </div>\n          <div class="album-folder__body">\n            <div class="container album-folder__body__container">...</div>\n          </div>\n          ' + topButton.render() + '\n        </div>\n      </div>\n    ';
  }

  events() {
    var _this = this;

    this.addEventOn('.edit-button', 'click', function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement;
      var folder = head.parentElement;

      if (folder.hasAttribute('data-key')) {
        var name = folder.querySelector('[data-name="album-name-edit"]');
        var description = folder.querySelector('[data-name="album-description-edit"]');
        var displayName = folder.querySelector('.info--display__name').textContent.trim();
        var displayDescription = folder.querySelector('.info--display__description').textContent.trim();
        var displayIsSpecial = folder.querySelector('input[name="is-album-special-display"]:checked');
        var isSpecial = folder.querySelector('.info--edit').querySelector('input[value="' + displayIsSpecial.value + '"]');
        folder.classList.add('edit');

        name.textContent = displayName;
        description.textContent = displayDescription;
        isSpecial.checked = true;
      }
    });

    this.addEventOn('.save-button', 'click', function (self, e) {
      e.preventDefault();
      var thisSelf = self;
      var head = thisSelf.parentElement.parentElement.parentElement;
      var folder = head.parentElement;
      var cancel = folder.querySelector('.cancel-button');
      var key = folder.getAttribute('data-key');
      var name = folder.querySelector('[data-name="album-name-edit"]').textContent.trim();
      var description = folder.querySelector('[data-name="album-description-edit"]').textContent.trim();
      var displayName = folder.querySelector('.info--display__name');
      var displayDescription = folder.querySelector('.info--display__description');
      var isSpecial = folder.querySelector('input[name="is-album-special"]:checked');
      var displayIsSpecial = folder.querySelector('.info--display').querySelector('input[value="' + isSpecial.value + '"]');

      thisSelf.setAttribute('data-og-text', thisSelf.textContent);
      thisSelf.textContent = '....';
      cancel.style.display = 'none';
      thisSelf.style.margin = '0';

      _this.db_ref_object.child(key).update({
        name: name,
        description: description,
        isSpecial: JSON.parse(isSpecial.value)
      }).then(function () {
        displayName.textContent = name;
        displayDescription.textContent = description;
        displayIsSpecial.checked = true;
        folder.classList.remove('edit');
        thisSelf.textContent = thisSelf.getAttribute('data-og-text');
        cancel.style.display = '';
        thisSelf.style.margin = '';
      });
    });

    this.addEventOn('.cancel-button', 'click', function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement.parentElement;
      var folder = head.parentElement;

      folder.classList.remove('edit');
    });
  }

  delay() {
    var _this2 = this;

    var thisSelf = this.target();
    var album = thisSelf.querySelector('.album-folder');
    var folder = thisSelf.querySelector('.album-folder__body__container');
    var albumName = thisSelf.querySelector('.album-name');

    this.db_ref_object.once('value', function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;
        if (content.album_id === _this2.album_id) {
          var folderGroup = new _AdminPanelAlbumFolderGroup2.default(content, _this2.db_ref_object);
          var albumNameEdit = new _NoInput.Text('album-name-edit', {
            title: 'Album Name',
            example: 'e.g. Vintage Glamour',
            placeholder: 'Enter Album Name',
            labelClass: 'name-edit',
            value: content.name
          });
          var albumDescriptionEdit = new _NoInput.TextArea('album-description-edit', {
            title: 'Description',
            placeholder: 'Enter Description',
            labelClass: 'description-edit',
            value: content.description
          });
          albumName.textContent = content.name;
          album.setAttribute('data-key', key);
          folder.innerHTML = '\n            <div>\n              <div class="info info--display">\n                <h1 class="info--display__name">' + content.name + '</h1>\n                <div class="info--display__description">' + content.description.trim() + '</div>\n                <div class="info--display__is-special" style="display:none">\n                  ' + (content.isSpecial ? '\n                      <input type="radio" name="is-album-special-display" value=true checked/>\n                      <input type="radio" name="is-album-special-display" value=false />\n                      ' : '\n                      <input type="radio" name="is-album-special-display" value=true />\n                      <input type="radio" name="is-album-special-display" value=false checked/>\n                      ') + '\n                </div>\n              </div>\n              <div class="info info--edit">\n                <div class="info--edit__name">\n                  ' + albumNameEdit.render() + '\n                </div>\n                <div class="info--edit__description">\n                  ' + albumDescriptionEdit.render() + '\n                </div>\n                <div class="info--edit__is-special">\n                  <h3>does album needs special layout ?</h3>\n                  <div class="btn-group">\n                    ' + (content.isSpecial ? '\n                      <label>\n                        <input type="radio" name="is-album-special" value=true checked/>\n                        <span class="btn">Yes</span>\n                      </label>\n                      <label>\n                        <input type="radio" name="is-album-special" value=false />\n                        <span class="btn">No</span>\n                      </label>\n                      ' : '\n                      <label>\n                        <input type="radio" name="is-album-special" value=true />\n                        <span class="btn">Yes</span>\n                      </label>\n                      <label>\n                        <input type="radio" name="is-album-special" value=false checked/>\n                        <span class="btn">No</span>\n                      </label>\n                      ') + '\n                  </div>\n                </div>\n                <a href="#" class="btn btn--primary add-remove-photos info--edit__add-photos">Add Photos</a>\n              </div>\n              ' + folderGroup.render() + '\n            </div>\n          ';
          folder.classList.add('found');
        }
      });
    }).then(function (e) {
      if (!folder.classList.contains('found')) {
        folder.innerHTML = '<div>No Album</div>';
      } else {
        (0, _scrollAction2.default)(thisSelf);
      }
    });
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor(content, dbRefObject) {
    super();
    this.content = content;
    this.db_ref_object = dbRefObject;
  }

  dom() {
    return '\n     <div data-key="' + this.content.key + '" class="album-folder__group">\n     </div>\n    ';
  }

  delay() {
    var thisSelf = this.target();

    if (this.content.photos_list && this.content.photos_list.length) {
      var photosList = this.content.photos_list;
      var allImages = [];

      this.db_ref_object.once('value', function (snap) {
        var valueSnap = snap.val();
        Object.keys(valueSnap).forEach(function (key) {
          var content = valueSnap[key];
          content.key = key;

          if (content.image_id && photosList.includes(content.image_id)) {
            allImages.push(content);
          }
        });

        var _loop = function _loop(i) {
          var isData = allImages.find(function (x) {
            return x.image_id === photosList[i];
          });
          if (isData) {
            thisSelf.innerHTML += '\n              <img src="' + isData.img.thumb_small + '" alt="" data-src="' + isData.img.thumb_medium + '" data-id="' + isData.image_id + '"/>\n            ';
          }
        };

        for (var i = 0; i < photosList.length; i++) {
          _loop(i);
        }
      }).then(function () {
        setTimeout(function () {
          var img = thisSelf.querySelectorAll('img');
          for (var i = 0; i < img.length; i++) {
            var thisImg = img[i];
            thisImg.src = thisImg.getAttribute('data-src');
          }
        }, 1500);
      });
    }
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);