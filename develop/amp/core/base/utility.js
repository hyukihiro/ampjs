var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    ユーティリティ
  ======================================================================*/

  /**
   * <h4>ユーティリティ</h4>
   *
   * @class AMP.Utility
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>DOMイベント追加</h4>
   *
   * @static
   * @method addEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.addEvent = function(element, type, listener){
    if(element.addEventListener){
      element.addEventListener(type, listener, false);
    } else {
      element.attachEvent('on' + type, listener);
    }
    return element;
  };


  /**
   * <h4>DOMイベント削除</h4>
   *
   * @static
   * @method removeEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.removeEvent = function(element, type, listener){
    if(element.addEventListener){
      element.removeEventListener(type, listener, false);
    } else {
      element.detachEvent('on' + type, listener);
    }
    return element;
  };


  /**
   * <h4>匿名関数名を返す</h4>
   * 無名関数はundefinedを返します
   *
   * @static
   * @method getFunctionName
   * @param  {Function} fn 名前を取得したい関数
   * @return {String}
   */
  AMP.getFunctionName = function(fn){
    if(AMP.isFunction(fn)){
      if(fn.className){
        return fn.className;
      } else {
        return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
      }
    } else {
      throw new TypeError(fn + ' is not a Function');
    }
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number}
   */
  AMP.pixelRatio = function(){
    return root.devicePixelRatio || 1;
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
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
   *
   * @static
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number}
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
   * @static
   * @method cancelAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number}
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
   * performance.nowメソッドをExportしています<br>
   * performanceに対応していないブラウザはgetTimeを返します
   *
   * @static
   * @method now
   * @return {Number}
   */
  AMP.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());


  /**
   * <h4>空の関数</h4>
   * 何もしません
   *
   * @static
   * @return {Void}
   */
  AMP.noop = function(){};


  /**
   * <h4>乱数の生成</h4>
   *
   * @param  {Number}  min     最小値 ※省略可
   * @param  {Number}  max     最大値 ※省略可
   * @param  {Boolean} isRound 四捨五入するか ※省略可
   * @return {Number} 乱数を返します
   */
  AMP.random = function(min, max, isRound){
    var random = Math.random(),
    value;

    if(arguments.length === 0 || AMP.isBoolean(min)){
      isRound = min;
      value = random;

    } else if(arguments.length === 1 || AMP.isBoolean(max)){
      isRound = max;
      value = random * min;

    } else {
      if (min > max) {
        var num = min;
        min = max;
        max = num;
      }
      value = random * (max - min) + min;
    }

    if(isRound){
      return Math.round(value);
    } else{
      return value;
    }
  };



}(window));
