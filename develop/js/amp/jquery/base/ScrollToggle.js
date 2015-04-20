var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してのToggle処理</h4>
   *
   * @class ScrollToggle
   * @constructor
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値
   */
  function ScrollToggle($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.scroll_toggle');
    }

    this.param   = $.extend(true, {}, ScrollToggle.defaults, options);

    /**
     * <h4>表示・非表示する要素</h4>
     *
     * @property $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>window要素</h4>
     *
     * @property $window
     * @type {jQuery}
     */
    this.param.$window = $(root);

    /**
     * <h4>Display:Block表示されているか?</h4>
     *
     * @property isDisplay
     * @type {Boolean}
     */
    this.param.isDisplay = $target.css('display') === 'block';
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
  ScrollToggle.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ScrollToggle';


  /**
   * <h4>オプション初期値</h4>
   *
   * @default
   * defaults: { <ul><li>
   *   showY    : 300, // {Number} 表示されるoffsetY値 </li><li>
   *   show     : { opacity : 1}, // {Object} 表示アニメーション時のcssプロパティ </li><li>
   *   hide     : { opacity : 0}, // {Object} 非表示アニメーション時のcssプロパティ </li><li>
   *   duration : 400, // デュレーション </li><li>
   *   easing   : 'easeOutCubic', // イージング </li><li>
   *   showCall : $.noop // 表示されたときに呼び出す関数 </li><li>
   *   hideCall : $.noop // 非表示されたときに呼び出す関数 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  ScrollToggle.defaults = {
    showY   : 300,
    show    : { opacity : 1},
    hide    : { opacity : 0},
    duration: 500,
    easing  : 'easeInSine',
    showCall: $.noop,
    hideCall: $.noop,
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
   * <h4>ScrollToggleインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  ScrollToggle.get = function($target, options){
    var instance = new ScrollToggle($target, options);
    instance.on();
    return instance;
  };


  /**
   * <h4>イベントオン</h4>
   *
   * @method on
   * @return {ScrollToggle}
   */
  p.on = function(){
    var self = this,
    param = self.param,
    offsetY;

    self.param.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.param.$window.scrollTop();

      // 表示・非表示
      if(!self.param.isDislpay && param.showY < offsetY){
        self.show();
      } else if(self.param.isDislpay && param.showY > offsetY){
        self.hide();
      }
    }).trigger('scroll.ScrollToggle');

    return this;
  };


  /**
   * <h4>イベントオフ</h4>
   *
   * @method off
   * @return {ScrollToggle}
   */
  p.off = function(){
    this.param.$window.off('scroll.ScrollToggle');
    return this;
  };


  /**
   * <h4>表示</h4>
   *
   * @method show
   * @return {ScrollToggle}
   */
  p.show = function(){
    var self = this;

    self.param.isDislpay = true;

    self.param.$target.css({display: 'block'}).css(self.param.hide)
    .velocity('stop')
    .velocity(self.param.show, self.param.duration, self.param.ease, self.param.showCall);

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

    self.param.isDislpay = false;

    self.param.$target
    .velocity('stop')
    .velocity(self.param.hide, self.param.duration, self.param.ease, function(){
      self.param.$target.css({display: 'none'});
      self.param.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.ScrollToggle = ScrollToggle;
  AMP.scrollToggle = ScrollToggle.get;


}(window, jQuery));
