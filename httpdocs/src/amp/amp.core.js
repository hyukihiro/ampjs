/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
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


;(function(root){

  // 'use strict';


  /*======================================================================
    AMP基本設定
  ======================================================================*/

  // クラス基本設定
  var
  CLASS_NAME = 'AMP',
  VERSION    = '3.0';



  /*--------------------------------------------------------------------------
    config
  --------------------------------------------------------------------------*/

  // consoleがなければ空の関数を返す
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>AMP</h4>
   *
   * @class AMP
   * @constructor
   **/
  function AMP(className){
    if(typeof className === 'string'){
      this._name = className;
    }
  }



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
  AMP.VERSION = VERSION;


  /**
   * <h4>コンストラクタ名</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  AMP.prototype._name = CLASS_NAME;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>ClassをExtendします</h4>
   *
   * @static
   * @method extend
   * @param {Object|Function} protoProp プロトタイプオブジェクト、もしくはsubClass
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  // AMP.extend = amp._extend;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  AMP.prototype.toString = function(){
    return '[object ' + this._name + ']';
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  /**
   * <h4>amp</h4>
   *
   * @module amp
   **/
  root.amp = new AMP();
  root.amp.AMP = AMP;



}(window));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    配列処理
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>each処理を行います</h4>
   *
   * @method each
   * @param  {Object}   obj      イテレーションを行うオブジェクト
   * @param  {Function} callback イテレーション毎のコールバック関数
   * @return {Object} 第一引数に渡されたオブジェクト
   */
	amp.each = function(obj, callback){
		var isContinue,
		i;

		if(amp.isArray(obj)){
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


	/*
	matchArray(array, args or list){
	};
	*/


	/*
	diffArray(array, args or list){
	}
	*/


}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    基本ユーティリティ
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>オブジェクトの拡張</h4>
   *
   * @method extend
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  amp.extend = function(){
    var isDeep, count, extendObject, length, obj, key, data, copy, isArray, clone;

    length = arguments.length;
    isDeep = amp.isBoolean(arguments[0]) && arguments[0];

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
        if(obj.hasOwnProperty(key)){
          data = extendObject[key];
          copy = obj[key];

          // マージデータが同じなら次のループへ
          if(extendObject === copy){
            continue;
          }

          isArray = amp.isArray(copy);

          if(isDeep && copy && amp.isObject(copy) || isArray){
            if(isArray){
              clone = data && amp.isArray(data) ? data : [];
            } else {
              clone = data && amp.isObject(data) ? data : {};
            }

            // ネスト構造を再帰処理
            extendObject[key] = amp.extend(isDeep, clone, copy);

          } else if (copy !== undefined){
            extendObject[key] = copy;
          }
        }
      }
    }

    return extendObject;
  };


  /**
   * <h4>ClassをExtendします</h4>
   * ClassにextendメソッドをExportして使います
   *
   * @protected
   * @static
   * @method _extend
   * @param {Class} childClass 子クラス
   * @return {Extend Class}
   */
  // amp.AMPにextendメソッドをExportします
  amp._extend = amp.AMP.extend = function(childClass){
    var parent = this,
    parentProto = parent.prototype,
    publicProp = childClass.prototype,
    childConstructor = publicProp.constructor,
    extendClass,
    Substitute;

    // mixin
    Substitute = function(){
      this.constructor = childConstructor;
      // amp.extend(this.constructor, parentProto.constructor, childConstructor);
    };
    Substitute.prototype = parentProto;

    // extendClass
    extendClass           = childConstructor;
    extendClass.prototype = amp.extend(true, new Substitute(), publicProp);
    extendClass.__super__ = parentProto;

    return extendClass;
  };


  /**
   * 後日追加予定
   * [extendClass description]
   * @return {[type]} [description]
   */
  /*
  amp.extendClass = function(){
    var extendClass = function(){};
    extendClass.extend =
    var i = 0,
    l = arguments.length -1;

    for(; i < l; i += 1){
      arguments[i].extend = amp._extend;
      extendClass = arguments[i].extend(arguments[i+1]);
    }
    return extendClass;
  };
  */


  /**
   * <h4>AMPクラスの継承したクラスを生成します</h4>
   * AMPクラスの継承 + amp._extend機能を実装しています
   *
   * @method createClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Extend Class}
   */
  amp.createClass = function(childClass, version){
    childClass.prototype._name = amp.getFunctionName(childClass);
    childClass.VERSION = version || '1.0';
    childClass.extend = amp._extend;
    return amp.AMP.extend(childClass);
  };


  /**
   * <h4>ampネームスペースにクラスを追加</h4>
   *
   * @method exportClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Export Class}
   */
  amp.exportClass = function(childClass, version){
    var exportClass = amp.createClass(childClass, version);
    amp[amp.getFunctionName(exportClass)] = exportClass;
    return exportClass;
  };


}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    ブラウザ対応していない機能をフォールバックします
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>forEach</h4>
   * 配列の各要素に対して、指定された処理を実行します
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @static
   * @method Array.forEach
   * @type {Void}
   */
  Array.prototype.forEach = Array.prototype.forEach || function(callback, context){
    if(this === null){
      throw new TypeError('this is null or not defined');
    }
    var i = 0, l = this.length;
    for(; i < l; i += 1){
      callback.call(context || null, this[i], i, this);
    }
  };


  /**
   * <h4>連想配列の要素数取得</h4>
   * Object.keys未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @method Object.keys
   * @param  {Object} obj
   * @return {Void}
   */
  Object.keys =  Object.keys || function(obj){
    if(amp.isObject(obj)){
      var size = 0,
      prop;
      for(prop in obj){
        if(obj.hasOwnProperty(prop) && prop !== 'length'){
          size += 1;
        }
      }
      obj.length = size;
    }
  };



}(window));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    ブラウザ機能を判定
  ======================================================================*/


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
   * <h4>applicationCache機能の有無</h4>
   *
   * @static
   * @method hasAppCache
   * @return {Boolean}
   */
  amp.hasAppCache = function(){
    return 'applicationCache' in root;
  };


  /**
   * <h4>Geolocation機能の有無</h4>
   *
   * @static
   * @method hasGeolocation
   * @return {Boolean}
   */
  amp.hasGeolocation = function(){
    return 'geolocation' in navigator;
  };


  /**
   * <h4>pushState機能の有無</h4>
   *
   * @static
   * @method hasPushState
   * @return {Boolean}
   */
  amp.hasPushState = function(){
    return 'pushState' in root.history;
  };


  /**
   * <h4>RequestAnimationFrame機能の有無</h4>
   *
   * @static
   * @method hasReqAnime
   * @return {Boolean}
   */
  amp.hasReqAnime = function(){
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
  amp.hasStorage = function(){
    return 'sessionStorage' in root && 'localStorage' in root;
  };


  /**
   * <h4>WebSocket機能の有無</h4>
   *
   * @static
   * @method hasWebSocket
   * @return {Boolean}
   */
  amp.hasWebSocket = function(){
    return 'WebSocket' in root;
  };


  /**
   * <h4>WebWorker機能の有無</h4>
   *
   * @static
   * @method hasWebWorker
   * @return {Boolean}
   */
  amp.hasWebWorker = function(){
    return 'Worker' in root;
  };


  /**
   * <h4>audio機能の有無</h4>
   *
   * @static
   * @method hasAudio
   * @return {Boolean}
   */
  amp.hasAudio = function(){
    // hack for ietester
    if(amp.isBrowser('ie', 9)){
      return true;
    } else {
      return !!doc.createElement('audio').canPlayType;
    }
  };


  /**
   * <h4>canvas機能の有無</h4>
   *
   * @static
   * @method hasCanvas
   * @return {Boolean}
   */
  amp.hasCanvas = function(){
    return !!doc.createElement('canvas').getContext;
  };

  /**
   * <h4>hashの有無</h4>
   *
   * @static
   * @method hasHash
   * @param {String} key ハッシュ名 省略可
   * @return {Boolean}
   */
  amp.hasHash = function(key){
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
   * @method isMsPointer
   * @return {Boolean}
   */
  amp.hasMsPointer = function(){
    return root.navigator.msPointerEnabled > -1;
  };


  /**
   * <h4>SVG機能の有無</h4>
   *
   * @static
   * @method hasSVG
   * @return {Boolean}
   */
  amp.hasSVG = function(){
    return 'SVGAngle' in root;
  };


  /**
   * <h4>TouchScreen判定</h4>
   *
   * @static
   * @method hasTouchScreen
   * @return {Boolean}
   */
  amp.hasTouchScreen = (function(){
    var hasTouchScreen,
    div = doc.createElement('div');

    div.setAttribute('ontouchstart', 'return');
    hasTouchScreen = (typeof div.ontouchstart === 'function');
    return function(){
      return hasTouchScreen;
    };
  }());


  /**
   * <h4>video機能の有無</h4>
   *
   * @static
   * @method hasVideo
   * @return {Boolean}
   */
  amp.hasVideo = function(){
    // hack for ietester
    if(amp.isBrowser('ie', 9)){
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
  amp.hasXMLSerializer = function(){
    return 'XMLSerializer' in root;
  };


  /**
   * <h4>css3 transition機能の有無</h4>
   *
   * @static
   * @method hasTransition
   * @return {Boolean}
   */
  amp.hasTransition = function(){
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



}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    オブジェクト,ブラウザを判定します
  ======================================================================*/


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var
  ua       = navigator.userAgent.toLowerCase(),
  toString = Object.prototype.toString;



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>developモード</h4>
   * developモードは、エラー時コンソールログを出力します
   *
   * @static
   * @property isDevelop
   * @type {Boolean}
   */
  amp.isDevelop = false;



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
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isArray = Array.isArray || function(obj){
    return toString.call(obj) === '[object Array]';
  };


  /**
   * <h4>真偽型判定</h4>
   *
   * @static
   * @method isBoolean
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isBoolean = function(obj){
    return toString.call(obj) === '[object Boolean]';
  };


  /**
   * <h4>関数型判定</h4>
   *
   * @static
   * @method isFunction
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isFunction = function(obj){
    return toString.call(obj) === '[object Function]';
  };


  /**
   * <h4>数値型判定</h4>
   *
   * @static
   * @method isNumber
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isNumber = function(obj){
    return toString.call(obj) === '[object Number]';
  };


  /**
   * <h4>オブジェクト型判定</h4>
   * プレーンオブジェクト
   *
   * @static
   * @method isObject
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isObject = function(obj){
    return !!obj && toString.call(obj) === '[object Object]';
  };


  /**
   * <h4>文字列型判定</h4>
   *
   * @static
   * @method isString
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isString = function(obj){
    return toString.call(obj) === '[object String]';
  };


  /* OS
  -----------------------------------------------------------------*/

  /**
   * <h4>OS判定<h4>
   *
   * @static
   * @method isOS
   * @param  {String} key OS名 (windows, windowsPhone, mac, ios, android)
   * @param  {String | Number} ver バージョンナンバー Android ios のみ有効
   * @return {Boolean}
   */
  amp.isOS = function(key, ver){
    var k = key.toLowerCase();

    if(k.indexOf('windows') > -1){
      return amp.isWindows();

    } else if(k.indexOf('windowsphone') > -1){
      return amp.isWindowsPhone();

    }  else if(k.indexOf('mac') > -1){
      return amp.isMac();

    } else if(k.indexOf('ios') > -1){
      return amp.isIos(ver);

    } else if(k.indexOf('android') > -1){
      return amp.isAndroid(ver);
    }
  };


  /**
   * <h4>Windows判定</h4>
   *
   * @static
   * @method isWindows
   * @return {Boolean}
   */
  amp.isWindows = function(){
    return ua.indexOf('windows') > -1;
  };


  /**
   * <h4>WindowsPhone判定 βver</h4>
   *
   * @static
   * @method isWindowsPhone
   * @return {Boolean}
   */
  amp.isWindowsPhone = function(){
    return ua.indexOf('windows phone') > -1;
  };


  /**
   * <h4>Mac判定</h4>
   * isoは、含みません。
   *
   * @static
   * @method isMac
   * @return {Boolean}
   */
  amp.isMac = function(){
    return ua.indexOf('mac os') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>ios判定</h4>
   *
   * @static
   * @method isIos
   * @param {Number | String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  amp.isIos = function(ver){
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
   * @param {Number | String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  amp.isAndroid = function(ver){
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
   * @param {String} デバイス名
   * (pc, sd, smartdevice, sp, smartphone, tb, tablet, iphone, ipad, ipod, androidphone, androidtablet)
   * @return {Boolean}
   */
  amp.isDevice = function(key){
    var k = key.toLowerCase();

    if(k === 'pc'){
      return amp.isPC();

    } else if (k === 'sd' || k === 'smartdevice'){
      return amp.isSmartDevice();

    } else if (k === 'sp' || k === 'smartphone'){
      return amp.isSmartPhone();

    } else if (k === 'tb' || k === 'tablet'){
      return amp.isTablet();

    } else if(k === 'iphone'){
      return amp.isIPhone();

    } else if(k === 'ipad'){
      return amp.isIPad();

    } else if(k === 'ipod'){
      return amp.isIPod();

    } else if(k === 'android'){
      return amp.isAndroidPhone();

    } else if(k === 'androidtablet'){
      return amp.isAndroidTablet();
    }
  };


  /**
   * <h4>PC判定</h4>
   *
   * @static
   * @method isPC
   * @return {Boolean}
   */
  amp.isPC = function(){
    return amp.isOS('windows') || amp.isOS('mac');
  };


  /**
   * <h4>SmartDevice判定</h4>
   *
   * @static
   * @method isSmartDevice
   * @return {Boolean}
   */
  amp.isSmartDevice = function(){
    return amp.isOS('ios') || amp.isOS('android');
  };


  /**
   * <h4>SmartPhone判定</h4>
   *
   * @static
   * @method isSmartPhone
   * @return {Boolean}
   */
  amp.isSmartPhone = function(){
    return ua.indexOf('iphone') > -1 || amp.isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * <h4>Tablet判定</h4>
   *
   * @static
   * @method isTablet
   * @return {Boolean}
   */
  amp.isTablet = function(){
    return ua.indexOf('ipad') > -1 || amp.isOS('android') && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>iPhone判定</h4>
   *
   * @static
   * @method isIPhone
   * @return {Boolean}
   */
  amp.isIPhone = function(){
    return ua.indexOf('iphone') > -1;
  };


  /**
   * <h4>iPad判定</h4>
   *
   * @static
   * @method isIPad
   * @return {Boolean}
   */
  amp.isIPad = function(){
    return ua.indexOf('ipad') > -1;
  };


  /**
   * <h4>iPod判定</h4>
   *
   * @static
   * @method isIPod
   * @return {Boolean}
   */
  amp.isIPod = function(){
    return ua.indexOf('ipod') > -1;
  };


  /**
   * <h4>Android判定</h4>
   *
   * @static
   * @method isAndroidPhone
   * @return {Boolean}
   */
  amp.isAndroidPhone = function(){
    return amp.isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * <h4>AndroidTablet判定</h4>
   *
   * @static
   * @method isAndroidTablet
   * @return {Boolean}
   */
  amp.isAndroidTablet = function(){
    return amp.isOS('android') && ua.indexOf('mobile') < 0;
  };



  /* Browser
  -----------------------------------------------------------------*/

  /**
   * <h4>ブラウザ判定</h4>
   *
   * @static
   * @method isBrowser
   * @param  {String} key ブラウザ名
   * (ie, chrome, safari, firefox, opera, mobileSafari, android, webkit)
   * @param  {String | Number} ver バージョン (ie, mobileSafari, android) 省略可
   * @param  {String} pun ie指定バージョン範囲 (prev, later) 省略可
   * @return {Boolean}
   */
  amp.isBrowser = function(key, ver, pun){
    var k = key.toLowerCase();

    if(k === 'ie'){
      if(pun){
        return amp.isIEScope(ver, pun);
      } else {
        return amp.isIE(ver);
      }

    } else if(k === 'chrome'){
      return amp.isChrome();

    } else if(k === 'firefox'){
      return amp.isFirefox();

    } else if(k === 'safari'){
      return amp.isSafari();

    } else if(k === 'opera'){
      return amp.isOpera();

    } else if(k === 'mobilesafari'){
      return amp.isMobileSafari(ver);

    } else if(k === 'android'){
      return amp.isAndroidBrowser(ver);

    } else if(k === 'webkit'){
      return amp.isWebkit();
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
  amp.isIE = function(ver){
    if(!ver){
      return ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1;
    } else {
      return ua.indexOf('msie ' + ver) > -1 || (ua.indexOf('trident') > -1 && ua.indexOf('rv:' + ver) > -1);
    }
  };


  /**
   * <h4>IEのバージョン範囲判定</h4>
   *
   * @static
   * @method isIEScope
   * @param  {Number}  ver バージョンナンバー
   * @param  {String}  pun 以前・以降 (prev, later)
   * @return {Boolean}
   */
  amp.isIEScope = function(ver, pun){
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
   * <h4>PC版chrome判定</h4>
   *
   * @static
   * @method isChrome
   * @return {Boolean}
   */
  amp.isChrome = function(){
    return ua.indexOf('chrome') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版Firefox判定</h4>
   *
   * @static
   * @method isFirefox
   * @return {Boolean}
   */
  amp.isFirefox = function(){
    return ua.indexOf('firefox') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版Safari判定</h4>
   *
   * @static
   * @method isSafari
   * @return {Boolean}
   */
  amp.isSafari = function(){
    return ua.indexOf('safari') > -1 && ua.indexOf('mobile') < 0 && !amp.isChrome();
  };


  /**
   * <h4>PC版Opera判定</h4>
   *
   * @static
   * @method isOpera
   * @return {Boolean}
   */
  amp.isOpera = function(){
    return ua.indexOf(' opr/') > -1 || (ua.indexOf('opera/') > -1 && ua.indexOf('mobile') < 0);
  };


  /**
   * <h4>MobileSafari判定</h4>
   *
   * @static
   * @method isMobileSafari
   * @param {Number | String} ver バージョンナンバー  省略可
   * @return {Boolean}
   */
  amp.isMobileSafari = function(ver){
    if(ver){
      return amp.isIos(ver) && ua.indexOf('safari') > -1;
    } else {
      return amp.isIos() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * <h4>Android Browser判定</h4>
   *
   * @static
   * @method isAndroidBrowser
   * @param {Number | String} ver バージョンナンバー 省略可
   * @return {Boolean}
   */
  amp.isAndroidBrowser = function(ver){
    if(ver){
      return amp.isAndroid(ver) && ua.indexOf('safari') > -1;
    } else {
      return amp.isAndroid() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * <h4>webkit ブラウザ判定</h4>
   *
   * @static
   * @method isWebkit
   * @return {Boolean}
   */
  amp.isWebkit = function(){
    return ua.indexOf('webkit') > -1;
  };



}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    locationオブジェクトを扱います
  ======================================================================*/


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var url = root.location;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>hashの取得し、#を省いた文字列を配列に格納して返す</h4>
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  amp.getHash = function(){
    if(url.hash.length){
      return url.hash.split('#').slice(1);
    }
  };


  /**
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object}
   */
  amp.queryHashMap = function(){
    var map,
    array = [],
    param = url.search.slice(1).split('&');

    if(param[0] !== ''){
      var i = 0,
      l = param.length;

      map = {};

      for(; i < l; i += 1){
        array = param[i].split('=');
        map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
      }
    }

    return map;
  };



}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    文字列を扱います
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>id生成</h4>
   * 文字列にナンバーを追加して返します
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  amp.createId = (function(){
    var count = 0;

    return function(str){
      str = str ? str : 'cid';
      return str + (count += 1);
    };
  }());


  /**
   * <h4>ランダムな4桁のコードを返す</h4>
   *
   * @static
   * @method digit
   * @return {String}
   */
  amp.digit = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * <h4>空白文字を削除して返す</h4>
   *
   * @method replaceSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  amp.replaceSpace = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String}
   */
  amp.uuid = function(){
    var d = amp.digit;
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
  amp.xmlToString = function(xml){
    if(amp.hasXMLSerializer()){
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch(error){
        if(amp.isDeveplop){
          console.log(error);
        }
      }
    }
  };



}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*======================================================================
    基本ユーティリティ
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>関数名を返す</h4>
   *
   * @method getFunctionName
   * @param  {Function} fn 名前を取得したい関数
   * @return {String}
   */
  amp.getFunctionName = function(fn){
    if('name' in fn){
      return fn.name;
    } else {
      return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    }
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number}
   */
  amp.pixelRatio = function(){
    return root.devicePixelRatio || 1;
  };


  /**
   * <h4>画像のプリロード</h4>
   *
   * @static
   * @method preload
   * @param {String} src 画像パス
   * @return {Image} 生成した、イメージオブジェクト
   */
  amp.preload = function(src){
    var img = new Image();
    img.src = src;
    return img;
  };


  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
   *
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number}
   */
  amp.requestAnimationFrame = (function(){
    var requestAnimation = (
      root.requestAnimationFrame ||
      root.webkitRequestAnimationFrame ||
      root.mozRequestAnimationFrame ||
      root.oRequestAnimationFrame ||
      function(callback){
        return root.setTimeout(callback, 1000 / 60);
      }
    );

    // contextの処理追加予定
    return function(callback){
      return requestAnimation(callback);
    };
  }());


  /**
   * <h4>cancelAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、clearTimeoutでフォールバックします
   *
   * @method cancelAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number}
   */
  amp.cancelAnimationFrame = (function(){
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
   * performance.nowメソッドをExportしています
   * performanceに対応していないブラウザはgetTimeを返します
   *
   * @static
   * @method now
   * @return {Number}
   */
  amp.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());



}(window, amp || {}));
