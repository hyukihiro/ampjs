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
   * velocity.jsに依存しています<br>
   * FIEXME: βバージョンです
   *
   * @constructor
   * @class AMP.$.Slider
   * @param {jQuery} $slider スライダー要素
   * @param {Object} options オプション値
   */
  function Slider($slider, options){
    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    /**
     * <h4>スライダー要素</h4>
     *
     * @property param.$wrap
     * @type {jQuery}
     */
    /**
     * <h4>スライダーアイテム要素数</h4>
     *
     * @property param.length
     * @type {Number}
     */
    /**
     * <h4>表示されてる要素数</h4>
     *
     * @property param.displayLength
     * @type {Number}
     */
    /**
     * <h4>$frame内に表示されている要素数</h4>
     *
     * @property param.visible
     * @type {Number}
     */
    /**
     * <h4>スライドする距離</h4>
     *
     * @property param.distance
     * @type {Number}
     */
    /**
     * <h4>アニメーション状態管理フラグ</h4>
     *
     * @private
     * @property param._isAnimate
     * @type {Boolean}
     */
		this.param = $.extend(
			true,
			{},
			Slider.sliderOptions,
			{
				$wrap        : $slider,
				$frame       : $slider.find('.frame'),
				$slide       : $slider.find('.slide'),
				$slideItems  : $slider.find('.slide').children(),
				$pointer     : $slider.find('.pointer'),
				$thumbnail   : $slider.find('.thumbnail a'),
				$prev        : $slider.find('.prev a'),
				$next        : $slider.find('.next a'),
				length       : $slider.find('.slide').children().length,
				displayLength: 0,
				visible      : 0,
				distance     : 0,
				_isAnimate   : false
			},
			options
		);

    /**
     * <h4>カウンター</h4>
     * @property counter
     * @type {AMP.Counter}
     */
    this.counter = new AMP.Counter(this.param.current, $slider.find('.slide').children().length, this.param.isLoop);
    // 削除
    // this.param.current = void 0;
    delete this.param.current;

    /**
     * <h4>座標を管理</h4>
     * @property vector
     * @type {AMP.Vector}
     */
    this.vector = new AMP.Vector();

    /**
     * <h4>タイマー管理</h4>
     * @method timer
     * @type {AMP.Timer}
     */
    this.timer = new AMP.Timer(this.param.timer);
    // 削除
    // this.param.timer = void 0;
    delete this.param.timer;


    if(this.param.isInit){
      this.init();
    }
  }

  // 基底クラスを継承
  AMP.inherits(Slider, AMP.$.UIController);

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
  Slider.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Slider';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出された際に、option値とmixinしてparamに格納します。
   *
   * @static
   * @property sliderOptions
   * @type {Object}
   */
  /**
   * <h4>スライダーフレーム要素</h4>
   *
   * @property sliderOptions.$frame
   * @type {jQuery}
   */
  /**
   * <h4>スライドする要素</h4>
   *
   * @property sliderOptions.$slide
   * @type {jQuery}
   */
  /**
   * <h4>スライドする子要素</h4>
   *
   * @property sliderOptions.$slideItems
   * @type {jQuery}
   */
  /**
   * <h4>ポインター要素</h4>
   *
   * @property sliderOptions.$pointer
   * @type {jQuery}
   */
  /**
   * <h4>サムネイル要素</h4>
   *
   * @property sliderOptions.$thumbnail
   * @type {jQuery}
   */
  /**
   * <h4>prevナビ要素</h4>
   *
   * @property sliderOptions.$prev
   * @type {jQuery}
   */
  /**
   * <h4>nextナビ要素</h4>
   *
   * @property sliderOptions.$next
   * @type {jQuery}
   */
  /**
   * <h4>コンストラクタ呼び出されたときに、スライダーを初期化するか</h4>
   *
   * @property sliderOptions.isInit
   * @type {Boolean}
   */
  /**
   * <h4>フリックイベントを有効にするか</h4>
   *
   * @property sliderOptions.isFlick
   * @type {Boolean}
   */
  /**
   * <h4>スライドループを有効にするか</h4>
   *
   * @property sliderOptions.isLoop
   * @type {Boolean}
   */
  /**
   * <h4>スライダー要素にマウスオンされたときタイマーを無効にするか</h4>
   *
   * @property sliderOptions.isTimerCancel
   * @type {Boolean}
   */
  /**
   * <h4>現在アクティブなスライドアイテムインデックス</h4>
   *
   * @property sliderOptions.current
   * @type {Number}
   */
  /**
   * <h4>スライドステップ数を固定したい場合、ステップ数の指定</h4>
   *
   * @property sliderOptions.slideStep
   * @type {Number}
   */
  /**
   * <h4>スライドタイマーの間隔</h4>
   *
   * @property sliderOptions.timer
   * @type {Number}
   */
  /**
   * <h4>スライドduration</h4>
   *
   * @property sliderOptions.duration
   * @type {Number}
   */
  /**
   * <h4>スライドease</h4>
   *
   * @property sliderOptions.ease
   * @type {String}
   */
  /**
   * <h4>アクティブ要素に付与するクラス名</h4>
   *
   * @property sliderOptions.activeClass
   * @type {String}
   */
  /**
   * <h4>スライド前に実行する関数</h4>
   *
   * @property sliderOptions.tweenBegin
   * @type {Function}
   */
  /**
   * <h4>スライド完了時に実行する関数</h4>
   *
   * @property sliderOptions.tweenCompleat
   * @type {Function}
   */
  /**
   * <h4>リサイズ時に実行する関数</h4>
   *
   * @property sliderOptions.resizeCall
   * @type {Function}
   */
  /**
   * <h4>リサイズに完了時に実行する関数</h4>
   *
   * @property sliderOptions.resizeStopCall
   * @type {Function}
   */
  Slider.sliderOptions = {
    $frame        : null,
    $slide        : null,
    $slideItems   : null,
    $pointer      : null,
    $thumbnail    : null,
    $prev         : null,
    $next         : null,
    isInit        : true,
    isFlick       : true,
    isLoop        : true,
    isResize      : false,
    isTimerCancel : true,
    current       : 0,
    slideStep     : 0,
    timer         : 0,
    duration      : 500,
    ease          : 'easeOutQuart',
    activeClass   : 'active',
    tweenBegin    : $.noop,
    tweenCompleat : $.noop,
    resizeCall    : $.noop,
    resizeStopCall: $.noop
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Sliderインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param {jQuery} $wrap   スライダー要素
   * @param {Object} options オプション値
   * @return {Slider}
   */
  Slider.get = function($slider, options){
    return new Slider($slider, options);
  };


  /**
   * <h4>初期化</h4>
   * Singleton
   *
   * @method  init
   * @return {Slider}
   */
  p.init = function(){
    var self = this;

    if(this._isInit){
      return this;
    }

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

		// timer
    self.timer.addCallback(self.next);
    self.setTimer();

    // 初期化フラグ
    this._isInit = true;

    return this;
  };


  /**
   * <h4>パラメーターの設定</h4>
   *
   * @method setParam
   * @return {Slider}
   */
  p.setParam = function(){
    var self = this,
    stageWidth, itemWidth, visible;

    // ステージの幅
		stageWidth = self.param.$frame.width();

		// アイテム要素の幅
		itemWidth = self.param.$slideItems.outerWidth(true);

		// 表示エリアにある要素数
		visible = ~~(stageWidth / itemWidth);

		// 移動距離
    // スライドステップ指定時は、ステップ数がフレーム内に収まっている場合のみ設定する
		if(0 < self.param.slideStep && self.param.slideStep <= visible){
			self.param.distance = self.param.slideStep * itemWidth;
		} else {
			self.param.distance = visible * itemWidth;
		}

    // インデックス値
    var current = 0;
    if(self.param.visible < visible){
      current = Math.ceil(self.counter.getCount() / visible);
    } else {
      current = Math.ceil(self.counter.getCount() * visible);
    }

    // 表示エリアにある要素数
    self.param.visible = visible;

    // アイテム要素の表示数
    self.param.displayLength = self.getDisplayLength();

    // スライド最大数
    var max = 0;
    if(0 < self.param.slideStep){
      max = Math.ceil(self.param.displayLength / self.param.slideStep) - (self.param.visible - self.param.slideStep);
    } else {
      max = Math.ceil(self.param.displayLength / self.param.visible);
    }

    // カウントセット
    self.counter.setCount(current);
    self.counter.setLength(max);

    return this;
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

		$(window).off('resize.Slider resizestop.Slider')
		.on('resize.Slider', function(){
      if(self.param.isResize){
  			self.timer.stop();
  			self.setParam();
  			self.setPosition();
        self.param.resizeCall(self.param);
      }
    })
    .on('resizestop.Slider', function(){
      if(self.param.isResize){
        self._createPointer();
        self.addEventPager(self.param.$pointer.find('a'));
        self.active();
        self.timer.start();
        self.param.resizeStopCall(self.param);
      }
		});

		return this;
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
				self.timer.stop();
			}
		})
		.on('mouseleave.Slider', function(){
			if(self.param.isTimerCancel){
				self.timer.start();
			}
		});

		return this;
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
			self._resetTween();
		})
		.on('flickX.Slider', function(event){
			if(0 < event.moveX){
				self.prev();
			} else {
				self.next();
			}
		});

		return this;
	};


  /* Controllers
  -----------------------------------------------------------------*/
	/**
	 * <h4>タイマーのセット</h4>
	 *
	 * @method setTimer
	 * @param  {Number} interval タイマーの間隔 ※省略可
	 * @return {Slider}
	 */
	p.setTimer = function(interval){
		this.timer.stop();

    if(!AMP.isNumber(interval)){
      interval = this.timer.interval;
    }
		if(0 < interval){
      this.timer.start(interval + this.param.duration);
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
  p._controller = function(step, isIndex){
		var self = this;

		if(self.param._isAnimate){
			return void 0;
		}

    // stepの調整
    if(isIndex){
      step = step < self.counter.getLength() ? step : self.counter.getLength() - 1;
    } else {
      step = self.counter.getCount() + step;
    }


    if(-1 < step && step < self.counter.getLength()){
      self.counter.setCount(step);
    } else {
      if(self.param.isLoop){
        self.counter.getCount() = -1 < step ? step - self.counter.getLength() : self.counter.getLength() + step;
      } else {
        return void 0;
      }
    }

		self.param._isAnimate = true;
    self.vector.set(self.counter.getCount() * self.param.distance * -1);

		$.sequence(
      function(){
  			// スライド前のコールバック実行
        self.timer.stop();
				self.active();
				return self.param.tweenBegin(self.param);
			},
      function(){
	   		// スライドとコールバック実行
				return self._tween();
			},
      function(){
  			// スライド完了コールバック
				return self.param.tweenCompleat(self.param);
			},
			function(){
				self.timer.start();
				self.param._isAnimate = false;
			}
		);
  };


	/* Views
	-----------------------------------------------------------------*/
  /**
   * <h4>表示可能な要素の数を取得</h4>
   *
   * @method getDisplayLength
   * @return {Number}
   */
  p.getDisplayLength = function(){
    var count = 0;
    this.param.$slideItems.each(function(){
      if($(this).css('display') !== 'none'){
        count += 1;
      }
    });
    return count;
  };


	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @private
	 * @method _createPointer
	 * @return {Slider}
	 */
  p._createPointer = function(){
		if(this.param.$pointer[0]){
			var pointerHTML = this.param.$pointer.find('>')[0].outerHTML,
			print = '',
			i = 0,
      l = this.counter.getLength();

			for(; i < l; i += 1){
				print += pointerHTML;
			}
			this.param.$pointer[0].innerHTML = print;
		}

		return this;
  };


  /**
   * ここ途中
   * [setPosition description]
   */
  p.setPosition = function(){
    this.param.$slide.css({
      width: this.param.displayLength * this.param.$slideItems.outerWidth(true),
      left : this.vector.x
    });
		return this;
  };


  /**
   * <h4>要素のアクティブ化</h4>
   *
   * @method active
   * @return {Slider}
   */
  p.active = function(){
    var index;

    if(0 < this.param.slideStep){
      index = this.counter.getCount() * this.param.slideStep;
    } else {
      index = this.counter.getCount() * this.param.visible;
    }

    // $slideItems
    this.param.$slideItems.removeClass(this.param.activeClass)
    .slice(index, index + this.param.visible)
    .addClass(this.param.activeClass);

    // $thumbnail
    if(this.param.$thumbnail[0]){
      this.param.$thumbnail.removeClass(this.param.activeClass)
      .slice(index, index + this.param.visible).addClass(this.param.activeClass);
    }

		// $pointer
		if(this.param.$pointer[0]){
			this.param.$pointer.children().removeClass(this.param.activeClass)
			.eq(this.counter.getCount()).addClass(this.param.activeClass);
		}

		// $next
		if(this.counter.getCount() === this.counter.getLength() - 1){
			this.param.$next.addClass(this.param.activeClass);
		} else {
			this.param.$next.removeClass(this.param.activeClass);
		}

		// $prev
		if(this.counter.getCount() === 0){
			this.param.$prev.addClass(this.param.activeClass);
		} else {
			this.param.$prev.removeClass(this.param.activeClass);
		}

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
		this.param.$slide.velocity('stop').css({left: this.vector.x + x});
  };


  /**
   * <h4>スライド位置を戻す</h4>
   *
   * @private
   * @method _resetTween
   * @return {jQuery.Deferred}
   */
  p._resetTween = function(){
		return this.param.$slide.velocity('stop')
    .velocity({left: this.vector.x}, this.param.duration / 2, this.param.ease);
  };


	/**
	 * <h4>スライドアニメーションを実行</h4>
	 *
	 * @private
	 * @method _tween
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(){
		return this.param.$slide.velocity('stop')
    .velocity({left: this.vector.x}, this.param.duration, this.param.ease);
	};



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Slider = Slider;


}(window, jQuery));
