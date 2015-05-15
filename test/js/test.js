
jQuery(function($){


	// $('body').on('flickcancelX', function(events){
	// 	// console.log(events);
	// 	// console.log(events.type);
	// 	AMP.debug.log(events.type);
	// });

	AMP.$.rollover.on();


	var slider = AMP.$.Slider.get($('.slider'), {slideStep: 1, isLoop: false, isResize: true});

	console.log(slider);


	// console.log(AMP.Loader.get());


	// AMP.rollover.on($('img'));
	// console.log();

	// AMP.render($('#tmpl'), {url: 'data/amp.render.json'})



	// console.log($('p'));

});

// .passive($('img'));

	// AMP.debug.log(window.dispatchEvent)
