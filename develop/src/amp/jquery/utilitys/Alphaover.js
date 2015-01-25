(function(root, $){

  // 'use strict';

  var Alphaover, alphaover, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>アルファ―オーバー</h4>
   *
   * @class amp.Alphaover
   * @constructor
   * @param  {jQuery} $target ターゲット要素
   * @param  {Object} options アルファ―オーバーのオプション値
   * @return {Alphaover}
   */
  Alphaover = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('img.alpha, input.alpha, .all-alpha img');
    }

    this.$target = $target;
    this.param = $.extend(true, Alphaover.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ターゲットのロールオーバー</h4>
   * Alphaoverのショートハンド
   *
   * @static
   * @method alphaover
   * @param  {jQuery} $target ターゲット要素
   * @param  {Object} options アルファ―オーバーのオプション値
   * @return {Alphaover}
   */
  alphaover = function($target, options){
    var inst = new Alphaover($target, options);
    inst.setAlphaover().on();
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
  Alphaover.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Alphaover.prototype;


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @property defaults
   * @type {Object}
   */
  Alphaover.defaults = {
    groupClass : 'group-over',
    activeClass: 'active',
    noOverClass: 'no-over',
    opacity    : 0.7,
    dulation   : 0, // 200
    ease       : amp.ease.$._2_QUAD_IN_OUT
    // ease       : 'easeInOutQuad'
  };


  /**
   * <h4>Alphaover.defaultsとオプション値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;


  /**
   * <h4>ターゲットターゲット</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * amp._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Alphaover}
   */
  Alphaover.extend = amp._extend;


  /**
   * <h4>ロールオーバーの生成</h4>
   *
   * @method createAlphaover
   * @return {Alphaover}
   */
  p.setAlphaover = function(){
    var self = this,
    param = self.param,
    $target, $group;

    self.$target.each(function(i){
      $target = self.$target.eq(i);
      $group = $target.closest('.' + self.param.groupClass);

      // トリガー追加
      $target[0].$trigger = $group[0] ? $group : $target;

      if($target.hasClass(self.param.activeClass)){
        $target.css({opacity: self.param.opacity});
      } else {
        $target.css({opacity: 1});
      }
    });

    return this;
  };


  /**
   * <h4>イベントオン</h4>
   *
   * @method on
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.on = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      var $el = $(this),
      el = $el[0];

      el.$trigger.off('mouseenter.Alphaover mouseleave.Alphaover')
      .on({
        // mouseover
        'mouseenter.Alphaover': function(){
          if(!$el.hasClass(self.param.activeClass) && !$el.hasClass(self.param.noOverClass)){
            if(0 < self.param.dulation){
              $el.stop(true, false).animate({opacity: self.param.opacity}, self.param.dulation, self.param.ease);
            } else {
              $el.css({opacity: self.param.opacity});
            }
          }
        },
        // mouseout
        'mouseleave.Alphaover': function(){
          if(!$el.hasClass(self.param.activeClass) && !$el.hasClass(self.param.noOverClass)){
            if(0 < self.param.dulation){
              $el.stop(true, false).animate({opacity: 1}, self.param.dulation, self.param.ease);
            } else {
              $el.css({opacity: 1});
            }
          }
        }
      });
    });

    return this;
  };


  /**
   * <h4>イベントオフ</h4>
   *
   * @method off
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.off = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      $(this)[0].$trigger.off('mouseenter.Alphaover mouseleave.Alphaover');
    });

    return this;
  };


  /**
   * <h4>ロールオーバーアクティブ化</h4>
   *
   * @method active
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.active = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      $(this).addClass(self.param.activeClass).css({opacity: self.param.opacity});
    });

    return this;
  };


  /**
   * <h4>ロールオーバー待機化</h4>
   *
   * @method passive
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.passive = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      $(this).removeClass(self.param.activeClass).css({opacity: 1});
    });
  };


  /**
   * <h4>ロールオーバー無効化</h4>
   *
   * @method invalid
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.invalid = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      $(this).addClass(self.param.noOverClass);
    });
  };


  /**
   * <h4>ロールオーバー有効化</h4>
   *
   * @method inforce
   * @param  {Number} num 要素のインデックス
   * @return {Alphaover}
   */
  p.inforce = function(num){
    var self = this,
    $target = $.isNumeric(num) ? self.$target.eq(num) : self.$target;

    $target.each(function(){
      $(this).removeClass(self.param.noOverClass).removeClass(self.param.activeClass).css({opacity: 1});
    });
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Alphaover]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Alphaover = Alphaover;
  root.amp.alphaover = alphaover;


}(window, jQuery));
