/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スライダー</h4>
   * velocity.jsに依存しています
   *
   * @constructor
   * @class AMP.$.Slider
   * @extends AMP.$.UIController
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
     * <h4>スライドで進むアイテム数</h4>
     *
     * @private
     * @default null
     * @property param._stepLength
     * @type {Number}
     */
    /**
     * <h4>スライドカウントのMAX値</h4>
     *
     * @property param.slideMaxLength
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
        $wrap         : $slider,
        $frame        : $slider.find('.frame'),
        $slide        : $slider.find('.slide'),
        $slideItems   : $slider.find('.slide').children(),
        $pointer      : $slider.find('.pointer'),
        $thumbnail    : $slider.find('.thumbnail a'),
        $prev         : $slider.find('.prev a'),
        $next         : $slider.find('.next a'),
        length        : $slider.find('.slide').children().length,
        _stepLength   : null,
        _liquidLength : null,
        slideMaxLength: 0,
        distance      : 0,
        left          : 0,
        _liquidClone  : 2,
        _adjustLeft   : 0,
        _timerId      : null,
        _isAnimate    : false
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
  Slider.VERSION = '1.0.2';


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
   * @static
   * @property sliderOptions.$frame
   * @type {jQuery}
   */
  /**
   * <h4>スライドする要素</h4>
   *
   * @static
   * @property sliderOptions.$slide
   * @type {jQuery}
   */
  /**
   * <h4>スライドする子要素</h4>
   *
   * @static
   * @property sliderOptions.$slideItems
   * @type {jQuery}
   */
  /**
   * <h4>ポインター要素</h4>
   *
   * @static
   * @property sliderOptions.$pointer
   * @type {jQuery}
   */
  /**
   * <h4>サムネイル要素</h4>
   *
   * @static
   * @property sliderOptions.$thumbnail
   * @type {jQuery}
   */
  /**
   * <h4>prevナビ要素</h4>
   *
   * @static
   * @property sliderOptions.$prev
   * @type {jQuery}
   */
  /**
   * <h4>nextナビ要素</h4>
   *
   * @static
   * @property sliderOptions.$next
   * @type {jQuery}
   */
  /**
   * <h4>コンストラクタ呼び出されたときに、スライダーを初期化するか</h4>
   *
   * @static
   * @property sliderOptions.isInit
   * @type {Boolean}
   */
  /**
   * <h4>フリックイベントを有効にするか</h4>
   *
   * @static
   * @property sliderOptions.isFlick
   * @type {Boolean}
   */
  /**
   * <h4>スライダー要素にマウスオンされたときタイマーを無効にするか</h4>
   *
   * @static
   * @property sliderOptions.isTimerCancel
   * @type {Boolean}
   */
  /**
   * <h4>現在アクティブなスライドアイテムインデックス</h4>
   *
   * @static
   * @property sliderOptions.current
   * @type {Number}
   */
  /**
   * <h4>スライドステップ数を固定したい場合、ステップ数の指定</h4>
   *
   * @static
   * @property sliderOptions.slideStep
   * @type {Number}
   */
  /**
   * <h4>スライドタイマーの間隔</h4>
   *
   * @static
   * @property sliderOptions.timer
   * @type {Number}
   */
  /**
   * <h4>アクティブ要素に付与するクラス名</h4>
   *
   * @static
   * @property sliderOptions.activeClass
   * @type {String}
   */
  /**
   * <h4>リサイズ時に実行する関数</h4>
   *
   * @static
   * @property sliderOptions.resizeCall
   * @type {Function}
   */
  /**
   * <h4>リサイズに完了時に実行する関数</h4>
   *
   * @static
   * @property sliderOptions.resizeStopCall
   * @type {Function}
   */
  /**
   * <h4>スライドアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property sliderOptions.tween
   * @type {Object}
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
    isResize      : true,
    isTimerCancel : true,
    isLiquid      : false,
    current       : 0,
    slideStep     : 0,
    timer         : 0,
    activeClass   : 'active',
    resizeCall    : $.noop,
    resizeStopCall: $.noop,
    tween         : {
      easing      : 'easeOutQuart',
      duration    : 500,
      begin       : $.noop,
      progress    : $.noop,
      complete    : $.noop
    }
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Sliderインスタンスの生成</h4>
   *
   * @static
   * @class AMP.$.Slider
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
    // 初期化フラグ
    if(this._isInit){
      return this;
    }
    this._isInit = true;

    // param
    this.setParam();

    // view
    this.createPointer();
    this.setPosition();
    this.active();

    // event
    this.addEventResize();
    this.addEventTimerCancel();
    this.addEventThumbnail(this.param.$thumbnail);
    this.addEventFlick(this.param.$slide);
    this.addEventNext(this.param.$next);
    this.addEventPrev(this.param.$prev);
    this.addEventPager(this.param.$pointer.find('a'));

    // timer
    this.timerStart();

    return this;
  };


  /**
   * <h4>パラメーターの設定</h4>
   *
   * @method setParam
   * @return {Slider}
   */
  p.setParam = function(){
    /// if(this.param.isLiquid){
    /// }

    // ステージの幅
		var stageWidth = this.param.$frame.width();

		// アイテム要素の幅
		var itemWidth = this.param.$slideItems.outerWidth(true);

		// 表示エリアにある要素数
		var visibleLength = ~~(stageWidth / itemWidth);

    // ステップ数
    var step = this.param.slideStep && this.param.slideStep < visibleLength? this.param.slideStep : visibleLength;

    // 初期値が無い場合はセット
    if(!this.param._stepLength){
      this.param._stepLength = step;
    }

    // 現在値をセット
    this.param.current = ~~(this.param._stepLength * this.param.current / step);

    // スライドアイテムのステップ数
    this.param._stepLength = step;

		// 移動距離
		this.param.distance = step * itemWidth;

    // スライド最大数
    this.param.slideMaxLength = Math.ceil(this._getDisplayLength() / step);

    // フレームのセンタリング
    if(this.param.distance < stageWidth){
      this.param._adjustLeft = ~~((this.param.distance - stageWidth) / -2);
    } else {
      this.param._adjustLeft = 0;
    }

    // 現在地
    this.param.left = this.param.current * this.param.distance * -1;

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
        self.param.resizeCall();
      }
    })
    .on('resizestop.Slider', function(){
      if(self.param.isResize){
        self.setParam();
        self.setPosition();
        self.createPointer();
        self.addEventPager(self.param.$pointer.find('a'));
        self.active();
        self.timerStart();
        self.param.resizeStopCall();
      }
		});

		return this;
  };


  /**
   * <h4>Thumbnailボタンイベント追加</h4>
   *
   * @method addEventThumbnail
   * @param {jQuery} $thumbnail Thumbnailトリガー要素
   * @return {Slider}
   */
  p.addEventThumbnail = function($thumbnail){
    var self = this;

    $thumbnail.on('click.Slider', function(){
      var index = ~~($thumbnail.index(this) / self.param._stepLength);
      self.moveTo(index);
      return false;
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
			}, self.param.timer + self.param.tween.duration);
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
	 * @param  {Number} index スライドする位置
	 * @return {Void}
	 */
  p._controller = function(index, noAnimate){
		var self = this;

		if(self.param._isAnimate){
			return void 0;
		}

    // indexの調整
    if(index < 0){
      index = self.param.slideMaxLength - 1;
    } else if(index >= self.param.slideMaxLength){
      index = 0;
    }

    // パラメータ更新
    self.param.current = index;
    self.param.left = self.param.current * self.param.distance * -1;

    // アニメート判定
    if(noAnimate){
      self.setPosition();
    } else {
      $.sequence(
        function(){
          // スライド前
          self.param._isAnimate = true;
          self.timerStop();
          self.active();
        },
        function(){
          // スライド
          return self._tween();
        },
        function(){
          // スライド後
          self.timerStart();
          self.param._isAnimate = false;
        }
      );
    }
  };


	/* Views
	-----------------------------------------------------------------*/
  /**
   * <h4>表示可能な要素の数を取得</h4>
   *
   * @private
   * @method _getDisplayLength
   * @return {Number}
   */
  p._getDisplayLength = function(){
    var count = 0;
    this.param.$slideItems.each(function(){
      if($(this).css('display') !== 'none'){
        count += 1;
      }
    });
    return count;
  };


  /// FIXME: 追加予定
  /// p.setLiquidItem = function(){};


	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @method createPointer
	 * @return {Slider}
	 */
  p.createPointer = function(){
		if(this.param.$pointer[0]){
			var pointerHTML = this.param.$pointer.find('>')[0].outerHTML,
			print = '',
			i = 0;

      for(; i < this.param.slideMaxLength; i += 1){
        print += pointerHTML;
			}
			this.param.$pointer[0].innerHTML = print;
		}

		return this;
  };


 /**
  * <h4>スライドスタイルのセット</h4>
  *
  * @method setPosition
  * @return {Slider}
  */
  p.setPosition = function(){
    this.param.$slide.css({
      width: this._getDisplayLength() * this.param.$slideItems.outerWidth(true),
      left : this.param.left + this.param._adjustLeft
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
    var index = this.param.current * this.param._stepLength;

    // $slideItems
    this.param.$slideItems.removeClass(this.param.activeClass)
    .slice(index, index + this.param._stepLength)
    .addClass(this.param.activeClass);

    // $thumbnail
    if(this.param.$thumbnail[0]){
      this.param.$thumbnail.removeClass(this.param.activeClass)
      .slice(index, index + this.param._stepLength).addClass(this.param.activeClass);
    }

		// $pointer
		if(this.param.$pointer[0]){
			this.param.$pointer.children().removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		}

		// $next
		if(this.param.current === this.param.slideMaxLength - 1){
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
		this.param.$slide.velocity('stop')
    .css({left: this.param.left + this.param._adjustLeft + x});
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
    .velocity({
      left: this.param.left + this.param._adjustLeft
    }, this.param.tween.duration / 2, this.param.tween.easing);
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
    .velocity({left: this.param.left + this.param._adjustLeft}, this.param.tween);
	};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Slider = Slider;


}(window, AMP, jQuery));
