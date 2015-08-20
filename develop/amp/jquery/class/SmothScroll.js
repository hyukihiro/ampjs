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
