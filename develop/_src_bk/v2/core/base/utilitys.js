(function (root, AMP) {

  // 'use strict';


  /*======================================================================
    基本ユーティリティ
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

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
    } else {
      return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    }
  };


  /**
   * 画面のピクセル比を返す
   *
   * @static
   * @method pixelRatio
   * @return {Number}
   */
  AMP.pixelRatio = function () {
    return root.devicePixelRatio || 1;
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
    var requestAnimation = (
    root.requestAnimationFrame ||
    root.webkitRequestAnimationFrame ||
    root.mozRequestAnimationFrame ||
    root.oRequestAnimationFrame ||
    function (callback) {
      return root.setTimeout(callback, 1000 / 60);
    }
    );

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
    var cancelAnimation = (
    root.cancelAnimationFrame ||
    root.webkitCancelAnimationFrame ||
    root.mozCancelAnimationFrame ||
    root.oCancelAnimationFrame ||
    function (id) {
      root.clearTimeout(id);
    }
    );

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
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function () {
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());


}(window, AMP || {}));
