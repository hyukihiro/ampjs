;(function($, Typy){

	/**
	 * v0.1.0 - 2014.06.19
	 * @class: HoverTween
	 * [HoverTween ホバーアクションクラス]
	 * @return {HoverTween}
	 */
	Typy.HoverTween = (function(){
		/**
		 * [HoverTween コンストラクタ]
		 * @param {Object} config  [img要素とtweenタイプ]
		 * @param {Object} options [オプション値]
		 */
		var HoverTween = function($target, options){
			this.param = $.extend(true, {}, HoverTween.options, HoverTween.config, options, {$target: $target});
		};

		/**
		 * [fn プロトタイプ]
		 * @type {Object}
		 */
		HoverTween.fn = HoverTween.prototype;

		/**
		 * [config 設定値]
		 * @type {Object}
		 */
		HoverTween.config = {
			$target: null
		};

		/**
		 * [options オプション値]
		 * @type {Object}
		 */
		HoverTween.options = {
			type       : 'rollover', // [rollover, alpha, fade, slip]
			groupClass : 'group-over',
			activeClass: 'active',
			noOverClass: 'no-over',
			boxClass   : 'hover-box',
			opacity    : .7,
			duration   : 400,
			ease       : 'linear',
			postfix    : '_on',
			direction  : 'all' // all, top, bottom, right, left
		};

		/**
		 * [init 初期化]
		 */
		HoverTween.fn.init = function(){
			$window.unload(this.init);

			var fn;
			switch (this.param.type){
			case 'rollover':
				fn = 'setRollover';
				break;

			case 'alpha':
				fn = 'setAlpha';
				break;

			default:
				fn = 'setTransition';
				break;
			}

			var i = 0,
					l = this.param.$target.length;
			for(; i < l; i += 1){
				this[fn](this.param.$target.eq(i));
			}
		};

		/**
		 * [setRollover ロールオーバー初期設定]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.setRollover = function($img){
			if($img.hasClass(this.param.noOverClass)){
				return this.off($img);
			}

			// 画像データ設定
			var src = $img.attr('src');
			$img.ext = src.substring(src.lastIndexOf('.'), src.length);

			// 現在on画像の場合
			if(src.lastIndexOf(this.param.postfix + $img.ext) > -1){
				$img.onSrc = src;
				$img.offSrc = src.replace(this.param.postfix + $img.ext, $img.ext);

				if(!$img.hasClass(this.param.activeClass)){
					$img[0].src = $img.offSrc;
				}
			} else {
				$img.offSrc = src;
				$img.onSrc = src.replace($img.ext, this.param.postfix + $img.ext);
				new Image().src = $img.onSrc;
			}

			// イベント設定
			if($img.hasClass(this.param.activeClass)){
				this.rolloverActive($img);
			} else {
				this.rollover($img);
			}
		};

		/**
		 * [rolloverActive ロールオーバーアクティブ]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.rolloverActive = function($img){
			this.off($img);
			$img.attr({src: $img.onSrc}).addClass(this.param.activeClass);
		};

		/**
		 * [rollover ロールオーバー]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.rollover = function($img){
			$img.group = $img.closest('.' + this.param.groupClass);
			var $trigger = $img.group[0] ? $img.group : $img;

			$img.removeClass(this.param.activeClass + ' ' + this.param.noOverClass);

			$trigger.on({
				'mouseenter.rollover': function(){ $img.attr({src: $img.onSrc})},
				'mouseleave.rollover': function(){ $img.attr({src: $img.offSrc})}
			});
		};

		/**
		 * [setAlpha アルファ初期設定]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.setAlpha = function($img){
			if($img.hasClass(this.param.noOverClass)){
				this.off($img).css({opacity: 1});
			} else if($img.hasClass(this.param.activeClass)){
				this.alphaActive($img);
			} else {
				this.alpha($img);
			}
		};

		/**
		 * [alphaActive アルファアクティブ]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.alphaActive = function($img){
			this.off($img.css({opacity: this.param.opacity}).addClass(this.param.activeClass));
			return $img;
		};

		/**
		 * [alpha アルファ処理]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.alpha = function($img){
			var param = this.param;

			$img.group = $img.closest('.' + param.groupClass);
			var $trigger = $img.group[0] ? $img.group : $img;

			$trigger.on({
				'mouseenter.alpha': function(){
					if(param.duration){
						$img.stop(true, false).animate({opacity: param.opacity}, param.duration, param.ease);
					} else {
						$img.css({'opacity': param.opacity});
					}
				},
				'mouseleave.alpha': function(){
					if(param.duration){
						$img.stop(true, false).animate({opacity: 1}, param.duration, param.ease);
					} else {
						$img.css({'opacity': 1});
					}
				}
			});

			return $img;
		};

		/**
		 * [setTransition slip,fade初期設定]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.setTransition = function($img){
			var param = this.param;

			if($img.hasClass(param.noOverClass)){
				return this.off($img);
			}

			// 画像データ設定
			var
			src = $img.attr('src'),
			ext = src.substring(src.lastIndexOf('.'), src.length),
			onImg = src.replace(ext, param.postfix + ext),
			width = $img.width(),
			height = $img.height(),
			boxCss = {
				display : 'block',
				position: 'relative',
				overflow: 'hidden',
				width   : width,
				height  : height
			},
			onCss = {
				position: 'absolute',
				zIndex  : param.type === 'fade' ? 0 : 2,
				top     : param.type === 'fade' ? 0 : '100%',
				left    : 0
			};

			$img.box = $img.closest('.' + param.boxClass);

			if($img.box[0]){
				$img.onImg = $img.box.children().first();

			} else {
				// 要素の追加: 画像を囲う要素 [on画像, off画像]
				var box = $('<span />', {'class': param.boxClass}).css(boxCss);
				$img.onImg = $('<img src="' + onImg + '" alt="" />').css(onCss);
				$img.box = $img.css({position: 'relative'}).wrap(box).parent().prepend($img.onImg);
			}

			// fade
			if(param.type === 'fade'){
				if($img.hasClass(param.activeClass)){
					this.fadeActive($img);
				} else {
					this.fade($img);
				}
			// slip
			} else {
				if($img.hasClass(param.activeClass)){
					this.slipActive($img);
				} else {
					this.slip($img);
				}
			}
		};

		/**
		 * [fadeActive fadeアクティブ]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.fadeActive = function($img){
			this.off($img.css({opacity: 0}).addClass(this.param.activeClass));
		};

		/**
		 * [fade fade処理]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.fade = function($img){
			var param =  this.param;

			$img.group = $img.closest('.' + param.groupClass);
			var $trigger = $img.group[0] ? $img.group : $img.box;

			$trigger.on({
				'mouseenter.fade': function(){
					$img.stop(true, false).animate({opacity: 0}, param.duration, param.ease);
				},
				'mouseleave.fade': function(){
					$img.stop(true, false).animate({opacity: 1}, param.duration, param.ease);
				}
			});
		};

		/**
		 * [slipActive fadeアクティブ]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.slipActive = function($img){
			$img.onImg.css({top: 0, left: 0});
			this.off($img).addClass(this.param.activeClass);
		};

		/**
		 * [slip slip処理]
		 * @param {jQuery Object} $img [イメージオブジェクト]
		 */
		HoverTween.fn.slip = function($img){
			var param =  this.param,
					$trigger,
					direction;

			$img.group = $img.closest('.' + param.groupClass);
			$trigger = $img.group[0] ? $img.group : $img.box;

			$trigger.on({
				'slipin.slip': function(e){
					direction = param.direction === 'all' ? e.direction : param.direction;

					$img.onImg.stop(true, false).css(HoverTween.fn.creatSlipStyle(direction))
					.animate({top: 0, left: 0}, param.duration, param.ease);
				},
				'slipout.slip': function(e){
					direction = param.direction === 'all' ? e.direction : param.direction;

					$img.onImg.stop(true, false)
					.animate(HoverTween.fn.creatSlipStyle(direction), param.duration, param.ease);
				}
			});
		};

		/**
		 * [creatSlipStyle マウスアクションの方向からスタイルを生成して返す]
		 * @param  {String} direction [マウスアクションの方向]
		 * @return {Object}           [スタイルを生成して返す]
		 */
		HoverTween.fn.creatSlipStyle = function(slip){
			var style = {
				top : 0,
				left: 0
			};

			switch (slip){
			case 'top':
				style.top = '-100%';
				break;

			case 'bottom':
				style.top = '100%';
				break;

			case 'left':
				style.left = '-100%';
				break;

			case 'right':
				style.left = '100%';
				break;
			}

			return style;
		};

		/**
		 * [off イベントの削除]
		 */
		HoverTween.fn.off = function($img){
			var param = this.param,
					$trigger;

			$img.group = $img.closest('.' + param.groupClass);
			$trigger = $img.group[0] ? $img.group : $img.box ? $img.box : $img;

			$img.removeClass(param.activeClass + ' ' + param.noOverClass);
			if(param.type === 'slip'){
				$trigger.off('slipin.' + param.type + ' slipout.' + param.type);
			} else {
				$trigger.off('mouseenter.' + param.type + ' mouseleave.' + param.type);
			}

			return $img;
		};

		// @return HoverTween
		return HoverTween;
	}());


	/**
	 * v0.2.0 - 2013.04.14
	 * [rollover ホバーのイメージロールオーバー]
	 * @param  {jQuery Object} $target [対象要素、指定の無い場合はデフォルトの$targetが指定される] 省略可
	 * @param  {Object} options [オプションの設定] 省略可
	 * @return {incetance}
	 */
	Typy.rollover = function($target, options){
		// $target指定がない場合、初期値を設定
		if(!($target instanceof jQuery)){
			options = $target;
			$target = $('img.rover, input.rover, .all-rover img');
		}

		var options = $.extend(true, {
			type       : 'rollover',
			activeClass: 'active',
			groupClass : 'group-over',
			noOverClass: 'no-over',
			postfix    : '_on'
		}, options);

		var hoverTween = new Typy.HoverTween($target, options);
		hoverTween.init();

		// @return
		return hoverTween;
	};


	/**
	 * v0.1.0 - 2014.04.14
	 * [alpha ホバーのアルファスタイル]
	 * @param  {jQuery Object} $target [対象要素、指定の無い場合はデフォルトの$targetが指定される] 省略可
	 * @param  {Object} options [オプションの設定] 省略可
	 * @return {instance}
	 */
	Typy.alpha = function($target, options){
		// $target指定がない場合、初期値を設定
		if(!($target instanceof jQuery)){
			options = $target;
			$target = $('img.alpha, input.alpha, .all-alpha img');
		}

		var options = $.extend(true, {
			type       : 'alpha',
			groupClass : 'group-over',
			activeClass: 'active',
			noOverClass: 'no-over',
			opacity    : .6,
			duration   : 0,
			ease       : 'linear'
		}, options);

		var hoverTween = new Typy.HoverTween($target, options);
		hoverTween.init();

		// @return
		return hoverTween;
	};


	/**
	 * v0.1.0 - 2014.06.06
	 * [fade ホバーのフェードスタイル]
	 * @param  {jQuery Object} $target [対象要素、指定の無い場合はデフォルトの$targetが指定される] 省略可
	 * @param  {Object} options [オプションの設定] 省略可
	 * @return {instance}
	 */
	Typy.fade = function($target, options){
		// $target指定がない場合、初期値を設定
		if(!($target instanceof jQuery)){
			options = $target;
			$target = $('img.fade, .all-fade img');
		}

		var options = $.extend(true, {
			type       : 'fade',
			groupClass : 'group-over',
			activeClass: 'active',
			noOverClass: 'no-over',
			boxClass   : 'hover-box',
			duration   : 400,
			ease       : 'linear',
			postfix    : '_on'
		}, options);

		var hoverTween = new Typy.HoverTween($target, options);
		hoverTween.init();

		// @return
		return hoverTween;
	};


	/**
	 * v0.1.0 - 2014.06.06
	 * [slip ホバーのスリップスタイル]
	 * @param  {jQuery Object} $target [対象要素、指定の無い場合はデフォルトの$targetが指定される] 省略可
	 * @param  {Object} options [オプションの設定] 省略可
	 * @return {instance}
	 */
	Typy.slip = function($target, options){
		// $target指定がない場合、初期値を設定
		if(!($target instanceof jQuery)){
			options = $target;
			$target = $('img.slip, .all-slip img');
		}

		var options = $.extend(true, {
			type       : 'slip',
			groupClass : 'group-over',
			activeClass: 'active',
			noOverClass: 'no-over',
			boxClass   : 'hover-box',
			duration   : 200,
			ease       : 'easeOutExpo',
			postfix    : '_on',
			direction  : 'all' // [all, top, bottom, left, right]
		}, options);

		var hoverTween = new Typy.HoverTween($target, options);
		hoverTween.init();

		// @return
		return hoverTween;
	};


	/**
	 * v0.2.0 - 2014.04.08
	 * [active ホバースタイルのアクティブ化]
	 * @param  {jQuery Object} $target [対象の要素]
	 * @param  {Object} options [オプション値]
	 * @return {incetance}      [ホバースタイルのインスタンスを返す]
	 */
	Typy.active = function($target, options){
		var options = $.extend({
      type       : 'rollover', // [rollover, alpha, fade, slip]
      postfix    : '_on',
      activeClass: 'active'
		}, options);

		$target.addClass(options.activeClass);

		if(Typy[options.type] && $target[0].nodeName === 'IMG'){
			return Typy[options.type]($target, options);
		}
	};


  /*--------------------------------------------------------------------------
    @export
  --------------------------------------------------------------------------*/




}(jQuery, this.Typy || {}));
