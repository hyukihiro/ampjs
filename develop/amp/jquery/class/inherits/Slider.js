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
   * <p><a href="../../demo/AMP.$.Slider.html">DEMO</a></p>
   *
   * @constructor
   * @class AMP.$.Slider
   * @extends AMP.$.UIController
   * @param {jQuery} $slider スライダー要素
   * @param {Object} options オプション値
   */
  function Slider($slider, options){
    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    /**
     * <h4>スライダー要素</h4>
     *
     * @property props.$wrap
     * @type {jQuery}
     */
    /**
     * <h4>スライダーアイテム要素数</h4>
     *
     * @property props.length
     * @type {Number}
     */
    /**
     * <h4>スライドで進むアイテム数</h4>
     *
     * @private
     * @default null
     * @property props._stepLength
     * @type {Number}
     */
    /**
     * <h4>スライドカウントのMAX値</h4>
     *
     * @property props.slideMaxLength
     * @type {Number}
     */
    /**
     * <h4>スライドする距離</h4>
     *
     * @property props.distance
     * @type {Number}
     */
    /**
     * <h4>スライドポジションleft値</h4>
     *
     * @property props.left
     * @type {Number}
     */
    /**
     * <h4>タイマーID</h4>
     *
     * @private
     * @property props._timerId
     * @type {String}
     */
    /**
     * <h4>アニメーション状態管理フラグ</h4>
     *
     * @private
     * @property props._isAnimate
     * @type {Boolean}
     */
		this.props = $.extend(
			true,
			{},
			Slider.options,
			{
        $wrap         : $slider,
        $frame        : $slider.find('.frame'),
        $slide        : $slider.find('.slide'),
        $slideItem    : $slider.find('.slide').children(),
        $pointer      : $slider.find('.pointer'),
        $thumbnail    : $slider.find('.thumbnail a'),
        $prev         : $slider.find('.prev a'),
        $next         : $slider.find('.next a'),
        length        : $slider.find('.slide').children().length,
        _stepLength   : null,
        slideMaxLength: 0,
        distance      : 0,
        left          : 0,
        _adjustLeft   : 0,
        _timerId      : null,
        _isAnimate    : false
			},
			options
		);
  }

  // AMP.$.UIControllerクラスを継承
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
  Slider.VERSION = '1.2.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Slider';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>スライダーフレーム要素</h4>
   *
   * @static
   * @property options.$frame
   * @default $slider.find('.frame')
   * @type {jQuery}
   */
  /**
   * <h4>スライドする要素</h4>
   *
   * @static
   * @property options.$slide
   * @default $slider.find('.slide')
   * @type {jQuery}
   */
  /**
   * <h4>スライドアイテム要素</h4>
   *
   * @static
   * @property options.$slideItem
   * @default $slider.find('.slide').children()
   * @type {jQuery}
   */
  /**
   * <h4>ポインター要素</h4>
   *
   * @static
   * @property options.$pointer
   * @default $slider.find('.pointer')
   * @type {jQuery}
   */
  /**
   * <h4>サムネイル要素</h4>
   *
   * @static
   * @property options.$thumbnail
   * @default $slider.find('.thumbnail a')
   * @type {jQuery}
   */
  /**
   * <h4>prevナビ要素</h4>
   *
   * @static
   * @property options.$prev
   * @default $slider.find('.prev a')
   * @type {jQuery}
   */
  /**
   * <h4>nextナビ要素</h4>
   *
   * @static
   * @property options.$next
   * @default $slider.find('.next a')
   * @type {jQuery}
   */
  /**
   * <h4>フリックイベントを有効にするか</h4>
   *
   * @static
   * @property options.isFlick
   * @default true
   * @type {Boolean}
   */
  /**
   * <h4>スライダー要素にマウスオンされたときタイマーを無効にするか</h4>
   *
   * @static
   * @property options.isTimerCancel
   * @default true
   * @type {Boolean}
   */
  /**
   * <h4>スライドエリアの高さ調整機能を有効にするか</h4>
   *
   * @static
   * @property options.isAutoHeight
   * @default false
   * @type {Boolean}
   */
  /**
   * <h4>現在アクティブなスライドアイテムインデックス</h4>
   *
   * @static
   * @property options.current
   * @default 0
   * @type {Number}
   */
  /**
   * <h4>スライドステップ数を固定したい場合、ステップ数の指定</h4>
   *
   * @static
   * @property options.slideStep
   * @default 0
   * @type {Number}
   */
  /**
   * <h4>スライドタイマーの間隔</h4>
   * <p>タイマー値が0の場合タイマーは実行しません</p>
   *
   * @static
   * @property options.timer
   * @default 0
   * @type {Number}
   */
  /**
   * <h4>アクティブ要素に付与するクラス名</h4>
   *
   * @static
   * @property options.activeClass
   * @default active
   * @type {String}
   */
  /**
   * <h4>リサイズ時に実行する関数</h4>
   *
   * @static
   * @property options.resizeCall
   * @default $.noop
   * @type {Function}
   */
  /**
   * <h4>リサイズに完了時に実行する関数</h4>
   *
   * @static
   * @property options.resizeStopCall
   * @default $.noop
   * @type {Function}
   */
  /**
   * <h4>スライドアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property options.tween
   * @type {Object}
   */
  Slider.options = {
    $frame        : null,
    $slide        : null,
    $slideItem    : null,
    $pointer      : null,
    $thumbnail    : null,
    $prev         : null,
    $next         : null,
    isFlick       : true,
    isResize      : true,
    isTimerCancel : true,
    isAutoHeight  : false,
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
   * @param {jQuery} $wrap   スライダー要素
   * @param {Object} options オプション値
   * @return {Slider}
   */
  Slider.get = function($slider, options){
    return new Slider($slider, options).init();
  };


  /**
   * <h4>初期化</h4>
   * <p>Singleton</p>
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

    // props
    this.setProps();

    // view
    this.createPointer();
    this.setPosition();
    this.active();

    // event
    this.addEventResize();
    this.addEventTimerCancel();
    this.addEventThumbnail(this.props.$thumbnail);
    this.addEventFlick(this.props.$slide);
    this.addEventNext(this.props.$next);
    this.addEventPrev(this.props.$prev);
    this.addEventPager(this.props.$pointer.find('a'));

    // timer
    this.timerStart();

    return this;
  };


  /**
   * <h4>プロパティ設定</h4>
   *
   * @method setProps
   * @return {Slider}
   */
  p.setProps = function(){
    // ステージの幅
		var stageWidth = this.props.$frame.width();

		// アイテム要素の幅
		var itemWidth = this.props.$slideItem.outerWidth(true);

		// 表示エリアにある要素数
		var visibleLength = ~~(stageWidth / itemWidth);

    // ステップ数
    var step = this.props.slideStep && this.props.slideStep < visibleLength? this.props.slideStep : visibleLength;

    // 初期値が無い場合はセット
    if(!this.props._stepLength){
      this.props._stepLength = step;
    }

    // 現在値をセット
    this.props.current = ~~(this.props._stepLength * this.props.current / step);

    // スライドアイテムのステップ数
    this.props._stepLength = step;

		// 移動距離
		this.props.distance = step * itemWidth;

    // スライド最大数
    step = step || 1;
    this.props.slideMaxLength = Math.ceil(this._getDisplayLength() / step);

    // フレームのセンタリング
    if(this.props.distance < stageWidth){
      this.props._adjustLeft = ~~((this.props.distance - stageWidth) / -2);
    } else {
      this.props._adjustLeft = 0;
    }

    // 現在地
    this.props.left = this.props.current * this.props.distance * -1;

    return this;
  };


	/* Events
	-----------------------------------------------------------------*/
	/**
	 * <h4>リサイズイベント登録</h4>
	 *
	 * @method addEventResize
	 * @return {Slider}
	 */
	p.addEventResize = function(){
		var self = this;

		$(window).off('resize.Slider resizestop.Slider')
		.on('resize.Slider', function(){
      if(self.props.isResize){
        self.timerStop();
        self.props.resizeCall();
      }
    })
    .on('resizestop.Slider', function(){
      if(self.props.isResize){
        self.setProps();
        self.setPosition();
        self.createPointer();
        self.addEventPager(self.props.$pointer.find('a'));
        self.active();
        self.timerStart();
        self.props.resizeStopCall();
      }
		});

		return this;
  };


  /**
   * <h4>Thumbnailボタンイベント登録</h4>
   *
   * @method addEventThumbnail
   * @param {jQuery} $thumbnail Thumbnailトリガー要素
   * @return {Slider}
   */
  p.addEventThumbnail = function($thumbnail){
    var self = this;

    $thumbnail.on('click.Slider', function(){
      var index = ~~($thumbnail.index(this) / self.props._stepLength);
      self.moveTo(index);
      return false;
    });

    return this;
  };


  /**
   * <h4>タイマーキャンセルイベント登録</h4>
   * <p>スライダーにマウスオンされた状態の時、タイマー処理をキャンセルします</p>
   *
	 * @method addEventTimerCancel
	 * @return {Slider}
   */
  p.addEventTimerCancel = function(){
		var self = this;

		self.props.$wrap.off('mouseenter.Slider mouseleave.Slider')
		.on('mouseenter.Slider', function(){
			if(self.props.isTimerCancel){
				self.timerStop();
			}
		})
		.on('mouseleave.Slider', function(){
			if(self.props.isTimerCancel){
				self.timerStart();
			}
		});

		return this;
  };



  /* Controllers
  -----------------------------------------------------------------*/
	/**
	 * <h4>タイマースタート</h4>
   * <p>タイマー値が0の場合タイマーは実行しません</p>
	 *
	 * @method timerStart
	 * @param  {Number} num セットするタイマー値(省略可)
	 * @return {Slider}
	 */
	p.timerStart = function(num){
		var self = this;

		if(AMP.isNumber(num)){
			self.props.timer = num;
		}

		// タイマーをクリア
		self.timerStop();

		if(0 < self.props.timer){
			self.props._timerId = setTimeout(function(){
				self.next();
			}, self.props.timer + self.props.tween.duration);
		}

		return this;
	};


	/**
	 * <h4>タイマー停止</h4>
   *
	 * @method timerStop
	 * @return {Slider}
	 */
	p.timerStop = function(){
		clearTimeout(this.props._timerId);
		return this;
	};


	/**
	 * <h4>コントローラー</h4>
   * <p>スライダーイベントが実行されたとき、必ずここの処理を通します</p>
	 *
   * @override
   * @private
	 * @method _controller
   * @param  {Number} index スライドする位置
	 * @param  {Boolean} nonAnimate アニメーション無
	 * @return {Void}
	 */
  p._controller = function(index, nonAnimate){
		var self = this;

		if(self.props._isAnimate || this.props.current === index){
			return void 0;
		}

    // indexの調整
    if(index < 0){
      index = self.props.slideMaxLength - 1;
    } else if(index >= self.props.slideMaxLength){
      index = 0;
    }

    // パラメータ更新
    self.props.current = index;
    self.props.left = self.props.current * self.props.distance * -1;

    // 高さ調整
    if(self.props.isAutoHeight){
      self.autoHeight();
    }

    // アニメート判定
    if(nonAnimate){
      self.setPosition();
      self.active();
    } else {
      $.sequence(
        function(){
          // スライド前
          self.props._isAnimate = true;
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
          self.props._isAnimate = false;
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
    this.props.$slideItem.each(function(){
      if($(this).css('display') !== 'none'){
        count += 1;
      }
    });
    return count;
  };


	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @method createPointer
	 * @return {Slider}
	 */
  p.createPointer = function(){
		if(this.props.$pointer[0]){
			var pointerHTML = this.props.$pointer.find('>')[0].outerHTML,
			print = '',
			i = 0;

      for(; i < this.props.slideMaxLength; i += 1){
        print += pointerHTML;
			}
			this.props.$pointer[0].innerHTML = print;
		}

		return this;
  };


  /**
   * <h4>要素のアクティブ化</h4>
   *
   * @method active
   * @return {Slider}
   */
  p.active = function(){
    var index = this.props.current * this.props._stepLength;

    // $slideItem
    this.props.$slideItem.removeClass(this.props.activeClass)
    .slice(index, index + this.props._stepLength)
    .addClass(this.props.activeClass);

    // $thumbnail
    if(this.props.$thumbnail[0]){
      this.props.$thumbnail.removeClass(this.props.activeClass)
      .slice(index, index + this.props._stepLength).addClass(this.props.activeClass);
    }

		// $pointer
		if(this.props.$pointer[0]){
			this.props.$pointer.children().removeClass(this.props.activeClass)
			.eq(this.props.current).addClass(this.props.activeClass);
		}

		// $next
		if(this.props.current === this.props.slideMaxLength - 1){
      this.props.$next.addClass(this.props.activeClass);
		} else {
			this.props.$next.removeClass(this.props.activeClass);
		}

		// $prev
		if(this.props.current === 0){
			this.props.$prev.addClass(this.props.activeClass);
		} else {
			this.props.$prev.removeClass(this.props.activeClass);
		}

		return this;
  };


  /**
   * <h4>スライダーをアイテムの高さに揃える</h4>
   *
   * @method autoHeight
   * @return {Slider}
   */
  p.autoHeight = function(){
    var height = 0,
    index = this.props.current * this.props._stepLength,
    $items = this.props.$slideItem.slice(index, index + this.props._stepLength);

    // 一番高い要素の高さを取得
    $items.each(function(i){
      height = height < $items.eq(i).height() ? $items.eq(i).height() : height;
    });

    this.props.$frame.height(height);

    return this;
  };


 /**
  * <h4>スライドスタイルのセット</h4>
  *
  * @method setPosition
  * @return {Slider}
  */
  p.setPosition = function(){
    this.props.$slide.css({
      width: this._getDisplayLength() * this.props.$slideItem.outerWidth(true),
      left : this.props.left + this.props._adjustLeft
    });

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
		this.props.$slide.velocity('stop').css({left: this.props.left + this.props._adjustLeft + x});
  };


  /**
   * <h4>スライド位置を戻す</h4>
   *
   * @private
   * @method _resetTween
   * @return {jQuery.Deferred}
   */
  p._resetTween = function(){
		return this.props.$slide.velocity('stop')
    .velocity({
      left: this.props.left + this.props._adjustLeft
    }, this.props.tween.duration / 2, this.props.tween.easing);
  };


	/**
	 * <h4>スライドアニメーションを実行</h4>
	 *
	 * @private
	 * @method _tween
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(){
		return this.props.$slide.velocity('stop')
    .velocity({left: this.props.left + this.props._adjustLeft}, this.props.tween);
	};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Slider = Slider;


}(window, AMP, jQuery));
