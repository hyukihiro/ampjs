(function($){

	// 'use strict';


	/**
	 * <h3>jQueryイベントを拡張します</h3>
	 * version: 1.0
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
	Flick.VERSION = '1.2';


	/**
	 * <h4>イベント設定値</h4>
	 *
	 * @property data
	 * @type {Object}
	 */
	Flick.data = {
    // isCancel: true
    hit : 50,
    area: 10
	};


	/**
	 * <h4>タッチイベントが有効か判定</h4>
	 *
	 * @property isTouch
	 * @type {Boolean}
	 */
	Flick.isTouch = (function(){
    var div = document.createElement('div');
    div.setAttribute('ontouchstart', 'return');
    return typeof div.ontouchstart === 'function';
  }());


	/**
	 * <h4>イベントの種類</h4>
	 *
	 * @property events
	 * @type {Object}
	 */
	Flick.events = [
		'flick',
		'flickX',
		'flickY',
		'flickcancel',
		// 'flickcancelX',
		// 'flickcancelY',
		'flickmove',
		'flickmoveX',
		'flickmoveY'
	];


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
		};
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
		isSide = (type === 'flick' || type === 'flickX'),
		isUpdown = (type === 'flick' || type === 'flickY');

		// isType = Flick.getFlickHasMap(type)

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			// if(param.isCancel){
			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				Flick.setMoveData(moveEvent, data, param);
				if((data.isMoveX && isSide) || (data.isMoveY && isUpdown)){
					//moveEvent.preventDefault();
				}
			})
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

				if((isSide && isX) || (isUpdown && isY)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				if((isSide && data.isMoveX) || (isUpdown && data.isMoveY)){
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

					var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
					isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

					if((isSide && isX) || (isUpdown && isY)){
						$target.trigger(data.flickEvent);
					}
				}

			});
		};
	};


	/**
	 * キャンセル処理
	 * [getCancelHandler description]
	 */
	Flick.getCancelHandler = function(type){
		var attr = '._' + type.toUpperCase(),
		isSide = (type === 'flickcancel' || type === 'flickcancelX'),
		isUpdown = (type === 'flickcancel' || type === 'flickcancelY');

		// isType = Flick.getFlickHasMap(type)

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			// if(param.isCancel){
			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				Flick.setMoveData(moveEvent, data, param);
				if((data.isMoveX && isSide) || (data.isMoveY && isUpdown)){
					//moveEvent.preventDefault();
				}
			})
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

				if((isSide && isX) || (isUpdown && isY)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

				if((isSide && data.isMoveX) || (isUpdown && data.isMoveY)){
					return false;
				}
			});

			// up
			$('html').off('mouseup' + attr + ' touchend' + attr)
			.one('mouseup' + attr + ' touchend' + attr, function(){
				$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);

				if(data && data.flickEvent){
					var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
					isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

					data.flickEvent.type  = type;
					data.flickEvent.moveX = data.moveX;
					data.flickEvent.moveY = data.moveY;

					if(((isSide && data.isMoveX) || (isUpdown && data.isMoveY)) && (!isX || !isY)){
						$target.trigger(data.flickEvent);
					}
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
		var attr = '._' + type.toUpperCase(),
		isSide = (type === 'flickmove' || type === 'flickmoveX'),
		isUpdown = (type === 'flickmove' || type === 'flickmoveY');

		return function($target, startEvent, param){
			var data = Flick.createEventData(startEvent);

			// if(param.isCancel){
			if(!Flick.isTouch){
				startEvent.preventDefault();
			}

			// move
			$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr)
			.on('mousemove' + attr + ' touchmove' + attr, function(moveEvent){
				Flick.setMoveData(moveEvent, data, param);

				// イベントタイプ振り分け
				if(data.isMoveX){
					if(type === 'flickmove' || type === 'flickmoveX'){
						//moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(data.isMoveY){
					if(type === 'flickmove' || type === 'flickmoveY'){
						//moveEvent.preventDefault();
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				}
        if((data.isMoveX && isSide) || (data.isMoveY && isUpdown)){
          moveEvent.preventDefault();
        }

			})
			.on('click' + attr, function(clickEvent){
				if(isSide && data.isMoveX && param.area < Math.abs(data.moveX)){
					clickEvent.preventDefault();
				}
			});

			// find > a
			$target.find('a').off('click' + attr)
			.on('click' + attr, function(clickEvent){
				var isX = data.isMoveX && param.area < Math.abs(data.moveX) && isSide,
				isY = data.isMoveY && param.area < Math.abs(data.moveY) && isUpdown;

				if((isSide && isX) || (isUpdown && isY)){
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
	 * <h4>イベントフラグの生成</h4>
	 *
	 * @method hasEventType
	 * @param  {String}  type イベントタイプ
	 * @return {Object}
	 */
	Flick.getFlickHasMap = function(type){
		return {
			isSide  : (
				type === 'flick' ||
				type === 'flickX' ||
				type === 'flickmove' ||
				type === 'flickmoveX' ||
				type === 'flickcancel' ||
				type === 'flickcancelX'),
			isUpdown: (
				type === 'flick' ||
				type === 'flickY' ||
				type === 'flickmove' ||
				type === 'flickmoveX' ||
				type === 'flickcancel' ||
				type === 'flickcancelY')
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



	/* flick
	-----------------------------------------------------------------*/

	// addEventType
	// $.each(Flick.events, function(key){
	// 	Flick[key] = {
	// 		setup   : Flick.getSetup(key),
	// 		teardown: Flick.getTeardown(key),
	// 		handler : Flick.getFlickHandler(key)
	// 	}
	// });


	// flick フリックイベントオブジェクトY軸
	Flick.flick = {
		setup   : Flick.getSetup('flick'),
		teardown: Flick.getTeardown('flick'),
		handler : Flick.getFlickHandler('flick')
	};

	// flickX フリックイベントオブジェクトX軸
	Flick.flickX = {
		setup   : Flick.getSetup('flickX'),
		teardown: Flick.getTeardown('flickX'),
		handler : Flick.getFlickHandler('flickX')
	};

	// 追加予定
	// flickY フリックイベントオブジェクトY軸
	// Flick.flickY = {
	// 	setup   : Flick.getSetup('flickY'),
	// 	teardown: Flick.getTeardown('flickY'),
	// 	handler : Flick.getFlickHandler('flickY')
	// };



	/* cancel
	-----------------------------------------------------------------*/

	// flickcancel フリックキャンセルイベントオブジェクト
	Flick.flickcancel = {
    setup   : Flick.getSetup('flickcancel'),
    teardown: Flick.getTeardown('flickcancel'),
    handler : Flick.getCancelHandler('flickcancel')
	};

	// 追加予定
	// Flick.flickcancelX = {}
	// Flick.flickcancelY = {}



	/* move
	-----------------------------------------------------------------*/

	// flickmove フリックムーブイベントオブジェクト
	Flick.flickmove = {
		setup   : Flick.getSetup('flickmove'),
		teardown: Flick.getTeardown('flickmove'),
		handler : Flick.getMoveHandler('flickmove')
	};

	// flickmoveX フリックムーブイベントオブジェクトX軸
	Flick.flickmoveX = {
		setup   : Flick.getSetup('flickmoveX'),
		teardown: Flick.getTeardown('flickmoveX'),
		handler : Flick.getMoveHandler('flickmoveX')
	};

	// flickmoveY フリックムーブイベントオブジェクトY軸
	Flick.flickmoveY = {
    setup   : Flick.getSetup('flickmoveY'),
    teardown: Flick.getTeardown('flickmoveY'),
    handler : Flick.getMoveHandler('flickmoveY')
	};



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	$._Flick = Flick;

	$.each(Flick.events, function(index, key){
		// addEvent
		$.event.special[key] = Flick[key];

		// shorthand
		$.fn[key] = function(data, fn){
			return arguments.length > 0 ? this.on(key, null, data, fn) : this.trigger(key);
		};
	});


}(jQuery));
