(function(root, $){

  // 'use strict';

  var SmoothScroll, smoothScroll, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>スムーススクロール</h4>
   * WindowsPCのみ有効
   *
   * @class AMP.SmoothScroll
   * @constructor
   * @param  {Object} options オプション値
   * @return {SmoothScroll}
   */
  SmoothScroll = function(options){
    this.$target = $('html, body');
    this.param = $.extend(true, {}, SmoothScroll.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>マウスホイールのスムーススクロール</h4>
   *
   * @static
   * @method smoothScroll
   * @param  {Object} options? オプション値 省略可
   * @return {SmoothScroll} SmoothScrollインスタンスを返す
   */
  smoothScroll = function(options){
    var smoothScroll = new SmoothScroll(options);
    smoothScroll.on();
    return smoothScroll;
  };



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
  SmoothScroll.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = SmoothScroll.prototype;


  /**
   * <h4>スムーススクロールエリア</h4>
   * コンストラクタが呼び出し時に、$('html, body')が渡されます
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
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
    amount  : 200,
    dulation: 400,
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
   * <h4>クラスを拡張します</h4>
   * AMP._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {SmoothScroll}
   */
  SmoothScroll.extend = AMP._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method on
   * @return {SmoothScroll}
   */
  p.on = function(){
    var self = this;

    if(AMP.isWindows()){
      self.$target.off('mousewheel.SmoothScroll')
      .on('mousewheel.SmoothScroll', function(event, move){
        self.tween(event, move);
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
    this.$target.off('mousewheel.SmoothScroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(event, move){
    var self = this,
    param = self.param,
    y = AMP.isWebkit() ? self.$target.eq(1).scrollTop() : self.$target.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.$target.stop(true, false).animate({scrollTop: scrollY}, param.dulation, param.ease);
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object SmoothScroll]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.AMP = root.AMP || {};
  root.AMP.SmoothScroll = SmoothScroll;
  root.AMP.smoothScroll = smoothScroll;


}(window, jQuery));
