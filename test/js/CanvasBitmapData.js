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
   * [CanvasBittmapData description]
   * @param {createjs.Container} container [description]
   */
	function CanvasBittmapData(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.data = null;
	}

  // 基底クラスを継承
  AMP.inherits(CanvasBittmapData, AMP.BASE_CLASS);

  // prototype
  var p = CanvasBittmapData.prototype;



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
  CanvasBittmapData.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'CanvasBittmapData';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  /**
   * [createImageData description]
   * @param  {[type]} x      [description]
   * @param  {[type]} y      [description]
   * @param  {[type]} width  [description]
   * @param  {[type]} height [description]
   * @return {[type]}        [description]
   */
  p.createImageData = function(x, y, width, height){
    this.bitmap = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return this;
  };


  /**
   * [getColor description]
   * @param  {[type]} x [description]
   * @param  {[type]} y [description]
   * @return {[type]}   [description]
   */
  p.getColor = function(x, y){
    var code,
    color = '#',
    point = AMP.Vector.coordMap(x, y),
    pixel = (~~point.x + ~~point.y * this.canvas.width + 1) * 4,
    i = 0;

    for(; i < 3; i += 1){
      code = Math.round(this.bitmap.data[pixel + i]).toString(16);
      if(code < 16) {
        code = '0' + code;
      }
      color += code;
    }

    return color;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.CanvasBittmapData = CanvasBittmapData;



}(window, AMP, createjs));
