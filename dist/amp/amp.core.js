/**
 * AMP JavaScript Library
 *
 * @licence MIT Licence
 *
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


// for ie8
var AMP = {};

(function(root){

  // 'use strict';



  /*======================================================================
    Ampクラス
  ======================================================================*/

  // クラス設定
  var
  CLASS_NAME = 'Amp',
  VERSION    = '3.0.0';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>BASE_CLASS (Amp)</h4>
   * 基底クラスを定義しています （このクラスをベースに子クラスを設計します)<br>
   * AmpクラスをAMP.BASE_CLASSにエクスポートしてます
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

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    配列
  ======================================================================*/

  /**
   * <h4>配列</h4>
   *
   * @class AMP.Array
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>each処理を行います</h4>
   *
   * @static
   * @method each
   * @param  {Object}   obj      イテレーションを行うオブジェクト
   * @param  {Function} callback イテレーション毎のコールバック関数
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
   * <h4>atgumentsを配列に変換して返す</h4>
   * スライス位置を指定して切り取り可能
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


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    継承・拡張
  ======================================================================*/

  /**
   * <h4>クラス・オブジェクト等の継承、拡張系</h4>
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
    var isDeep, count, extendObject, length, obj, key, data, copy, isArray, clone;

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

        isArray = AMP.isArray(copy);

        if(isDeep && copy && AMP.isObject(copy) || isArray){
          if(isArray){
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
   * 拡張した、サブクラスを返します<br>
   * superClassは、可変長引数で、多重継承することが可能
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
   * ClassにextendメソッドをExportして使います
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


}(window));

(function(root){

  // 'use strict';


  /*======================================================================
    フォールバック
  ======================================================================*/

  /**
   * <h4>ブラウザサポートされていない場合、代替処理を行います</h4>
   *
   * @class Fallback
   */

  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/


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
   * 配列の各要素に対して、指定された処理を実行します<br>
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
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
   * FIXME: βバージョンです。検証していません
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
   * <h4>新しいprototypeオブジェクトの生成</h4>
   *
   * @static
   * @method Object.create
   * @param  {Object} proto プロトタイプオブジェクト
   * @return {Object}
   */
  Object.create = Object.create || function(proto){
    function Obj(){}
    Obj.prototype = proto;
    return new Obj();
  };


  /**
   * <h4>連想配列の要素数取得</h4>
   * Object.keysの処理を追加
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
   * <h4>両端の空白を取り除いた文字列を返す</h4>
   *
   * @method String.prototype.trim
   * @return {String}
   */
  String.prototype.trim = String.prototype.trim || function(){
    return this.replace(/^\s+|\s+$/g, '');
  };



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    機能判定
  ======================================================================*/

  /**
   * <h4>機能判定</h4>
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
   * <h4>RequestAnimationFrame機能の有無</h4>
   *
   * @static
   * @method hasReqAnime
   * @return {Boolean}
   */
  AMP.hasReqAnime = function(){
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
   * @method isMsPointer
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
   * <h4>css3 Transition機能の有無</h4>
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



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    オブジェクト,ブラウザの判定
  ======================================================================*/

  /**
   * <h4>オブジェクト、ブラウザの判定</h4>
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
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>developモード</h4>
   * 開発時に使用します<br>
   * developモードは、エラー時コンソールログを出力します
   *
   * @static
   * @property isDevelop
   * @type {Boolean}
   */
  AMP.isDevelop = false;



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
  AMP.isArray = Array.isArray || function(obj){
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
  AMP.isBoolean = function(obj){
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
  AMP.isFunction = function(obj){
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
  AMP.isNumber = function(obj){
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
  AMP.isObject = function(obj){
    return !!obj && toString.call(obj) === '[object Object]';
  };


  /**
   * <h4>プレーンオブジェクト判定</h4>
   *
   * @static
   * @method isPlainObject
   * @param  {Object}  obj 判定したいオブジェクト
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
   * @param  {Object} obj 判定したいオブジェクト
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
   * @param  {Object} obj 判定したいオブジェクト
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
   * @param  {Object} obj 判定したいオブジェクト
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
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  AMP.isNull = function(obj) {
    return obj === null || toString.call(obj) === '[object Null]';
  };


  /* Number
  -----------------------------------------------------------------*/

  /**
   * <h4>ポジティブ値判定</h4>
   * !!!: 数値しか判定しません
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
   * !!!: 数値しか判定しません
   *
   * @static
   * @method isPositive
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
   * windows, windowsPhone, mac, ios, android
   * @param  {String | Number} ver バージョンナンバー Android ios のみ有効
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
   * <h4>WindowsPhone判定 βver</h4>
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
   * isoは、含みません
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
   * @param {Number | String} バージョンナンバー 省略可
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
   * @param {Number | String} バージョンナンバー 省略可
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
   * pc, sd, smartdevice, sp, smartphone, tb, tablet, iphone, ipad, ipod, androidphone, androidtablet
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
   * ie, chrome, safari, firefox, opera, mobileSafari, android, webkit
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
   * FIXME: アップデート予定
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
   * @param {Number | String} ver バージョンナンバー  省略可
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
   * <h4>Android Browser判定</h4>
   *
   * @static
   * @method isAndroidBrowser
   * @param {Number | String} ver バージョンナンバー 省略可
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



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    locationオブジェクト
  ======================================================================*/

  /**
   * <h4>locationオブジェクト</h4>
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
   * <h4>location.hashの取得し、#を省いた文字列を配列に格納して返す</h4>
   * location.hashがない場合、値を返しません
   *
   * @static
   * @method getHash
   * @return {Array}
   */
  AMP.getHash = function(){
    if(url.hash.length){
      return url.hash.split('#').slice(1);
    }
  };


  /**
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   * パラメータがない場合、空のオブジェクトを返す
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


  // FIXME: 追加予定
  // TODO: 表示されているページファイル名を返す
  // AMP.getCurrentFileName = function(){};



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    文字列
  ======================================================================*/

  /**
   * <h4>文字列</h4>
   *
   * @class AMP.String
   */



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
   * <h4>空白文字を削除して返す</h4>
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
   * 対象の文字列と、削除文字列がマッチしたものを全置換します
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



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    ユーティリティ
  ======================================================================*/

  /**
   * <h4>ユーティリティ</h4>
   *
   * @class AMP.Utility
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>DOMイベント追加</h4>
   *
   * @static
   * @method removeEvent
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
   * <h4>DOMイベント削除</h4>
   *
   * @static
   * @method removeEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
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


  /**
   * <h4>匿名関数名を返す</h4>
   * 無名関数はundefinedを返します
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
      } else {
        return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
      }
    } else {
      throw new TypeError(fn + ' is not a Function');
    }
  };


  /**
   * <h4>DEG</h4>
   *
   * @static
   * @property DEG
   * @type {Number}
   */
  AMP.DEG = Math.PI / 180;


  /**
   * <h4>角度、距離からxy座標を返す </h4>
   *
   * @static
   * @method coords
   * @param  {Number} deg    角度
   * @param  {Number} distanceX 距離
   * @param  {Number} distanceY 距離
   * @return {Object}
   */
  AMP.coords = function(deg, distanceX, distanceY){
    return {
      x: AMP.coordX(deg, distanceX),
      y: AMP.coordY(deg, distanceY)
    };
  };


  /**
   * <h4>角度、距離からx座標を算出</h4>
   *
   * @static
   * @method coordX
   * @param  {Number} deg   角度
   * @param  {Number} distanceX 距離
   * @return {Number}
   */
  AMP.coordX = function(deg, distanceX){
    return Math.cos(deg * AMP.DEG) * distanceX;
  };


  /**
   * <h4>角度、距離からy座標を算出</h4>
   *
   * @static
   * @method coordY
   * @param  {Number} deg   角度
   * @param  {Number} distanceY 距離
   * @return {Number}
   */
  AMP.coordY = function(deg, distanceY){
    return Mas.sin(deg * AMP.DEG) * distanceY;
  };


  /**
   * <h4>現在と過去の位置から角度を算出</h4>
   *
   * @static
   * @method deg
   * @param  {Number} x     現在のx座標
   * @param  {Number} y     現在のy座標
   * @param  {Number} prevX 前のx座標
   * @param  {Number} PrevY 前のx座標
   * @return {Number}
   */
  AMP.deg = function(x, y, prevX, PrevY){
    return Math.atan2(PrevY - y, prevX - x) * 180 / Math.PI;
  };


  /**
   * <h4>16進数カラーをRGBに変換します</h4>
   *
   * @static
   * @method hexToRGB
   * @param {String} hex 16進数カラー
   * @return {Object} RGB Object
   */
  AMP.hexToRGB = function(hex){
    hex = hex.replace(/^#/, '');

    // hex shorthand時、成型しなおす
    if(hex.length === 3){
      var _hex = '';
      AMP.each(hex, function(chara){
        _hex += chara + chara;
      });
      hex = _hex;
    }

    // hex値の簡易チェック
    if (hex.length !== 6) {
      throw new TypeError('arguments is not a HEX');
    }

    // RGB Object
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  };


  /**
   * <h4>RGBカラーを16進数カラーに変換</h4>
   *
   * @static
   * @method rgbToHex
   * @param  {Number} r レッド値
   * @param  {Number} g グリーン値
   * @param  {Number} b ブルー値
   * @return {String} 16進数カラー
   */
  AMP.rgbToHex = function(r, g, b){
    var hex = '#';

    AMP.each(AMP.argsToArray(arguments), function(color){
      var _color = Number(color).toString(16);

      // RGB値チェック
      if(2 < _color.length){
        throw new TypeError('arguments is not a RGB');
      }

      hex += _color.length === 1 ? '0' + _color : _color;
    });

    return hex;
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number}
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
   * @return {Image} 生成した、イメージオブジェクト
   */
  AMP.preload = function(src){
    var img = new Image();
    img.src = src;
    return img;
  };


  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
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

    // contextの処理追加予定
    return function(callback){
      return requestAnimation(callback);
    };
  }());


  /**
   * <h4>cancelAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、clearTimeoutでフォールバックします
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
   * performance.nowメソッドをExportしています<br>
   * performanceに対応していないブラウザはgetTimeを返します
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
   * 何もしません
   *
   * @static
   * @return {Void}
   */
  AMP.noop = function(){};


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>デバッグ機能</h4>
   * !!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.debug</em>にインスタンスをエクスポートしていますので、そちらを使用してください
   *
   * @class AMP.Debug
   * @extends AMP.BASE_CLASS
   * @constructor
   *
   * @example
   *   AMP.debug.log(any);<br>
   *   AMP.debug.log(any, any...);
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
  Debug.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>デバッグview要素を格納用オブジェクト</h4>
   *
   * @static
   * @property debugViews
   * @type {Object}
   */
  Debug.views = null;


  /**
   * <h4>デバッグviewの表示状態</h4>
   *
   * @static
   * @property isShow
   * @default true
   * @type {Boolean}
   */
  Debug.isShow = true;


  /**
   * <h4>デバッグログの有効・無効</h4>
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
   * @method createView
   * @return {Void}
   */
  Debug._createView = function(){
    // view要素生成
    var childNode = '<div style="z-index:19791218;min-width:250px;font-size:12px;background:#41454e;">\n<div class="ttl" style="padding:5px;line-height:12px;font-weight:bold;color:#f9f9f9;text-align:center;background:#272a32;">DEBUG</div>\n<textarea id="AMP_DEBUG_TEXT" style="box-sizing:border-box;width:100%;min-height:150px;padding:10px;font-family:consolas;color:#272a32;font-size:14px;line-height:1.5;border:5px solid #41454e;"></textarea>\n</div>';

    // view要素の追加
    var el = document.createElement('div');

    el.id = 'AMP_DEBUG';
    el.setAttribute('style', 'position:fixed;left:10px;bottom:10px;');
    el.innerHTML = childNode;
    document.body.appendChild(el);

    // controll elements
    Debug.views = {
      wrap : document.getElementById('AMP_DEBUG'),
      text : document.getElementById('AMP_DEBUG_TEXT')
    };

    // viewイベント追加
    Debug._addEvent();
  };


  /**
   * <h4>viewイベント設定</h4>
   *
   * @private
   * @static
   * @method addEvent
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
   * <h4>ログの出力モードを有効にします</h4>
   *
   * @method start
   * @return {Debug}
   */
  p.start = function(){
    Debug.isChangeLog = true;
    return this;
  };


  /**
   * <h4>ログの出力モードを無効にします</h4>
   *
   * @method stop
   * @return {Debug}
   */
  p.stop = function(){
    Debug.isChangeLog = false;
    return this;
  };


  /**
   * <h4>ログを非表示にします</h4>
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
   * <h4>ログを表示します</h4>
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


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
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
   * <a href="http://easings.net/ja" target="_blank">Easingサンプルサイト</a>
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


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベント</h4>
   * イベントクラスの継承して使用出来ます<br>
   * メディエターとしても使用すことも可能です
   *
   * @class AMP.Events
   * @extends AMP.BASE_CLASS
   * @constructor
   *
   * @example
   *   // on<br>
   *   events.on('change', function(){...});<br>
   *   events.on('change.type', typeCall);<br>
   *
   *   // off<br>
   *   events.off('change');<br>
   *   events.off('change', typeCall);<br>
   *   events.off();<br>
   *
   *   // tigger<br>
   *   events.tigger('change');<br>
   *   events.tigger('change.type');
   *
   */
  function Events(){}

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
  Events.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Events';


  /**
   * <h4>イベントリスナーを連想配列で格納します</h4>
   *
   * @example
   * _listeners = {
   *    attr    : eventObj.attr,
   *    func    : listener,
   *    context : context
   * }
   *
   * @private
   * @property _listeners
   * @type {Object}
   */
  p._listeners = {};


  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベント登録</h4>
   * イベント名に属性値を付与することが出来ます
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
   * TODO: 内部処理最適化予定
   *
   * @private
   * @method _addEvent
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
    var num = type.indexOf('.'),
    attr;

    if(num !== -1){
      attr = type.substr(num);
      type = type.substr(0, num);
    }

    return {
      type: type,
      attr: attr
    };
  };


  /**
   * <h4>イベントが登録されているか判定します</h4>
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
    listeners = this._listeners[events.type];

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          item.func.apply(item.context, AMP.argsToArray(arguments, 1));
        }
      });
    }

    return self;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Events = Events;


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>フォントリサイズイベント</h4>
   * !!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.fontResize</em>にインスタンスをエクスポートしていますので、そちらを使用してください
   *
   * @class AMP.FontResize
   * @extends AMP.Events
   * @constructor
   */
  function FontResize(){}

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
  FontResize.VERSION = '3.0.0';


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


  /**
   * <h4>要素を監視有効・無効の判定フラグ</h4>
   *
   * @property isFontResize
   * @default true
   * @type {Boolean}
   */
  p.isFontResize = true;


  /**
   * <h4>監視する要素</h4>
   *
   * @property el
   * @type {DOM}
   */
  p.el = null;


  /**
   * <h4>監視要素の高さ</h4>
   *
   * @property height
   * @type {Number}
   */
  p.height = null;



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
    el = document.createElement('ins'),
    text = document.createTextNode(key);

    el.id = key;
    el.setAttribute('style', 'display:block;visibility:hidden;position:absolute;top:0;left:0;zIndex:-1;');
    el.appendChild(text);
    document.body.appendChild(el);

    // property
    this.el = document.getElementById(key);
    this.height = this.el.clientHeight;

    // set controller
    this._controller();
  };


  /**
   * <h4>状態を監視し、フォトサイズに変更があればイベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    height = self.el.clientHeight;

    if(self.isFontResize){
      // フォントサイズに変更があれば
      if(self.height !== height){
        self.height = height;
        this.trigger(FontResize.eventType);
      }

      // 再起処理
      AMP.requestAnimationFrame(function(){
        self._controller();
      });
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
    if(!this.el){
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


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Mediaqueryのブレイクポイントイベント</h4>
   * !!!: 対象の要素(head)にcssでフォントファミリーを指定してください<br>
   * !!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.mediaquery</em>にインスタンスをエクスポートしていますので、そちらを使用してください
   *
   * @class AMP.Mediaquery
   * @extends AMP.Events
   * @constructor
   * @param {DOM} element 監視対象要素
   */
  function Mediaquery(element){
    if(element && element.nodeType === 1){
      this.el = element;
    } else {
      this.el = document.getElementsByTagName('head')[0];
    }
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
  Mediaquery.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Mediaquery';


  /**
   * <h4>スタイルを監視する要素</h4>
   *
   * @property el
   * @default head
   * @type {DOM}
   */
  p.el = null;


  /**
   * <h4>フォントサイズ変更時の発行するイベントタイプ</h4>
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  Mediaquery.eventType = 'change';


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = false;


  /**
   * <h4>要素の現在のスタイルを保管します</h4>
   *
   * @property mediaStyle
   * @type {String}
   */
  p.mediaStyle = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>状態を監視し、フォトサイズに変更があればイベントを発行します</h4>
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
   * 第二引数以降に値を渡すとcallbackに引数として渡します
   *
   * @method trigger
   * @param  {String} type イベントタイプ
   * @return {Events}
   */
  p.trigger = function(type){
    var self = this,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type];

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          item.func.call(item.context, {mediaStyle: self.mediaStyle});
        }
      });
    }
    return self;
  };


  /**
   * <h4>要素のスタイルを返します</h4>
   *
   * ＠method getStyle
   * @return {String}
   */
  p.getStyle = function(){
    if(root.getComputedStyle){
      return getComputedStyle(this.el).getPropertyValue('font-family');
    } else {
      // !!!: jshintのチェックを緩和します
      /*jshint -W069 */
      return this.el.currentStyle['fontFamily'];
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Mediaquery = Mediaquery;
  AMP.mediaquery = new Mediaquery();



}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>モデル管理</h4>
   *
   * @class AMP.Modal
   * @extends AMP.Events
   * @constructor
   * @param {Object} props プロパティ
   */
  function Modal(props){

    /**
     * <h4>プロパティ</h4>
     *
     * @private
     * @property _props
     * @type {Object}
     */
    this._props = AMP.mixin({}, props);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Modal, AMP.Events);

  // prototype
  var p = Modal.prototype;



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
  Modal.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Modal';


  /**
   * <h4>モデルのプロパティが変更時、に発行されるイベントタイプ</h4>
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  Modal.eventType = 'change';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>プロパティの取得</h4>
   *
   * @method　get
   * @param  {String} key 取得したいキー
   * @return {Any}
   */
  p.get = function(key){
    if(AMP.isUndefined(this._props[key])){
      return this._props;
    } else {
      return this._props[key];
    }
  };


  /**
   * [set description]
   */
  p.set = function(key, val, isSilent){
    var isCahnge = false;

    if(AMP.isObject(key)){
      isSilent = val;
      isCahnge = true;
      AMP.mixin(true, this._props, key);

    } else if(this._props[key] !== val){
      isCahnge = true;
      this._props[key] = val;
    }

    if(isCahnge){
      this._controller(isSilent);
    }

    return this;
  };


  /**
   *　<h4>プロパティクリア</h4>
   *
   * @method clear
   * @return {Model}
   */
  p.clear = function(isSilent){
    if(!AMP.isPlainObject(this._props)){
      this._controller(isSilent);
      this._props = {};
    }
    return this;
  };


  /**
   *　<h4>値があるか判定します</h4>
   * undefined, Nullは、falseを返します
   *
   * @method has
   * @return {Boolean}
   */
  p.has = function(key){
    return (!AMP.isUndefined(this._props[key]) && !AMP.isNull(this._props[key]));
  };


  /**
   * <h4>プロパティーのeach処理</h4>
   *
   * @method each
   * @param  {Function} callback each毎に処理する関数
   * @return {Model}
   */
  p.each = function(callback){
    AMP.each(this._props, callback);
    return this;
  };


  /**
   * <h4>イベントコントローラー</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(isSilent){
    if(!isSilent){
      this.trigger(Modal.eventType);
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Modal = Modal;


}(window));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ストレージ管理</h4>
   * デフォルトでは、セッションストレージを使用します
   *
   * @class AMP.Storage
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Boolean} isLocalStorage ローカルストレージを使用か？
   */
  function Storage(isLocalStorage){
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
  Storage.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Storage';


  /**
   * <h4>ストレージタイプ</h4>
   *
   * @default sessionStorage
   * @property type
   * @type {String}
   */
  p.type = 'sessionStorage';


  /**
   * <h4>ストレージを保管</h4>
   *
   * @private
   * @property _storage
   * @type {Object}
   */
  p._storage = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Storageインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param {Boolean} isLocalStorage ローカルストレージを使用か？
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
   * <h4>アイテム、ストレージデータの削除</h4>
   *
   * @method removeItem
   * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
   * @return {Storage}
   */
  p.removeItem = function(key){
    var self = this;

    if(this._storage){
      if(AMP.isUndefined(key)){
        this._storage.clear();

      } else {
        AMP.each(AMP.argToAarguments, function(item){
          self._storage.removeItem(item);
        });
      }
    }

    return this;
  };


  /**
   * <h4>レングスを返す</h4>
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


}(window));
