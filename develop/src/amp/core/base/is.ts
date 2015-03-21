module AMP {

  /*======================================================================
   オブジェクト,ブラウザを判定します
  ======================================================================*/

  // params
  var
  ua = navigator.userAgent.toLowerCase(),
  toString = Object.prototype.toString;


  /*----------------------------------------------------------------------
   @property
  ----------------------------------------------------------------------*/

  /**
   * developモード
   * developモードは、エラー時コンソールログを出力します
   *
   * @static
   * @property isDevelop
   * @type {Boolean}
   */
  export var isDevelop: boolean = false;


  /*----------------------------------------------------------------------
   @method
  ----------------------------------------------------------------------*/

  /* isType
  -----------------------------------------------------------------*/

  /**
   * 配列型判定
   *
   * @static
   * @method isArray
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isArray = Array.isArray || function (obj): boolean {
    return toString.call(obj) === '[object Array]';
  };


  /**
   * 真偽型判定
   *
   * @static
   * @method isBoolean
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isBoolean = function (obj): boolean {
    return toString.call(obj) === '[object Boolean]';
  };


  /**
   * 関数型判定
   *
   * @static
   * @method isFunction
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isFunction = function (obj): boolean {
    return toString.call(obj) === '[object Function]';
  };


  /**
   * 数値型判定
   *
   * @static
   * @method isNumber
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isNumber = function (obj): boolean {
    return toString.call(obj) === '[object Number]';
  };


  /**
   * オブジェクト型判定
   * プレーンオブジェクト
   *
   * @static
   * @method isObject
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isObject = function (obj): boolean {
    return !!obj && toString.call(obj) === '[object Object]';
  };


  /**
   * 文字列型判定
   *
   * @static
   * @method isString
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isString = function (obj): boolean {
    return toString.call(obj) === '[object String]';
  };


  /**
   * 正規表現判定
   *
   * @method isRegexp
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isRegexp = function (obj): boolean {
    return toString.call(obj) === '[object RegExp]';
  };


  /**
   * undefined判定
   *
   * @method isUndefined
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isUndefined = function (obj): boolean {
    return obj === void 0;
  };


  /**
   * null判定
   *
   * @method isNull
   * @param  {Object} obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isNull = function (obj): boolean {
    return obj === null || toString.call(obj) === '[object Null]';
  };


  /* Number
  -----------------------------------------------------------------*/

  /**
   * ポジティブ値判定
   *
   * @method isPositive
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  export var isPositive = function (num: number): boolean {
    return (<any>AMP).isNumber(num) && num > 0;
  };


  /**
   * ネガティブ値判定
   *
   * @method isPositive
   * @param  {Number} num 判定したい数値
   * @return {Boolean}
   */
  export var isNegative = function (num: number): boolean {
    return (<any>AMP).isNumber(num) && num < 0;
  };


  /**
   * 割りきれるか判定
   *
   * @method isBreakNumber
   * @param  {Number} num 判定したい数値
   * @param  {Number} breakNun 判定したい数値を割る数値
   * @return {Boolean}
   */
  export var isBreakNumber = function (num: number, breakNun: number): boolean {
    return (<any>AMP).isNumber(num) && num % breakNun === 0;
  };


  /* Object
  -----------------------------------------------------------------*/

  /**
   * 空のオブジェクト判定
   *
   * @method isEmptyObject
   * @param  {Object}  obj 判定したいオブジェクト
   * @return {Boolean}
   */
  export var isEmptyObject = function (obj): boolean {
    for (var key in obj) {
      return false;
    }
    return true;
  };


  /* OS
  -----------------------------------------------------------------*/

  /**
   * OS判定
   *
   * @static
   * @method isOS
   * @param  {String} key OS名 (windows, windowsPhone, mac, ios, android)
   * @param  {String | Number} ver バージョンナンバー Android ios のみ有効
   * @return {Boolean}
   */
  export var isOS = function (key: string, ver): boolean {
    var k = key.toLowerCase();

    if (k.indexOf('windows') > -1) {
      return (<any>AMP).isWindows();

    } else if (k.indexOf('windowsphone') > -1) {
      return (<any>AMP).isWindowsPhone();

    } else if (k.indexOf('mac') > -1) {
      return (<any>AMP).isMac();

    } else if (k.indexOf('ios') > -1) {
      return (<any>AMP).isIos(ver);

    } else if (k.indexOf('android') > -1) {
      return (<any>AMP).isAndroid(ver);
    }
  };


  /**
   * Windows判定
   *
   * @static
   * @method isWindows
   * @return {Boolean}
   */
  export var isWindows = function (): boolean {
    return ua.indexOf('windows') > -1;
  };


  /**
   * WindowsPhone判定 βver
   *
   * @static
   * @method isWindowsPhone
   * @return {Boolean}
   */
  export var isWindowsPhone = function (): boolean {
    return ua.indexOf('windows phone') > -1;
  };


  /**
   * Mac判定
   * isoは、含みません。
   *
   * @static
   * @method isMac
   * @return {Boolean}
   */
  export var isMac = function (): boolean {
    return ua.indexOf('mac os') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * ios判定
   *
   * @static
   * @method isIos
   * @param {Number | String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  export var isIos = function (ver): boolean {
    if (ver) {
      var serial = ('' + ver).replace(/\./g, '_');
      return ua.indexOf('os ' + serial) > -1;
    } else {
      return ua.indexOf('os') > -1 && ua.indexOf('mobile') > -1;
    }
  };


  /**
   * Android判定
   *
   * @static
   * @method isAndroid
   * @param {Number | String} バージョンナンバー 省略可
   * @return {Boolean}
   */
  export var isAndroid = function (ver): boolean {
    if (ver) {
      return ua.indexOf('android ' + ver) > -1;
    } else {
      return ua.indexOf('android') > -1;
    }
  };


  /* Device
   -----------------------------------------------------------------*/

  /**
   * デバイス判定
   *
   * @static
   * @method isDevice
   * @param {String} デバイス名
   * (pc, sd, smartdevice, sp, smartphone, tb, tablet, iphone, ipad, ipod, androidphone, androidtablet)
   * @return {Boolean}
   */
  export var isDevice = function (key: string): boolean {
    var k = key.toLowerCase();

    if (k === 'pc') {
      return (<any>AMP).isPC();

    } else if (k === 'sd' || k === 'smartdevice') {
      return (<any>AMP).isSmartDevice();

    } else if (k === 'sp' || k === 'smartphone') {
      return (<any>AMP).isSmartPhone();

    } else if (k === 'tb' || k === 'tablet') {
      return (<any>AMP).isTablet();

    } else if (k === 'iphone') {
      return (<any>AMP).isIPhone();

    } else if (k === 'ipad') {
      return (<any>AMP).isIPad();

    } else if (k === 'ipod') {
      return (<any>AMP).isIPod();

    } else if (k === 'android') {
      return (<any>AMP).isAndroidPhone();

    } else if (k === 'androidtablet') {
      return (<any>AMP).isAndroidTablet();
    }
  };


  /**
   * PC判定
   *
   * @static
   * @method isPC
   * @return {Boolean}
   */
  export var isPC = function (): boolean {
    return (<any>AMP).isOS('windows') || (<any>AMP).isOS('mac');
  };


  /**
   * SmartDevice判定
   *
   * @static
   * @method isSmartDevice
   * @return {Boolean}
   */
  export var isSmartDevice = function (): boolean {
    return (<any>AMP).isOS('ios') || (<any>AMP).isOS('android');
  };


  /**
   * SmartPhone判定
   *
   * @static
   * @method isSmartPhone
   * @return {Boolean}
   */
  export var isSmartPhone = function (): boolean {
    return ua.indexOf('iphone') > -1 || (<any>AMP).isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * Tablet判定
   *
   * @static
   * @method isTablet
   * @return {Boolean}
   */
  export var isTablet = function (): boolean {
    return ua.indexOf('ipad') > -1 || (<any>AMP).isOS('android') && ua.indexOf('mobile') < 0;
  };


  /**
   * iPhone判定
   *
   * @static
   * @method isIPhone
   * @return {Boolean}
   */
  export var isIPhone = function (): boolean {
    return ua.indexOf('iphone') > -1;
  };


  /**
   * iPad判定
   *
   * @static
   * @method isIPad
   * @return {Boolean}
   */
  export var isIPad = function (): boolean {
    return ua.indexOf('ipad') > -1;
  };


  /**
   * iPod判定
   *
   * @static
   * @method isIPod
   * @return {Boolean}
   */
  export var isIPod = function (): boolean {
    return ua.indexOf('ipod') > -1;
  };


  /**
   * Android判定
   *
   * @static
   * @method isAndroidPhone
   * @return {Boolean}
   */
  export var isAndroidPhone = function (): boolean {
    return (<any>AMP).isOS('android') && ua.indexOf('mobile') > -1;
  };


  /**
   * AndroidTablet判定
   *
   * @static
   * @method isAndroidTablet
   * @return {Boolean}
   */
  export var isAndroidTablet = function (): boolean {
    return (<any>AMP).isOS('android') && ua.indexOf('mobile') < 0;
  };


  /* Browser
   -----------------------------------------------------------------*/

  /**
   * ブラウザ判定
   *
   * @static
   * @method isBrowser
   * @param  {String} key ブラウザ名
   * (ie, chrome, safari, firefox, opera, mobileSafari, android, webkit)
   * @param  {String | Number} ver バージョン (ie, mobileSafari, android) 省略可
   * @param  {String} pun ie指定バージョン範囲 (prev, later) 省略可
   * @return {Boolean}
   */
  export var isBrowser = function (key: string, ver, pun: string): boolean {
    var k = key.toLowerCase();

    if (k === 'ie') {
      if (pun) {
        return (<any>AMP).isIEScope(ver, pun);
      } else {
        return (<any>AMP).isIE(ver);
      }

    } else if (k === 'chrome') {
      return (<any>AMP).isChrome();

    } else if (k === 'firefox') {
      return (<any>AMP).isFirefox();

    } else if (k === 'safari') {
      return (<any>AMP).isSafari();

    } else if (k === 'opera') {
      return (<any>AMP).isOpera();

    } else if (k === 'mobilesafari') {
      return (<any>AMP).isMobileSafari(ver);

    } else if (k === 'android') {
      return (<any>AMP).isAndroidBrowser(ver);

    } else if (k === 'webkit') {
      return (<any>AMP).isWebkit();
    }
  };


  /**
   * IE判定
   *
   * @static
   * @method isIE
   * @param  {Number}  ver バージョンナンバー 省略可
   * @return {Boolean}
   */
  export var isIE = function (ver): boolean {
    if (!ver) {
      return ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1;
    } else {
      return ua.indexOf('msie ' + ver) > -1 || (ua.indexOf('trident') > -1 && ua.indexOf('rv:' + ver) > -1);
    }
  };


  /**
   * IEのバージョン範囲判定
   *
   * @static
   * @method isIEScope
   * @param  {Number}  ver バージョンナンバー
   * @param  {String}  pun 以前・以降 (prev, later)
   * @return {Boolean}
   */
  export var isIEScope = function (ver, pun: string): boolean {
    var current, index;
    ver = Number(ver);

    // Legacy IE
    if (ua.indexOf('msie') > -1) {
      index = ua.indexOf('msie ') + 5;

      // Modern IE
    } else if (ua.indexOf('trident') > -1) {
      index = ua.indexOf('rv:') + 3;
    }

    if (0 < index) {
      current = Number(ua.substring(index, index + 2));

      if (pun === 'later') {
        return current >= ver;
      } else {
        return current <= ver;
      }
    } else {
      return false;
    }
  };


  /**
   * PC版chrome判定
   *
   * @static
   * @method isChrome
   * @return {Boolean}
   */
  export var isChrome = function (): boolean {
    return ua.indexOf('chrome') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * PC版Firefox判定
   *
   * @static
   * @method isFirefox
   * @return {Boolean}
   */
  export var isFirefox = function (): boolean {
    return ua.indexOf('firefox') > -1 && ua.indexOf('mobile') < 0;
  };


  /**
   * PC版Safari判定
   *
   * @static
   * @method isSafari
   * @return {Boolean}
   */
  export var isSafari = function (): boolean {
    return ua.indexOf('safari') > -1 && ua.indexOf('mobile') < 0 && !(<any>AMP).isChrome();
  };


  /**
   * PC版Opera判定
   *
   * @static
   * @method isOpera
   * @return {Boolean}
   */
  export var isOpera = function (): boolean {
    return ua.indexOf(' opr/') > -1 || (ua.indexOf('opera/') > -1 && ua.indexOf('mobile') < 0);
  };


  /**
   * MobileSafari判定
   *
   * @static
   * @method isMobileSafari
   * @param {Number | String} ver バージョンナンバー  省略可
   * @return {Boolean}
   */
  export var isMobileSafari = function (ver) {
    if (ver) {
      return (<any>AMP).isIos(ver) && ua.indexOf('safari') > -1;
    } else {
      return (<any>AMP).isIos() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * Android Browser判定
   *
   * @static
   * @method isAndroidBrowser
   * @param {Number | String} ver バージョンナンバー 省略可
   * @return {Boolean}
   */
  export var isAndroidBrowser = function (ver) {
    if (ver) {
      return (<any>AMP).isAndroid(ver) && ua.indexOf('safari') > -1;
    } else {
      return (<any>AMP).isAndroid() && ua.indexOf('safari') > -1;
    }
  };


  /**
   * webkit ブラウザ判定
   *
   * @static
   * @method isWebkit
   * @return {Boolean}
   */
  export var isWebkit = function (): boolean {
    return ua.indexOf('webkit') > -1;
  };

}
