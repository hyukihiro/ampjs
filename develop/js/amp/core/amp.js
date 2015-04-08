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
   * 基底クラスを定義しています
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
   * @private
   * @property name
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
  // AMP.extend = AMP._extend;


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
   * <h4>amp</h4>
   *
   * @module amp
   **/
  root.AMP = new AMP(CLASS_NAME);
  root.AMP._AMP = AMP;



}(window));
