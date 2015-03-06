(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 1.0
	 *
	 * @class jQuery.Event
	 */

	/**
	 * <h4>リサイズイベントを間引き、完了後発火します</h4>
	 *
	 * @event resizestop リサイズ完了イベント
	 * @param {Object} 間引く時間を指定 default {timer: 200}
	 * @example
	 *	$(window).on('resizestop', callback);
	 *	$(window).on('resizestop', {timer: 1000}, callback);
	 */
	/**
	 * <h4>スクロールイベントを間引き、完了後発火します</h4>
	 *
	 * @event scrollstop スクロール完了イベント
	 * @param {Object} 間引く時間を指定 default {timer: 200}
	 * @example
	 *	$(window).on('scrollstop', {timer: 1000}, callback);
	 *	$(window).on('scrollstop', callback);
	 *	$(window).scrollstop(callback);
	 */
	$.each({
		resize: 'resizestop',
		scroll: 'scrollstop'
	}, function(orig, fix){

		$.event.special[fix] = {
			// data
			data: {
				eventType: fix,
				timer    : 100,
				timerId  : null
			},

			// on
			setup: function(obj){
				var data = $.extend({}, $.event.special[fix].data, obj);
				$(this).on(orig, function(){
					$.event.special[fix].handler(data);
				});
			},

			// off
			teardown: function(){
				$(this).off(orig);
			},

			// handler
			handler: function(data){
				clearTimeout(data.timerId);
				data.timerId = setTimeout(function(){
					$(this).trigger(data.eventType);
				}, data.timer);
			}
		};

		// add shorthand
		$.fn[fix] = function(data, fn){
			return arguments.length > 0 ? this.on(fix, null, data, fn) : this.trigger(fix);
		};
	});


}(jQuery));
