;(function(root){

  // 'use strict';


  /*======================================================================
    AMP基本設定
  ======================================================================*/


  /*--------------------------------------------------------------------------
    config
  --------------------------------------------------------------------------*/

  // クラス基本設定
  var NAME = 'AMP',
  VERSION  = '3.0';


  // consoleがなければ空の関数を返す
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }

  /**
   * <h4>amp</h4>
   *
   * @module amp
   **/
  root.amp = root.amp || {};
  root.amp = new AMP(NAME, VERSION);


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>AMP</h4>
   *
   * @class AMP
   * @constructor
   **/
  function AMP(className, version){
    this.constructor = className;
    this.VERSION = version || '1.0';
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
   * @static
   * @property constructor
   * @type {String}
   */
  AMP.constructor = AMP.prototype.constructor = NAME;


  /**
   * AMP
   * @type {Class}
   */
  // AMP.prototype.AMP = AMP;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  AMP.toString = AMP.prototype.toString = function(){
    return '[object ' + this.constructor + ']';
  };



}(window));
