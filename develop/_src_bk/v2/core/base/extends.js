(function (root, AMP) {

  // 'use strict';


  /*======================================================================
    拡張機能
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * ミックスイン
   *
   * @method mixin
   * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
   * @param {Object} arguments 拡張するオブジェクト
   * @return {Object} 拡張したオブジェクトを返します
   */
  AMP.mixin = function () {
    var isDeep, count, baseObj, len, obj, key, data, copy, isArray, clone;

    len = arguments.length;
    isDeep = AMP.isBoolean(arguments[0]) && arguments[0];

    if (isDeep) {
      count = 2;
      baseObj = arguments[1];
    } else {
      count = 1;
      baseObj = arguments[0];
    }

    for (; count < len; count += 1) {
      obj = arguments[count];

      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          data = baseObj[key];
          copy = obj[key];

          // マージデータが同じなら次のループへ
          if (baseObj === copy) {
            continue;
          }

          isArray = AMP.isArray(copy);

          if (isDeep && copy && AMP.isObject(copy) || isArray) {
            if (isArray) {
              clone = data && AMP.isArray(data) ? data : [];
            } else {
              clone = data && AMP.isObject(data) ? data : {};
            }

            // ネスト構造を再帰処理
            baseObj[key] = AMP.mixin(isDeep, clone, copy);

          } else if (!AMP.isUndefined(copy)) {
            baseObj[key] = copy;
          }
        }
      }
    }

    return baseObj;
  };


  /**
   * クラスを拡張します(クローンしたクラス生成)
   * ClassにextendメソッドをExportして使います
   *
   * @protected
   * @static
   * @method _extend
   * @param {Class} childClass 子クラス
   * @return {Extend Class}
   */
  // AMP.Amp.extend
  AMP._extend = function (publicProps, staticProps) {
    var parent = this,
    child;

    if(AMP.isFunction(publicProps)){
      child = function() {
        return parent.apply(this, arguments);
      };
      staticProps = publicProps;
      publicProps  = publicProps.prototype;

    } else if (publicProps && publicProps.constructor) {
      child = publicProps.constructor;

    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }

    // export
    AMP.mixin(child, parent, staticProps);


    var extendClass = function(){
      this.constructor = child;
    };
    extendClass.prototype = parent.prototype;
    child.prototype = new extendClass();
    console.log(child);
    console.log(child.prototype);


    //AMP.mixin(child.prototype, publicProps);

    return child;
  };


   /**
   * クローンしたクラスを生成し拡張します
   * ClassにextendメソッドをExportして使います
   *
   * @static
   * @method inherits
   * @param {Class} childClass 子クラス
   * @param {Class} parentClass 親クラス
   * @return {childClass}
   */
  AMP.inherits = function (childClass, parentClass) {
    var extendClass = function () {},
    childPublic = childClass.prototype,
    parentPublic = parentClass.prototype;

    // extend
    // public
    childPublic = AMP.mixin(true, extendClass.prototype, parentPublic, childPublic);

    // static
    var staticObj = AMP.mixin(true, {}, parentPublic.constructor, childPublic.constructor);
    AMP.each(staticObj, function (item, key) {
      childClass[key] = item;
    });

    // super class constructor
    childClass.__super__ = parentPublic.constructor;

    return childClass;
  };


  /**
   * !importantここから
   * AMPクラスの継承したクラスを生成します
   * AMPクラスの継承 + AMP._extend機能を実装しています
   *
   * @method createClass
   * @param  {Class} childClass 子クラス
   * @param  {String} version バージョン
   * @return {Extend Class}
   */
  AMP.createClass = function (childClass, version) {
    childClass.prototype._name = AMP.getFunctionName(childClass);
    childClass.VERSION = version || '1.0';
    childClass.extend = AMP._extend;
    return AMP.Amp.extend(childClass.prototype, childClass.prototype.constructor);
  };



}(window, AMP || {}));
