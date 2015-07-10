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
     * <h4>left値</h4>
     *
     * @property param.left
     * @type {Number}
     */
    /**
     * <h4>タイマーID</h4>
     *
     * @private
     * @property param._timerId
     * @type {String}
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
				left         : 0,
        slideMaxCount: 0,
				_timerId     : null,
				_isAnimate   : false
			},
			options
		);

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
		self.timerStart();

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
    if(self.param.visible < visible){
      self.param.current = Math.ceil(self.param.current / visible);
    } else {
      self.param.current = Math.ceil(self.param.current * visible);
    }

    // 表示エリアにある要素数
    self.param.visible = visible;

    // アイテム要素の表示数
    self.param.displayLength = self.getDisplayLength();

    // スライド最大数
    if(0 < self.param.slideStep){
      self.param.slideMaxCount = Math.ceil(self.param.displayLength / self.param.slideStep) - (self.param.visible - self.param.slideStep);
    } else {
      self.param.slideMaxCount = Math.ceil(self.param.displayLength / self.param.visible);
    }

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
  			self.timerStop();
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
        self.timerStart();
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
				self.timerStop();
			}
		})
		.on('mouseleave.Slider', function(){
			if(self.param.isTimerCancel){
				self.timerStart();
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

		return this;
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
      step = step < self.param.slideMaxCount ? step : self.param.slideMaxCount - 1;
    } else {
      step = self.param.current + step;
    }

    //
    if(-1 < step && step < self.param.slideMaxCount){
      self.param.current = step;
    } else {
      if(self.param.isLoop){
        self.param.current = -1 < step ? step - self.param.slideMaxCount : self.param.slideMaxCount + step;
      } else {
        return void 0;
      }
    }

		self.param._isAnimate = true;
		self.param.left = self.param.current * self.param.distance * -1;

		$.sequence(
      function(){
  			// スライド前のコールバック実行
				self.timerStop();
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
				self.timerStart();
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
			i = 0;

			for(; i < this.param.slideMaxCount; i += 1){
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
      left : this.param.left
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
      index = this.param.current * this.param.slideStep;
    } else {
      index = this.param.current * this.param.visible;
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
			.eq(this.param.current).addClass(this.param.activeClass);
		}

		// $next
		if(this.param.current === this.param.slideMaxCount - 1){
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
		this.param.$slide.velocity('stop').css({left: this.param.left + x});
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
    .velocity({left: this.param.left}, this.param.duration / 2, this.param.ease);
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
    .velocity({left: this.param.left}, this.param.duration, this.param.ease);
	};



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Slider = Slider;


}(window, jQuery));
