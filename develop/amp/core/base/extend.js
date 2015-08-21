/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    継承・拡張
  ======================================================================*/

  /**
   * <h4>クラス・オブジェクトの継承、拡張</h4>
   * <p><a href="../../demo/AMP.Base.html#extend">DEMO</a></p>
   *
   * @class AMP.Extend
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>オブジェクトの拡張</h4>
   *
   * @static
   * @method mixin
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  AMP.mixin = function(){
    var isDeep, count, extendObject, length, obj, key, data, copy, clone;

    length = arguments.length;
    isDeep = AMP.isBoolean(arguments[0]) && arguments[0];

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
        data = extendObject[key];
        copy = obj[key];

        // マージデータが同じなら次のループへ
        if(extendObject === copy){
          continue;
        }

        if(isDeep && copy && AMP.isObject(copy) || AMP.isArray(copy)){
          if(AMP.isArray(copy)){
            clone = data && AMP.isArray(data) ? data : [];
          } else {
            clone = data && AMP.isObject(data) ? data : {};
          }

          // ネスト構造を再帰処理
          extendObject[key] = AMP.mixin(isDeep, clone, copy);

        } else if (copy !== undefined){
          extendObject[key] = copy;
        }
      }
    }

    return extendObject;
  };


  /**
   * <h4>クラスの継承</h4>
   * <p>拡張した、サブクラスを返します<br>
   * superClassは、可変長引数で、多重継承することが可能</p>
   *
   * @static
   * @method inherits
   * @param  {Function} subClass   サブクラス
   * @param  {Function} superClass スパークラス
   * @return {Function}
   */
  AMP.inherits = function(subClass, superClass){
    superClass = AMP.argsToArray(arguments, 1);

    var p = subClass.prototype,
    i = superClass.length - 1;

    for(; i > -1; i -= 1){
      // !!!: jshintのチェックを緩和します
      /* jshint loopfunc: true */
      /* jshint -W082 */
      function F(){
        this.constructor = subClass;
      }
      F.prototype = superClass[i].prototype;

      // exports
      // constructor
      subClass[AMP.getFunctionName(superClass[i]) + '_constructor'] = superClass[i];

      // static
      AMP.each(superClass[i], function(item, key){
        subClass[key] = item;
      });

      // public
      AMP.mixin(p, new F());
    }

    return subClass;
  };


  /**
   * <h4>ClassをExtendします</h4>
   * <p>ClassにAMP._extendメソッドをExportして使います</p>
   *
   * @protected
   * @static
   * @method _extend
   * @param {arguments} subClass サブクラス
   * @return {Function}
   */
  AMP._extend = AMP.BASE_CLASS.extend = function(){
    var subClass = arguments.length ? arguments : function(){};
    return AMP.inherits(subClass, this);
  };


}(window, AMP));
