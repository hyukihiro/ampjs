
jQuery(function($){






	AMP.mediaquery.on('change', function(event){
		// console.log(event);
	});
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

	imagesLoaded('body', function(){
		var slider = AMP.$.Slider.get($('.slider'), {current: 1});

	})



	// console.log(AMP.Loader.get());


	// AMP.rollover.on($('img'));
	// console.log();

	// AMP.render($('#tmpl'), {url: 'data/amp.render.json'})



	// console.log($('p'));

});

// .passive($('img'));

	// AMP.debug.log(window.dispatchEvent)
