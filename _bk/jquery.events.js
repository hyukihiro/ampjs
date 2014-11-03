
	/*--------------------------------------------------------------------------
		@flick
		jquery.mobile-1.1.2.jsをベースに拡張しています
		version: 0.1
	--------------------------------------------------------------------------*/
	/**
	 * <h4>flickイベント</h4>
	 * スワイプ(横方向に30px以上ドラッグし、なおかつ縦方向に20px以内)した際に呼ばれるイベント。<br>
	 * 前のイベントが呼ばれてから1秒以上開けてから、次のものが呼ばれる。
	 *
	 * @event flick
	 * @example
	 *	$(elm).on('flick', callback);
	 *	$(elm).flick(callback);
	 */
	/**
	 * <h4>flickleft イベント</h4>
	 * スワイプ(横方向に30px以上ドラッグし、なおかつ縦方向に20px以内)を左方向へした際に呼ばれるイベント。<br>
	 * 前のイベントが呼ばれてから1秒以上開けてから、次のものが呼ばれる。
	 *
	 * @event flickleft
	 * @example
	 *	$(elm).on('flickleft', callback);
	 *	$(elm).flickleft(callback);
	 */
	/**
	 * <h4>flickright イベント</h4>
	 * スワイプ(横方向に30px以上ドラッグし、なおかつ縦方向に20px以内)を右方向へした際に呼ばれるイベント。<br>
	 * 前のイベントが呼ばれてから1秒以上開けてから、次のものが呼ばれる。
	 *
	 * @event flickleft
	 * @example
	 *	$(elm).on('flickleft', callback);
	 *	$(elm).flickleft(callback);
	 */

	var supportTouch = ('ontouchstart' in window),
	touchStartEvent = supportTouch ? 'touchstart' : 'mousedown',
	touchMoveEvent = supportTouch ? 'touchmove' : 'mousemove',
	touchEndEvent = supportTouch ? 'touchend' : 'mouseup';


	$.event.special.flick = {


		setup: function(){
			var $el = $(this);

			// $(window).on(touchEndEvent+'.flick', function(){
			// 	$el.off(touchMoveEvent)
			// });
			$el.on(touchStartEvent, $.event.special.flick.handler.start);
		},
		teardown: function(){
			$(this).off(touchStartEvent).off(touchMoveEvent).off(touchEndEvent);
		},

		handler: {
			//
			start: function(event){
				var $el = $(this);
				event.type = 'flick';

				$el.trigger(event)
					.off(touchMoveEvent).off(touchEndEvent)
					.on(touchMoveEvent, $.event.special.flick.handler.move);
			},

			move: function(event){
				var $el = $(this);
				event.type = 'flick';
				$el.trigger(event)
					.on(touchEndEvent, $.event.special.flick.handler.end);
			},

			end: function(event){
				var $el = $(this);
				event.type = 'flick';
				$el.trigger(event).off(touchMoveEvent).off(touchEndEvent);
			}
		}
	};



	/*
	var supportTouch = ('ontouchstart' in window),
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";


	$.event.special.flick = {
		scrollSupressionThreshold: 10, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a flick.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.on( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
									event.originalEvent.touches[ 0 ] : event,
					start = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					},
					stop;

				function moveHandler( event ) {

					if ( !start ) {
						return;
					}

					var data = event.originalEvent.touches ?
							event.originalEvent.touches[ 0 ] : event;

					stop = {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.flick.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.on( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function( event ) {
						$this.off( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							if ( stop.time - start.time < $.event.special.flick.durationThreshold &&
									Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.flick.horizontalDistanceThreshold &&
									Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.flick.verticalDistanceThreshold ) {

								start.origin.trigger( "flick" )
									.trigger( start.coords[0] > stop.coords[ 0 ] ? "flickleft" : "flickright" );
							}
						}
						start = stop = undefined;
					});
			});
		}
	};


	// addEvent
	$.each({
		flickleft: "flick",
		flickright: "flick"
	}, function(event, sourceEvent){

		$.event.special[event] = {
			setup: function(){
				$(this).on(sourceEvent, $.noop);
			}
		};
	});
	*/

  // add new event shortcuts
	$.each(("touchstart touchmove touchend flick flickleft flickright").split(" "), function(i, name){
		$.fn[name] = function(fn){
			return fn ? this.on(name, fn) : this.trigger(name);
		};

		$.attrFn[name] = true;
	});
