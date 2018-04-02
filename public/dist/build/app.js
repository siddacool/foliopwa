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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

var _Component = __webpack_require__(10);

var _Component2 = _interopRequireDefault(_Component);

var _DataComponent = __webpack_require__(11);

var _DataComponent2 = _interopRequireDefault(_DataComponent);

var _Router = __webpack_require__(12);

var _Router2 = _interopRequireDefault(_Router);

var _utils = __webpack_require__(17);

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

var _hashLocationSet = __webpack_require__(15);

var _hashLocationSet2 = _interopRequireDefault(_hashLocationSet);

var _hashLocationGet = __webpack_require__(16);

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
var api = {
  images: 'https://sid-mangela-folio-db.firebaseapp.com/images.json',
  images_cached: 'https://sid-mangela-folio-db.firebaseapp.com/images-c.json',
  albums: 'https://sid-mangela-folio-db.firebaseapp.com/albums.json',
  albums_cached: 'https://sid-mangela-folio-db.firebaseapp.com/albums-c.json'
};

exports.default = api;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function goodOlAjaxPromise(url) {
  var promiseObj = new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          var responseText = xmlhttp.responseText.trim();
          var obj = JSON.parse(responseText);
          resolve(obj);
          console.log('good Ol Ajax Promise');
        } else {
          reject(xmlhttp.status);
          console.log('xmlhttp failed');
        }
      }
    };
  });
  return promiseObj;
}

exports.default = goodOlAjaxPromise;

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _goodOlAjaxPromise = __webpack_require__(3);

var _goodOlAjaxPromise2 = _interopRequireDefault(_goodOlAjaxPromise);

var _HomePageAlbum = __webpack_require__(20);

var _HomePageAlbum2 = _interopRequireDefault(_HomePageAlbum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function namePrint(titleText) {
  var name = 'The Photo';

  if (titleText) {
    name = titleText;
  }

  var ogName = name;
  name = name.split(' ');
  var name0 = name[0];
  var lastName = name['' + (name.length - 1)].replace(/__/g, ' ');
  var nameRest = ogName.replace(name0, '').trim().replace(/__/g, ' ');

  return '\n    <div class="album-title">\n      <span class="name0 highlight">' + name0.replace(/__/g, ' ') + '</span>\n      <span class="name1 highlight">' + nameRest + '</span>\n      <span class="last-name">' + lastName + '</span>\n      <span class="last-name">' + lastName + '</span>\n      <span class="last-name">' + lastName + '</span>\n      <span class="last-name" style="opacity: .8">' + lastName + '</span>\n      <span class="last-name" style="opacity: .6">' + lastName + '</span>\n    </div>\n  ';
}

function loadImageApi(imagesApi, albumData, targetContainer) {
  var photosList = albumData.photos_list;
  var homeContainer = targetContainer;
  var albumName = namePrint('' + (albumData.description ? albumData.description : albumData.name));

  homeContainer.innerHTML += albumName;

  (0, _goodOlAjaxPromise2.default)(imagesApi).then(function (response) {
    var images = response;
    var allImages = [];
    if (photosList) {
      images.forEach(function (image) {
        if (photosList.includes(image.image_id)) {
          allImages.push(image);
        }
      });
    }

    var _loop = function _loop(i) {
      var isData = allImages.find(function (x) {
        return x.image_id === photosList[i];
      });
      if (isData) {
        var homePageAlbum = new _HomePageAlbum2.default(isData);
        if (homeContainer) {
          homePageAlbum.addTo(homeContainer);
        }
      }
    };

    for (var i = 0; i < photosList.length; i++) {
      _loop(i);
    }
  });
}

exports.default = class extends _domrA.Component {
  constructor() {
    var albumsApi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var imagesApi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    super();
    this.albums_api = albumsApi;
    this.images_api = imagesApi;
    this.container_name = config.containerName || 'home-container';
    this.album_id = config.albumid || '';
    this.class_names = config.classNames || '';
  }

  dom() {
    return '\n      <div class="container container--showcase ' + this.class_names + ' ' + this.container_name + '"></div>\n    ';
  }

  delay() {
    var _this = this;

    (0, _goodOlAjaxPromise2.default)(this.albums_api).then(function (response) {
      var albums = response;
      albums.forEach(function (album) {
        if (_this.album_id) {
          if (album.album_id === _this.album_id) {
            if (album.album_id === _this.album_id) {
              loadImageApi(_this.images_api, album, _this.target());
            }
          }
        } else {
          if (album.name === 'top-images') {
            loadImageApi(_this.images_api, album, _this.target());
          }
        }
      });
    });
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(28);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domrA = __webpack_require__(0);

var _routes = __webpack_require__(18);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _domrA.Router(_routes2.default, {
  redirectDefault: true
});

router.start();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(5);

var _lookup2 = _interopRequireDefault(_lookup);

var _randomizer = __webpack_require__(6);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomizer = __webpack_require__(6);

var _randomizer2 = _interopRequireDefault(_randomizer);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(5);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addView = __webpack_require__(13);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneObject = __webpack_require__(14);

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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HomePageView = __webpack_require__(19);

var _HomePageView2 = _interopRequireDefault(_HomePageView);

var _WorkView = __webpack_require__(21);

var _WorkView2 = _interopRequireDefault(_WorkView);

var _FolderView = __webpack_require__(25);

var _FolderView2 = _interopRequireDefault(_FolderView);

var _AboutView = __webpack_require__(26);

var _AboutView2 = _interopRequireDefault(_AboutView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  name: 'Home Page',
  path: '/',
  view: _HomePageView2.default,
  isDefault: true
}, {
  name: 'Work',
  path: '/work/:is',
  view: _WorkView2.default
}, {
  name: 'Folder',
  path: '/folder/:id',
  view: _FolderView2.default
}, {
  name: 'About',
  path: '/about',
  view: _AboutView2.default
}];

exports.default = routes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var main = document.getElementById('main');

  var albums = _apiSet2.default.albums_cached;
  var images = _apiSet2.default.images_cached;

  if (data && data.query && data.query.cached && data.query.cached === 'false') {
    albums = _apiSet2.default.albums;
    images = _apiSet2.default.images;
  }
  var homePageContainer = new _ShowCase2.default(albums, images);

  window.scrollTo(0, 0);
  main.innerHTML = homePageContainer.render();
};

var _apiSet = __webpack_require__(2);

var _apiSet2 = _interopRequireDefault(_apiSet);

var _ShowCase = __webpack_require__(7);

var _ShowCase2 = _interopRequireDefault(_ShowCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor() {
    var photo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    super();
    this.photo = photo;
  }

  dom() {
    console.log(this.photo.isMature);
    return '\n      <span class="img" data-image-src="' + this.photo.img.thumb_large + '" ' + (this.photo.isMature ? 'data-isMature' : '') + '>\n        <img src="' + this.photo.img.thumb_small + '"  class="' + (this.photo.isMature ? 'is-mature' : '') + '" alt="" />\n      </span>\n    ';
  }

  delay() {
    var self = this.target();
    var img = self.querySelector('img');
    var dataSrc = self.getAttribute('data-image-src');
    self.addEventListener('click', function () {
      if (self.hasAttribute('data-isMature')) {
        if (self.getAttribute('data-isMature') !== 'clicked') {
          img.src = dataSrc;
          img.classList.remove('is-mature');
          self.setAttribute('data-isMature', 'clicked');
        }
      }
    });
    setTimeout(function () {
      if (!img.classList.contains('is-mature')) {
        img.src = dataSrc;
      }
    }, 1500);
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  if (data && data.metadata && data.metadata.is) {
    var work = data.metadata;

    if (work.is === 'photography' || work.is === 'restoration') {
      var main = document.getElementById('main');
      var albums = _apiSet2.default.albums_cached;
      var images = _apiSet2.default.images_cached;

      if (data.query && data.query.cached && data.query.cached === 'false') {
        albums = _apiSet2.default.albums;
        images = _apiSet2.default.images;
      }
      var workContainer = new _WorkContainer2.default(work.is, albums, images);

      window.scrollTo(0, 0);
      main.innerHTML = workContainer.render();
    }
  }
};

var _apiSet = __webpack_require__(2);

var _apiSet2 = _interopRequireDefault(_apiSet);

var _WorkContainer = __webpack_require__(22);

var _WorkContainer2 = _interopRequireDefault(_WorkContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _goodOlAjaxPromise = __webpack_require__(3);

var _goodOlAjaxPromise2 = _interopRequireDefault(_goodOlAjaxPromise);

var _WorkAlbum = __webpack_require__(23);

var _WorkAlbum2 = _interopRequireDefault(_WorkAlbum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrA.Component {
  constructor(workIs) {
    var albumsApi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var imagesApi = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    super();
    this.albums_api = albumsApi;
    this.images_api = imagesApi;
    this.work_is = workIs;
  }

  dom() {
    return '\n      <ul class="container container--gapped work-container"></ul>\n    ';
  }

  delay() {
    var _this = this;

    (0, _goodOlAjaxPromise2.default)(this.albums_api).then(function (response) {
      var albums = response;

      albums.forEach(function (album) {
        if (album.type === _this.work_is && album.name !== 'top-images') {
          var workAlbum = new _WorkAlbum2.default(album, _this.images_api);
          var self = _this.target();

          workAlbum.addTo(self);
        }
      });
    });
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

var _goodOlAjaxPromise = __webpack_require__(3);

var _goodOlAjaxPromise2 = _interopRequireDefault(_goodOlAjaxPromise);

var _WorkAlbumCover = __webpack_require__(24);

var _WorkAlbumCover2 = _interopRequireDefault(_WorkAlbumCover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrA.Component {
  constructor(album, imagesApi) {
    super();
    this.album = album;
    this.imagesApi = imagesApi;
  }

  dom() {
    return '\n      <li class="album-card" data-type="' + this.album.type + '" data-cover-id="' + this.album.cover_pic + '">\n        <a href="#/folder/' + this.album.album_id + '" class="album-card__container">\n          <div class="album-card__img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs" alt="" /></div>\n          <div class="album-card__name">\n            <h3 class="highlight">' + this.album.name + '</h3>\n          </div>\n        </a>\n      </li>\n    ';
  }

  delay() {
    var _this = this;

    if (this.album.cover_pic) {
      (0, _goodOlAjaxPromise2.default)(this.imagesApi).then(function (response) {
        var images = response;
        images.forEach(function (image) {
          if (image.image_id === _this.album.cover_pic) {
            var self = _this.target();
            var cardImgContainer = self.querySelector('.album-card__img');
            var workAlbumCover = new _WorkAlbumCover2.default(image);
            workAlbumCover.replaceContentOf(cardImgContainer);
          }
        });
      });
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrA = __webpack_require__(0);

exports.default = class extends _domrA.Component {
  constructor(photo) {
    super();
    this.photo = photo;
  }

  dom() {
    return '\n      <img src="' + this.photo.img.thumb_small + '" data-src="' + this.photo.img.thumb_medium + '" alt="" />\n    ';
  }

  delay() {
    var img = this.target();
    var dataSrc = img.getAttribute('data-src');

    setTimeout(function () {
      img.src = dataSrc;
    }, 1500);
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  if (data && data.metadata && data.metadata.id) {
    var main = document.getElementById('main');
    var id = data.metadata.id;
    var albums = _apiSet2.default.albums_cached;
    var images = _apiSet2.default.images_cached;

    if (data.query && data.query.cached && data.query.cached === 'false') {
      albums = _apiSet2.default.albums;
      images = _apiSet2.default.images;
    }

    var homePageContainer = new _ShowCase2.default(albums, images, {
      containerName: 'folder-container',
      albumid: id,
      classNames: 'container--gapped container--showcase--mini'
    });

    window.scrollTo(0, 0);
    main.innerHTML = homePageContainer.render();
  }
};

var _apiSet = __webpack_require__(2);

var _apiSet2 = _interopRequireDefault(_apiSet);

var _ShowCase = __webpack_require__(7);

var _ShowCase2 = _interopRequireDefault(_ShowCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var main = document.getElementById('main');
  var aboutContainer = (0, _AboutContainer2.default)('Title');

  window.scrollTo(0, 0);
  main.innerHTML = aboutContainer;
};

var _AboutContainer = __webpack_require__(27);

var _AboutContainer2 = _interopRequireDefault(_AboutContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

exports.default = function () {
      return "\n    <div class=\"container container--gapped about-container\">\n    <div class=\"holder\">\n      <h1 class=\"highlight\">Hola!!</h1>\n      <div class=\"block\">\n<span class=\"highlight\">I am <span class=\"special-text special-text--strike\">Groot</span>, Siddhesh\nA Photography Enthusiast from India.</span>\n      </div>\n      <div class=\"block\">\n<span class=\"highlight\">Say Hi At \n<b>sidthecool007@gmail.com</b></span>\n      </div>\n    <div class=\"block\">\n<span class=\"highlight\">And Find Me on <b><a class=\"special-text special-text--ugly-link\" href=\"https://www.instagram.com/sidthecool007/\" target=\"_blank\">Instagram</a></b>\n</span>\n      </div>\n      <div class=\"block\">\n<span class=\"highlight\">Need to cut short because \nI decided to use this \n      giant a<span class=\"special-text special-text--blur\">ss</span> font\nAnd ha...\nEnjoy this weird site!!</span>\n      </div>\n\n      <div class=\"waste-of-space\">\n<span class=\"highlight\">Now This is\nplain Waste Of Space</span>\n      </div>\n    </div>\n    </div>\n  ";
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);