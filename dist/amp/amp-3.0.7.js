/**
 * AMPjs Javascript Library
 * AMPjs Core File version 3.0.7
 *
 * The MIT License (MIT)
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var AMP = {};

(function(root){

  // 'use strict';


  /*======================================================================
    Ampクラス
  ======================================================================*/

  // クラス設定
  var CLASS_NAME = 'Amp',
  VERSION = '3.0.7';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>BASE_CLASS (Amp)</h4>
   * <p>基底クラスを定義しています （このクラスをベースに子クラスを設計します)<br>
   * AmpクラスをAMP.BASE_CLASSにエクスポートしてます</p>
   *
   * @class AMP.BASE_CLASS
   * @constructor
   **/
  function Amp(){}



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Amp.VERSION = VERSION;


  /**
   * <h4>クラス名</h4>
   *
   * @default Amp
   * @property className
   * @type {String}
   */
  Amp.prototype.className = CLASS_NAME;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>ClassをExtendします</h4>
   *
   * @static
   * @method extend
   * @param {Function} subClass サブクラス
   * @return {Extend Class}
   */
  // !!!: export AMP._extend;
  Amp.extend = null;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Amp.prototype.toString = function(){
    return '[object ' + this.className + ']';
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP = new Amp();
  AMP.BASE_CLASS = Amp;


}(window));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    継承・拡張
  ======================================================================*/

  /**
   * <h4>クラス・オブジェクトの継承、拡張</h4>
   * <p><a href="../../demo/AMP.Base.html#extend">DEMO</a></p>
   *
   * @class AMP.Extend
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>オブジェクトの拡張</h4>
   *
   * @static
   * @method mixin
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  AMP.mixin = function(){
    var isDeep, count, extendObject, length, obj, key, data, copy, clone;

    length = arguments.length;
    isDeep = AMP.isBoolean(arguments[0]) && arguments[0];

    if(isDeep){
      count = 2;
      extendObject = arguments[1];
    } else {
      count = 1;
      extendObject = arguments[0];
    }

    for(; count < length; count += 1){
      obj = arguments[count];

      for(key in obj){
        data = extendObject[key];
        copy = obj[key];

        // マージデータが同じなら次のループへ
        if(extendObject === copy){
          continue;
        }

        if(isDeep && copy && AMP.isObject(copy) || AMP.isArray(copy)){
          if(AMP.isArray(copy)){
            clone = data && AMP.isArray(data) ? data : [];
          } else {
            clone = data && AMP.isObject(data) ? data : {};
          }

          // ネスト構造を再帰処理
          extendObject[key] = AMP.mixin(isDeep, clone, copy);

        } else if (copy !== undefined){
          extendObject[key] = copy;
        }
      }
    }

    return extendObject;
  };


  /**
   * <h4>クラスの継承</h4>
   * <p>拡張した、サブクラスを返します<br>
   * superClassは、可変長引数で、多重継承することが可能</p>
   *
   * @static
   * @method inherits
   * @param  {Function} subClass   サブクラス
   * @param  {Function} superClass スパークラス
   * @return {Function}
   */
  AMP.inherits = function(subClass, superClass){
    superClass = AMP.argsToArray(arguments, 1);

    var p = subClass.prototype,
    i = superClass.length - 1;

    for(; i > -1; i -= 1){
      // !!!: jshintのチェックを緩和します
      /* jshint loopfunc: true */
      /* jshint -W082 */
      function F(){
        this.constructor = subClass;
      }
      F.prototype = superClass[i].prototype;

      // exports
      // constructor
      subClass[AMP.getFunctionName(superClass[i]) + '_constructor'] = superClass[i];

      // static
      AMP.each(superClass[i], function(item, key){
        subClass[key] = item;
      });

      // public
      AMP.mixin(p, new F());
    }

    return subClass;
  };


  /**
   * <h4>ClassをExtendします</h4>
   * <p>ClassにAMP._extendメソッドをExportして使います</p>
   *
   * @protected
   * @static
   * @method _extend
   * @param {arguments} subClass サブクラス
   * @return {Function}
   */
  AMP._extend = AMP.BASE_CLASS.extend = function(){
    var subClass = arguments.length ? arguments : function(){};
    return AMP.inherits(subClass, this);
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    ブラウザ機能判定
  ======================================================================*/

  /**
   * <h4>ブラウザ機能判定</h4>
   * <p><a href="../../demo/AMP.Base.html#has">DEMO</a></p>
   *
   * @class AMP.Has
   */



  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var
  url  = root.location,
  doc  = document,
  html = doc.documentElement;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ApplicationCache機能の有無</h4>
   *
   * @static
   * @method hasAppCache
   * @return {Boolean}
   */
  AMP.hasAppCache = function(){
    return 'applicationCache' in root;
  };


  /**
   * <h4>Geolocation機能の有無</h4>
   *
   * @static
   * @method hasGeolocation
   * @return {Boolean}
   */
  AMP.hasGeolocation = function(){
    return 'geolocation' in navigator;
  };


  /**
   * <h4>PushState機能の有無</h4>
   *
   * @static
   * @method hasPushState
   * @return {Boolean}
   */
  AMP.hasPushState = function(){
    return 'pushState' in root.history;
  };


  /**
   * <h4>RAF(requestAnimationFrame)機能の有無</h4>
   *
   * @static
   * @method hasRAF
   * @return {Boolean}
   */
  AMP.hasRAF = function(){
    return !!(root.requestAnimationFrame ||
      root.webkitRequestAnimationFrame ||
      root.mozRequestAnimationFrame ||
      root.msRequestAnimationFrame);
  };


  /**
   * <h4>ストレージ機能の有無</h4>
   *
   * @static
   * @method hasStorage
   * @return {Boolean}
   */
  AMP.hasStorage = function(){
    return 'sessionStorage' in root && 'localStorage' in root;
  };


  /**
   * <h4>WebSocket機能の有無</h4>
   *
   * @static
   * @method hasWebSocket
   * @return {Boolean}
   */
  AMP.hasWebSocket = function(){
    return 'WebSocket' in root;
  };


  /**
   * <h4>WebWorker機能の有無</h4>
   *
   * @static
   * @method hasWebWorker
   * @return {Boolean}
   */
  AMP.hasWebWorker = function(){
    return 'Worker' in root;
  };


  /**
   * <h4>Audio機能の有無</h4>
   *
   * @static
   * @method hasAudio
   * @return {Boolean}
   */
  AMP.hasAudio = function(){
    // hack for ietester
    if(AMP.isBrowser('ie', 9)){
      return true;
    } else {
      return !!doc.createElement('audio').canPlayType;
    }
  };


  /**
   * <h4>Canvas機能の有無</h4>
   *
   * @static
   * @method hasCanvas
   * @return {Boolean}
   */
  AMP.hasCanvas = function(){
    return !!doc.createElement('canvas').getContext;
  };

  /**
   * <h4>LocationHashの有無</h4>
   *
   * @static
   * @method hasHash
   * @param {String} key ハッシュ名 省略可
   * @return {Boolean}
   */
  AMP.hasHash = function(key){
    var flag = false;

    if(url.href.indexOf('#') > -1){
      if(key){
        var k = key.replace(/^#/, ''),
        vals = url.hash.split('#'),
        i = 1,
        l = vals.length;

        for(; i < l; i += 1){
          if(k === vals[i]){
            flag = true;
            break;
          }
        }

      } else {
        flag = true;
      }
    }

    return flag;
  };


  /**
   * <h4>MsPointer判定 βver</h4>
   *
   * @static
   * @method hasMsPointer
   * @return {Boolean}
   */
  AMP.hasMsPointer = function(){
    return root.navigator.msPointerEnabled > -1;
  };


  /**
   * <h4>文字列を検索し、指定の文字列があるか判定</h4>
   *
   * @static
   * @method hasString
   * @param  {String}  str   対象の文字列
   * @param  {String}  haStr 検索文字
   * @return {Boolean}
   */
  AMP.hasString = function(str, hasStr){
    return AMP.isString(str) && str.indexOf(hasStr) > -1;
  };


  /**
   * <h4>SVG機能の有無</h4>
   *
   * @static
   * @method hasSVG
   * @return {Boolean}
   */
  AMP.hasSVG = function(){
    return 'SVGAngle' in root;
  };


  /**
   * <h4>TouchScreen判定</h4>
   *
   * @static
   * @method hasTouchScreen
   * @return {Boolean}
   */
  AMP.hasTouchScreen = (function(){
    var hasTouchScreen,
    div = doc.createElement('div');

    div.setAttribute('ontouchstart', 'return');
    hasTouchScreen = (typeof div.ontouchstart === 'function');
    return function(){
      return hasTouchScreen;
    };
  }());


  /**
   * <h4>Video機能の有無</h4>
   *
   * @static
   * @method hasVideo
   * @return {Boolean}
   */
  AMP.hasVideo = function(){
    // hack for ietester
    if(AMP.isBrowser('ie', 9)){
      return true;
    } else {
      return !!doc.createElement('video').canPlayType;
    }
  };


  /**
   * <h4>XMLSerializerの有無</h4>
   *
   * @static
   * @method hasXMLSerializer
   * @return {Boolean}
   */
  AMP.hasXMLSerializer = function(){
    return 'XMLSerializer' in root;
  };


  /**
   * <h4>CSS3 Transition機能の有無</h4>
   *
   * @static
   * @method hasTransition
   * @return {Boolean}
   */
  AMP.hasTransition = function(){
    var props = ['transition', '-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'],
    i = 0,
    l = props.length,
    flag = false;

    for(; i < l; i += 1){
      if(props[i] in html.style){
        flag = true;
        break;
      }
    }

    return flag;
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    型, OS, デバイス, ブラウザの判定
  ======================================================================*/

  /**
   * <h4>型, OS, デバイス, ブラウザの判定</h4>
   * <p><a href="../../demo/AMP.Base.html#is">DEMO</a></p>
   *
   * @class AMP.Is
   */



  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var
  ua       = navigator.userAgent.toLowerCase(),
  toString = Object.prototype.toString;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /* isType
  -----------------------------------------------------------------*/

  /**
   * <h4>配列型判定</h4>
   *
   * @static
   * @method isArray
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isArray = Array.isArray || function(obj){
    return toString.call(obj) === '[object Array]';
  };


  /**
   * <h4>真偽型判定</h4>
   *
   * @static
   * @method isBoolean
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isBoolean = function(obj){
    return toString.call(obj) === '[object Boolean]';
  };


  /**
   * <h4>関数型判定</h4>
   *
   * @static
   * @method isFunction
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isFunction = function(obj){
    return toString.call(obj) === '[object Function]';
  };


  /**
   * <h4>数値型判定</h4>
   *
   * @static
   * @method isNumber
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isNumber = function(obj){
    return toString.call(obj) === '[object Number]';
  };


  /**
   * <h4>オブジェクト型判定</h4>
   *
   * @static
   * @method isObject
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isObject = function(obj){
    return !!obj && toString.call(obj) === '[object Object]';
  };


  /**
   * <h4>プレーンオブジェクト判定</h4>
   *
   * @static
   * @method isPlainObject
   * @param  {Object}  obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isPlainObject = function(obj){
    return AMP.isObject(obj) && Object.keys(obj).length === 0;
  };


  /**
   * <h4>文字列型判定</h4>
   *
   * @static
   * @method isString
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isString = function(obj){
    return toString.call(obj) === '[object String]';
  };


  /**
   * <h4>正規表現判定</h4>
   *
   * @static
   * @method isRegexp
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isRegexp = function(obj) {
    return toString.call(obj) === '[object RegExp]';
  };


  /**
   * <h4>undefined判定</h4>
   *
   * @static
   * @method isUndefined
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isUndefined = function(obj){
    return obj === void 0;
  };


  /**
   * <h4>null判定</h4>
   *
   * @static
   * @method isNull
   * @param  {Object} obj 判定するオブジェクト
   * @return {Boolean}
   */
  AMP.isNull = function(obj) {
    return obj === null || toString.call(obj) === '[object Null]';
  };


  /* Number
  -----------------------------------------------------------------*/

  /**
   * <h4>ポジティブ値判定</h4>
   * <p>数値しか判定しません</p>
   *
   * @static
   * @method isPositive
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  AMP.isPositive = function(num){
    return AMP.isNumber(num) && num > 0;
  };


  /**
   * <h4>ネガティブ値判定</h4>
   * <p>数値しか判定しません</p>
   *
   * @static
   * @method isNegative
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  AMP.isNegative = function(num){
    return AMP.isNumber(num) && num < 0;
  };


  /**
   * <h4>割りきれるか判定</h4>
   *
   * @static
   * @method isBreakNumber
   * @param  {Number} num 判定したい数値
   * @param  {Number} breakNun 判定したい数値を割る数値
   * @return {Boolean}
   */
  AMP.isBreakNumber = function(num, breakNun) {
    return AMP.isNumber(num) && num % breakNun === 0;
  };


  /* OS
  -----------------------------------------------------------------*/

  /**
   * <h4>OS判定<h4>
   *
   * @static
   * @method isOS
   * @param  {String} key OS名<br>
   * OS名 | 引数文字列 <br>
   * Windows | windows <br>
   * Windows Phone | windowsPhone <br>
   * Mac (for Desktop) | mac <br>
   * Mac ios (for SmartDevice) | ios <br>
   * Android | android
   *
   * @param  {String|Number} ver バージョンナンバー Android ios のみ有効
   * @return {Boolean}
   */
  AMP.isOS = function(key, ver){
    var k = key.toLowerCase();

    if(k.indexOf('windows') > -1){
      return AMP.isWindows();

    } else if(k.indexOf('windowsphone') > -1){
      return AMP.isWindowsPhone();

    }  else if(k.indexOf('mac') > -1){
      return AMP.isMac();

    } else if(k.indexOf('ios') > -1){
      return AMP.isIos(ver);

    } else if(k.indexOf('android') > -1){
      return AMP.isAndroid(ver);
    }
  };


  /**
   * <h4>Windows判定</h4>
   *
   * @static
   * @method isWindows
   * @return {Boolean}
   */
  AMP.isWindows = function(){
    return ua.indexOf('windows') > -1;
  };


  /**
   * <h4>WindowsPhone判定</h4>
   * FIXME: βver.
   *
   * @beta
   * @static
   * @method isWindowsPhone
   * @return {Boolean}
   */
  AMP.isWindowsPhone = function(){
    return ua.indexOf('windows phone') > -1;
  };


  /**
   * <h4>Mac判定</h4>
   * <p>isoは、含みません</p>
   *
   * @static
   * @method isMac
   * @return {Boolean}
   */
  AMP.isMac = function(){
    return ua.indexOf('mac os') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>ios判定</h4>
   *
   * @static
   * @method isIos
   * @param {Number|String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  AMP.isIos = function(ver){
    if(ver){
      var serial = ('' + ver).replace(/\./g, '_');
      return ua.indexOf('os '+ serial) > -1;
    } else {
      return ua.indexOf('os') > -1 && ua.indexOf('mobile') > -1;
    }
  };


  /**
   * <h4>Android判定</h4>
   *
   * @static
   * @method isAndroid
   * @param {Number|String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  AMP.isAndroid = function(ver){
    if(ver){
      return ua.indexOf('android ' + ver) > -1;
    } else {
      return ua.indexOf('android') > -1;
    }
  };


  /* Device
  -----------------------------------------------------------------*/

  /**
   * <h4>デバイス判定</h4>
   *
   * @static
   * @method isDevice
   * @param {String} key デバイス名<br>
   * デバイス名 | 引数文字列 <br>
   * PC (for Desktop) | pc <br>
   * Smart Device | sd, smartdevice <br>
   * Smart Phone | sp, smartphone <br>
   * Tablet | tb, tablet <br>
   * iPhone | iphone <br>
   * iPad | ipad <br>
   * iPod | ipod <br>
   * Android Phone | androidPhone <br>
   * Android Tablet | androidTablet
   *
   * @return {Boolean}
   */
  AMP.isDevice = function(key){
    var k = key.toLowerCase();

    if(k === 'pc'){
      return AMP.isPC();

    } else if (k === 'sd' || k === 'smartdevice'){
      return AMP.isSmartDevice();

    } else if (k === 'sp' || k === 'smartphone'){
      return AMP.isSmartPhone();

    } else if (k === 'tb' || k === 'tablet'){
      return AMP.isTablet();

    } else if(k === 'iphone'){
      return AMP.isIPhone();

    } else if(k === 'ipad'){
      return AMP.isIPad();

    } else if(k === 'ipod'){
      return AMP.isIPod();

    } else if(k === 'android'){
      return AMP.isAndroidPhone();

    } else if(k === 'androidtablet'){
      return AMP.isAndroidTablet();
    }
  };


  /**
   * <h4>PC判定</h4>
   *
   * @static
   * @method isPC
   * @return {Boolean}
   */
  AMP.isPC = function(){
    return AMP.isOS('windows') || AMP.isOS('mac');
  };


  /**
   * <h4>スマートデバイス判定</h4>
   *
   * @static
   * @method isSmartDevice
   * @return {Boolean}
   */
  AMP.isSmartDevice = function(){
    return AMP.isOS('ios') || AMP.isOS('android');
  };


  /**
   * <h4>SmartPhone判定</h4>
   *
   * @static
   * @method isSmartPhone
   * @return {Boolean}
   */
  AMP.isSmartPhone = function(){
    return ua.indexOf('iphone') > -1 || AMP.isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * <h4>タブレット判定</h4>
   *
   * @static
   * @method isTablet
   * @return {Boolean}
   */
  AMP.isTablet = function(){
    return ua.indexOf('ipad') > -1 || AMP.isOS('android') && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>iPhone判定</h4>
   *
   * @static
   * @method isIPhone
   * @return {Boolean}
   */
  AMP.isIPhone = function(){
    return ua.indexOf('iphone') > -1;
  };


  /**
   * <h4>iPad判定</h4>
   *
   * @static
   * @method isIPad
   * @return {Boolean}
   */
  AMP.isIPad = function(){
    return ua.indexOf('ipad') > -1;
  };


  /**
   * <h4>iPod判定</h4>
   *
   * @static
   * @method isIPod
   * @return {Boolean}
   */
  AMP.isIPod = function(){
    return ua.indexOf('ipod') > -1;
  };


  /**
   * <h4>AndroidPhone判定</h4>
   *
   * @static
   * @method isAndroidPhone
   * @return {Boolean}
   */
  AMP.isAndroidPhone = function(){
    return AMP.isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * <h4>AndroidTablet判定</h4>
   *
   * @static
   * @method isAndroidTablet
   * @return {Boolean}
   */
  AMP.isAndroidTablet = function(){
    return AMP.isOS('android') && ua.indexOf('mobile') < 0;
  };



  /* Browser
  -----------------------------------------------------------------*/

  /**
   * <h4>ブラウザ判定</h4>
   *
   * @static
   * @method isBrowser
   * @param  {String} key ブラウザ名<br>
   * ブラウザ名 | 引数文字列 <br>
   * Microsoft Edge | edge <br>
   * Internet Explorer | ie <br>
   * Google Chrome | chrome <br>
   * Firefox | firefox <br>
   * Mac Safari (for Desktop) | safari <br>
   * Opera (for Desktop) | opera <br>
   * ios Safari | mobileSafari <br>
   * Android | android <br>
   * Webkit Browser | webkit
   *
   * @param  {String | Number} ver バージョン (ie, mobileSafari, android) 省略可
   * @param  {String} pun ie指定バージョン範囲 (prev, later) 省略可
   * @return {Boolean}
   */
  AMP.isBrowser = function(key, ver, pun){
    var k = key.toLowerCase();

    if(k === 'ie'){
      if(pun){
        return AMP.isIEScope(ver, pun);
      } else {
        return AMP.isIE(ver);
      }

    } else if(k === 'edge'){
      return AMP.isEdge(ver);

    } else if(k === 'chrome'){
      return AMP.isChrome();

    } else if(k === 'firefox'){
      return AMP.isFirefox();

    } else if(k === 'safari'){
      return AMP.isSafari();

    } else if(k === 'opera'){
      return AMP.isOpera();

    } else if(k === 'mobilesafari'){
      return AMP.isMobileSafari(ver);

    } else if(k === 'android'){
      return AMP.isAndroidBrowser(ver);

    } else if(k === 'webkit'){
      return AMP.isWebkit();
    }
  };


  /**
   * <h4>IE判定</h4>
   *
   * @static
   * @method isIE
   * @param  {Number}  ver バージョンナンバー 省略可
   * @return {Boolean}
   */
  AMP.isIE = function(ver){
    if(!ver){
      return ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1;
    } else {
      return ua.indexOf('msie ' + ver) > -1 || (ua.indexOf('trident') > -1 && ua.indexOf('rv:' + ver) > -1);
    }
  };


  /**
   * <h4>IEバージョン範囲判定</h4>
   *
   * @static
   * @method isIEScope
   * @param  {Number}  ver バージョンナンバー
   * @param  {String}  pun prev(以前), later(以降)
   * @return {Boolean}
   */
  AMP.isIEScope = function(ver, pun){
    var current, index;
    ver = Number(ver);

    // Legacy IE
    if(ua.indexOf('msie') > -1){
      index = ua.indexOf('msie ') + 5;

    // Modern IE
    } else if(ua.indexOf('trident') > -1){
      index = ua.indexOf('rv:') + 3;
    }

    if(0 < index){
      current = Number(ua.substring(index, index + 2));

      if(pun === 'later'){
        return current >= ver;
      } else {
        return current <= ver;
      }
    } else {
      return false;
    }
  };


  /**
   * <h4>Microsoft Edge判定</h4>
   *
   * @static
   * @method isEdge
   * @param  {Number|String}  ver バージョン名
   * @return {Boolean}
   */
  AMP.isEdge = function(ver){
    ver = ver || '';
    return ua.indexOf('edge/' + ver) > -1;
  };


  /**
   * <h4>PC版 Chrome判定</h4>
   *
   * @static
   * @method isChrome
   * @return {Boolean}
   */
  AMP.isChrome = function(){
    return ua.indexOf('chrome') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版 Firefox判定</h4>
   *
   * @static
   * @method isFirefox
   * @return {Boolean}
   */
  AMP.isFirefox = function(){
    return ua.indexOf('firefox') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版 Safari判定</h4>
   *
   * @static
   * @method isSafari
   * @return {Boolean}
   */
  AMP.isSafari = function(){
    return ua.indexOf('safari') > -1 && ua.indexOf('mobile') < 0 && !AMP.isChrome();
  };


  /**
   * <h4>PC版 Opera判定</h4>
   *
   * @static
   * @method isOpera
   * @return {Boolean}
   */
  AMP.isOpera = function(){
    return ua.indexOf(' opr/') > -1 || (ua.indexOf('opera/') > -1 && ua.indexOf('mobile') < 0);
  };


  /**
   * <h4>MobileSafari判定</h4>
   *
   * @static
   * @method isMobileSafari
   * @param {Number|String} ver バージョンナンバー  省略可
   * @return {Boolean}
   */
  AMP.isMobileSafari = function(ver){
    if(ver){
      return AMP.isIos(ver) && ua.indexOf('safari') > -1;
    } else {
      return AMP.isIos() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * <h4>AndroidBrowser判定</h4>
   *
   * @static
   * @method isAndroidBrowser
   * @param {Number|String} ver バージョンナンバー 省略可
   * @return {Boolean}
   */
  AMP.isAndroidBrowser = function(ver){
    if(ver){
      return AMP.isAndroid(ver) && ua.indexOf('safari') > -1;
    } else {
      return AMP.isAndroid() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * <h4>webkit ブラウザ判定</h4>
   *
   * @static
   * @method isWebkit
   * @return {Boolean}
   */
  AMP.isWebkit = function(){
    return ua.indexOf('webkit') > -1;
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    locationオブジェクト
  ======================================================================*/

  /**
   * <h4>locationオブジェクト</h4>
   * <p><a href="../../demo/AMP.Base.html#location">DEMO</a></p>
   *
   * @class AMP.Location
   */



  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var url = root.location;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>hashを取得し、配列にして返す</h4>
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  AMP.getHash = function(){
    var ary = url.hash.split('#').slice(1);
    if(ary.length){
      AMP.each(ary, function(item, i){
        ary[i] = '#' + item;
      });
    }
    return ary;
  };


  /**
   * <h4>リクエストパラメータ値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object}
   */
  AMP.queryHashMap = function(){
    var map = {},
    array = [],
    param = url.search.slice(1).split('&');

    if(param[0] !== ''){
      var i = 0,
      l = param.length;

      for(; i < l; i += 1){
        array = param[i].split('=');
        map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
      }
    }

    return map;
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    文字列
  ======================================================================*/

  /**
   * <h4>文字列</h4>
   * <p><a href="../../demo/AMP.Base.html#string">DEMO</a></p>
   *
   * @class AMP.String
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>id生成します</h4>
   * <p>文字列にナンバーを追加して返します</p>
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  AMP.createId = (function(){
    var _count = 0;

    return function(str){
      str = str ? str : 'cid';
      return str + (_count += 1);
    };
  }());


  /**
   * <h4>ランダムな4桁のコードを返す</h4>
   *
   * @static
   * @method digit
   * @return {String}
   */
  AMP.digit = function(){
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * <h4>json形式オブジェクトを文字列にして返す</h4>
   * FIXME: βver.
   *
   * @static
   * @method jsonToString
   * @param  {Object} obj オブジェクト
   * @return {String}
   */
  AMP.jsonToString = function(obj){
    var cache = [];
    return JSON.stringify(obj, function(key, value){
      if(typeof value === 'object' && value !== null){
        if(cache.indexOf(value) !== -1){
          return;
        }
        cache.push(value);
      }
      return value;
    }, '\t');
  };


  /**
   * <h4>空白文字の削除</h4>
   *
   * @static
   * @method removeSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  AMP.removeSpace = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>文字列の全置換</h4>
   * <p>対象の文字列と、削除文字列がマッチしたものを全置換します</p>
   *
   * @static
   * @method repraceAll
   * @param  {String} str 置換対象の文字列
   * @param  {String} del 削除する文字列
   * @param  {String} add 追加する文字列
   * @return {String}
   */
  AMP.repraceAll = function(str, del, add){
    add = add ? add : '';
    return str.split(del).join(add);
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String}
   */
  AMP.uuid = function(){
    var d = AMP.digit;
    return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
  };


  /**
   * <h4>xmlを文字列に変換して返す</h4>
   *
   * @static
   * @method xmlToString
   * @param  {XML Node} xmlNodeデータ
   * @return {String}
   */
  AMP.xmlToString = function(xml){
    if(AMP.hasXMLSerializer()){
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch(error){
        if(AMP.isDeveplop){
          console.log(error);
        }
      }
    }
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    ユーティリティ
  ======================================================================*/

  /**
   * <h4>ユーティリティ</h4>
   * <p><a href="../../demo/AMP.Base.html#utility">DEMO</a></p>
   *
   * @class AMP.Utility
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>匿名関数名を返す</h4>
   * <p>無名関数はundefinedを返します</p>
   *
   * @static
   * @method getFunctionName
   * @param  {Function} fn 名前を取得したい関数
   * @return {String}
   */
  AMP.getFunctionName = function(fn){
    if(AMP.isFunction(fn)){
      if(fn.className){
        return fn.className;

      } else if (fn.prototype.className) {
        return fn.prototype.className;

      } else if(fn.prototype.constructor && fn.prototype.constructor.name){
        return fn.prototype.constructor.name;

      } else {
        return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
      }

    } else {
      throw new TypeError(fn + ' is not a Function');
    }
  };


  /**
   * <h4>型名取得</h4>
   *
   * @method type
   * @param {Object} 判定するオブジェクト
   * @return {String} 型名を返す
   */
  AMP.type = function(obj){
    if(AMP.isArray(obj)){
      return 'array';

    } else if(AMP.isBoolean(obj)){
      return 'boolean';

    } else if(AMP.isFunction(obj)){
      return 'function';

    } else if(AMP.isNumber(obj)){
      return 'number';

    } else if(AMP.isObject(obj)){
      return 'object';

    } else if(AMP.isString(obj)){
      return 'string';

    } else if(AMP.isRegexp(obj)){
      return 'regexp';

    } else if(AMP.isNull(obj)){
      return 'null';

    } else {
      return 'undefined';
    }
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number} 画面のピクセル比を返す
   */
  AMP.pixelRatio = function(){
    return root.devicePixelRatio || 1;
  };


  /**
   * <h4>画像のプリロード</h4>
   *
   * @static
   * @method preload
   * @param {String} src 画像パス
   * @return {ImageElement} 生成した、イメージ要素
   */
  AMP.preload = function(src){
    var img = new Image();
    img.src = src;
    return img;
  };


  /**
   * <h4>RAF(requestAnimationFrame)をエクスポートしています</h4>
   * <p>RAFに対応していないブラウザは、setTimeoutでフォールバックします</p>
   * FIXME: contextの処理追加予定
   *
   * @static
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number}
   */
  AMP.requestAnimationFrame = (function(){
    var requestAnimation = (
      root.requestAnimationFrame ||
      root.webkitRequestAnimationFrame ||
      root.mozRequestAnimationFrame ||
      root.oRequestAnimationFrame ||
      function(callback){
        return root.setTimeout(callback, 1000 / 60);
      }
    );

    return function(callback){
      return requestAnimation(callback);
    };
  }());


  /**
   * <h4>CAF(cancelAnimationFrame)をエクスポートしています</h4>
   * <p>CAFに対応していないブラウザは、clearTimeoutでフォールバックします</p>
   *
   * @static
   * @method cancelAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number}
   */
  AMP.cancelAnimationFrame = (function(){
    var cancelAnimation = (
      root.cancelAnimationFrame ||
      root.webkitCancelAnimationFrame ||
      root.mozCancelAnimationFrame ||
      root.oCancelAnimationFrame ||
      function(id){
        root.clearTimeout(id);
      }
    );

    return function(id){
      return cancelAnimation(id);
    };
  }());


  /**
   * <h4>現在の時間を返します</h4>
   * <p>performance.nowメソッドをExportしています<br>
   * performanceに対応していないブラウザはgetTime(Date関数)を返します</p>
   *
   * @static
   * @method now
   * @return {Number}
   */
  AMP.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());


  /**
   * <h4>空の関数</h4>
   *
   * @static
   * @return {Void}
   */
  AMP.noop = function(){};


  /**
   * <h4>乱数の生成</h4>
   *
   * @param  {Number}  min     最小値 ※省略可
   * @param  {Number}  max     最大値 ※省略可
   * @param  {Boolean} isRound 四捨五入するか ※省略可
   * @return {Number} 乱数を返します
   */
  AMP.random = function(min, max, isRound){
    var random = Math.random(),
    value;

    if(arguments.length === 0 || AMP.isBoolean(min)){
      isRound = min;
      value = random;

    } else if(arguments.length === 1 || AMP.isBoolean(max)){
      isRound = max;
      value = random * min;

    } else {
      if (min > max) {
        var num = min;
        min = max;
        max = num;
      }
      value = random * (max - min) + min;
    }

    if(isRound){
      return Math.round(value);
    } else{
      return value;
    }
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    配列
  ======================================================================*/

  /**
   * <h4>配列</h4>
   * <p><a href="../../demo/AMP.Base.html#array">DEMO</a></p>
   *
   * @class AMP.Array
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>イテレート処理</h4>
   *
   * @static
   * @method each
   * @param  {Array|Object}   obj イテレーションを行うオブジェクト
   * @param  {Function} callback  イテレーション毎のコールバック関数
   * @return {Object} 第一引数に渡されたオブジェクト
   */
	AMP.each = function(obj, callback){
		var isContinue,
		i;

		if(AMP.isArray(obj)){
			var l = obj.length;
			i = 0;
			for(; i < l; i += 1){
				isContinue = callback.call(obj[i], obj[i], i);
				if(isContinue === false){
					break;
				}
			}

		} else {
			for(i in obj){
				isContinue = callback.call(obj[i], obj[i], i);
				if(isContinue === false){
					break;
				}
			}
		}

		return obj;
	};


  /**
   * <h4>argumentsを配列に変換</h4>
   * <p>スライス位置を指定して切り取り可能</p>
   *
   * @static
   * @method argsToArray
   * @param {arguments} args arguments
   * @param {Number} index スライスする切り取り開始位置
   * @param {Number} lastIndex スライスする切り取り終了位置
   * @type {Array}
   */
  AMP.argsToArray = (function(){
  	var slice = Array.prototype.slice;

  	return function(args, index, lastIndex){
  		index = index || 0;
  		lastIndex = lastIndex || args.length;
  		return slice.call(args, index, lastIndex);
  	};
  }());


  /**
   * <h4>配列をシャッフルして新しい配列を返す</h4>
   *
   * @method shuffle
   * @param  {Arrary} ary シャッフルする配列
   * @return {Arrary}
   */
  AMP.shuffle = function(ary){
    return ary.slice().sort(function(){
      return Math.random() - 0.5;
    });
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*======================================================================
    フォールバック
  ======================================================================*/

  /**
   * <h4>フォールバック</h4>
   *
   * @class Fallback
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /* window
  -----------------------------------------------------------------*/

  /**
   * <h4>consoleがなければ空の関数を返す</h4>
   *
   * @method console.log
   * @return {Void}
   */
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }


  /* Array
  -----------------------------------------------------------------*/

  /**
   * <h4>forEach</h4>
   * <p>配列の各要素に対して、指定された処理を実行します<br>
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています</p>
   *
   * @method Array.prototype.forEach
   * @type {Void}
   */
  Array.prototype.forEach = Array.prototype.forEach || function(callback, context){
    if(this === null){
      throw new TypeError(this + ' is null or not defined');
    }
    var i = 0, l = this.length;
    for(; i < l; i += 1){
      callback.call(context || null, this[i], i, this);
    }
  };


  /* Function
  -----------------------------------------------------------------*/

  /**
   * <h4>束縛された関数生成</h4>
   * FIXME: βver.
   *
   * @beta
   * @method Function.prototype.bind
   * @param  {Function} context this値としてターゲット関数に渡される値
   * @param  {Any} Argments 関数に渡す引数
   * @return {Function}
   */
  Function.prototype.bind = Function.prototype.bind || function(context){
    if (!AMP.isFunction(this)) {
      throw new TypeError(this + ' is not a callable');
    }

    var self = this,
    args = AMP.argsToArray(arguments, 1),
    F = function(){},
    B = function(){
      var ctx = this instanceof F ? this : context;
      return self.apply(ctx, args.concat(AMP.argsToArray(arguments)));
    };

    F.prototype = this.prototype;
    B.prototype = new F();
    return B;
  };


  /* Object
  -----------------------------------------------------------------*/

  /**
   * <h4>新しいオブジェクトの生成</h4>
   *
   * @static
   * @method Object.create
   * @param  {Object} obj オブジェクト
   * @return {Object}
   */
  Object.create = Object.create || function(obj){
    function Obj(){}
    Obj.prototype = obj;
    return new Obj();
  };


  /**
   * <h4>連想配列の要素数取得</h4>
   *
   * @static
   * @method Object.keys
   * @param  {Object} obj
   * @return {Void}
   */
  Object.keys =  Object.keys || function(obj){
    if(AMP.isObject(obj)){
      var placeHolder = {
        length: 0
      },
      prop;

      for(prop in obj){
        if(obj.hasOwnProperty(prop)){
          placeHolder.length += 1;
        }
      }
      return placeHolder;
    }
  };


  /* String
  -----------------------------------------------------------------*/

  /**
   * <h4>文字列の両端の空白削除</h4>
   *
   * @method String.prototype.trim
   * @return {String}
   */
  String.prototype.trim = String.prototype.trim || function(){
    return this.replace(/^\s+|\s+$/g, '');
  };


  /* DOM
  -----------------------------------------------------------------*/

  /**
   * <h4>ターゲットにイベントリスナーを登録</h4>
   *
   * @static
   * @method addEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.addEvent = function(element, type, listener){
    if(element.addEventListener){
      element.addEventListener(type, listener, false);
    } else {
      element.attachEvent('on' + type, listener);
    }
    return element;
  };


  /**
   * <h4>ターゲットからイベントリスナーを削除</h4>
   *
   * @static
   * @method removeEvent
   * @param  {DOM} element ターゲット要素
   * @param  {String} type イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.removeEvent = function(element, type, listener){
    if(element.addEventListener){
      element.removeEventListener(type, listener, false);
    } else {
      element.detachEvent('on' + type, listener);
    }
    return element;
  };


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>デバッグ機能を提供します</h4>
   * <p>!!!: シングルトン コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.debug</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.Debug.html">DEMO</a></p>
   *
   * @class AMP.Debug
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function Debug(){}

  // 基底クラスを継承
  AMP.inherits(Debug, AMP.BASE_CLASS);

  // prototype
  var p = Debug.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Debug.VERSION = '1.0.3';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>view要素を格納オブジェクト</h4>
   *
   * @static
   * @property views
   * @type {Object}
   */
  Debug.views = null;


  /**
   * <h4>viewの表示状態</h4>
   *
   * @static
   * @property isShow
   * @default true
   * @type {Boolean}
   */
  Debug.isShow = true;


  /**
   * <h4>ログ出力の有効・無効</h4>
   *
   * @static
   * @property isChangeLog
   * @default true
   * @type {Boolean}
   */
  Debug.isChangeLog = true;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>view要素を生成</h4>
   *
   * @private
   * @static
   * @method _createView
   * @return {Void}
   */
  Debug._createView = function(){
    // view要素生成
    var childNode = '<div style="min-width:250px;font-size:12px;background:#41454e;">\n<div style="padding:5px;line-height:12px;font-weight:bold;color:#f9f9f9;text-align:center;background:#272a32;">DEBUG</div>\n<textarea id="AMP_DEBUG_TEXT" style="box-sizing:border-box;width:100%;min-height:150px;padding:10px;font-family:consolas;color:#272a32;font-size:14px;line-height:1.5;border:5px solid #41454e;"></textarea>\n</div>';

    // view要素の追加
    var el = document.createElement('div');

    el.id = 'AMP_DEBUG';
    el.setAttribute('style', 'position:fixed;z-index:11111111;left:10px;bottom:10px;');
    el.innerHTML = childNode;
    document.body.appendChild(el);

    // controll elements
    Debug.views = {
      wrap: document.getElementById('AMP_DEBUG'),
      text: document.getElementById('AMP_DEBUG_TEXT')
    };

    // viewイベント追加
    Debug._addEvent();
  };


  /**
   * <h4>viewイベント設定</h4>
   *
   * @private
   * @static
   * @method _addEvent
   * @return {Void}
   */
  Debug._addEvent = function(){
    var isDrag = false,
    x = null,
    y = null;

    // down
    Debug.views.wrap.onmousedown  = function(){
      isDrag = true;
    };

    // move
    document.onmousemove = function(){
      if(isDrag){
        var _x = event.clientX;
        _y = event.clientY;

        if(AMP.isNumber(x)){
          var diffX = _x - x;
          var diffY = _y - y;
          x = _x;
          y = _y;

          var position = 'position:fixed;';
          position += 'top:' + (Debug.views.wrap.offsetTop + diffY) + 'px;';
          position += 'left:' + (Debug.views.wrap.offsetLeft + diffX) + 'px;';
          Debug.views.wrap.setAttribute('style', position);

          return false;

        } else {
          x = _x;
          y = _y;
        }
      }
    };

    // up
    document.onmouseup = function(){
      isDrag = false;
      x = null;
      y = null;
    };

    // cancel
    Debug.views.text.onmousemove = function(){
      isDrag = false;
    };
    Debug.views.wrap.onscroll = function(){
      return false;
    };
  };


  /**
   * <h4>ログを出力します</h4>
   *
   * @method log
   * @param {Any} args 出力するオブジェクト ※可変長引数可能
   * @return {Debug}
   */
  p.log = function(){
    if(!Debug.views){
      Debug._createView();
    }

    if(Debug.isChangeLog){
      AMP.each(AMP.argsToArray(arguments), function(data){
        // データタイプに合わせてログを出力
        if(AMP.isArray(data)){
          Debug.views.text.value += JSON.stringify(data) + '\n';
        } else if(AMP.isObject(data)){
          Debug.views.text.value += JSON.stringify(data, null, '\t') + '\n';
        } else {
          Debug.views.text.value += data + '\n';
        }
      });

      Debug.views.text.scrollTop = Debug.views.text.scrollHeight;
    }

    return this;
  };


  /**
   * <h4>ログのクリア</h4>
   *
   * @method clear
   * @return {Debug}
   */
  p.clear = function(){
    if(Debug.views){
      Debug.views.text.value = '';
    }
    return this;
  };


  /**
   * <h4>ログ出力を開始します</h4>
   *
   * @method start
   * @return {Debug}
   */
  p.start = function(){
    Debug.isChangeLog = true;
    return this;
  };


  /**
   * <h4>ログ出力を停止します</h4>
   *
   * @method stop
   * @return {Debug}
   */
  p.stop = function(){
    Debug.isChangeLog = false;
    return this;
  };


  /**
   * <h4>ログviewを非表示にします</h4>
   *
   * @method hide
   * @return {Debug}
   */
  p.hide = function(){
    if(Debug.views && Debug.isShow){
      var style = Debug.views.wrap.getAttribute('style') + 'display:none;';
      Debug.views.wrap.setAttribute('style', style);
      Debug.isShow = false;
    }
    return this;
  };


  /**
   * <h4>ログviewを表示します</h4>
   *
   * @method show
   * @return {Debug}
   */
  p.show = function(){
    if(Debug.views && !Debug.isShow){
      var style = Debug.views.wrap.getAttribute('style') + 'display:block;';
      Debug.views.wrap.setAttribute('style', style);
      Debug.isShow = true;
    }
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Debug = Debug;
  AMP.debug = new Debug();


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベント</h4>
   * <p>イベントクラスの継承して使用出来ます<br>
   * メディエーターとしても使用すことも可能です<br>
   * <a href="../../demo/AMP.Events.html">DEMO</a></p>
   *
   *
   * @class AMP.Events
   * @extends AMP.BASE_CLASS
   * @constructor
   * @example
   *   var events = new AMP.Events();
   *
   *   // on<br>
   *   events.on('change', function(){...});<br>
   *   events.on('change.type', typeCall);<br>
   *
   *   // off<br>
   *   events.off('change');<br>
   *   events.off('change', funcName);<br>
   *   events.off();<br>
   *
   *   // tigger<br>
   *   events.tigger('change');<br>
   *   events.tigger('change.type');
   */
  function Events(){
    /**
     * <h4>イベントリスナーを連想配列で格納します</h4>
     *
     * @private
     * @property _listeners
     * @type {Object}
     * @example
     *   _listeners = {
     *      attr    : eventObj.attr, <br>
     *      func    : listener, <br>
     *      context : context <br>
     *   }
     */
    this._listeners = {};
  }

  // 基底クラスを継承
  AMP.inherits(Events, AMP.BASE_CLASS);

  // prototype
  var p = Events.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Events.VERSION = '2.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Events';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベント登録</h4>
   * <p>イベント名に属性名を付与するも可能</p>
   *
   * @method on
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
   */
  p.on = function(type, listener, context){
    this._addEvent(type, listener, context);
    return this;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method onece
   * @param  {String} type イベントタイプ
   * @param  {Function} listener  イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
   */
  p.onece = function(type, listener, context){
    var self = this;

    self.on(type, function(){
      self.off(type);
      listener.apply(self, arguments);
    }, context);

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} type イベントタイプ
   * @param  {Function} listener  イベントリスナー
   * @return {Events}
   */
  p.off = function(type, listener){
    this._removeEvent(type, listener);
    return this;
  };


  /**
   * <h4>イベント追加</h4>
   *
   * @private
   * @method _addEvent
   * @param {String} type イベントタイプ
   * @param {Function} listener コールバック関数
   * @param {Object} context コンテキスト
   * @return {Void}
   */
  p._addEvent = function(type, listener, context){
    var self = this,
    events = type.split(' ');

    // listenerが関数かチェック
    if(AMP.isFunction(listener)){
      AMP.each(events, function(item){
        var eventObj = self._getEventNameMap(item);
        self._listeners[eventObj.type] = self._listeners[eventObj.type] || [];
        self._listeners[eventObj.type].push({
          attr   : eventObj.attr,
          func   : listener,
          context: context
        });
      });
    }
  };


  /**
   * <h4>イベント削除</h4>
   * FIXME: 内部処理最適化予定
   *
   * @private
   * @method _removeEvent
   * @param {String} type イベントタイプ
   * @param {Function} listener コールバック関数
   * @return {Void}
   */
  p._removeEvent = function(type, listener){
    var self = this,
    events = type ? type.split(' ') : [],
    ary = null,
    listeners;

    listener = AMP.getFunctionName(listener);

    AMP.each(events, function(event){
      var eventObj = self._getEventNameMap(event);

      // イベント属性指定がある場合
      if(eventObj && eventObj.attr && self._listeners[eventObj.type]){
        listeners = self._listeners[eventObj.type];

        AMP.each(listeners, function(item){
          if(item.attr !== eventObj.attr){
            if(listener){
              if(listener !== AMP.getFunctionName(item.func)){
                ary = ary || [];
                ary.push(item);
              }
            } else {
              ary = ary || [];
              ary.push(item);
            }
          }
        });

        self._listeners[eventObj.type] = ary;

      // イベントタイプ指定ある場合
      } else if(eventObj){
        if(listener){
          listeners = self._listeners[eventObj.type];

          AMP.each(listeners, function(item){
            if(listener !== AMP.getFunctionName(item.func)){
              ary = ary || [];
              ary.push(item);
            }
          });
        }
        self._listeners[eventObj.type] = ary;

      // イベント全て削除
      } else {
        self._listeners = null;
        self._listeners = {};
      }
    });
  };


  /**
   * <h4>イベント名、イベント属性を連想配列にして返す</h4>
   *
   * @private
   * @method _getEventNameMap
   * @param  {String} type イベントタイプ
   * @return {Object}
   */
  p._getEventNameMap = function(type){
    var events = type.split('.');
    return {
      type: events[0],
      attr: events[1]
    };
  };


  /**
   * <h4>登録イベントがあるか判定します</h4>
   *
   * @method hasEvent
   * @param  {String} type イベントタイプ
   * @return {Boolean}
   */
  p.hasEvent = function(type){
    var flag = false,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type];

    // イベントリスナーの有無
    if(listeners){
      // 属性指定がある場合
      if(events.attr){
        AMP.each(listeners, function(item){
          if(item.attr === events.attr){
            flag = true;
            return false;
          }
        });

      } else {
        flag = true;
      }
    }

    return flag;
  };


  /**
   * <h4>イベント発行</h4>
   * <p>第二引数以降に値を渡すとcallbackに引数として渡します</p>
   *
   * @method trigger
   * @param  {String} type イベントタイプ
   * @return {Events}
   */
  p.trigger = function(type){
    var self = this,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type],
    args = AMP.argsToArray(arguments, 1);

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          item.func.apply(item.context, args);
        }
      });
    }

    return self;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Events = Events;


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ストレージ操作</h4>
   * <p>セッションストレージもしくはローカルストレージを操作します<br>
   * デフォルトでは、セッションストレージを使用します<br>
   * <a href="../../demo/AMP.Storage.html">DEMO</a></p>
   *
   * @class AMP.Storage
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Boolean} isLocalStorage ローカルストレージ使用フラグ
   */
  function Storage(isLocalStorage){
    /**
     * <h4>ストレージタイプ</h4>
     *
     * @default sessionStorage
     * @property type
     * @type {String}
     */
    /**
     * <h4>ストレージを保管</h4>
     *
     * @private
     * @property _storage
     * @type {Object}
     */
    if(isLocalStorage){
      this.type     = 'localStorage';
      this._storage = localStorage;

    } else {
      this.type     = 'sessionStorage';
      this._storage = sessionStorage;
    }
  }

  // 基底クラスを継承
  AMP.inherits(Storage, AMP.BASE_CLASS);

  // prototype
  var p = Storage.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Storage.VERSION = '2.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Storage';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Storageインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param {Boolean} isLocalStorage ローカルストレージ使用フラグ
   * @return {Storage}
   */
  Storage.get = function(isLocalStorage){
    return new Storage(isLocalStorage);
  };


  /**
   * <h4>値のセット</h4>
   *
   * @method setItem
   * @param {String | Object} key セットするキー ※オブジェクトを渡すと、一括で値をセットします
   * @param {Any} val セットする値
   * @return {Storage}
   */
  p.setItem = function(key, val){
    var self = this;

    if(self._storage){
      if(AMP.isObject(key)){
        AMP.each(key, function(item, index){
          self._storage.setItem(index, item);
        });
      } else {
        self._storage.setItem(key, val);
      }
    }

    return self;
  };


  /**
   * <h4>ストレージデータの削除</h4>
   *
   * @method removeItem
   * @param  {String} key 削除するキー ※可変長引数可 ※省略時、ストレージデータを削除します
   * @return {Storage}
   */
  p.removeItem = function(key){
    var self = this;

    if(this._storage){
      if(AMP.isUndefined(key)){
        this._storage.clear();
      } else {
        AMP.each(AMP.argsToArray(arguments), function(item){
          self._storage.removeItem(item);
        });
      }
    }

    return this;
  };


  /**
   * <h4>ストレージアイテム数を返す</h4>
   *
   * @method getLength
   * @return {Number}
   */
  p.getLength = function(){
    return this._storage && this._storage.length;
  };


  /**
   * <h4>アイテムの取得</h4>
   *
   * @method getItem
   * @param  {String} key 取得するキー 省略時は、ストレージオブジェクトを返す
   * @return {Any}
   */
  p.getItem = function(key){
    if(this._storage){
      if(AMP.isUndefined(key)){
        if(this._storage.length){
          return this._storage;
        }
      } else {
        return this._storage.getItem(key);
      }
    }
  };


  /**
   * <h4>アイテムがあるか判定</h4>
   *
   * @method hasItem
   * @param  {String}  key 判定するキー
   * @return {Boolean}
   */
  p.hasItem = function(key){
    if(this._storage){
      return this._storage.getItem(key) !== null;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Storage = Storage;


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   * <p><a href="http://easings.net/ja" target="_blank">Easing一覧</a></p>
   *
   * @class AMP.Ease
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function Ease(){}

  // 基底クラスを継承
  AMP.inherits(Ease, AMP.BASE_CLASS);

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Ease.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Ease';


  /**
   * <h4>css3 Easing用ネームスペース</h4>
   * <p><a href="http://easings.net/ja" target="_blank">Easingサンプルサイト</a></p>
   *
   * @property css
   * @type {Object}
   */
  p.css = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  p.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property css._2_QUAD_IN
   * @type {String}
   */
  p.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  p.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  p.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  p.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  p.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property css._4_QUART_IN
   * @type {String}
   */
  p.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @property css._4_QUART_OUT
   * @type {String}
   */
  p.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  p.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property css._5_QUINT_IN
   * @type {String}
   */
  p.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  p.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  p.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property css._6_EXPO_IN
   * @type {String}
   */
  p.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  p.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  p.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @property css._7_CIRC_IN
   * @type {String}
   */
  p.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  p.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  p.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @property css._BACK_IN
   * @type {String}
   */
  p.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @property css._BACK_OUT
   * @type {String}
   */
  p.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  p.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property css._ELASTIC_IN
   * @type {String}
   */
  p.css._ELASTIC_IN = null;

  /**
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  p.css._ELASTIC_OUT = null;

  /**
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  p.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property css._BOUNCE_IN
   * @type {String}
   */
  p.css._BOUNCE_IN = null;

  /**
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  p.css._BOUNCE_OUT = null;

  /**
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  p.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;
  AMP.ease = new Ease();


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Vectorを管理します</h4>
   * <p>DEMO作成予定</p>
   *
   * @class AMP.Vector
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {Number|Object} x座標値もしくは、xyz座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   */
  function Vector(x, y, z){
    /// FIXME: 一旦仮
    this._angleMode = Vector.ANGLE_MODE_RADIANS;
    this.set(x, y, z);
  }

  // 基底クラスを継承
  AMP.inherits(Vector, AMP.BASE_CLASS);

  // prototype
  var p = Vector.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Vector.VERSION = '1.0.3';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Vector';


  /**
   * <h4>π (半円)</h4>
   *
   *
   * @property PI
   * @type {Number}
   */
  Vector.PI = Math.PI;


  /**
   * <h4>π * 2 (円)</h4>
   *
   * @property PI_TWO
   * @type {Number}
   */
  Vector.PI_TWO = Vector.PI * 2;


  /**
   * <h4>π * 2 (1/4円)</h4>
   *
   * @property PI_HARF
   * @type {Number}
   */
  Vector.PI_HARF = Vector.PI / 2;


  /**
   * <h4>アングルモード、ラジアンモードタイプ名</h4>
   *
   * @static
   * @property ANGLE_MODE_RADIANS
   * @type {String}
   */
  Vector.ANGLE_MODE_RADIANS = 'radians';


  /**
   * <h4>アングルモード、角度モードタイプ名</h4>
   *
   * @static
   * @property ANGLE_MODE_DEGREES
   * @type {String}
   */
  Vector.ANGLE_MODE_DEGREES = 'degrees';


  /**
   * <h4>アングルモード</h4>
   *
   * @private
   * @property _angleMode
   * @type {String}
   */
  p._angleMode = 'radians';


  /**
   * <h4>X座標</h4>
   *
   * @property x
   * @type {Number}
   */
  p.x = 0;


  /**
   * <h4>Y座標</h4>
   *
   * @property y
   * @type {Number}
   */
  p.y = 0;


  /**
   * <h4>Z座標</h4>
   *
   * @property z
   * @type {Number}
   */
  p.z = 0;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ラジアンを角度に変換して返す</h4>
   *
   * @static
   * @method radToDeg
   * @param  {Number} rad ラジアン
   * @return {Number}
   */
  Vector.radToDeg = function(rad){
    return 360 * rad / (2 * Vector.PI);
  };


  /**
   * <h4>角度をラジアンに変換して返す</h4>
   *
   * @static
   * @method degToRad
   * @param  {Number} deg 角度
   * @return {Number}
   */
  Vector.degToRad = function(deg){
    return 2 * Vector.PI * deg / 360;
  };


  /**
   * <h4>角度から2Dベクトルを作成</h4>
   *
   * @static
   * @method fromDeg
   * @param  {Number} deg 角度
   * @return {Vector}
   */
  Vector.fromDeg = function(deg){
    var radians = Vector.degToRad(deg);
    return Vector.get(Math.cos(radians), Math.sin(radians), 0);
  };


  /**
   * <h4>ランダムな2Dベクトルを作成</h4>
   *
   * @static
   * @method random2D
   * @return {Vector}
   */
  Vector.random2D = function(){
    return Vector.fromAngle(AMP.random(360));
  };


  /**
   * <h4>ランダムな3Dベクトルを作成</h4>
   *
   * @static
   * @method random3D
   * @return {Vector}
   */
  Vector.random3D = function(){
    var deg = AMP.random(0, Vector.PI_TWO),
    z = AMP.random(-1, 1),
    x = Math.sqrt(1 - z * z) * Math.cos(deg),
    y = Math.sqrt(1 - z * z) * Math.sin(deg);
    return Vector.get(x, y, z);
  };


  /**
   * <h4>2つのベクターデータの中間角度を返す</h4>
   *
   * @method degBetween
   * @param  {Vector} vector1 Vectorインスタンス
   * @param  {Vector} vector2 Vectorインスタンス
   * @return {Number}
   */
  Vector.degBetween = function(vector1, vector2){
    var radians = Math.acos(vector1.dot(vector2) / (vector1.mag() * vector2.mag()));
    return Vector.radToDeg(radians);
  };


  /**
   * <h4>Vectorインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {Number|Object} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  Vector.get = function(x, y, z){
    return new Vector(x, y, z);
  };


  /**
   * <h4>Vectorのcopyを生成します</h4>
   *
   * @method copy
   * @return {Vector}
   */
  p.copy = function(){
    return new Vector(this);
  };


  /**
   * <h4>アングルモードの設定</h4>
   *
   * @method setAngleMode
   * @param {String} type アングルモード名（radians or degrees）
   * @return {Vector}
   */
  p.setAngleMode = function(type){
    if(type === Vector.ANGLE_MODE_RADIANS){
      this._angleMode = Vector.ANGLE_MODE_RADIANS;
    } else if(type === Vector.ANGLE_MODE_DEGREES){
      this._angleMode = Vector.ANGLE_MODE_DEGREES;
    }
    return this;
  };


  /**
   * <h4>アングルモードの取得</h4>
   *
   * @method getAngleMode
   * @return {String} アングルモードを返す（radians or degrees）
   */
  p.getAngleMode = function(){
    return this._angleMode;
  };


  /**
   * <h4>座標のセット</h4>
   *
   * @method set
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.set = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    this.x = coord.x;
    this.y = coord.y;
    this.z = coord.z;
    return this;
  };


  /**
   * <h4>ベクトルの大きさの取得</h4>
   *
   * @method getMag
   * @return {Number} ベクトルの大きさを返す
   */
  p.getMag = function(){
    return Math.sqrt(this.getMagSqrt());
  };


  /**
   * <h4>座標3点の累乗積</h4>
   *
   * @method getMagSqrt
   * @return {Number}
   */
  p.getMagSqrt = function(){
    return this.x * this.x + this.y * this.y + this.z * this.z;
  };


  /**
   * <h4>座標の加算</h4>
   *
   * @method add
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.add = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    this.x += coord.x;
    this.y += coord.y;
    this.z += coord.z;
    return this;
  };


  /**
   * <h4>座標の減算</h4>
   *
   * @method sub
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.sub = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    this.x -= coord.x;
    this.y -= coord.y;
    this.z -= coord.z;
    return this;
  };


  /**
   * <h4>座標の乗算</h4>
   *
   * @method mult
   * @param  {Number} num 乗数
   * @return {Vector}
   */
  p.mult = function(num){
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  };


  /**
   * <h4>座標の除算</h4>
   *
   * @method div
   * @param  {Number} num 除数
   * @return {Vector}
   */
  p.div = function(num){
    this.x /= num;
    this.y /= num;
    this.z /= num;
    return this;
  };


  /**
   * <h4>ベクトルの大きさを返す</h4>
   *
   * @method mag
   * @param {Number} num ベクトルの大きさ
   * @return {Vector}
   */
  p.mag = function(){
    return Math.sqrt(this.magSqrt());
  };


  /**
   * <h4>ベクトル累乗積を返す</h4>
   *
   * @method magSqrt
   * @return {Number}
   */
  p.magSqrt = function(){
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
  };


  /**
   * <h4>ベクトルのドット積</h4>
   *
   * @method dot
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.dot = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    return this.x * coord.x + this.y * coord.y + this.z * coord.z;
  };


  /**
   * <h4>2つのベクトルのクロス積(3D)</h4>
   *
   * @method cross
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.cross = function(x, y, z){
    var coord = this._createCoord(x, y, z),
    _x = this.y * coord.z - this.z * coord.y,
    _y = this.z * coord.x - this.x * coord.z,
    _z = this.x * coord.y - this.y * coord.x;
    return new Vector(_x, _y, _z);
  };


  /**
   * <h4>2つのベクトル間のユーグリッド距離</h4>
   *
   * @method cross
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.dist = function(x, y, z){
    return new Vector(x, y, z).sub(this).mag();
  };


  /**
   * <h4>ベクトルの正規化</h4>
   *
   * @method normalize
   * @return {Vector}
   */
  p.normalize = function(){
    var mag = this.mag();
    if(mag !== 0){
      this.div(mag);
    }
    return this;
  };


  /**
   * <h4>限界値の制限</h4>
   *
   * @method limit
   * @param  {Number} max 限界値
   * @return {Vector}
   */
  p.limit = function(max){
    var magSqrt = this.magSqrt();
    if(max * max < magSqrt) {
      this.div(Math.sqrt(magSqrt));
      this.mult(max);
    }
    return this;
  };


  /**
   * <h4>ベクトルの大きさを設定</h4>
   *
   * @method setMag
   * @param {Number} num 乗数
   * @return {Vector}
   */
  p.setMag = function(num){
    this.normalize().mult(num);
    return this;
  };


  /**
   * <h4>角度で表される2Dベクトルの方向</h4>
   *
   * @method heading
   * @return {Number}
   */
  p.heading = function(){
    var h = Math.atan2(this.y, this.x);
    if(this._angleMode === Vector.RADIANS){
      return h;
    } else {
      return Vector.radToDeg(h);
    }
  };


  /**
   * <h4>指定した角度へ2Dベクトル回転</h4>
   *
   * @method rotate
   * @param  {Number} deg 回転する度数
   * @return {Vector}
   */
  p.rotate = function(deg) {
    if(this._angleMode === Vector.ANGLE_MODE_DEGREES) {
      deg = Vector.degToRad(deg);
    }

    var heading = this.heading() + deg,
    mag = this.mag();

    this.x = Math.cos(heading) * mag;
    this.y = Math.sin(heading) * mag;
    return this;
  };


  /**
   * <h4>別のベクトルに対する線形補間</h4>
   *
   * @method lerp
   * @param {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param {Number} y y座標値
   * @param {Number} z z座標値
   * @param {Number} amount 量
   *
   * @return {Vector}
   */
  p.lerp = function(x, y, z, amount){
    if(!AMP.isNumber(x)){
      var coord = this._createCoord(x);
      amount = y;
      x = coord.x;
      y = coord.y;
      z = coord.z;
    }

    this.x += (x - this.x) * amount || 0;
    this.y += (y - this.y) * amount || 0;
    this.z += (z - this.z) * amount || 0;
    return this;
  };


  /**
   * <h4>座標を配列にして返す</h4>
   *
   * @method toArray
   * @return {Array}
   */
  p.toArray = function(){
    return [this.x, this.y, this.z];
  };


  /**
   * <h4>座標オブジェクトを返します</h4>
   *
   * @method toJSON
   * @return {Object}
   */
  p.toJSON = function(){
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  };


  /**
   * <h4>座標が等しいか判定します</h4>
   *
   * @method isEquals
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Boolean}
   */
  p.isEquals = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    return this.x === coord.x && this.y === coord.y && this.z === coord.z;
  };


  /**
   * <h4>座標オブジェクトを生成</h4>
   *
   * @private
   * @method _createCoord
   * @param  {Number|Object} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Object}   x,y,z座標を格納したオブジェクト
   */
  p._createCoord = function(x, y, z){
    if(AMP.isObject(x)){
      return x;
    } else if(AMP.isArray(x)){
      return {
        x: x[0] || 0,
        y: x[1] || 0,
        z: x[2] || 0
      };
    } else {
      return {
        x: x || 0,
        y: y || 0,
        z: z || 0
      };
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Vector = Vector;


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>フォントリサイズイベント</h4>
   * <p>!!!: シングルトン コンストラクタを呼び出しで使用しません<br>
   * <em>AMP.fontResize</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.FontResize.html">DEMO</a></p>
   *
   * @class AMP.FontResize
   * @extends AMP.Events
   * @constructor
   */
  function FontResize(){
    /**
     * <h4>要素を監視有効・無効の判定フラグ</h4>
     *
     * @property isFontResize
     * @default true
     * @type {Boolean}
     */
    this.isFontResize = true;

    /**
     * <h4>監視する要素</h4>
     *
     * @property elm
     * @type {DOM}
     */
    this.elm = null;

    /**
     * <h4>監視要素の高さ</h4>
     *
     * @property height
     * @type {Number}
     */
    this.height = null;

    // superClass constructor call
    FontResize.Events_constructor.call(this);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(FontResize, AMP.Events);

  // prototype
  var p = FontResize.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  FontResize.VERSION = '3.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'FontResize';


  /**
   * <h4>フォントサイズ変更時の発行するイベントタイプ</h4>
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  FontResize.eventType = 'change';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>監視するフォント要素生成</h4>
   *
   * @private
   * @method _createElement
   * @return {Void}
   */
  p._createElement = function(){

    var key = 'AMP_FONT_RESIZE',
    elm = document.createElement('ins'),
    text = document.createTextNode(key);

    elm.id = key;
    elm.setAttribute('style', 'display:block;visibility:hidden;position:absolute;top:0;left:0;zIndex:-1;');
    elm.appendChild(text);
    document.body.appendChild(elm);

    // property
    this.elm = document.getElementById(key);
    this.height = this.elm.clientHeight;

    // set controller
    this._controller();
  };


  /**
   * <h4>イベントコントローラー</h4>
   * <p>状態を監視し、フォトサイズに変更があればイベントを発行します</p>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    height = self.elm.clientHeight;

    if(self.isFontResize){
      // フォントサイズに変更があれば
      if(self.height !== height){
        self.height = height;
        this.trigger(FontResize.eventType);
      }

      // 再起処理
      if(AMP.hasRAF()){
        AMP.requestAnimationFrame(function(){
          self._controller();
        });
      } else {
        setTimeout(function(){
          self._controller();
        }, 50);
      }
    }
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
   */
  p.on = function(type, listener, context){
    // 監視要素がない場合、要素を追加する
    if(!this.elm){
      this._createElement();
    }
    this._addEvent(type, listener, context);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.FontResize = FontResize;
  AMP.fontResize = new FontResize();


}(window, AMP));


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Mediaqueryのブレイクポイントイベント</h4>
   * <p>!!!: 対象の要素(head)にcssでフォントファミリーを指定してください<br>
   * シングルトン: コンストラクタを呼び出しで使用しません<br>
   * <em>AMP.mediaquery</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.Mediaquery.html">DEMO</a></p>
   *
   * @class AMP.Mediaquery
   * @extends AMP.Events
   * @constructor
   * @param {DOM} elm 監視対象要素
   */
  function Mediaquery(elm){
    /**
     * <h4>スタイルを監視する要素</h4>
     *
     * @property elm
     * @default head
     * @type {DOM}
     */
    if(elm && elm.nodeType === 1){
      this.elm = elm;
    } else {
      this.elm = document.getElementsByTagName('head')[0];
    }

    /**
     * <h4>要素を監視しているか</h4>
     *
     * @property isObserver
     * @default false
     * @type {Boolean}
     */
    this.isObserver = false;

    /**
     * <h4>要素の現在のスタイルを保管します</h4>
     *
     * @property mediaStyle
     * @type {String}
     */
    this.mediaStyle = null;

    // superClass constructor call
    Mediaquery.Events_constructor.call(this);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Mediaquery, AMP.Events);

  // prototype
  var p = Mediaquery.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Mediaquery.VERSION = '2.0.3';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Mediaquery';


  /**
   * <h4>フォントサイズ変更時の発行するイベントタイプ</h4>
   * FIXME: イベント属性追加予定
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  Mediaquery.eventType = 'change';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベントコントローラー</h4>
   * <p>状態を監視し、フォトサイズに変更があればイベントを発行します</p>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this;

    // set property
    this.isObserver = true;
    this.mediaStyle = this.getStyle();

    // event
    AMP.addEvent(root, 'resize', function(){
      if(self.mediaStyle !== self.getStyle()){
        self.mediaStyle = self.getStyle();
        self.trigger(Mediaquery.eventType);
      }
    });
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
   */
  p.on = function(type, listener, context){
    if(!this.isObserver){
      this._controller();
    }
    this._addEvent(type, listener, context);
    return this;
  };


  /**
   * <h4>イベント発行</h4>
   * <p>第二引数以降に値を渡すとcallbackに引数として渡します</p>
   *
   * @method trigger
   * @param  {String} type イベントタイプ
   * @return {Events}
   */
  p.trigger = function(type){
    var self = this,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type],
    args = AMP.argsToArray(arguments, 1);

    args.unshift({mediaStyle: self.mediaStyle, eventType: type});

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          // item.func.call(item.context, {mediaStyle: self.mediaStyle});
          item.func.apply(item.context, args);
        }
      });
    }
    return self;
  };


  /**
   * <h4>要素のスタイルを返します</h4>
   *
   * @method getStyle
   * @return {String}
   */
  p.getStyle = function(){
    if(root.getComputedStyle){
      return getComputedStyle(this.elm).getPropertyValue('font-family');
    } else {
      // !!!: jshintのチェックを緩和します
      /* jshint -W069 */
      return this.elm.currentStyle['fontFamily'];
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Mediaquery = Mediaquery;
  AMP.mediaquery = new Mediaquery();


}(window, AMP));
