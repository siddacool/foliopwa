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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
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

var _Component = __webpack_require__(53);

var _Component2 = _interopRequireDefault(_Component);

var _Router = __webpack_require__(57);

var _Router2 = _interopRequireDefault(_Router);

var _utils = __webpack_require__(62);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _Component2.default;
exports.Router = _Router2.default;
exports.utils = _utils2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var util = __webpack_require__(18);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
// An array to capture listeners before the true auth functions
// exist
var tokenListeners = [];
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.services_ = {};
        this.name_ = config.name;
        this._automaticDataCollectionEnabled =
            config.automaticDataCollectionEnabled || false;
        this.options_ = util.deepCopy(options);
        this.INTERNAL = {
            getUid: function () { return null; },
            getToken: function () { return Promise.resolve(null); },
            addAuthTokenListener: function (callback) {
                tokenListeners.push(callback);
                // Make sure callback is called, asynchronously, in the absence of the auth module
                setTimeout(function () { return callback(null); }, 0);
            },
            removeAuthTokenListener: function (callback) {
                tokenListeners = tokenListeners.filter(function (listener) { return listener !== callback; });
            }
        };
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this._automaticDataCollectionEnabled;
        },
        set: function (val) {
            this.checkDestroyed_();
            this._automaticDataCollectionEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            var services = [];
            Object.keys(_this.services_).forEach(function (serviceKey) {
                Object.keys(_this.services_[serviceKey]).forEach(function (instanceKey) {
                    services.push(_this.services_[serviceKey][instanceKey]);
                });
            });
            return Promise.all(services.map(function (service) {
                return service.INTERNAL.delete();
            }));
        })
            .then(function () {
            _this.isDeleted_ = true;
            _this.services_ = {};
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage is the only one that is leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        this.checkDestroyed_();
        if (!this.services_[name]) {
            this.services_[name] = {};
        }
        if (!this.services_[name][instanceIdentifier]) {
            /**
             * If a custom instance has been defined (i.e. not '[DEFAULT]')
             * then we will pass that instance on, otherwise we pass `null`
             */
            var instanceSpecifier = instanceIdentifier !== DEFAULT_ENTRY_NAME
                ? instanceIdentifier
                : undefined;
            var service = this.firebase_.INTERNAL.factories[name](this, this.extendApp.bind(this), instanceSpecifier);
            this.services_[name][instanceIdentifier] = service;
        }
        return this.services_[name][instanceIdentifier];
    };
    /**
     * Callback function used to extend an App instance at the time
     * of service instance creation.
     */
    FirebaseAppImpl.prototype.extendApp = function (props) {
        var _this = this;
        // Copy the object onto the FirebaseAppImpl prototype
        util.deepExtend(this, props);
        /**
         * If the app has overwritten the addAuthTokenListener stub, forward
         * the active token listeners on to the true fxn.
         *
         * TODO: This function is required due to our current module
         * structure. Once we are able to rely strictly upon a single module
         * implementation, this code should be refactored and Auth should
         * provide these stubs and the upgrade logic
         */
        if (props.INTERNAL && props.INTERNAL.addAuthTokenListener) {
            tokenListeners.forEach(function (listener) {
                _this.INTERNAL.addAuthTokenListener(listener);
            });
            tokenListeners = [];
        }
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            error('app-deleted', { name: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var apps_ = {};
    var factories = {};
    var appHooks = {};
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        __esModule: true,
        initializeApp: initializeApp,
        app: app,
        apps: null,
        Promise: Promise,
        SDK_VERSION: '5.0.2',
        INTERNAL: {
            registerService: registerService,
            createFirebaseNamespace: createFirebaseNamespace,
            extendNamespace: extendNamespace,
            createSubscribe: util.createSubscribe,
            ErrorFactory: util.ErrorFactory,
            removeApp: removeApp,
            factories: factories,
            useAsService: useAsService,
            Promise: Promise,
            deepExtend: util.deepExtend
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    util.patchProperty(namespace, 'default', namespace);
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        var app = apps_[name];
        callAppHooks(app, 'delete');
        delete apps_[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!contains(apps_, name)) {
            error('no-app', { name: name });
        }
        return apps_[name];
    }
    util.patchProperty(app, 'App', FirebaseAppImpl);
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            error('bad-app-name', { name: name + '' });
        }
        if (contains(apps_, name)) {
            error('duplicate-app', { name: name });
        }
        var app = new FirebaseAppImpl(options, config, namespace);
        apps_[name] = app;
        callAppHooks(app, 'create');
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps_).map(function (name) { return apps_[name]; });
    }
    /*
     * Register a Firebase Service.
     *
     * firebase.INTERNAL.registerService()
     *
     * TODO: Implement serviceProperties.
     */
    function registerService(name, createService, serviceProperties, appHook, allowMultipleInstances) {
        // Cannot re-register a service that already exists
        if (factories[name]) {
            error('duplicate-service', { name: name });
        }
        // Capture the service factory for later service instantiation
        factories[name] = createService;
        // Capture the appHook, if passed
        if (appHook) {
            appHooks[name] = appHook;
            // Run the **new** app hook on all existing apps
            getApps().forEach(function (app) {
                appHook('create', app);
            });
        }
        // The Service namespace is an accessor function ...
        var serviceNamespace = function (appArg) {
            if (appArg === void 0) { appArg = app(); }
            if (typeof appArg[name] !== 'function') {
                // Invalid argument.
                // This happens in the following case: firebase.storage('gs:/')
                error('invalid-app-argument', { name: name });
            }
            // Forward service instance lookup to the FirebaseApp.
            return appArg[name]();
        };
        // ... and a container for service-level properties.
        if (serviceProperties !== undefined) {
            util.deepExtend(serviceNamespace, serviceProperties);
        }
        // Monkey-patch the serviceNamespace onto the firebase namespace
        namespace[name] = serviceNamespace;
        // Patch the FirebaseAppImpl prototype
        FirebaseAppImpl.prototype[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var serviceFxn = this._getService.bind(this, name);
            return serviceFxn.apply(this, allowMultipleInstances ? args : []);
        };
        return serviceNamespace;
    }
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        util.deepExtend(namespace, props);
    }
    function callAppHooks(app, eventName) {
        Object.keys(factories).forEach(function (serviceName) {
            // Ignore virtual services
            var factoryName = useAsService(app, serviceName);
            if (factoryName === null) {
                return;
            }
            if (appHooks[factoryName]) {
                appHooks[factoryName](eventName, app);
            }
        });
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        var options = app.options;
        return useService;
    }
    return namespace;
}
function error(code, args) {
    throw appErrors.create(code, args);
}
// TypeScript does not support non-string indexes!
// let errors: {[code: AppError: string} = {
var errors = {
    'no-app': "No Firebase App '{$name}' has been created - " +
        'call Firebase App.initializeApp()',
    'bad-app-name': "Illegal App name: '{$name}",
    'duplicate-app': "Firebase App named '{$name}' already exists",
    'app-deleted': "Firebase App named '{$name}' already deleted",
    'duplicate-service': "Firebase service named '{$name}' already registered",
    'sa-not-supported': 'Initializing the Firebase SDK with a service ' +
        'account is only allowed in a Node.js environment. On client ' +
        'devices, you should instead initialize the SDK with an api key and ' +
        'auth domain',
    'invalid-app-argument': 'firebase.{$name}() takes either no argument or a ' +
        'Firebase App instance.'
};
var appErrors = new util.ErrorFactory('app', 'Firebase', errors);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var firebase = createFirebaseNamespace();

exports.firebase = firebase;
exports.default = firebase;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stripe = exports.Radio = exports.Checkbox = exports.TextArea = exports.Password = exports.Text = undefined;

var _Text = __webpack_require__(19);

var _Text2 = _interopRequireDefault(_Text);

var _Password = __webpack_require__(79);

var _Password2 = _interopRequireDefault(_Password);

var _TextArea = __webpack_require__(80);

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Checkbox = __webpack_require__(81);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Radio = __webpack_require__(82);

var _Radio2 = _interopRequireDefault(_Radio);

var _Stripe = __webpack_require__(83);

var _Stripe2 = _interopRequireDefault(_Stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Text = _Text2.default;
exports.Password = _Password2.default;
exports.TextArea = _TextArea2.default;
exports.Checkbox = _Checkbox2.default;
exports.Radio = _Radio2.default;
exports.Stripe = _Stripe2.default;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocationSet = __webpack_require__(60);

var _hashLocationSet2 = _interopRequireDefault(_hashLocationSet);

var _hashLocationGet = __webpack_require__(61);

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
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/* harmony export (immutable) */ __webpack_exports__["__importStar"] = __importStar;
/* harmony export (immutable) */ __webpack_exports__["__importDefault"] = __importDefault;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
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

var _AdminPanelAccountPop = __webpack_require__(86);

var _AdminPanelAccountPop2 = _interopRequireDefault(_AdminPanelAccountPop);

var _AdminPanelAccountCloak = __webpack_require__(87);

var _AdminPanelAccountCloak2 = _interopRequireDefault(_AdminPanelAccountCloak);

var _AdminPanelAccountLogout = __webpack_require__(88);

var _AdminPanelAccountLogout2 = _interopRequireDefault(_AdminPanelAccountLogout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = __webpack_require__(8);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 * @param {*} assertion The assertion to be tested for falsiness
 * @param {!string} message The message to display if the check fails
 */
var assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 * @param {string} message
 * @return {!Error}
 */
var assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray = function (str) {
    // TODO(user): Use native implementations if/when available
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) == 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) == 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {Array<number>} bytes Array of numbers representing characters.
 * @return {string} Stringification of the array.
 */
var byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    var out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// Static lookup maps, lazily populated by init_()
var base64 = {
    /**
     * Maps bytes to characters.
     * @type {Object}
     * @private
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @type {Object}
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     * @type {string}
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     * @type {string}
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     * @type {string}
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     * @type {boolean}
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param {boolean=} opt_webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeByteArray: function (input, opt_webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        var byteToCharMap = opt_webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param {string} input A string to encode.
     * @param {boolean=} opt_webSafe If true, we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray(input), opt_webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param {string} input to decode.
     * @param {boolean=} opt_webSafe True if we should use the
     *     alternative alphabet.
     * @return {string} string representing the decoded value.
     */
    decodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, opt_webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param {string} input Input to decode.
     * @param {boolean=} opt_webSafe True if we should use the web-safe alphabet.
     * @return {!Array<number>} bytes representing the decoded value.
     */
    decodeStringToByteArray: function (input, opt_webSafe) {
        this.init_();
        var charToByteMap = opt_webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        var output = [];
        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];
            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 != 64) {
                var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 != 64) {
                    var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_: function () {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 * @param {!string} str
 * @return {!string}
 */
var base64Encode = function (str) {
    var utf8Bytes = stringToByteArray(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param {string} str To be decoded
 * @return {?string} Decoded result, if possible
 */
var base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
// TODO: Really needed (for JSCompiler type checking)?
function patchProperty(obj, prop, value) {
    obj[prop] = value;
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     * @param {((?function(?(Error)): (?|undefined))| (?function(?(Error),?=): (?|undefined)))=} callback
     * @return {!function(?(Error), ?=)}
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return {string} user agent string
 */
var getUA = function () {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
};
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap in the Ripple emulator) nor
 * Cordova `onDeviceReady`, which would normally wait for a callback.
 *
 * @return {boolean} isMobileCordova
 */
var isMobileCordova = function () {
    return (typeof window !== 'undefined' &&
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
};
/**
 * Detect React Native.
 *
 * @return {boolean} True if ReactNative environment is detected.
 */
var isReactNative = function () {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
};
/**
 * Detect Node.js.
 *
 * @return {boolean} True if Node.js environment is detected.
 */
var isNodeSdk = function () {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
};

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error
    .captureStackTrace;
// Export for faking in tests
function patchCapture(captureFake) {
    var result = captureStackTrace;
    captureStackTrace = captureFake;
    return result;
}
var FirebaseError = /** @class */ (function () {
    function FirebaseError(code, message) {
        this.code = code;
        this.message = message;
        // We want the stack value, if implemented by Error
        if (captureStackTrace) {
            // Patches this.stack, omitted calls above ErrorFactory#create
            captureStackTrace(this, ErrorFactory.prototype.create);
        }
        else {
            var err_1 = Error.apply(this, arguments);
            this.name = ERROR_NAME;
            // Make non-enumerable getter for the property.
            Object.defineProperty(this, 'stack', {
                get: function () {
                    return err_1.stack;
                }
            });
        }
    }
    return FirebaseError;
}());
// Back-door inheritance
FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }
    ErrorFactory.prototype.create = function (code, data) {
        if (data === undefined) {
            data = {};
        }
        var template = this.errors[code];
        var fullCode = this.service + '/' + code;
        var message;
        if (template === undefined) {
            message = 'Error';
        }
        else {
            message = template.replace(this.pattern, function (match, key) {
                var value = data[key];
                return value !== undefined ? value.toString() : '<' + key + '?>';
            });
        }
        // Service: Error message (service/code).
        message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
        var err = new FirebaseError(fullCode, message);
        // Populate the Error object with message parts for programmatic
        // accesses (e.g., e.file).
        for (var prop in data) {
            if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                continue;
            }
            err[prop] = data[prop];
        }
        return err;
    };
    return ErrorFactory;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {{header: *, claims: *, data: *, signature: string}}
 */
var decode = function (token) {
    var header = {}, claims = {}, data = {}, signature = '';
    try {
        var parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header: header,
        claims: claims,
        data: data,
        signature: signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidTimestamp = function (token) {
    var claims = decode(token).claims, now = Math.floor(new Date().getTime() / 1000), validSince, validUntil;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (now && validSince && validUntil && now >= validSince && now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {?number}
 */
var issuedAtTime = function (token) {
    var claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time and non-empty
 * signature.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidFormat = function (token) {
    var decoded = decode(token), claims = decoded.claims;
    return (!!decoded.signature &&
        !!claims &&
        typeof claims === 'object' &&
        claims.hasOwnProperty('iat'));
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isAdmin = function (token) {
    var claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// See http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var safeGet = function (obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
        return obj[key];
    // else return undefined.
};
/**
 * Enumerates the keys/values in an object, excluding keys defined on the prototype.
 *
 * @param {?Object.<K,V>} obj Object to enumerate.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var forEach = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn(key, obj[key]);
        }
    }
};
/**
 * Copies all the (own) properties from one object to another.
 * @param {!Object} objTo
 * @param {!Object} objFrom
 * @return {!Object} objTo
 */
var extend = function (objTo, objFrom) {
    forEach(objFrom, function (key, value) {
        objTo[key] = value;
    });
    return objTo;
};
/**
 * Returns a clone of the specified object.
 * @param {!Object} obj
 * @return {!Object} cloned obj.
 */
var clone = function (obj) {
    return extend({}, obj);
};
/**
 * Returns true if obj has typeof "object" and is not null.  Unlike goog.isObject(), does not return true
 * for functions.
 *
 * @param obj {*} A potential object.
 * @returns {boolean} True if it's an object.
 */
var isNonNullObject = function (obj) {
    return typeof obj === 'object' && obj !== null;
};
var isEmpty = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
var getCount = function (obj) {
    var rv = 0;
    for (var key in obj) {
        rv++;
    }
    return rv;
};
var map = function (obj, f, opt_obj) {
    var res = {};
    for (var key in obj) {
        res[key] = f.call(opt_obj, obj[key], key, obj);
    }
    return res;
};
var findKey = function (obj, fn, opt_this) {
    for (var key in obj) {
        if (fn.call(opt_this, obj[key], key, obj)) {
            return key;
        }
    }
    return undefined;
};
var findValue = function (obj, fn, opt_this) {
    var key = findKey(obj, fn, opt_this);
    return key && obj[key];
};
var getAnyKey = function (obj) {
    for (var key in obj) {
        return key;
    }
};
var getValues = function (obj) {
    var res = [];
    var i = 0;
    for (var key in obj) {
        res[i++] = obj[key];
    }
    return res;
};
/**
 * Tests whether every key/value pair in an object pass the test implemented
 * by the provided function
 *
 * @param {?Object.<K,V>} obj Object to test.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var every = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (!fn(key, obj[key])) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a params
 * object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 *
 * @param {!Object} querystringParams
 * @return {string}
 */
var querystring = function (querystringParams) {
    var params = [];
    forEach(querystringParams, function (key, value) {
        if (Array.isArray(value)) {
            value.forEach(function (arrayVal) {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    });
    return params.length ? '&' + params.join('&') : '';
};
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object (e.g. {arg: 'val', arg2: 'val2'})
 *
 * @param {string} querystring
 * @return {!Object}
 */
var querystringDecode = function (querystring) {
    var obj = {};
    var tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(function (token) {
        if (token) {
            var key = token.split('=');
            obj[key[0]] = key[1];
        }
    });
    return obj;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Abstract cryptographic hash interface.
 *
 * See Sha1 and Md5 for sample implementations.
 *
 */
/**
 * Create a cryptographic hash instance.
 *
 * @constructor
 * @struct
 */
var Hash = /** @class */ (function () {
    function Hash() {
        /**
         * The block size for the hasher.
         * @type {number}
         */
        this.blockSize = -1;
    }
    return Hash;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @extends {Hash}
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function (_super) {
    tslib_1.__extends(Sha1, _super);
    function Sha1() {
        var _this = _super.call(this) || this;
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @type {!Array<number>}
         * @private
         */
        _this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @type {!Array<number>}
         * @private
         */
        _this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @type {!Array<number>}
         * @private
         */
        _this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @type {!Array<number>}
         * @private
         */
        _this.pad_ = [];
        /**
         * @private {number}
         */
        _this.inbuf_ = 0;
        /**
         * @private {number}
         */
        _this.total_ = 0;
        _this.blockSize = 512 / 8;
        _this.pad_[0] = 128;
        for (var i = 1; i < _this.blockSize; ++i) {
            _this.pad_[i] = 0;
        }
        _this.reset();
        return _this;
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param {!Array<number>|!Uint8Array|string} buf Block to compress.
     * @param {number=} opt_offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, opt_offset) {
        if (!opt_offset) {
            opt_offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(opt_offset) << 24) |
                        (buf.charCodeAt(opt_offset + 1) << 16) |
                        (buf.charCodeAt(opt_offset + 2) << 8) |
                        buf.charCodeAt(opt_offset + 3);
                opt_offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[opt_offset] << 24) |
                        (buf[opt_offset + 1] << 16) |
                        (buf[opt_offset + 2] << 8) |
                        buf[opt_offset + 3];
                opt_offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, opt_length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (opt_length === undefined) {
            opt_length = bytes.length;
        }
        var lengthMinusBlock = opt_length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < opt_length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf == 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < opt_length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < opt_length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += opt_length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}(Hash));

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/** Turn synchronous function into one called asynchronously. */
function async(fn, onError) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Promise.resolve(true)
            .then(function () {
            fn.apply(void 0, args);
        })
            .catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param {!string} fnName The function name
 * @param {!number} minCount The minimum number of arguments to allow for the function call
 * @param {!number} maxCount The maximum number of argument to allow for the function call
 * @param {!number} argCount The actual number of arguments provided.
 */
var validateArgCount = function (fnName, minCount, maxCount, argCount) {
    var argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        var error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param {!string} fnName The function name
 * @param {!number} argumentNumber The index of the argument
 * @param {boolean} optional Whether or not the argument is optional
 * @return {!string} The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argumentNumber, optional) {
    var argName = '';
    switch (argumentNumber) {
        case 1:
            argName = optional ? 'first' : 'First';
            break;
        case 2:
            argName = optional ? 'second' : 'Second';
            break;
        case 3:
            argName = optional ? 'third' : 'Third';
            break;
        case 4:
            argName = optional ? 'fourth' : 'Fourth';
            break;
        default:
            throw new Error('errorPrefix called with argumentNumber > 4.  Need to update it?');
    }
    var error = fnName + ' failed: ';
    error += argName + ' argument ';
    return error;
}
/**
 * @param {!string} fnName
 * @param {!number} argumentNumber
 * @param {!string} namespace
 * @param {boolean} optional
 */
function validateNamespace(fnName, argumentNumber, namespace, optional) {
    if (optional && !namespace)
        return;
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentNumber, callback, optional) {
    if (optional && !callback)
        return;
    if (typeof callback !== 'function')
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid function.');
}
function validateContextObject(fnName, argumentNumber, context, optional) {
    if (optional && !context)
        return;
    if (typeof context !== 'object' || context === null)
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid context object.');
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray$1 = function (str) {
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            var high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = function (str) {
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.assert = assert;
exports.assertionError = assertionError;
exports.base64 = base64;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.CONSTANTS = CONSTANTS;
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.patchProperty = patchProperty;
exports.Deferred = Deferred;
exports.getUA = getUA;
exports.isMobileCordova = isMobileCordova;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.ErrorFactory = ErrorFactory;
exports.FirebaseError = FirebaseError;
exports.patchCapture = patchCapture;
exports.jsonEval = jsonEval;
exports.stringify = stringify;
exports.decode = decode;
exports.isAdmin = isAdmin;
exports.issuedAtTime = issuedAtTime;
exports.isValidFormat = isValidFormat;
exports.isValidTimestamp = isValidTimestamp;
exports.clone = clone;
exports.contains = contains;
exports.every = every;
exports.extend = extend;
exports.findKey = findKey;
exports.findValue = findValue;
exports.forEach = forEach;
exports.getAnyKey = getAnyKey;
exports.getCount = getCount;
exports.getValues = getValues;
exports.isEmpty = isEmpty;
exports.isNonNullObject = isNonNullObject;
exports.map = map;
exports.safeGet = safeGet;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.Sha1 = Sha1;
exports.async = async;
exports.createSubscribe = createSubscribe;
exports.errorPrefix = errorPrefix;
exports.validateArgCount = validateArgCount;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateNamespace = validateNamespace;
exports.stringLength = stringLength;
exports.stringToByteArray = stringToByteArray$1;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _PasteNameField = __webpack_require__(77);

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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(14);

var _removeFromFirebasePromise2 = _interopRequireDefault(_removeFromFirebasePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(content, fire) {
    var contentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image';
    var storagFolder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'clustertry';

    super();
    this.content = content;
    this.firebase = fire;
    this.db_ref_object = this.firebase.database().ref();
    this.content_type = contentType;
    this.redirect = '#/?stream=' + contentType;
    this.storage_folder = storagFolder;
  }

  Markup() {
    return '\n      <a href="#" class="btn btn--danger delete-button">Delete ' + this.content_type + '</a>\n    ';
  }

  Events() {
    var _this = this;

    this.Click(function (self, e) {
      e.preventDefault();
      var r = confirm('Sure You Want Delete This ' + _this.content_type); // eslint-disable-line no-alert

      if (r === true) {
        if (_this.content_type === 'image') {
          var imageList = ['small', 'medium', 'large'];

          imageList.forEach(function (thumb) {
            var path = _this.storage_folder + '/' + _this.content.image_id + '-' + thumb + '.jpg';
            (0, _removeFromFirebasePromise2.default)(_this.firebase, path);
          });
        }

        _this.db_ref_object.child(_this.content.key).remove().then(function () {
          location.href = _this.redirect;
        });
      }
    });
  }
};

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModal = __webpack_require__(101);

var _SuperModal2 = _interopRequireDefault(_SuperModal);

var _SuperModalBtn = __webpack_require__(104);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderThumb = __webpack_require__(118);

var _AdminPanelImageUploaderThumb2 = _interopRequireDefault(_AdminPanelImageUploaderThumb);

var _resizeImage = __webpack_require__(122);

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
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(52);

__webpack_require__(128);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domrC = __webpack_require__(0);

var _routes = __webpack_require__(63);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _domrC.Router(_routes2.default);

router.Start();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = __webpack_require__(54);

var _createElement2 = _interopRequireDefault(_createElement);

var _lookup = __webpack_require__(55);

var _lookup2 = _interopRequireDefault(_lookup);

var _randomizer = __webpack_require__(56);

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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addView = __webpack_require__(58);

var _addView2 = _interopRequireDefault(_addView);

var _hashLocation = __webpack_require__(5);

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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneObject = __webpack_require__(59);

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
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(5);

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(5);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashLocation = __webpack_require__(5);

var _hashLocation2 = _interopRequireDefault(_hashLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  hashLocation: _hashLocation2.default
};

exports.default = utils;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdminPanelHomeView = __webpack_require__(64);

var _AdminPanelHomeView2 = _interopRequireDefault(_AdminPanelHomeView);

var _AdminPanelAlbumFolderView = __webpack_require__(92);

var _AdminPanelAlbumFolderView2 = _interopRequireDefault(_AdminPanelAlbumFolderView);

var _AdminPanelImageFolderView = __webpack_require__(107);

var _AdminPanelImageFolderView2 = _interopRequireDefault(_AdminPanelImageFolderView);

var _AdminPanelUploaderView = __webpack_require__(113);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = _app2.default;

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

var _app = __webpack_require__(134);

var _app2 = _interopRequireDefault(_app);

var _firebaseConfig = __webpack_require__(9);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelLoginContainer = __webpack_require__(76);

var _AdminPanelLoginContainer2 = _interopRequireDefault(_AdminPanelLoginContainer);

var _AdminPanelStreamContainer = __webpack_require__(85);

var _AdminPanelStreamContainer2 = _interopRequireDefault(_AdminPanelStreamContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!globalNS.Promise) {
  globalNS.Promise = Promise;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

var find = _core.Array.find;

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true;
// Shouldn't skip holes
if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var findIndex = _core.Array.findIndex;

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var startsWith = _core.String.startsWith;

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(66).setImmediate, __webpack_require__(7)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(67);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(17)))

/***/ }),
/* 68 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _NoInput = __webpack_require__(3);

var _AdminPanelLoginBtn = __webpack_require__(84);

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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _clearFormatting = __webpack_require__(78);

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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(19);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = __webpack_require__(19);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.name = name;
    this.type = 'checkbox';
    this.isChecked = config.isChecked || false;
    this.title = config.title || '';
    this.value = config.value || '';
    this.label_class = config.labelClass || '';
    this.group_name = config.groupName || '';
  }

  Markup() {
    return '\n      <div class="' + this.label_class + ' no-input no-input--' + this.type + '">\n        <label>\n          <input type="checkbox"\n            data-name="' + this.name + '"\n            name="' + this.group_name + '"\n            value="' + this.value + '" \n            ' + (this.isChecked ? 'checked' : '') + '/>\n          <div class="styler">\n            <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-check-mark-2"></use></svg>\n          </div>\n          <span class="title">' + this.title + '</span>\n          <span class="backdrop"></span>\n        </label>\n      </div>\n    ';
  }
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    super();
    this.name = name;
    this.type = 'radio';
    this.isChecked = config.isChecked || false;
    this.title = config.title || '';
    this.value = config.value || '';
    this.label_class = config.labelClass || '';
    this.group_name = config.groupName || '';
  }

  Markup() {
    return '\n      <div class="' + this.label_class + ' no-input no-input--' + this.type + '">\n        <label>\n          <input type="radio"\n            data-name="' + this.name + '"\n            name="' + this.group_name + '"\n            value="' + this.value + '" \n            ' + (this.isChecked ? 'checked' : '') + '/>\n          <div class="styler"><span class="extender"></span></div>\n          <span class="title">' + this.title + '</span>\n          <span class="backdrop"></span>\n        </label>\n      </div>\n    ';
  }
};

/***/ }),
/* 83 */
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
/* 84 */
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(10);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _AdminPanelHeader = __webpack_require__(11);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(12);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumThumb = __webpack_require__(89);

var _AdminPanelAlbumThumb2 = _interopRequireDefault(_AdminPanelAlbumThumb);

var _AdminPanelImageThumb = __webpack_require__(90);

var _AdminPanelImageThumb2 = _interopRequireDefault(_AdminPanelImageThumb);

var _AdminPanelCreateThumb = __webpack_require__(91);

var _AdminPanelCreateThumb2 = _interopRequireDefault(_AdminPanelCreateThumb);

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
          thumb.AddFromStartTo(tabBody);
        }
      });
    }).then(function () {
      var Create = new _AdminPanelCreateThumb2.default(_this.stream_type);
      Create.AddFromStartTo(tabBody);
    });

    (0, _scrollAction2.default)(thisSelf);
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
/* 87 */
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
/* 88 */
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

function getLayoutStatus(content, field, defaultState) {
  var defaultLayout = {};

  defaultLayout[field] = defaultState;

  var layout = content.layout || defaultLayout;
  var theField = layout[field] !== undefined ? layout[field] : defaultState;

  return theField;
}

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
    return '\n     <li data-key="' + this.content.key + '" class="thumb thumb--album">\n      <a href="#/album/' + this.content.album_id + '" data-id="' + this.content.album_id + '">\n        <div class="img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" /></div>\n        <div class="name"><span>' + this.name + '</span></div>\n        <div class="info">\n          <span title="Homepage"class="info__dot info__dot--isHomepage ' + (this.content.isHomepage ? 'info__dot--active' : '') + '">\n            <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-home-9"></use></svg>\n          </span>\n          <span title="Not Shown in works"class="info__dot info__dot--works-no-show ' + (this.content.works_no_show ? 'info__dot--active' : '') + '">\n            <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-eye-8"></use></svg>\n          </span>\n          <span title="Box Layout"class="info__dot info__dot--layout info--layout--box ' + (getLayoutStatus(this.content, 'box', true) ? 'info__dot--active' : '') + '">\n            <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-checkbox-17"></use></svg>\n          </span>\n          <span title="Gap Right"class="info__dot info__dot--layout info--layout--gapr ' + (getLayoutStatus(this.content, 'gapr', false) ? 'info__dot--active' : '') + '">\n            <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-log-out-15"></use></svg>\n          </span>\n          <span title="Layout Parts"class="info__dot info__dot--layout info--layout--parts info__dot--active">' + (this.content.layout && this.content.layout.parts ? this.content.layout.parts : '2') + '</span>\n        </div>\n      </a>\n     </li>\n    ';
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
/* 90 */
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

exports.default = class extends _domrC.Component {
  constructor() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image';

    super();
    this.type = type;
  }

  Markup() {
    return '\n     <li class="thumb thumb--create thumb--create--' + this.type + '">\n      <a href="#/create?type=' + this.type + '"><svg role="img" class="icon"><use xlink:href="#icon-Interface-41"></use></svg></a>\n     </li>\n    ';
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = _app2.default;

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

var _app = __webpack_require__(134);

var _app2 = _interopRequireDefault(_app);

var _firebaseConfig = __webpack_require__(9);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelAlbumFolderContainer = __webpack_require__(93);

var _AdminPanelAlbumFolderContainer2 = _interopRequireDefault(_AdminPanelAlbumFolderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _sortablejs = __webpack_require__(94);

var _sortablejs2 = _interopRequireDefault(_sortablejs);

var _scrollAction = __webpack_require__(10);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _NoInput = __webpack_require__(3);

var _AdminPanelHeader = __webpack_require__(11);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(12);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelAlbumFolderGroup = __webpack_require__(95);

var _AdminPanelAlbumFolderGroup2 = _interopRequireDefault(_AdminPanelAlbumFolderGroup);

var _AdminPanelAlbumEditBtn = __webpack_require__(96);

var _AdminPanelAlbumEditBtn2 = _interopRequireDefault(_AdminPanelAlbumEditBtn);

var _AdminPanelAlbumSaveBtn = __webpack_require__(97);

var _AdminPanelAlbumSaveBtn2 = _interopRequireDefault(_AdminPanelAlbumSaveBtn);

var _AdminPanelAlbumCancelBtn = __webpack_require__(98);

var _AdminPanelAlbumCancelBtn2 = _interopRequireDefault(_AdminPanelAlbumCancelBtn);

var _AdminPanelFolderDeleteBtn = __webpack_require__(25);

var _AdminPanelFolderDeleteBtn2 = _interopRequireDefault(_AdminPanelFolderDeleteBtn);

var _AdminPanelLayoutBtn = __webpack_require__(26);

var _AdminPanelLayoutBtn2 = _interopRequireDefault(_AdminPanelLayoutBtn);

var _AdminPanelCoverPic = __webpack_require__(13);

var _AdminPanelCoverPic2 = _interopRequireDefault(_AdminPanelCoverPic);

var _AdminPanelAlbumChangeCoverBtn = __webpack_require__(99);

var _AdminPanelAlbumChangeCoverBtn2 = _interopRequireDefault(_AdminPanelAlbumChangeCoverBtn);

var _AdminPanelAlbumAddPhotosBtn = __webpack_require__(105);

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
          var DeleteBtn = new _AdminPanelFolderDeleteBtn2.default(content, _this.firebase, 'album');

          albumName.textContent = content.name;
          album.setAttribute('data-key', key);
          folder.innerHTML = '\n            <div>\n              <div class="info info--display">\n                <h1 class="info--display__name">' + content.name + '</h1>\n                <div class="info--display__description">' + content.description.trim() + '</div>\n                <div class="info--display__works-no-show" style="display:none">\n                    ' + (content.works_no_show ? '\n                      <input type="radio" name="works-no-show-display" value="true" checked />\n                      <input type="radio" name="works-no-show-display" value="false" />\n                      ' : '\n                      <input type="radio" name="works-no-show-display" value="true" />\n                      <input type="radio" name="works-no-show-display" value="false" checked />\n                      ') + '\n                </div>\n                <div class="info--display__isHomepage" style="display:none">\n                  ' + (content.isHomepage ? '\n                    <input type="radio" name="isHomepage-display" value="true" checked />\n                    <input type="radio" name="isHomepage-display" value="false" />\n                    ' : '\n                    <input type="radio" name="isHomepage-display" value="true" />\n                    <input type="radio" name="isHomepage-display" value="false" checked />\n                    ') + '\n                </div>\n                <div class="info--display__is-special" style="display:none">\n                  ' + (content.isSpecial ? '\n                      <input type="radio" name="is-album-special-display" value="true" checked/>\n                      <input type="radio" name="is-album-special-display" value="false" />\n                      ' : '\n                      <input type="radio" name="is-album-special-display" value="true" />\n                      <input type="radio" name="is-album-special-display" value="false" checked/>\n                      ') + '\n                </div>\n                <div class="info--display__cover" style="display:none">' + coverPicDisplay.Render() + '</div>\n                <div class="info--display__layout" style="display:none">\n                  ' + (content.layout ? '\n                    <input type="text" class="box" value="' + content.layout.box.toString() + '"/>\n                    <input type="text" class="gapr" value="' + content.layout.gapr.toString() + '"/>\n                    <input type="text" class="parts" value="' + content.layout.parts.toString() + '"/>\n                    ' : '\n                    <input type="text" class="box" value="true"/>\n                    <input type="text" class="gapr" value="false"/>\n                    <input type="text" class="parts" value="2"/>\n                    ') + '\n                </div>\n              </div>\n              <div class="info info--edit">\n                <div class="devide">\n                  <div class="info--edit__name">\n                    ' + albumNameEdit.Render() + '\n                  </div>\n                  <div class="info--edit__description">\n                    ' + albumDescriptionEdit.Render() + '\n                  </div>\n                  <div class="info--edit__works-no-show info--edit__choice">\n                    <h3>Show in works section on website</h3>\n                    <div class="btn-group">\n                      ' + (content.works_no_show ? '\n                        <label>\n                          <input type="radio" name="works-no-show" value="false" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="works-no-show" value="true" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="works-no-show" value="false" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="works-no-show" value="true" />\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__isHomepage info--edit__choice">\n                    <h3>Display as Homepage</h3>\n                    <div class="btn-group">\n                      ' + (content.isHomepage ? '\n                        <label>\n                          <input type="radio" name="isHomepage" value="true" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isHomepage" value="false"/>\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="isHomepage" value="true" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isHomepage" value="false" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__is-special info--edit__choice">\n                    <h3>does album needs special treatment ?</h3>\n                    <div class="btn-group">\n                      ' + (content.isSpecial ? '\n                        <label>\n                          <input type="radio" name="is-album-special" value="true" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="is-album-special" value="false" />\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="is-album-special" value="true" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="is-album-special" value="false" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__cover">\n                    <h3>Cover Pic</h3>\n                    <div class="cover-pic-holder">\n                      ' + coverPic.Render() + '\n                    </div>\n                    ' + changeCoverBtn.Render() + '\n                    <div class="change-cover-modal-holder"></div>\n                  </div>\n                    <div class="info--edit__layout">\n                      <h3>Album Layout</h3>\n                      ' + boxLayout.Render() + '\n                      <div class="layout" id="layout-edit">\n                        ' + gapRight.Render() + '\n                        <div class="preview">\n                          <ul class="preview__container">\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                          </ul>\n                        </div>\n                      </div>\n                      ' + stripe.Render() + '\n                    </div>\n                  <div class="info--edit__danger-zone">\n                    <h3>Danger Zone</h3>\n                    ' + DeleteBtn.Render() + '\n                  </div>\n                </div>\n                ' + addPhotosBtn.Render() + '\n              </div>\n              ' + folderGroup.Render() + '\n              ' + folderGroupSortable.Render() + '\n            </div>\n          ';
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
/* 94 */
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
/* 95 */
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelCoverPic = __webpack_require__(13);

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
        var displayIsHomepage = folder.querySelector('input[name="isHomepage-display"]:checked');
        var isHomepage = folder.querySelector('.info--edit__isHomepage').querySelector('input[value="' + displayIsHomepage.value + '"]');
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
        isHomepage.checked = true;

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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelCoverPic = __webpack_require__(13);

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

function getAllAlbums(dbRefObject) {
  var promiseObj = new Promise(function (resolve, reject) {
    dbRefObject.once('value').then(function (snap) {
      var valueSnap = snap.val();
      Object.keys(valueSnap).forEach(function (key) {
        var content = valueSnap[key];
        content.key = key;

        if (content.album_id) {
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
      var isHomepage = folder.querySelector('input[name="isHomepage"]:checked');
      var homePageValue = JSON.parse(isHomepage.value);
      var displayIsHomepage = folder.querySelector('.info--display__isHomepage').querySelector('input[value="' + isHomepage.value + '"]');
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

      _this.db_ref_object.child(key).update({
        name: name,
        description: description,
        works_no_show: JSON.parse(worksNoShow.value),
        isHomepage: homePageValue,
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
        displayIsHomepage.checked = true;
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

        if (homePageValue === true) {
          _this.db_ref_object.once('value').then(function (snap) {
            var valueSnap = snap.val();
            Object.keys(valueSnap).forEach(function (albumkey) {
              var content = valueSnap[albumkey];
              content.key = albumkey;

              if (content.album_id && content.key !== key) {
                _this.db_ref_object.child(albumkey).update({
                  isHomepage: false
                });
              }
            });
          });
        }
      });
    });
  }
};

/***/ }),
/* 98 */
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelChangeCoverModal = __webpack_require__(100);

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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModalWithHeader = __webpack_require__(27);

var _SuperModalWithHeader2 = _interopRequireDefault(_SuperModalWithHeader);

var _AdminPanelSelectableImg = __webpack_require__(28);

var _AdminPanelSelectableImg2 = _interopRequireDefault(_AdminPanelSelectableImg);

var _AdminPanelCoverPic = __webpack_require__(13);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeSuperModal = __webpack_require__(102);

var _removeSuperModal2 = _interopRequireDefault(_removeSuperModal);

var _SuperModalCloke = __webpack_require__(103);

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
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelAddPhotosModal = __webpack_require__(106);

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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SuperModalWithHeader = __webpack_require__(27);

var _SuperModalWithHeader2 = _interopRequireDefault(_SuperModalWithHeader);

var _AdminPanelSelectableImg = __webpack_require__(28);

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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = _app2.default;

  if (!fire.apps.length) {
    fire.initializeApp(config);
  }

  wrapper.innerHTML = 'waiting';

  fire.auth().onAuthStateChanged(function (fireUser) {
    if (fireUser) {
      var imageFolder = new _AdminPanelImageFolderContainer2.default(fire, data.metadata.id, 'clustertry');
      wrapper.innerHTML = imageFolder.Render();
    } else {
      location.hash = '#/';
    }
  });

  window.scrollTo(0, 0);
};

var _app = __webpack_require__(134);

var _app2 = _interopRequireDefault(_app);

var _firebaseConfig = __webpack_require__(9);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelImageFolderContainer = __webpack_require__(108);

var _AdminPanelImageFolderContainer2 = _interopRequireDefault(_AdminPanelImageFolderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(10);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _NoInput = __webpack_require__(3);

var _AdminPanelHeader = __webpack_require__(11);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(12);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelImageShowCase = __webpack_require__(109);

var _AdminPanelImageShowCase2 = _interopRequireDefault(_AdminPanelImageShowCase);

var _AdminPanelImageEditBtn = __webpack_require__(110);

var _AdminPanelImageEditBtn2 = _interopRequireDefault(_AdminPanelImageEditBtn);

var _AdminPanelImageSaveBtn = __webpack_require__(111);

var _AdminPanelImageSaveBtn2 = _interopRequireDefault(_AdminPanelImageSaveBtn);

var _AdminPanelImageCancelBtn = __webpack_require__(112);

var _AdminPanelImageCancelBtn2 = _interopRequireDefault(_AdminPanelImageCancelBtn);

var _AdminPanelFolderDeleteBtn = __webpack_require__(25);

var _AdminPanelFolderDeleteBtn2 = _interopRequireDefault(_AdminPanelFolderDeleteBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(fire, imageId, storagFolder) {
    super();
    this.firebase = fire;
    this.image_id = imageId;
    this.db_ref_object = this.firebase.database().ref();
    this.storag_folder = storagFolder;
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
          var DeleteBtn = new _AdminPanelFolderDeleteBtn2.default(content, _this.firebase, 'image', _this.storag_folder);
          album.setAttribute('data-key', key);
          folder.innerHTML = '\n            ' + imageShowCase.Render() + '\n            <div class="container">\n              <div class="info info--display">\n                <div class="info--display__isMature" data-value="' + (content.isMature ? 'true' : 'false') + '">\n                  <span>Mature Content</span>\n                </div>\n                <h1 class="info--display__name">' + content.name + '</h1>\n                <div class="info--display__description">' + content.description.trim() + '</div>\n              </div>\n              <div class="info info--edit">\n                <div class="devide">\n                  <div class="info--edit__name">\n                    ' + albumNameEdit.Render() + '\n                  </div>\n                  <div class="info--edit__description">\n                    ' + albumDescriptionEdit.Render() + '\n                  </div>\n                  <div class="info--edit__isMature info--edit__choice">\n                    <h3>Mature Content?</h3>\n                    <div class="btn-group">\n                      ' + (content.isMature ? '\n                        <label>\n                          <input type="radio" name="isMature" value="true" checked/>\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isMature" value="false"/>\n                          <span class="btn">No</span>\n                        </label>\n                        ' : '\n                        <label>\n                          <input type="radio" name="isMature" value="true" />\n                          <span class="btn">Yes</span>\n                        </label>\n                        <label>\n                          <input type="radio" name="isMature" value="false" checked/>\n                          <span class="btn">No</span>\n                        </label>\n                        ') + '\n                    </div>\n                  </div>\n                  <div class="info--edit__danger-zone">\n                    <h3>Danger Zone</h3>\n                    ' + DeleteBtn.Render() + '\n                  </div>\n                </div>\n              </div>\n            </div>\n          ';
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
/* 109 */
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
/* 110 */
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
/* 111 */
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
/* 112 */
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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var wrapper = document.getElementById('wrapper');
  var config = _firebaseConfig2.default;
  var fire = _app2.default;

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

var _app = __webpack_require__(134);

var _app2 = _interopRequireDefault(_app);

var _firebaseConfig = __webpack_require__(9);

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

var _AdminPanelUploaderContainer = __webpack_require__(114);

var _AdminPanelUploaderContainer2 = _interopRequireDefault(_AdminPanelUploaderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _scrollAction = __webpack_require__(10);

var _scrollAction2 = _interopRequireDefault(_scrollAction);

var _AdminPanelHeader = __webpack_require__(11);

var _AdminPanelHeader2 = _interopRequireDefault(_AdminPanelHeader);

var _ScrollToTopButton = __webpack_require__(12);

var _ScrollToTopButton2 = _interopRequireDefault(_ScrollToTopButton);

var _AdminPanelImageUploader = __webpack_require__(115);

var _AdminPanelImageUploader2 = _interopRequireDefault(_AdminPanelImageUploader);

var _AdminPanelAlbumUploader = __webpack_require__(123);

var _AdminPanelAlbumUploader2 = _interopRequireDefault(_AdminPanelAlbumUploader);

var _AdminPanelUploaderCancelBtn = __webpack_require__(126);

var _AdminPanelUploaderCancelBtn2 = _interopRequireDefault(_AdminPanelUploaderCancelBtn);

var _AdminPanelUploaderSaveBtn = __webpack_require__(127);

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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderSidebar = __webpack_require__(116);

var _AdminPanelImageUploaderSidebar2 = _interopRequireDefault(_AdminPanelImageUploaderSidebar);

var _AdminPanelUploadArea = __webpack_require__(29);

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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelImageUploaderPickAlbumThumb = __webpack_require__(117);

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
/* 117 */
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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _uploadToFirebasePromise = __webpack_require__(119);

var _uploadToFirebasePromise2 = _interopRequireDefault(_uploadToFirebasePromise);

var _NoInput = __webpack_require__(3);

var _AdminPanelImageUploaderThumbDeleteBtn = __webpack_require__(120);

var _AdminPanelImageUploaderThumbDeleteBtn2 = _interopRequireDefault(_AdminPanelImageUploaderThumbDeleteBtn);

var _AdminPanelImageUploaderThumbIsMatureBtn = __webpack_require__(121);

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
/* 119 */
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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(14);

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
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(14);

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
/* 122 */
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _AdminPanelAlbumUploaderSidebar = __webpack_require__(124);

var _AdminPanelAlbumUploaderSidebar2 = _interopRequireDefault(_AdminPanelAlbumUploaderSidebar);

var _AdminPanelUploadArea = __webpack_require__(29);

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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _NoInput = __webpack_require__(3);

var _AdminPanelAlbumLayout = __webpack_require__(125);

var _AdminPanelAlbumLayout2 = _interopRequireDefault(_AdminPanelAlbumLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _domrC.Component {
  constructor(dbRefObject) {
    super();
    this.db_ref_object = dbRefObject;
    this.random = Math.random().toString(36).substring(2);
    this.name = 'album-' + this.random;
  }

  Markup() {
    var Title = new _NoInput.Text('album-name-edit', {
      title: 'Title',
      example: 'e.g. Sunset at Pondi',
      placeholder: 'Enter Title',
      labelClass: 'name-edit'
    });

    var Description = new _NoInput.TextArea('album-description-edit', {
      title: 'Description',
      placeholder: 'Enter Description',
      labelClass: 'description-edit'
    });

    var Layout = (0, _AdminPanelAlbumLayout2.default)('uploader__sidebar__layout', 'layout-edit', 'Album Layout');

    return '\n      <aside class="uploader__sidebar container" data-id="' + this.name + '">\n        <h1>Create Album</h1>\n        ' + Title.Render() + '\n        ' + Description.Render() + '\n        <div class="uploader__sidebar__type btn-choice">\n          <h3>Album Type</h3>\n          <div class="btn-choice__group">\n            <label>\n              <input type="radio" name="type" value="photography" checked>\n              <span class="btn">Photography</span>\n            </label>\n            <label>\n              <input type="radio" name="type" value="restoration">\n              <span class="btn">Restoration</span>\n            </label>\n            <label>\n              <input type="radio" name="type" value="demo">\n              <span class="btn">Demo</span>\n            </label>\n          </div>\n        </div>\n        <div class="uploader__sidebar__works-no-show btn-choice">\n          <h3>Show in works section on website</h3>\n          <div class="btn-choice__group">\n            <label>\n              <input type="radio" name="works-no-show" value="false" checked>\n              <span class="btn">Yes</span>\n            </label>\n            <label>\n              <input type="radio" name="works-no-show" value="true">\n              <span class="btn">No</span>\n            </label>\n          </div>\n        </div>\n        <div class="uploader__sidebar__isSpecial btn-choice">\n          <h3>does album needs special treatment ?</h3>\n          <div class="btn-choice__group">\n            <label>\n              <input type="radio" name="isSpecial" value="false">\n              <span class="btn">Yes</span>\n            </label>\n            <label>\n              <input type="radio" name="isSpecial" value="true" checked>\n              <span class="btn">No</span>\n            </label>\n          </div>\n        </div>\n        ' + Layout + '\n      </aside>\n    ';
  }
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'info--edit__layout';
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'layout-edit';
  var heading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Album Layout';
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultConfig;

  var stripe = new _NoInput.Stripe('layout-parts', {
    labelClass: 'layout__parts-stripe',
    value: config.stripeValue,
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
      var preview = document.getElementById(id).querySelector('.preview');

      preview.setAttribute('data-parts', value);
    }
  });

  var boxLayout = new _AdminPanelLayoutBtn2.default('Boxed Layout', 'box-btn ' + (config.isBoxLayout ? 'btn--pressed' : ''), 'preview--box', false);

  var gapRight = new _AdminPanelLayoutBtn2.default('R Gap', 'gap-right ' + (config.isGapRight ? 'btn--pressed' : ''), 'preview--gap-right', false);

  return '\n    <div class="' + className + ' layout">\n      <h3>' + heading + '</h3>\n      ' + boxLayout.Render() + '\n      <div class="layout__box" id="layout-edit">\n        ' + gapRight.Render() + '\n        <div class="preview \n        ' + (config.isBoxLayout ? 'preview--box' : '') + '\n        ' + (config.isGapRight ? 'preview--gap-right' : '') + '\n        ">\n          <ul class="preview__container">\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n            <li></li>\n          </ul>\n        </div>\n      </div>\n      ' + stripe.Render() + '\n    </div>\n  ';
};

var _NoInput = __webpack_require__(3);

var _AdminPanelLayoutBtn = __webpack_require__(26);

var _AdminPanelLayoutBtn2 = _interopRequireDefault(_AdminPanelLayoutBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  isBoxLayout: true,
  isGapRight: false,
  stripeValue: 2
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

var _removeFromFirebasePromise = __webpack_require__(14);

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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domrC = __webpack_require__(0);

function makeArrOfDataID(content) {
  var arr = [];

  content.forEach(function (thisContent) {
    var dataId = thisContent.getAttribute('data-id');

    arr.push(dataId);
  });

  return arr;
}

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

          if (uploaderType === 'album') {
            var aside = parent.querySelector('.uploader__sidebar');
            var albumId = aside.getAttribute('data-id');
            var name = aside.querySelector('[data-name="album-name-edit"]').textContent.trim();
            var description = aside.querySelector('[data-name="album-description-edit"]').textContent.trim();
            var date = Date.now();
            var type = aside.querySelector('.uploader__sidebar__type').querySelector('input[type="radio"]:checked').value;
            var worksNoShow = aside.querySelector('.uploader__sidebar__works-no-show').querySelector('input[type="radio"]:checked').value;
            var isSpecial = aside.querySelector('.uploader__sidebar__isSpecial').querySelector('input[type="radio"]:checked').value;
            var layout = aside.querySelector('.uploader__sidebar__layout');
            var preview = layout.querySelector('.preview');
            var uploadArea = parent.querySelector('.uploader__area__preview');
            var photosList = uploadArea.querySelectorAll('.image-uploader__thumb');

            _this.db_ref_object.push({
              album_id: albumId,
              name: name,
              date: date,
              description: description,
              type: type,
              works_no_show: JSON.parse(worksNoShow),
              isSpecial: JSON.parse(isSpecial),
              layout: {
                box: preview.classList.contains('preview--box'),
                gapr: preview.classList.contains('preview--gap-right'),
                parts: preview.getAttribute('data-parts') ? preview.getAttribute('data-parts') : 2
              },
              photos_list: makeArrOfDataID(photosList),
              cover_pic: photosList[0].getAttribute('data-id')
            });
          } else {
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
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__firebase_polyfill__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_app__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__firebase_app__);



/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__firebase_app___default.a);


/***/ })
/******/ ]);