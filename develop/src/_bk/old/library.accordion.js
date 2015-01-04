/*-----------------------------------------------------
library.accordion.js v1.0.3 - 2013.07.30

Copyright(c) INVOGUE.CO,. Ltd. ALL Rights Reserved.
http://www.invogue.co.jp/
-------------------------------------------------------*/
;(function($){
	Library.accordion = function($trigger, options){
		var o = $.extend({
			isOpen  : false,
			duration: 400,
			easing  : 'easeOutExpo',
			type    : 'rover', // rover, toggle, alpha, text,
			scroll  : false
		}, options);

		var PARAM = {
			$trigger   : $trigger,
			$targets   : [],
			heights    : [],
			isOpen     : [],
			activeClass: 'active',
			current    : 0,
			isAnimate  : false
		};

		/**
		 * 初期化
		 */
		var init = function(){
			set();
			setButton();
		};

		/**
		 * set: 初期設定
		 */
		var set = function(){
			var $t, id, $id, isOpen, $y,
					isFirst = true,
					i = 0, l = PARAM.$trigger.length;
			for(; i < l; i+=1){
				$t = PARAM.$trigger.eq(i);
				id = $t.attr('href');
				$id = $(id);
				PARAM.$targets.push($id);
				PARAM.current = i;

				// set: value
				$id.css({ display: 'block', overflow: 'hidden'});
				PARAM.heights.push($id.height());

				// set: open or close
				if(Library.hasHash(id)){
					isOpen = true;
					if(isFirst){
						isFirst = false;
						$y = $t;
						setTimeout(function(){ scrollTo(0, $y.offset().top);}, 50);
					}
				} else {
					if(o.isOpen){
						isOpen = true;
					} else {
						if(0 < o.duration){
							$id.css({ display: 'none', height: 0});
						} else {
							$id.css({ display: 'none'});
						}
						isOpen = false;
					}
				}
				// set: value
				PARAM.isOpen.push(isOpen);
				resetButton($t);
			}
		};

		/**
		 * setButton: イベント設定
		 */
		var setButton = function(){
			// navi
			PARAM.$trigger.off().on('click', function(){
				if(!PARAM.isAnimate){
					PARAM.current = PARAM.$trigger.index(this);
					PARAM.isOpen[PARAM.current] = PARAM.isOpen[PARAM.current] ? false : true;
					resetButton($(this));
					toggle();
					if(typeof o.scroll == 'number')	scroll($(this));
				}
				return false;
			});

			// close button
			var i = 0, l = PARAM.$targets.length;
			for(; i < l; i+=1){
				if(!PARAM.$targets[i].find('a.close')[0]) continue;
				var num = i;
				PARAM.$targets[num].find('a.close').off().on('click', function(e){
					if(PARAM.isAnimate) return false;
					PARAM.isOpen[num] = PARAM.isOpen[num] ? false : true;
					PARAM.current = num;
					var $target = PARAM.$trigger.eq(num);
					resetButton($target);
					toggle();
					if(typeof o.scroll == 'number')	scroll($target);
					return false;
				});
			}
		};

		/**
		 * resetButton: ボタンスタイルのリセット
		 */
		var resetButton = function($target){
			var $img = o.type != 'text' && $target.find('img');

			// open closeの判定 [open: true]
			if(PARAM.isOpen[PARAM.current]){
				$target.addClass(PARAM.activeClass);
				if(o.type == 'rover'){
					Library.rollover({$rollover: Library.replaceImg($img, '_close', '_open')});
				} else if(o.type == 'alpha' || o.type == 'toggle'){
					Library.replaceImg($img, '_close', '_open');
				}
			} else {
				$target.removeClass(PARAM.activeClass);
				if(o.type == 'rover'){
					Library.rollover({$rollover: Library.replaceImg($img, '_open', '_close')});
				} else if(o.type == 'alpha' || o.type == 'toggle'){
					Library.replaceImg($img, '_open', '_close');
				}
			}
		};

		/**
		 * scroll: スクロール
		 */
		var scroll = function($target){
			var moveTo = $target.offset().top + o.scroll;
			if($(window).scrollTop() != moveTo){
				$('html, body').stop(true, false).animate({ scrollTop: moveTo}, o.duration, o.easing);
			}
		};

		/**
		 * toggle: 開閉処理
		 */
		var toggle = function(){
			var num = PARAM.current,
					$target = PARAM.$targets[num],
					isOpen = PARAM.isOpen[num];

			if(0 < o.duration){
				PARAM.isAnimate = true;
				if(isOpen){
					$target.css({display: 'block'}).stop(true, false).animate({height: PARAM.heights[num]}, o.duration, o.easing, function(){
						$(this).height('100%');
						PARAM.isAnimate = false;
					});
				} else {
					PARAM.heights[num] = $target.height();
					$target.stop(true, false).animate({ height: 0}, o.duration, o.easing, function(){
						PARAM.isAnimate = false;
					});
				};
			} else {
				if(isOpen){
					$target.css({display: 'block'});
				} else {
					$target.css({display: 'none'});
				};
			}
		};

		return init();
	};

}(jQuery));
