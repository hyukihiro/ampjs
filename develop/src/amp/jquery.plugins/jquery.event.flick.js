(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 0.1
	 *
	 * @class jQuery.Event
	 */


	$.event.special.flick = {
		//
		data: {
			wrapElm  : 'html',
			hit      : 50,
			area     : 10
		},

		// on
		setup: function(obj){
			var $this = $(this),
			$html = $('html');

			$this.on('mousedown.FLICK', function(event){
				var param = $.extend({}, $.event.special.flick.data, obj, event);
				$.event.special.flick.handler($this, $html, param);
			});
		},

		// off
		teardown: function(){
			$(this).off(orig, $.event.special.flick.handler);
		},

		// handler
		handler: function($trigger, $html, data){
			var param = $.extend({}, data),
			isMove = false,
			diffX = 0;

			param.preventDefault();

			// diffX
			$trigger.off('mousemove.FLICK mouseup.FLICK')
			.on('mousemove.FLICK', function(event){
				event.preventDefault();
				diffX = param.pageX - event.pageX;
				if(param.area < Math.abs(diffX)){
					isMove = true;
				}
			});

			// click
			$trigger.children().off('click').on('click',function(event){
				if(isMove){
					event.preventDefault();
				}
			});

			// trigger
			$html.off('mouseup.FLICK').on('mouseup.FLICK', function(){
				$trigger.off('mousemove.FLICK');
				$html.off('mouseup.FLICK');
				if(isMove && param.area < Math.abs(diffX)){
					// param.type = 'flick';
					// イベントデータを渡す
					$trigger.trigger({type: 'flick', diffX: diffX});
				}
			});
		}
	};


var flick = {};
flick.data = {};
flick.setup = function(){};
flick.teardown = function(){};
flick.handler = function(){};

/*
touchup or mouseup
flick
flickleft
flickright
flickup
flickdown

touchmove or mousemove
flickmove
 */


}(jQuery));
