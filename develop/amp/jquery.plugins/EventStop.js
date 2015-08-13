/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * <p>jQueryオブジェクトを拡張し、Pluginとして使用します</p>
	 *
	 * @class jQuery
	 */

	/**
	 * <h4>リサイズイベントを間引き、リサイズ完了後発火します</h4>
	 * <p><a href="../../demo/$.stop.html#sec01">DEMO</a></p>
	 *
	 * @event resizestop
	 * @param {Object} 間引く時間を指定 default {timer: 200}
	 * @example
	 * $(window).on('resizestop', callback);
	 * $(window).on('resizestop', {timer: 1000}, callback);
	 */
	/**
	 * <h4>スクロールイベントを間引き、スクロール完了後発火します</h4>
	 * <p><a href="../../demo/$.stop.html#sec02">DEMO</a></p>
	 *
	 * @event scrollstop
	 * @param {Object} 間引く時間を指定 default {timer: 200}
	 * @example
	 * $(window).on('scrollstop', {timer: 1000}, callback);
	 * $(window).on('scrollstop', callback);
	 * $(window).scrollstop(callback);
	 */
	$.each({
		resize: 'resizestop',
		scroll: 'scrollstop'
	}, function(orig, fix){

		$.event.special[fix] = {
			// data
			data: {
				eventType: fix,
				timer    : 50,
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
