var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class Scroll
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

    this.props = $.extend(true, {}, Scroll.scrollOptions, {$html: $('html, body')}, options);


    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property param.$scrollTrigger
     * @type {Object}
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
  Scroll.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Scroll';


  /**
   * <h4>デフォルト値格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsを指定するとpropsオブジェクトにmixinします
   *
   * @static
   * @property scrollOptions
   * @type {Object}
   */
  /**
   * <h4>ページ要素</h4>
   *
   * @default $('html, body')
   * @static
   * @property scrollOptions.$html
   * @type {jQuery}
   */
  /**
   * <h4>停止位置調整値</h4>
   *
   * @default 0
   * @static
   * @property scrollOptions.adjust
   * @type {Number}
   */
  /**
   * <h4>スクロールしないトリガークラス名</h4>
   *
   * @default no_scroll
   * @static
   * @property scrollOptions.noScrollClass
   * @type {String}
   */
  /**
   * <h4>duration</h4>
   *
   * @default 800
   * @static
   * @property scrollOptions.duration
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @default easeOutQuint
   * @static
   * @property scrollOptions.ease
   * @type {String}
   */

  /**
   *　<h4>スクロール前のコールバック</h4>
   *
   * @default $.noop
   * @static
   * @property beginCall
   * @type {String}
   */
  /**
   *　<h4>スクロール後のコールバック</h4>
   *
   * @default $.noop
   * @static
   * @property compCall
   * @type {String}
   */
  Scroll.scrollOptions = {
    $html        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no-scroll',
    duration     : 800,
    ease         : 'easeOutQuint'
    beginCall    : $.noop,
    compCall     : $.noop
  };


  /**
   * <h4>プロパティ格納オブジェクト</h4>
   *
   * @property props
   * @type {Object}
   */
  p.props = {};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Scrollインスタンスの生成</h4>
   * shorthand
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
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(num){
    var self = this,
    param = self.props,
    $scrollTrigger = self.props.$scrollTrigger.eq(num),
    $target = $($scrollTrigger.attr('href'));

    if($target[0] && !$scrollTrigger.hasClass(param.noScrollClass)){
      var moveTo = $target.offset().top - param.adjust;

      if($(root).scrollTop() !== moveTo){
        $.stream(
          param.beginCall,
          function(){
            return param.$html.velocity('stop')
            .velocity('scroll', {offset: moveTo, duration: param.duration, easing: param.ease});
          },
          param.compCall
        );
      }

      return false;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Scroll = Scroll;
  AMP.scroll = Scroll.get;


}(window, jQuery));
