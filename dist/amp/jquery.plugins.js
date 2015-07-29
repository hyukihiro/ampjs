/**
 * AMP JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
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


(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * jQueryオブジェクトを拡張し、Pluginとして使用します
	 *
	 * @class jQuery
	 */


	/*--------------------------------------------------------------------------
		@config
	--------------------------------------------------------------------------*/

	// Flickイベントオブジェクト
	var Flick = {};


	// バージョン情報
	Flick.VERSION = '1.3.3';


	// イベント設定値
	Flick.data = {
    hit : 50, // ヒット判定最小値
    area: 10  // フリック判定最小値
	};


	// タッチイベントが有効か判定
	Flick.isTouch = (function(){
    var div = document.createElement('div');
    div.setAttribute('ontouchstart', 'return');
    return typeof div.ontouchstart === 'function';
  }());


	// イベントの種類
	Flick.events = {
    flick       : 'flick',
    flickX      : 'flickX',
    flickY      : 'flickY',
    flickmove   : 'flickmove',
    flickmoveX  : 'flickmoveX',
    flickmoveY  : 'flickmoveY',
    flickcancel : 'flickcancel',
    flickcancelX: 'flickcancelX',
    flickcancelY: 'flickcancelY'
	};



	/*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/* utility
	-----------------------------------------------------------------*/

	// イベントステートデータ生成
	Flick.createEventData = function(event){
		return {
			flickEvent: null,
			isMoveX   : false,
			isMoveY   : false,
			moveX     : 0,
			moveY     : 0,
			startX    : Flick.isTouch ? event.originalEvent.changedTouches[0].pageX : event.pageX,
			startY    : Flick.isTouch ? event.originalEvent.changedTouches[0].pageY : event.pageY
		};
	};


	// イベントフラグの生成
	Flick.getFlickHasMap = function(type){
		return {
			isSide: (
				type === Flick.events.flick ||
				type === Flick.events.flickX ||
				type === Flick.events.flickmove ||
				type === Flick.events.flickmoveX ||
				type === Flick.events.flickcancel ||
				type === Flick.events.flickcancelX),
			isUpdown: (
				type === Flick.events.flick ||
				type === Flick.events.flickY ||
				type === Flick.events.flickmove ||
				type === Flick.events.flickmoveX ||
				type === Flick.events.flickcancel ||
				type === Flick.events.flickcancelY)
		};
	};


	// move中の値のセット
	Flick.setMoveData = function(event, data, param){
		data.flickEvent = event;

		if(Flick.isTouch){
			data.moveX = event.originalEvent.changedTouches[0].pageX - data.startX;
			data.moveY = data.startY - event.originalEvent.changedTouches[0].pageY;
		} else {
			data.moveX = event.pageX - data.startX;
			data.moveY = data.startY - event.pageY;
		}

		if(param.area < Math.abs(data.moveY)){
			data.isMoveY = true;
		}
		if(param.area < Math.abs(data.moveX)){
			data.isMoveX = true;
		}
	};


	/* イベント登録関数の生成
	-----------------------------------------------------------------*/
	Flick.getSetup = function(type){
		var attr = '._' + type.toUpperCase();

		return function(data){
			var $this = $(this);
			$this.on('mousedown' + attr + ' touchstart' + attr, function(event){
				var param = $.extend({}, Flick.data, data);
				Flick[type].handler($this, event, param);
			});
		};
	};


	/* イベント削除関数の生成
	-----------------------------------------------------------------*/
	Flick.getTeardown = function(type){
		var attr = '._' + type.toUpperCase();
		return function(){
			$(this).off('mousedown' + attr + ' touchstart' + attr, Flick[type].handler);
		};
	};


	/* フリックイベントハンドラ
	-----------------------------------------------------------------*/
	Flick.getFlickHandler = function(type){
		var attr = '._' + type.toUpperCase(),
		eventType = Flick.getFlickHasMap(type);

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				if(!Flick.isTouch){
					moveEvent.preventDefault();
				}

				Flick.setMoveData(moveEvent, data, param);

				// イベントタイプが有効か判定して無効の場合削除
				if((type === 'flickX' && data.isMoveY && !data.isMoveX) ||
					(type === 'flickY' && data.isMoveX && !data.isMoveY))
				{
					$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
				}
			})
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && eventType.isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && eventType.isUpdown;

				if((eventType.isSide && isX) || (eventType.isUpdown && isY)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				if((eventType.isSide && data.isMoveX) || (eventType.isUpdown && data.isMoveY)){
					return false;
				}
			});

			// up
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.one('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);

				if(data && data.flickEvent){
					data.flickEvent.type  = type;
					data.flickEvent.moveX = data.moveX;
					data.flickEvent.moveY = data.moveY;

					var isX = data.isMoveX && param.hit < Math.abs(data.moveX) && eventType.isSide,
					isY = data.isMoveY && param.hit < Math.abs(data.moveY) && eventType.isUpdown;

					if((eventType.isSide && isX) || (eventType.isUpdown && isY)){
						$target.trigger(data.flickEvent);
					}
				}
			});
		};
	};


	/* フリックムーブイベントハンドラ
	-----------------------------------------------------------------*/
	Flick.getMoveHandler = function(type){
		var attr = '._' + type.toUpperCase(),
		eventType = Flick.getFlickHasMap(type);

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){

				Flick.setMoveData(moveEvent, data, param);
				if(!Flick.isTouch){
					moveEvent.preventDefault();
				}
				// イベントタイプ振り分け
				if(type === 'flickmove'){
					if(data.isMoveX || data.isMoveY){
	          moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(type === 'flickmoveX'){
					if(data.isMoveY && !data.isMoveX){
						$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
					} else if(data.isMoveX){
	          moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(type === 'flickmoveY'){
					if(data.isMoveX && !data.isMoveY){
						$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
					} else if(data.isMoveY){
	          moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				}

				// エリア最小値を超えればイベントキャンセル
        // if((data.isMoveX && eventType.isSide) || (data.isMoveY && eventType.isUpdown)){
	          // moveEvent.preventDefault();
        // }
			})
			.on('click' + attr, function(clickEvent){
				if(eventType.isSide && data.isMoveX && param.area < Math.abs(data.moveX)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && eventType.isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && eventType.isUpdown;

				if((eventType.isSide && isX) || (eventType.isUpdown && isY)){
					return false;
				}
			});

			// off
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.on('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
			});
		};
	};


	/* フリックキャンセルイベントハンドラ (フリック判定最小値を一回超えないと発生しません)
	-----------------------------------------------------------------*/
	Flick.getCancelHandler = function(type){
		var attr = '._' + type.toUpperCase(),
		eventType = Flick.getFlickHasMap(type);

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				if(!Flick.isTouch){
					moveEvent.preventDefault();
				}

				Flick.setMoveData(moveEvent, data, param);

				// イベントタイプが有効か判定して無効の場合削除
				if((type === 'flickcancelX' && data.isMoveY && !data.isMoveX) ||
					(type === 'flickcancelY' && data.isMoveX && !data.isMoveY))
				{
					$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
				}
			})
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && eventType.isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && eventType.isUpdown;

				if((eventType.isSide && isX) || (eventType.isUpdown && isY)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && eventType.isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && eventType.isUpdown;

				if((eventType.isSide && data.isMoveX) || (eventType.isUpdown && data.isMoveY)){
					return false;
				}
			});

			// up
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.one('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);

				if(data && data.flickEvent){
					var isX = param.hit > Math.abs(data.moveX) && eventType.isSide,
					isY = param.hit > Math.abs(data.moveY) && eventType.isUpdown;

					data.flickEvent.type  = type;
					data.flickEvent.moveX = data.moveX;
					data.flickEvent.moveY = data.moveY;

					if((eventType.isSide && data.isMoveX) || (eventType.isUpdown && data.isMoveY)){
						if(type === Flick.events.flickcancel && isX && isY){
							$target.trigger(data.flickEvent);
						} else if(type === Flick.events.flickcancelX && data.isMoveX && isX){
							$target.trigger(data.flickEvent);
						} else if(type === Flick.events.flickcancelY && data.isMoveY && isY){
							$target.trigger(data.flickEvent);
						}
					}
				}
			});
		};
	};


	/* flick
	-----------------------------------------------------------------*/

	// flick フリックイベントオブジェクト
	Flick.flick = {
		setup   : Flick.getSetup(Flick.events.flick),
		teardown: Flick.getTeardown(Flick.events.flick),
		handler : Flick.getFlickHandler(Flick.events.flick)
	};

	// flickX フリックイベントオブジェクトX軸
	Flick.flickX = {
		setup   : Flick.getSetup(Flick.events.flickX),
		teardown: Flick.getTeardown(Flick.events.flickX),
		handler : Flick.getFlickHandler(Flick.events.flickX)
	};

	// flickY フリックイベントオブジェクトY軸
	Flick.flickY = {
		setup   : Flick.getSetup(Flick.events.flickY),
		teardown: Flick.getTeardown(Flick.events.flickY),
		handler : Flick.getFlickHandler(Flick.events.flickY)
	};


	/* flickmove
	-----------------------------------------------------------------*/

	// flickmove フリックムーブイベントオブジェクト
	Flick.flickmove = {
		setup   : Flick.getSetup(Flick.events.flickmove),
		teardown: Flick.getTeardown(Flick.events.flickmove),
		handler : Flick.getMoveHandler(Flick.events.flickmove)
	};

	// flickmoveX フリックムーブイベントオブジェクトX軸
	Flick.flickmoveX = {
		setup   : Flick.getSetup(Flick.events.flickmoveX),
		teardown: Flick.getTeardown(Flick.events.flickmoveX),
		handler : Flick.getMoveHandler(Flick.events.flickmoveX)
	};

	// flickmoveY フリックムーブイベントオブジェクトY軸
	Flick.flickmoveY = {
    setup   : Flick.getSetup(Flick.events.flickmoveY),
    teardown: Flick.getTeardown(Flick.events.flickmoveY),
    handler : Flick.getMoveHandler(Flick.events.flickmoveY)
	};


	/* flickcancel
	-----------------------------------------------------------------*/

	// flickcancel フリックキャンセルイベントオブジェクト
	Flick.flickcancel = {
    setup   : Flick.getSetup(Flick.events.flickcancel),
    teardown: Flick.getTeardown(Flick.events.flickcancel),
    handler : Flick.getCancelHandler(Flick.events.flickcancel)
	};

	// flickcancelX フリックキャンセルイベントオブジェクトX軸
	Flick.flickcancelX = {
    setup   : Flick.getSetup(Flick.events.flickcancelX),
    teardown: Flick.getTeardown(Flick.events.flickcancelX),
    handler : Flick.getCancelHandler(Flick.events.flickcancelX)
	};

	// flickcancelY フリックキャンセルイベントオブジェクトY軸
	Flick.flickcancelY = {
    setup   : Flick.getSetup(Flick.events.flickcancelY),
    teardown: Flick.getTeardown(Flick.events.flickcancelY),
    handler : Flick.getCancelHandler(Flick.events.flickcancelY)
	};



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	$._Flick = Flick;

	$.each(Flick.events, function(index, key){
		// add Event
		$.event.special[key] = Flick[key];

		// add shorthand
		$.fn[key] = function(data, fn){
			return arguments.length > 0 ? this.on(key, null, data, fn) : this.trigger(key);
		};
	});



}(jQuery));

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * jQueryオブジェクトを拡張し、Pluginとして使用します
	 *
	 * @class jQuery
	 */


	/*--------------------------------------------------------------------------
		@slip
	--------------------------------------------------------------------------*/
	/**
	 * <h4>マウスインした時の方向を取得するイベント</h4>
	 * イベントオブジェクトに取得したオブジェクトを返します
	 * <em>インライン要素には効きません</em>
	 *
	 * @event slipin
	 * @example
	 *	$(elm).on('slipin', callback);
	 *	$(elm).slipin(callback);
	 */
	/**
	 * <h4>マウスアウトした時の方向を取得するイベント</h4>
	 * イベントオブジェクトに取得したオブジェクトを返します
	 * <b>インライン要素には効きません</b>
	 *
	 * @event slipout
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
	 *
	 * @event slip
	 * @param  {Function} fnIn  slipinコールバック関数
	 * @param  {Function} fnOut slipoutコールバック関数
	 * @example
	 *	$(elm).slip(inCallback, outCallback);
	 */
	$.fn.slip = function(fnIn, fnOut){
		return this.slipin(fnIn).slipout(fnOut || fnIn);
	};


}(jQuery));

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * jQueryオブジェクトを拡張し、Pluginとして使用します
	 *
	 * @class jQuery
	 */

	/**
	 * <h4>リサイズイベントを間引き、完了後発火します</h4>
	 *
	 * @event resizestop
	 * @param {Object} 間引く時間を指定 default {timer: 200}
	 * @example
	 *	$(window).on('resizestop', callback);
	 *	$(window).on('resizestop', {timer: 1000}, callback);
	 */
	/**
	 * <h4>スクロールイベントを間引き、完了後発火します</h4>
	 *
	 * @event scrollstop
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

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * jQueryオブジェクトを拡張し、Pluginとして使用します
	 *
	 * @class jQuery
	 */


	/*--------------------------------------------------------------------------
		@sequence
	--------------------------------------------------------------------------*/
	/**
	 * <h4>コールバック関数管理 </h4>
	 * Deferred resolve通知を受けたら次の関数へ移る
	 *
	 * @static
	 * @method sequence
	 * @param  {Functions|Array} arguments 関数か関数を格納した配列を渡す
	 * @return {jQuery.Deferred}
	 */
	$.sequence = function(){
		/*jslint loopfunc: true */
		var $def = new $.Deferred(),
		$Def = new $.Deferred(),
		callbacks,
		piped;

		if($.isArray(arguments[0])){
			callbacks = arguments[0];
		} else {
			callbacks = [].slice.apply(arguments);
		}

		callbacks[callbacks.length] = $def.resolve;

		var i = 0,
		l = callbacks.length;

		for(; i < l; i += 1){
			if($.isFunction(callbacks[i])){
				piped = (piped ? piped : $Def).pipe($.proxy(function(){
					return this();
				}, callbacks[i])).fail($def.reject);
			}
		}

		$Def.resolve();

		return $def.promise();
	};


  /**
   * <h4>引数に渡した関数を縦列処理します</h4>
   * 実行した関数の戻り値は、次の関数の引数とproglessに渡します。
   *
   * @static
   * @method stream
   * @param {Function} argments 関数、もしくは配列に格納した関数
   * @return {jQuery.Deferred}
   */
  $.stream = function(){
  	var slice = Array.prototype.slice;
    var $defer = new $.Deferred(),
    count = 0,
    callbacks = $.isArray(arguments[0]) ? callbacks : slice.call(arguments);

    callbacks.push($defer.resolve);
    stream();

    // callbacksを再帰的に縦列処理する
    function stream(){
    	$.when.call(null, callbacks[count].apply(null, arguments))
    	.fail($defer.reject)
    	.done(function(){
    		$defer.notify.call(null, arguments);
    		count += 1;
    		if(count < callbacks.length){
    			stream.apply(null, arguments);
    		}
    	});
    };

    return $defer.promise();
  };



}(jQuery));

(function($){

	// 'use strict';


	/**
	 * <h4>jQuery拡張</h4>
	 * jQueryオブジェクトを拡張し、Pluginとして使用します
	 *
	 * @class jQuery
	 */


	/**
	 * <h4>cssをアニメーションqueueで管理します</h4>
	 *
	 * @method qCss
	 * @param  {String|Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String|Function} val プロパティ値かコールバック関数
	 * @return {jQuery}
	 */
	/**
	 * <h4>attrをアニメーションqueueで管理します</h4>
	 *
	 * @method qAttr
	 * @param  {String|Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String|Function} val プロパティ値かコールバック関数
	 * @return {jQuery}
	 */
  $.each({
		css : 'qCss',
		attr: 'qAttr'
	}, function(orig, fix){

		$.fn[fix] = function(prop, val){
			var self = this;
			return self.queue(function(){
				return self[orig](prop, val).dequeue();
			});
		};
	});


	/**
	 * <h4>addClassをアニメーションqueueで管理します</h4>
	 *
	 * @method qAddClass
	 * @param  {String|Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String|Function} val プロパティ値かコールバック関数
	 * @return {jQuery}
	 */
	/**
	 * <h4>removeClassをアニメーションqueueで管理します</h4>
	 *
	 * @method qRemoveClass
	 * @param  {String} prop クラス名
	 * @param  {Function} val コールバック関数
	 * @return {jQuery}
	 */
  $.each({
		addClass   : 'qAddClass',
		removeClass: 'qRemoveClass'
	}, function(orig, fix){

		$.fn[fix] = function(val){
			var self = this;
			return self.queue(function(){
				return self[orig](val).dequeue();
			});
		};
	});


	/**
	 * <h4>コールバック関数をアニメーションqueueで管理します</h4>
	 *
	 * @method qCall
	 * @param  {Function} fn コールバック関数
	 * @return {jQuery}
	 */
	$.fn.qCall = function(fn){
		var self = this;
		return self.queue(function(){
			fn();
			return self.dequeue();
		});
	};


	/**
	 * <h4>属性値のreplace処理</h4>
	 *
	 * @method replaceAttr
	 * @param  {String} attr 属性名
	 * @param  {String} del  削除する文字列
	 * @param  {String} add  追加する文字列
	 * @return {jQuery}
	 */
	$.fn.replaceAttr = function(attr, del, add){
		var	val = this.attr(attr);

		if(val){
			add = add ? add : '';
			return this.attr(attr, val.replace(del, add));
		} else {
			return this;
		}
	};


  /**
   * <h4>ファイルの拡張子を取得</h4>
   *
   * @method getExt
   * @param  {String} attr 取得属性名
   * @return {String} 拡張子を返す
   */
  $.fn.getExt = function(attr){
    var val = this.attr(attr);
    if(val.indexOf('.') > -1){
      // var last = val.lastIndexOf('?') > -1 ? val.lastIndexOf('?') : val.length;
      // return val.substring(val.lastIndexOf('.'), val.length);
      return val.substring(val.lastIndexOf('.'));
    }
  };



}(jQuery));
