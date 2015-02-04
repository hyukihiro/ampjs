(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 0.1
	 *
	 * @class jQuery.Event
	 */

	/**
	 * <h4>Flickイベントオブジェクト</h4>
	 *
	 * @module Flick
	 * @type {Object}
	 */
	var Flick = {};


	/**
	 * <h4>バージョン情報</h4>
	 *
	 * @property VERSION
	 * @type {String}
	 */
	Flick.VERSION = '1.0';


	/**
	 * <h4>イベント設定値</h4>
	 *
	 * @property data
	 * @type {Object}
	 */
	Flick.data = {
    hit : 50,
    area: 10,
    isCancel: true
	};


	/**
	 * <h4>タッチイベントが有効か</h4>
	 *
	 * @property isTouch
	 * @type {Boolean}
	 */
	Flick.isTouch = ('ontouchstart' in window);


	/**
	 * <h4>イベントの種類</h4>
	 *
	 * @property events
	 * @type {Object}
	 */
	Flick.events = {
    flick      : 'flick',
    flickside  : 'flickside',
    flickupdown: 'flickupdown',
    flickmove  : 'flickmove',
    flickmoveX : 'flickmoveX',
    flickmoveY : 'flickmoveY'
	};


	/**
	 * <h4>イベント登録関数の生成</h4>
	 *
	 * @method getSetup
	 * @param  {String} type イベント名
	 * @return {Function}
	 */
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


	/**
	 * <h4>イベント削除関数の生成</h4>
	 *
	 * @method getTeardown
	 * @param  {String} type イベント名
	 * @return {Function}
	 */
	Flick.getTeardown = function(type){
		var attr = '._' + type.toUpperCase();

		return function(){
			$(this).off('mousedown' + attr + ' touchstart' + attr, Flick[type].handler);
		}
	};


	/**
	 * <h4>フリックイベントハンドラ</h4>
	 *
	 * @method getFlickHandler
	 * @param  {String} type イベント名
	 * @return {Void}
	 */
	Flick.getFlickHandler = function(type){
		var attr = '._' + type.toUpperCase(),
		isSide = (type === 'flick' || type === 'flickside'),
		isUpdown = (type === 'flick' || type === 'flickupdown');

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			if(param.isCancel){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				Flick.setMoveData(moveEvent, data, param);

				if(data.isMoveX && isSide){
					moveEvent.preventDefault();
				} else if(data.isMoveY && isUpdown){
					moveEvent.preventDefault();
				}
			})
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide;
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;
				if(isX || isY){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide;
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;
				if(isX || isY){
					clickEvent.preventDefault();
				}
			});

			// up
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.one('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);

				if(isSide && data.isMoveX && param.area < Math.abs(data.moveX)){
					data.flickEvent.type = type;
					data.flickEvent.moveX = data.moveX;
					data.flickEvent.moveY = data.moveY;
					$target.trigger(data.flickEvent);

				} else if(isUpdown && data.isMoveY && param.area < Math.abs(data.moveY)){
					data.flickEvent.type = type;
					data.flickEvent.moveX = data.moveX;
					data.flickEvent.moveY = data.moveY;
					$target.trigger(data.flickEvent);
				}
			});
		};
	};


	/**
	 * <h4>move系イベントハンドラ</h4>
	 *
	 * @method getMoveHandler
	 * @return {Void}
	 */
	Flick.getMoveHandler = function(type){
		var attr = '._' + type.toUpperCase();

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			if(param.isCancel){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				Flick.setMoveData(moveEvent, data, param);

				// イベントタイプ振り分け
				if(data.isMoveX){
					if(type === 'flickmove' || type === 'flickmoveX'){
						moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(data.isMoveY){
					if(type === 'flickmove' || type === 'flickmoveY'){
						moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				}
			})
			.on('click' + attr, function(clickEvent){
				if(data.isMoveX && param.area < Math.abs(data.moveX)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				if(data.isMoveX && param.area < Math.abs(data.moveX)){
					clickEvent.preventDefault();
				}
			});

			// off
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.on('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
			});
		};
	};


	/**
	 * <h4>イベントステートデータ生成</h4>
	 *
	 * @method createData
	 * @param  {Object} event イベント開始データ（タッチスタート・マウスダウン）
	 * @return {Object}
	 */
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


	/**
	 * <h4>move中の値のセット</h4>
	 *
	 * @method setMoveData
	 * @param {Object} event イベントデータオブジェクト
	 * @param {Object} data ステートデータ
	 * @param {Object} param イベント設定値
	 * @return {Void}
	 */
	Flick.setMoveData = function(event, data, param){
		data.flickEvent = event;

		if(Flick.isTouch){
			data.moveX = event.originalEvent.changedTouches[0].pageX - data.startX;
			data.moveY = data.startY - event.originalEvent.changedTouches[0].pageY;
		} else {
			data.moveX = event.pageX - data.startX;
			data.moveY = data.startY - event.pageY;
		}

		if(!data.isMoveX && param.area < Math.abs(data.moveY)){
			data.isMoveY = true;
		} else if(!data.isMoveY && param.area < Math.abs(data.moveX)){
			data.isMoveX = true;
		}
	};



	/*--------------------------------------------------------------------------
		@flick
	--------------------------------------------------------------------------*/

	/**
	 * <h4>フリックイベントオブジェクト</h4>
	 *
	 * @event flick
	 * @type {Object}
	 */
	Flick.flick = {};


	/**
	 * <h4>イベント追加</h4>
	 *
	 * @method setup
	 * @return {Void}
	 */
	Flick.flick.setup = Flick.getSetup('flick');


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @event teardown
	 * @return {Void}
	 */
	Flick.flick.teardown = Flick.getTeardown('flick');


	/**
	 * <h4>イベントハンドラ</h4>
	 *
	 * @method handler
	 * @return {Void}
	 */
	Flick.flick.handler = Flick.getFlickHandler('flick');



	/*--------------------------------------------------------------------------
		@flick
	--------------------------------------------------------------------------*/

	/**
	 * <h4>フリックイベントオブジェクト</h4>
	 *
	 * @event flickside
	 * @type {Object}
	 */
	Flick.flickside = {};


	/**
	 * <h4>イベント追加</h4>
	 *
	 * @method setup
	 * @return {Void}
	 */
	Flick.flickside.setup = Flick.getSetup('flickside');


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @event teardown
	 * @return {Void}
	 */
	Flick.flickside.teardown = Flick.getTeardown('flickside');


	/**
	 * <h4>イベントハンドラ</h4>
	 *
	 * @method handler
	 * @return {Void}
	 */
	Flick.flickside.handler = Flick.getFlickHandler('flickside');



	/*--------------------------------------------------------------------------
		@flickmove
	--------------------------------------------------------------------------*/

	/**
	 * <h4>フリックムーブイベントオブジェクト</h4>
	 *
	 * @event flickmove
	 * @type {Object}
	 */
	Flick.flickmove = {};


	/**
	 * <h4>イベント追加</h4>
	 *
	 * @method setup
	 * @return {Void}
	 */
	Flick.flickmove.setup = Flick.getSetup('flickmove');


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @event teardown
	 * @return {Void}
	 */
	Flick.flickmove.teardown = Flick.getTeardown('flickmove');


	/**
	 * <h4>イベントハンドラ</h4>
	 *
	 * @method handler
	 * @return {Void}
	 */
	Flick.flickmove.handler = Flick.getMoveHandler('flickmove');



	/*--------------------------------------------------------------------------
		@flickmoveX
	--------------------------------------------------------------------------*/
	/**
	 * <h4>フリックムーブイベントオブジェクト</h4>
	 *
	 * @event flickmoveX
	 * @type {Object}
	 */
	Flick.flickmoveX = {};


	/**
	 * <h4>イベント追加</h4>
	 *
	 * @method setup
	 * @return {Void}
	 */
	Flick.flickmoveX.setup = Flick.getSetup('flickmoveX');


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @event teardown
	 * @return {Void}
	 */
	Flick.flickmoveX.teardown = Flick.getTeardown('flickmoveX');


	/**
	 * <h4>イベントハンドラ</h4>
	 *
	 * @method handler
	 * @return {Void}
	 */
	Flick.flickmoveX.handler = Flick.getMoveHandler('flickmoveX');



	/*--------------------------------------------------------------------------
		@flickmoveY
	--------------------------------------------------------------------------*/
	/**
	 * <h4>フリックムーブイベントオブジェクト</h4>
	 *
	 * @event flickmoveY
	 * @type {Object}
	 */
	Flick.flickmoveY = {};


	/**
	 * <h4>イベント追加</h4>
	 *
	 * @method setup
	 * @return {Void}
	 */
	Flick.flickmoveY.setup = Flick.getSetup('flickmoveY');


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @event teardown
	 * @return {Void}
	 */
	Flick.flickmoveY.teardown = Flick.getTeardown('flickmoveY');


	/**
	 * <h4>イベントハンドラ</h4>
	 *
	 * @method handler
	 * @return {Void}
	 */
	Flick.flickmoveY.handler = Flick.getMoveHandler('flickmoveY');



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	$._Flick = Flick;

	for(var key in Flick.events){
		// addEvent
		$.event.special[key] = Flick[key];

		// shorthand
		$.fn[key] = function(data, fn){
			return arguments.length > 0 ? this.on(key, null, data, fn) : this.trigger(key);
		};
	};


}(jQuery));
