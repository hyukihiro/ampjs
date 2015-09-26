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

  // http://codepen.io/yuichiroharai/pen/XbVpdx
	// addPoint
	p.addPoint = function(point){
		this.points = this.points.concat(AMP.argsToArray(arguments));
    return this;
	};


  p.createRandomPoints = function(distance, limit){
    limit = limit || 1000;

    var size = this.container.getBounds(),
    points = this._createOuterPoints(distance),
    plot,
    l,
    i = 0,
    j = 0;

    for(; i <= limit; i += 1){
      plot = {
        x: AMP.random(1, size.width - 1, true),
        y: AMP.random(1, size.height - 1, true)
      };
      l = points.length;

      for(j = 0; j < l; j += 1){
        if(AMP.Vector.distance(points[j], plot) < distance){
          break;
        }
        if(j === l - 1){
          // i = 0;
          i = ~~(i / 2);
          points.push(plot);
        }
      }
    }

    this.points = points;

    return points;
  };


  p._createOuterPoints = function(distance){
    var range,
    size   = this.container.getBounds(),
    width  = size.width,
    height = size.height,
    max = distance < 5 ? 1 : 5,
    i = 0,
    plot = 0,
    points = [
      {x: 0, y: 0},
      {x: width, y: 0},
      {x: width, y: height},
      {x: 0, y: height}
    ];

    for(;i < 2; i += 1){
      range = i ? width * 2 : height * 2;

      while(plot < range){
        plot += distance + AMP.random(0, max, true);

        if(range < plot){
          break;
        }

        if(i){ // y
          points.push({
            x: plot < height ? 0 : width,
            y: plot < height ? plot : plot - height
          });

        } else { // x
          points.push({
            x: plot < width ? plot : plot - width,
            y: plot < width ? 0 : height
          });
        }
      }

      plot = 0;
    }

    return points;
  };



  p.drawPoint = function(index, graphics){
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
        self.drawPoint(index, graphics);
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
