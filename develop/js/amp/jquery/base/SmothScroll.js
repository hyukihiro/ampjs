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
   * @class SmoothScroll
   * @constructor
   */
  function SmoothScroll(options){
    /**
     * <h4>スムーススクロールエリア</h4>
     * コンストラクタが呼び出し時に、$('html, body')が渡されます
     *
     * @property param.$target
     * @type {jQuery}
     */
    var _param = {
      $target: $('html, body')
    };

    this.param = $.extend(true, SmoothScroll.defaults, _param, options);
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
   * <h4>オプション初期値</h4>
   *
   * @default
   * defaults: { <ul><li>
   *   $target : $('html, body'), // {jQuery} ターゲット要素 </li><li>
   *   amount  : 0, // {Number} スクロール量 </li><li>
   *   duration: 600, // {Number} スクロールスピード </li><li>
   *   easing  : 'easeOutExpo', // {String} イージング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  SmoothScroll.defaults = {
    $target : null,
    amount  : 500,
    duration: 500,
    ease    : 'easeOutCubic'
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>SmoothScrollインスタンスの生成</h4>
   * shorthand
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
      self.param.$target.off('mousewheel.SmoothScroll')
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
    this.param.$target.off('mousewheel.SmoothScroll');
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
    param = self.param,
    y = AMP.isWebkit() ? self.param.$target.eq(1).scrollTop() : self.param.$target.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.param.$target.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: param.duration, easing: param.ease});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.SmoothScroll = SmoothScroll;
  AMP.smoothScroll = SmoothScroll.get;


}(window, jQuery));
