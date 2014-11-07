/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author  Yoshihito Fujiwara
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


;(function(root, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>画像のロールオーバー</h4>
   *
   * @class Slipover
   * @constructor
   * @param  {jQuery} $image 画像要素
   * @param  {Object} options ロールオーバーのオプション値
   * @return {Slipover}
   */
  var Slipover = function($image, options){
    this.$image = $image;
    this.param = $.extend(true, Slipover.defaults, options);

    var i = 0,
    l = this.$image.length;

    for(; i < l; i += 1){
      this.setSlipover(this.$image.eq(i));
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
  Slipover.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Slipover.p = Slipover.prototype;


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @property defaults
   * @type {Object}
   */
  Slipover.defaults = {
    activeClass: 'active',
    noOverClass: 'no-over',
    duration   : 400,
    ease       : 'linear',
    postfix    : '_on',
    direction  : 'all' // all, top, bottom, right, left
  };


  /**
   * <h4>Slipover.defaultsとオプション値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  Slipover.p.param = null;


  /**
   * <h4>ターゲット画像</h4>
   *
   * @property $image
   * @type {jQuery}
   */
  Slipover.p.$image = null;



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
   * @return {Slipover}
   */
  Slipover.extend = root.amp._extend;


  /**
   * <h4>ロールオーバーのセッティング</h4>
   *
   * @method setSlipover
   * @param {jQuery} $target 画像要素
   * @return {Slipover}
   */
  Slipover.p.setSlipover = function($image){

    // 画像データ設定
    var
    src    = $image.attr('src'),
    ext    = src.substring(src.lastIndexOf('.'), src.length),
    onSrc  = src.replace(ext, this.param.postfix + ext),
    width  = $image.width(),
    height = $image.height(),
    boxCss = {
      display : 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      width   : width,
      height  : height
    },
    triggerCss = {
      display : 'block',
      position: 'absolute',
      zIndex  : 3,
      top     : 0,
      left    : 0,
      width   : width,
      height  : height
    },
    onCss = {
      position: 'absolute',
      zIndex  : 2,
      top     : '100%',
      left    : 0
    };


    // 要素の追加: 画像を囲う要素 [on画像, off画像]
    $image.box = $('<span />').css(boxCss);
    $image.trigger = $('<span />').css(triggerCss);
    $image.onImg = $('<img src="' + onSrc + '" alt="" />').css(onCss);
    $image.css({position: 'relative'}).wrap($image.box).parent().append($image.onImg).append($image.trigger);

    // $image.parent().append($image.trigger);
    // .prepend($image.trigger);


    // イベント追加
    this.addEvent($image);

    return this;
  };



  /**
   * <h4>on画像に変える</h4>
   *
   * @method on
   * @param  {jQuery} $image 画像要素
   * @return {Slipover}
   */
  Slipover.p.on = function($image){
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
   * @return {Slipover}
   */
  Slipover.p.off = function($image){
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
   * @return {Slipover}
   */
  Slipover.p.addEvent = function($image){
    var self = this;

    $image.trigger.on({
      'slipin.Slipover': function(e){
        if(!$image.hasClass(self.param.activeClass) && !$image.hasClass(self.param.noOverClass)){

          var style = self.param.direction === 'all' ? self.getStyle(e.direction) : self.param.direction;
          $image.onImg.css(style).stop(true, false).animate({top: 0, left: 0}, self.param.duration, self.param.ease);
        }
      },
      'slipout.Slipover': function(e){
        if(!$image.hasClass(self.param.activeClass) && !$image.hasClass(self.param.noOverClass)){
          var style = self.param.direction === 'all' ? self.getStyle(e.direction) : self.param.direction;
          $image.onImg.stop(true, false).animate(style, self.param.duration, self.param.ease);
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
   * @return {Slipover}
   */
  Slipover.p.removeEvent = function($image){
    var $target = $image ? $image : this.$image;
    $target.trigger.off();
    return this;
  };



  /**
   * [getStyle description]
   * @return {[type]} [description]
   */
  Slipover.p.getStyle = function(direction){
      var style = {
        top : 0,
        left: 0
      };

      switch (direction){
      case 'top':
        style.top = '-100%';
        break;

      case 'bottom':
        style.top = '100%';
        break;

      case 'left':
        style.left = '-100%';
        break;

      case 'right':
        style.left = '100%';
        break;
      }

      return style;
    };






  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Slipover.p.toString = function(){
    return '[object Slipover]';
  };


  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * Slipoverのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Slipover} Slipoverインスタンスを返す
   */
  Slipover.create = function($image, options){
    // $image指定がない場合、初期値を設定
    if(!$image || !$image instanceof jQuery){
      options = $image;
      $image = $('img.rover, input.rover, .all-rover img');
    }

    return new Slipover($image, options);
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Slipover = Slipover;


}(window, jQuery));
