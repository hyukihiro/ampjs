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
   * <h4>ロールオーバー</h4>
   * !!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.rollover</em>にインスタンスをエクスポートしていますので、そちらを使用してください
   *
   * @class AMP.$.Rollover
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function Rollover(){}

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
   * <h4>オプションのデフォルト値</h4>
   *
   * @static
   * @property rolloverOptions
   * @type {Object}
   */
  /**
   * <h4>グループクラス名</h4>
   *
   * @static
   * @property rolloverOptions.groupClass
   * @default group_rover
   * @type {String}
   */
  /**
   * <h4>アクティブクラス名</h4>
   *
   * @static
   * @property rolloverOptions.activeClass
   * @default active
   * @type {String}
   */
  /**
   * <h4>ノーロールオーバークラス名</h4>
   *
   * @static
   * @property rolloverOptions.noOverClass
   * @default no_rover
   * @type {String}
   */
  /**
   * <h4>ロールオーバー時に付与するファイル名</h4>
   *
   * @static
   * @property rolloverOptions.postfix
   * @default _on
   * @type {String}
   */
  Rollover.rolloverOptions = {
    groupClass : 'group_rover',
    activeClass: 'active',
    noOverClass: 'no_rover',
    postfix    : '_on'
  };


  /**
   * <h4>ロールオーバー要素の初期値</h4>
   *
   * @static
   * @property imageClass
   * @type {String}
   */
  Rollover.imageClass = 'img.rover, input.rover, .all_rover img';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ロールオーバー機能ON</h4>
   *
   * @method on
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.on = function($images, options){
    var self = this;

    // $image指定がない場合、初期値を設定
    if(!$images || !($images instanceof jQuery)){
      options = $images;
      $images = $(Rollover.imageClass);
    }

    var param = $.extend(true, {}, Rollover.rolloverOptions, options);

    $images.each(function(i){
      var data = self._createRolloverData($images.eq(i), param);

      // on画像の場合
      if(!data.isOffImg){
        data.image.src = data.offSrc;
      }

      // rollover
      data.$trigger
      .on('mouseenter.Rollover', function(){
        if(!data.$image.hasClass(param.noOverClass)){
          data.image.src = data.onSrc;
        }
      })
      .on('mouseleave.Rollover', function(){
        if(!data.$image.hasClass(param.noOverClass)){
          data.image.src = data.offSrc;
        }
      });
    });

    return this;
  };


  /**
   * <h4>ロールオーバー機能OFF</h4>
   *
   * @method off
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.off = function($images, options){
    // $image指定がない場合、初期値を設定
    if(!$images || !($images instanceof jQuery)){
      options = $images;
      $images = $(Rollover.imageClass);
    }

    var param = $.extend(true, {}, Rollover.rolloverOptions, options);

    $images.each(function(i){
      var $group = $images.eq(i).closest('.' + param.groupClass),
      $trigger = $group[0] ? $group : $images.eq(i);
      $trigger.off('mouseenter.Rollover mouseleave.Rollover');
    });

    return this;
  };


  /**
   * <h4>画像のアクティブ化</h4>
   *
   * @method active
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.active = function($images, options){
    var self = this,
    param = $.extend(true, {}, Rollover.rolloverOptions, options);

    $images.addClass(param.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), param);

      // イベント削除
      data.$trigger
      .addClass(param.activeClass)
      .off('mouseenter.Rollover mouseleave.Rollover');

      // off画像の場合
      if(data.isOffImg){
        data.image.src = data.onSrc;
      }
    });

    return this;
  };


  /**
   * <h4>画像を待機状態にする</h4>
   *
   * @method passive
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p.passive = function($images, options){
    var self = this,
    param = $.extend(true, {}, Rollover.rolloverOptions, options);

    $images.removeClass(param.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), param);

      // イベント削除
      data.$trigger
      .removeClass(param.activeClass)
      .off('mouseenter.Rollover mouseleave.Rollover');

      // on画像の場合
      if(!data.isOffImg){
        data.image.src = data.offSrc;
      }
    });

    return this;
  };


  /**
   * <h4>ロールオーバーデータの生成</h4>
   *
   * @method _createRolloverData
   * @private
   * @param  {jQuery} $images 対象の画像要素
   * @param  {Object} param オプション値
   * @return {Rollover}
   */
  p._createRolloverData = function($image, param){
    var
    image = $image[0],
    src = image.src,
    ext = src.substring(src.lastIndexOf('.'), src.length),
    $group = $image.closest('.' + param.groupClass).addClass(param.activeClass),
    onSrc,
    offSrc;

    // 現在on画像の場合
    if(src.lastIndexOf(param.postfix + ext) > -1){
      onSrc = src;
      offSrc = src.replace(param.postfix + ext, ext);
      AMP.preload(offSrc);

    // 現在off画像の場合
    } else {
      offSrc = src;
      onSrc = src.replace(ext, param.postfix + ext);
      AMP.preload(onSrc);
    }

    // RolloverData
    return {
      $image  : $image,
      image   : image,
      $trigger: $group[0] ? $group : $image,
      onSrc   : onSrc,
      offSrc  : offSrc,
      isOffImg: src === offSrc
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Rollover = Rollover;
  AMP.$.rollover = new Rollover();


}(window, AMP, jQuery));
