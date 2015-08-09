/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

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
   * windows, windowsPhone, mac, ios, android
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
   * ie, edge, chrome, safari, firefox, opera, mobileSafari, android, webkit
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
