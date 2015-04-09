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
    this.$window = $(window);
    this.$target = $target;
    this.param   = $.extend(true, {}, ScrollToggle.defaults, options);
    this.isShow  = $target.css('display') === 'block';
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
   * <h4>window要素</h4>
   *
   * @property $window
   * @type {jQuery}
   */
  p.$window = null;


  /**
   * <h4>表示・非表示する要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>表示されているか?</h4>
   *
   * @property isShow
   * @type {Boolean}
   */
  p.isShow = null;


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
    showY    : 300,
    show     : { opacity : 1},
    hide     : { opacity : 0},
    duration : 500,
    easing   : 'easeInSine',
    showCall : $.noop,
    hideCall : $.noop
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
    var inst = new ScrollToggle($target, options);
    inst.on();
    return inst;
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

    self.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.$window.scrollTop();

      // 表示・非表示
      if(!self.isShow && param.showY < offsetY){
        self.show();
      } else if(self.isShow && param.showY > offsetY){
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
    self.$window.off('scroll.ScrollToggle');
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
    self.isShow = true;
    self.$target.css({display: 'block'}).css(self.param.hide)
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
    self.isShow = false;

    self.$target
    .velocity('stop')
    .velocity(self.param.hide, self.param.duration, self.param.ease, function(){
      self.$target.css({display: 'none'});
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