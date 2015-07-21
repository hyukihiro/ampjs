
jQuery(function($){
  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var PI = Math.PI;



	/*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

	/**
	 * <h4>π (半円)</h4>
	 *
	 * @static
	 * @property PI
	 * @type {Number}
	 */
	AMP.PI = PI;


	/**
	 * <h4>π * 2 (円)</h4>
	 *
	 * @static
	 * @property PI_TWO
	 * @type {Number}
	 */
	AMP.PI_TWO = AMP.PI * 2;


	/**
	 * <h4>π * 2 (1/4円)</h4>
	 *
	 * @static
	 * @property PI_HARF
	 * @type {Number}
	 */
	AMP.PI_HARF = AMP.PI / 2;


  /**
   * <h4>ラジアン</h4>
   *
   * @static
   * @property RAD
   * @type {Number}
   */
  AMP.RAD = 180 / Math.PI;



	/*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/**
	 * <h4>角度からラジアンを取得</h4>
	 *
	 * @static
	 * @method degToRad
	 * @param  {Number} deg 角度
	 * @return {Number}
	 */
	AMP.degToRad = function(deg){
    return AMP.PI_TWO * (deg / 360);
	};


	/**
	 * <h4>角度の取得</h4>
	 *
	 * @static
	 * @method coordToDeg
	 * @param  {Number|Object} x座標値 x,y座標を格納したオブジェクト
	 * @param  {Number} y y座標値
	 * @return {Number} 角度を返す
	 */
  AMP.coordToDeg = function(x, y){
    if(AMP.isObject(x)){
      y = x.y;
      x = x.x;
    }
    return Math.atan2(y, x) * AMP.RAD;
  };


  AMP.polar = function(radius, deg){

  	var x = radius * Math.cos(AMP.degToRad(deg));
		var y = radius * Math.sin(AMP.degToRad(deg));
		console.log(x,y);
  }


AMP.polar(10, 360);








// setInterval(function(){
  // console.log(rotate());


// }, 1000 / 60)



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
