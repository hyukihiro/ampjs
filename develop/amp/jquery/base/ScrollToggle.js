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
