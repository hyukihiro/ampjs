(function(root, $){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>デバックログを出力</h4>
   *
   * @class Log
   * @constructor
   */
  function Debug(){}

  // 基底クラスを継承
  AMP.inherits(Debug, AMP._AMP);

  // prototype
  var p = Debug.prototype;



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
  Debug.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>ログを表示するview</h4>
   *
   * @property view
   * @type {DOM}
   */
  Debug.view = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  // Log.hsaLog = !(root.console._defaultLog);
  Debug.createView = function(){
  };

  Debug.moveView = function(){
  };


  Debug.dataAnalysis = function(data){
  };

  Debug.addLog = function(){
  };

  Debug.clearLog = function(){
  };






  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP._Debug = Debug;
  AMP.debug = new Debug();


}(window, jQuery));
