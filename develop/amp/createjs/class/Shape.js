/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   *
   * @class AMP.cjs.Shape
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Object} manifest
   * @param {Object} options
   */
  function Shape(graphics){
    this.Shape_constructor(graphics);
  }



  // 基底クラスを継承
  AMP.inherits(Shape, AMP.BASE_CLASS);

  // prototype
  var p = createjs.extend(Shape, cjs.Shape);


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
  Shape.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Shape';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Shapeインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param {DOM} el 対象のエリア要素
   * @return {Shape}
   */
  Shape.get = function(manifest, options){
    // return new Shape(manifest, options).init();
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Shape = createjs.promote(Shape, 'Shape');



}(window, AMP, createjs));
