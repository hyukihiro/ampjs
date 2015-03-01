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
   * @param {Class} childClass 子クラス
   * @return {Extend Class}
   */
  // amp.AMPにextendメソッドをExportします
  amp._extend = amp.AMP.extend = function(childClass){
    if(amp.isUndefined(childClass)){
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
      // amp.extend(this.constructor, parentProto.constructor, childConstructor);
    };
    Substitute.prototype = parentProto;

    // extendClass
    extendClass           = childConstructor;
    extendClass.prototype = amp.extend(true, new Substitute(), publicProp);
    extendClass.__super__ = parentProto;

    return extendClass;
  };


  /**
   * 後日追加予定
   * [extendClass description]
   * @return {[type]} [description]
   */
  /*
  amp.extendClass = function(){
    var extendClass = function(){};
    extendClass.extend =
    var i = 0,
    l = arguments.length -1;

    for(; i < l; i += 1){
      arguments[i].extend = amp._extend;
      extendClass = arguments[i].extend(arguments[i+1]);
    }
    return extendClass;
  };
  */


  /**
   * <h4>AMPクラスの継承したクラスを生成します</h4>
   * AMPクラスの継承 + amp._extend機能を実装しています
   *
   * @method createClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Extend Class}
   */
  amp.createClass = function(childClass, version){
    childClass.prototype._name = amp.getFunctionName(childClass);
    childClass.VERSION = version || '1.0';
    childClass.extend = amp._extend;
    return amp.AMP.extend(childClass);
  };


  /**
   * <h4>ampネームスペースにクラスを追加</h4>
   *
   * @method exportClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Export Class}
   */
  amp.exportClass = function(childClass, version){
    var exportClass = amp.createClass(childClass, version);
    amp[amp.getFunctionName(exportClass)] = exportClass;
    return exportClass;
  };


}(window, amp || {}));
