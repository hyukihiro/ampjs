module AMP {

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
  export var getFunctionName = function (fn): string{
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
  export var pixelRatio = function (): number {
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
  export var preload = function (src: string): HTMLImageElement {
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
  export var requestAnimationFrame = (function () {
    var requestAnimation = (
    (<any>window).requestAnimationFrame ||
    (<any>window).webkitRequestAnimationFrame ||
    (<any>window).mozRequestAnimationFrame ||
    (<any>window).oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    });

    // contextの処理追加予定
    return function (callback: void) {
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
  export var cancelAnimationFrame = (function () {
    var cancelAnimation = (
    (<any>window).cancelAnimationFrame ||
    (<any>window).webkitCancelAnimationFrame ||
    (<any>window).mozCancelAnimationFrame ||
    (<any>window).oCancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id);
    }
    );

    return function (id: string) {
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
  export var now = (function () {
    var p: any = window.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function () : string{
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());

}
