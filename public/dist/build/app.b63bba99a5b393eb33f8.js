(function(e){function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e['default']}:function(){return e};return t.d(a,'a',a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p='public/dist/build/',t(t.s=16)})([function(e,t,a){'use strict';function n(e){return'[object Array]'===u.call(e)}function r(e){return null!==e&&'object'==typeof e}function o(e){return'[object Function]'===u.call(e)}function d(e,t){if(null!==e&&'undefined'!=typeof e)if('object'!=typeof e&&(e=[e]),n(e))for(var a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function s(){function e(e,a){t[a]='object'==typeof t[a]&&'object'==typeof e?s(t[a],e):e}for(var t={},a=0,n=arguments.length;a<n;a++)d(arguments[a],e);return t}var i=a(10),l=a(29),u=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:function(e){return'[object ArrayBuffer]'===u.call(e)},isBuffer:l,isFormData:function(e){return'undefined'!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){var t;return t='undefined'!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer,t},isString:function(e){return'string'==typeof e},isNumber:function(e){return'number'==typeof e},isObject:r,isUndefined:function(e){return'undefined'==typeof e},isDate:function(e){return'[object Date]'===u.call(e)},isFile:function(e){return'[object File]'===u.call(e)},isBlob:function(e){return'[object Blob]'===u.call(e)},isFunction:o,isStream:function(e){return r(e)&&o(e.pipe)},isURLSearchParams:function(e){return'undefined'!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return'undefined'!=typeof navigator&&'ReactNative'===navigator.product?!1:'undefined'!=typeof window&&'undefined'!=typeof document},forEach:d,merge:s,extend:function(e,t,a){return d(t,function(t,n){e[n]=a&&'function'==typeof t?i(t,a):t}),e},trim:function(e){return e.replace(/^\s*/,'').replace(/\s*$/,'')}}},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0}),t.utils=t.Router=t.DataComponent=t.Component=void 0;var r=a(18),o=n(r),d=a(19),s=n(d),i=a(20),l=n(i),u=a(25),c=n(u);t.Component=o.default,t.DataComponent=s.default,t.Router=l.default,t.utils=c.default},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0});var r=a(23),o=n(r),d=a(24),s=n(d);t.default=function(){var e=location.hash,t=e,a='',n='';if(t.includes('?')){var r=t.split('?');if(t=r[0],a=r[1].replace(/\//g,''),''!==a){for(var d={},l=a.split('&'),u=0;u<l.length;u++){var i=l[u].split('='),c=i[0],p=i[1];d[c]=p}n=d}}if(t.endsWith('/')&&!t.endsWith('#/')){var f=t.slice(0,-1);t=f.replace('#','')}else t=t.replace('#','');return{hash:e.replace('#',''),path:t,search:a,query:n,set:o.default,get:s.default}}},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0});t.default={images:'https://sid-mangela-folio-db.firebaseapp.com/images.json',images_cached:'https://sid-mangela-folio-db.firebaseapp.com/images-c.json',albums:'https://sid-mangela-folio-db.firebaseapp.com/albums.json',albums_cached:'https://sid-mangela-folio-db.firebaseapp.com/albums-c.json'}},function(e,t,a){e.exports=a(28)},function(e,t,a){'use strict';(function(t){function n(e,t){!r.isUndefined(e)&&r.isUndefined(e['Content-Type'])&&(e['Content-Type']=t)}var r=a(0),o=a(31),d={"Content-Type":'application/x-www-form-urlencoded'},s={adapter:function(){var e;return'undefined'==typeof XMLHttpRequest?'undefined'!=typeof t&&(e=a(12)):e=a(12),e}(),transformRequest:[function(e,t){return o(t,'Content-Type'),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(n(t,'application/x-www-form-urlencoded;charset=utf-8'),e.toString()):r.isObject(e)?(n(t,'application/json;charset=utf-8'),JSON.stringify(e)):e}],transformResponse:[function(e){if('string'==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,validateStatus:function(e){return 200<=e&&300>e}};s.headers={common:{Accept:'application/json, text/plain, */*'}},r.forEach(['delete','get','head'],function(e){s.headers[e]={}}),r.forEach(['post','put','patch'],function(e){s.headers[e]=r.merge(d)}),e.exports=s}).call(t,a(11))},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(e,t){var a=document.createElement('div');a.innerHTML=e;for(var n,r=document.createDocumentFragment(),o=0;o<a.childNodes.length;o++)n=a.childNodes[o].cloneNode(!0),r.appendChild(n);return t&&r.childNodes[1].setAttribute('data-domr-id',t),r.childNodes[1].outerHTML}},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(e){var t=document.querySelector('[data-domr-id="'+e+'"]');if(t)return t}},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:7;return Math.random().toString(36).substr(2,e)}},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}function r(e){var t='The Photo';e&&(t=e);var a=t;t=t.split(' ');var n=t[0],r=t[''+(t.length-1)].replace(/__/g,' '),o=a.replace(n,'').trim().replace(/__/g,' ');return'\n    <div class="album-title">\n      <span class="name0 highlight">'+n.replace(/__/g,' ')+'</span>\n      <span class="name1 highlight">'+o+'</span>\n      <span class="last-name">'+r+'</span>\n      <span class="last-name">'+r+'</span>\n      <span class="last-name">'+r+'</span>\n      <span class="last-name" style="opacity: .8">'+r+'</span>\n      <span class="last-name" style="opacity: .6">'+r+'</span>\n    </div>\n  '}function o(e,t,a){var n=t.photos_list,o=a,d=r(''+(t.description?t.description:t.name));o.innerHTML+=d,(0,i.default)({method:'get',url:e}).then(function(e){var t=e.data,a=[];n&&t.forEach(function(e){n.includes(e.image_id)&&a.push(e)});for(var r=function(e){var t=a.find(function(t){return t.image_id===n[e]});if(t){var r=new u.default(t);o&&r.addTo(o)}},d=0;d<n.length;d++)r(d)})}Object.defineProperty(t,'__esModule',{value:!0});var d=a(1),s=a(4),i=n(s),l=a(46),u=n(l);t.default=class extends d.Component{constructor(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:[],t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};super(),this.albums_api=e,this.images_api=t,this.container_name=a.containerName||'home-container',this.album_id=a.albumid||'',this.class_names=a.classNames||''}dom(){return'\n      <div class="container container--showcase '+this.class_names+' '+this.container_name+'"></div>\n    '}delay(){var e=this;(0,i.default)({method:'get',url:this.albums_api}).then(function(t){var a=t.data;a.forEach(function(t){e.album_id?t.album_id===e.album_id&&o(e.images_api,t,e.target()):'top-images'===t.name&&o(e.images_api,t,e.target())})})}}},function(e){'use strict';e.exports=function(e,t){return function(){for(var a=Array(arguments.length),n=0;n<a.length;n++)a[n]=arguments[n];return e.apply(t,a)}}},function(e){function t(){throw new Error('setTimeout has not been defined')}function a(){throw new Error('clearTimeout has not been defined')}function n(e){if(l===setTimeout)return setTimeout(e,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function r(e){if(u===clearTimeout)return clearTimeout(e);if((u===a||!u)&&clearTimeout)return u=clearTimeout,clearTimeout(e);try{return u(e)}catch(t){try{return u.call(null,e)}catch(t){return u.call(this,e)}}}function o(){h&&p&&(h=!1,p.length?f=p.concat(f):m=-1,f.length&&d())}function d(){if(!h){var e=n(o);h=!0;for(var t=f.length;t;){for(p=f,f=[];++m<t;)p&&p[m].run();m=-1,t=f.length}p=null,h=!1,r(e)}}function s(e,t){this.fun=e,this.array=t}function i(){}var l,u,c=e.exports={};(function(){try{l='function'==typeof setTimeout?setTimeout:t}catch(a){l=t}try{u='function'==typeof clearTimeout?clearTimeout:a}catch(t){u=a}})();var p,f=[],h=!1,m=-1;c.nextTick=function(e){var t=Array(arguments.length-1);if(1<arguments.length)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];f.push(new s(e,t)),1!==f.length||h||n(d)},s.prototype.run=function(){this.fun.apply(null,this.array)},c.title='browser',c.browser=!0,c.env={},c.argv=[],c.version='',c.versions={},c.on=i,c.addListener=i,c.once=i,c.off=i,c.removeListener=i,c.removeAllListeners=i,c.emit=i,c.prependListener=i,c.prependOnceListener=i,c.listeners=function(){return[]},c.binding=function(){throw new Error('process.binding is not supported')},c.cwd=function(){return'/'},c.chdir=function(){throw new Error('process.chdir is not supported')},c.umask=function(){return 0}},function(e,t,a){'use strict';(function(t){var n=a(0),r=a(32),o=a(34),d=a(35),s=a(36),i=a(13),l='undefined'!=typeof window&&window.btoa&&window.btoa.bind(window)||a(37);e.exports=function(u){return new Promise(function(e,c){var p=u.data,f=u.headers;n.isFormData(p)&&delete f['Content-Type'];var h=new XMLHttpRequest,m='onreadystatechange',g=!1;if('test'===t.env.NODE_ENV||'undefined'==typeof window||!window.XDomainRequest||'withCredentials'in h||s(u.url)||(h=new window.XDomainRequest,m='onload',g=!0,h.onprogress=function(){},h.ontimeout=function(){}),u.auth){var y=u.auth.username||'',_=u.auth.password||'';f.Authorization='Basic '+l(y+':'+_)}if(h.open(u.method.toUpperCase(),o(u.url,u.params,u.paramsSerializer),!0),h.timeout=u.timeout,h[m]=function(){if(h&&(4===h.readyState||g)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf('file:'))){var t='getAllResponseHeaders'in h?d(h.getAllResponseHeaders()):null,a=u.responseType&&'text'!==u.responseType?h.response:h.responseText,n={data:a,status:1223===h.status?204:h.status,statusText:1223===h.status?'No Content':h.statusText,headers:t,config:u,request:h};r(e,c,n),h=null}},h.onerror=function(){c(i('Network Error',u,null,h)),h=null},h.ontimeout=function(){c(i('timeout of '+u.timeout+'ms exceeded',u,'ECONNABORTED',h)),h=null},n.isStandardBrowserEnv()){var v=a(38),b=(u.withCredentials||s(u.url))&&u.xsrfCookieName?v.read(u.xsrfCookieName):void 0;b&&(f[u.xsrfHeaderName]=b)}if('setRequestHeader'in h&&n.forEach(f,function(e,t){'undefined'==typeof p&&'content-type'===t.toLowerCase()?delete f[t]:h.setRequestHeader(t,e)}),u.withCredentials&&(h.withCredentials=!0),u.responseType)try{h.responseType=u.responseType}catch(t){if('json'!==u.responseType)throw t}'function'==typeof u.onDownloadProgress&&h.addEventListener('progress',u.onDownloadProgress),'function'==typeof u.onUploadProgress&&h.upload&&h.upload.addEventListener('progress',u.onUploadProgress),u.cancelToken&&u.cancelToken.promise.then(function(e){h&&(h.abort(),c(e),h=null)}),void 0===p&&(p=null),h.send(p)})}}).call(t,a(11))},function(e,t,a){'use strict';var n=a(33);e.exports=function(e,t,a,r,o){var d=new Error(e);return n(d,t,a,r,o)}},function(e){'use strict';e.exports=function(e){return!!(e&&e.__CANCEL__)}},function(e){'use strict';function t(e){this.message=e}t.prototype.toString=function(){return'Cancel'+(this.message?': '+this.message:'')},t.prototype.__CANCEL__=!0,e.exports=t},function(e,t,a){'use strict';a(17),a(54)},function(e,t,a){'use strict';var n=a(1),r=a(26),o=function(e){return e&&e.__esModule?e:{default:e}}(r),d=new n.Router(o.default,{redirectDefault:!0});d.start()},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(t,'__esModule',{value:!0});var o=function(){function e(e,t){for(var a,n=0;n<t.length;n++)a=t[n],a.enumerable=a.enumerable||!1,a.configurable=!0,'value'in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),d=a(6),s=n(d),i=a(7),l=n(i),u=a(8),c=n(u),p={parent:document.getElementById('wrapper'),dom:'\n    <div>\n      Domr Component\n    </div>\n  '},f=function(){function e(){var t=this,a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:'domr-component';r(this,e),this.parentDefault=p.parent,this.domContent=p.dom,this.createElement=s.default,this.domrid=a+'-'+(0,c.default)(7),this.target=function(){return(0,l.default)(t.domrid)},this.handlingParent=this.parentDefault||document.querySelector('body')}return o(e,[{key:'dom',value:function(){return''}},{key:'events',value:function(){}},{key:'deligateEvents',value:function(t,e,a){this.handlingParent.addEventListener(e,function(n){n.target&&n.target.matches(t)&&a(n.target,n)})}},{key:'addEvent',value:function(e,t){this.target()&&this.addEventOn('[data-domr-id="'+this.domrid+'"]',e,t)}},{key:'addEventOn',value:function(e,t,a){var n=this;if(t instanceof Array&&!a){t.forEach(function(t){n.deligateEvents(e,t[0],t[1])})}else this.deligateEvents(e,t,a)}},{key:'delay',value:function(){}},{key:'delayedContent',value:function(){var e=this;setTimeout(function(){e.target()&&e.delay()},50)}},{key:'optimizedDom',value:function(){return this.events(),this.createElement(this.dom(),this.domrid)}},{key:'render',value:function(){return this.delayedContent(),this.optimizedDom()}},{key:'addTo',value:function(e){e?(e.insertAdjacentHTML('beforeend',this.optimizedDom()),this.delayedContent()):console.warn('parent not found')}},{key:'addFromStartTo',value:function(e){e?(e.insertAdjacentHTML('afterbegin',this.optimizedDom()),this.delayedContent()):console.warn('parent not found')}},{key:'addBefore',value:function(e){e?(e.insertAdjacentHTML('beforebegin',this.optimizedDom()),this.delayedContent()):console.error('sibling not found')}},{key:'addAfter',value:function(e){e?(e.insertAdjacentHTML('afterend',this.optimizedDom()),this.delayedContent()):console.error('sibling not found')}},{key:'replaceWith',value:function(e){if(e){var t=e.parentElement;t?(e.insertAdjacentHTML('afterend',this.optimizedDom()),t.removeChild(e),this.delayedContent()):console.warn('sibling has no parentElement')}else console.warn('sibling not found')}},{key:'replaceContentOf',value:function(e){if(e){e.innerHTML=this.optimizedDom(),this.delayedContent()}else console.warn('parent not found')}}]),e}();t.default=f},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(t,'__esModule',{value:!0});var o=function(){function e(e,t){for(var a,n=0;n<t.length;n++)a=t[n],a.enumerable=a.enumerable||!1,a.configurable=!0,'value'in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),d=a(8),s=n(d),i=a(6),l=n(i),u=a(7),c=n(u),p=function(){function e(t){var a=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'data-component';r(this,e),this.api=t,this.domrid=n+'-'+(0,s.default)(7),this.createElement=l.default,this.target=function(){return(0,c.default)(a.domrid)}}return o(e,[{key:'dom',value:function(){}},{key:'loadApi',value:function(e,t){var a=this,n=new XMLHttpRequest;n.open('GET',this.api,!0),n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){var r=n.responseText.trim();if(!r.length)console.warn('Empty API');else if('['===r.charAt(0)||'{'===r.charAt(0)){var o=JSON.parse(r),d=function(e){return a.createElement(a.dom(e),a.domrid)},s='';'['===r.charAt(0)?s=''+o.map(function(e){return''+d(e)}).join(''):'{'===r.charAt(0)&&(s=d(o)),'replaceContentOf'===t?e.innerHTML=s:'addTo'===t?e.insertAdjacentHTML('beforeend',s):'addFromStartTo'===t?e.insertAdjacentHTML('afterbegin',s):'addBefore'===t?e.insertAdjacentHTML('beforebegin',s):'addAfter'===t?e.insertAdjacentHTML('afterend',s):console.log(o),a.events(),a.delayedContent(o)}else console.warn('not a suitable API')}},n.send(null)}},{key:'delay',value:function(){}},{key:'delayedContent',value:function(e){this.delay(e)}},{key:'events',value:function(){}},{key:'eventMain',value:function(e,t,a,n){for(var r=e.querySelectorAll(t),o=function(t){r[t].addEventListener(a,function(a){n(r[t],a)})},d=0;d<r.length;d++)o(d)}},{key:'eventGrouping',value:function(e,t,a,n){var r=this;if(a instanceof Array&&!n){a.forEach(function(a){r.eventMain(e,t,a[0],a[1])})}else this.eventMain(e,t,a,n)}},{key:'addEvent',value:function(e,t){this.eventGrouping(document,'[data-domr-id="'+this.domrid+'"]',e,t)}},{key:'addEventOn',value:function(e,t,a){for(var n=document.querySelectorAll('[data-domr-id="'+this.domrid+'"]'),r=0;r<n.length;r++)this.eventGrouping(n[r],e,t,a)}},{key:'logData',value:function(){this.loadApi()}},{key:'replaceContentOf',value:function(e){this.loadApi(e,'replaceContentOf')}},{key:'addTo',value:function(e){this.loadApi(e,'addTo')}},{key:'addFromStartTo',value:function(e){this.loadApi(e,'addFromStartTo')}},{key:'addBefore',value:function(e){e?this.loadApi(e,'addBefore'):console.error('sibling not found')}},{key:'addAfter',value:function(e){e?this.loadApi(e,'addAfter'):console.error('sibling not found')}},{key:'replaceWith',value:function(e){if(e){var t=e.parentElement;t?(this.addAfter(e),t.removeChild(e)):console.warn('sibling has no parentElement')}else console.error('sibling not found')}}]),e}();t.default=p},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(t,'__esModule',{value:!0});var o=function(){function e(e,t){for(var a,n=0;n<t.length;n++)a=t[n],a.enumerable=a.enumerable||!1,a.configurable=!0,'value'in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),d=a(21),s=n(d),i=a(2),l=n(i),u=function(e){var t=[];return e.forEach(function(e){e.path&&e.view&&t.push(e)}),t},c={routes:[],config:{redirectDefault:!1,refreshPage:!1,clearLog:!1}},p=function(){function e(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:c.routes,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:c.config;r(this,e),this.routes=u(t),this.redirectDefault=a.redirectDefault||!0,this.refreshPage=a.refreshPage||!1,this.clearLog=a.clearLog||!1,this.addView=s.default}return o(e,[{key:'showRoutes',value:function(){console.log(this.routes)}},{key:'reloadOnHashChange',value:function(){var t=this;addEventListener('hashchange',function(a){t.clearLog&&(console.API,'undefined'==typeof console._commandLineAPI?'undefined'==typeof console._inspectorCommandLineAPI?'undefined'!=typeof console.clear&&(console.API=console):console.API=console._inspectorCommandLineAPI:console.API=console._commandLineAPI,console.API.clear()),t.refreshPage?location.reload():(t.start(),a.stopImmediatePropagation())})}},{key:'start',value:function(){var e,t=(0,l.default)(),a=t.path;if(''===a&&(location.hash='#/'),this.routes.forEach(function(n){var r=n.path;r.endsWith('/')&&'/'!==r&&(r=r.slice(0,-1));var o=[],d=r.replace(/([:*])(\w+)/g,function(e,t,a){return o.push(a),'([^/]+)'})+'(?:/|$)',s=a.match(new RegExp(d));if(s){var i=s.slice(1,s.length).reduce(function(e,t,a){return null===e&&(e={}),e[o[a]]=t,e},null);n.metadata=i||'',n.query=t.query,e=n}}),e)this.addView(e);else{var n=this.routes.find(function(e){return!0===e.isDefault});this.redirectDefault&&n?this.addView(n):console.error('Page Not Found')}this.reloadOnHashChange()}}]),e}();t.default=p},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var n=a(22),r=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(e){var t=e.view,a=(0,r.default)(e,['view']);e&&t&&('function'==typeof t?t(a):t)}},function(e,t){'use strict';function a(e,t){for(var a=0;a<e.length;a++)if(e[a]===t)return!0}Object.defineProperty(t,'__esModule',{value:!0});var n=['view'];t.default=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:n,r={};return Object.keys(e).forEach(function(n){var o=e[n],d=a(t,n);d||(r[n]=o)}),r}},function(e,t,a){'use strict';function n(e){var t=e;return t.startsWith('#')||(t='#'+t),t}function r(e){var t=(0,u.default)(),a=t.search,r=e;return r.startsWith('#')&&(r=r.slice(0,-1)),a&&(!r.endsWith('/')&&(r+='/'),r=r+'?'+a),r=n(r),r}function o(e){var t=e,a=(0,u.default)(),r=a.path;return r.endsWith('/')&&(r=r.slice(0,-1)),t.startsWith('?')||(t='?'+t),t=n(r+'/'+t),t}function d(e){var t=[];for(var a in e)t.push(a+'='+e[a]);return'?'+t.join('&')}function s(e){var t=d(e),a=o(t);return a}function i(e){location.hash=e}Object.defineProperty(t,'__esModule',{value:!0});var l=a(2),u=function(e){return e&&e.__esModule?e:{default:e}}(l);t.default=function(e,t){var a,d=e,l=t;'search'===d?a=o(l):'query'===d?a=s(l):'path'===d?a=r(l):'hash'===d?a=n(l):void 0;a?i(a):console.error('incorrect set location params')}},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var n=a(2),r=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(e){var t=(0,r.default)(),a=t[e];return a?a:void console.error('incorrect get location params')}},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var n=a(2),r=function(e){return e&&e.__esModule?e:{default:e}}(n),o={hashLocation:r.default};t.default=o},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0});var r=a(27),o=n(r),d=a(47),s=n(d),i=a(51),l=n(i),u=a(52),c=n(u),p=[{name:'Home Page',path:'/',view:o.default,isDefault:!0},{name:'Work',path:'/work/:is',view:s.default},{name:'Folder',path:'/folder/:id',view:l.default},{name:'About',path:'/about',view:c.default}];t.default=p},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(e){var t=document.getElementById('main'),a=o.default.albums_cached,n=o.default.images_cached;e&&e.query&&e.query.cached&&'false'===e.query.cached&&(a=o.default.albums,n=o.default.images);var r=new s.default(a,n);window.scrollTo(0,0),t.innerHTML=r.render()};var r=a(3),o=n(r),d=a(9),s=n(d)},function(e,t,a){'use strict';function n(e){var t=new d(e),a=o(d.prototype.request,t);return r.extend(a,d.prototype,t),r.extend(a,t),a}var r=a(0),o=a(10),d=a(30),s=a(5),i=n(s);i.Axios=d,i.create=function(e){return n(r.merge(s,e))},i.Cancel=a(15),i.CancelToken=a(44),i.isCancel=a(14),i.all=function(e){return Promise.all(e)},i.spread=a(45),e.exports=i,e.exports.default=i},function(e){function t(e){return!!e.constructor&&'function'==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function a(e){return'function'==typeof e.readFloatLE&&'function'==typeof e.slice&&t(e.slice(0,0))}e.exports=function(e){return null!=e&&(t(e)||a(e)||!!e._isBuffer)}},function(e,t,a){'use strict';function n(e){this.defaults=e,this.interceptors={request:new d,response:new d}}var r=a(5),o=a(0),d=a(39),s=a(40);n.prototype.request=function(e){'string'==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),e=o.merge(r,{method:'get'},this.defaults,e),e.method=e.method.toLowerCase();var t=[s,void 0],a=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)a=a.then(t.shift(),t.shift());return a},o.forEach(['delete','get','head','options'],function(e){n.prototype[e]=function(t,a){return this.request(o.merge(a||{},{method:e,url:t}))}}),o.forEach(['post','put','patch'],function(e){n.prototype[e]=function(t,a,n){return this.request(o.merge(n||{},{method:e,url:t,data:a}))}}),e.exports=n},function(e,t,a){'use strict';var n=a(0);e.exports=function(e,t){n.forEach(e,function(a,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=a,delete e[n])})}},function(e,t,a){'use strict';var n=a(13);e.exports=function(e,t,a){var r=a.config.validateStatus;a.status&&r&&!r(a.status)?t(n('Request failed with status code '+a.status,a.config,null,a.request,a)):e(a)}},function(e){'use strict';e.exports=function(e,t,a,n,r){return e.config=t,a&&(e.code=a),e.request=n,e.response=r,e}},function(e,t,a){'use strict';function n(e){return encodeURIComponent(e).replace(/%40/gi,'@').replace(/%3A/gi,':').replace(/%24/g,'$').replace(/%2C/gi,',').replace(/%20/g,'+').replace(/%5B/gi,'[').replace(/%5D/gi,']')}var r=a(0);e.exports=function(e,t,a){if(!t)return e;var o;if(a)o=a(t);else if(r.isURLSearchParams(t))o=t.toString();else{var d=[];r.forEach(t,function(e,t){null===e||'undefined'==typeof e||(r.isArray(e)?t+='[]':e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),d.push(n(t)+'='+n(e))}))}),o=d.join('&')}return o&&(e+=(-1===e.indexOf('?')?'?':'&')+o),e}},function(e,t,a){'use strict';var n=a(0),r=['age','authorization','content-length','content-type','etag','expires','from','host','if-modified-since','if-unmodified-since','last-modified','location','max-forwards','proxy-authorization','referer','retry-after','user-agent'];e.exports=function(e){var t,a,o,d={};return e?(n.forEach(e.split('\n'),function(e){if(o=e.indexOf(':'),t=n.trim(e.substr(0,o)).toLowerCase(),a=n.trim(e.substr(o+1)),t){if(d[t]&&0<=r.indexOf(t))return;d[t]='set-cookie'===t?(d[t]?d[t]:[]).concat([a]):d[t]?d[t]+', '+a:a}}),d):d}},function(e,t,a){'use strict';var n=a(0);e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return a&&(r.setAttribute('href',t),t=r.href),r.setAttribute('href',t),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,''):'',host:r.host,search:r.search?r.search.replace(/^\?/,''):'',hash:r.hash?r.hash.replace(/^#/,''):'',hostname:r.hostname,port:r.port,pathname:'/'===r.pathname.charAt(0)?r.pathname:'/'+r.pathname}}var t,a=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement('a');return t=e(window.location.href),function(a){var r=n.isString(a)?e(a):a;return r.protocol===t.protocol&&r.host===t.host}}():function(){return function(){return!0}}()},function(e){'use strict';function t(){this.message='String contains an invalid character'}t.prototype=new Error,t.prototype.code=5,t.prototype.name='InvalidCharacterError',e.exports=function(e){for(var a,n,r=e+'',o='',d=0,s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';r.charAt(0|d)||(s='=',d%1);o+=s.charAt(63&a>>8-8*(d%1))){if(n=r.charCodeAt(d+=3/4),255<n)throw new t;a=a<<8|n}return o}},function(e,t,a){'use strict';var n=a(0);e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,a,r,o,d){var s=[];s.push(e+'='+encodeURIComponent(t)),n.isNumber(a)&&s.push('expires='+new Date(a).toGMTString()),n.isString(r)&&s.push('path='+r),n.isString(o)&&s.push('domain='+o),!0===d&&s.push('secure'),document.cookie=s.join('; ')},read:function(e){var t=document.cookie.match(new RegExp('(^|;\\s*)('+e+')=([^;]*)'));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,'',Date.now()-8.64e7)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,a){'use strict';function n(){this.handlers=[]}var r=a(0);n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},function(e,t,a){'use strict';function n(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var r=a(0),o=a(41),d=a(14),s=a(5),i=a(42),l=a(43);e.exports=function(e){n(e),e.baseURL&&!i(e.url)&&(e.url=l(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(['delete','get','head','post','put','patch','common'],function(t){delete e.headers[t]});var t=e.adapter||s.adapter;return t(e).then(function(t){return n(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return d(t)||(n(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,a){'use strict';var n=a(0);e.exports=function(e,t,a){return n.forEach(a,function(a){e=a(e,t)}),e}},function(e){'use strict';e.exports=function(e){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e){'use strict';e.exports=function(e,t){return t?e.replace(/\/+$/,'')+'/'+t.replace(/^\/+/,''):e}},function(e,t,a){'use strict';function n(e){if('function'!=typeof e)throw new TypeError('executor must be a function.');var t;this.promise=new Promise(function(e){t=e});var a=this;e(function(e){a.reason||(a.reason=new r(e),t(a.reason))})}var r=a(15);n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e,t=new n(function(t){e=t});return{token:t,cancel:e}},e.exports=n},function(e){'use strict';e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var n=a(1);t.default=class extends n.Component{constructor(){var e=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};super(),this.photo=e}dom(){return console.log(this.photo.isMature),'\n      <span class="img" data-image-src="'+this.photo.img.thumb_large+'" '+(this.photo.isMature?'data-isMature':'')+'>\n        <img src="'+this.photo.img.thumb_small+'"  class="'+(this.photo.isMature?'is-mature':'')+'" alt="" />\n      </span>\n    '}delay(){var e=this.target(),t=e.querySelector('img'),a=e.getAttribute('data-image-src');e.addEventListener('click',function(){e.hasAttribute('data-isMature')&&'clicked'!==e.getAttribute('data-isMature')&&(t.src=a,t.classList.remove('is-mature'),e.setAttribute('data-isMature','clicked'))}),setTimeout(function(){t.classList.contains('is-mature')||(t.src=a)},1500)}}},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(e){if(e&&e.metadata&&e.metadata.is){var t=e.metadata;if('photography'===t.is||'restoration'===t.is){var a=document.getElementById('main'),n=o.default.albums_cached,r=o.default.images_cached;e.query&&e.query.cached&&'false'===e.query.cached&&(n=o.default.albums,r=o.default.images);var d=new s.default(t.is,n,r);window.scrollTo(0,0),a.innerHTML=d.render()}}};var r=a(3),o=n(r),d=a(48),s=n(d)},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0});var r=a(1),o=a(4),d=n(o),s=a(49),i=n(s);t.default=class extends r.Component{constructor(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:[];super(),this.albums_api=t,this.images_api=a,this.work_is=e}dom(){return'\n      <ul class="container container--gapped work-container"></ul>\n    '}delay(){var e=this;(0,d.default)({method:'get',url:this.albums_api}).then(function(t){var a=t.data;a.forEach(function(t){if(t.type===e.work_is&&'top-images'!==t.name){var a=new i.default(t,e.images_api),n=e.target();a.addTo(n)}})})}}},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0});var r=a(1),o=a(4),d=n(o),s=a(50),i=n(s);t.default=class extends r.Component{constructor(e,t){super(),this.album=e,this.imagesApi=t}dom(){return'\n      <li class="album-card" data-type="'+this.album.type+'" data-cover-id="'+this.album.cover_pic+'">\n        <a href="#/folder/'+this.album.album_id+'" class="album-card__container">\n          <div class="album-card__img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs" alt="" /></div>\n          <div class="album-card__name">\n            <h3 class="highlight">'+this.album.name+'</h3>\n          </div>\n        </a>\n      </li>\n    '}delay(){var e=this;this.album.cover_pic&&(0,d.default)({method:'get',url:this.imagesApi}).then(function(t){var a=t.data;a.forEach(function(t){if(t.image_id===e.album.cover_pic){var a=e.target(),n=a.querySelector('.album-card__img'),r=new i.default(t);r.replaceContentOf(n)}})})}}},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var n=a(1);t.default=class extends n.Component{constructor(e){super(),this.photo=e}dom(){return'\n      <img src="'+this.photo.img.thumb_small+'" data-src="'+this.photo.img.thumb_medium+'" alt="" />\n    '}delay(){var e=this.target(),t=e.getAttribute('data-src');setTimeout(function(){e.src=t},1500)}}},function(e,t,a){'use strict';function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(e){if(e&&e.metadata&&e.metadata.id){var t=document.getElementById('main'),a=e.metadata.id,n=o.default.albums_cached,r=o.default.images_cached;e.query&&e.query.cached&&'false'===e.query.cached&&(n=o.default.albums,r=o.default.images);var d=new s.default(n,r,{containerName:'folder-container',albumid:a,classNames:'container--gapped container--showcase--mini'});window.scrollTo(0,0),t.innerHTML=d.render()}};var r=a(3),o=n(r),d=a(9),s=n(d)},function(e,t,a){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(){var e=document.getElementById('main'),t=(0,r.default)('Title');window.scrollTo(0,0),e.innerHTML=t};var n=a(53),r=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.default=function(){return'\n    <div class="container container--gapped about-container">\n    <div class="holder">\n      <h1 class="highlight">Hola!!</h1>\n      <div class="block">\n<span class="highlight">I am <span class="special-text special-text--strike">Groot</span>, Siddhesh\nA Photography Enthusiast from India.</span>\n      </div>\n      <div class="block">\n<span class="highlight">Say Hi At \n<b>sidthecool007@gmail.com</b></span>\n      </div>\n    <div class="block">\n<span class="highlight">And Find Me on <b><a class="special-text special-text--ugly-link" href="https://www.instagram.com/sidthecool007/" target="_blank">Instagram</a></b>\n</span>\n      </div>\n      <div class="block">\n<span class="highlight">Need to cut short because \nI decided to use this \n      giant a<span class="special-text special-text--blur">ss</span> font\nAnd ha...\nEnjoy this weird site!!</span>\n      </div>\n\n      <div class="waste-of-space">\n<span class="highlight">Now This is\nplain Waste Of Space</span>\n      </div>\n    </div>\n    </div>\n  '}},function(){}]);