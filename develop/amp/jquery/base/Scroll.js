/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
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
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, Scroll.scrollOptions, {$html: $('html, body')}, options);

    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property param.$scrollTrigger
     * @type {Object}
     */
    this.param.$scrollTrigger = $scrollTrigger;
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
  Scroll.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Scroll';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
   *
   * @static
   * @property scrollOptions
   * @type {Object}
   */
  /**
   * <h4>ページ要素</h4>
   *
   * @static
   * @property scrollOptions.$html
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>停止位置調整値</h4>
   *
   * @static
   * @property scrollOptions.adjust
   * @default 0
   * @type {Number|Function}
   */
  /**
   * <h4>スクロールしないトリガークラス名</h4>
   *
   * @static
   * @property scrollOptions.noScrollClass
   * @default no_scroll
   * @type {String}
   */
  /**
   * <h4>スクロールアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property scrollOptions.tween
   * @default  {duration: 800, easing: 'easeOutQuint'}
   * @type {Object}
   */
  Scroll.scrollOptions = {
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
    var instance = new Scroll($scrollTrigger, options);
    instance.on();
    return instance;
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

    self.param.$scrollTrigger.on('click.Scroll', function(){
      return self.tween(self.param.$scrollTrigger.index(this));
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
    this.param.$scrollTrigger.off('click.Scroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   * FIXME: Stringも対応予定
   *
   * @method tween
   * @param {Number} num トリガー要素のインデックス
   * @return {Void}
   */
  p.tween = function(num){
    var self = this,
    param = self.param,
    $scrollTrigger = param.$scrollTrigger.eq(num),
    $target = $($scrollTrigger.attr('href'));

    if($target[0] && !$scrollTrigger.hasClass(param.noScrollClass)){
      var adjust = AMP.isFunction(param.adjust) ? param.adjust() || 0 : param.adjust,
      moveTo = $target.offset().top - adjust;

      if($(root).scrollTop() !== moveTo){
        var tween = $.extend({offset: moveTo}, param.tween);
        param.$html.velocity('stop').velocity('scroll', tween);
      }
      return false;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Scroll = Scroll;


}(window, jQuery));
