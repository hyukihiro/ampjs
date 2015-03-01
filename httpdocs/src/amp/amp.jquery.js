/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
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


(function(root, $, amp){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   * amp.Easeをextendします
   *
   * @class amp.Ease
   * @constructor
   * @return {Ease}
   */
  function Ease(){};

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>jQuery easeing用ネームスペース</h4>
   *
   * @property jQuery
   * @type {Object}
   */
  /**
   * <h4>jQuery easeing用ネームスペース</h4>
   *
   * @property $
   * @type {Object}
   */
  p.$ = p.jQuery = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property $._1_SINE_IN
   * @type {String}
   */
  p.$._1_SINE_IN = 'easeInSine';

  /**
   * @property $._1_SINE_OUT
   * @type {String}
   */
  p.$._1_SINE_OUT = 'easeOutSine';

  /**
   * @property $._1_SINE_IN_OUT
   * @type {String}
   */
  p.$._1_SINE_IN_OUT = 'easeInOutSine';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property $._2_QUAD_IN
   * @type {String}
   */
  p.$._2_QUAD_IN = 'easeInQuad';

  /**
   * @property $._2_QUAD_OUT
   * @type {String}
   */
  p.$._2_QUAD_OUT = 'easeOutQuad';

  /**
   * @property $._2_QUAD_IN_OUT
   * @type {String}
   */
  p.$._2_QUAD_IN_OUT = 'easeInOutQuad';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property $._3_CUBIC_IN
   * @type {String}
   */
  p.$._3_CUBIC_IN = 'easeInCubic';

  /**
   * @property $._3_CUBIC_OUT
   * @type {String}
   */
  p.$._3_CUBIC_OUT = 'easeOutCubic';

  /**
   * @property $._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.$._3_CUBIC_IN_OUT = 'easeInOutCubic';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property $._4_QUART_IN
   * @type {String}
   */
  p.$._4_QUART_IN = 'easeInQuart';

  /**
   * @property $._4_QUART_OUT
   * @type {String}
   */
  p.$._4_QUART_OUT = 'easeOutQuart';

  /**
   * @property $._4_QUART_IN_OUT
   * @type {String}
   */
  p.$._4_QUART_IN_OUT = 'easeInOutQuart';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property $._5_QUINT_IN
   * @type {String}
   */
  p.$._5_QUINT_IN = 'easeInQuint';

  /**
   * @property $._5_QUINT_OUT
   * @type {String}
   */
  p.$._5_QUINT_OUT = 'easeOutQuint';

  /**
   * @property $._5_QUINT_IN_OUT
   * @type {String}
   */
  p.$._5_QUINT_IN_OUT = 'easeInOutQuint';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property $._6_EXPO_IN
   * @type {String}
   */
  p.$._6_EXPO_IN = 'easeInExpo';

  /**
   * @property $._6_EXPO_OUT
   * @type {String}
   */
  p.$._6_EXPO_OUT = 'easeOutExpo';

  /**
   * @property $._6_EXPO_IN_OUT
   * @type {String}
   */
  p.$._6_EXPO_IN_OUT = 'easeInOutExpo';


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property $._7_CIRC_IN
   * @type {String}
   */
  p.$._7_CIRC_IN = 'easeInCirc';

  /**
   * @property $._7_CIRC_OUT
   * @type {String}
   */
  p.$._7_CIRC_OUT = 'easeOutCirc';

  /**
   * @property $._7_CIRC_IN_OUT
   * @type {String}
   */
  p.$._7_CIRC_IN_OUT = 'easeInOutCirc';


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property $._LINEAR
   * @type {String}
   */
  p.$._LINEAR = 'linear';


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property $._BACK_IN
   * @type {String}
   */
  p.$._BACK_IN = 'easeInBack';

  /**
   * @property $._BACK_OUT
   * @type {String}
   */
  p.$._BACK_OUT = 'easeOutBack';

  /**
   * @property $._BACK_IN_OUT
   * @type {String}
   */
  p.$._BACK_IN_OUT = 'easeInOutBack';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property $._ELASTIC_IN
   * @type {String}
   */
  p.$._ELASTIC_IN = 'easeInElastic';

  /**
   * @property $._ELASTIC_OUT
   * @type {String}
   */
  p.$._ELASTIC_OUT = 'easeOutElastic';

  /**
   * @property $._ELASTIC_IN_OUT
   * @type {String}
   */
  p.$._ELASTIC_IN_OUT = 'easeInOutElastic';


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property $._BOUNCE_IN
   * @type {String}
   */
  p.$._BOUNCE_IN = 'easeInBounce';

  /**
   * @property $._BOUNCE_OUT
   * @type {String}
   */
  p.$._BOUNCE_OUT = 'easeOutBounce';

  /**
   * @property $._BOUNCE_IN_OUT
   * @type {String}
   */
  p.$._BOUNCE_IN_OUT = 'easeInOutBounce';



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/
  // console.log(amp.Ease.extend(Ease));
  amp.exportClass(amp.Ease.extend(Ease), amp.Ease.VERSION);

  amp.ease = new Ease();


}(window, jQuery, amp || {}));

(function(root, $){

  // 'use strict';

  var FontResize, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>フォントサイズ変更イベント</h4>
   *
   * @class amp.FontResize
   * @constructor
   * @return {FontResize}
   */
  function FontResize(){};




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
  FontResize.VERSION = '2.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  // p = FontResize.prototype = amp.extend({}, amp.Mediator.prototype, FontResize.prototype);
  p = FontResize.prototype

  /**
   * <h4>フォントサイズ変更時の発行するイベント名</h4>
   *
   * @private
   * @static
   * @property _event 'change'
   * @type {String}
   */
  FontResize._event = 'change';


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = true;


  /**
   * <h4>監視する要素</h4>
   *
   * @property $el
   * @type {jQuery}
   */
  p.$el = null;


  /**
   * <h4>監視要素の高さ</h4>
   *
   * @property height
   * @type {Number}
   */
  p.height = null;



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
   * @return {Extend Class}
   */
  FontResize.extend = amp._extend;


  /**
   * <h4>監視するフォントの設置</h4>
   *
   * @private
   * @method _init
   * @return {FontResize}
   */
  p._init = function(){
    this.$el = $('<ins id="FontResize">F</ins>').css({
      display   : 'block',
      visibility: 'hidden',
      position  : 'absolute',
      top       : 0,
      left      : 0,
      zIndex    : -1
    });

    $('body').append(this.$el);
    this.height = this.$el.height();
    this._controller();

    return this;
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.on = function(event, callback, context){
    if(!this.$el){
      this._init();
    }

    this._addEvent(event, callback, context);
    return this;
  };


  /**
   * <h4>フォントの監視、有無の設定</h4>
   *
   * @method setObserver
   * @param {Boolean} isObserver 監視有効か無効かセットする 有効:true
   * @return {FontResize}
   */
  p.setObserver = function(isObserver){
    var flag = amp.isBoolean(isObserver) ? isObserver : this.isObserver;

    if(flag !== this.isObserver && flag){
      this._controller();
    }

    this.isObserver = flag;

    return this;
  };


  /**
   * <h4>状態を監視し、フォトサイズに変更があればイベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    h = self.$el.height();

    if(self.height !== h){
      self.height = h;
      this.trigger(FontResize._event);
    }

    if(self.isObserver){
      amp.requestAnimationFrame(function(){
        self._controller();
      });
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object FontResize]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.FontResize = FontResize;
  root.amp.fontResize = new FontResize();


}(window, jQuery));
