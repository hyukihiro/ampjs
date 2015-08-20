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
   * <p>!!!: シングルトン<br>
   * コンストラクタを呼び出しで、使用しません<br>
   * <em>AMP.rollover</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.$.Rollover.html">DEMO</a></p>
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
  Rollover.VERSION = '2.1.0';


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
   * @property options
   * @type {Object}
   */
  /**
   * <h4>グループクラス名</h4>
   *
   * @static
   * @property options.groupClass
   * @default group_rover
   * @type {String}
   */
  /**
   * <h4>アクティブクラス名</h4>
   *
   * @static
   * @property options.activeClass
   * @default active
   * @type {String}
   */
  /**
   * <h4>ノーロールオーバークラス名</h4>
   *
   * @static
   * @property options.noOverClass
   * @default no_rover
   * @type {String}
   */
  /**
   * <h4>ロールオーバー時に付与するファイル名</h4>
   *
   * @static
   * @property options.postfix
   * @default _on
   * @type {String}
   */
  Rollover.options = {
    groupClass : 'group_rover',
    activeClass: 'active',
    noOverClass: 'no_rover',
    postfix    : '_on'
  };


  /**
   * <h4>ロールオーバークラス名初期値</h4>
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
   * <h4>ロールオーバーイベント追加</h4>
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

    var props = $.extend(true, {}, Rollover.options, options);

    $images.each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // on画像の場合
      if(!data.isOffImg){
        data.image.src = data.offSrc;
      }

      // rollover
      data.$trigger
      .on('mouseenter.Rollover', function(){
        if(!data.$image.hasClass(props.noOverClass)){
          data.image.src = data.onSrc;
        }
      })
      .on('mouseleave.Rollover', function(){
        if(!data.$image.hasClass(props.noOverClass)){
          data.image.src = data.offSrc;
        }
      });
    });

    return this;
  };


  /**
   * <h4>ロールオーバーイベント削除</h4>
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

    var props = $.extend(true, {}, Rollover.options, options);

    $images.each(function(i){
      var $group = $images.eq(i).closest('.' + props.groupClass),
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
    props = $.extend(true, {}, Rollover.options, options);

    $images.addClass(props.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // イベント削除
      data.$trigger
      .addClass(props.activeClass)
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
    props = $.extend(true, {}, Rollover.options, options);

    $images.removeClass(props.activeClass)
    .each(function(i){
      var data = self._createRolloverData($images.eq(i), props);

      // イベント削除
      data.$trigger
      .removeClass(props.activeClass)
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
   * @param  {Object} options オプション値
   * @return {Rollover}
   */
  p._createRolloverData = function($image, options){
    var
    image = $image[0],
    src = image.src,
    ext = src.substring(src.lastIndexOf('.'), src.length),
    $group = $image.closest('.' + options.groupClass).addClass(options.activeClass),
    onSrc,
    offSrc;

    // 現在on画像の場合
    if(src.lastIndexOf(options.postfix + ext) > -1){
      onSrc = src;
      offSrc = src.replace(options.postfix + ext, ext);
      AMP.preload(offSrc);

    // 現在off画像の場合
    } else {
      offSrc = src;
      onSrc = src.replace(ext, options.postfix + ext);
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
    exports
  --------------------------------------------------------------------------*/

  AMP.$.Rollover = Rollover;
  AMP.$.rollover = new Rollover();


}(window, AMP, jQuery));
