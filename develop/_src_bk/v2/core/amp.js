;
(function (root) {

  //'use strict';


  /*======================================================================
   AMP基本設定
  ======================================================================*/

  // クラス基本設定
  var
  CLASS_NAME = 'Amp',
  VERSION = '3.0';


  /*--------------------------------------------------------------------------
   config
  --------------------------------------------------------------------------*/

  // consoleがなければ空の関数を返す
  if (!('console' in root)) {
    root.console = {
      log: function () {
      }
    };
  }


  /*--------------------------------------------------------------------------
   @constructor
  --------------------------------------------------------------------------*/

  /**
   * Amp
   *
   * @class Amp
   * @constructor
   **/
  function Amp(className) {
    if (typeof className === 'string') {
      this._name = className;
    }
  }


  /*----------------------------------------------------------------------
   @property
  ----------------------------------------------------------------------*/

  /**
   * バージョン情報
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Amp.VERSION = VERSION;


  /**
   * コンストラクタ名
   *
   * @private
   * @property name
   * @type {String}
   */
  Amp.prototype._name = CLASS_NAME;


  /*----------------------------------------------------------------------
   @method
  ----------------------------------------------------------------------*/

  /**
   * クラス名を返す
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Amp.prototype.toString = function () {
    return '[object ' + this._name + ']';
  };


  /*----------------------------------------------------------------------
   export
  ----------------------------------------------------------------------*/

  /**
   * AMP
   *
   * @module AMP
   **/
  root.AMP = new Amp();
  root.AMP.Amp = Amp;


}(window));