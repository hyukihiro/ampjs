
jQuery(function($){




var img = new Image();
img.src =  'images/sample.jpg';
img.onload = function(){

	// console.log(new AMP.ImageMatrix(img));

  var w = 500,
  h = 500;

  var stage = AMP.cjs.Stage.get('canvas', {width: w, height: h});
  var polygon = new AMP.cjs.Polygon(stage);
  stage.on();

  var bitmap = new createjs.Bitmap(img.src);
  bitmap.x = 0;
  bitmap.y = 0;

	stage.addChild(bitmap);
     // stage.update();




  // stage click取れない？
  //
  AMP.addEvent(stage.canvas, 'click', function(mouseEvent){
    var point = new AMP.Vector({
      x: mouseEvent.clientX - mouseEvent.target.offsetLeft,
      y: mouseEvent.clientY - mouseEvent.target.offsetTop
    });

		var	graphics = new createjs.Graphics();
		graphics.beginFill('#000');
		graphics.drawCircle(-1, -1, 2);

    polygon.plot(point, graphics);

    return false;
  });



  AMP.addEvent($('h1')[0], 'click', function(mouseEvent){
    var delaunay = new AMP.Delaunay(w, h, polygon.points);
    var edges = delaunay.getDelaunay();
    console.log(edges);
    polygon.draw(edges);

var im = new AMP.CanvasBittmapData(stage.canvas);
im.createImageData();
im.getColor(100, 100);


  });


	// 	var loader = AMP.cjs.Loader.get([
	// 		{src: '/test/images/slider/mv010.jpg'},
	// 		{src: '/test/images/slider/mv02.jpg'},
	// 		{src: '/test/images/slider/mv03.jpg'},
	// 		{src: '/test/images/slider/mv04.jpg'},
	// 		{src: '/test/images/slider/mv05.jpg'}
	// 	]);

	// loader.update(function(e){
	// 	console.log(e);
	// })

/*
var stage = new AMP.cjs.Stage('canvas');
// var stage = new createjs.Stage("canvas");
var c = 0;

stage.on();

stage
.resize(function(){
	// console.log($(window).width(), $(window).height());
	stage.setSize(500 + c++, 500 + c++)
	draw();
})
.updateStage(function(){
	console.log(0);
});


function draw(){
	stage.removeChild()
	// Graphicsのインスタンスを作成します。
	var graphics = new createjs.Graphics();

	// 色の指定（線と塗りつぶしとそれぞれ色を指定する）
	graphics.beginStroke("#cccccc");
	graphics.beginFill("#7aeac8");

	graphics
	.moveTo(80,80)
	.lineTo(240,80)
	.lineTo(240,240)
	.lineTo(80,240)
	.closePath();

	// Shapeとして、Stageに追加します。
	var shape = new createjs.Shape(graphics);
	shape.x = 0;
	shape.y = 0;
	stage.addChild(shape);
}

draw();


*/


// createjs.Ticker.timingMode = createjs.Ticker.RAF;
// createjs.Ticker.on('tick', function(){
//   stage.update();
// });












	// var shape = new AMP.cjs.Shape();
	// console.log(shape);



// console.log(new createjs.Shape());



};


});



