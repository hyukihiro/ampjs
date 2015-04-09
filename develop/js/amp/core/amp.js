(function(root){

  // 'use strict';



  /*======================================================================
    AMP基本設定
  ======================================================================*/

  // クラス基本設定
  var
  CLASS_NAME = 'AMP',
  VERSION    = '3.0.0';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>AMP</h4>
   * !!!: 基底クラスを定義しています （このクラスをベースに子クラスを設計します)
   * !!!: AMP.BaseClassにエクスポートしてます
   *
   * @class AMP
   * @constructor
   **/
  function AMP(){}



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  AMP.VERSION = VERSION;


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  AMP.prototype.className = CLASS_NAME;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>ClassをExtendします</h4>
   *
   * @static
   * @method extend
   * @param {Function} subClass サブクラス
   * @return {Extend Class}
   */
  // !!!: export AMP._extend;
  AMP.extend = null;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  AMP.prototype.toString = function(){
    return '[object ' + this.className + ']';
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  /**
   * <h4>AMP</h4>
   *
   * @module AMP
   **/
  root.AMP = new AMP();
  root.AMP.BASE_CLASS = AMP;



}(window));
