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


var AMP = AMP || {};


(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スライダー</h4>
   * velocity.jsに依存しています
   *
   * @constructor
   * @class Slider
   * @param {jQuery} $wrap   スライダー要素
   * @param {Object} options オプション値
   */
  function Slider($wrap, options){
		var self = this;

		self.param = $.extend(
			true,
			Slider.defaults,
			{
				$wrap         : $wrap,
				$frame        : $wrap.find('.slider-frame'),
				$slide        : $wrap.find('.slider-list'),
				$items        : $wrap.find('.slider-list').children(),
				$pointer      : $wrap.find('.pointer'),
				$thumbnail    : $wrap.find('.thumbnail a'),
				$prev         : $wrap.find('.prev a'),
				$next         : $wrap.find('.next a'),
				length        : $wrap.find('.list').children().length,
				visibleLength : 0,
				visible       : 0,
				distance      : 0,
				left          : 0,
				_timerId      : null,
				_isAnimate    : false
			},
			options
		);

		if(self.param.start){
			self.init();
		}
  }

  // prototype
  var p = Slider.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Slider.VERSION = '1.0';


  /**
   * <h4>name</h4>
   *
   * @private
   * @property _name
   * @type {String}
   */
  p._name = 'Slider';


  /**
   * <h4>初期値</h4>
   * コンストラクタが呼び出された際に、option値とmixinしてparamに格納します。
   *
   * @static
   * @property defaults
   * @type {String}
   */
  Slider.defaults = {
    $frame        : null,
    $slide        : null,
    $items        : null,
    $pointer      : null,
    $thumbnail    : null,
    $prev         : null,
    $next         : null,
    start         : true,
    isFlick       : true,
    isLoop        : true,
    isTimerCancel : true,
    current       : 0,
    slideFix      : 0,
    timer         : 0,
    duration      : 500,
    ease          : 'easeOutQuart',
    activeClass   : 'active',
    tweenStartCall: $.noop,
    tweenCall     : $.noop,
    tweenEndCall  : $.noop,
    resizeCall    : $.noop,
    resizeStopCall: $.noop
  };


  /**
   * <h4>パラメーター</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   *
   * @method  init
   * @return {Slider}
   */
  p.init = function(){
  	var self = this;

		// param
		self.setParam();

		// view
		self._createPointer();
		self.setPosition();
		self.active();

		// event
		self.addEventResize();
		self.addEventTimerCancel();
		self.addEventFlick(self.param.$slide);
		self.addEventNext(self.param.$next);
		self.addEventPrev(self.param.$prev);
		self.addEventPager(self.param.$thumbnail);
		self.addEventPager(self.param.$pointer.find('a'));

		// controller
		self.timerStart();
  };


  /**
   * [setParam description]
   */
  p.setParam = function(){
      var self = this,
      stageWidth, itemWidth, visible;

      // ステージの幅
			stageWidth = self.param.$frame.width();

			// アイテム要素の幅
			itemWidth = self.param.$items.outerWidth(true);

			// 表示エリアにある要素数
			visible = ~~(stageWidth / itemWidth);

			// 移動距離
			if(0 < self.param.slideFix && self.param.slideFix <= visible){
				self.param.distance = self.param.slideFix * itemWidth;
			} else {
				self.param.distance = visible * itemWidth;
			}

			// 現在値
			if(self.param.visible < visible){
				self.param.current = Math.ceil(self.param.current / visible);
			} else{
				self.param.current = Math.ceil(self.param.current * visible);
			}

			// 表示エリアにある要素数
			self.param.visible = visible;

			// アイテム要素の表示数
      self.param.visibleLength = self.getVisibleLength();

      return self;
  };


	/* Events
	-----------------------------------------------------------------*/
	/**
	 * <h4>リサイズイベント</h4>
	 *
	 * @method addEventResize
	 * @return {Slider}
	 */
	p.addEventResize = function(){
		var self = this;

		$(window)
		.off('resize.Slider resizestop.Slider')
		.on('resize.Slider', function(){
			self.timerStop();
			self.setParam();
			self.setPosition();
			self.active();
			self.param.resizeCall(self.param);
		})
		.on('resizestop.Slider', function(){
			self.timerStart();
			self.param.resizeStopCall(self.param);
		});

		return self;
  };


  /**
   * <h4>タイマーキャンセルイベント</h4>
   * スライダーにマウスオンされた状態の時、タイマー処理をキャンセルします
   *
	 * @method addEventTimerCancel
	 * @return {Slider}
   */
  p.addEventTimerCancel = function(){
		var self = this;

		self.param.$wrap.off('mouseenter.Slider mouseleave.Slider')
		.on('mouseenter.Slider', function(){
			if(self.param.isTimerCancel){
				self.timerStop();
			}
		})
		.on('mouseleave.Slider', function(){
			if(self.param.isTimerCancel){
				self.timerStart();
			}
		});

		return self;
  };


	/**
	 * <h4>ネクストボタンイベント</h4>
	 *
	 * @method addEventNext
	 * @param {jQuery} $trigger トリガー要素
	 * @return {Slider}
	 */
	p.addEventNext = function($trigger){
		var self = this;
		$trigger.off('click.Slider').on('click.Slider', function(){
			self.next();
			return false;
		});

		return self;
	};


	/**
	 * <h4>プレブボタンイベント</h4>
	 *
	 * @method addEventPrev
	 * @param {jQuery} $trigger トリガー要素
	 * @return {Slider}
	 */
	p.addEventPrev = function($trigger){
		var self = this;

		$trigger.off('click.Slider').on('click.Slider', function(){
			self.prev();
			return false;
		});

		return self;
	};


	/**
	 * <h4>ページャーボタンイベント</h4>
	 *
	 * @method addEventPrev
	 * @param {jQuery} $trigger トリガー要素
	 * @return {Slider}
	 */
	p.addEventPager = function($trigger){
		var self = this;

		$trigger.off('click.Slider').on('click.Slider', function(){
			self.moveTo($trigger.index(this));
			return false;
		});

		return self;
	};


  /**
   * <h4>フリックイベント</h4>
   *
   * @method addEventFlick
   * @return {Slider}
   */
	p.addEventFlick = function($trigger){
		var self = this;

		$trigger.off('flickmoveX.Slider flickcancelX.Slider flickX.Slider')
		.on('flickmoveX.Slider', function(event){
			self._move(event.moveX);
		})
		.on('flickcancelX.Slider', function(){
			// self._resetTween();
		})
		.on('flickX.Slider', function(event){
			if(0 < event.moveX){
				self.prev();
			} else {
				self.next();
			}
		});

		return self;
	};


  /* Controllers
  -----------------------------------------------------------------*/
	/**
	 * <h4>タイマースタート</h4>
	 *
	 * @method timerStart
	 * @param  {Number} num セットするタイマー値(省略可)
	 * @return {Slider}
	 */
	p.timerStart = function(num){
		var self = this;

		if(AMP.isNumber(num)){
			self.param.timer = num;
		}

		// タイマーをクリア
		self.timerStop();

		if(0 < self.param.timer){
			self.param._timerId = setTimeout(function(){
				self.next();
			}, self.param.timer + self.param.duration);
		}

		return self;
	};


	/**
	 * タイマー停止
	 * @method timerStop
	 * @return {Slider}
	 */
	p.timerStop = function(){
		clearTimeout(this.param._timerId);
		return this;
	};


	/**
	 * <h4>次へスライド</h4>
	 *
	 * @method next
	 * @return {Slider}
	 */
	p.next = function(){
		this._controller(this.param.current + 1);
		return this;
	};


	/**
	 * <h4>前へスライド</h4>
	 *
	 * @method prev
	 * @return {Slider}
	 */
	p.prev = function(){
		this._controller(this.param.current - 1);
		return this;
	};


	/**
	 * <h4>指定したスライドインデックスへスライド</h4>
	 *
	 * @method moveTo
	 * @param  {Number} num 指定したスライドインデックス
	 * @return {Slider}
	 */
	p.moveTo = function(num){
		if(AMP.isNumber(num) && num < this.param.length){
			this._controller(num);
		}
		return this;
	};


	/**
	 *<h4> コントローラー</h4>
	 *
   * @private
	 * @method _controller
	 * @param  {Number} step スライドするステップ数
	 * @return {Void}
	 */
  p._controller = function(step){
		var self = this;

		if(self.param._isAnimate){
			// return void 0;
			return;
		}


		// getSlideNumつくる？
		if(-1 < step && step < self.param.length){
			self.param.current = step;
		} else {
			if(self.param.isLoop){
				self.param.current = -1 < step ? step - self.param.length : self.param.length + step;
			} else {
				return;
			}
		}


		// isLoop
		// current
		// slideFix
		// length
		// visibleLength
		// distance
		// left

		$.sequence(

			// スライド前のコールバック実行
			function(){
				self.param._isAnimate = true;
				self.timerStop();
				self.active();
				return self.param.tweenStartCall(self.param);
			},

			// スライドとコールバック実行
			function(){
				// left値を決める
				self._tween();
			},

			// スライド完了コールバック
			function(){
				self.param._isAnimate = true;
				self.timerStart();
				return self.param.tweenEndCall(self.param);
			}
		);
  };


	/* Views
	-----------------------------------------------------------------*/
	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @private
	 * @method _createPointer
	 * @return {Slider}
	 */
  p._createPointer = function(){
		if(this.param.$pointer[0]){
			var pointerHTML = this.param.$pointer[0].innerHTML,
			print = '',
			i = 0;

			for(; i < this.param.length; i += 1){
				print += pointerHTML;
			}
			this.param.$pointer[0].innerHTML = print;
		}

		return this;
  };

  p.setPosition = function (){
  	/*
		this.param.$slide.css({
			width: this.param.visibleLength * itemWidth,
			left : this.param.distance * this.param.current * -1
		});
*/

		return this;
  };


  /**
   * <h4>要素のアクティブ化</h4>
   *
   * @method active
   * @return {Slider}
   */
  p.active = function(){
		// $pointer
		if(this.param.$pointer[0]){
			this.param.$pointer.children().removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		}

		// $thumbnail
		if(this.param.$thumbnail[0]){
			this.param.$thumbnail.removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		};

		// $next
		if(this.param.current === this.param.length - 1){
			this.param.$next.addClass(this.param.activeClass);
		} else {
			this.param.$next.removeClass(this.param.activeClass);
		}

		// $prev
		if(this.param.current === 0){
			this.param.$prev.addClass(this.param.activeClass);
		} else {
			this.param.$prev.removeClass(this.param.activeClass);
		}

		// $items
		this.param.$items.removeClass(this.param.activeClass)
		.slice(this.param.current, this.param.current + this.param.visible)
		.addClass(this.param.activeClass);

		return this;
  };


  /**
   * <h4>指定x座標分移動</h4>
   *
   * @private
   * @method _move
   * @param  {Number} x 移動するx座標値
   * @return {Void}
   */
  p._move = function(x){
		this.param.$slide.css({left: this.param.left + x});
  };


  // !important　いらんかも
  p._resetTween = function(){
		return this.param.$slide.velocity({left: this.param.left}, 100, this.param.ease);
  };


	/**
	 * スライドアニメーションを実行
	 *
	 * @private
	 * @method _tween
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(){
		return this.param.$slide
		.velocity({left: this.param.left}, this.param.duration, this.param.ease);
	};


	/* ‎Utilitys
	-----------------------------------------------------------------*/
  /**
   * <h4>表示可能な要素の数を取得</h4>
   *
	 * @method getVisibleLength
	 * @return {Number}
   */
  p.getVisibleLength = function(){
    var count = 0;
  	this.param.items.each(function(){
      if($(this).css('display') !== 'none'){
        count += 1;
      }
    });
    return count;
  };



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.Slider = Slider;



}(window, jQuery));
