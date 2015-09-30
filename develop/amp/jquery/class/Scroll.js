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
  Scroll.VERSION = '3.3.1';


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
      var adjust = AMP.isFunction(props.adjust) ? props.adjust(num) || 0 : props.adjust,
      moveTo = $target.offset().top - adjust;

      if($(root).scrollTop() !== moveTo){
        var tween = $.extend({offset: moveTo}, props.tween);
        props.$html.velocity('stop').velocity('scroll', tween);
      }
      return false;
    }
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @static
   * @method tween
   * @param {jQuery} $target 対象要素
   * @param {Number|Function} adjust 停止位置調整値
   * @param {Object} option tweenオプション
   * @return {jQuery}
   */
  Scroll.tween = function($target, adjust, option){
    if(AMP.isObject(adjust)){
      option = adjust;
      adjust = 0;
    }

    var adjust = AMP.isFunction(adjust) ? adjust() || 0 : adjust,
    moveTo = $target.offset().top - adjust,
    tween = $.extend({offset: moveTo}, Scroll.options.tween, option);

    return $('html, body').velocity('stop').velocity('scroll', tween);
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Scroll = Scroll;


}(window, AMP, jQuery));
