(function(root, $){

  // 'use strict';

  var Scroll, scroll, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class AMP.Scroll
   * @constructor
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可 初期： $('a[href^=#]')
   * @param  {Object} options オプション値 省略可 初期： Scroll.defaults
   * @return {Scroll}
   */
  Scroll = function($trigger, options){
    // $trigger指定がない場合、初期値を設定
    if(!$trigger || !($trigger instanceof jQuery)){
      options = $trigger;
      $trigger = $('a[href^=#]');
    }
    this.$trigger = $trigger;
    this.param = $.extend(true, {}, Scroll.defaults, {$page: $('html, body')}, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   * Scrollのショートハンド
   *
   * @static
   * @method scroll
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll} Scrollインスタンスを返す
   */
  scroll = function($trigger, options){
    var inst = new Scroll($trigger, options);
    inst.on();
    return inst;
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
  Scroll.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Scroll.prototype;


  /**
   * <h4>トリガーとなるa要素</h4>
   *
   * @property $trigger
   * @type {Object}
   */
  p.$trigger = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   $page        : null, // {jQuery} ラッパー要素 初期値: $('html, body') </li><li>
   *   adjust       : 0, // {Number} スクロール停止位置の調整値 </li><li>
   *   noScrollClass: 'no-scroll', // {String} スクロールキャンセルするクラス </li><li>
   *   duration     : 600, // {Number} スクロールスピード </li><li>
   *   easing       : 'easeOutExpo', // {String} イージング </li><li>
   *   begin        : $.noop, // {Function} スクロール開始前のコールバック </li><li>
   *   complete     : $.noop, // {Function} スクロール完了時のコールバック </li><ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Scroll.defaults = {
    $page        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no-scroll',
    duration     : 600,
    easing       : 'easeOutExpo',
    begin        : $.noop,
    complete     : $.noop
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
   * @return {Scroll}
   */
   Scroll.extend = AMP._extend;


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

    self.$trigger.on('click.Scroll', function(){
      return self.tween(self.$trigger.index(this));
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
    this.$trigger.off('click.Scroll');
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
    param = self.param,
    $trigger = self.$trigger.eq(num),
    $target = $($trigger.attr('href')),
    moveTo;

    if($target[0] && !$trigger.hasClass(param.noScrollClass)){
      moveTo = $target.offset().top - param.adjust;
      if($(window).scrollTop() !== moveTo){
        // 縦列処理します
        $.stream(
          param.begin,
          function(){
            return param.$page.stop(true, false).animate({scrollTop: moveTo}, param.duration, param.easing);
          },
          param.complete
        );
      }
      return false;
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object Scroll]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.AMP = root.AMP || {};
  root.AMP.Scroll = Scroll;
  root.AMP.scroll = scroll;


}(window, jQuery));
