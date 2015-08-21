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
   * <h4>クロスフェーダー</h4>
   * <p><a href="../../demo/AMP.$.Crossfader.html">DEMO</a></p>
   *
   * @constructor
   * @class AMP.$.Crossfader
   * @extends AMP.$.UIController
   * @param {jQuery} $crossfader クロスフェーダー要素
   * @param {Object} options オプション値
   */
  function Crossfader($crossfader, options){
    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    /**
     * <h4>クロスフェーダー要素</h4>
     *
     * @property props.$wrap
     * @type {jQuery}
     */
    /**
     * <h4>アイテム要素数</h4>
     *
     * @property props.length
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
			Crossfader.options,
			{
        $wrap         : $crossfader,
        $frame        : $crossfader.find('.frame'),
        $item         : $crossfader.find('.frame').children(),
        $pointer      : $crossfader.find('.pointer'),
        $thumbnail    : $crossfader.find('.thumbnail a'),
        $prev         : $crossfader.find('.prev a'),
        $next         : $crossfader.find('.next a'),
        length        : $crossfader.find('.frame').children().length,
        _timerId      : null,
        _isAnimate    : false
			},
			options
		);
  }

  // AMP.$.UIControllerクラスを継承
  AMP.inherits(Crossfader, AMP.$.UIController);

  // prototype
  var p = Crossfader.prototype;



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
  Crossfader.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Crossfader';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>クロスフェーダーフレーム要素</h4>
   *
   * @static
   * @property options.$frame
   * @default $crossfader.find('.frame')
   * @type {jQuery}
   */
  /**
   * <h4>クロスフェードするアイテム要素</h4>
   *
   * @static
   * @property options.$item
   * @default $crossfader.find('.frame').children()
   * @type {jQuery}
   */
  /**
   * <h4>ポインター要素</h4>
   *
   * @static
   * @property options.$pointer
   * @default $crossfader.find('.pointer')
   * @type {jQuery}
   */
  /**
   * <h4>サムネイル要素</h4>
   *
   * @static
   * @property options.$thumbnail
   * @default $crossfader.find('.thumbnail a')
   * @type {jQuery}
   */
  /**
   * <h4>prevナビ要素</h4>
   *
   * @static
   * @property options.$prev
   * @default $crossfader.find('.prev a')
   * @type {jQuery}
   */
  /**
   * <h4>nextナビ要素</h4>
   *
   * @static
   * @property options.$next
   * @default $crossfader.find('.next a')
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
   * <h4>クロスフェーダー要素にマウスオンされたときタイマーを無効にするか</h4>
   *
   * @static
   * @property options.isTimerCancel
   * @default true
   * @type {Boolean}
   */
  /**
   * <h4>クロスフェードエリアの高さ調整機能を有効にするか</h4>
   *
   * @static
   * @property options.isAutoHeight
   * @default false
   * @type {Boolean}
   */
  /**
   * <h4>現在アクティブなアイテムインデックス</h4>
   *
   * @static
   * @property options.current
   * @default 0
   * @type {Number}
   */
  /**
   * <h4>クロスフェードタイマーの間隔</h4>
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
   * <h4>クロスフェードアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property options.tween
   * @type {Object}
   */
  Crossfader.options = {
    $frame        : null,
    $item         : null,
    $pointer      : null,
    $thumbnail    : null,
    $prev         : null,
    $next         : null,
    isFlick       : true,
    isResize      : true,
    isTimerCancel : true,
    isAutoHeight  : true,
    current       : 0,
    timer         : 0,
    activeClass   : 'active',
    resizeCall    : $.noop,
    resizeStopCall: $.noop,
    tween         : {
      easing      : 'easeInSine',
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
   * <h4>Crossfaderインスタンスの生成</h4>
   *
   * @static
   * @param {jQuery} $wrap   クロスフェード要素
   * @param {Object} options オプション値
   * @return {Crossfader}
   */
  Crossfader.get = function($crossfader, options){
    return new Crossfader($crossfader, options).init();
  };


  /**
   * <h4>初期化</h4>
   * <p>Singleton</p>
   *
   * @method  init
   * @return {Crossfader}
   */
  p.init = function(){
    // 初期化フラグ
    if(this._isInit){
      return this;
    }
    this._isInit = true;

    // view
    this.createPointer();

    // event
    this.addEventResize();
    this.addEventTimerCancel();
    this.addEventFlick(this.props.$frame);
    this.addEventNext(this.props.$next);
    this.addEventPrev(this.props.$prev);
    this.addEventPager(this.props.$thumbnail);
    this.addEventPager(this.props.$pointer.find('a'));

    // view
    this.setIndex();
    this.active();

    return this;
  };


	/* Events
	-----------------------------------------------------------------*/
	/**
	 * <h4>リサイズイベント登録</h4>
	 *
	 * @method addEventResize
	 * @return {Crossfader}
	 */
	p.addEventResize = function(){
		var self = this;

		$(window).off('resize.Crossfader resizestop.Crossfader')
		.on('resize.Crossfader', function(){
      if(self.props.isResize){
        self.timerStop();
        self.props.resizeCall();
      }
    })
    .on('resizestop.Crossfader', function(){
      if(self.props.isResize){
        self.timerStart();
        self.props.resizeStopCall();
      }
		});

		return this;
  };


  /**
   * <h4>タイマーキャンセルイベント登録</h4>
   * <p>クロスフェーダーにマウスオンされた状態の時、タイマー処理をキャンセルします</p>
   *
	 * @method addEventTimerCancel
	 * @return {Crossfader}
   */
  p.addEventTimerCancel = function(){
		var self = this;

		self.props.$wrap.off('mouseenter.Crossfader mouseleave.Crossfader')
		.on('mouseenter.Crossfader', function(){
			if(self.props.isTimerCancel){
				self.timerStop();
			}
		})
		.on('mouseleave.Crossfader', function(){
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
	 * @return {Crossfader}
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
	 * @return {Crossfader}
	 */
	p.timerStop = function(){
		clearTimeout(this.props._timerId);
		return this;
	};


	/**
	 * <h4>コントローラー</h4>
   * <p>クロスフェードイベントが実行されたとき、必ずここの処理を通します</p>
   *
   * @override
   * @private
	 * @method _controller
   * @param  {Number} index 表示するアイテムインデックス
	 * @param  {Boolean} nonAnimate アニメーション無
	 * @return {Void}
	 */
  p._controller = function(index, nonAnimate){
		var self = this;

    // アニメーションキャンセル
		if(self.props._isAnimate || self.props.current === index){
			return void 0;
		}

    // indexの調整
    if(index < 0){
      index = self.props.length - 1;
    } else if(index >= self.props.length){
      index = 0;
    }

    // パラメータ更新
    prev = self.props.current;
    self.props.current = index;

    // アニメート判定
    if(nonAnimate){
      self.setIndex();
      self.active();
    } else {
      $.sequence(
        function(){
          // フェード前
          self.props._isAnimate = true;
          self.timerStop();
          self.active();
        },
        function(){
          // フェード
          return self._tween(prev, self.props.current);
        },
        function(){
          // フェード後
          self.timerStart();
          self.props._isAnimate = false;
        }
      );
    }
  };


	/* Views
	-----------------------------------------------------------------*/
	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @method createPointer
	 * @return {Crossfader}
	 */
  p.createPointer = function(){
		if(this.props.$pointer[0]){
			var pointerHTML = this.props.$pointer.find('>')[0].outerHTML,
			print = '',
			i = 0;

      for(; i < this.props.length; i += 1){
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
   * @return {Crossfader}
   */
  p.active = function(){
    // $item
    this.props.$item.removeClass(this.props.activeClass)
    .eq(this.props.current).addClass(this.props.activeClass);

    // $thumbnail
    if(this.props.$thumbnail[0]){
      this.props.$thumbnail.removeClass(this.props.activeClass)
      .eq(this.props.current).addClass(this.props.activeClass);
    }

		// $pointer
		if(this.props.$pointer[0]){
			this.props.$pointer.children().removeClass(this.props.activeClass)
			.eq(this.props.current).addClass(this.props.activeClass);
		}

		// $next
		if(this.props.current === this.props.length - 1){
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
   * <h4>クロスフェードアイテムの高さに揃える</h4>
   *
   * @method autoHeight
   * @return {Crossfader}
   */
  p.autoHeight = function(){
    var height = this.props.$item.eq(this.props.current).height();
    this.props.$frame.height(height);
    return this;
  };


 /**
  * <h4>クロスフェードアイテムのスタイル設定</h4>
  *
  * @method setIndex
  * @return {Crossfader}
  */
  p.setIndex = function(){
    this.props.$item.velocity('stop')
    .css({display: 'none', zIndex: 1, opaciy: 0})
    .eq(this.props.current)
    .css({display: 'block', zIndex: this.props.length, opaciy: 1});

    if(this.props.isAutoHeight){
      this.autoHeight();
    }

    return this;
  };


	/**
	 * <h4>クロスフェードアニメーションを実行</h4>
	 *
	 * @private
	 * @method _tween
   * @param {Number} prev 前の要素
   * @param {Number} next 次の要素
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(prev, next){
    // prev hide
    this.props.$item.velocity('stop')
    .eq(prev).velocity({opacity: 0, zIndex: 1}, {
      easing  : this.props.tween.easing,
      duration: this.props.tween.duration,
      display : 'none'
    });

    this.props.$item.eq(next).css({display: 'block',zIndex: this.props.length, opacity: 0});

    if(this.props.isAutoHeight){
      this.autoHeight();
    }

    // next show
		return this.props.$item.eq(next).velocity({opacity: 1}, this.props.tween);
	};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Crossfader = Crossfader;


}(window, AMP, jQuery));
