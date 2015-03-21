(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ベースクラス</h4>
   *
   * @class CLASS
   * @constructor
   */
  function CLASS(className, version){
    this.constructor = className;
    this.VERSION = version;
  }



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  CLASS.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  var p = CLASS.prototype;


  /**
   * <h4>コンストラクタ名</h4>
   *
   * @property constructor
   * @type {String}
   */
  p.constructor = 'CLASS';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * AMP._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  p.extend = AMP._extend;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object ' + this.constructor + ']';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.AMP = root.AMP || {};
  root.AMP.CLASS = CLASS;



}(window));
