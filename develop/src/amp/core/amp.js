;(function(root){

  // 'use strict';


  /*======================================================================
    AMP基本設定
  ======================================================================*/

  // クラス基本設定
  var
  CLASS_NAME = 'AMP',
  VERSION    = '3.0';



  /*--------------------------------------------------------------------------
    config
  --------------------------------------------------------------------------*/

  // consoleがなければ空の関数を返す
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>AMP</h4>
   *
   * @class AMP
   * @constructor
   **/
  function AMP(className){
    if(typeof className === 'string'){
      this._name = className;
    }
  }



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
   * <h4>コンストラクタ名</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  AMP.prototype._name = CLASS_NAME;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>ClassをExtendします</h4>
   *
   * @static
   * @method extend
   * @param {Object|Function} protoProp プロトタイプオブジェクト、もしくはsubClass
   * @param {Object} staticProp staticオブジェクト
   * @return {Extend Class}
   */
  // AMP.extend = amp._extend;


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  AMP.prototype.toString = function(){
    return '[object ' + this._name + ']';
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  /**
   * <h4>amp</h4>
   *
   * @module amp
   **/
  root.amp = new AMP();
  root.amp.AMP = AMP;



}(window));
