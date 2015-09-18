
var cjs = createjs;

jQuery(function($){


// console.log(AMP.degToArc(90, 100));
// console.log(AMP.coordToDeg(10, 10));

// console.log(AMP.degTo2d(90, 100));
// console.log(AMP.radTo2d(Math.PI, 100));


// AMP.degToArc(deg, radius)
// AMP.arcToDeg(arc, radius);
// console.log(AMP.degToArc(180, 100));
// console.log(AMP.arcToDeg(AMP.degToArc(180, 100), 100));



// return false;







/*
  var canvas = $('canvas')[0];
  var context = canvas.getContext('2d');
  var imageLoad = AMP.ImageLoad.get('images/js.png');

  imageLoad
  .load()
  .done(function(){
    var canvasImage = new AMP.CanvasImage(canvas);

    context.drawImage(imageLoad.image, 0, 0);

    var data = canvasImage.getDotData(50, 50);
    console.log(data);
  });
return;
*/


var img = new Image();
img.src =  'images/sample.jpg';
img.onload = function(){

	// console.log(new AMP.ImageMatrix(img));

  var
  w = 500,
  h = 500,
  stage = AMP.cjs.Stage.get('canvas', {width: w, height: h}),
  polygon = new AMP.cjs.Polygon(stage),
  graphics = new createjs.Graphics();

	graphics.beginFill('#000');
	graphics.drawCircle(0, 0, 2);

  stage.on();

  // stage click取れない？
  AMP.addEvent(stage.canvas, 'click', function(mouseEvent){
    var point = new AMP.Vector({
      x: mouseEvent.clientX - mouseEvent.target.offsetLeft,
      y: mouseEvent.clientY - mouseEvent.target.offsetTop
    });

    polygon.createRandomPoints(100);

    // polygon.addPoint(point).drawPoint(polygon.points.length - 1, graphics);

    return false;
  });

  AMP.addEvent($('h1')[0], 'click', function(mouseEvent){
    polygon.removePlot();

    var delaunay = new AMP.Delaunay(w, h, polygon.points);
    var edges = delaunay.getDelaunay();
    polygon.draw(edges);
  });



  var lineGraphics = new createjs.Graphics(),
  x = 0,
  y = 0,
  radius = 100,
  point = 8,
  deg = 0,
  DEG = 360 / point;


  lineGraphics.beginStroke('#000');
  lineGraphics.setStrokeStyle(3);
  lineGraphics.drawRoundRectComplex(x,y, radius, radius, radius,radius,radius,radius);

  /*

  var pX,pY;

  // lineGraphics
  // Vector.PI_TWO
  var i = 0;
  for(; i < point+1; i += 1){
    var radian = Math.PI/180*deg;
    var _x = x + radius * Math.sin(radian);
    var _y = y + radius * Math.cos(radian);
    // Math.cos(deg*Math.PI/180)*radius+x
    // Math.sin(deg*Math.PI/180)*radius+y
    deg += DEG;
    if(i == 0){
      lineGraphics.moveTo(_x, _y);
    } else {
      lineGraphics.lineTo(_x, _y);
      // lineGraphics.bezierCurveTo(_x, _y, pX, pY);
    }

    pX = _x;
    pY = _y;


  }

  graphics.closePath();
  console.log(graphics);
  */

  // var shape = new cjs.Shape(lineGraphics);
  // stage.addChild(shape);


// theCanvas.style.left = (offsetX-n+Math.sin(radian)*radius)+’px’;
// theCanvas.style.top = (offsetY-n+Math.cos(radian)*radius)+’px’;



};


});



