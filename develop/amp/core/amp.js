// for ie8
var AMP = {};

(function(root){

  // 'use strict';



  /*======================================================================
    Ampクラス
  ======================================================================*/

  // クラス設定
  var
  CLASS_NAME = 'Amp',
  VERSION    = '3.0.3';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>BASE_CLASS (Amp)</h4>
   * 基底クラスを定義しています （このクラスをベースに子クラスを設計します)<br>
   * AmpクラスをAMP.BASE_CLASSにエクスポートしてます
   *
   * @class AMP.BASE_CLASS
   * @constructor
   **/
  function Amp(){}



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
  Amp.VERSION = VERSION;


  /**
   * <h4>クラス名</h4>
   *
   * @default Amp
   * @property className
   * @type {String}
   */
  Amp.prototype.className = CLASS_NAME;



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
  Amp.extend = null;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Amp.prototype.toString = function(){
    return '[object ' + this.className + ']';
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP = new Amp();
  AMP.BASE_CLASS = Amp;



}(window));
