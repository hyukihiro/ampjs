/**
 * AMPjs Javascript Library
 * AMPjs jQuery Module File version 3.1.1
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 */


(function(root, AMP){

	/**
	 * @class AMP.$
	 */
	AMP.$ = {};

	/**
	 * <h4>バージョン情報</h4>
	 *
	 * @static
	 * @property AMP.$.VERSION
	 * @type {String}
	 */
	AMP.$.VERSION = '3.1.1';


}(window, AMP));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>UIコントローラ</h4>
   * <p>UIコントローラクラスを継承する事でUIコントローラを提供します</p>
   *
   * @protected
   * @class AMP.$.UIController
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function UIController(){}

  // 基底クラスを継承
  AMP.inherits(UIController, AMP.BASE_CLASS);

  // prototype
  var p = UIController.prototype;



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
  UIController.VERSION = '1.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'UIController';


  /**
   * <h4>プロパティオブジェクト</h4>
   *
   * @property props
   * @type {Object}
   */
  /**
   * <h4>現在値</h4>
   *
   * @property props.current
   * @type {Number}
   */
  p.props = {
    current: 0
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Pagerボタンイベント登録</h4>
   *
   * @method addEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.addEventPager = function($pager){
    var self = this;
    $pager.on('click.' + self.className, function(){
      self.moveTo($pager.index(this));
      return false;
    });
    return this;
  };


  /**
   * <h4>Pagerボタンイベント削除</h4>
   *
   * @method removeEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.removeEventPager = function($pager){
    $pager.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Nextボタンイベント登録</h4>
   *
   * @method addEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.addEventNext = function($next){
    var self = this;
    $next.on('click.' + self.className, function(){
      self.next();
      return false;
    });
    return this;
  };


  /**
   * <h4>Nextボタンイベント削除</h4>
   *
   * @method removeEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.removeEventNext = function($next){
    $next.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Prevボタンイベント登録</h4>
   *
   * @method addEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.addEventPrev = function($prev){
    var self = this;
    $prev.on('click.' + self.className, function(){
      self.prev();
      return false;
    });
    return this;
  };


  /**
   * <h4>Prevボタンイベント削除</h4>
   *
   * @method removeEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.removeEventPrev = function($prev){
    $prev.off('click.' + this.className);
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
    .on('flickmoveX.' + this.className, function(moveEvent){
      self._move(moveEvent.moveX);
    })
    .on('flickcancelX.' + this.className, function(){
      self._resetTween();
    })
    .on('flickX.' + this.className, function(flickEvent){
      if(0 < flickEvent.moveX){
        self.prev();
      } else {
        self.next();
      }
    });
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   * アニメート無
   *
   * @method current
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.current = function(index){
    this._controller(index, true);
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   *
   * @method moveTo
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.moveTo = function(index){
    this._controller(index);
    return this;
  };


  /**
   * <h4>次へ</h4>
   *
   * @method next
   * @return {Instance}
   */
  p.next = function(){
    this._controller(this.props.current + 1);
    return this;
  };


  /**
   * <h4>前へ</h4>
   *
   * @method prev
   * @return {Instance}
   */
  p.prev = function(){
    this._controller(this.props.current -1);
    return this;
  };


  /**
   * <h4>コントローラー</h4>
   * 送られてきた値を制御します
   *
   * @protected
   * @private
   * @method _controller
   * @param {Number} index スライドインデック
   * @param {Boolean} nonAnimate アニメーション無
   * @return {Instance}
   */
  p._controller = function(index, nonAnimate){};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.UIController = UIController;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スムーススクロール（慣性スクロール）</h4>
   * <p><em>※ WindowsPCのみ有効</em><br>
   * <a href="../../demo/AMP.$.SmothScroll.html">DEMO</a></p>
   *
   * @class AMP.$.SmoothScroll
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function SmoothScroll(options){
    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true,
      {},
      SmoothScroll.options,
      {$page: $('html, body')},
      options
    );
  }

  // 基底クラスを継承
  AMP.inherits(SmoothScroll, AMP.BASE_CLASS);

  // prototype
  var p = SmoothScroll.prototype;



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
  SmoothScroll.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'SmoothScroll';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
    /**
   * <h4>スムーススクロールエリア</h4>
   *
   * @property options.$page
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>スクロール量</h4>
   *
   * @property options.amount
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>duration</h4>
   *
   * @property options.duration
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @property options.easing
   * @default easeOutCubic
   * @type {String}
   */
  SmoothScroll.options = {
    $page   : null,
    amount  : 400,
    duration: 600,
    easing  : 'easeOutCubic'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>SmoothScrollインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {Object} options? オプション値 省略可
   * @return {SmoothScroll}
   */
  SmoothScroll.get = function(options){
    return new SmoothScroll(options).on();
  };


  /**
   * <h4>初期化</h4>
   *
   * @method on
   * @return {SmoothScroll}
   */
  p.on = function(){
    var self = this;

    // WindowsPCのみ有効
    if(AMP.isWindows()){
      self.props.$page.off('mousewheel.SmoothScroll')
      .on('mousewheel.SmoothScroll', function(){
        self.tween(arguments[1]);
        return false;
      });
    }
    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {SmoothScroll}
   */
  p.off = function(){
    this.props.$page.off('mousewheel.SmoothScroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(move){
    var self = this,
    props = self.props,
    y = AMP.isWebkit() ? self.props.$page.eq(1).scrollTop() : self.props.$page.eq(0).scrollTop(),
    scrollY = move > 0 ? y - props.amount : y + props.amount;

    self.props.$page.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: props.duration, easing: props.easing});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.SmoothScroll = SmoothScroll;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してToggle処理をします</h4>
   * <p><a href="../../demo/AMP.$.ScrollToggle.html">DEMO</a></p>
   *
   * @class AMP.$.ScrollToggle
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $scrollToggle 表示・非表示する要素
   * @param  {Object} options オプション値
   */
  function ScrollToggle($scrollToggle, options){

    // $scrollToggle指定がない場合、初期値を設定
    if(!$scrollToggle || !($scrollToggle instanceof jQuery)){
      options = $scrollToggle;
      $scrollToggle = $('.scroll_toggle');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, ScrollToggle.options, options);

    /**
     * <h4>表示・非表示する要素</h4>
     *
     * @default $('.scroll_toggle')
     * @property props.$scrollToggle
     * @type {jQuery}
     */
    this.props.$scrollToggle = $scrollToggle;

    /**
     * <h4>window要素</h4>
     *
     * @property props.$window
     * @type {jQuery}
     */
    this.props.$window = $(window);

    /**
     * <h4>Displayスタイルの状態</h4>
     *
     * @property props.isDisplay
     * @type {Boolean}
     */
    this.props.isDisplay = $scrollToggle.css('display') !== 'none';
  }

  // 基底クラスを継承
  AMP.inherits(ScrollToggle, AMP.BASE_CLASS);

  // prototype
  var p = ScrollToggle.prototype;



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
  ScrollToggle.VERSION = '3.2.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ScrollToggle';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>表示されるY値</h4>
   *
   * @static
   * @property showY
   * @default 300
   * @type {Number}
   */
  /**
   * <h4>表示・非表示の座標判定を反転します</h4>
   * <p>false(初期値)は、Y座標300pxを超えると表示しますが、trueにすると300px超えると非表示にします</p>
   *
   * @static
   * @property isReverse
   * @default false
   * @type {Number}
   */
  /**
   * <h4>表示のスタイル</h4>
   *
   * @static
   * @property show
   * @default { opacity: 1}
   * @type {Object}
   */
  /**
   * <h4>非表示のスタイル</h4>
   *
   * @static
   * @property hide
   * @default { opacity: 0}
   * @type {Object}
   */
  /**
   * <h4>duration</h4>
   *
   * @static
   * @property duration
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @static
   * @property easing
   * @default easeInSine
   * @type {String}
   */
  /**
   * <h4>表示後のコールバック</h4>
   *
   * @static
   * @property showCall
   * @default $.noop
   * @type {String}
   */
  /**
   * <h4>非表示後のコールバック</h4>
   *
   * @static
   * @property hideCall
   * @default $.noop
   * @type {String}
   */
  ScrollToggle.options = {
    showY    : 300,
    isReverse: false,
    show     : { opacity: 1},
    hide     : { opacity: 0},
    duration : 500,
    easing   : 'easeInSine',
    showCall : $.noop,
    hideCall : $.noop
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ScrollToggleインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $scrollToggle 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  ScrollToggle.get = function($scrollToggle, options){
    return new ScrollToggle($scrollToggle, options).on();
  };


  /**
   * <h4>イベントオン</h4>
   *
   * @method on
   * @return {ScrollToggle}
   */
  p.on = function(){
    var self = this;

    self.props.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      self._scrollController(self.props.$window.scrollTop());
    }).trigger('scroll.ScrollToggle');

    return this;
  };


  /**
   * <h4>スクロールイベントをコントロール</h4>
   *
   * @private
   * @method _scrollController
   * @param {Number} y スクロールY値
   * @return {Void}
   */
  p._scrollController = function(y){
    var self = this;
    if(this.props.isReverse){
      if(!this.props.isDislpay && this.props.showY > y){
        this.show();
        this.props.isDislpay = true;
      } else if(this.props.isDislpay && this.props.showY < y){
        this.hide();
        this.props.isDislpay = false;
      }
    } else {
      if(!this.props.isDislpay && this.props.showY < y){
        this.show();
        this.props.isDislpay = true;
      } else if(this.props.isDislpay && this.props.showY > y){
        this.hide();
        this.props.isDislpay = false;
      }
    }
  };


  /**
   * <h4>イベントオフ</h4>
   *
   * @method off
   * @return {ScrollToggle}
   */
  p.off = function(){
    this.props.$window.off('scroll.ScrollToggle');
    return this;
  };


  /**
   * <h4>表示</h4>
   *
   * @method show
   * @return {ScrollToggle}
   */
  p.show = function(){
    this.props.$scrollToggle
    .css({display: 'block'})
    .css(this.props.hide)
    .velocity('stop')
    .velocity(this.props.show, this.props.duration, this.props.easing, this.props.showCall);

    return this;
  };


  /**
   * <h4>非表示</h4>
   *
   * @method hide
   * @return {ScrollToggle}
   */
  p.hide = function(){
    var self = this;
    this.props.$scrollToggle
    .velocity('stop')
    .velocity(this.props.hide, this.props.duration, this.props.easing, function(){
      self.props.$scrollToggle.css({display: 'none'});
      self.props.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.ScrollToggle = ScrollToggle;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   * <p><a href="../../demo/AMP.$.Scroll.html">DEMO</a></p>
   *
   * @class AMP.$.Scroll
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $scrollTrigger トリガーとなるa要素
   * @param  {Object} options オプション値
   */
  function Scroll($scrollTrigger, options){
    // $scrollTrigger指定がない場合、初期値を設定
    if(!$scrollTrigger || !($scrollTrigger instanceof jQuery)){
      options = $scrollTrigger;
      $scrollTrigger = $('a[href^=#]');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, Scroll.options, {$html: $('html, body')}, options);

    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property props.$scrollTrigger
     * @type {jQuery}
     */
    this.props.$scrollTrigger = $scrollTrigger;
  }

  // 基底クラスを継承
  AMP.inherits(Scroll, AMP.BASE_CLASS);

  // prototype
  var p = Scroll.prototype;



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
  Scroll.VERSION = '3.2.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Scroll';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>ページ要素</h4>
   *
   * @static
   * @property options.$html
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>停止位置調整値</h4>
   *
   * @static
   * @property options.adjust
   * @default 0
   * @type {Number|Function}
   */
  /**
   * <h4>スクロールしないトリガークラス名</h4>
   *
   * @static
   * @property options.noScrollClass
   * @default no_scroll
   * @type {String}
   */
  /**
   * <h4>スクロールアニメーションのオプション値</h4>
   * <p><a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property options.tween
   * @default  {duration: 800, easing: 'easeOutQuint'}
   * @type {Object}
   */
  Scroll.options = {
    $html        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no_scroll',
    tween        : {
      duration   : 800,
      easing     : 'easeOutQuint'
    }
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Scrollインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $scrollTrigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll}
   */
  Scroll.get = function($scrollTrigger, options){
    return new Scroll($scrollTrigger, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Scroll}
   */
  p.on = function(){
    var self = this;

    // スクロールイベントの重複回避
    this.off();

    self.props.$scrollTrigger.on('click.Scroll', function(){
      return self.tween(self.props.$scrollTrigger.index(this));
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Scroll}
   */
  p.off = function(){
    this.props.$scrollTrigger.off('click.Scroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   * <p>FIXME: Stringも対応予定</p>
   *
   * @method tween
   * @param {Number} num トリガー要素のインデックス
   * @return {Void}
   */
  p.tween = function(num){
    var self = this,
    props = self.props,
    $scrollTrigger = props.$scrollTrigger.eq(num),
    $target = $($scrollTrigger.attr('href'));

    if($target[0] && !$scrollTrigger.hasClass(props.noScrollClass)){
      var adjust = AMP.isFunction(props.adjust) ? props.adjust() || 0 : props.adjust,
      moveTo = $target.offset().top - adjust;

      if($(root).scrollTop() !== moveTo){
        var tween = $.extend({offset: moveTo}, props.tween);
        props.$html.velocity('stop').velocity('scroll', tween);
      }
      return false;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Scroll = Scroll;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ロールオーバー</h4>
   * <p>!!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.rollover</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.$.Rollover.html">DEMO</a></p>
   *
   * @class AMP.$.Rollover
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function Rollover(){}

  // 基底クラスを継承
  AMP.inherits(Rollover, AMP.BASE_CLASS);

  // prototype
  var p = Rollover.prototype;



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
  Rollover.VERSION = '2.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Rollover';


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>グループクラス名</h4>
   *
   * @static
   * @property options.groupClass
   * @default group_rover
   * @type {String}
   */
  /**
   * <h4>アクティブクラス名</h4>
   *
   * @static
   * @property options.activeClass
   * @default active
   * @type {String}
   */
  /**
   * <h4>ノーロールオーバークラス名</h4>
   *
   * @static
   * @property options.noOverClass
   * @default no_rover
   * @type {String}
   */
  /**
   * <h4>ロールオーバー時に付与するファイル名</h4>
   *
   * @static
   * @property options.postfix
   * @default _on
   * @type {String}
   */
  Rollover.options = {
    groupClass : 'group_rover',
    activeClass: 'active',
    noOverClass: 'no_rover',
    postfix    : '_on'
  };


  /**
   * <h4>ロールオーバークラス名初期値</h4>
   *
   * @static
   * @property imageClass
   * @type {String}
   */
  Rollover.imageClass = 'img.rover, input.rover, .all_rover img';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ロールオーバーイベント追加</h4>
   *
   * @method on
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.on = function($images, options){
    var self = this;

    // $image指定がない場合、初期値を設定
    if(!$images || !($images instanceof jQuery)){
      options = $images;
      $images = $(Rollover.imageClass);
    }

    var props = $.extend(true, {}, Rollover.options, options);

    $images.each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // on画像の場合
      if(!data.isOffImg){
        data.image.src = data.offSrc;
      }

      // rollover
      data.$trigger
      .on('mouseenter.Rollover', function(){
        if(!data.$image.hasClass(props.noOverClass)){
          data.image.src = data.onSrc;
        }
      })
      .on('mouseleave.Rollover', function(){
        if(!data.$image.hasClass(props.noOverClass)){
          data.image.src = data.offSrc;
        }
      });
    });

    return this;
  };


  /**
   * <h4>ロールオーバーイベント削除</h4>
   *
   * @method off
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.off = function($images, options){
    // $image指定がない場合、初期値を設定
    if(!$images || !($images instanceof jQuery)){
      options = $images;
      $images = $(Rollover.imageClass);
    }

    var props = $.extend(true, {}, Rollover.options, options);

    $images.each(function(i){
      var $group = $images.eq(i).closest('.' + props.groupClass),
      $trigger = $group[0] ? $group : $images.eq(i);
      $trigger.off('mouseenter.Rollover mouseleave.Rollover');
    });

    return this;
  };


  /**
   * <h4>画像のアクティブ化</h4>
   *
   * @method active
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.active = function($images, options){
    var self = this,
    props = $.extend(true, {}, Rollover.options, options);

    $images.addClass(props.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // イベント削除
      data.$trigger
      .addClass(props.activeClass)
      .off('mouseenter.Rollover mouseleave.Rollover');

      // off画像の場合
      if(data.isOffImg){
        data.image.src = data.onSrc;
      }
    });

    return this;
  };


  /**
   * <h4>画像を待機状態にする</h4>
   *
   * @method passive
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.passive = function($images, options){
    var self = this,
    props = $.extend(true, {}, Rollover.options, options);

    $images.removeClass(props.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // イベント削除
      data.$trigger
      .removeClass(props.activeClass)
      .off('mouseenter.Rollover mouseleave.Rollover');

      // on画像の場合
      if(!data.isOffImg){
        data.image.src = data.offSrc;
      }
    });

    return this;
  };


  /**
   * <h4>ロールオーバーデータの生成</h4>
   *
   * @method _createRolloverData
   * @private
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p._createRolloverData = function($image, options){
    var
    image = $image[0],
    src = image.src,
    ext = src.substring(src.lastIndexOf('.'), src.length),
    $group = $image.closest('.' + options.groupClass).addClass(options.activeClass),
    onSrc,
    offSrc;

    // 現在on画像の場合
    if(src.lastIndexOf(options.postfix + ext) > -1){
      onSrc = src;
      offSrc = src.replace(options.postfix + ext, ext);
      AMP.preload(offSrc);

    // 現在off画像の場合
    } else {
      offSrc = src;
      onSrc = src.replace(ext, options.postfix + ext);
      AMP.preload(onSrc);
    }

    // RolloverData
    return {
      $image  : $image,
      image   : image,
      $trigger: $group[0] ? $group : $image,
      onSrc   : onSrc,
      offSrc  : offSrc,
      isOffImg: src === offSrc
    };
  };



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$.Rollover = Rollover;
  AMP.$.rollover = new Rollover();


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>メディアクエリのブレイクポイントに応じて、画像を書き換えます</h4>
   * <p>!!! AMP.Mediaqueryを継承しています<br>
   * <a href="../../demo/AMP.$.MediaImageChange.html">DEMO</a></p>
   *
   * @class AMP.$.MediaImageChange
   * @extends AMP.Mediaquery
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @constructor
   */
	function MediaImageChange($images, options){
		if(!$images || !($images instanceof jQuery)){
      options = $images;
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
		this.props = $.extend(true, {}, MediaImageChange.options, options);

    if(!$images || !($images instanceof jQuery)){
      $images = $('img[' + this.props.attrKey + ']');
    }

    /**
     * <h4>画像を書き換える要素</h4>
     *
     * @property props.$images
     * @type {jQuery}
     */
    this.props.$images = $images;

    /**
     * <h4>現在の状態</h4>
     *
     * @property props.current
     * @type {String}
     */
    this.props.current = null;

		// superClass constructor call
		MediaImageChange.Mediaquery_constructor.call(this, this.props.element);
	}

  // AMP.Mediaqueryクラスを継承
  AMP.inherits(MediaImageChange, AMP.Mediaquery);

  // prototype
  var p = MediaImageChange.prototype;



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  MediaImageChange.VERSION = '1.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'MediaImageChange';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>監視対象要素</h4>
   *
   * @static
   * @property options.element
   * @type {DOM}
   */
  /**
   * <h4>画像ファイルパス格納属性名</h4>
   *
   * @static
   * @property options.attrKey
   * @default 'data-media-img'
   * @type {String}
   */
  /**
   * <h4>画像ファイルに追加するprefix</h4>
   *
   * @static
   * @property options.imagePrefix
   * @default '_'
   * @type {String}
   */
  /**
   * <h4>対象要素監視しているか？</h4>
   *
   * @static
   * @property options.isObserver
   * @type {String}
   */
  MediaImageChange.options = {
    element    : null,
    attrKey    : 'data-media-img',
    imagePrefix: '_',
    isObserver : true
  };



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>MediaImageChangeインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @return {MediaImageChange}
   */
  MediaImageChange.get = function($images, options){
    return new MediaImageChange($images, options).start();
  };


  /**
   * <h4>ブレイクポイントの監視を開始します</h4>
   *
   * @method start
   * @return {MediaImageChange}
   */
  p.start = function(){
		var self = this;

		this.on('change.MediaImageChange', function(event){
			if(self.props.isObserver){
				self.props.current = event.mediaStyle;
				self.change();
			}
		}).trigger('change.MediaImageChange');

    return this;
  };


  /**
   * <h4>ブレイクポイントの監視をストップします</h4>
   *
   * @method stop
   * @return {MediaImageChange}
   */
  p.stop = function(){
    this.off('change.MediaImageChange');
		return this;
  };


  /**
   * <h4>監視の状態を切り替えます</h4>
   *
   * @method setObserver
   * @param {Boolean} isState メディアクエリの変更を監視するか
   * @return {MediaImageChange}
   */
  p.setObserver = function(isState){
    this.props.isObserver = AMP.isBoolean(isState) ? isState : this.props.isObserver;
    return this;
  };


  /**
   * <h4>画像を変更します</h4>
   *
   * @method switch
   * @return {MediaImageChange}
   */
  p.change = function(){
		var self = this,
		$images = this.props.$images,
		data,
		ext;

		$images.each(function(i){
			data = $images.eq(i).attr(self.props.attrKey);
			ext = data.substring(data.lastIndexOf('.'), data.length);
			$images[i].src = data.replace(ext, self.props.imagePrefix + self.props.current + ext);
    });

    return this;
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP.$.MediaImageChange = MediaImageChange;


}(window, AMP, jQuery));


(function(root, AMP, $){

	// 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ホバー3Dアニメーション</h4>
   * <p><em>IE10以上対象</em><br>
   * <a href="../../demo/AMP.$.Float3d.html">DEMO</a></p>
   *
   * @example  要素構成: .float > .float_frame > .float_inner
   *
   * @class AMP.$.Float3d
   * @constructor
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   */
	function Float3d($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.float');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, Float3d.options, options);

    /**
     * <h4>float要素</h4>
     *
     * @propaty $target
     * @type {jQuery}
     */
    this.props.$target = $target;

    /**
     * <h4>html要素</h4>
     *
     * @propaty $html
     * @type {jQuery}
     */
		this.props.$html = $('html');

    /**
     * <h4>float要素</h4>
     *
     * @private
     * @propaty _isFloating
     * @type {Boolean}
     */
    this.props._isFloating = false;
	}

  // 基底クラスを継承
  AMP.inherits(Float3d, AMP.BASE_CLASS);

	// prototype
	var p = Float3d.prototype;



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
  Float3d.VERSION = '1.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Float3d';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>3D変形の奥行きの深さを指定する値</h4>
   *
   * @static
   * @property options.perspective
   * @type {Number}
   */
  /**
   * <h4>Z方向の距離で移動を指定する値</h4>
   *
   * @static
   * @property options.translateZ
   * @type {Number}
   */
  /**
   * <h4>回転表示を指定する値</h4>
   *
   * @static
   * @property options.rotate
   * @type {Number}
   */
  /**
   * <h4>floating時に回転する幅く</h4>
   *
   * @static
   * @property options.range
   * @type {Number}
   */
  /**
   * <h4>floating時の回転するスピードく</h4>
   *
   * @static
   * @property options.speed
   * @type {Number}
   */
  /**
   * <h4>hover時のdurationく</h4>
   *
   * @static
   * @property options.duration
   * @type {Number}
   */
  /**
   * <h4>hover時のeasing</h4>
   *
   * @static
   * @property options.easing
   * @type {String}
   */
	Float3d.options = {
    perspective: 400,
    translateZ : -150,
    rotate     : 7.5,
    range      : 5,
    speed      : 150,
    duration   : 400,
    easing     : 'easeOutExpo'
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Float3dインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   * @return {Float3d}
   */
  Float3d.get = function($target, options){
    return new Float3d($target, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Float3d}
   */
  p.on = function(){
    var self = this;

    // イベント重複回避
    self.off();

    self.props.$target.css({perspective: this.props.perspective})
    .children().css({perspective: this.props.perspective})
    .children().css({perspective: this.props.perspective});

    self.props.$target
    .on('mouseenter.Float3d', function(onEvent){
      self.onTween(this, onEvent);
      self.props._isFloating = true;
      self.floatTween($(this).children(), 0);

      // moveEvent登録
      $(this).on('mousemove.Float3d', function(moveEvent){
        self.onTween(this, moveEvent);
      });
    })
    .on('mouseleave.Float3d', function(outEvent){
      self.props._isFloating = false;
      self.outTween(this, outEvent);

      // moveEvent削除
      $(this).off('mousemove.Float3d');
    });

     // moveEvent削除
    this.props.$html.on('mouseleave.Float3d', function(){
      self.props.$target.parent().off('mousemove.Float3d');
      self.props._isFloating = false;
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Float3d}
   */
  p.off = function(){
    this.props.$target.off('.Float3d').css({perspective: 0})
    .children().css({perspective: this.props.perspective})
    .children().css({perspective: this.props.perspective});

    this.props.$html.off('.Float3d');

    return this;
  };


  /**
   * <h4>マウスオンTween</h4>
   *
   * @method onTween
   * @param  {DOM} target 対象の要素
   * @param  {Object} event イベントオブジェクト
   * @return {Void}
   */
  p.onTween = function(target, event){
    var $target = $(target).children(),
    offset = this.offsetRatio(target, event);

    $target.velocity('stop')
    .velocity({
      translateZ: this.props.translateZ,
      rotateX   : this.props.rotate * offset.y,
      rotateY   : this.props.rotate * offset.x,
      rotateZ   : this.props.rotate * offset.x
    }, {
      duration: this.props.duration,
      easing  : this.props.easing
    });
  };


  /**
   * <h4>選択中のTween</h4>
   * 再起処理します
   *
   * @method floatTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.floatTween = function($target, angle){
    var self = this;

    angle = typeof angle === 'number' ? angle : 0;
    angle += Math.PI / self.props.speed;

    $target.children()
    .velocity('stop')
    .velocity({
      rotateX: (self.props.range * Math.cos(angle + Math.PI)),
      rotateY: (self.props.range * Math.sin(angle + Math.PI)),
      rotateZ: (self.props.range * Math.sin(angle + Math.PI))
    }, {
      duration: 1000 / 60,
      easing  : 'linear',
      complete: function(){
        // 再起処理
        if(self.props._isFloating){
          self.floatTween($target, angle);
        }
      }
    });
  };


  /**
   * <h4>マウスアウトTween</h4>
   *
   * @method outTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.outTween = function(target){
    var self = this;

    $(target).children()
    .velocity('stop')
    .velocity({
      translateZ: 0,
      rotateX   : 0,
      rotateY   : 0,
      rotateZ   : 0
    }, {
      duration: self.props.duration,
      easing  : self.props.ease
    })
    .children()
    .velocity('stop')
    .velocity({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }, {
      duration: self.props.duration,
      easing  : self.props.easing
    });
  };


  /**
   * <h4>エリアセンター中心に座標位置の比率を返す</h4>
   * 比率は0を中心に-1から1までの小数点2桁の数値
   *
   * @method offsetRatio
   * @param  {DOM} target 対象の要素
   * @param  {Object} event  イベントオブジェクト
   * @return {Object}  x,y座標比を格納したオブジェクト
   */
  p.offsetRatio = function(target, event){
    var $target = $(target);

    var center = {
      x: $target.width() / 2,
      y: $target.height() / 2
    };

    var offset = {
      x: event.pageX - $target.offset().left,
      y: event.pageY - $target.offset().top
    };

    // return offset
    return {
      x: ((offset.x - center.x) / center.x).toFixed(2),
      y: ((center.y - offset.y) / center.y).toFixed(2)
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Float3d = Float3d;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   * <p><a href="../../demo/AMP.$.FlatHeight.html">DEMO</a></p>
   *
   * @class AMP.$.FlatHeight
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {jQuery} $flatHeight 対象のエリア要素
   * @param {Number} split 区切る数 省略可
   * @param {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($flatHeight, split, isResize){

    // $flatHeight指定がない場合、初期値を設定
    if(!$flatHeight || !($flatHeight instanceof jQuery)){
      isResize = split;
      split = $flatHeight;
      $flatHeight = $('.flat_height');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     *
     * @property props
     * @type {Object}
     */
    this.props = {};

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property props.$flatHeight
     * @type {jQuery}
     */
    this.props.$flatHeight = $flatHeight;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @default $flatHeight.length
     * @property props.split
     * @type {Number}
     */
    this.props.split = AMP.isNumber(split) ? split : $flatHeight.length;

    /**
     * <h4>リサイズ後、セットし直すか？</h4>
     *
     * @default true
     * @property props.isResize
     * @type {Boolean}
     */
    this.props.isResize = AMP.isBoolean(isResize) ? isResize : true;

    this._addEvent();
    this.setHeight();
  }

  // 基底クラスを継承
  AMP.inherits(FlatHeight, AMP.BASE_CLASS);

  // prototype
  var p = FlatHeight.prototype;



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
  FlatHeight.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'FlatHeight';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>FlatHeightインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $flatHeight 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   * @return {FlatHeight}
   */
  FlatHeight.get = function($flatHeight, split, isResize){
    return new FlatHeight($flatHeight, split, isResize);
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @private
   * @method addEvent
   * @return {FlatHeight}
   */
  p._addEvent = function(){
    var self = this;

    // fontresize
    if(AMP.isDevice('pc')){
      AMP.fontResize.on('change.FlatHeight', function(){
        self.setHeight();
      });
    }

    // window resize
    $(root).on('resizestop.FlatHeight', function(){
      if(self.props.isResize){
        self.setHeight();
      }
    });

    return this;
  };


  /**
   * <h4>区切りをセットして高さを揃える</h4>
   *
   * @method setSplit
   * @return {FlatHeight}
   */
  p.setSplit = function(num){
    if(!AMP.isNumber(num)){
      throw new TypeError(num + ' is not a Number');
    }
    this.props.split = num;
    this.setHeight();
    return this;
  };


  /**
   * <h4>高さを揃える</h4>
   *
   * @method setHeight
   * @return {FlatHeight}
   */
  p.setHeight = function(){
    var self = this,
    total = self.props.$flatHeight.length,
    rest = total % self.props.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.props.$flatHeight.height('auto');

    if(1 < self.props.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.props.$flatHeight.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.props.split === 0){
          var _start = rowCount * self.props.split,
          _end = (rowCount += 1) * self.props.split;

          self.props.$flatHeight.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.props.$flatHeight.slice(rowCount * self.props.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.FlatHeight = FlatHeight;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>AMP.$.BoxHover</h4>
   * <p>リンクエリアを、BOXエリアまで拡大させます<br>
   * <a href="../../demo/AMP.$.BoxHover.html">DEMO</a></p>
   *
   * @class AMP.$.BoxHover
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値 (BoxHover.options参照)
   */
  function BoxHover($boxHover, options){

    // $boxHover指定がない場合、初期値を設定
    if(!$boxHover || !($boxHover instanceof jQuery)){
      options = $boxHover;
      $boxHover = $('.box_hover');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, BoxHover.options, options);

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.box_hover')
     * @property props.$boxHover
     * @type {jQuery}
     */
    this.props.$boxHover = $boxHover;
  }

  // 基底クラスを継承
  AMP.inherits(BoxHover, AMP.BASE_CLASS);

  // prototype
  var p = BoxHover.prototype;



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
  BoxHover.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'BoxHover';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>ホバー時に、box要素に付与するクラス名</h4>
   *
   * @static
   * @property options.hoverClass
   * @default hover
   * @type {String}
   */
  /**
   * <h4>Box内に複数リンクがある場合、優先対象に指定するリンククラス名</h4>
   *
   * @static
   * @property options.linkClass
   * @default link
   * @type {String}
   */
  BoxHover.options = {
    hoverClass: 'hover',
    linkClass : 'link'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>BoxHoverインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $boxHover 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover}
   */
  BoxHover.get = function($boxHover, options){
    return new BoxHover($boxHover, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {BoxHover}
   */
  p.on = function(){
    var self = this;

    this.off();

    this.props.$boxHover.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.props.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.props.hoverClass);
    })
    .on('click.BoxHover', function(){
      self.transition($(this));
    })
    .find('a')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
    });

    // フォーム要素はイベント伝播をキャンセル
    this.props.$boxHover.find('label input select textarea')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {BoxHover}
   */
  p.off = function(){
    this.props.$boxHover
    .css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover')
    .find('a').off('click.BoxHover');

    this.props.$boxHover.find('label input select textarea').off('click.BoxHover');

    return this;
  };


  /**
   * <h4>リンクページへ遷移</h4>
   *
   * @method transition
   * @return {Void}
   */
  p.transition = function($box){
    var $link = $box.find('.' + this.props.linkClass);
    $link = $link[0] ? $link : $box.find('a').eq(0);

    // リンク展開
    if($link.attr('target') === '_blank'){
      window.open($link.attr('href'), '_blank');
    } else {
      location.href = $link.attr('href');
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.BoxHover = BoxHover;


}(window, AMP, jQuery));


(function(root, AMP, $){

	// 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ホバースライドアニメーション</h4>
   * <a href="../../demo/AMP.$.Slip.html">DEMO</a></p>
   *
   * @class AMP.$.Slip
   * @constructor
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   */
	function Slip($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.slip');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, Slip.options, options);

    /**
     * <h4>float要素</h4>
     *
     * @propaty $target
     * @type {jQuery}
     */
    this.props.$target = $target;
	}

  // 基底クラスを継承
  AMP.inherits(Slip, AMP.BASE_CLASS);

	// prototype
	var p = Slip.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Slip.VERSION = '1.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Slip';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>マウスイン時のアニメーション方向</h4>
   * <p>以下7タイプ (allはデフォルト4方向)<br>
   * all, side, updown, up, down, left, right</p>
   *
   * @static
   * @property options.inDirection
   * @default all
   * @type {String}
   */
  /**
   * <h4>マウスアウト時のアニメーション方向</h4>
   * <p>以下7タイプ (allはデフォルト4方向)<br>
   * all, side, updown, up, down, left, right</p>
   *
   * @static
   * @property options.outDirection
   * @default all
   * @type {String}
   */
  /**
   * <h4>アニメーション要素クラス名</h4>
   *
   * @static
   * @property options.tweenClass
   * @default slip_tween
   * @type {String}
   */
  /**
   * <h4>アクティブ時に付与するクラス名</h4>
   *
   * @static
   * @property options.activeClass
   * @default .activeClass
   * @type {String}
   */
  /**
   * <h4>アニメーションしない要素に付与するクラス名</h4>
   *
   * @static
   * @property options.noTweenClass
   * @default .no_slip
   * @type {String}
   */
  /**
   * <h4>Tween option</h4>
   * <p><a href="http://julian.com/research/velocity/" target="_blank">velocity.js オプション参照</a></p>
   *
   * @static
   * @property options.tween
   * @default .no_slip
   * @type {Object}
   */
	Slip.options = {
    inDirection : 'all', // all, side, updown, up, down, left, right
    outDirection: 'all', // all, side, updown, up, down, left, right
    tweenClass  : 'slip_tween',
    activeClass : 'active',
    noTweenClass: 'no_slip',
    tween       : {
      duration  : 400,
      easing    : 'easeOutExpo'
    }
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Slipインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   * @return {Slip}
   */
  Slip.get = function($target, options){
    return new Slip($target, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Slip}
   */
  p.on = function(){
    var self = this;

    // 二重登録回避
    this.off();

    self.props.$target
    .on('slipin.Slip', function(inEvent){
      self._tween(self.props.$target.index(this), inEvent);
    })
    .on('slipout.Slip', function(outEvent){
      self._tween(self.props.$target.index(this), outEvent);
    })
    .each(function(i){
      if($(this).hasClass(self.props.noTweenClass)){
        self.passive(i);

      } else if($(this).hasClass(self.props.activeClass)){
        self.active(i);
      }
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Slip}
   */
  p.off = function(){
    this.props.$target.off('slipin.Slip slipin.Slip');
    return this;
  };


  /**
   * <h4>アクティブ</h4>
   *
   * @method active
   * @param  {Number} num 要素のインデックス
   * @return {Slip}
   */
  p.active = function(num){
    var $target = AMP.isNumber(num) ? this.props.$target.eq(num) : this.props.$target;

    $target
    .addClass(this.props.activeClass)
    .find('.' + this.props.tweenClass)
    .velocity('stop').css({top: 0, left: 0});

    return this;
  };


  /**
   * <h4>待機状態のスタイル</h4>
   *
   * @method passive
   * @param  {Number} num 要素のインデックス
   * @return {Slip}
   */
  p.passive = function(num){
    var $target = AMP.isNumber(num) ? this.props.$target.eq(num) : this.props.$target;

    $target
    .removeClass(this.props.activeClass)
    .find('.' + this.props.tweenClass)
    .velocity('stop').css({top: '-100%'});

    return this;
  };


  /**
   * <h4>アニメーション</h4>
   *
   * @private
   * @method _tween
   * @param  {Number} num   要素のインデックス
   * @param  {Object} event イベントオブジェクト
   * @return {Void}
   */
  p._tween = function(num, event){
    var style = this._createTweenStyle(event),
    $target = this.props.$target.eq(num);

    if(!$target.hasClass(this.props.activeClass) && !$target.hasClass(this.props.noTweenClass)){
      $target.find('.' + this.props.tweenClass)
      .velocity('stop')
      .velocity(style.start, 0)
      .velocity(style.end, this.props.tween);
    }
  };


  /**
   * <h4>Tweenスタイルの生成</h4>
   *
   * @private
   * @method _createTweenStyle
   * @param  {Object} event イベントオブジェクト
   * @return {Object}
   */
  p._createTweenStyle = function(event){
    var isSlipin = event.type === 'slipin',
    direction = isSlipin ? this.props.inDirection : this.props.outDirection,
    style01 = {left: 0, top : 0},
    style02 = $.extend({}, style01),
    style = isSlipin ? style01 : style02;

    if(direction === 'side'){
      style.left = event.x < 0 ? '-100%' : '100%';

    } else if(direction === 'updown'){
      style.top = event.y < 0 ? '-100%' : '100%';

    } else if(direction === 'up'){
      style.top = '-100%';

    } else if(direction === 'down'){
      style.top = '100%';

    } else if(direction === 'left'){
      style.left = '-100%';

    } else if(direction === 'right'){
      style.left = '100%';

    } else {
      // direction All
      if(event.direction === 'top'){
        style.top = '-100%';
      } else if(event.direction === 'bottom'){
        style.top = '100%';
      } else if(event.direction === 'left'){
        style.left = '-100%';
      } else {
        style.left = '100%';
      }
    }

    return {
      start: style01,
      end  : style02
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Slip = Slip;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   *
   * @class AMP.Ease
   * @extends AMP.Ease
   * @constructor
   */
  function Ease(){}

  // AMP.Easeクラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;


  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>jQuery Easing用ネームスペース</h4>
   * <p><a href="http://easings.net/ja" target="_blank">Easing一覧</a></p>
   *
   * @property $
   * @type {Object}
   */
  Ease.$ = {};


  /**
   * <h4>バージョン情報</h4>
   *
   * @property $.VERSION
   * @type {String}
   */
  Ease.$.VERSION = '3.0.0';


  // extend easing
  AMP.each(Ease.COMPLETION, function(item, key){
    $.easing[item] =
    $.easing[key] =
    $.Velocity.Easings[item] =
     $.Velocity.Easings[key] = Ease[item];
  });



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;



}(window, AMP, jQuery));


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
  Slider.VERSION = '1.2.0';


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

    this.props.$item.eq(next).css({display: 'block', zIndex: this.props.length, opacity: 0});

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
