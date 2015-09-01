
jQuery(function($){



  var w = 500,
  h = 500;

  var stage = AMP.cjs.Stage.get('canvas', {width: w, height: h});
  var polygon = new Polygon(stage);

  stage.on();

  // stage click取れない？
  //
  AMP.addEvent(stage.canvas, 'click', function(mouseEvent){
    var point = new AMP.Vector({
      x: mouseEvent.clientX - mouseEvent.target.offsetLeft,
      y: mouseEvent.clientY - mouseEvent.target.offsetTop
    });

    polygon.plot(point);


    return false;
  });



  AMP.addEvent($('h1')[0], 'click', function(mouseEvent){
    var delaunay = new Delaunay(w, h, polygon.points);
    polygon.drawTriangle(delaunay.getDelaunay());

        // var d = new MathDelaunay(w, h, points);
        // var triangles = d.split();
        // for(var i=0,n=triangles.length; i<n; i++){
        //     pc.drawTriangle(triangles[i]);
        // }
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





});



