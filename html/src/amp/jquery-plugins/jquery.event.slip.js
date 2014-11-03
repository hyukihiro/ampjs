/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author  Yoshihito Fujiwara
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


;(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 0.1
	 *
	 * @class jQuery.Event
	 * @module jQuery.Event
	 */


	/*--------------------------------------------------------------------------
		@slip
	--------------------------------------------------------------------------*/
	/**
	 * <h4>マウスインした時の方向を取得するイベント</h4>
	 * イベントオブジェクトに取得したオブジェクトを返します
	 * <b>インライン要素には効きません</b>
	 *
	 * @event slipin マウスインした時の方向を取得したイベント
	 * @example
	 *	$(elm).on('slipin', callback);
	 *	$(elm).slipin(callback);
	 */
	/**
	 * <h4>マウスアウトした時の方向を取得するイベント</h4>
	 * イベントオブジェクトに取得したオブジェクトを返します
	 * <b>インライン要素には効きません</b>
	 *
	 * @event slipout マウスアウトした時の方向を取得したイベント
	 * @example
	 *	$(elm).on('slipout', callback);
	 *	$(elm).slipout(callback);
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
				obj.direction = direction;

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
	 *
	 * @event slipin slipout ショートハンド
	 * @param  {Function} fnIn  slipinコールバック関数
	 * @param  {Function} fnOut slipoutコールバック関数
	 * @example
	 *	$(elm).slip(inCallback, outCallback);
	 */
	$.fn.slip = function(fnIn, fnOut){
		return this.slipin(fnIn).slipout(fnOut || fnIn);
	};


}(jQuery));
