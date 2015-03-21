;(function(root){

  // 'use strict';


  /**
   * <h4>AMP</h4>
   * namespace
   *
   * @class AMP
   **/
  var AMP = {};



  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var
  url        = root.location,
  ua         = navigator.userAgent.toLowerCase(),
  doc        = document,
  html       = doc.documentElement,
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
  AMP.VERSION = '3.0';


  /**
   * <h4>developモード</h4>
   * developモードは、エラー時コンソールログを出力します
   *
   * @static
   * @property isDevelop
   * @type {Boolean}
   */
  AMP.isDevelop = false;



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
   * @static
   * @method isWindowsPhone
   * @return {Boolean}
   */
  AMP.isWindowsPhone = function(){
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
   * @param {String} デバイス名 ['pc', 'sd', 'smartdevice', 'sp', 'smartphone', 'tb', 'tablet', 'iphone', 'ipad', 'ipod', 'androidphone', 'androidtablet', 'touchscreen', 'mspointer']
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

    } else if (k === 'touchscreen'){
      return AMP.isTouchScreen();

    } else if (k === 'mspointer'){
      return AMP.isMsPointer();
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
   * <h4>SmartDevice判定</h4>
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
   * <h4>Tablet判定</h4>
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
   * <h4>Android判定</h4>
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


  /**
   * <h4>TouchScreen判定</h4>
   *
   * @static
   * @method isTouchScreen
   * @return {Boolean}
   */
  AMP.isTouchScreen = function(){
    return 'ontouchend' in doc;
  };


  /**
   * <h4>MsPointer判定 βver</h4>
   *
   * @static
   * @method isMsPointer
   * @return {Boolean}
   */
  AMP.isMsPointer = function(){
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
   * <h4>IEのバージョン範囲判定</h4>
   *
   * @static
   * @method isIEScope
   * @param  {Number}  ver バージョンナンバー
   * @param  {String}  pun 以前・移行 ['prev', 'later']
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
   * <h4>PC版chrome判定</h4>
   *
   * @static
   * @method isChrome
   * @return {Boolean}
   */
  AMP.isChrome = function(){
    return ua.indexOf('chrome') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版Firefox判定</h4>
   *
   * @static
   * @method isFirefox
   * @return {Boolean}
   */
  AMP.isFirefox = function(){
    return ua.indexOf('firefox') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * <h4>PC版Safari判定</h4>
   *
   * @static
   * @method isSafari
   * @return {Boolean}
   */
  AMP.isSafari = function(){
    return ua.indexOf('safari') > -1 && ua.indexOf('mobile') < 0 && !AMP.isChrome();
  };


  /**
   * <h4>PC版Opera判定</h4>
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


  /* Function
  -----------------------------------------------------------------*/

  /**
   * <h4>applicationCache機能の有無</h4>
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
   * <h4>pushState機能の有無</h4>
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
   * <h4>audio機能の有無</h4>
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
   * <h4>canvas機能の有無</h4>
   *
   * @static
   * @method hasCanvas
   * @return {Boolean}
   */
  AMP.hasCanvas = function(){
    return !!doc.createElement('canvas').getContext;
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
   * <h4>video機能の有無</h4>
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
   * <h4>css3 transition機能の有無</h4>
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
  AMP.createID = (function(){
    var count = 0;

    return function(str){
      str = str ? str : 'cid';
      return str + (count += 1);
    };
  }());


  /**
   * <h4>渡した配列に、折り返した値を追加して返します</h4>
   *
   * @static
   * @method cuff
   * @param  {Array} ary   ベースとなる配列
   * @param  {Number} radix 折り返すポイント
   * @return {Array}
   */
  AMP.cuff = function(ary, radix){
    var copy = ary.concat(),
    i = radix ? radix : 0,
    l = copy.length;

    for(; i < l; i += 1){
      copy.push(ary[l - (i+1)]);
    }

    return copy;
  };


  /**
   * <h4>ランダムな4桁のコードを返す</h4>
   *
   * @static
   * @method digit
   * @return {String} ランダムな4桁のコードを返す
   */
  AMP.digit = function() {
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
  AMP.extend = function(){
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
        if(obj.hasOwnProperty(key)){
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
            extendObject[key] = AMP.extend(isDeep, clone, copy);

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
   * @param {Object|Function} protoProp プロトタイプオブジェクト、もしくはsubClass
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  AMP._extend = function(protoProp, staticProp){
    var parent = this,
    child;

    if(AMP.isFunction(protoProp)){
      staticProp = protoProp;
      protoProp = protoProp.prototype;
    }

    if(protoProp && protoProp.constructor) {
      child = protoProp.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    AMP.extend(true, child, parent, staticProp);

    var Substitute = function(){ this.constructor = child; };
    Substitute.prototype = parent.prototype;
    child.prototype = new Substitute();

    if(protoProp){
      AMP.extend(true, child.prototype, protoProp);
    }

    child.__super__ = parent.prototype;

    return child;
  };


  /**
   * <h4>hashの取得し、#を省いた文字列を配列に格納して返す</h4>
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
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method getRatio
   * @return {Number}
   */
  AMP.getRatio = function(){
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
   * <h4>リクエストパラメータの値を連想配列として取得</h4>
   *
   * @static
   * @method queryHashMap
   * @return {Object} クエリを格納した連想配列を返す
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


  /**
   * <h4>空白文字を削除して返す</h4>
   *
   * @method removeSpaceChara
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  AMP.removeSpaceChara = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  AMP.toString = function(){
    return '[object AMP]';
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String} UUIDを生成して返す
   */
  AMP.uuid = function(){
    var d = AMP.digit;
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
  AMP.xmlToString = function(xml){
    if(AMP.hasXMLSerializer()){
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
    @method Fallbacks
  ----------------------------------------------------------------------*/

  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
   *
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number} タイマーNumber
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
   * @method cancelAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number} タイマーNumber
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
   * performance.nowメソッドをExportしています
   * performanceに対応していないブラウザはgetTimeを返します
   *
   * @static
   * @method now
   * @type {Number} 現在の時間(ミリ秒)を返します
   */
  AMP.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());


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
    if(AMP.isObject(obj)){
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



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  root.AMP = AMP;



}(window));
