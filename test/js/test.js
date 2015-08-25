
jQuery(function($){


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

var stage = new AMP.cjs.Stage('canvas');
// var stage = new createjs.Stage("canvas");

stage.on();

stage
.resize(function(){
	console.log($(window).width(), $(window).height());
	stage.setSize($(window).width(), $(window).height())
})
.updateStage(function(){
	console.log(0);
});





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


// createjs.Ticker.timingMode = createjs.Ticker.RAF;
// createjs.Ticker.on('tick', function(){
//   stage.update();
// });












	// var shape = new AMP.cjs.Shape();
	// console.log(shape);



// console.log(new createjs.Shape());





});

