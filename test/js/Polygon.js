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

	// addPoint
	p.addPoint = function(point){
		this.points = this.points.concat(AMP.argsToArray(arguments));
    return this;
	};


  p.drawPlot = function(index, graphics){
    var self = this;

    if(AMP.isNumber(index)){
      var point = this.points[index],
      shape = new cjs.Shape(graphics);

      shape.name = 'plot';
      shape.x = point.x;
      shape.y = point.y;
      this.container.addChild(shape);

    } else {
      graphics = index.toString && index.toString() === '[Graphics]' ? index : graphics;

      AMP.each(this.points, function(point, index){
        self.drawPlot(index, graphics);
      });
    }

    return this;
  };



  p.removePlot = function(index){
    var self = this;

    //   console.log(this.container.children);
    // var i = this.container.children.length-1;
    // while(i -= 1){
    //   var child = this.container.children[i];
    //   if(child && child.name === 'plot'){
    //     this.container.removeChildAt(i);
    //     self.removePlot(index);
    //     break;
    //   }
    // }


    /*
    if(AMP.isNumber(index)){
      var plot = this.container.getChildAt(index);
      // console.log(this.container.children[index] === plot);
      if(plot && plot.name === 'plot'){
        this.container.removeAllChildren();
      }

    } else {
      var i = this.container.children.length-1;
      while(i -= 1){
        self.removePlot(i);
      }
    }

    */

    return this;
  };






  p.createPlots = function(radiusX, radiusY){
    var size = this.container.getSize();
    // console.log(this.container.getSize());
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

    return this;
  };





  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Polygon = Polygon;



}(window, AMP, createjs));
