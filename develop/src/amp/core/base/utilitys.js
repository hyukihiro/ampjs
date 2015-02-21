(function(root, amp){

  // 'use strict';


  /*======================================================================
    基本ユーティリティ
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>オブジェクトの拡張</h4>
   *
   * @method extend
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  amp.extend = function(){
    var isDeep, count, extendObject, length, obj, key, data, copy, isArray, clone;

    length = arguments.length;
    isDeep = amp.isBoolean(arguments[0]) && arguments[0];

    if(isDeep){
      count = 2;
      extendObject = arguments[1];
    } else {
      count = 1;
      extendObject = arguments[0];
    }

    for(; count < length; count += 1){
      obj = arguments[count];

      for(key in obj){
        if(obj.hasOwnProperty(key)){
          data = extendObject[key];
          copy = obj[key];

          // マージデータが同じなら次のループへ
          if(extendObject === copy){
            continue;
          }

          isArray = amp.isArray(copy);

          if(isDeep && copy && amp.isObject(copy) || isArray){
            if(isArray){
              clone = data && amp.isArray(data) ? data : [];
            } else {
              clone = data && amp.isObject(data) ? data : {};
            }

            // ネスト構造を再帰処理
            extendObject[key] = amp.extend(isDeep, clone, copy);

          } else if (copy !== undefined){
            extendObject[key] = copy;
          }
        }
      }
    }

    return extendObject;
  };


  /**
   * <h4>ClassをExtendします</h4>
   * ClassにextendメソッドをExportして使います
   *
   * @protected
   * @static
   * @method _extend
   * @param {Object|Function} protoProp プロトタイプオブジェクト、もしくはsubClass
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  amp._extend = function(protoProp, staticProp){
    var parent = this,
    child;

    if(amp.isFunction(protoProp)){
      staticProp = protoProp;
      protoProp = protoProp.prototype;
    }

    if(protoProp && protoProp.constructor) {
      child = protoProp.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    amp.extend(true, child, parent, staticProp);

    var Substitute = function(){ this.constructor = child; };
    Substitute.prototype = parent.prototype;
    child.prototype = new Substitute();

    if(protoProp){
      amp.extend(true, child.prototype, protoProp);
    }

    child.__super__ = parent.prototype;

    return child;
  };


  /**
   * ここベース
   *
   * <h4>クラスのベースを生成します</h4>
   * AMPクラスの継承 + amp._extend機能を実装しています
   *
   * @method createClass
   * @param  {String} className クラス名
   * @param  {String} version バージョン
   * @return {Class}
   */
  amp.createClass = (function(){
      // amp.AMP.extend = amp._extend;
      // var baseClass = new amp.AMP('className', 'version');

    console.log(new amp.AMP());

  }());

  // function(className, version){
  //   if(amp.isString(className)){
  //     var baseClass = new amp.AMP(className, version);
  //     return baseClass;
  //   } else {
  //     throw new TypeError(className + ' is not a String');
  //   }
  // };



  /**
   * <h4>画面のピクセル比を返す</h4>
   *
   * @static
   * @method pixelRatio
   * @return {Number}
   */
  amp.pixelRatio = function(){
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
  amp.preload = function(src){
    var img = new Image();
    img.src = src;
    return img;
  };


  /**
   * <h4>requestAnimationFrameをエクスポートしています</h4>
   * 対応していないブラウザは、setTimeoutでフォールバックします
   *
   * @method requestAnimationFrame
   * @param {Function} callback コールバック関数
   * @return {Number}
   */
  amp.requestAnimationFrame = (function(){
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
   * @method cancelAnimationFrame
   * @param {Number} id タイマーNumber
   * @return {Number}
   */
  amp.cancelAnimationFrame = (function(){
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
   * performance.nowメソッドをExportしています
   * performanceに対応していないブラウザはgetTimeを返します
   *
   * @static
   * @method now
   * @return {Number}
   */
  amp.now = (function(){
    var p = root.performance,
    pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);

    return function(){
      return (pNow && pNow.call(p)) || (new Date().getTime());
    };
  }());



}(window, amp || {}));
