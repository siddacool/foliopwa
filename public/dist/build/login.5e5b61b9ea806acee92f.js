(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='public/dist/build/',b(b.s=36)})([function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0}),b.utils=b.Router=b.DataComponent=b.Component=void 0;var e=c(5),f=d(e),g=c(6),h=d(g),i=c(7),j=d(i),k=c(12),l=d(k);b.Component=f.default,b.DataComponent=h.default,b.Router=j.default,b.utils=l.default},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0});var e=c(10),f=d(e),g=c(11),h=d(g);b.default=function(){var a=location.hash,b=a,c='',d='';if(b.includes('?')){var e=b.split('?');if(b=e[0],c=e[1].replace(/\//g,''),''!==c){for(var g={},j=c.split('&'),k=0;k<j.length;k++){var i=j[k].split('='),l=i[0],m=i[1];g[l]=m}d=g}}if(b.endsWith('/')&&!b.endsWith('#/')){var n=b.slice(0,-1);b=n.replace('#','')}else b=b.replace('#','');return{hash:a.replace('#',''),path:b,search:c,query:d,set:f.default,get:h.default}}},function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a,b){var c=document.createElement('div');c.innerHTML=a;for(var d,e=document.createDocumentFragment(),f=0;f<c.childNodes.length;f++)d=c.childNodes[f].cloneNode(!0),e.appendChild(d);return b&&e.childNodes[1].setAttribute('data-domr-id',b),e.childNodes[1].outerHTML}},function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a){var b=document.querySelector('[data-domr-id="'+a+'"]');if(b)return b}},function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:7;return Math.random().toString(36).substr(2,a)}},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(b,'__esModule',{value:!0});var f=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(2),h=d(g),i=c(3),j=d(i),k=c(4),l=d(k),m={parent:document.getElementById('wrapper'),dom:'\n    <div>\n      Domr Component\n    </div>\n  '},n=function(){function a(){var b=this,c=0<arguments.length&&void 0!==arguments[0]?arguments[0]:'domr-component';e(this,a),this.parentDefault=m.parent,this.domContent=m.dom,this.createElement=h.default,this.domrid=c+'-'+(0,l.default)(7),this.target=function(){return(0,j.default)(b.domrid)},this.handlingParent=this.parentDefault||document.querySelector('body')}return f(a,[{key:'dom',value:function(){return''}},{key:'events',value:function(){}},{key:'deligateEvents',value:function(a,b,c){this.handlingParent.addEventListener(b,function(b){b.target&&b.target.matches(a)&&c(b.target,b)})}},{key:'addEvent',value:function(a,b){this.target()&&this.addEventOn('[data-domr-id="'+this.domrid+'"]',a,b)}},{key:'addEventOn',value:function(a,b,c){var d=this;if(b instanceof Array&&!c){b.forEach(function(b){d.deligateEvents(a,b[0],b[1])})}else this.deligateEvents(a,b,c)}},{key:'delay',value:function(){}},{key:'delayedContent',value:function(){var a=this;setTimeout(function(){a.target()&&a.delay()},50)}},{key:'optimizedDom',value:function(){return this.events(),this.createElement(this.dom(),this.domrid)}},{key:'render',value:function(){return this.delayedContent(),this.optimizedDom()}},{key:'addTo',value:function(a){a?(a.insertAdjacentHTML('beforeend',this.optimizedDom()),this.delayedContent()):console.warn('parent not found')}},{key:'addFromStartTo',value:function(a){a?(a.insertAdjacentHTML('afterbegin',this.optimizedDom()),this.delayedContent()):console.warn('parent not found')}},{key:'addBefore',value:function(a){a?(a.insertAdjacentHTML('beforebegin',this.optimizedDom()),this.delayedContent()):console.error('sibling not found')}},{key:'addAfter',value:function(a){a?(a.insertAdjacentHTML('afterend',this.optimizedDom()),this.delayedContent()):console.error('sibling not found')}},{key:'replaceWith',value:function(a){if(a){var b=a.parentElement;b?(a.insertAdjacentHTML('afterend',this.optimizedDom()),b.removeChild(a),this.delayedContent()):console.warn('sibling has no parentElement')}else console.warn('sibling not found')}},{key:'replaceContentOf',value:function(a){if(a){a.innerHTML=this.optimizedDom(),this.delayedContent()}else console.warn('parent not found')}}]),a}();b.default=n},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(b,'__esModule',{value:!0});var f=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(4),h=d(g),i=c(2),j=d(i),k=c(3),l=d(k),m=function(){function a(b){var c=this,d=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'data-component';e(this,a),this.api=b,this.domrid=d+'-'+(0,h.default)(7),this.createElement=j.default,this.target=function(){return(0,l.default)(c.domrid)}}return f(a,[{key:'dom',value:function(){}},{key:'loadApi',value:function(a,b){var c=this,d=new XMLHttpRequest;d.open('GET',this.api,!0),d.onreadystatechange=function(){if(4===d.readyState&&200===d.status){var e=d.responseText.trim();if(!e.length)console.warn('Empty API');else if('['===e.charAt(0)||'{'===e.charAt(0)){var f=JSON.parse(e),g=function(a){return c.createElement(c.dom(a),c.domrid)},h='';'['===e.charAt(0)?h=''+f.map(function(a){return''+g(a)}).join(''):'{'===e.charAt(0)&&(h=g(f)),'replaceContentOf'===b?a.innerHTML=h:'addTo'===b?a.insertAdjacentHTML('beforeend',h):'addFromStartTo'===b?a.insertAdjacentHTML('afterbegin',h):'addBefore'===b?a.insertAdjacentHTML('beforebegin',h):'addAfter'===b?a.insertAdjacentHTML('afterend',h):console.log(f),c.events(),c.delayedContent(f)}else console.warn('not a suitable API')}},d.send(null)}},{key:'delay',value:function(){}},{key:'delayedContent',value:function(a){this.delay(a)}},{key:'events',value:function(){}},{key:'eventMain',value:function(a,b,c,d){for(var f=a.querySelectorAll(b),e=function(a){f[a].addEventListener(c,function(b){d(f[a],b)})},g=0;g<f.length;g++)e(g)}},{key:'eventGrouping',value:function(a,b,c,d){var e=this;if(c instanceof Array&&!d){c.forEach(function(c){e.eventMain(a,b,c[0],c[1])})}else this.eventMain(a,b,c,d)}},{key:'addEvent',value:function(a,b){this.eventGrouping(document,'[data-domr-id="'+this.domrid+'"]',a,b)}},{key:'addEventOn',value:function(a,b,c){for(var d=document.querySelectorAll('[data-domr-id="'+this.domrid+'"]'),e=0;e<d.length;e++)this.eventGrouping(d[e],a,b,c)}},{key:'logData',value:function(){this.loadApi()}},{key:'replaceContentOf',value:function(a){this.loadApi(a,'replaceContentOf')}},{key:'addTo',value:function(a){this.loadApi(a,'addTo')}},{key:'addFromStartTo',value:function(a){this.loadApi(a,'addFromStartTo')}},{key:'addBefore',value:function(a){a?this.loadApi(a,'addBefore'):console.error('sibling not found')}},{key:'addAfter',value:function(a){a?this.loadApi(a,'addAfter'):console.error('sibling not found')}},{key:'replaceWith',value:function(a){if(a){var b=a.parentElement;b?(this.addAfter(a),b.removeChild(a)):console.warn('sibling has no parentElement')}else console.error('sibling not found')}}]),a}();b.default=m},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(b,'__esModule',{value:!0});var f=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(8),h=d(g),i=c(1),j=d(i),k=function(a){var b=[];return a.forEach(function(a){a.path&&a.view&&b.push(a)}),b},l={routes:[],config:{redirectDefault:!1,refreshPage:!1,clearLog:!1}},m=function(){function a(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:l.routes,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:l.config;e(this,a),this.routes=k(b),this.redirectDefault=c.redirectDefault||!0,this.refreshPage=c.refreshPage||!1,this.clearLog=c.clearLog||!1,this.addView=h.default}return f(a,[{key:'showRoutes',value:function(){console.log(this.routes)}},{key:'reloadOnHashChange',value:function(){var a=this;addEventListener('hashchange',function(b){a.clearLog&&(console.API,'undefined'==typeof console._commandLineAPI?'undefined'==typeof console._inspectorCommandLineAPI?'undefined'!=typeof console.clear&&(console.API=console):console.API=console._inspectorCommandLineAPI:console.API=console._commandLineAPI,console.API.clear()),a.refreshPage?location.reload():(a.start(),b.stopImmediatePropagation())})}},{key:'start',value:function(){var a,b=(0,j.default)(),c=b.path;if(''===c&&(location.hash='#/'),this.routes.forEach(function(d){var e=d.path;e.endsWith('/')&&'/'!==e&&(e=e.slice(0,-1));var f=[],g=e.replace(/([:*])(\w+)/g,function(a,b,c){return f.push(c),'([^/]+)'})+'(?:/|$)',h=c.match(new RegExp(g));if(h){var i=h.slice(1,h.length).reduce(function(a,b,c){return null===a&&(a={}),a[f[c]]=b,a},null);d.metadata=i||'',d.query=b.query,a=d}}),a)this.addView(a);else{var d=this.routes.find(function(a){return!0===a.isDefault});this.redirectDefault&&d?this.addView(d):console.error('Page Not Found')}this.reloadOnHashChange()}}]),a}();b.default=m},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(9),e=function(a){return a&&a.__esModule?a:{default:a}}(d);b.default=function(a){var b=a.view,c=(0,e.default)(a,['view']);a&&b&&('function'==typeof b?b(c):b)}},function(a,b){'use strict';function c(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0}Object.defineProperty(b,'__esModule',{value:!0});var d=['view'];b.default=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:d,e={};return Object.keys(a).forEach(function(d){var f=a[d],g=c(b,d);g||(e[d]=f)}),e}},function(a,b,c){'use strict';function d(a){var b=a;return b.startsWith('#')||(b='#'+b),b}function e(a){var b=(0,k.default)(),c=b.search,e=a;return e.startsWith('#')&&(e=e.slice(0,-1)),c&&(!e.endsWith('/')&&(e+='/'),e=e+'?'+c),e=d(e),e}function f(a){var b=a,c=(0,k.default)(),e=c.path;return e.endsWith('/')&&(e=e.slice(0,-1)),b.startsWith('?')||(b='?'+b),b=d(e+'/'+b),b}function g(a){var b=[];for(var c in a)b.push(c+'='+a[c]);return'?'+b.join('&')}function h(a){var b=g(a),c=f(b);return c}function i(a){location.hash=a}Object.defineProperty(b,'__esModule',{value:!0});var j=c(1),k=function(a){return a&&a.__esModule?a:{default:a}}(j);b.default=function(a,b){var c,g=a,j=b;'search'===g?c=f(j):'query'===g?c=h(j):'path'===g?c=e(j):'hash'===g?c=d(j):void 0;c?i(c):console.error('incorrect set location params')}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(1),e=function(a){return a&&a.__esModule?a:{default:a}}(d);b.default=function(a){var b=(0,e.default)(),c=b[a];return c?c:void console.error('incorrect get location params')}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(1),e=function(a){return a&&a.__esModule?a:{default:a}}(d),f={hashLocation:e.default};b.default=f},,,function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0),e=c(19),f=function(a){return a&&a.__esModule?a:{default:a}}(e);b.default=class extends d.Component{constructor(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};super(),this.name=a,this.type=b.type||'text',this.title=b.title||b.placeholder||'',this.placeholder=b.placeholder||b.title||'',this.value=b.value||'',this.label_class=b.labelClass||''}dom(){return'\n      <div class="'+this.label_class+' no-input no-input--'+this.type+'">\n        <div class="text" data-name="'+this.name+'" lang="clusterf*ck" spellcheck="false" contenteditable="true">'+this.value+'</div>\n        <span class="placeholder">'+this.placeholder+'</span>\n        <span class="title">'+this.title+'</span>\n        <span class="backdrop"></span>\n        <span class="border"></span>\n      </div>\n    '}events(){this.addEventOn('[data-name=\''+this.name+'\']','paste',function(a,b){(0,f.default)(a,b)})}}},,function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0});b.default={apiKey:'AIzaSyByLhhClB2fpoApnZWz0RFhTz6NxVYMLes',authDomain:'sid-mangela-folio-db.firebaseapp.com',databaseURL:'https://sid-mangela-folio-db.firebaseio.com',projectId:'sid-mangela-folio-db',storageBucket:'sid-mangela-folio-db.appspot.com',messagingSenderId:'803380125475'}},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0}),b.TextArea=b.Password=b.Text=void 0;var e=c(15),f=d(e),g=c(41),h=d(g),i=c(42),j=d(i);b.Text=f.default,b.Password=h.default,b.TextArea=j.default},function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a,b){b.preventDefault();var c=b.clipboardData||window.clipboardData,d=c.getData('Text');a.textContent=d}},function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a){var b=window.scrollY;addEventListener('scroll',function(){var c=a.querySelector('.scroll'),d=c.querySelector('.scroll__head'),e=c.querySelector('.scroll__top-btn'),f=d.offsetTop+30;window.scrollY>=f?(window.scrollY>b?e.classList.remove('active'):e.classList.add('active'),b=window.scrollY,!c.classList.contains('scroll--fixed')&&c.classList.add('scroll--fixed')):c.classList.contains('scroll--fixed')&&(c.classList.remove('scroll--fixed'),e.classList.remove('active'))})}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0);b.default=class extends d.Component{constructor(a){super(),this.firebase=a}dom(){var a=this.firebase.auth();return'\n     <header>\n        <div class="logo">\n          <img src="./public/dist/favicon/favicon.png" alt="Logo" />\n        </div>\n        <div class="account">\n          <a href="#" class="account__pop"><svg role="img" class="icon"><use xlink:href="#icon-Actions-05"></use></svg></a>\n          <div class="account__drop">\n            <div class="account__welcome">Hola '+a.currentUser.email+'</div>\n            <a href="#" class="btn btn--primary account__logout">Logout</a>\n          </div>\n          <div class="account-cloak"></div>\n        </div>\n     </header>\n    '}events(){var a=this;this.addEventOn('.account__logout','click',function(b,c){c.preventDefault(),a.firebase.auth().signOut()}),this.addEventOn('.account__pop','click',function(a,b){b.preventDefault();var c=a.parentElement,d=c.querySelector('.account__drop');d.classList.add('account__drop--active')}),this.addEventOn('.account-cloak','click',function(a){var b=a.parentElement,c=b.querySelector('.account__drop');c.classList.remove('account__drop--active')})}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0);b.default=class extends d.Component{constructor(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:'scroll-to-top';super(),this.classNames=a}dom(){return'\n     <a href="" class="'+this.classNames+' scroll__top-btn"><svg role="img" class="icon"><use xlink:href="#icon-Design-14"></use></svg></a>\n    '}events(){this.addEventOn('.scroll__top-btn','click',function(a,b){b.preventDefault(),window.scrollTo(0,0)})}}},,,,,,,,,,,,,,function(a,b,c){'use strict';c(37),c(49)},function(a,b,c){'use strict';var d=c(0),e=c(38),f=function(a){return a&&a.__esModule?a:{default:a}}(e),g=new d.Router(f.default,{redirectDefault:!0});g.start()},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0});var e=c(39),f=d(e),g=c(46),h=d(g),i=[{name:'Home Page',path:'/',view:f.default,isDefault:!0},{name:'Album',path:'/album/:id',view:h.default},{name:'Image',path:'/image/:id',view:console.log('called')},{name:'Create',path:'/create',view:console.log('called')}];b.default=i},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a){var b=document.getElementById('wrapper'),c=f.default,d=firebase;d.apps.length||d.initializeApp(c),b.innerHTML='waiting',d.auth().onAuthStateChanged(function(c){if(c){var e='album';a.query&&a.query.stream&&(e=a.query.stream);var f=new j.default(d,e);b.innerHTML=f.render()}else{var g=new h.default(d);b.innerHTML=g.render()}}),window.scrollTo(0,0)};var e=c(17),f=d(e),g=c(40),h=d(g),i=c(43),j=d(i)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0),e=c(18);b.default=class extends d.Component{constructor(a){super(),this.firebase=a}dom(){var a=new e.Text('login-email',{title:'Email',placeholder:'Enter Your Email',labelClass:'login__email'}),b=new e.Password('login-password',{title:'Password',placeholder:'Enter Your Password',labelClass:'login__password'});return'\n      <div class="login">\n        <div class="login__well">\n          '+a.render()+'\n          '+b.render()+'\n          <a href="#" class="btn btn--primary login__login">Login</a>\n        </div>\n      </div>\n    '}events(){var a=this;this.addEventOn('.login__login','click',function(b,c){c.preventDefault();var d=b.parentElement,e=d.querySelector('[data-name="login-email"]').textContent.trim(),f=d.querySelector('[data-name="login-password"]').textContent.trim(),g=a.firebase.auth(),h=g.signInWithEmailAndPassword(e,f);h.catch(function(a){console.log(a.message)})})}}},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0});var e=c(15),f=d(e),g=c(19),h=d(g);b.default=class extends f.default{constructor(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};super(a,b),this.type='password'}events(){this.addEventOn('[data-name=\''+this.name+'\']','paste',function(a,b){(0,h.default)(a,b)})}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(15),e=function(a){return a&&a.__esModule?a:{default:a}}(d);b.default=class extends e.default{constructor(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};super(a,b),this.type='text-area'}}},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}function e(a){return q[a]}Object.defineProperty(b,'__esModule',{value:!0});var f=c(0),g=c(20),h=d(g),i=c(21),j=d(i),k=c(22),l=d(k),m=c(44),n=d(m),o=c(45),p=d(o),q={AdminPanelAlbumThumb:n.default,AdminPanelImageThumb:p.default};b.default=class extends f.Component{constructor(a,b){super(),this.firebase=a,this.stream_type=b,this.db_ref_object=this.firebase.database().ref()}dom(){var a=new j.default(this.firebase),b=new l.default('top-button');return'\n      <div class="stream-main-container">\n        '+a.render()+'\n        <div class="stream scroll">\n          <div class="tab">\n            <div class="tab__head scroll__head">\n              <div class="container tab__head__container">\n                <a href="#/?stream=album" class="tab__pick stream__pick" data-tab-pick="album">Albums</a>\n                <a href="#/?stream=image" class="tab__pick stream__pick" data-tab-pick="image">Images</a>\n              </div>\n            </div>\n            <div class="tab__body">\n              <div class="container tab__body__container">\n              </div>\n            </div>\n          </div>\n          '+b.render()+'\n        </div>\n      </div>\n    '}delay(){var a=this,b=this.target(),c=b.querySelector('.tab__body__container'),d=b.querySelector('[data-tab-pick="'+this.stream_type+'"]');d.classList.add('tab__pick--active'),this.db_ref_object.once('value',function(b){var d=b.val();Object.keys(d).forEach(function(b){var f=d[b];if(f.key=b,f[a.stream_type+'_id']){var g='AdminPanel'+(a.stream_type[0].toUpperCase()+a.stream_type.slice(1))+'Thumb',h=e(g),i=new h(f,a.db_ref_object);i.addTo(c)}})}),(0,h.default)(b)}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0);b.default=class extends d.Component{constructor(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=arguments[1];super(),this.content=a,this.db_ref_object=b,this.name=this.content.name||'',this.description=this.content.description||'',this.photos_list=this.content.photos_list||[]}dom(){return'\n     <li data-key="'+this.content.key+'" class="thumb thumb--album">\n      <a href="#/album/'+this.content.album_id+'" data-id="'+this.content.album_id+'">\n        <div class="img"><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="" alt="" /></div>\n        <div class="name"><span>'+this.name+'</span></div>\n      </a>\n     </li>\n    '}delay(){var a=this,b=this.target(),c=b.querySelector('img');this.content.cover_pic&&this.db_ref_object.once('value',function(b){var d=b.val();Object.keys(d).forEach(function(b){var e=d[b];e.key=b,e.image_id&&e.image_id===a.content.cover_pic&&(c.src=e.img.thumb_small,c.setAttribute('data-src',e.img.thumb_medium))})}).then(function(){setTimeout(function(){var a=c.getAttribute('data-src');c.src=a},1500)})}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0);b.default=class extends d.Component{constructor(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};super(),this.content=a,this.name=this.content.name||'',this.description=this.content.description||''}dom(){return'\n     <li data-key="'+this.content.key+'" class="thumb thumb--image">\n      <a href="#/image/'+this.content.image_id+'" data-id="'+this.content.image_id+'">\n        <div class="img"><img src="'+this.content.img.thumb_small+'" data-src="'+this.content.img.thumb_medium+'" alt="" /></div>\n      </a>\n     </li>\n    '}delay(){var a=this.target(),b=a.querySelector('img'),c=b.getAttribute('data-src');setTimeout(function(){b.src=c},1500)}}},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0}),b.default=function(a){var b=document.getElementById('wrapper'),c=f.default,d=firebase;d.apps.length||d.initializeApp(c),b.innerHTML='waiting',d.auth().onAuthStateChanged(function(c){if(c){var e=new h.default(d,a.metadata.id);b.innerHTML=e.render()}else location.hash='#/'}),window.scrollTo(0,0)};var e=c(17),f=d(e),g=c(47),h=d(g)},function(a,b,c){'use strict';function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,'__esModule',{value:!0});var e=c(0),f=c(20),g=d(f),h=c(18),i=c(21),j=d(i),k=c(22),l=d(k),m=c(48),n=d(m);b.default=class extends e.Component{constructor(a,b){super(),this.firebase=a,this.album_id=b,this.db_ref_object=this.firebase.database().ref()}dom(){var a=new j.default(this.firebase),b=new l.default('top-button');return'\n      <div class="album-folder-main-container">\n        '+a.render()+'\n        <div class="album-folder scroll">\n          <div class="album-folder__head scroll__head">\n            <div class="container album-folder__head__container">\n              <a href="#/?stream=album" class="back-button"><svg role="img" class="icon"><use xlink:href="#icon-Design-12"></use></svg><span>Back</span></a>\n              <span class="album-name"></span>\n              <a href="#" class="btn btn--primary edit-button">Edit Album</a>\n              <div class="decision">\n                <a href="#" class="btn btn--primary save-button">Save</a>\n                <a href="#" class="btn cancel-button">Cancel</a>\n              </div>\n            </div>\n          </div>\n          <div class="album-folder__body">\n            <div class="container album-folder__body__container">...</div>\n          </div>\n          '+b.render()+'\n        </div>\n      </div>\n    '}events(){var a=this;this.addEventOn('.edit-button','click',function(a,b){b.preventDefault();var c=a.parentElement.parentElement,d=c.parentElement;if(d.hasAttribute('data-key')){var e=d.querySelector('[data-name="album-name-edit"]'),f=d.querySelector('[data-name="album-description-edit"]'),g=d.querySelector('.info--display__name').textContent.trim(),h=d.querySelector('.info--display__description').textContent.trim(),i=d.querySelector('input[name="is-album-special-display"]:checked'),j=d.querySelector('.info--edit').querySelector('input[value="'+i.value+'"]');d.classList.add('edit'),e.textContent=g,f.textContent=h,j.checked=!0}}),this.addEventOn('.save-button','click',function(b,c){c.preventDefault();var d=b,e=d.parentElement.parentElement.parentElement,f=e.parentElement,g=f.querySelector('.cancel-button'),h=f.getAttribute('data-key'),i=f.querySelector('[data-name="album-name-edit"]').textContent.trim(),j=f.querySelector('[data-name="album-description-edit"]').textContent.trim(),k=f.querySelector('.info--display__name'),l=f.querySelector('.info--display__description'),m=f.querySelector('input[name="is-album-special"]:checked'),n=f.querySelector('.info--display').querySelector('input[value="'+m.value+'"]');d.setAttribute('data-og-text',d.textContent),d.textContent='....',g.style.display='none',d.style.margin='0',a.db_ref_object.child(h).update({name:i,description:j,isSpecial:JSON.parse(m.value)}).then(function(){k.textContent=i,l.textContent=j,n.checked=!0,f.classList.remove('edit'),d.textContent=d.getAttribute('data-og-text'),g.style.display='',d.style.margin=''})}),this.addEventOn('.cancel-button','click',function(a,b){b.preventDefault();var c=a.parentElement.parentElement.parentElement,d=c.parentElement;d.classList.remove('edit')})}delay(){var a=this,b=this.target(),c=b.querySelector('.album-folder'),d=b.querySelector('.album-folder__body__container'),e=b.querySelector('.album-name');this.db_ref_object.once('value',function(b){var f=b.val();Object.keys(f).forEach(function(b){var g=f[b];if(g.key=b,g.album_id===a.album_id){var i=new n.default(g,a.db_ref_object),j=new h.Text('album-name-edit',{title:'Album Name',placeholder:'Enter Album Name',labelClass:'name-edit',value:g.name}),k=new h.TextArea('album-description-edit',{title:'Description',placeholder:'Enter Description',labelClass:'description-edit',value:g.description});e.textContent=g.name,c.setAttribute('data-key',b),d.innerHTML='\n            <div>\n              <div class="info info--display">\n                <h1 class="info--display__name">'+g.name+'</h1>\n                <div class="info--display__description">'+g.description.trim()+'</div>\n                <div class="info--display__is-special" style="display:none">\n                  '+(g.isSpecial?'\n                      <input type="radio" name="is-album-special-display" value=true checked/>\n                      <input type="radio" name="is-album-special-display" value=false />\n                      ':'\n                      <input type="radio" name="is-album-special-display" value=true />\n                      <input type="radio" name="is-album-special-display" value=false checked/>\n                      ')+'\n                </div>\n              </div>\n              <div class="info info--edit">\n                <div class="info--edit__name">\n                  '+j.render()+'\n                </div>\n                <div class="info--edit__description">\n                  '+k.render()+'\n                </div>\n                <div class="info--edit__is-special">\n                  <h3>does album needs special layout ?</h3>\n                  <div class="btn-group">\n                    '+(g.isSpecial?'\n                      <label>\n                        <input type="radio" name="is-album-special" value=true checked/>\n                        <span class="btn">Yes</span>\n                      </label>\n                      <label>\n                        <input type="radio" name="is-album-special" value=false />\n                        <span class="btn">No</span>\n                      </label>\n                      ':'\n                      <label>\n                        <input type="radio" name="is-album-special" value=true />\n                        <span class="btn">Yes</span>\n                      </label>\n                      <label>\n                        <input type="radio" name="is-album-special" value=false checked/>\n                        <span class="btn">No</span>\n                      </label>\n                      ')+'\n                  </div>\n                </div>\n                <a href="#" class="btn btn--primary add-remove-photos info--edit__add-photos">Add Photos</a>\n              </div>\n              '+i.render()+'\n            </div>\n          ',d.classList.add('found')}})}).then(function(){d.classList.contains('found')?(0,g.default)(b):d.innerHTML='<div>No Album</div>'})}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0);b.default=class extends d.Component{constructor(a,b){super(),this.content=a,this.db_ref_object=b}dom(){return'\n     <div data-key="'+this.content.key+'" class="album-folder__group">\n     </div>\n    '}delay(){var a=this.target();if(this.content.photos_list&&this.content.photos_list.length){var b=this.content.photos_list,c=[];this.db_ref_object.once('value',function(d){var e=d.val();Object.keys(e).forEach(function(a){var d=e[a];d.key=a,d.image_id&&b.includes(d.image_id)&&c.push(d)});for(var f=function(d){var e=c.find(function(a){return a.image_id===b[d]});e&&(a.innerHTML+='\n              <img src="'+e.img.thumb_small+'" alt="" data-src="'+e.img.thumb_medium+'" data-id="'+e.image_id+'"/>\n            ')},g=0;g<b.length;g++)f(g)}).then(function(){setTimeout(function(){for(var b,c=a.querySelectorAll('img'),d=0;d<c.length;d++)b=c[d],b.src=b.getAttribute('data-src')},1500)})}}}},function(){}]);