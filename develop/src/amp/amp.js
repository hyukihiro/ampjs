;(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  // console.logがないブラウザは、空の関数を返す
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }


  var
  url        = root.location,
  ua         = navigator.userAgent.toLowerCase(),
  doc        = document,
  html       = doc.documentElement,
  css3Prefix = ['', '-ms-', '-moz-', '-webkit-'],
  ieSupports = {min: 8, max: 12},
  toString   = Object.prototype.toString;


  // @namespace
  /**
   * <h4>amp</h4>
   *
   * @class amp
   **/
  var amp = {};



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
  amp.VERSION = '1.5';


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
   * @param {String} デバイス名 ['sd', 'smartdevice', 'sp', 'smartphone', 'tb', 'tablet', 'iphone', 'ipad', 'ipod', 'android', 'androidtablet', 'touchscreen', 'mspointer']
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
    return root.devicePixelRatio;
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
    @method Fallback
  ----------------------------------------------------------------------*/

  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutで代替処理を行います
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
   * 対応していないブラウザは、clearTimeoutで代替処理を行います
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




  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  root.amp = amp;



}(window));
