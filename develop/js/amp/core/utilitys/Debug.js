(function(root, $){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>�f�o�b�N���O���o��</h4>
   *
   * @class Log
   * @constructor
   */
  function Debug(){}

  // ���N���X���p��
  AMP.inherits(Debug, AMP._AMP);

  // prototype
  var p = Debug.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/
  /**
   * <h4>�o�[�W�������</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Debug.VERSION = '1.0.0';


  /**
   * <h4>�N���X��</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>���O��\������view</h4>
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
