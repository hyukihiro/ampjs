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


  /**
   * <h4>正規表現判定</h4>
   *
   * @method isRegexp
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isRegexp = function(obj) {
    return toString.call(obj) === '[object RegExp]';
  };


  /**
   * <h4>undefined判定</h4>
   *
   * @method isUndefined
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isUndefined = function(obj){
    return obj === void 0;
  };


  /**
   * <h4>null判定</h4>
   *
   * @method isNull
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  amp.isNull = function(obj) {
    return obj === null || toString.call(obj) === '[object Null]';
  };


  /* Number
  -----------------------------------------------------------------*/

  /**
   * <h4>ポジティブ値判定</h4>
   *
   * @method isPositive
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  amp.isPositive = function(num){
    return amp.isNumber(num) && num > 0;
  };


  /**
   * <h4>ネガティブ値判定</h4>
   *
   * @method isPositive
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  amp.isNegative = function(num){
    return amp.isNumber(num) && num < 0;
  };


  /**
   * <h4>割りきれるか判定</h4>
   *
   * @method isBreakNumber
   * @param  {Number} num 判定したい数値
   * @param  {Number} num 割る数値
   * @return {Boolean}
   */
  amp.isBreakNumber = function(num, breakNun) {
    return amp.isNumber(num) && num % breakNun === 0;
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
