/*-----------------------------------------------------
library.tab.js v1.0.3 - 2013.08.30

Copyright(c) INVOGUE.CO,. Ltd. ALL Rights Reserved.
http://www.invogue.co.jp/
-------------------------------------------------------*/

;(function($){
	Library.tab = function($target, options){
		// options
		var o = $.extend({
			naviClass   : 'tab-navi',    // className
			contentClass: 'tab-content', // className
			sectionClass: 'tab-section', // className
			current   : 0,
			duration  : 400,
			easing    : 'easeOutExpo',
			type      : 'rover',          // rover || toggle || text
			scroll    : false,
			isObserve : true,
			hashScroll: true
		}, options);

		var $wrap = $target;

		// PARAM
		var PARAM = {
			$wrap      : $wrap,
			$navi      : $wrap.find('.' + o.naviClass + ' a').off(),
			$content   : $wrap.find('.' + o.contentClass),
			$section   : $wrap.find('.' + o.sectionClass),
			$img       : '',
			current    : o.current,
			activeClass: 'active',
			isAnimate  : false
		};

		/**
		 * init: 初期化
		 */
		var init = function(){
			set();
			setButton();

			if(o.isObserve && $.isDevice('pc')){
				Library.observer(function(){
					resetHeight();
				});
			}
			if($.isDevice('sd')){
				resetHeight();
			}
		};

		/**
		 * set: 初期設定
		 */
		var set = function(){
			// setElment
			PARAM.$img = o.type != 'text' && PARAM.$navi.find('img');

			// set: current
			var id,	i = 0, l = PARAM.$navi.length;
			for(; i < l; i+=1){
				id = PARAM.$navi.eq(i).attr('href');
				if(Library.hasHash(id)){
					PARAM.current = i;
					if(o.hashScroll){
						setTimeout(function(){
							scrollTo(0, PARAM.$wrap.offset().top);
						}, 50);
					}
					break;
				}
			}
			// set: style
			PARAM.$section.not(':eq('+ PARAM.current +')').css({display: 'none', opacity: 0 < o.duration ? 0 : 1});
			PARAM.$content.height(PARAM.$section.eq(PARAM.current).outerHeight(true));
			resetButton(PARAM.current);
		};

		/**
		 * setButton: イベント設定
		 */
		var setButton = function(){
			PARAM.$navi.click(function(){
				var num = PARAM.$navi.index(this);
				if(PARAM.isAnimate || PARAM.current == num) return false;
				toggle(num, PARAM.current);
				resetButton(num, PARAM.current);
				PARAM.current = num;
				if(typeof o.scroll == 'number')	scroll();
				return false;
			});
		};

		/**
		 * resetButton: ボタンの状態、再設定
		 */
		var resetButton = function(next, prev){
			// reset: activeClass
			PARAM.$navi.eq(next).addClass(PARAM.activeClass);
			PARAM.$navi.eq(prev).removeClass(PARAM.activeClass);
			// reset: rover
			if(o.type == 'rover'){
				if(typeof prev == 'number')	Library.rollover({$rollover: PARAM.$img.eq(prev).removeClass(PARAM.activeClass)});
				Library.active(PARAM.$img.eq(next));
			} else if(o.type == 'toggle'){
				if(typeof prev == 'number')	Library.replaceImg(PARAM.$img.eq(prev), '_on.', '.').removeClass(PARAM.activeClass).off();
				Library.active(PARAM.$img.eq(next));
			}
		};

		/**
		 * toggle: 表示・非表示処理
		 */
		var toggle = function(next, prev){
			var nextHeight = PARAM.$section.eq(next).outerHeight(true);
			if(0 < o.duration){
				PARAM.isAnimate = true;
				PARAM.$content.stop(true, false).animate({height: nextHeight}, o.duration, o.easing, function(){
					PARAM.isAnimate = false;
				});
				PARAM.$section.eq(next).show().stop(true, false).animate({opacity: 1}, o.duration, o.easing);
				PARAM.$section.eq(prev).stop(true, false).animate({opacity: 0}, o.duration, o.easing, function(){
					$(this).hide();
				});
			} else {
				PARAM.$content.height(nextHeight);
				PARAM.$section.eq(next).show();
				PARAM.$section.eq(prev).hide();
			}
		};

		/**
		 * scroll: スクロール
		 */
		var scroll = function(){
			var moveTo = PARAM.$wrap.offset().top + o.scroll;
			if($(window).scrollTop() != moveTo){
				$('html, body').stop(true, false).animate({scrollTop: moveTo}, o.duration, Library.scroll.options.easing);
			}
		};

		/**
		 * resetHeight: 高さの再設定
		 */
		var resetHeight = function(){
			var nextHeight = PARAM.$section.eq(PARAM.current).outerHeight(true);
			if(o.duration == 0){
				PARAM.$content.height(nextHeight);
			} else {
				PARAM.isAnimate = true;
				PARAM.$content.stop(true, false).animate({height: nextHeight}, o.duration, o.easing, function(){
					PARAM.isAnimate = false;
				});
			}
		};

		return init();
	};

}(jQuery));
