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
   * [Polygon description]
   * @param {createjs.Container} container [description]
   */
	function Polygon(container){
		this.container = container;
		this.points = [];
	}

  // 基底クラスを継承
  AMP.inherits(Polygon, AMP.BASE_CLASS);

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

	// plot
	p.plot = function(point, graphics){
		this.points.push(point);

		if(graphics){
      var shape = new cjs.Shape(graphics);
      shape.x = point.x;
      shape.y = point.y;
      this.container.addChild(shape);
    }
	};


  /**
   * [draw description]
   * @param  {[type]} polygons [description]
   * @return {[type]}                  [description]
   */
  p.draw = function(polygons) {
    var self = this;

    // パスの削除とPointClass委譲
    // graphics.clearPath();
    AMP.each(polygons, function(points){
      var graphics = new cjs.Graphics();
      graphics.setStrokeStyle(0.5);
      graphics.beginStroke("#666");

      // if(i%2){
      //   graphics.beginFill('#00000')
      // } else {
      //   graphics.beginFill('#090')
      // }

      AMP.each(points, function(point, index){
        if(index){
          graphics.lineTo(point.x, point.y);
        } else {
          graphics.moveTo(point.x, point.y);
        }
      });

      graphics.closePath();
      var shape = new cjs.Shape(graphics);
      self.container.addChild(shape);
    });
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Polygon = Polygon;



}(window, AMP, createjs));
