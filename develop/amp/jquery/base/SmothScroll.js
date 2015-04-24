var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スムーススクロール</h4>
   * WindowsPCのみ有効
   *
   * @class AMP.$.SmoothScroll
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function SmoothScroll(options){

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = $.extend(true,
      {},
      SmoothScroll.smoothScrollOptions,
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
  SmoothScroll.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'SmoothScroll';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します
   *
   * @static
   * @property smoothScrollOptions
   * @type {Object}
   */
    /**
   * <h4>スムーススクロールエリア</h4>
   *
   * @property smoothScrollOptions.$page
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>スクロール量</h4>
   *
   * @property smoothScrollOptions.amount
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>duration</h4>
   *
   * @property smoothScrollOptions.duration
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @property smoothScrollOptions.ease
   * @default easeOutCubic
   * @type {String}
   */
  SmoothScroll.smoothScrollOptions = {
    $page   : null,
    amount  : 500,
    duration: 500,
    ease    : 'easeOutCubic'
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
    var instance = new SmoothScroll(options);
    instance.on();
    return instance;
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
      self.params.$page.off('mousewheel.SmoothScroll')
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
    this.params.$page.off('mousewheel.SmoothScroll');
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
    param = self.params,
    y = AMP.isWebkit() ? self.params.$page.eq(1).scrollTop() : self.params.$page.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.params.$page.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: param.duration, easing: param.ease});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.SmoothScroll = SmoothScroll;


}(window, jQuery));
