var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    拡張
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>オブジェクトの拡張</h4>
   *
   * @method mixin
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  AMP.mixin = function(){
    var isDeep, count, extendObject, length, obj, key, data, copy, isArray, clone;

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

        isArray = AMP.isArray(copy);

        if(isDeep && copy && AMP.isObject(copy) || isArray){
          if(isArray){
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
   * 拡張した、サブクラスを返します
   * superClassは、可変長引数で、多重継承することが可能
   *
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
   * ClassにextendメソッドをExportして使います
   *
   * @protected
   * @static
   * @method _extend
   * @param {arguments} subClass サブクラス
   * @return {Function}
   */
  // AMP._extend = AMP.BASE_CLASS.extend = function(){
  AMP._extend = function(){
    var subClass = arguments.length ? arguments : function(){};
    return AMP.inherits(subClass, this);
  };


}(window));
