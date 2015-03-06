(function (root, AMP) {

  // 'use strict';


  /*======================================================================
   所持判定
  ======================================================================*/


  /*----------------------------------------------------------------------
   config
  ----------------------------------------------------------------------*/

  var
  url = root.location,
  doc = document,
  html = doc.documentElement;


  /*--------------------------------------------------------------------------
   @method
  --------------------------------------------------------------------------*/

  /**
   * applicationCache機能の有無
   *
   * @static
   * @method hasAppCache
   * @return {Boolean}
   */
  AMP.hasAppCache = function () {
    return 'applicationCache' in root;
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
    return 'pushState' in root.history;
  };


  /**
   * RequestAnimationFrame機能の有無
   *
   * @static
   * @method hasReqAnime
   * @return {Boolean}
   */
  AMP.hasReqAnime = function () {
    return !!(root.requestAnimationFrame ||
    root.webkitRequestAnimationFrame ||
    root.mozRequestAnimationFrame ||
    root.msRequestAnimationFrame);
  };


  /**
   * ストレージ機能の有無
   *
   * @static
   * @method hasStorage
   * @return {Boolean}
   */
  AMP.hasStorage = function () {
    return 'sessionStorage' in root && 'localStorage' in root;
  };


  /**
   * WebSocket機能の有無
   *
   * @static
   * @method hasWebSocket
   * @return {Boolean}
   */
  AMP.hasWebSocket = function () {
    return 'WebSocket' in root;
  };


  /**
   * WebWorker機能の有無
   *
   * @static
   * @method hasWebWorker
   * @return {Boolean}
   */
  AMP.hasWebWorker = function () {
    return 'Worker' in root;
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
    } else {
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
        var k = key.replace(/^#/, ''),
        vals = url.hash.split('#'),
        i = 1,
        l = vals.length;

        for (; i < l; i += 1) {
          if (k === vals[i]) {
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
   * MsPointer判定 βver
   *
   * @static
   * @method isMsPointer
   * @return {Boolean}
   */
  AMP.hasMsPointer = function () {
    return root.navigator.msPointerEnabled > -1;
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
    return 'SVGAngle' in root;
  };


  /**
   * TouchScreen判定
   *
   * @static
   * @method hasTouchScreen
   * @return {Boolean}
   */
  AMP.hasTouchScreen = (function () {
    var hasTouchScreen,
    div = doc.createElement('div');

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
    } else {
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
    return 'XMLSerializer' in root;
  };


  /**
   * css3 transition機能の有無
   *
   * @static
   * @method hasTransition
   * @return {Boolean}
   */
  AMP.hasTransition = function () {
    var props = ['transition', '-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'],
    i = 0,
    l = props.length,
    flag = false;

    for (; i < l; i += 1) {
      if (props[i] in html.style) {
        flag = true;
        break;
      }
    }

    return flag;
  };


}(window, AMP || {}));