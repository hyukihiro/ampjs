var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    拡張
  ======================================================================*/

  // アップデート予定

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
        if(obj.hasOwnProperty(key)){
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
   * @param {Class} childClass 子クラス
   * @return {Extend Class}
   */
  // AMP.AMPにextendメソッドをExportします
  AMP._extend = AMP.AMP.extend = function(childClass){
    if(AMP.isUndefined(childClass)){
      childClass = function(){};
    }

    var parent = this,
    parentProto = parent.prototype,
    publicProp = childClass.prototype,
    childConstructor = publicProp.constructor,
    extendClass,
    Substitute;

    // mixin
    Substitute = function(){
      this.constructor = childConstructor;
      // AMP.mixin(this.constructor, parentProto.constructor, childConstructor);
    };
    Substitute.prototype = parentProto;

    // extendClass
    extendClass           = childConstructor;
    extendClass.prototype = AMP.mixin(true, new Substitute(), publicProp);
    extendClass.__super__ = parentProto;

    return extendClass;
  };




  /**
   * <h4>AMPネームスペースにクラスを追加</h4>
   *
   * @method exportClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Export Class}
   */
  AMP.exportClass = function(childClass, version){
    var exportClass = AMP.createClass(childClass, version);
    AMP[AMP.getFunctionName(exportClass)] = exportClass;
    return exportClass;
  };


}(window));
