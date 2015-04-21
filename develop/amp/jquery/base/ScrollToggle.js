var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してToggle処理をします</h4>
   *
   * @class ScrollToggle
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
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property props
     * @type {Object}
     */
    this.props　= $.extend(true, {}, ScrollToggle.scrollToggleOptions, options);

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
     * <h4>Display:Block表示の状態</h4>
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
  ScrollToggle.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ScrollToggle';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてpropsオブジェクトに格納します
   *
   * @static
   * @property scrollToggleOptions
   * @type {Object}
   */
  /**
   *　<h4>表示されるY値</h4>
   *
   * @static
   * @property showY
   * @default 300
   * @type {Number}
   */
  /**
   *　<h4>表示のスタイル</h4>
   *
   * @static
   * @property showY
   * @default { opacity : 1}
   * @type {Object}
   */
  /**
   *　<h4>非表示のスタイル</h4>
   *
   * @static
   * @property showY
   * @default { opacity : 0}
   * @type {Object}
   */
  /**
   *　<h4>duration</h4>
   *
   * @static
   * @property duration
   * @default 500
   * @type {Number}
   */
  /**
   *　<h4>easing</h4>
   *
   * @static
   * @property ease
   * @default easeInSine
   * @type {String}
   */
  /**
   *　<h4>表示後のコールバック</h4>
   *
   * @static
   * @property showCall
   * @default $.noop
   * @type {String}
   */
  /**
   *　<h4>非表示後のコールバック</h4>
   *
   * @static
   * @property hideCall
   * @default $.noop
   * @type {String}
   */
  ScrollToggle.scrollToggleOptions = {
    showY   : 300,
    show    : { opacity : 1},
    hide    : { opacity : 0},
    duration: 500,
    ease    : 'easeInSine',
    showCall: $.noop,
    hideCall: $.noop
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ScrollToggleインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $scrollToggle 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  ScrollToggle.get = function($scrollToggle, options){
    var instance = new ScrollToggle($scrollToggle, options);
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
    param = self.props,
    offsetY;

    self.props.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.props.$window.scrollTop();

      // 表示・非表示
      if(!self.props.isDislpay && param.showY < offsetY){
        self.show();
      } else if(self.props.isDislpay && param.showY > offsetY){
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
    var self = this;

    self.props.isDislpay = true;

    self.props.$scrollToggle.css({display: 'block'}).css(self.props.hide)
    .velocity('stop')
    .velocity(self.props.show, self.props.duration, self.props.ease, self.props.showCall);

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

    self.props.isDislpay = false;

    self.props.$scrollToggle
    .velocity('stop')
    .velocity(self.props.hide, self.props.duration, self.props.ease, function(){
      self.props.$scrollToggle.css({display: 'none'});
      self.props.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.ScrollToggle = ScrollToggle;
  AMP.scrollToggle = ScrollToggle.get;


}(window, jQuery));
