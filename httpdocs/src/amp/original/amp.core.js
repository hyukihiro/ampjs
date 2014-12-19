/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author  Yoshihito Fujiwara
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


(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  /**
   * <h4>amp</h4>
   * namespace
   *
   * @class amp
   **/
  var amp = {};


  var
  url        = root.location,
  ua         = navigator.userAgent.toLowerCase(),
  doc        = document,
  html       = doc.documentElement,
  css3Prefix = ['', '-ms-', '-moz-', '-webkit-'],
  ieSupports = {min: 8, max: 12},
  toString   = Object.prototype.toString;



  // console.logがないブラウザは、空の関数を返す
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
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
  amp.VERSION = '1.7';


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
    @method Judgment
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
   * @param  {String} key OS名 ['windows', 'windowsPhone', 'mac', 'ios', android]
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
   * @param {String} デバイス名 ['pc', 'sd', 'smartdevice', 'sp', 'smartphone', 'tb', 'tablet', 'iphone', 'ipad', 'ipod', 'androidphone', 'androidtablet', 'touchscreen', 'mspointer']
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

    } else if (k === 'touchscreen'){
      return amp.isTouchScreen();

    } else if (k === 'mspointer'){
      return amp.isMsPointer();
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


  /**
   * <h4>TouchScreen判定</h4>
   *
   * @static
   * @method isTouchScreen
   * @return {Boolean}
   */
  amp.isTouchScreen = function(){
    return 'ontouchend' in doc;
  };


  /**
   * <h4>MsPointer判定 βver</h4>
   *
   * @static
   * @method isMsPointer
   * @return {Boolean}
   */
  amp.isMsPointer = function(){
    return root.navigator.msPointerEnabled > -1;
  };


  /* Browser
  -----------------------------------------------------------------*/

  /**
   * <h4>ブラウザ判定</h4>
   *
   * @static
   * @method isBrowser
   * @param  {String} key ブラウザ名 ['ie', 'chrome', 'safari', 'firefox', 'opera', 'mobileSafari', 'android', 'webkit']
   * @param  {String | Number} ver バージョン [ie, mobileSafari, android] 省略可
   * @param  {String} pun ie指定バージョン範囲 ['prev', 'later']  省略可
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
   * @param  {String}  pun 以前・移行 ['prev', 'later']
   * @return {Boolean}
   */
  amp.isIEScope = function(ver, pun){
    // pun値の誤入力チェック
    if(pun.search(/^prev$|^later$/) > -1){

      var flag = pun === 'prev',
      end = flag ? ver - ieSupports.min: ieSupports.max - ver,
      inc = flag ? -1 : 1,
      isScope,
      j = 0;

      for(; j <= end; j += 1){
        isScope = amp.isIE(ver);
        ver += inc;
        if(isScope){
          break;
        }
      }

      return isScope;
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
    return ua.indexOf('opera/') > -1 && ua.indexOf('mobile') < 0;
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


  /* Function
  -----------------------------------------------------------------*/

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
    return (root.requestAnimationFrame ||
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
    var prop = 'transition',
    i = 0,
    l = css3Prefix.length,
    flag = false;

    for(; i < l; i += 1){
      if(css3Prefix[i] + prop in html.style){
        flag = true;
        break;
      }
    }

    return flag;
  };



  /*----------------------------------------------------------------------
    @method Utility
  ----------------------------------------------------------------------*/

  /**
   * <h4>id生成</h4>
   * 文字列にナンバーを追加して返します
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String} str+数値を返す
   */
  amp.createID = (function(){
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
   * @return {String} ランダムな4桁のコードを返す
   */
  amp.digit = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


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

    return extendObject;
  };


  /**
   * <h4>ClassをExtendします</h4>
   * ClassにextendメソッドをExportして使います
   *
   * @private
   * @static
   * @method _extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  amp._extend = function(protoProp, staticProp){
    var parent = this,
    child;

    if(amp.isFunction(protoProp) && protoProp.construtor){
      child = protoProp.construtor;
    } else {
      child = function(){
        return parent.apply(this, arguments);
      };
    }

    amp.extend(true, child, parent, staticProp);
    amp.extend(true, child.prototype, parent.prototype, protoProp);

    return child;
  };


  /**
   * <h4>hashの取得し、#を省いた文字列を配列に格納して返す</h4>
   *
   * @static
   * @method getHash
   * @return {Array} #を省いた文字列を配列に格納して返す
   */
  amp.getHash = function(){
    if(url.hash.length){
      return url.hash.split('#').slice(1);
    }
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method getRatio
   * @return {Number}
   */
  amp.getRatio = function(){
    return root.devicePixelRatio || 1;
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
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object} クエリを格納した連想配列を返す
   */
  amp.queryHashMap = function(){
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


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  amp.toString = function(){
    return '[object amp]';
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String} UUIDを生成して返す
   */
  amp.uuid = function(){
    var d = amp.digit;
    return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
  };


  /**
   * <h4>xmlを文字列に変換</h4>
   *
   * @static
   * @method xmlToString
   * @param  {XML Node} xmlNodeデータ
   * @return {String} 文字列に変換して返す
   */
  amp.xmlToString = function(xml){
    if(amp.hasXMLSerializer()){
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch(e){
        console.log(e);
      }
    }
  };



  /*----------------------------------------------------------------------
    @method Add Fallbacks
  ----------------------------------------------------------------------*/

  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
   *
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number} タイマーNumber
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
   * @method requestAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number} タイマーNumber
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
   * @type {Number} 現在の時間(ミリ秒)を返します
   */
  amp.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());


  /**
   * <h4>forEach</h4>
   * 配列の各要素に対して、指定された処理を実行します
   *
   * @static
   * @method forEach
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




  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  root.amp = amp;



}(window));

;(function(root){

  // 'use strict';

  // #note
  // NextVer: イベント属性機能追加


  var Mediator, p;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベントを仲介します</h4>
   *
   * @class Mediator
   * @constructor
   * @return {Mediator}
   */
  Mediator = function(){};



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
  Mediator.VERSION = '1.5';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Mediator.prototype;


  /**
   * <h4>コールバックイベントを連想配列で格納します</h4>
   *
   * @private
   * @property _callbacks
   * @type {Object}
   */
  p._callbacks = {};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * amp._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  Mediator.extend = root.amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.on = function(event, callback, context){
    var self = this;

    self._callbacks[event] = {
      callback: callback,
      context : context
    };

    return self;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.one = function(event, callback, context){
    var self = this,
    once;

    /* underscore ver
    once = _.once(function(){
      self.off(event, once);
      callback.apply(self, arguments);
    });
    */

    once = function(){
      self.off(event, once);
      callback.apply(self, arguments);
    };

    self.on(event, once, context);

    return self;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  p.off = function(event){
    if(this._callbacks[event]){
      this._callbacks[event] = null;

    } else if(!event){
      this._callbacks = {};
    }

    return this;
  };


  /**
   * <h4>イベントが登録されているか</h4>
   *
   * @method hasEvent
   * @param  {String} event イベント名
   * @return {Boolean}
   */
  p.hasEvent = function(event){
    var key,
    flag = false;

    for(key in this._callbacks){
      if(key === event){
        flag = true;
        break;
      }
    }

    return flag;
  };


  /**
   * <h4>イベント発行</h4>
   * <p>第二引数以降に値を渡すとcallbackに引数として渡します</p>
   *
   * @method trigger
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  p.trigger = function(event){
    if(this._callbacks[event]){
      this._callbacks[event].callback.apply(event.context, [].slice.apply(arguments).slice(1));
    }
    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Mediator]';
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediator = Mediator;


}(window));

;(function(root){

  // 'use strict';


  var ease;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class ease
   * @constructor
   * @return {ease}
   */
  ease = {};



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
  ease.VERSION = '1.5';


  /*--------------------------------------------------------------------------
    jQuery
  --------------------------------------------------------------------------*/
  /**
   * <h4>jQuery Easeing Pluginをエクスポートしています</h4>
   * jQuery Easeing Pluginをインストールして使用してください
   *
   * @static
   * @property createjs
   * @type {Object}
   */
   ease.jQuery = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._1_SINE_IN
   * @type {String}
   */
  ease.jQuery._1_SINE_IN = 'easeInSine';

  /**
   * @static
   * @property jQuery._1_SINE_OUT
   * @type {String}
   */
  ease.jQuery._1_SINE_OUT = 'easeOutSine';

  /**
   * @static
   * @property jQuery._1_SINE_IN_OUT
   * @type {String}
   */
  ease.jQuery._1_SINE_IN_OUT = 'easeInOutSine';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._2_QUAD_IN
   * @type {String}
   */
  ease.jQuery._2_QUAD_IN = 'easeInQuad';

  /**
   * @static
   * @property jQuery._2_QUAD_OUT
   * @type {String}
   */
  ease.jQuery._2_QUAD_OUT = 'easeOutQuad';

  /**
   * @static
   * @property jQuery._2_QUAD_IN_OUT
   * @type {String}
   */
  ease.jQuery._2_QUAD_IN_OUT = 'easeInOutQuad';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._3_CUBIC_IN
   * @type {String}
   */
  ease.jQuery._3_CUBIC_IN = 'easeInCubic';

  /**
   * @static
   * @property jQuery._3_CUBIC_OUT
   * @type {String}
   */
  ease.jQuery._3_CUBIC_OUT = 'easeOutCubic';

  /**
   * @static
   * @property jQuery._3_CUBIC_IN_OUT
   * @type {String}
   */
  ease.jQuery._3_CUBIC_IN_OUT = 'easeInOutCubic';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._4_QUART_IN
   * @type {String}
   */
  ease.jQuery._4_QUART_IN = 'easeInQuart';

  /**
   * @static
   * @property jQuery._4_QUART_OUT
   * @type {String}
   */
  ease.jQuery._4_QUART_OUT = 'easeOutQuart';

  /**
   * @static
   * @property jQuery._4_QUART_IN_OUT
   * @type {String}
   */
  ease.jQuery._4_QUART_IN_OUT = 'easeInOutQuart';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._5_QUINT_IN
   * @type {String}
   */
  ease.jQuery._5_QUINT_IN = 'easeInQuint';

  /**
   * @static
   * @property jQuery._5_QUINT_OUT
   * @type {String}
   */
  ease.jQuery._5_QUINT_OUT = 'easeOutQuint';

  /**
   * @static
   * @property jQuery._5_QUINT_IN_OUT
   * @type {String}
   */
  ease.jQuery._5_QUINT_IN_OUT = 'easeInOutQuint';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._6_EXPO_IN
   * @type {String}
   */
  ease.jQuery._6_EXPO_IN = 'easeInExpo';

  /**
   * @static
   * @property jQuery._6_EXPO_OUT
   * @type {String}
   */
  ease.jQuery._6_EXPO_OUT = 'easeOutExpo';

  /**
   * @static
   * @property jQuery._6_EXPO_IN_OUT
   * @type {String}
   */
  ease.jQuery._6_EXPO_IN_OUT = 'easeInOutExpo';


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._7_CIRC_IN
   * @type {String}
   */
  ease.jQuery._7_CIRC_IN = 'easeInCirc';

  /**
   * @static
   * @property jQuery._7_CIRC_OUT
   * @type {String}
   */
  ease.jQuery._7_CIRC_OUT = 'easeOutCirc';

  /**
   * @static
   * @property jQuery._7_CIRC_IN_OUT
   * @type {String}
   */
  ease.jQuery._7_CIRC_IN_OUT = 'easeInOutCirc';


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._LINEAR
   * @type {String}
   */
  ease.jQuery._LINEAR = 'linear';


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._BACK_IN
   * @type {String}
   */
  ease.jQuery._BACK_IN = 'easeInBack';

  /**
   * @static
   * @property jQuery._BACK_OUT
   * @type {String}
   */
  ease.jQuery._BACK_OUT = 'easeOutBack';

  /**
   * @static
   * @property jQuery._BACK_IN_OUT
   * @type {String}
   */
  ease.jQuery._BACK_IN_OUT = 'easeInOutBack';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._ELASTIC_IN
   * @type {String}
   */
  ease.jQuery._ELASTIC_IN = 'easeInElastic';

  /**
   * @static
   * @property jQuery._ELASTIC_OUT
   * @type {String}
   */
  ease.jQuery._ELASTIC_OUT = 'easeOutElastic';

  /**
   * @static
   * @property jQuery._ELASTIC_IN_OUT
   * @type {String}
   */
  ease.jQuery._ELASTIC_IN_OUT = 'easeInOutElastic';


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property jQuery._BOUNCE_IN
   * @type {String}
   */
  ease.jQuery._BOUNCE_IN = 'easeInBounce';

  /**
   * @static
   * @property jQuery._BOUNCE_OUT
   * @type {String}
   */
  ease.jQuery._BOUNCE_OUT = 'easeOutBounce';

  /**
   * @static
   * @property jQuery._BOUNCE_IN_OUT
   * @type {String}
   */
  ease.jQuery._BOUNCE_IN_OUT = 'easeInOutBounce';


  /*--------------------------------------------------------------------------
    createjs
  --------------------------------------------------------------------------*/

  /**
   * <h4>createjs.Easeをエクスポートしています</h4>
   * createjs.Easeをインストールして使用してください
   *
   * @static
   * @property createjs
   * @type {Object}
   */
  ease.createjs = (function(){
    var e = {},
    c = root.createjs || {};


    if(!c.Ease){
      return e;
    } else {
      c = createjs.Ease;
    }

    // see: http://www.createjs.com/Docs/TweenJS/files/tweenjs_ease.js.html

    /* 1 Sine
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._1_SINE_IN
     * @type {String}
     */
     e._1_SINE_IN = c.sineIn;

    /**
     * @static
     * @property createjs._1_SINE_OUT
     * @type {String}
     */
    e._1_SINE_OUT = c.sineOut;

    /**
     * @static
     * @property createjs._1_SINE_IN_OUT
     * @type {String}
     */
    e._1_SINE_IN_OUT = c.sineInOut;


    /* 2 Quad
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._2_QUAD_IN
     * @type {String}
     */
    e._2_QUAD_IN = c.quadIn;

    /**
     * @static
     * @property createjs._2_QUAD_OUT
     * @type {String}
     */
    e._2_QUAD_OUT = c.quadOut;

    /**
     * @static
     * @property createjs._2_QUAD_IN_OUT
     * @type {String}
     */
    e._2_QUAD_IN_OUT = c.quadInOut;


    /* 3 Cubic
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._3_CUBIC_IN
     * @type {String}
     */
    e._3_CUBIC_IN = c.cubicIn;

    /**
     * @static
     * @property createjs._3_CUBIC_OUT
     * @type {String}
     */
    e._3_CUBIC_OUT = c.cubicOut;

    /**
     * @static
     * @property createjs._3_CUBIC_IN_OUT
     * @type {String}
     */
    e._3_CUBIC_IN_OUT = c.cubicInOut;


    /* 4 Quart
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._4_QUART_IN
     * @type {String}
     */
    e._4_QUART_IN = c.quartIn;

    /**
     * @static
     * @property createjs._4_QUART_OUT
     * @type {String}
     */
    e._4_QUART_OUT = c.quartOut;

    /**
     * @static
     * @property createjs._4_QUART_IN_OUT
     * @type {String}
     */
    e._4_QUART_IN_OUT = c.quartInOut;


    /* 5 Quint
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._5_QUINT_IN
     * @type {String}
     */
    e._5_QUINT_IN = c.quintIn;

    /**
     * @static
     * @property createjs._5_QUINT_OUT
     * @type {String}
     */
    e._5_QUINT_OUT = c.quintOut;

    /**
     * @static
     * @property createjs._5_QUINT_IN_OUT
     * @type {String}
     */
    e._5_QUINT_IN_OUT = c.quintInOut;


    /* 6 Expo
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._6_EXPO_IN
     * @type {String}
     */
    e._6_EXPO_IN = c.getPowIn(6);

    /**
     * @static
     * @property createjs._6_EXPO_OUT
     * @type {String}
     */
    e._6_EXPO_OUT = c.getPowOut(6);

    /**
     * @static
     * @property createjs._6_EXPO_IN_OUT
     * @type {String}
     */
    e._6_EXPO_IN_OUT = c.getPowInOut(6);


    /* 7 Circ
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._7_CIRC_IN
     * @type {String}
     */
    e._7_CIRC_IN = c.circIn;

    /**
     * @static
     * @property createjs._7_CIRC_OUT
     * @type {String}
     */
    e._7_CIRC_OUT = c.circOut;

    /**
     * @static
     * @property createjs._7_CIRC_IN_OUT
     * @type {String}
     */
    e._7_CIRC_IN_OUT = c.circInOut;


    /* Linear
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._LINEAR
     * @type {String}
     */
    e._LINEAR = c.linear;


    /* Back
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._BACK_IN
     * @type {String}
     */
    e._BACK_IN = c.backIn;

    /**
     * @static
     * @property createjs._BACK_OUT
     * @type {String}
     */
    e._BACK_OUT = c.backOut;

    /**
     * @static
     * @property createjs._BACK_IN_OUT
     * @type {String}
     */
    e._BACK_IN_OUT = c.backInOut;


    /* Elastic
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._ELASTIC_IN
     * @type {String}
     */
    e._ELASTIC_IN = c.elasticIn;

    /**
     * @static
     * @property createjs._ELASTIC_OUT
     * @type {String}
     */
    e._ELASTIC_OUT = c.elasticOut;

    /**
     * @static
     * @property createjs._ELASTIC_IN_OUT
     * @type {String}
     */
    e._ELASTIC_IN_OUT = c.elasticInOut;


    /* Bounce
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._BOUNCE_IN
     * @type {String}
     */
    e._BOUNCE_IN = c.bounceIn;

    /**
     * @static
     * @property createjs._BOUNCE_OUT
     * @type {String}
     */
    e._BOUNCE_OUT = c.bounceOut;

    /**
     * @static
     * @property createjs._BOUNCE_IN_OUT
     * @type {String}
     */
    e._BOUNCE_IN_OUT = c.bounceInOut;


    return e;

  }());



  /*--------------------------------------------------------------------------
    css3
  --------------------------------------------------------------------------*/

  /**
   * <h4>CSS3 easeing</h4>
   *
   * @static
   * @property css
   * @type {Object}
   */
  ease.css = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  ease.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  ease.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @static
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  ease.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._2_QUAD_IN
   * @type {String}
   */
  ease.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @static
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  ease.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @static
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  ease.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  ease.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @static
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  ease.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @static
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  ease.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._4_QUART_IN
   * @type {String}
   */
  ease.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @static
   * @property css._4_QUART_OUT
   * @type {String}
   */
  ease.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @static
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  ease.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._5_QUINT_IN
   * @type {String}
   */
  ease.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @static
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  ease.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @static
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  ease.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._6_EXPO_IN
   * @type {String}
   */
  ease.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @static
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  ease.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @static
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  ease.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._7_CIRC_IN
   * @type {String}
   */
  ease.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @static
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  ease.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @static
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  ease.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BACK_IN
   * @type {String}
   */
  ease.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @static
   * @property css._BACK_OUT
   * @type {String}
   */
  ease.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @static
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  ease.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._ELASTIC_IN
   * @type {String}
   */
  ease.css._ELASTIC_IN = null;

  /**
   * @static
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  ease.css._ELASTIC_OUT = null;

  /**
   * @static
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  ease.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BOUNCE_IN
   * @type {String}
   */
  ease.css._BOUNCE_IN = null;

  /**
   * @static
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  ease.css._BOUNCE_OUT = null;

  /**
   * @static
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  ease.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.ease = ease;


}(window));

;(function(root){

  // 'use strict';


  /**
   * <h4>文字サイズ監視、文字サイズ変更イベント</h4>
   * シングルトンパターン
   *
   * @static
   * @class fontResize
   * @event fontResize
   * @param {Function} fn コールバック関数
   * @param  {String} key コールバックキー
   * @return {fontResize}
   * @example
   *  amp.fontResize.on('change', callback);
   */
  var fontResize = function(fn, key){
    // singleton
    if(!fontResize._callbacks){
      fontResize._callbacks = {};
      fontResize._init();
    }

    if(key){
      fontResize.add(fn, key);
    } else {
      fontResize.add(fn);
    }

    return fontResize;
  };


  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  fontResize.VERSION = '1.5';


  /**
   * <h4>設定値</h4>
   * config { <ul><li>
   *   elm    : null, 監視対象のDOM</li><li>
   *   size   : 0, {Number} 現在のフォントサイズ</li><li>
   *   count  : 0, {Number} コールバックインデックス</li><li>
   *   timerId: null {Number} タイマーID</li></ul>
   * }
   *
   * @static
   * @property config
   * @type {Object}
   */
  fontResize.config = {
    elm    : null,
    size   : 0,
    count  : 0,
    timerId: null
  };


  /**
   * <h4>コールバックオブジェクト</h4>
   *
   * @private
   * @static
   * @property _callbacks
   * @type {Object}
   */
  fontResize._callbacks = null;


  /**
   * <h4>初期化</h4>
   *
   * @private
   * @static
   * @method _init
   * @return {Void}
   */
  fontResize._init = function(){
    // 監視対象要素の追加
    fontResize.config.elm = document.createElement('ins');
    fontResize.config.elm.innerHTML = 'amp';
    fontResize.config.elm.setAttribute('id', 'amp_observer');
    fontResize.config.elm.setAttribute('style', 'display:block; visibility: hidden; position: absolute; top: 0; z-index: -1;');
    document.getElementsByTagName('body')[0].appendChild(fontResize.config.elm);

    fontResize.config.size = fontResize.config.elm.clientHeight;
    fontResize.on();
  };


  /**
   * <h4>フォント監視開始</h4>
   *
   * @static
   * @method on
   * @return {fontResize}
   */
  fontResize.on = function(){
    fontResize.off();
    fontResize.loop();
    return fontResize;
  };


  /**
   * <h4>フォント監視停止</h4>
   *
   * @static
   * @method off
   * @return {fontResize}
   */
  fontResize.off = function(){
    amp.cancelAnimationFrame(fontResize.config.timerId);
    return fontResize;
  };


  /**
   * <h4>再起処理</h4>
   *
   * @static
   * @method loop
   * @return {Void}
   */
  fontResize.loop = function(){
    var h = fontResize.config.elm.clientHeight;
    if(fontResize.config.size != h){
      fontResize.config.size = h;
      fontResize.trigger();
    }
    fontResize.config.timerId = amp.requestAnimationFrame(fontResize.loop);
  };


  /**
   * <h4>コールバック削除</h4>
   *
   * @static
   * @method clear
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.clear = function(key){
    if(key && fontResize._callbacks.key){
      fontResize._callbacks[key] = null;

    } else if(!key){
      fontResize._callbacks = {};
      fontResize.off();
    }
    return fontResize;
  };


  /**
   * <h4>コールバック追加</h4>
   *
   * @static
   * @method add
   * @param {Function} fn コールバック関数
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.add = function(fn, key){
    if(key){
      // 注意： コールバックオブジェクトが重複したとき上書きします。
      fontResize._callbacks[key] = fn;

    } else {
      fontResize._callbacks[fontResize.config.count] = fn;
      fontResize.config.count += 1;
    }
    return fontResize;
  };


  /**
   * <h4>イベント発行</h4>
   *
   * @static
   * @method trigger
   * @param {String} key コールバックキー 省略可
   * @return {fontResize}
   */
  fontResize.trigger = function(key){
    if(key){
      if(amp.isFunction(fontResize._callbacks[key])){
        fontResize._callbacks[key]();
      }

    } else {
      var k;
      for(k in fontResize._callbacks){
        if(amp.isFunction(fontResize._callbacks[k])){
          fontResize._callbacks[k]();
        }
      }
    }
    return fontResize;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  fontResize.toString = function(){
    return '[object fontResize]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.fontResize = fontResize;


}(window));
