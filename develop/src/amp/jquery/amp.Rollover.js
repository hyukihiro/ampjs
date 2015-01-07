(function(root, $){

  // 'use strict';

  var Rollover, rollover, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>画像のロールオーバー</h4>
   *
   * @class Rollover
   * @constructor
   * @param  {jQuery} $image 画像要素
   * @param  {Object} options ロールオーバーのオプション値
   * @return {Rollover}
   */
  Rollover = function($image, options){
    // $image指定がない場合、初期値を設定
    if(!$image || !($image instanceof jQuery)){
      options = $image;
      $image = $('img.rover, input.rover, .all-rover img');
    }

    this.$image = $image;
    this.param = $.extend(true, Rollover.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>画像のロールオーバー</h4>
   * Rolloverのショートハンド
   *
   * @static
   * @method rollover
   * @param  {jQuery} $image 画像要素
   * @param  {Object} options ロールオーバーのオプション値
   * @return {Rollover}
   */
  rollover = function($image, options){
    var inst = new Rollover($image, options);
    inst.createRollover().on();
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
  Rollover.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Rollover.prototype;


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @property defaults
   * @type {Object}
   */
  Rollover.defaults = {
    groupClass : 'group-over',
    activeClass: 'active',
    noOverClass: 'no-over',
    postfix    : '_on'
  };


  /**
   * <h4>Rollover.defaultsとオプション値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;


  /**
   * <h4>ターゲット画像</h4>
   *
   * @property $image
   * @type {jQuery}
   */
  p.$image = null;



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
   * @return {Rollover}
   */
  Rollover.extend = amp._extend;


  /**
   * <h4>ロールオーバーの生成</h4>
   *
   * @method createRollover
   * @return {Rollover}
   */
  p.createRollover = function(){
    var self = this,
    param = self.param,
    $image, image, src, ext, $group;

    self.$image.each(function(i){
      $image = self.$image.eq(i);
      image = $image[0];
      image.rollover = {};

      // 画像データ設定
      src = image.src;
      ext = src.substring(src.lastIndexOf('.'), src.length);
      $group = $image.closest('.' + param.groupClass);

      // $trigger
      image.rollover.$trigger = $group[0] ? $group : $image;

      // 現在on画像の場合
      if(src.lastIndexOf(param.postfix + ext) > -1){
        image.rollover.onSrc = src;
        image.rollover.offSrc = src.replace(param.postfix + ext, ext);

        // アクティブでないときoff画像に変更
        if(!$image.hasClass(param.activeClass)){
          image.src = image.rollover.offSrc;
        } else {
          amp.preload(image.rollover.offSrc);
        }

      } else {
      // 現在off画像の場合
        image.rollover.offSrc = src;
        image.rollover.onSrc = src.replace(ext, param.postfix + ext);
        amp.preload(image.rollover.onSrc);

        // アクティブの場合on画像に変更
        if($image.hasClass(param.activeClass)){
          image.src = image.rollover.onSrc;
        }
      }
    });

    return this;
  };


  /**
   * <h4>イベントオン</h4>
   *
   * @method on
   * @param  {Number} num 要素のインデックス
   * @return {Rollover}
   */
  p.on = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      var $img = $(this),
      img = $img[0];

      img.rollover.$trigger.off('mouseenter.Rollover mouseleave.Rollover')
      .on({
        // mouseover
        'mouseenter.Rollover': function(){
          if(!$img.hasClass(self.param.activeClass) && !$img.hasClass(self.param.noOverClass)){
            img.src = img.rollover.onSrc;
          }
        },
        // mouseout
        'mouseleave.Rollover': function(){
          if(!$img.hasClass(self.param.activeClass) && !$img.hasClass(self.param.noOverClass)){
            img.src = img.rollover.offSrc;
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
   * @return {Rollover}
   */
  p.off = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      $(this)[0].rollover.$trigger.off('mouseenter.Rollover mouseleave.Rollover');
    });

    return this;
  };


  /**
   * <h4>ロールオーバーアクティブ化</h4>
   *
   * @method active
   * @param  {Number} num 要素のインデックス
   * @return {Rollover}
   */
  p.active = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      var img = $(this).addClass(self.param.activeClass)[0];
      img.src = img.rollover.onSrc;
    });

    return this;
  };


  /**
   * <h4>ロールオーバー待機化</h4>
   *
   * @method passive
   * @param  {Number} num 要素のインデックス
   * @return {Rollover}
   */
  p.passive = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      var img = $(this).removeClass(self.param.activeClass)[0];
      img.src = img.rollover.offSrc;
    });
  };


  /**
   * <h4>ロールオーバー無効化</h4>
   *
   * @method invalid
   * @param  {Number} num 要素のインデックス
   * @return {Rollover}
   */
  p.invalid = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      $(this).addClass(self.param.noOverClass);
    });
  };


  /**
   * <h4>ロールオーバー有効化</h4>
   *
   * @method inforce
   * @param  {Number} num 要素のインデックス
   * @return {Rollover}
   */
  p.inforce = function(num){
    var self = this,
    $image = $.isNumeric(num) ? self.$image.eq(num) : self.$image;

    $image.each(function(){
      var img = $(this).removeClass(self.param.noOverClass).removeClass(self.param.activeClass)[0];
      img.src = img.rollover.offSrc;
    });
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Rollover]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Rollover = Rollover;
  root.amp.rollover = rollover;


}(window, jQuery));
