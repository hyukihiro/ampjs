;(function(root, $){

  // 'use strict';


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
  var Rollover = function($image, options){
    this.$image = $image;
    this.param = $.extend(true, Rollover.defaults, options);

    var i = 0,
    l = this.$image.length;

    for(; i < l; i += 1){
      this.setRollover(this.$image.eq(i));
    }
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
  Rollover.p = Rollover.prototype;


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
  Rollover.p.param = null;


  /**
   * <h4>ターゲット画像</h4>
   *
   * @property $image
   * @type {jQuery}
   */
  Rollover.p.$image = null;



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
  Rollover.extend = root.amp._extend;


  /**
   * <h4>ロールオーバーのセッティング</h4>
   *
   * @method setRollover
   * @param {jQuery} $target 画像要素
   * @return {Rollover}
   */
  Rollover.p.setRollover = function($image){

    // 画像データ設定
    var src = $image.attr('src'),
    ext = src.substring(src.lastIndexOf('.'), src.length),
    $group = $image.closest('.' + this.param.groupClass);

    // trigger
    $image.trigger = $group[0] ? $group : $image;

    // 現在on画像の場合
    if(src.lastIndexOf(this.param.postfix + ext) > -1){
      $image.onSrc = src;
      $image.offSrc = src.replace(this.param.postfix + ext, ext);

      // off画像に
      if(!$image.hasClass(this.param.activeClass)){
        $image[0].src = $image.offSrc;
      }

    } else {
      $image.offSrc = src;
      $image.onSrc = src.replace(ext, this.param.postfix + ext);
      root.amp.preload($image.onSrc);

      // on画像に
      if($image.hasClass(this.param.activeClass)){
        $image[0].src = $image.onSrc;
      }
    }

    // イベント追加
    this.addEvent($image);

    return this;
  };



  /**
   * <h4>on画像に変える</h4>
   *
   * @method on
   * @param  {jQuery} $image 画像要素
   * @return {Rollover}
   */
  Rollover.p.on = function($image){
    var $target = $image ? $image : this.$image,
    i = 0,
    l = $target.length;

    for(; i < l; i += 1){
      $target[i].src = $target.eq(i).onSrc;
    }

    return this;
  };


  /**
   * <h4>off画像に変える</h4>
   *
   * @method off
   * @param  {jQuery} $image 画像要素
   * @return {Rollover}
   */
  Rollover.p.off = function($image){
    var $target = $image ? $image : this.$image,
    i = 0,
    l = $target.length;

    for(; i < l; i += 1){
      $target[i].src = $target.eq(i).offSrc;
    }

    return this;
  };


  /**
   * <h4>イベントの追加</h4>
   *
   * @method addEvent
   * @param  {jQuery} $image 画像要素
   * @return {Rollover}
   */
  Rollover.p.addEvent = function($image){
    var self = this;

    $image.trigger.on({
      'mouseenter.Rollover': function(){
        if(!$image.hasClass(self.param.activeClass) && !$image.hasClass(self.param.noOverClass)){
          $image.attr({src: $image.onSrc});
        }
      },
      'mouseleave.Rollover': function(){
        if(!$image.hasClass(self.param.activeClass) && !$image.hasClass(self.param.noOverClass)){
          $image.attr({src: $image.offSrc});
        }
      }
    });

    return this;
  };


  /**
   * <h4>イベントの削除</h4>
   *
   * @method removeEvent
   * @param  {jQuery} $image 画像要素
   * @return {Rollover}
   */
  Rollover.p.removeEvent = function($image){
    var $target = $image ? $image : this.$image;
    $target.trigger.off();
    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Rollover.p.toString = function(){
    return '[object Rollover]';
  };


  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * Rolloverのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Rollover} Rolloverインスタンスを返す
   */
  Rollover.create = function($image, options){
    // $image指定がない場合、初期値を設定
    if(!$image || !$image instanceof jQuery){
      options = $image;
      $image = $('img.rover, input.rover, .all-rover img');
    }

    return new Rollover($image, options);
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Rollover = Rollover;


}(window, jQuery));
