
jQuery(function($){


	var e = new AMP.Events();

	e.on('hoge', function(){
		alert(0);
	});

	var e2 = new AMP.Events();
	e2.on('hoge', function(){
		alert(1);
	});


	e.trigger('hoge')


	// AMP.mediaquery.on('change', function(event){
	// 	console.log(event);
	// });
	// new AMP.$.MediaImageChange($('img'));

	// AMP.mediaquery.on('change', function(event){
	// 	console.log(event);
	// });


	// var float3d = AMP.$.Float3d.get($('.float'));
	// console.log(float3d);

	// $('body').on('flickcancelX', function(events){
	// 	// console.log(events);
	// 	// console.log(events.type);
	// 	AMP.debug.log(events.type);
	// });

	AMP.$.rollover.on();
	var slider = AMP.$.Slider.get($('.slider'), {slideStep: 1, isLoop: false, isResize: true});

	// console.log(slider);


	// console.log(AMP.Loader.get());


	// AMP.rollover.on($('img'));
	// console.log();

	// AMP.render($('#tmpl'), {url: 'data/amp.render.json'})



	// console.log($('p'));

});

// .passive($('img'));

	// AMP.debug.log(window.dispatchEvent)
