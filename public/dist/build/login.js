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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = exports.Router = exports.Component = undefined;

var _Component = __webpack_require__(42);

var _Component2 = _interopRequireDefault(_Component);

var _Router = __webpack_require__(46);

var _Router2 = _interopRequireDefault(_Router);

var _utils = __webpack_require__(51);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _Component2.default;
exports.Router = _Router2.default;
exports.utils = _utils2.default;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocationSet = __webpack_require__(49);

var _hashLocationSet2 = _interopRequireDefault(_hashLocationSet);

var _hashLocationGet = __webpack_require__(50);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stripe = exports.TextArea = exports.Password = exports.Text = undefined;

var _Text = __webpack_require__(12);

var _Text2 = _interopRequireDefault(_Text);

var _Password = __webpack_require__(57);

var _Password2 = _interopRequireDefault(_Password);

var _TextArea = __webpack_require__(58);

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Stripe = __webpack_require__(59);

var _Stripe2 = _interopRequireDefault(_Stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Text = _Text2.default;
exports.Password = _Password2.default;
exports.TextArea = _TextArea2.default;
exports.Stripe = _Stripe2.default;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fireBase) {
  var fire = fireBase;
  var firebaseAuth = fire.auth();
  var AccountPop = new _AdminPanelAccountPop2.default();
  var AccountCloak = new _AdminPanelAccountCloak2.default();
  var AccountLogout = new _AdminPanelAccountLogout2.default(fire);

  return '\n    <header>\n        <a href="#/" class="logo">\n          <img src="./public/dist/favicon/favicon.png" alt="Logo" />\n        </a>\n        <div class="account">\n          ' + AccountPop.Render() + '\n          <div class="account__drop">\n            <div class="account__welcome">Hola ' + firebaseAuth.currentUser.email + '</div>\n            ' + AccountLogout.Render() + '\n          </div>\n          ' + AccountCloak.Render() + '\n        </div>\n     </header>\n  ';
};

var _AdminPanelAccountPop = __webpack_require__(62);

var _AdminPanelAccountPop2 = _interopRequireDefault(_AdminPanelAccountPop);

var _AdminPanelAccountCloak = __webpack_require__(63);

var _AdminPanelAccountCloak2 = _interopRequireDefault(_AdminPanelAccountCloak);

var _AdminPanelAccountLogout = __webpack_require__(64);

var _AdminPanelAccountLogout2 = _interopRequireDefault(_AdminPanelAccountLogout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scroll-to-top';

    super();
    this.classNames = classNames;
  }

  Markup() {
    return '\n     <a href="#" class="' + this.classNames + ' scroll__top-btn"><svg role="img" class="icon"><use xlink:href="#icon-Design-14"></use></svg></a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    var picId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var dbRefObject = arguments[1];

    super();
    this.picId = picId;
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n    <div class="cover-pic" data-id="' + this.picId + '">\n      <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" />\n    </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var img = thisSelf.querySelector('img');

    if (this.picId) {
      this.db_ref_object.once('value', function (snap) {
        var valueSnap = snap.val();
        Object.keys(valueSnap).forEach(function (key) {
          var content = valueSnap[key];
          content.key = key;
          if (content.image_id && content.image_id === _this.picId) {
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
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _PasteNameField = __webpack_require__(55);

var _PasteNameField2 = _interopRequireDefault(_PasteNameField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
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

  Markup() {
    var NameField = new _PasteNameField2.default(this.name, this.value);
    return '\n      <div class="' + this.label_class + ' no-input no-input--' + this.type + '">\n        ' + NameField.Render() + '\n        <span class="placeholder">' + this.placeholder + '</span>\n        <span class="example">' + this.example + '</span>\n        <span class="title">' + this.title + '</span>\n        <span class="backdrop"></span>\n        <span class="border"></span>\n      </div>\n    ';
  }
};

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModal = __webpack_require__(77);

var _SuperModal2 = _interopRequireDefault(_SuperModal);

var _SuperModalBtn = __webpack_require__(80);

var _SuperModalBtn2 = _interopRequireDefault(_SuperModalBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bla() {
  console.log('called');
}

exports.default = class extends _SuperModal2.default {
  constructor() {
    super();
    this.headerText = '';
  }

  Header() {
    var DoneBtn = new _SuperModalBtn2.default('Done', this.Done, this.RemoveModal, 'btn--primary super-modal__btn--done');
    var CancelBtn = new _SuperModalBtn2.default('Cancel', this.Cancel, this.RemoveModal, 'super-modal__btn--cancel');
    return '\n      <div class="super-modal__header">\n        <div class="super-modal__info">\n          <span class="super-modal__text super-modal__text--main">' + this.headerText + '</span>\n        </div>\n        ' + DoneBtn.Render() + '\n        ' + CancelBtn.Render() + '\n      </div>\n    ';
  }

  Done() {
    console.log('called');
  }

  Cancel() {
    console.log('called');
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(content) {
    var multiSelect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    super('cover-modal-img');
    this.content = content;
    this.isSelected = isSelected;
    this.multi_select = multiSelect;
  }

  Markup() {
    return '\n      <div class="selectable-img">\n        <label>\n          <input type="' + (this.multi_select ? 'checkbox' : 'radio') + '" name="cover-selectable-img" ' + (this.isSelected ? 'checked' : '') + ' value="' + this.content.image_id + '"/>\n          <span>\n            <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-small-src="' + this.content.img.thumb_small + '" data-src="' + this.content.img.thumb_medium + '" alt="" />\n          </span>\n        </label>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.GetThisComponent();
    var img = thisSelf.querySelector('img');

    img.src = this.content.img.thumb_small;

    setTimeout(function () {
      img.src = img.getAttribute('data-src');
    }, 1000);
  }
};

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
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
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(41);

__webpack_require__(97);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domrC = __webpack_require__(0);

var _routes = __webpack_require__(52);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _domrC.Router(_routes2.default);

router.Start();

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = __webpack_require__(43);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(44);

var _lookup2 = _interopRequireDefault(_lookup);

var _randomizer = __webpack_require__(45);

var _randomizer2 = _interopRequireDefault(_randomizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    var _this = this;

    var domrid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'domr-component';

    _classCallCheck(this, _class);

    this.createElement = _createElement2.default;
    this.domrid = domrid + '-' + (0, _randomizer2.default)(7);
    this.target = function () {
      return (0, _lookup2.default)(_this.domrid);
    };
    this.GetThisComponent = this.target;
    this.GetDomrID = this.domrid;
    this.handlingParent = document.querySelector('body');
  }

  // debug


  _createClass(_class, [{
    key: 'errorHandler',
    value: function errorHandler(field, error) {
      var err = '_ ' + field + ': ' + error;
      this.ErrorLog(err);
    }
    // OnError

  }, {
    key: 'ErrorLog',
    value: function ErrorLog(err) {}

    // Markup

  }, {
    key: 'Markup',
    value: function Markup() {
      // HTML DOM/Markup goes here
      return '';
    }

    // Events

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
    key: 'On',
    value: function On(eventName, eventAction) {
      this.deligateEvents('[data-domr-id="' + this.domrid + '"]', eventName, eventAction);
    }
  }, {
    key: 'Click',
    value: function Click(eventAction) {
      this.On('click', eventAction);
    }
  }, {
    key: 'Mouseover',
    value: function Mouseover(eventAction) {
      this.On('mouseover', eventAction);
    }
  }, {
    key: 'Mouseout',
    value: function Mouseout(eventAction) {
      this.On('mouseout', eventAction);
    }
  }, {
    key: 'Input',
    value: function Input(eventAction) {
      this.On('input', eventAction);
    }
  }, {
    key: 'Blur',
    value: function Blur(eventAction) {
      this.On('blur', eventAction);
    }
  }, {
    key: 'Keydown',
    value: function Keydown(eventAction) {
      this.On('keydown', eventAction);
    }
  }, {
    key: 'Keypress',
    value: function Keypress(eventAction) {
      this.On('keypress', eventAction);
    }
  }, {
    key: 'Keyup',
    value: function Keyup(eventAction) {
      this.On('keyup', eventAction);
    }
  }, {
    key: 'Events',
    value: function Events() {}
    // This one will house the events


    // AfterRender

  }, {
    key: 'AfterRenderDone',
    value: function AfterRenderDone() {}
  }, {
    key: 'delayedContent',
    value: function delayedContent() {
      var _this2 = this;

      setTimeout(function () {
        if (_this2.target()) {
          _this2.AfterRenderDone();
        }
      }, 50);
    }
  }, {
    key: 'optimizedDom',
    value: function optimizedDom() {
      this.Events();
      return this.createElement(this.Markup(), this.domrid);
    }

    // Add Events
    // Render

  }, {
    key: 'Render',
    value: function Render() {
      this.delayedContent();
      return this.optimizedDom();
    }
  }, {
    key: 'AddTo',
    value: function AddTo(parent) {
      if (parent) {
        parent.insertAdjacentHTML('beforeend', this.optimizedDom());
        this.delayedContent();
      } else {
        this.errorHandler('AddTo', 'parent not found');
      }
    }
  }, {
    key: 'AddFromStartTo',
    value: function AddFromStartTo(parent) {
      if (parent) {
        parent.insertAdjacentHTML('afterbegin', this.optimizedDom());
        this.delayedContent();
      } else {
        this.errorHandler('AddFromStartTo', 'parent not found');
      }
    }
  }, {
    key: 'Before',
    value: function Before(sibling) {
      if (sibling) {
        sibling.insertAdjacentHTML('beforebegin', this.optimizedDom());
        this.delayedContent();
      } else {
        this.errorHandler('Before', 'sibling not found');
      }
    }
  }, {
    key: 'After',
    value: function After(sibling) {
      if (sibling) {
        sibling.insertAdjacentHTML('afterend', this.optimizedDom());
        this.delayedContent();
      } else {
        this.errorHandler('After', 'sibling not found');
      }
    }
  }, {
    key: 'Replace',
    value: function Replace(sibling) {
      if (sibling) {
        var parent = sibling.parentElement;

        if (parent) {
          sibling.insertAdjacentHTML('afterend', this.optimizedDom());
          parent.removeChild(sibling);
          this.delayedContent();
        } else {
          this.errorHandler('Replace', 'sibling has no parentElement');
        }
      } else {
        this.errorHandler('Replace', 'sibling not found');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addView = __webpack_require__(47);

var _addView2 = _interopRequireDefault(_addView);

var _hashLocation = __webpack_require__(3);

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
    refreshPage: false
  }
};

var _class = function () {
  function _class() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.routes;
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.config;

    _classCallCheck(this, _class);

    this.routes = filterRoutes(routes);
    this.refreshPage = config.refreshPage || false;
    this.addView = _addView2.default;
  }

  _createClass(_class, [{
    key: 'ShowRoutes',
    value: function ShowRoutes() {
      console.log(this.routes);
    }
  }, {
    key: 'reloadOnHashChange',
    value: function reloadOnHashChange() {
      var _this = this;

      addEventListener('hashchange', function (e) {
        if (_this.refreshPage) {
          location.reload();
        } else {
          _this.Start();
          e.stopImmediatePropagation();
        }
      });
    }
  }, {
    key: 'Start',
    value: function Start() {
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
        if (routeDefault) {
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneObject = __webpack_require__(48);

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
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(3);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(3);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(3);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  hashLocation: _hashLocation2.default
};

exports.default = utils;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdminPanelHomeView = __webpack_require__(53);

var _AdminPanelHomeView2 = _interopRequireDefault(_AdminPanelHomeView);

var _AdminPanelAlbumFolderView = __webpack_require__(67);

var _AdminPanelAlbumFolderView2 = _interopRequireDefault(_AdminPanelAlbumFolderView);

var _AdminPanelImageFolderView = __webpack_require__(83);

var _AdminPanelImageFolderView2 = _interopRequireDefault(_AdminPanelImageFolderView);

var _AdminPanelUploaderView = __webpack_require__(89);

var _AdminPanelUploaderView2 = _interopRequireDefault(_AdminPanelUploaderView);

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
  view: _AdminPanelImageFolderView2.default
}, {
  name: 'Create',
  path: '/create',
  view: _AdminPanelUploaderView2.default
}];

exports.default = routes;

/***/ }),
/* 53 */
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
      wrapper.innerHTML = stream.Render();
    } else {
      var login = new _AdminPanelLoginContainer2.default(fire);
      wrapper.innerHTML = login.Render();
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(4);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelLoginContainer = __webpack_require__(54);

var _AdminPanelLoginContainer2 = _interopRequireDefault(_AdminPanelLoginContainer);

var _AdminPanelStreamContainer = __webpack_require__(61);

var _AdminPanelStreamContainer2 = _interopRequireDefault(_AdminPanelStreamContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _NoInput = __webpack_require__(5);

var _AdminPanelLoginBtn = __webpack_require__(60);

var _AdminPanelLoginBtn2 = _interopRequireDefault(_AdminPanelLoginBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire) {
    super();
    this.firebase = fire;
  }

  Markup() {
    var Email = new _NoInput.Text('login-email', {
      title: 'Email',
      placeholder: 'Enter Your Email',
      example: 'yourid@somemail.com',
      labelClass: 'login__email'
    });

    var UserPassword = new _NoInput.Password('login-password', {
      title: 'Password',
      placeholder: 'Enter Your Password',
      labelClass: 'login__password'
    });

    var LoginBtn = new _AdminPanelLoginBtn2.default(this.firebase);

    return '\n      <div class="login">\n        <div class="login__well">\n          ' + Email.Render() + '\n          ' + UserPassword.Render() + '\n          ' + LoginBtn.Render() + '\n        </div>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.target();
    var email = thisSelf.querySelector('[data-name="login-email"]');

    email.focus();
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _clearFormatting = __webpack_require__(56);

var _clearFormatting2 = _interopRequireDefault(_clearFormatting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(name) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    super();
    this.name = name;
    this.value = value;
  }

  Markup() {
    return '\n      <div class="text" data-name="' + this.name + '" lang="clusterf*ck" spellcheck="false" contenteditable="true">' + this.value + '</div>\n    ';
  }

  Events() {
    this.On('paste', function (self, e) {
      (0, _clearFormatting2.default)(self, e);
    });
  }
};

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(12);

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _Text2.default {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super(name, config);
    this.type = 'password';
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(12);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var defaultPoints = [{
  point: 0,
  value: 'Zero'
}, {
  point: 1,
  value: 'One'
}, {
  point: 2,
  value: 'Two'
}, {
  point: 3,
  value: 'Three'
}, {
  point: 4,
  value: 'Four'
}, {
  point: 5,
  value: 'Five'
}];

function makePoints(value, p, labelClass, name) {
  var pointVal = p.value ? p.value : p.point;
  var pointValStr = pointVal.toString();
  var defaultVal = '';

  if (value) {
    defaultVal = value.toString();
  }

  return '\n    <li>\n      <label>\n        <input value="' + pointValStr + '" type="radio" name="' + (labelClass ? 'radio-' + labelClass : 'radio-' + name) + '" ' + (defaultVal === pointValStr ? 'checked' : '') + '/>\n        <span>' + p.point + '</span>\n      </label>\n    </li>\n  ';
}

exports.default = class extends _domrC.Component {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.name = name;
    this.type = 'stripe';
    this.points = config.points || defaultPoints;
    this.value = config.value || '';
    this.label_class = config.labelClass || '';
    this.callback = config.callback || '';
  }

  Markup() {
    var _this = this;

    return '\n      <div class="' + this.label_class + ' no-input no-input--' + this.type + '">\n        <div class="stripe-value" data-name="' + this.name + '">' + this.value + '</div>\n        <ul class="stripe-bar">\n          ' + this.points.map(function (p) {
      return '\n            ' + makePoints(_this.value, p, _this.label_class, _this.name) + '\n          ';
    }).join('') + '\n        </ul>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var _this2 = this;

    var thisSelf = this.GetThisComponent();
    var stripeVal = thisSelf.querySelector('.stripe-value');
    var radio = thisSelf.querySelectorAll('input[type="radio"]');

    radio.forEach(function (select) {
      select.addEventListener('click', function () {
        stripeVal.textContent = select.value;

        if (_this2.callback) {
          _this2.callback(select.value);
        }
      });
    });
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(fire) {
    super();
    this.firebase = fire;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary login__login">Login</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
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
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(6);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _AdminPanelHeader = __webpack_require__(7);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(8);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumThumb = __webpack_require__(65);

var _AdminPanelAlbumThumb2 = _interopRequireDefault(_AdminPanelAlbumThumb);

var _AdminPanelImageThumb = __webpack_require__(66);

var _AdminPanelImageThumb2 = _interopRequireDefault(_AdminPanelImageThumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = { AdminPanelAlbumThumb: _AdminPanelAlbumThumb2.default, AdminPanelImageThumb: _AdminPanelImageThumb2.default };

function dynamicClass(name) {
  return classes[name];
}

exports.default = class extends _domrC.Component {
  constructor(fire, streamType) {
    super();
    this.firebase = fire;
    this.stream_type = streamType;
    this.db_ref_object = this.firebase.database().ref();
  }

  Markup() {
    var header = (0, _AdminPanelHeader2.default)(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');

    return '\n      <div class="stream-main-container">\n        ' + header + '\n        <div class="stream scroll">\n          <div class="tab">\n            <div class="tab__head scroll__head">\n              <div class="container tab__head__container">\n                <a href="#/?stream=album" class="tab__pick stream__pick" data-tab-pick="album">Albums</a>\n                <a href="#/?stream=image" class="tab__pick stream__pick" data-tab-pick="image">Images</a>\n              </div>\n            </div>\n            <div class="tab__body">\n              <div class="container tab__body__container">\n              </div>\n            </div>\n          </div>\n          ' + topButton.Render() + '\n        </div>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
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
          thumb.AddTo(tabBody);
        }
      });
    });

    (0, _scrollAction2.default)(thisSelf);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    super();
  }

  Markup() {
    return '\n      <a href="#" class="account__pop"><svg role="img" class="icon"><use xlink:href="#icon-Actions-05"></use></svg></a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      var parent = self.parentElement;
      var accountDrop = parent.querySelector('.account__drop');

      accountDrop.classList.add('account__drop--active');
    });
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    super();
  }

  Markup() {
    return '\n      <div class="account-cloak"></div>\n    ';
  }

  Events() {
    this.Click(function (self) {
      var parent = self.parentElement;
      var accountDrop = parent.querySelector('.account__drop');

      accountDrop.classList.remove('account__drop--active');
    });
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(fire) {
    super();
    this.firebase = fire;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary account__logout">Logout</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      _this.firebase.auth().signOut();
    });
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
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

  Markup() {
    return '\n     <li data-key="' + this.content.key + '" class="thumb thumb--album">\n      <a href="#/album/' + this.content.album_id + '" data-id="' + this.content.album_id + '">\n        <div class="img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" /></div>\n        <div class="name"><span>' + this.name + '</span></div>\n      </a>\n     </li>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    super();
    this.content = content;
    this.name = this.content.name || '';
    this.description = this.content.description || '';
  }

  Markup() {
    return '\n     <li data-key="' + this.content.key + '" class="thumb thumb--image">\n      <a href="#/image/' + this.content.image_id + '" data-id="' + this.content.image_id + '">\n        <div class="img"><img src="' + this.content.img.thumb_small + '" data-src="' + this.content.img.thumb_medium + '" alt="" /></div>\n      </a>\n     </li>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.GetThisComponent();
    var img = thisSelf.querySelector('img');
    var dataSrc = img.getAttribute('data-src');

    setTimeout(function () {
      img.src = dataSrc;
    }, 1500);
  }
};

/***/ }),
/* 67 */
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
      wrapper.innerHTML = albumFolder.Render();
    } else {
      location.hash = '#/';
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(4);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelAlbumFolderContainer = __webpack_require__(68);

var _AdminPanelAlbumFolderContainer2 = _interopRequireDefault(_AdminPanelAlbumFolderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _sortablejs = __webpack_require__(69);

var _sortablejs2 = _interopRequireDefault(_sortablejs);

var _scrollAction = __webpack_require__(6);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _NoInput = __webpack_require__(5);

var _AdminPanelHeader = __webpack_require__(7);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(8);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumFolderGroup = __webpack_require__(70);

var _AdminPanelAlbumFolderGroup2 = _interopRequireDefault(_AdminPanelAlbumFolderGroup);

var _AdminPanelAlbumEditBtn = __webpack_require__(71);

var _AdminPanelAlbumEditBtn2 = _interopRequireDefault(_AdminPanelAlbumEditBtn);

var _AdminPanelAlbumSaveBtn = __webpack_require__(72);

var _AdminPanelAlbumSaveBtn2 = _interopRequireDefault(_AdminPanelAlbumSaveBtn);

var _AdminPanelAlbumCancelBtn = __webpack_require__(73);

var _AdminPanelAlbumCancelBtn2 = _interopRequireDefault(_AdminPanelAlbumCancelBtn);

var _AdminPanelLayoutBtn = __webpack_require__(74);

var _AdminPanelLayoutBtn2 = _interopRequireDefault(_AdminPanelLayoutBtn);

var _AdminPanelCoverPic = __webpack_require__(9);

var _AdminPanelCoverPic2 = _interopRequireDefault(_AdminPanelCoverPic);

var _AdminPanelAlbumChangeCoverBtn = __webpack_require__(75);

var _AdminPanelAlbumChangeCoverBtn2 = _interopRequireDefault(_AdminPanelAlbumChangeCoverBtn);

var _AdminPanelAlbumAddPhotosBtn = __webpack_require__(81);

var _AdminPanelAlbumAddPhotosBtn2 = _interopRequireDefault(_AdminPanelAlbumAddPhotosBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortableAlbumGroup(thisSelf) {
  var sortable = _sortablejs2.default.create(thisSelf);
}

exports.default = class extends _domrC.Component {
  constructor(fire, albumId) {
    super();
    this.firebase = fire;
    this.album_id = albumId;
    this.db_ref_object = this.firebase.database().ref();
  }

  Markup() {
    var header = (0, _AdminPanelHeader2.default)(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');
    var EditBtn = new _AdminPanelAlbumEditBtn2.default(this.db_ref_object);
    var SaveBtn = new _AdminPanelAlbumSaveBtn2.default(this.db_ref_object);
    var CancelBtn = new _AdminPanelAlbumCancelBtn2.default();

    return '\n      <div class="album-folder-main-container">\n        ' + header + '\n        <div class="folder album-folder scroll">\n          <div class="folder__head album-folder__head scroll__head">\n            <div class="folder__head__container container album-folder__head__container">\n              <a href="#/?stream=album" class="back-button"><svg role="img" class="icon"><use xlink:href="#icon-Design-12"></use></svg><span>Back</span></a>\n              <span class="album-name"></span>\n              ' + EditBtn.Render() + '\n              <div class="decision">\n                ' + SaveBtn.Render() + '\n                ' + CancelBtn.Render() + '\n              </div>\n            </div>\n          </div>\n          <div class="album-folder__body">\n            <div class="container album-folder__body__container">...</div>\n          </div>\n          ' + topButton.Render() + '\n        </div>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var album = thisSelf.querySelector('.album-folder');
    var folder = thisSelf.querySelector('.album-folder__body__container');
    var albumName = thisSelf.querySelector('.album-name');

    this.db_ref_object.once('value', function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;
        if (content.album_id === _this.album_id) {
          var folderGroup = new _AdminPanelAlbumFolderGroup2.default(content, _this.db_ref_object);
          var folderGroupSortable = new _AdminPanelAlbumFolderGroup2.default(content, _this.db_ref_object, 'sortable', sortableAlbumGroup);
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
          var stripe = new _NoInput.Stripe('layout-parts', {
            labelClass: 'layout-parts-stripe',
            value: 2,
            points: [{
              point: 1,
              value: 1
            }, {
              point: 2,
              value: 2
            }, {
              point: 3,
              value: 3
            }, {
              point: 4,
              value: 4
            }, {
              point: 5,
              value: 5
            }],
            callback: function callback(value) {
              var preview = document.getElementById('layout-edit').querySelector('.preview');

              preview.setAttribute('data-parts', value);
            }
          });
          var boxLayout = new _AdminPanelLayoutBtn2.default('Boxed Layout', 'box-btn', 'preview--box', false);
          var gapRight = new _AdminPanelLayoutBtn2.default('R Gap', 'gap-right', 'preview--gap-right', false);
          var coverPic = new _AdminPanelCoverPic2.default('' + (content.cover_pic ? content.cover_pic : ''), _this.db_ref_object);
          var coverPicDisplay = new _AdminPanelCoverPic2.default('' + (content.cover_pic ? content.cover_pic : ''), _this.db_ref_object);
          var changeCoverBtn = new _AdminPanelAlbumChangeCoverBtn2.default(content, _this.db_ref_object);
          var addPhotosBtn = new _AdminPanelAlbumAddPhotosBtn2.default(content, _this.db_ref_object);
          albumName.textContent = content.name;
          album.setAttribute('data-key', key);
          folder.innerHTML = '\n            <div>\n              <div class="info info--display">\n                <h1 class="info--display__name">' + content.name + '</h1>\n                <div class="info--display__description">' + content.description.trim() + '</div>\n                <div class="info--display__works-no-show" style="display:none">\n                    ' + (content.works_no_show ? '\n                      <input type="radio" name="works-no-show-display" value="true" checked />\n                      <input type="radio" name="works-no-show-display" value="false" />\n                      ' : '\n                      <input type="radio" name="works-no-show-display" value="true" />\n                      <input type="radio" name="works-no-show-display" value="false" checked />\n                      ') + '\n                  </div>\n                <div class="info--display__is-special" style="display:none">\n                  ' + (content.isSpecial ? '\n                      <input type="radio" name="is-album-special-display" value="true" checked/>\n                      <input type="radio" name="is-album-special-display" value="false" />\n                      ' : '\n                      <input type="radio" name="is-album-special-display" value="true" />\n                      <input type="radio" name="is-album-special-display" value="false" checked/>\n                      ') + '\n                </div>\n                <div class="info--display__cover" style="display:none">' + coverPicDisplay.Render() + '</div>\n                <div class="info--display__layout" style="display:none">\n                  ' + (content.layout ? '\n                    <input type="text" class="box" value="' + content.layout.box.toString() + '"/>\n                    <input type="text" class="gapr" value="' + content.layout.gapr.toString() + '"/>\n                    <input type="text" class="parts" value="' + content.layout.parts.toString() + '"/>\n                    ' : '\n                    <input type="text" class="box" value="true"/>\n                    <input type="text" class="gapr" value="false"/>\n                    <input type="text" class="parts" value="2"/>\n                    ') + '\n                </div>\n              </div>\n              <div class="info info--edit">\n                <div class="devide">\n                  <div class="info--edit__name">\n                    ' + albumNameEdit.Render() + '\n                  </div>\n                  <div class="info--edit__description">\n                    ' + albumDescriptionEdit.Render() + '\n                  </div>\n                  <div class="info--edit__works-no-show info--edit__choice">\n                    <h3>Show in works section on website</h3>\n                    <div class="btn-group">\n                      ' + (content.works_no_show ? '\n                        <label>\n                          <input type="radio" name="works-no-show" value="false" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="works-no-show" value="true" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="works-no-show" value="false" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="works-no-show" value="true" />\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__is-special info--edit__choice">\n                    <h3>does album needs special treatment ?</h3>\n                    <div class="btn-group">\n                      ' + (content.isSpecial ? '\n                        <label>\n                          <input type="radio" name="is-album-special" value="true" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="is-album-special" value="false" />\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="is-album-special" value="true" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="is-album-special" value="false" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__cover">\n                    <h3>Cover Pic</h3>\n                    <div class="cover-pic-holder">\n                      ' + coverPic.Render() + '\n                    </div>\n                    ' + changeCoverBtn.Render() + '\n                    <div class="change-cover-modal-holder"></div>\n                  </div>\n                    <div class="info--edit__layout">\n                      <h3>Album Layout</h3>\n                      ' + boxLayout.Render() + '\n                      <div class="layout" id="layout-edit">\n                        ' + gapRight.Render() + '\n                        <div class="preview">\n                          <ul class="preview__container">\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                          </ul>\n                        </div>\n                      </div>\n                      ' + stripe.Render() + '\n                    </div>\n                </div>\n                ' + addPhotosBtn.Render() + '\n              </div>\n              ' + folderGroup.Render() + '\n              ' + folderGroupSortable.Render() + '\n            </div>\n          ';
          folder.classList.add('found');
        }
      });
    }).then(function () {
      if (!folder.classList.contains('found')) {
        folder.innerHTML = '<div>No Album</div>';
      } else {
        (0, _scrollAction2.default)(thisSelf);
      }
    });
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(content, dbRefObject) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'display';
    var callback = arguments[3];

    super();
    this.content = content;
    this.db_ref_object = dbRefObject;
    this.type = type;
    this.callback = callback || '';
  }

  Markup() {
    return '\n     <div data-key="' + this.content.key + '" class="album-folder__group album-folder__group--' + this.type + '">\n     </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();

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
        if (_this.callback) {
          _this.callback(thisSelf);
        }
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelCoverPic = __webpack_require__(9);

var _AdminPanelCoverPic2 = _interopRequireDefault(_AdminPanelCoverPic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alterLayoutPreview(self, layout, preview, className) {
  var remove = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (remove) {
    layout.classList.remove('btn--pressed');
    preview.classList.remove(className);
  } else {
    layout.classList.add('btn--pressed');
    preview.classList.add(className);
  }
}

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary edit-button">Edit Album</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement;
      var folder = head.parentElement;

      if (folder.hasAttribute('data-key')) {
        var name = folder.querySelector('[data-name="album-name-edit"]');
        var description = folder.querySelector('[data-name="album-description-edit"]');
        var displayName = folder.querySelector('.info--display__name').textContent.trim();
        var displayDescription = folder.querySelector('.info--display__description').textContent.trim();
        var displayWorksNoShow = folder.querySelector('input[name="works-no-show-display"]:checked');
        var worksNoShow = folder.querySelector('.info--edit__works-no-show').querySelector('input[value="' + displayWorksNoShow.value + '"]');
        var displayIsSpecial = folder.querySelector('input[name="is-album-special-display"]:checked');
        var isSpecial = folder.querySelector('.info--edit__is-special').querySelector('input[value="' + displayIsSpecial.value + '"]');
        var coverPicHolder = folder.querySelector('.info--edit__cover');
        var coverPicHolderDisplay = folder.querySelector('.info--display__cover');
        var layout = folder.querySelector('.info--edit__layout');
        var displayLayout = folder.querySelector('.info--display__layout');
        var layoutBox = layout.querySelector('.box-btn');
        var displayLayoutBox = displayLayout.querySelector('.box');
        var layoutGapR = layout.querySelector('.gap-right');
        var displaylLayoutGapR = displayLayout.querySelector('.gapr');
        var layoutParts = layout.querySelector('.layout-parts-stripe');
        var displayLayoutParts = displayLayout.querySelector('.parts');
        var preview = layout.querySelector('.preview');
        var albumGroupSorted = folder.querySelector('.album-folder__group--sortable');
        var albumGroupDisplay = folder.querySelector('.album-folder__group--display');

        folder.classList.add('edit');

        name.textContent = displayName;
        description.textContent = displayDescription;
        isSpecial.checked = true;
        worksNoShow.checked = true;

        var coverId = coverPicHolderDisplay.querySelector('.cover-pic').getAttribute('data-id');
        var coverPic = coverPicHolder.querySelector('.cover-pic');
        var adminPanelCoverPic = new _AdminPanelCoverPic2.default(coverId, _this.db_ref_object);

        adminPanelCoverPic.Replace(coverPic);

        if (JSON.parse(displayLayoutBox.value) === true) {
          alterLayoutPreview(self, layoutBox, preview, 'preview--box');
        } else {
          alterLayoutPreview(self, layoutBox, preview, 'preview--box', true);
        }

        if (JSON.parse(displaylLayoutGapR.value) === true) {
          alterLayoutPreview(self, layoutGapR, preview, 'preview--gap-right');
        } else {
          alterLayoutPreview(self, layoutGapR, preview, 'preview--gap-right', true);
        }

        layoutParts.querySelectorAll('input[type="radio"]').forEach(function (point) {
          if (displayLayoutParts.value === point.value) {
            point.click();
          }
        });

        albumGroupSorted.innerHTML = albumGroupDisplay.innerHTML;

        window.scrollTo(0, 0);
      }
    });
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelCoverPic = __webpack_require__(9);

var _AdminPanelCoverPic2 = _interopRequireDefault(_AdminPanelCoverPic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSortedImageIDs(albumGroupSorted) {
  var imgArr = [];

  if (albumGroupSorted.querySelectorAll('img').length) {
    albumGroupSorted.querySelectorAll('img').forEach(function (pic) {
      var picId = pic.getAttribute('data-id');

      imgArr.push(picId);
    });
  }

  return imgArr;
}

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary save-button">Save</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
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
      var worksNoShow = folder.querySelector('input[name="works-no-show"]:checked');
      var displayWorksNoShow = folder.querySelector('.info--display__works-no-show').querySelector('input[value="' + worksNoShow.value + '"]');
      var isSpecial = folder.querySelector('input[name="is-album-special"]:checked');
      var displayIsSpecial = folder.querySelector('.info--display__is-special').querySelector('input[value="' + isSpecial.value + '"]');
      var coverPicHolder = folder.querySelector('.info--edit__cover');
      var coverPicHolderDisplay = folder.querySelector('.info--display__cover');
      var coverId = coverPicHolder.querySelector('.cover-pic').getAttribute('data-id');
      var layout = folder.querySelector('.info--edit__layout');
      var displayLayout = folder.querySelector('.info--display__layout');
      var displayLayoutBox = displayLayout.querySelector('.box');
      var displaylLayoutGapR = displayLayout.querySelector('.gapr');
      var displayLayoutParts = displayLayout.querySelector('.parts');
      var preview = layout.querySelector('.preview');
      var albumGroupSorted = folder.querySelector('.album-folder__group--sortable');
      var albumGroupDisplay = folder.querySelector('.album-folder__group--display');

      thisSelf.setAttribute('data-og-text', thisSelf.textContent);
      thisSelf.textContent = '....';
      cancel.style.display = 'none';
      thisSelf.style.margin = '0';

      console.log(JSON.parse(worksNoShow.value));

      _this.db_ref_object.child(key).update({
        name: name,
        description: description,
        works_no_show: JSON.parse(worksNoShow.value),
        isSpecial: JSON.parse(isSpecial.value),
        photos_list: getSortedImageIDs(albumGroupSorted),
        cover_pic: coverId,
        layout: {
          box: preview.classList.contains('preview--box'),
          gapr: preview.classList.contains('preview--gap-right'),
          parts: preview.getAttribute('data-parts') ? preview.getAttribute('data-parts') : 2
        },
        mod_date: Date.now()
      }).then(function () {
        var coverPic = coverPicHolderDisplay.querySelector('.cover-pic');
        var adminPanelCoverPic = new _AdminPanelCoverPic2.default(coverId, _this.db_ref_object);

        displayName.textContent = name;
        displayDescription.textContent = description;
        displayIsSpecial.checked = true;
        displayWorksNoShow.checked = true;
        folder.classList.remove('edit');
        thisSelf.textContent = thisSelf.getAttribute('data-og-text');
        cancel.style.display = '';
        thisSelf.style.margin = '';

        adminPanelCoverPic.Replace(coverPic);

        displayLayoutBox.value = preview.classList.contains('preview--box');
        displaylLayoutGapR.value = preview.classList.contains('preview--gap-right');
        displayLayoutParts.value = preview.getAttribute('data-parts') ? preview.getAttribute('data-parts') : 2;

        albumGroupDisplay.innerHTML = albumGroupSorted.innerHTML;
        window.scrollTo(0, 0);
      });
    });
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    super();
  }

  Markup() {
    return '\n      <a href="#" class="btn cancel-button">Cancel</a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement.parentElement;
      var folder = head.parentElement;

      folder.classList.remove('edit');
      window.scrollTo(0, 0);
    });
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(text, className, classToInject, clicked) {
    super('layout-btn');
    this.text = text;
    this.className = className || '';
    this.classToInject = classToInject;
    this.isClicked = clicked || false;
  }

  Markup() {
    return '\n      <a href="#" class="btn ' + (this.isClicked ? 'btn--pressed' : '') + ' ' + this.className + '">' + this.text + '</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var preview = document.getElementById('layout-edit').querySelector('.preview');

      if (self.classList.contains('btn--pressed')) {
        preview.classList.remove(_this.classToInject);
        self.classList.remove('btn--pressed');
      } else {
        preview.classList.add(_this.classToInject);
        self.classList.add('btn--pressed');
      }
    });
  }
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelChangeCoverModal = __webpack_require__(76);

var _AdminPanelChangeCoverModal2 = _interopRequireDefault(_AdminPanelChangeCoverModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(content, dbRefObject) {
    super();
    this.content = content;
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary change-cover">Change Cover</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var modal = new _AdminPanelChangeCoverModal2.default(_this.content, _this.db_ref_object);

      modal.Activate();
    });
  }
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModalWithHeader = __webpack_require__(17);

var _SuperModalWithHeader2 = _interopRequireDefault(_SuperModalWithHeader);

var _AdminPanelSelectableImg = __webpack_require__(18);

var _AdminPanelSelectableImg2 = _interopRequireDefault(_AdminPanelSelectableImg);

var _AdminPanelCoverPic = __webpack_require__(9);

var _AdminPanelCoverPic2 = _interopRequireDefault(_AdminPanelCoverPic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doneFunction(getModal, dbRefObject) {
  var modal = getModal();
  var thisSelf = modal.querySelector('.change-cover-modal');
  var selected = thisSelf.querySelector('input[type="radio"]:checked');
  var coverPic = document.querySelector('.info--edit__cover').querySelector('.cover-pic');

  if (selected) {
    var getValue = selected.value;
    var adminPanelCoverPic = new _AdminPanelCoverPic2.default(getValue, dbRefObject);

    adminPanelCoverPic.Replace(coverPic);
  }
}

exports.default = class extends _SuperModalWithHeader2.default {
  constructor(content, dbRefObject) {
    var _this;

    _this = super();
    this.content = content;
    this.db_ref_object = dbRefObject;
    this.Done = function () {
      doneFunction(_this.GetSuperModal, _this.db_ref_object);
    };
  }

  Markup() {
    return '\n      <div class="change-cover-modal image-picker"></div>\n    ';
  }

  AfterRenderDone() {
    var modal = this.GetSuperModal();
    var photosHolder = modal.querySelector('.change-cover-modal');
    var coverPic = document.querySelector('.info--edit__cover').querySelector('.cover-pic');

    if (this.content.photos_list && this.content.photos_list.length) {
      var photosList = this.content.photos_list;
      var curruntCover = coverPic.getAttribute('data-id') || '';
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
            var img = new _AdminPanelSelectableImg2.default(isData, false, isData.image_id === curruntCover);
            photosHolder.innerHTML += '' + img.Render();
          }
        };

        for (var i = 0; i < photosList.length; i++) {
          _loop(i);
        }
      });
    }
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeSuperModal = __webpack_require__(78);

var _removeSuperModal2 = _interopRequireDefault(_removeSuperModal);

var _SuperModalCloke = __webpack_require__(79);

var _SuperModalCloke2 = _interopRequireDefault(_SuperModalCloke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor() {
    super('modal-content');
    this.RemoveModal = _removeSuperModal2.default;
    this.GetSuperModal = function () {
      if (document.querySelector('.super-modal')) {
        return document.querySelector('.super-modal');
      }
    };
  }

  Markup() {
    return '\n      <div>Super Modal</div>\n    ';
  }

  afterActivateProcess() {
    var _this = this;

    setTimeout(function (e) {
      _this.AfterActivate();
    }, 100);
  }

  AfterActivate() {}

  Activate() {
    var wrapper = document.getElementById('wrapper');
    var htmlParent = document.querySelector('html');
    var superModal = document.createElement('DIV');
    var cloke = new _SuperModalCloke2.default(this.RemoveModal);

    this.RemoveModal();

    superModal.classList.add('super-modal');

    if (this.Header) {
      superModal.innerHTML = '\n        <div class="super-modal__content">\n          ' + this.Header() + '\n          <div class="super-modal__body">\n            ' + this.Render() + '\n          </div>\n        </div>\n        <div class="super-modal__control">\n          ' + cloke.Render() + '\n        </div>\n      ';
    } else {
      superModal.innerHTML = '\n        <div class="super-modal__content">\n          ' + this.Render() + '\n        </div>\n        <div class="super-modal__control">\n          ' + cloke.Render() + '\n        </div>\n      ';
    }

    wrapper.insertBefore(superModal, wrapper.firstChild);
    htmlParent.style.overflow = 'hidden';
    this.afterActivateProcess();
  }
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function removeSuperModal() {
  var superModal = document.querySelectorAll('.super-modal');
  var htmlParent = document.querySelector('html');

  if (superModal.length) {
    superModal.forEach(function (modal) {
      var parent = modal.parentElement;

      parent.removeChild(modal);
    });
  }

  htmlParent.style.overflow = '';
}

exports.default = removeSuperModal;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(removeSuperModal) {
    super();
    this.RemoveSuperModal = removeSuperModal;
  }

  Markup() {
    return '\n      <div class="super-modal__cloke"></div>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function () {
      _this.RemoveSuperModal();
    });
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(text, toRun, removeModal) {
    var classList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    super();
    this.text = text || 'Done';
    this.toRun = toRun || '';
    this.RemoveModal = removeModal || '';
    this.classList = classList;
  }

  Markup() {
    return '\n      <a href="#" class="btn super-modal__btn ' + this.classList + '">' + this.text + '</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      if (_this.toRun) {
        _this.toRun();
      }

      if (_this.RemoveModal) {
        _this.RemoveModal();
      }
    });
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelAddPhotosModal = __webpack_require__(82);

var _AdminPanelAddPhotosModal2 = _interopRequireDefault(_AdminPanelAddPhotosModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(content, dbRefObject) {
    super();
    this.content = content;
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary add-remove-photos info--edit__add-photos">Add Photos</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var modal = new _AdminPanelAddPhotosModal2.default(_this.content, _this.db_ref_object);
      modal.Activate();
    });
  }
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModalWithHeader = __webpack_require__(17);

var _SuperModalWithHeader2 = _interopRequireDefault(_SuperModalWithHeader);

var _AdminPanelSelectableImg = __webpack_require__(18);

var _AdminPanelSelectableImg2 = _interopRequireDefault(_AdminPanelSelectableImg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doneFunction(getModal, dbRefObject) {
  var modal = getModal();
  var photos = modal.querySelector('.photos-modal');
  var photosArr = photos.querySelectorAll('input[type="checkbox"]:checked');
  var sortableImageHolder = document.querySelector('.album-folder__group--sortable');

  console.log(dbRefObject);

  sortableImageHolder.innerHTML = '';

  if (photosArr.length) {
    photosArr.forEach(function (pic) {
      var img = pic.nextElementSibling.querySelector('img');
      var src = img.getAttribute('data-src');
      var id = pic.value;

      sortableImageHolder.innerHTML += '\n        <img src="' + src + '" alt="" data-id="' + id + '"/>\n      ';
    });
  }
}

exports.default = class extends _SuperModalWithHeader2.default {
  constructor(content, dbRefObject) {
    var _this;

    _this = super();
    this.content = content;
    this.db_ref_object = dbRefObject;
    this.headerText = 'Add/Remove Photos from album';
    this.Done = function () {
      doneFunction(_this.GetSuperModal, _this.db_ref_object);
    };
  }

  Markup() {
    return '\n      <div class="photos-modal image-picker"></div>\n    ';
  }

  AfterActivate() {
    var modal = this.GetSuperModal();
    var thisSelf = modal.querySelector('.photos-modal');

    if (this.content.photos_list && this.content.photos_list.length) {
      var photosList = this.content.photos_list;
      var albumImages = [];
      var otherImages = [];

      this.db_ref_object.once('value', function (snap) {
        var valueSnap = snap.val();
        Object.keys(valueSnap).forEach(function (key) {
          var content = valueSnap[key];
          content.key = key;

          if (content.image_id) {
            if (photosList.includes(content.image_id)) {
              albumImages.push(content);
            } else {
              otherImages.push(content);
            }
          }
        });

        var _loop = function _loop(i) {
          var isData = albumImages.find(function (x) {
            return x.image_id === photosList[i];
          });
          if (isData) {
            var img = new _AdminPanelSelectableImg2.default(isData, true, true);
            thisSelf.innerHTML += '' + img.Render();
          }
        };

        for (var i = 0; i < photosList.length; i++) {
          _loop(i);
        }

        otherImages.forEach(function (imgData) {
          var img = new _AdminPanelSelectableImg2.default(imgData, true, false);
          thisSelf.innerHTML += '' + img.Render();
        });
      });
    }
  }
};

/***/ }),
/* 83 */
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
      var imageFolder = new _AdminPanelImageFolderContainer2.default(fire, data.metadata.id);
      wrapper.innerHTML = imageFolder.Render();
    } else {
      location.hash = '#/';
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(4);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelImageFolderContainer = __webpack_require__(84);

var _AdminPanelImageFolderContainer2 = _interopRequireDefault(_AdminPanelImageFolderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(6);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _NoInput = __webpack_require__(5);

var _AdminPanelHeader = __webpack_require__(7);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(8);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelImageShowCase = __webpack_require__(85);

var _AdminPanelImageShowCase2 = _interopRequireDefault(_AdminPanelImageShowCase);

var _AdminPanelImageEditBtn = __webpack_require__(86);

var _AdminPanelImageEditBtn2 = _interopRequireDefault(_AdminPanelImageEditBtn);

var _AdminPanelImageSaveBtn = __webpack_require__(87);

var _AdminPanelImageSaveBtn2 = _interopRequireDefault(_AdminPanelImageSaveBtn);

var _AdminPanelImageCancelBtn = __webpack_require__(88);

var _AdminPanelImageCancelBtn2 = _interopRequireDefault(_AdminPanelImageCancelBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, imageId) {
    super();
    this.firebase = fire;
    this.image_id = imageId;
    this.db_ref_object = this.firebase.database().ref();
  }

  Markup() {
    var header = (0, _AdminPanelHeader2.default)(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');
    var EditBtn = new _AdminPanelImageEditBtn2.default(this.db_ref_object);
    var SaveBtn = new _AdminPanelImageSaveBtn2.default(this.db_ref_object);
    var CancelBtn = new _AdminPanelImageCancelBtn2.default();

    return '\n      <div class="image-folder-main-container">\n        ' + header + '\n        <div class="folder image-folder scroll">\n          <div class="folder__head image-folder__head scroll__head">\n            <div class="folder__head__container container image-folder__head__container">\n              <a href="#/?stream=image" class="back-button"><svg role="img" class="icon"><use xlink:href="#icon-Design-12"></use></svg><span>Back</span></a>\n              ' + EditBtn.Render() + '\n              <div class="decision">\n                ' + SaveBtn.Render() + '\n                ' + CancelBtn.Render() + '\n              </div>\n            </div>\n          </div>\n          <div class="image-folder__body">\n            <div class="image-folder__body__container">...</div>\n          </div>\n          ' + topButton.Render() + '\n        </div>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var album = thisSelf.querySelector('.image-folder');
    var folder = thisSelf.querySelector('.image-folder__body__container');

    this.db_ref_object.once('value', function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;
        if (content.image_id === _this.image_id) {
          var imageShowCase = new _AdminPanelImageShowCase2.default(content);
          var albumNameEdit = new _NoInput.Text('image-name-edit', {
            title: 'Title',
            example: 'e.g. Golden Hour at Pondicherry',
            placeholder: 'Enter Title',
            labelClass: 'name-edit',
            value: content.name
          });
          var albumDescriptionEdit = new _NoInput.TextArea('image-description-edit', {
            title: 'Description',
            placeholder: 'Enter Description',
            labelClass: 'description-edit',
            value: content.description
          });
          album.setAttribute('data-key', key);
          folder.innerHTML = '\n            ' + imageShowCase.Render() + '\n            <div class="container">\n              <div class="info info--display">\n                <div class="info--display__isMature" data-value="' + (content.isMature ? 'true' : 'false') + '">\n                  <span>Mature Content</span>\n                </div>\n                <h1 class="info--display__name">' + content.name + '</h1>\n                <div class="info--display__description">' + content.description.trim() + '</div>\n              </div>\n              <div class="info info--edit">\n                <div class="devide">\n                  <div class="info--edit__name">\n                    ' + albumNameEdit.Render() + '\n                  </div>\n                  <div class="info--edit__description">\n                    ' + albumDescriptionEdit.Render() + '\n                  </div>\n                  <div class="info--edit__isMature info--edit__choice">\n                    <h3>Mature Content?</h3>\n                    <div class="btn-group">\n                      ' + (content.isMature ? '\n                        <label>\n                          <input type="radio" name="isMature" value="true" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isMature" value="false"/>\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="isMature" value="true" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isMature" value="false" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          ';
          folder.classList.add('found');
        }
      });
    }).then(function () {
      if (!folder.classList.contains('found')) {
        folder.innerHTML = '<div>No Album</div>';
      } else {
        (0, _scrollAction2.default)(thisSelf);
      }
    });
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(content) {
    super();
    this.content = content;
  }

  Markup() {
    return '\n    <div class="image-showcase" data-id="' + this.content.image_id + '">\n      <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" />\n    </div>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.GetThisComponent();
    var img = thisSelf.querySelector('img');

    img.src = this.content.img.thumb_small;
    img.setAttribute('data-src', this.content.img.thumb_large);

    setTimeout(function () {
      var dataSrc = img.getAttribute('data-src');
      img.src = dataSrc;
    }, 1500);
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary edit-button">Edit Image</a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement;
      var folder = head.parentElement;

      if (folder.hasAttribute('data-key')) {
        var name = folder.querySelector('[data-name="image-name-edit"]');
        var displayName = folder.querySelector('.info--display__name').textContent.trim();
        var description = folder.querySelector('[data-name="image-description-edit"]');
        var displayDescription = folder.querySelector('.info--display__description').textContent.trim();
        var displayIsMature = folder.querySelector('.info--display__isMature').getAttribute('data-value');
        var isMature = folder.querySelector('.info--edit__isMature').querySelector('input[value="' + displayIsMature + '"]');

        folder.classList.add('edit');

        name.textContent = displayName;
        description.textContent = displayDescription;
        isMature.checked = true;

        window.scrollTo(0, 0);
      }
    });
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--primary save-button">Save</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var thisSelf = self;
      var head = thisSelf.parentElement.parentElement.parentElement;
      var folder = head.parentElement;
      var cancel = folder.querySelector('.cancel-button');
      var key = folder.getAttribute('data-key');
      var name = folder.querySelector('[data-name="image-name-edit"]').textContent.trim();
      var description = folder.querySelector('[data-name="image-description-edit"]').textContent.trim();
      var displayName = folder.querySelector('.info--display__name');
      var displayDescription = folder.querySelector('.info--display__description');
      var isMature = folder.querySelector('.info--edit__isMature').querySelector('input[type="radio"]:checked');
      var displayIsMature = folder.querySelector('.info--display__isMature');

      thisSelf.setAttribute('data-og-text', thisSelf.textContent);
      thisSelf.textContent = '....';
      cancel.style.display = 'none';
      thisSelf.style.margin = '0';

      _this.db_ref_object.child(key).update({
        name: name,
        description: description,
        isMature: JSON.parse(isMature.value),
        mod_date: Date.now()
      }).then(function () {
        displayName.textContent = name;
        displayDescription.textContent = description;
        folder.classList.remove('edit');
        thisSelf.textContent = thisSelf.getAttribute('data-og-text');
        cancel.style.display = '';
        thisSelf.style.margin = '';

        displayIsMature.setAttribute('data-value', isMature.value);

        window.scrollTo(0, 0);
      });
    });
  }
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    super();
  }

  Markup() {
    return '\n      <a href="#" class="btn cancel-button">Cancel</a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      var head = self.parentElement.parentElement.parentElement;
      var folder = head.parentElement;

      folder.classList.remove('edit');
      window.scrollTo(0, 0);
    });
  }
};

/***/ }),
/* 89 */
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
      var thisData = data;
      var query = thisData.query;
      var uploderType = query.type || 'image';
      console.log(uploderType);
      var uploader = new _AdminPanelUploaderContainer2.default(fire, uploderType, {
        storageFolder: 'clustertry'
      });
      wrapper.innerHTML = uploader.Render();
    } else {
      location.hash = '#/';
    }
  });

  window.scrollTo(0, 0);
};

var _firebaseConfig = __webpack_require__(4);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelUploaderContainer = __webpack_require__(90);

var _AdminPanelUploaderContainer2 = _interopRequireDefault(_AdminPanelUploaderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(6);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _AdminPanelHeader = __webpack_require__(7);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(8);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelImageUploader = __webpack_require__(91);

var _AdminPanelImageUploader2 = _interopRequireDefault(_AdminPanelImageUploader);

var _AdminPanelAlbumUploader = __webpack_require__(109);

var _AdminPanelAlbumUploader2 = _interopRequireDefault(_AdminPanelAlbumUploader);

var _AdminPanelUploaderCancelBtn = __webpack_require__(106);

var _AdminPanelUploaderCancelBtn2 = _interopRequireDefault(_AdminPanelUploaderCancelBtn);

var _AdminPanelUploaderSaveBtn = __webpack_require__(107);

var _AdminPanelUploaderSaveBtn2 = _interopRequireDefault(_AdminPanelUploaderSaveBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, uploderType) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    super();
    this.firebase = fire;
    this.uploader_type = uploderType || 'image';
    this.upload_to_album = config.uploadToAlbum || '';
    this.storage_folder = config.storageFolder || 'clustertry';
    this.db_ref_object = this.firebase.database().ref();
  }

  Markup() {
    var header = (0, _AdminPanelHeader2.default)(this.firebase);
    var topButton = new _ScrollToTopButton2.default('top-button');
    var cancelBtn = new _AdminPanelUploaderCancelBtn2.default(this.firebase, this.storage_folder);
    var saveBtn = new _AdminPanelUploaderSaveBtn2.default(this.db_ref_object);
    var Uploader = void 0;

    if (this.uploader_type === 'album') {
      Uploader = new _AdminPanelAlbumUploader2.default(this.firebase, this.db_ref_object, this.storage_folder);
    } else {
      Uploader = new _AdminPanelImageUploader2.default(this.firebase, this.db_ref_object, this.storage_folder);
    }

    return '\n      <div class="uploader-main-container">\n        ' + header + '\n        <div class="uploader scroll">\n          <div class="uploader__head scroll__head">\n            <div class="uploader__head__container container">\n              <a href="#/?stream=image" class="back-button"><svg role="img" class="icon"><use xlink:href="#icon-Design-12"></use></svg><span>Back</span></a>\n              ' + saveBtn.Render() + '\n              ' + cancelBtn.Render() + '\n            </div>\n          </div>\n          ' + Uploader.Render() + '\n          ' + topButton.Render() + '\n        </div>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.GetThisComponent();
    (0, _scrollAction2.default)(thisSelf);
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderSidebar = __webpack_require__(92);

var _AdminPanelImageUploaderSidebar2 = _interopRequireDefault(_AdminPanelImageUploaderSidebar);

var _AdminPanelUploadArea = __webpack_require__(94);

var _AdminPanelUploadArea2 = _interopRequireDefault(_AdminPanelUploadArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, dbRefObject, storageFolder) {
    super();
    this.firebase = fire;
    this.db_ref_object = dbRefObject;
    this.storage_folder = storageFolder;
  }

  Markup() {
    var sidebar = new _AdminPanelImageUploaderSidebar2.default(this.db_ref_object);
    var uploadArea = new _AdminPanelUploadArea2.default(this.firebase, this.storage_folder);

    return '\n      <div class="uploader__body" data-uploader-type="image">\n        ' + sidebar.Render() + '\n        ' + uploadArea.Render() + '\n      </div>\n    ';
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderPickAlbumThumb = __webpack_require__(93);

var _AdminPanelImageUploaderPickAlbumThumb2 = _interopRequireDefault(_AdminPanelImageUploaderPickAlbumThumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadCoverPic(album, dbRefObject) {
  var promiseObj = new Promise(function (resolve, reject) {
    dbRefObject.once('value').then(function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;

        if (content.image_id && content.image_id === album.cover_pic) {
          resolve(content);
        }
      });
    }).catch(function (err) {
      reject(err);
    });
  });

  return promiseObj;
}

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    return '\n      <aside class="uploader__sidebar container">\n        <h1>Upload Images</h1>\n        <div class="uploader__sidebar__albums">\n          <h3>Albums</h3>\n          <ul></ul>\n        </div>\n      </aside>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var albumsSelector = thisSelf.querySelector('ul');

    albumsSelector.innerHTML = '';

    this.db_ref_object.once('value', function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;

        if (content.album_id) {
          if (content.cover_pic) {
            loadCoverPic(content, _this.db_ref_object).then(function (image) {
              var pickAlbumThumb = new _AdminPanelImageUploaderPickAlbumThumb2.default(content, image);
              pickAlbumThumb.AddTo(albumsSelector);
            });
          } else {
            var pickAlbumThumb = new _AdminPanelImageUploaderPickAlbumThumb2.default(content);
            pickAlbumThumb.AddTo(albumsSelector);
          }
        }
      });
    });
  }
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(album) {
    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.album = album;
    this.image = image;
    this.placeholder = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  }

  Markup() {
    return '\n      <li>\n        <label>\n          <input type="checkbox" name="pick-host-album" data-key="' + this.album.key + '" value="' + this.album.album_id + '"/>\n          <span>\n            <img src="' + this.placeholder + '" data-src="' + (this.image ? this.image.img.thumb_small : this.placeholder) + '" alt="" />\n          </span>\n          <p>' + this.album.name + '</p>\n        </label>\n      </li>\n    ';
  }

  AfterRenderDone() {
    var thisSelf = this.GetThisComponent();
    var img = thisSelf.querySelector('img');
    img.src = img.getAttribute('data-src');
  }
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderThumb = __webpack_require__(95);

var _AdminPanelImageUploaderThumb2 = _interopRequireDefault(_AdminPanelImageUploaderThumb);

var _resizeImage = __webpack_require__(96);

var _resizeImage2 = _interopRequireDefault(_resizeImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, storageFolder) {
    super();
    this.fire = fire;
    this.storage_folder = storageFolder;
  }

  Markup() {
    return '\n      <div class="uploader__area container">\n        <h3>Upload Area</h3>\n        <ul class="uploader__area__preview"></ul>\n        <label>\n          <input class="uploader__area__file" name="my-file" type="file" multiple />\n        </label>\n      </div>\n    ';
  }

  AfterRenderDone() {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var myFile = thisSelf.querySelector('.uploader__area__file');
    var preview = thisSelf.querySelector('.uploader__area__preview');

    myFile.addEventListener('change', function (e) {
      if (e.target.files[0]) {
        var files = e.target.files;

        preview.innerHTML = '';

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var fileType = file.type.toString();
          if (fileType.includes('image')) {
            (function () {
              var thumb = new _AdminPanelImageUploaderThumb2.default(i, _this.fire, _this.storage_folder);
              thumb.AddTo(preview);

              var reader = new FileReader();
              reader.onloadend = function () {
                var result = reader.result;
                var img = new Image();
                img.src = result;

                img.onload = function (imgResult) {
                  var compress = (0, _resizeImage2.default)(imgResult.target, {
                    height: 200,
                    quality: 6
                  });
                  var thumbSmall = (0, _resizeImage2.default)(imgResult.target, {
                    height: 200,
                    quality: 8,
                    strip_url: true
                  });
                  var thumbMedium = (0, _resizeImage2.default)(imgResult.target, {
                    height: 600,
                    quality: 8,
                    strip_url: true
                  });
                  var thumbLarge = (0, _resizeImage2.default)(imgResult.target, {
                    height: 1280,
                    quality: 8,
                    strip_url: true
                  });
                  thumb.Image(compress);

                  thumb.Small(thumbSmall);
                  thumb.Medium(thumbMedium);
                  thumb.Large(thumbLarge);
                };
              };
              reader.readAsDataURL(file);
            })();
          }
        }
      }
    });
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _uploadToFirebasePromise = __webpack_require__(105);

var _uploadToFirebasePromise2 = _interopRequireDefault(_uploadToFirebasePromise);

var _NoInput = __webpack_require__(5);

var _AdminPanelImageUploaderThumbDeleteBtn = __webpack_require__(103);

var _AdminPanelImageUploaderThumbDeleteBtn2 = _interopRequireDefault(_AdminPanelImageUploaderThumbDeleteBtn);

var _AdminPanelImageUploaderThumbIsMatureBtn = __webpack_require__(108);

var _AdminPanelImageUploaderThumbIsMatureBtn2 = _interopRequireDefault(_AdminPanelImageUploaderThumbIsMatureBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(uploadSeqId, fire, storageFolder) {
    super();
    this.upload_seq = uploadSeqId;
    this.fire = fire;
    this.random = Math.random().toString(36).substring(2);
    this.name = 'pic-' + this.random;
    this.storage_folder = storageFolder;
  }

  Markup() {
    var deleteBtn = new _AdminPanelImageUploaderThumbDeleteBtn2.default(this.fire, this.storage_folder);
    var isMatureBtn = new _AdminPanelImageUploaderThumbIsMatureBtn2.default();

    var Title = new _NoInput.Text('image-name-edit', {
      title: 'Title',
      example: 'e.g. Sunset at Pondi',
      placeholder: 'Enter Title',
      labelClass: 'name-edit'
    });

    var Description = new _NoInput.TextArea('image-description-edit', {
      title: 'Description',
      placeholder: 'Enter Description',
      labelClass: 'description-edit'
    });

    return '\n      <li class="image-uploader__thumb" data-id="' + this.name + '" data-upload-seq="' + this.upload_seq + '">\n        ' + deleteBtn.Render() + '\n        <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" />\n        <div class="image-uploader__slab-holder">\n          <span class="image-uploader__slab" data-slab="small"></span>\n          <span class="image-uploader__slab" data-slab="medium"></span>\n          <span class="image-uploader__slab" data-slab="large"></span>\n        </div>\n        <div class="info">\n          ' + Title.Render() + '\n          ' + Description.Render() + '\n          ' + isMatureBtn.Render() + '\n        </div>\n      </li>\n    ';
  }

  Image(file) {
    var thisSelf = this.GetThisComponent();
    var preview = thisSelf.querySelector('img');

    preview.src = file;
  }

  slabMake(slabType, data) {
    var _this = this;

    var thisSelf = this.GetThisComponent();
    var slab = thisSelf.querySelector('[data-slab="' + slabType + '"]');
    var path = this.storage_folder + '/' + this.name + '-' + slabType + '.jpg';

    if (slab) {
      slab.setAttribute('data-value', data);
      (0, _uploadToFirebasePromise2.default)(this.fire, data, path).then(function (url) {
        slab.removeAttribute('data-value');
        slab.setAttribute('data-id', _this.name + '-' + slabType);
        slab.setAttribute('data-url', url);

        if (slabType === 'small') {
          var preview = thisSelf.querySelector('img');
          preview.src = url;
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

  Small(data) {
    this.slabMake('small', data);
  }

  Medium(data) {
    this.slabMake('medium', data);
  }

  Large(data) {
    this.slabMake('large', data);
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function resizeImage(target) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var thisTarget = target;
  var height = config.height || 200;
  var quality = config.quality || 8;
  var stripUrl = config.strip_url || false;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var maxHeight = height;

  thisTarget.width *= maxHeight / thisTarget.height;
  thisTarget.height = maxHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = thisTarget.width;
  canvas.height = thisTarget.height;
  ctx.drawImage(thisTarget, 0, 0, thisTarget.width, thisTarget.height);

  var result = canvas.toDataURL('image/jpeg', quality);

  if (stripUrl) {
    var split = result.split(',');
    result = split[1];
  }

  return result;
}

exports.default = resizeImage;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(104);

var _removeFromFirebasePromise2 = _interopRequireDefault(_removeFromFirebasePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, storageFolder) {
    super();
    this.fire = fire;
    this.storage_folder = storageFolder;
  }

  Markup() {
    return '\n      <a href="#" class="delete-btn"><svg role="img" class="icon"><use xlink:href="#icon-general-02"></use></svg></a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var thisSelf = self;
      var parent = thisSelf.parentElement;
      var grandParent = parent.parentElement;
      var slab = parent.querySelectorAll('.image-uploader__slab');

      slab.forEach(function (slb) {
        var thisSlab = slb;
        var dataId = thisSlab.getAttribute('data-id');

        if (dataId) {
          (0, _removeFromFirebasePromise2.default)(_this.fire, _this.storage_folder + '/' + dataId + '.jpg').then(function () {
            thisSlab.parentElement.removeChild(thisSlab);
          });
        }
      });

      grandParent.removeChild(parent);
    });
  }
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function removeFromFirebase(fire, path) {
  var promiseObj = new Promise(function (resolve, reject) {
    var desertRef = fire.storage().ref(path);

    desertRef.delete().then(function () {
      console.log(path);
      resolve();
    }).catch(function (err) {
      reject(err);
    });
  });

  return promiseObj;
}

exports.default = removeFromFirebase;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function uploadToFirebase(fire, image, path) {
  var promiseObj = new Promise(function (resolve, reject) {
    var storageRef = fire.storage().ref(path);
    var uploadTask = storageRef.putString(image, 'base64');

    uploadTask.on('state_changed', function progress() {}, function error(err) {
      reject(err);
    }, function complete() {
      storageRef.getDownloadURL().then(function (url) {
        resolve(url);
      });
    });
  });

  return promiseObj;
}

exports.default = uploadToFirebase;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(104);

var _removeFromFirebasePromise2 = _interopRequireDefault(_removeFromFirebasePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, storageFolder) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    super();
    this.fire = fire;
    this.storage_folder = storageFolder;
    this.back_to = config.backTo || '';
  }

  Markup() {
    return '\n     <a href="#" class="btn cancel-button">Cancel</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var thisSelf = self;
      var parent = thisSelf.parentElement.parentElement.parentElement.parentElement;
      var back = parent.querySelector('.back-button');
      var slabs = parent.querySelectorAll('.image-uploader__slab');

      if (slabs[0]) {
        slabs.forEach(function (slab) {
          var thisSlab = slab;
          var dataId = thisSlab.getAttribute('data-id');

          if (dataId) {
            (0, _removeFromFirebasePromise2.default)(_this.fire, _this.storage_folder + '/' + dataId + '.jpg');
          }
        });
      }

      if (_this.back_to) {} else {
        back.click();
      }
    });
  }
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

function findAlbumByKey(targetkey, dbRefObject) {
  var promiseObj = new Promise(function (resolve, reject) {
    dbRefObject.once('value').then(function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;

        if (targetkey === key) {
          resolve(content);
        }
      });
    }).catch(function (err) {
      reject(err);
    });
  });

  return promiseObj;
}

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.db_ref_object = dbRefObject;
    this.back_to = config.backTo || '';
  }

  Markup() {
    return '\n     <a href="#" class="btn btn--primary save-button">Save</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var thisSelf = self;
      var parent = thisSelf.parentElement.parentElement.parentElement.parentElement;
      var back = parent.querySelector('.back-button');
      var slabs = parent.querySelectorAll('.image-uploader__slab');
      var uploaderType = parent.querySelector('.uploader__body').getAttribute('data-uploader-type');

      if (slabs[0]) {
        var length = slabs.length;
        var uploaded = 0;

        slabs.forEach(function (slab) {
          if (slab.hasAttribute('data-url')) {
            uploaded += 1;
          }
        });

        if (uploaded === length) {
          var images = parent.querySelectorAll('.image-uploader__thumb');
          var albumsPic = parent.querySelector('.uploader__sidebar__albums');

          images.forEach(function (image) {
            var thisImage = image;
            var imageId = thisImage.getAttribute('data-id');
            var name = thisImage.querySelector('[data-name="image-name-edit"]').textContent.trim();
            var description = thisImage.querySelector('[data-name="image-description-edit"]').textContent.trim();
            var date = Date.now();
            var isMature = thisImage.querySelector('.isMature-btn').classList.contains('active');
            var thumbSmall = thisImage.querySelector('[data-slab="small"]').getAttribute('data-url');
            var thumbMedium = thisImage.querySelector('[data-slab="medium"]').getAttribute('data-url');
            var thumbLarge = thisImage.querySelector('[data-slab="large"]').getAttribute('data-url');

            _this.db_ref_object.push({
              image_id: imageId,
              name: name,
              date: date,
              description: description,
              isMature: isMature,
              img: {
                thumb_small: thumbSmall,
                thumb_medium: thumbMedium,
                thumb_large: thumbLarge
              }
            });
          });

          if (uploaderType === 'album') {} else {
            var selectedAlbums = albumsPic.querySelectorAll('input[type="checkbox"]:checked');
            if (selectedAlbums[0]) {
              selectedAlbums.forEach(function (album) {
                var key = album.getAttribute('data-key');

                findAlbumByKey(key, _this.db_ref_object).then(function (content) {
                  var thisContent = content;
                  var photosList = thisContent.photos_list || [];
                  images.forEach(function (image) {
                    var imageId = image.getAttribute('data-id');
                    photosList.push(imageId);
                  });

                  _this.db_ref_object.child(key).update({
                    photos_list: photosList
                  });
                });
              });
            }
          }

          if (_this.back_to) {} else {
            setTimeout(function () {
              back.click();
            }, 1000);
          }
        }
      }
    });
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(104);

var _removeFromFirebasePromise2 = _interopRequireDefault(_removeFromFirebasePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor() {
    super();
  }

  Markup() {
    return '\n      <a href="#" class="btn isMature-btn"></a>\n    ';
  }

  Events() {
    this.Click(function (self, e) {
      e.preventDefault();
      var thisSelf = self;

      thisSelf.classList.toggle('active');
    });
  }
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelAlbumUploaderSidebar = __webpack_require__(110);

var _AdminPanelAlbumUploaderSidebar2 = _interopRequireDefault(_AdminPanelAlbumUploaderSidebar);

var _AdminPanelUploadArea = __webpack_require__(94);

var _AdminPanelUploadArea2 = _interopRequireDefault(_AdminPanelUploadArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, dbRefObject, storageFolder) {
    super();
    this.firebase = fire;
    this.db_ref_object = dbRefObject;
    this.storage_folder = storageFolder;
  }

  Markup() {
    var sidebar = new _AdminPanelAlbumUploaderSidebar2.default(this.db_ref_object);
    var uploadArea = new _AdminPanelUploadArea2.default(this.firebase, this.storage_folder);

    return '\n      <div class="uploader__body" data-uploader-type="album">\n        ' + sidebar.Render() + '\n        ' + uploadArea.Render() + '\n      </div>\n    ';
  }
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _NoInput = __webpack_require__(5);

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
  }

  Markup() {
    var Title = new _NoInput.Text('image-name-edit', {
      title: 'Title',
      example: 'e.g. Sunset at Pondi',
      placeholder: 'Enter Title',
      labelClass: 'name-edit'
    });

    var Description = new _NoInput.TextArea('image-description-edit', {
      title: 'Description',
      placeholder: 'Enter Description',
      labelClass: 'description-edit'
    });

    return '\n      <aside class="uploader__sidebar container">\n        <h1>Create Album</h1>\n        ' + Title.Render() + '\n        ' + Description.Render() + '\n      </aside>\n    ';
  }
};

/***/ })
/******/ ]);