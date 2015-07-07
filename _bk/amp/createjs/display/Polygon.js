var AMP = AMP || {};

(function(root, CJS){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ポリゴンの生成</h4>
   *
   * @class AMP.CJS.Polygon
   * @extends createjs.Graphics
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function Polygon(){}

  // 基底クラスを継承
  AMP.inherits(Polygon, CJS.Graphics, AMP.BASE_CLASS);

  // prototype
  var p = Polygon.prototype;



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
  Polygon.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Polygon';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/




  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.CJS = AMP.CJS || {};
  AMP.CJS.Polygon = Polygon;



}(window, createjs));
