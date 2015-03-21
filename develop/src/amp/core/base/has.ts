module AMP {

  /*======================================================================
   所持判定
  ======================================================================*/

  // params
  var
  url = window.location,
  doc = document,
  html = doc.documentElement;


  /**
   * applicationCache機能の有無
   *
   * @static
   * @method hasAppCache
   * @return {Boolean}
   */
  export var hasAppCache = function (): boolean {
    return 'applicationCache' in window;
  };


  /**
   * Geolocation機能の有無
   *
   * @static
   * @method hasGeolocation
   * @return {Boolean}
   */
  export var hasGeolocation = function (): boolean {
    return 'geolocation' in navigator;
  };


  /**
   * pushState機能の有無
   *
   * @static
   * @method hasPushState
   * @return {Boolean}
   */
  export var hasPushState = function (): boolean {
    return 'pushState' in window.history;
  };


  /**
   * RequestAnimationFrame機能の有無
   *
   * @static
   * @method hasReqAnime
   * @return {Boolean}
   */
  export var hasReqAnime = function (): boolean {
    return !!(window.requestAnimationFrame ||
    (<any>window).webkitRequestAnimationFrame ||
    (<any>window).mozRequestAnimationFrame ||
    (<any>window).msRequestAnimationFrame);
  };


  /**
   * ストレージ機能の有無
   *
   * @static
   * @method hasStorage
   * @return {Boolean}
   */
  export var hasStorage = function (): boolean {
    return 'sessionStorage' in window && 'localStorage' in window;
  };


  /**
   * WebSocket機能の有無
   *
   * @static
   * @method hasWebSocket
   * @return {Boolean}
   */
  export var hasWebSocket = function (): boolean {
    return 'WebSocket' in window;
  };


  /**
   * WebWorker機能の有無
   *
   * @static
   * @method hasWebWorker
   * @return {Boolean}
   */
 export var hasWebWorker = function (): boolean {
    return 'Worker' in window;
  };


  /**
   * audio機能の有無
   *
   * @static
   * @method hasAudio
   * @return {Boolean}
   */
 export var hasAudio = function (): boolean {
    // hack for ietester
    if ((<any>AMP).isBrowser('ie', 9)) {
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
 export var hasCanvas = function (): boolean {
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
 export var hasHash = function (key: string): boolean {
    var flag = false;

    if (url.href.indexOf('#') > -1) {
      if (key) {
        var // params
        k = key.replace(/^#/, ''),
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
 export var hasMsPointer = function (): boolean {
    return (<any>window).navigator.msPointerEnabled > -1;
  };


  /**
   * 文字列があるか判定
   *
   * @method hasString
   * @param  {String}  str   対象の文字列
   * @param  {String}  haStr 検索文字
   * @return {Boolean}
   */
 export var hasString = function (str: string, hasStr: string): boolean {
    return AMP.isString(str) && str.indexOf(hasStr) > -1;
  };


  /**
   * SVG機能の有無
   *
   * @static
   * @method hasSVG
   * @return {Boolean}
   */
  export var hasSVG = function (): boolean {
    return 'SVGAngle' in window;
  };


  /**
   * TouchScreen判定
   *
   * @static
   * @method hasTouchScreen
   * @return {Boolean}
   */
  export var hasTouchScreen = (function () {
    var hasTouchScreen,
    div = doc.createElement('div');
    div.setAttribute('ontouchstart', 'return');
    hasTouchScreen = (typeof (<any>div).ontouchstart === 'function');
    return function (): boolean {
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
  export var hasVideo = function (): boolean {
    // hack for ietester
    if ((<any>AMP).isBrowser('ie', 9)) {
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
  export var hasXMLSerializer = function (): boolean {
    return 'XMLSerializer' in window;
  };


  /**
   * css3 transition機能の有無
   *
   * @static
   * @method hasTransition
   * @return {Boolean}
   */
  export var hasTransition = function (): boolean {
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

}
