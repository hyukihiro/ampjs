var AMP = AMP || {};

(function(root, $){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * FIXEM:開発版です
   * <h4>ロールオーバー</h4>
   *
   * @class Rollover
   * @constructor
   */
  function Rollover($images, options){
    // $image指定がない場合、初期値を設定
    if(!$images || !($images instanceof jQuery)){
      options = $images;
      $images = $('img.rover, input.rover, .all_rover img');
    }

    this.$images = $images;
    this.param = $.extend(true, Rollover.defaults, options);
  };

  // 基底クラスを継承
  AMP.inherits(Rollover, AMP.BASE_CLASS);

  // prototype
  var p = Rollover.prototype;



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
  Rollover.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Rollover';


  /**
   * <h4>ターゲット画像要素</h4>
   *
   * @default $('img.rover, input.rover, .all_rover img')
   * @property $images
   * @type {jQuery}
   */
  p.$images = null;


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @property defaults
   * @type {Object}
   */
  Rollover.defaults = {
    groupClass : 'group_over',
    activeClass: 'active',
    noOverClass: 'no_over',
    postfix    : '_on'
  };


  /**
   * <h4>Rollover.defaultsとオプション値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
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
  Rollover.get = function($images, options){
    var instance = new Rollover($images, options);
    instance._createRollover().on();
    return instance;
  };


  /**
   * <h4>ロールオーバーの生成</h4>
   *
   * @method createRollover
   * @return {Rollover}
   */
  p._createRollover = function(){
    var self = this,
    param = self.param,
    $image, image, src, ext, $group;

    self.$images.each(function(i){
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
          AMP.preload(image.rollover.offSrc);
        }

      } else {
      // 現在off画像の場合
        image.rollover.offSrc = src;
        image.rollover.onSrc = src.replace(ext, param.postfix + ext);
        AMP.preload(image.rollover.onSrc);

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
  p.on = function(){
    var self = this;

    self.$image.each(function(){
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



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Rollover = Rollover;
  AMP.rollover = Rollover.get;


}(window, jQuery));
