/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

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
   * <h4>匿名関数名を返す</h4>
   * <p>無名関数はundefinedを返します</p>
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
      } else if (fn.prototype.className) {
        return fn.prototype.className;
      } else {
        return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
      }
    } else {
      throw new TypeError(fn + ' is not a Function');
    }
  };


  /**
   * <h4>型名取得</h4>
   *
   * @method type
   * @param {Object} 判定するオブジェクト
   * @return {String} 型名を返す
   */
  AMP.type = function(obj){
    if(AMP.isArray(obj)){
      return 'array';

    } else if(AMP.isBoolean(obj)){
      return 'boolean';

    } else if(AMP.isFunction(obj)){
      return 'function';

    } else if(AMP.isNumber(obj)){
      return 'number';

    } else if(AMP.isObject(obj)){
      return 'object';

    } else if(AMP.isString(obj)){
      return 'string';

    } else if(AMP.isRegexp(obj)){
      return 'regexp';

    } else if(AMP.isNull(obj)){
      return 'null';

    } else {
      return 'undefined';
    }
  };


  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number} 画面のピクセル比を返す
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
   * @return {ImageElement} 生成した、イメージ要素
   */
  AMP.preload = function(src){
    var img = new Image();
    img.src = src;
    return img;
  };


  /**
   * <h4>RAF(requestAnimationFrame)をエクスポートしています</h4>
   * <p>RAFに対応していないブラウザは、setTimeoutでフォールバックします</p>
   * FIXME: contextの処理追加予定
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

    return function(callback){
      return requestAnimation(callback);
    };
  }());


  /**
   * <h4>CAF(cancelAnimationFrame)をエクスポートしています</h4>
   * <p>CAFに対応していないブラウザは、clearTimeoutでフォールバックします</p>
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
   * <p>performance.nowメソッドをExportしています<br>
   * performanceに対応していないブラウザはgetTime(Date関数)を返します</p>
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


}(window, AMP));
