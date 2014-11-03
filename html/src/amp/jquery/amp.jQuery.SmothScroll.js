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
   * <h4>スムーススクロール</h4>
   * PCのみ有効
   *
   * @class SmoothScroll
   * @constructor
   * @param  {Object} options オプション値
   * @return {SmoothScroll}
   */
  var SmoothScroll = function(options){
    this.$target = $('html, body');
    this.param = $.extend(true, {}, SmoothScroll.defaults, options);
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
  SmoothScroll.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  SmoothScroll.p = SmoothScroll.prototype;


  /**
   * <h4>スムーススクロールエリア</h4>
   * コンストラクタが呼び出し時に、$('html, body')が渡されます
   *
   * @property $target
   * @type {jQuery}
   */
  SmoothScroll.p.$target = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   amount  : 0, // {Number} スクロール量 </li><li>
   *   duration: 600, // {Number} スクロールスピード </li><li>
   *   easing  : 'easeOutExpo', // {String} イージング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  SmoothScroll.defaults = {
    amount  : 200,
    dulation: 400,
    ease    : 'easeOutCubic'
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  SmoothScroll.p.param = null;



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
   * @return {SmoothScroll}
   */
  SmoothScroll.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method on
   * @return {SmoothScroll}
   */
  SmoothScroll.p.on = function(){
    var self = this;
    if(amp.isDevice('pc')){
      self.off();
      self.$target.on('mousewheel.SmoothScroll', function(event, move){
        self.tween(event, move);
        return false;
      });
    }
    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {SmoothScroll}
   */
  SmoothScroll.p.off = function(){
    if(amp.isDevice('pc')){
      this.$target.off('mousewheel.SmoothScroll');
    }
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  SmoothScroll.p.tween = function(event, move){
    var self = this,
    param = self.param,
    y = amp.isWebkit() ? self.$target.eq(1).scrollTop() : self.$target.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.$target.stop(true, false).animate({scrollTop: scrollY}, param.dulation, param.ease);
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  SmoothScroll.p.toString = function(){
    return '[object SmoothScroll]';
  };


  /**
   * <h4>マウスホイールのスムーススクロール</h4>
   *
   * @static
   * @method create
   * @param  {Object} options? オプション値 省略可
   * @return {SmoothScroll} SmoothScrollインスタンスを返す
   */
  SmoothScroll.create = function(options){
    var smoothScroll = new SmoothScroll(options);
    smoothScroll.on();
    return smoothScroll;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.SmoothScroll = SmoothScroll;


}(window, jQuery));
