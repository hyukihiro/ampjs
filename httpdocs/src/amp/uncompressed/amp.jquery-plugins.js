/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
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
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 0.1
	 *
	 * @class jQuery.Event
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

(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 0.1
	 *
	 * @class jQuery.Event
	 */


	/*--------------------------------------------------------------------------
		@resizestop
		@scrpllstop
	--------------------------------------------------------------------------*/
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

(function($){

	// 'use strict';


	/**
	 * <h3>jQueryオブジェクト拡張</h3>
	 * version: 0.1
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
	 * @param  {Functions or Array} arguments 関数か関数を格納した配列を渡す
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

		// return jQuery.Deferred
		return $def.promise();
	};


  /**
   * <h4>引数に渡した関数を縦列処理します</h4>
   * 実行した関数の戻り値は、次の関数の引数とproglessに渡します。
   *
   * @static
   * @method stream
   * @param {Function} argments 関数、もしくは配列に格納した関数
   * @return {jQuery.Deferred} jQuery.Deferredオブジェクトを返す
   */
  $.stream = function(){
    var $defer = new $.Deferred(),
    count = 0,
    callbacks;

    if($.isArray(arguments[0])){
      callbacks = arguments[0];
    } else {
      callbacks = [].slice.apply(arguments);
    }

    callbacks[callbacks.length] = $defer.resolve;

    // callbacksを再帰的に縦列処理する
    var stream = function(fn, args){
      $.when(fn(args))
      .fail($defer.reject)
      .done(function(returns){
        $defer.notify(returns);
        count += 1;
        if(count !== callbacks.length){
          stream(callbacks[count], returns);
        }
      });
    };

    stream(callbacks[count]);
    return $defer.promise();
  };



}(jQuery));

(function($){

	// 'use strict';


	/**
	 * <h3>jQueryプロタイプオブジェクト拡張</h3>
	 * version: 0.2
	 *
	 * @class jQuery.fn
	 */


	/**
	 * <h4>cssをアニメーションqueueで管理します</h4>
	 *
	 * @method qCss
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
	 * @return {jQuery}
	 */
	/**
	 * <h4>attrをアニメーションqueueで管理します</h4>
	 *
	 * @method qAttr
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
	 * @return {jQuery}
	 */
  $.each({
		css : 'qCss',
		attr: 'qAttr'
	}, function(orig, fix){

		$.fn[fix] = function(prop, val, callback){
			var self = this;

			if($.isFunction(val)){
				callback = val;
				val = undefined;
			}

			return self.queue(function(){
				self[orig](prop, val).dequeue();
				if($.isFunction(callback)){
					callback(self);
				}
			});
		};
	});


	/**
	 * <h4>addClassをアニメーションqueueで管理します</h4>
	 *
	 * @method qAddClass
	 * @param  {String or Object} prop プロパティ名かオブジェクトで値を渡す
	 * @param  {String or Function} val プロパティ値かコールバック関数
	 * @param  {Function} callback コールバック関数
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

		$.fn[fix] = function(val, callback){
			var self = this;
			return self.queue(function(){
				self[orig](val).dequeue();
				if($.isFunction(callback)){
					callback(self);
				}
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
			self.dequeue();
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
   * @static
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
