
jQuery(function($){

	// AMP.Vector.radToDeg
	// AMP.Vector.degToRad
	//
	console.log(AMP.Vector.radToDeg);


	$('.float_inner').on('flickX', function(move){
		AMP.debug.log(move.moveX)
		// console.log(move);
	})

});

