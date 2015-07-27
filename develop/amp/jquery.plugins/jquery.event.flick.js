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
	Flick.VERSION = '1.3.2';


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
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(type === 'flickmoveX'){
					if(data.isMoveY && !data.isMoveX){
						$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
					} else if(data.isMoveX){
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				} else if(type === 'flickmoveY'){
					if(data.isMoveX && !data.isMoveY){
						$target.off('mousemove' + attr + ' touchmove' + attr + ' click' + attr);
					} else if(data.isMoveY){
						data.flickEvent.type = type;
						data.flickEvent.moveX = data.moveX;
						data.flickEvent.moveY = data.moveY;
						$target.trigger(data.flickEvent);
					}
				}

				// エリア最小値を超えればイベントキャンセル
        if((data.isMoveX && eventType.isSide) || (data.isMoveY && eventType.isUpdown)){
          moveEvent.preventDefault();
        }
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
