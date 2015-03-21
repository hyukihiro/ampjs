/**
 * AMP.JS JavaScript Library
 *
 * Author: Yoshihito Fujiwara
 * Source: https://bitbucket.org/cutupworks/ampjs
 *
 * @licence MIT Licence
 *
 * Copyright (c) 2015 Yoshihito Fujiwara
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


(function (root) {
    //'use strict';
    /*======================================================================
     AMP基本設定
    ======================================================================*/
    // クラス基本設定
    var CLASS_NAME = 'Amp', VERSION = '3.0';
    /*--------------------------------------------------------------------------
     config
    --------------------------------------------------------------------------*/
    // consoleがなければ空の関数を返す
    if (!('console' in root)) {
        root.console = {
            log: function () {
            }
        };
    }
    /*--------------------------------------------------------------------------
     @constructor
    --------------------------------------------------------------------------*/
    /**
     * Amp
     *
     * @class Amp
     * @constructor
     **/
    function Amp(className) {
        if (typeof className === 'string') {
            this._name = className;
        }
    }
    /*----------------------------------------------------------------------
     @property
    ----------------------------------------------------------------------*/
    /**
     * バージョン情報
     *
     * @static
     * @property VERSION
     * @type {String}
     */
    Amp.VERSION = VERSION;
    /**
     * コンストラクタ名
     *
     * @private
     * @property name
     * @type {String}
     */
    Amp.prototype._name = CLASS_NAME;
    /*----------------------------------------------------------------------
     @method
    ----------------------------------------------------------------------*/
    /**
     * クラス名を返す
     *
     * @method toString
     * @return {String} クラス名を返す
     */
    Amp.prototype.toString = function () {
        return '[object ' + this._name + ']';
    };
    /*----------------------------------------------------------------------
     export
    ----------------------------------------------------------------------*/
    /**
     * AMP
     *
     * @module AMP
     **/
    root.AMP = new Amp(CLASS_NAME);
    root.AMP.Amp = Amp;
}(window));

var AMP;
(function (AMP) {
    /*======================================================================
      配列処理
    ======================================================================*/
    /**
     * each処理を行います
     *
     * @method each
     * @param  {Object}   obj      イテレーションを行うオブジェクト
     * @param  {Function} callback イテレーション毎のコールバック関数
     * @return {Object} 第一引数に渡されたオブジェクト
     */
    AMP.each = function (obj, callback /*: void */) {
        var isContinue, i;
        if (AMP.isArray(obj)) {
            var l = obj.length;
            i = 0;
            for (; i < l; i += 1) {
                isContinue = callback.call(obj[i], obj[i], i);
                if (isContinue === false) {
                    break;
                }
            }
        }
        else {
            for (i in obj) {
                isContinue = callback.call(obj[i], obj[i], i);
                if (isContinue === false) {
                    break;
                }
            }
        }
        return obj;
    };
})(AMP || (AMP = {}));

(function (root) {
    // 'use strict';
    /*======================================================================
      ブラウザ対応していない機能をフォールバックします
    ======================================================================*/
    /*----------------------------------------------------------------------
      @method
    ----------------------------------------------------------------------*/
    /**
     * forEach
     * 配列の各要素に対して、指定された処理を実行します
     * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
     *
     * @static
     * @method Array.forEach
     * @type {Void}
     */
    Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
        if (this === null) {
            throw new TypeError('this is null or not defined');
        }
        var i = 0, l = this.length;
        for (; i < l; i += 1) {
            callback.call(context || null, this[i], i, this);
        }
    };
    /**
     * 連想配列の要素数取得
     * Object.keys未実装のブラウザに、フォールバックして処理を追加しています
     *
     * @method Object.keys
     * @param  {Object} obj
     * @return {Void}
     */
    Object.keys = Object.keys || function (obj) {
        if (AMP.isObject(obj)) {
            var size = 0, prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop) && prop !== 'length') {
                    size += 1;
                }
            }
            obj.length = size;
        }
    };
}(window));

var AMP;
(function (AMP) {
    /*======================================================================
     所持判定
    ======================================================================*/
    // params
    var url = window.location, doc = document, html = doc.documentElement;
    /**
     * applicationCache機能の有無
     *
     * @static
     * @method hasAppCache
     * @return {Boolean}
     */
    AMP.hasAppCache = function () {
        return 'applicationCache' in window;
    };
    /**
     * Geolocation機能の有無
     *
     * @static
     * @method hasGeolocation
     * @return {Boolean}
     */
    AMP.hasGeolocation = function () {
        return 'geolocation' in navigator;
    };
    /**
     * pushState機能の有無
     *
     * @static
     * @method hasPushState
     * @return {Boolean}
     */
    AMP.hasPushState = function () {
        return 'pushState' in window.history;
    };
    /**
     * RequestAnimationFrame機能の有無
     *
     * @static
     * @method hasReqAnime
     * @return {Boolean}
     */
    AMP.hasReqAnime = function () {
        return !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
    };
    /**
     * ストレージ機能の有無
     *
     * @static
     * @method hasStorage
     * @return {Boolean}
     */
    AMP.hasStorage = function () {
        return 'sessionStorage' in window && 'localStorage' in window;
    };
    /**
     * WebSocket機能の有無
     *
     * @static
     * @method hasWebSocket
     * @return {Boolean}
     */
    AMP.hasWebSocket = function () {
        return 'WebSocket' in window;
    };
    /**
     * WebWorker機能の有無
     *
     * @static
     * @method hasWebWorker
     * @return {Boolean}
     */
    AMP.hasWebWorker = function () {
        return 'Worker' in window;
    };
    /**
     * audio機能の有無
     *
     * @static
     * @method hasAudio
     * @return {Boolean}
     */
    AMP.hasAudio = function () {
        // hack for ietester
        if (AMP.isBrowser('ie', 9)) {
            return true;
        }
        else {
            return !!doc.createElement('audio').canPlayType;
        }
    };
    /**
     * canvas機能の有無
     *
     * @static
     * @method hasCanvas
     * @return {Boolean}
     */
    AMP.hasCanvas = function () {
        return !!doc.createElement('canvas').getContext;
    };
    /**
     * hashの有無
     *
     * @static
     * @method hasHash
     * @param {String} key ハッシュ名 省略可
     * @return {Boolean}
     */
    AMP.hasHash = function (key) {
        var flag = false;
        if (url.href.indexOf('#') > -1) {
            if (key) {
                var k = key.replace(/^#/, ''), vals = url.hash.split('#'), i = 1, l = vals.length;
                for (; i < l; i += 1) {
                    if (k === vals[i]) {
                        flag = true;
                        break;
                    }
                }
            }
            else {
                flag = true;
            }
        }
        return flag;
    };
    /**
     * MsPointer判定 βver
     *
     * @static
     * @method isMsPointer
     * @return {Boolean}
     */
    AMP.hasMsPointer = function () {
        return window.navigator.msPointerEnabled > -1;
    };
    /**
     * 文字列があるか判定
     *
     * @method hasString
     * @param  {String}  str   対象の文字列
     * @param  {String}  haStr 検索文字
     * @return {Boolean}
     */
    AMP.hasString = function (str, hasStr) {
        return AMP.isString(str) && str.indexOf(hasStr) > -1;
    };
    /**
     * SVG機能の有無
     *
     * @static
     * @method hasSVG
     * @return {Boolean}
     */
    AMP.hasSVG = function () {
        return 'SVGAngle' in window;
    };
    /**
     * TouchScreen判定
     *
     * @static
     * @method hasTouchScreen
     * @return {Boolean}
     */
    AMP.hasTouchScreen = (function () {
        var hasTouchScreen, div = doc.createElement('div');
        div.setAttribute('ontouchstart', 'return');
        hasTouchScreen = (typeof div.ontouchstart === 'function');
        return function () {
            return hasTouchScreen;
        };
    }());
    /**
     * video機能の有無
     *
     * @static
     * @method hasVideo
     * @return {Boolean}
     */
    AMP.hasVideo = function () {
        // hack for ietester
        if (AMP.isBrowser('ie', 9)) {
            return true;
        }
        else {
            return !!doc.createElement('video').canPlayType;
        }
    };
    /**
     * XMLSerializerの有無
     *
     * @static
     * @method hasXMLSerializer
     * @return {Boolean}
     */
    AMP.hasXMLSerializer = function () {
        return 'XMLSerializer' in window;
    };
    /**
     * css3 transition機能の有無
     *
     * @static
     * @method hasTransition
     * @return {Boolean}
     */
    AMP.hasTransition = function () {
        var props = ['transition', '-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'], i = 0, l = props.length, flag = false;
        for (; i < l; i += 1) {
            if (props[i] in html.style) {
                flag = true;
                break;
            }
        }
        return flag;
    };
})(AMP || (AMP = {}));

var AMP;
(function (AMP) {
    /*======================================================================
     オブジェクト,ブラウザを判定します
    ======================================================================*/
    // params
    var ua = navigator.userAgent.toLowerCase(), toString = Object.prototype.toString;
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
    AMP.isDevelop = false;
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
    AMP.isArray = Array.isArray || function (obj) {
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
    AMP.isBoolean = function (obj) {
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
    AMP.isFunction = function (obj) {
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
    AMP.isNumber = function (obj) {
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
    AMP.isObject = function (obj) {
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
    AMP.isString = function (obj) {
        return toString.call(obj) === '[object String]';
    };
    /**
     * 正規表現判定
     *
     * @method isRegexp
     * @param  {Object} obj 判定したいオブジェクト
     * @return {Boolean}
     */
    AMP.isRegexp = function (obj) {
        return toString.call(obj) === '[object RegExp]';
    };
    /**
     * undefined判定
     *
     * @method isUndefined
     * @param  {Object} obj 判定したいオブジェクト
     * @return {Boolean}
     */
    AMP.isUndefined = function (obj) {
        return obj === void 0;
    };
    /**
     * null判定
     *
     * @method isNull
     * @param  {Object} obj 判定したいオブジェクト
     * @return {Boolean}
     */
    AMP.isNull = function (obj) {
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
    AMP.isPositive = function (num) {
        return AMP.isNumber(num) && num > 0;
    };
    /**
     * ネガティブ値判定
     *
     * @method isPositive
     * @param  {Number} num 判定したい数値
     * @return {Boolean}
     */
    AMP.isNegative = function (num) {
        return AMP.isNumber(num) && num < 0;
    };
    /**
     * 割りきれるか判定
     *
     * @method isBreakNumber
     * @param  {Number} num 判定したい数値
     * @param  {Number} breakNun 判定したい数値を割る数値
     * @return {Boolean}
     */
    AMP.isBreakNumber = function (num, breakNun) {
        return AMP.isNumber(num) && num % breakNun === 0;
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
    AMP.isEmptyObject = function (obj) {
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
    AMP.isOS = function (key, ver) {
        var k = key.toLowerCase();
        if (k.indexOf('windows') > -1) {
            return AMP.isWindows();
        }
        else if (k.indexOf('windowsphone') > -1) {
            return AMP.isWindowsPhone();
        }
        else if (k.indexOf('mac') > -1) {
            return AMP.isMac();
        }
        else if (k.indexOf('ios') > -1) {
            return AMP.isIos(ver);
        }
        else if (k.indexOf('android') > -1) {
            return AMP.isAndroid(ver);
        }
    };
    /**
     * Windows判定
     *
     * @static
     * @method isWindows
     * @return {Boolean}
     */
    AMP.isWindows = function () {
        return ua.indexOf('windows') > -1;
    };
    /**
     * WindowsPhone判定 βver
     *
     * @static
     * @method isWindowsPhone
     * @return {Boolean}
     */
    AMP.isWindowsPhone = function () {
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
    AMP.isMac = function () {
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
    AMP.isIos = function (ver) {
        if (ver) {
            var serial = ('' + ver).replace(/\./g, '_');
            return ua.indexOf('os ' + serial) > -1;
        }
        else {
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
    AMP.isAndroid = function (ver) {
        if (ver) {
            return ua.indexOf('android ' + ver) > -1;
        }
        else {
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
    AMP.isDevice = function (key) {
        var k = key.toLowerCase();
        if (k === 'pc') {
            return AMP.isPC();
        }
        else if (k === 'sd' || k === 'smartdevice') {
            return AMP.isSmartDevice();
        }
        else if (k === 'sp' || k === 'smartphone') {
            return AMP.isSmartPhone();
        }
        else if (k === 'tb' || k === 'tablet') {
            return AMP.isTablet();
        }
        else if (k === 'iphone') {
            return AMP.isIPhone();
        }
        else if (k === 'ipad') {
            return AMP.isIPad();
        }
        else if (k === 'ipod') {
            return AMP.isIPod();
        }
        else if (k === 'android') {
            return AMP.isAndroidPhone();
        }
        else if (k === 'androidtablet') {
            return AMP.isAndroidTablet();
        }
    };
    /**
     * PC判定
     *
     * @static
     * @method isPC
     * @return {Boolean}
     */
    AMP.isPC = function () {
        return AMP.isOS('windows') || AMP.isOS('mac');
    };
    /**
     * SmartDevice判定
     *
     * @static
     * @method isSmartDevice
     * @return {Boolean}
     */
    AMP.isSmartDevice = function () {
        return AMP.isOS('ios') || AMP.isOS('android');
    };
    /**
     * SmartPhone判定
     *
     * @static
     * @method isSmartPhone
     * @return {Boolean}
     */
    AMP.isSmartPhone = function () {
        return ua.indexOf('iphone') > -1 || AMP.isOS('android') && ua.indexOf('mobile') > -1;
    };
    /**
     * Tablet判定
     *
     * @static
     * @method isTablet
     * @return {Boolean}
     */
    AMP.isTablet = function () {
        return ua.indexOf('ipad') > -1 || AMP.isOS('android') && ua.indexOf('mobile') < 0;
    };
    /**
     * iPhone判定
     *
     * @static
     * @method isIPhone
     * @return {Boolean}
     */
    AMP.isIPhone = function () {
        return ua.indexOf('iphone') > -1;
    };
    /**
     * iPad判定
     *
     * @static
     * @method isIPad
     * @return {Boolean}
     */
    AMP.isIPad = function () {
        return ua.indexOf('ipad') > -1;
    };
    /**
     * iPod判定
     *
     * @static
     * @method isIPod
     * @return {Boolean}
     */
    AMP.isIPod = function () {
        return ua.indexOf('ipod') > -1;
    };
    /**
     * Android判定
     *
     * @static
     * @method isAndroidPhone
     * @return {Boolean}
     */
    AMP.isAndroidPhone = function () {
        return AMP.isOS('android') && ua.indexOf('mobile') > -1;
    };
    /**
     * AndroidTablet判定
     *
     * @static
     * @method isAndroidTablet
     * @return {Boolean}
     */
    AMP.isAndroidTablet = function () {
        return AMP.isOS('android') && ua.indexOf('mobile') < 0;
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
    AMP.isBrowser = function (key, ver, pun) {
        var k = key.toLowerCase();
        if (k === 'ie') {
            if (pun) {
                return AMP.isIEScope(ver, pun);
            }
            else {
                return AMP.isIE(ver);
            }
        }
        else if (k === 'chrome') {
            return AMP.isChrome();
        }
        else if (k === 'firefox') {
            return AMP.isFirefox();
        }
        else if (k === 'safari') {
            return AMP.isSafari();
        }
        else if (k === 'opera') {
            return AMP.isOpera();
        }
        else if (k === 'mobilesafari') {
            return AMP.isMobileSafari(ver);
        }
        else if (k === 'android') {
            return AMP.isAndroidBrowser(ver);
        }
        else if (k === 'webkit') {
            return AMP.isWebkit();
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
    AMP.isIE = function (ver) {
        if (!ver) {
            return ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1;
        }
        else {
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
    AMP.isIEScope = function (ver, pun) {
        var current, index;
        ver = Number(ver);
        // Legacy IE
        if (ua.indexOf('msie') > -1) {
            index = ua.indexOf('msie ') + 5;
        }
        else if (ua.indexOf('trident') > -1) {
            index = ua.indexOf('rv:') + 3;
        }
        if (0 < index) {
            current = Number(ua.substring(index, index + 2));
            if (pun === 'later') {
                return current >= ver;
            }
            else {
                return current <= ver;
            }
        }
        else {
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
    AMP.isChrome = function () {
        return ua.indexOf('chrome') > -1 && ua.indexOf('mobile') < 0;
    };
    /**
     * PC版Firefox判定
     *
     * @static
     * @method isFirefox
     * @return {Boolean}
     */
    AMP.isFirefox = function () {
        return ua.indexOf('firefox') > -1 && ua.indexOf('mobile') < 0;
    };
    /**
     * PC版Safari判定
     *
     * @static
     * @method isSafari
     * @return {Boolean}
     */
    AMP.isSafari = function () {
        return ua.indexOf('safari') > -1 && ua.indexOf('mobile') < 0 && !AMP.isChrome();
    };
    /**
     * PC版Opera判定
     *
     * @static
     * @method isOpera
     * @return {Boolean}
     */
    AMP.isOpera = function () {
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
    AMP.isMobileSafari = function (ver) {
        if (ver) {
            return AMP.isIos(ver) && ua.indexOf('safari') > -1;
        }
        else {
            return AMP.isIos() && ua.indexOf('safari') > -1;
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
    AMP.isAndroidBrowser = function (ver) {
        if (ver) {
            return AMP.isAndroid(ver) && ua.indexOf('safari') > -1;
        }
        else {
            return AMP.isAndroid() && ua.indexOf('safari') > -1;
        }
    };
    /**
     * webkit ブラウザ判定
     *
     * @static
     * @method isWebkit
     * @return {Boolean}
     */
    AMP.isWebkit = function () {
        return ua.indexOf('webkit') > -1;
    };
})(AMP || (AMP = {}));

var AMP;
(function (AMP) {
    /*======================================================================
      locationオブジェクトを扱います
    ======================================================================*/
    // params
    var url = window.location;
    /**
     * hashの取得し、#を省いた文字列を配列に格納して返す
     *
     * @static
     * @method getHash
     * @return {Array}
     */
    AMP.getHash = function () {
        if (url.hash.length) {
            return url.hash.split('#').slice(1);
        }
    };
    /**
     * リクエストパラメータの値を連想配列として取得
     *
     * @static
     * @method queryHashMap
     * @return {Object}
     */
    AMP.queryHashMap = function () {
        var map, array = [], param = url.search.slice(1).split('&');
        if (param[0] !== '') {
            var i = 0, l = param.length;
            map = {};
            for (; i < l; i += 1) {
                array = param[i].split('=');
                map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
            }
        }
        return map;
    };
})(AMP || (AMP = {}));

var AMP;
(function (AMP) {
    /*======================================================================
      文字列を扱います
    ======================================================================*/
    /**
     * id生成(文字列にナンバーを追加)して返します
     *
     * @static
     * @method createId
     * @param {String} str id名 初期値: 'cid' 省略可
     * @return {String}
     */
    AMP.createId = (function () {
        var count = 0;
        return function (str) {
            str = str ? str : 'cid';
            return str + (count += 1);
        };
    }());
    /**
     * ランダムな4桁のコードを返す
     *
     * @static
     * @method digit
     * @return {String}
     */
    AMP.digit = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    /**
     * 空白文字を削除して返す
     *
     * @method replaceSpace
     * @param  {String} str 対象の文字列
     * @return {String}
     */
    AMP.replaceSpace = function (str) {
        return str.replace(/\s+/g, '');
    };
    /**
     * UUIDの生成して返す
     *
     * @static
     * @method uuid
     * @return {String}
     */
    AMP.uuid = function () {
        var d = AMP.digit;
        return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
    };
})(AMP || (AMP = {}));

var AMP;
(function (AMP) {
    /*======================================================================
      基本ユーティリティ
    ======================================================================*/
    /**
     * 関数名を返す
     *
     * @method getFunctionName
     * @param  {Function} fn 名前を取得したい関数
     * @return {String}
     */
    AMP.getFunctionName = function (fn) {
        if ('name' in fn) {
            return fn.name;
        }
        else {
            return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
        }
    };
    /**
     * ミックスイン
     *
     * @method mixin
     * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
     * @param {Object} arguments 拡張するオブジェクト
     * @return {Object} 拡張したオブジェクトを返します
     */
    AMP.mixin = function (isDeep) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var baseObj, obj, copy, clone, data, key, isArray;
        isDeep = AMP.isBoolean(isDeep) && isDeep;
        baseObj = args[0];
        var i = 1, l = args.length;
        for (; i < l; i += 1) {
            obj = args[i];
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    data = baseObj[key];
                    copy = obj[key];
                    // マージデータが同じなら次のループへ
                    if (baseObj === copy) {
                        continue;
                    }
                    isArray = AMP.isArray(copy);
                    if (isDeep && copy && AMP.isObject(copy) || isArray) {
                        if (isArray) {
                            clone = data && AMP.isArray(data) ? data : [];
                        }
                        else {
                            clone = data && AMP.isObject(data) ? data : {};
                        }
                        // ネスト構造を再帰処理
                        baseObj[key] = AMP.mixin(isDeep, clone, copy);
                    }
                    else if (!AMP.isUndefined(copy)) {
                        baseObj[key] = copy;
                    }
                }
            }
        }
        return baseObj;
    };
    /**
     * 画面のピクセル比を返す
     *
     * @static
     * @method pixelRatio
     * @return {Number}
     */
    AMP.pixelRatio = function () {
        return window.devicePixelRatio || 1;
    };
    /**
     * 画像のプリロード
     *
     * @static
     * @method preload
     * @param {String} src 画像パス
     * @return {Image} 生成した、イメージオブジェクト
     */
    AMP.preload = function (src) {
        var img = new Image();
        img.src = src;
        return img;
    };
    /**
     * requestAnimationFrameをエクスポートしています
     * 対応していないブラウザは、setTimeoutでフォールバックします
     *
     * @method requestAnimationFrame
     * @param {Function} callback コールバック関数
     * @return {Number}
     */
    AMP.requestAnimationFrame = (function () {
        var requestAnimation = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        });
        // contextの処理追加予定
        return function (callback) {
            return requestAnimation(callback);
        };
    }());
    /**
     * cancelAnimationFrameをエクスポートしています
     * 対応していないブラウザは、clearTimeoutでフォールバックします
     *
     * @method cancelAnimationFrame
     * @param {Number} id タイマーNumber
     * @return {Number}
     */
    AMP.cancelAnimationFrame = (function () {
        var cancelAnimation = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
            window.clearTimeout(id);
        });
        return function (id) {
            return cancelAnimation(id);
        };
    }());
    /**
     * 現在の時間を返します
     * performance.nowメソッドをExportしています
     * performanceに対応していないブラウザはgetTimeを返します
     *
     * @static
     * @method now
     * @return {Number}
     */
    AMP.now = (function () {
        var p = window.performance, pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);
        return function () {
            return (pNow && pNow.call(p)) || (new Date().getTime());
        };
    }());
})(AMP || (AMP = {}));
