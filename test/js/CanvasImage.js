/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * [CanvasImage description]
   * @param {createjs.Container} container [description]
   */
	function CanvasImage(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.imageData = null;
	}

  // 基底クラスを継承
  AMP.inherits(CanvasImage, AMP.BASE_CLASS);

  // prototype
  var p = CanvasImage.prototype;



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
  CanvasImage.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'CanvasImage';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * [getData description]
   * @param  {[type]} sx [description]
   * @param  {[type]} sy [description]
   * @param  {[type]} sw [description]
   * @param  {[type]} sh [description]
   * @return {[type]}    [description]
   */
  p.getData = function(sx, sy, sw, sh){
    sx = sx || 0;
    sy = sy || 0;
    sw = sw || this.canvas.width - sx;
    sh = sh || this.canvas.height - sy;

    return this.context.getImageData(sx, sy, sw, sh);
  };

  /**
   * [getDotData description]
   * @param  {[type]} x [description]
   * @param  {[type]} y [description]
   * @return {[type]}   [description]
   */
  p.getDotData = function(x, y){
    x = ~~x;
    y = ~~y;

    var imageData = this.getData(x, y, 1, 1);
    imageData.x = x;
    imageData.y = y;

    return imageData;
  };


/* あと
-----------------------------------------------------------------*/
  p.setDotData = function(){
  };

  p.getDot = function(){
  };

  p.setDot = function(){
  };

  p.draw = function(){
  };

  p.dotTohex = function(x, y){
  };

  p.dotToRgba = function(x, y){
  };


  p.each = function(){
    var self = this;
    AMP.each(function(){
    });
    return this;
  };

  p.getReact = function(){
  };
  p.setReac = function(){
  };

  // 横
  p.getRow = function(y){
  };

  // 縦
  p.getCol = function(x){
  };

  p.setRow = function(y){
  };

  p.setCol = function(x){
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.CanvasImage = CanvasImage;



}(window, AMP));
