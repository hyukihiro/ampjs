
jQuery(function($){

	// AMP.Vector.radToDeg
	// AMP.Vector.degToRad
	//
	// console.log(AMP.Vector.radToDeg);



	AMP.mediaquery.on('change.hoge', function(a){
		console.log(a);
		// alert(a);
	});

	// AMP.mediaquery.trigger('change', '0')
// console.log($('.float')[0]);
	$.stream(
		function(){
			return $.stream(
				function(){
					return $('.float').delay(1000).animate({width: 50});
				},
				function(x){
					console.log(x);
				}
			);
		},
		function(){
			return $.stream(
				function(){
					return $('.float').delay(1000).animate({width: 200});
				},
				function(x){
					console.log(x);
				}
			);
		}
	)






// mozilla/5.0 (windows nt 6.1; wow64) applewebkit/537.36 (khtml, like gecko) chrome/43.0.2357.125 safari/537.36 opr/30.0.1835.88 (edition campaign 67)

// $('.float_inner').text(navigator.userAgent.toLowerCase());



});

