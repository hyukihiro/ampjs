var cjs = createjs;


var Polygon = (function(){
	function Polygon(stage){
		this.stage = stage;
		this.points = [];
	}
	var p = Polygon.prototype;

	// plot
	p.plot = function(point, graphics){
		this.points.push(point);

		if(!graphics){
			graphics = new cjs.Graphics();
			graphics.beginFill('#000');
		}
		graphics.drawCircle(-1, -1, 2);

		var shape = new cjs.Shape(graphics);
		shape.x = point.x;
		shape.y = point.y;
		this.stage.addChild(shape);
	};


	// drawTriangle
  p.drawTriangle = function(triangleGraphics) {
  	var graphics = new cjs.Graphics(triangleGraphics);
  	graphics.setStrokeStyle(0.5);
		graphics.beginStroke("#666");

  	// パスの削除とPointClass委譲
  	// graphics.clearPath();
  	AMP.each(triangleGraphics, function(points){
	  	AMP.each(points, function(point, index){
	  		if(index){
	  			graphics.lineTo(point.x, point.y);
	  		} else {
	  			graphics.lineTo(point.x, point.y);
	  		}
	  	});
  	});

  	graphics.closePath();

  	var shape = new cjs.Shape(graphics);
  	this.stage.addChild(shape);
  };



	return Polygon;
}());


