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


	/*--------------------------------------------------------------------------
		@slip
	--------------------------------------------------------------------------*/
	/**
	 * <h4>マウスインした時の方向を取得するイベント</h4>
	 * <p>イベントオブジェクトに取得したオブジェクトを返します<br>
	 * <em>インライン要素は対象外です</em><br>
	 * <a href="../../demo/$.slip.html">DEMO</a></p>
	 *
	 * @event slipin
	 * @example
	 * $(elm).on('slipin', callback);
	 * $(elm).slipin(callback);
	 */
	/**
	 * <h4>マウスアウトした時の方向を取得するイベント</h4>
	 * <p>イベントオブジェクトに取得したオブジェクトを返します<br>
	 * <em>インライン要素は対象外です</em><br>
	 * <a href="../../demo/$.slip.html">DEMO</a></p>
	 *
	 * @event slipout
	 * @example
	 * $(elm).on('slipout', callback);
	 * $(elm).slipout(callback);
	 */
	$.each({
		mouseenter: 'slipin',
		mouseleave: 'slipout'
	}, function(orig, fix){

		$.event.special[fix] = {

			// on
			setup: function(){
				$(this).on(orig, $.event.special[fix].handler);
			},

			// off
			teardown: function(){
				$(this).off(orig, $.event.special[fix].handler);
			},

			// handler
			handler: function(event){
				var obj = {},
				$this = $(this),
				offset = $this.offset(),
				w = $this.width(),
				h = $this.height(),
				x = (event.pageX - offset.left - (w / 2)) * (w > h ? (h / w) : 1),
				y = (event.pageY - offset.top - (h / 2)) * (h > w ? (w / h) : 1),
				direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

				obj.originalEvent = event;
				obj.x = x;
				obj.y = y;
				obj.type = fix;
				// obj.direction = direction;

				switch(direction){
				case 0:
					obj.direction = 'top';
					break;

				case 1:
					obj.direction = 'right';
					break;

				case 2:
					obj.direction = 'bottom';
					break;

				case 3:
					obj.direction = 'left';
					break;
				}

				$this.trigger(obj);
			}
		};


		// add shorthand
		$.fn[fix] = function(data, fn){
			return arguments.length > 0 ? this.on(fix, null, data, fn) : this.trigger(fix);
		};
	});


	/**
	 * <h4>slipin, slipout ショートハンド</h4>
	 * <p><em>インライン要素は対象外です</em><br>
	 * <a href="../../demo/$.slip.html">DEMO</a></p>
	 *
	 * @event slip
	 * @param {Function} fnIn  slipinコールバック関数
	 * @param {Function} fnOut slipoutコールバック関数
	 * @example
	 * $(elm).slip(inCallback, outCallback);
	 */
	$.fn.slip = function(fnIn, fnOut){
		return this.slipin(fnIn).slipout(fnOut || fnIn);
	};


}(jQuery));
