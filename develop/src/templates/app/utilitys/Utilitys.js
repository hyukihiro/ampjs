(function(root){

  // 'use strict';

  // public
  var p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>有用クラス</h4>
   * スニペット的なコードは、ここで管理します
   *
   * @constructor
   * @class Utilitys
   * @return {Utilitys}
   */
  function Utilitys(){};



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
  Utilitys.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Utilitys.prototype;


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {Object}
   */
  p.name = 'Utilitys';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Utilitys name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.app = root.app || {};
  root.app.Utilitys = Utilitys;
  root.app.utilitys = new Utilitys();


}(window));
