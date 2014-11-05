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


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class Ease
   * @constructor
   * @return {Instance}
   */
  var Ease = function(){};



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
  Ease.VERSION = '1.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Ease.p = Ease.prototype;


  /**
   * <h4>jQuery easeing</h4>
   *
   * @static
   * @property $
   * @type {Object}
   */
  Ease.jQuery = {};


  /**
   * <h4>CSS3 easeing</h4>
   *
   * @static
   * @property css
   * @type {Object}
   */
  Ease.css = {};



  /*--------------------------------------------------------------------------
    jQuery
  --------------------------------------------------------------------------*/

  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._1_SINE_IN
   * @type {String}
   */
  Ease.jQuery._1_SINE_IN = 'easeInSine';

  /**
   * @static
   * @property $._1_SINE_OUT
   * @type {String}
   */
  Ease.jQuery._1_SINE_OUT = 'easeOutSine';

  /**
   * @static
   * @property $._1_SINE_IN_OUT
   * @type {String}
   */
  Ease.jQuery._1_SINE_IN_OUT = 'easeInOutSine';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._2_QUAD_IN
   * @type {String}
   */
  Ease.jQuery._2_QUAD_IN = 'easeInQuad';

  /**
   * @static
   * @property $._2_QUAD_OUT
   * @type {String}
   */
  Ease.jQuery._2_QUAD_OUT = 'easeOutQuad';

  /**
   * @static
   * @property $._2_QUAD_IN_OUT
   * @type {String}
   */
  Ease.jQuery._2_QUAD_IN_OUT = 'easeInOutQuad';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._3_CUBIC_IN
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_IN = 'easeInCubic';

  /**
   * @static
   * @property $._3_CUBIC_OUT
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_OUT = 'easeOutCubic';

  /**
   * @static
   * @property $._3_CUBIC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_IN_OUT = 'easeInOutCubic';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._4_QUART_IN
   * @type {String}
   */
  Ease.jQuery._4_QUART_IN = 'easeInQuart';

  /**
   * @static
   * @property $._4_QUART_OUT
   * @type {String}
   */
  Ease.jQuery._4_QUART_OUT = 'easeOutQuart';

  /**
   * @static
   * @property $._4_QUART_IN_OUT
   * @type {String}
   */
  Ease.jQuery._4_QUART_IN_OUT = 'easeInOutQuart';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._5_QUINT_IN
   * @type {String}
   */
  Ease.jQuery._5_QUINT_IN = 'easeInQuint';

  /**
   * @static
   * @property $._5_QUINT_OUT
   * @type {String}
   */
  Ease.jQuery._5_QUINT_OUT = 'easeOutQuint';

  /**
   * @static
   * @property $._5_QUINT_IN_OUT
   * @type {String}
   */
  Ease.jQuery._5_QUINT_IN_OUT = 'easeInOutQuint';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._6_EXPO_IN
   * @type {String}
   */
  Ease.jQuery._6_EXPO_IN = 'easeInExpo';

  /**
   * @static
   * @property $._6_EXPO_OUT
   * @type {String}
   */
  Ease.jQuery._6_EXPO_OUT = 'easeOutExpo';

  /**
   * @static
   * @property $._6_EXPO_IN_OUT
   * @type {String}
   */
  Ease.jQuery._6_EXPO_IN_OUT = 'easeInOutExpo';


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._7_CIRC_IN
   * @type {String}
   */
  Ease.jQuery._7_CIRC_IN = 'easeInCirc';

  /**
   * @static
   * @property $._7_CIRC_OUT
   * @type {String}
   */
  Ease.jQuery._7_CIRC_OUT = 'easeOutCirc';

  /**
   * @static
   * @property $._7_CIRC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._7_CIRC_IN_OUT = 'easeInOutCirc';


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._LINEAR
   * @type {String}
   */
  Ease.jQuery._LINEAR = 'linear';


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._BACK_IN
   * @type {String}
   */
  Ease.jQuery._BACK_IN = 'easeInBack';

  /**
   * @static
   * @property $._BACK_OUT
   * @type {String}
   */
  Ease.jQuery._BACK_OUT = 'easeOutBack';

  /**
   * @static
   * @property $._BACK_IN_OUT
   * @type {String}
   */
  Ease.jQuery._BACK_IN_OUT = 'easeInOutBack';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._ELASTIC_IN
   * @type {String}
   */
  Ease.jQuery._ELASTIC_IN = 'easeInElastic';

  /**
   * @static
   * @property $._ELASTIC_OUT
   * @type {String}
   */
  Ease.jQuery._ELASTIC_OUT = 'easeOutElastic';

  /**
   * @static
   * @property $._ELASTIC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._ELASTIC_IN_OUT = 'easeInOutElastic';


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._BOUNCE_IN
   * @type {String}
   */
  Ease.jQuery._BOUNCE_IN = 'easeInBounce';

  /**
   * @static
   * @property $._BOUNCE_OUT
   * @type {String}
   */
  Ease.jQuery._BOUNCE_OUT = 'easeOutBounce';

  /**
   * @static
   * @property $._BOUNCE_IN_OUT
   * @type {String}
   */
  Ease.jQuery._BOUNCE_IN_OUT = 'easeInOutBounce';




  /*--------------------------------------------------------------------------
    css3
  --------------------------------------------------------------------------*/

  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @static
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  Ease.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._2_QUAD_IN
   * @type {String}
   */
  Ease.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @static
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @static
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  Ease.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @static
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @static
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._4_QUART_IN
   * @type {String}
   */
  Ease.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @static
   * @property css._4_QUART_OUT
   * @type {String}
   */
  Ease.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @static
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  Ease.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._5_QUINT_IN
   * @type {String}
   */
  Ease.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @static
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @static
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._6_EXPO_IN
   * @type {String}
   */
  Ease.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @static
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @static
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._7_CIRC_IN
   * @type {String}
   */
  Ease.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @static
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @static
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BACK_IN
   * @type {String}
   */
  Ease.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @static
   * @property css._BACK_OUT
   * @type {String}
   */
  Ease.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @static
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  Ease.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._ELASTIC_IN
   * @type {String}
   */
  Ease.css._ELASTIC_IN = null;

  /**
   * @static
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_OUT = null;

  /**
   * @static
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BOUNCE_IN
   * @type {String}
   */
  Ease.css._BOUNCE_IN = null;

  /**
   * @static
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_OUT = null;

  /**
   * @static
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Ease.p.toString = function(){
    return '[object Ease]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Ease = Ease;


}(window, jQuery));

;(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>配列を操作します</h4>
   *
   * @class Iterator
   * @constructor
   * @param {Array} list 配列
   * @param {Boolean} isLoop ループ処理の有無
   * @return {Iterator}
   */
  var Iterator = function(list, isLoop){
    this.list = list;
    this.isLoop = isLoop ? true : false;
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
  Iterator.VERSION = '1.3';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Iterator.p = Iterator.prototype;


  /**
   * <h4>イテレートする配列</h4>
   *
   * @property list
   * @type {Array}
   */
  Iterator.p.list = null;


  /**
   * <h4>現在の位置</h4>
   *
   * @property count
   * @default 0
   * @type {Number}
   */
  Iterator.p.count = 0;


  /**
   * <h4>配列をループさせるか</h4>
   *
   * @property isLoop
   * @default false
   * @type {Boolean}
   */
  Iterator.p.isLoop = false;



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
   * @return {Iterator}
   */
  Iterator.extend = root.amp._extend;


  /**
   * <h4>次の位置へ</h4>
   *
   * @method next
   * @return {Iterator}
   */
  Iterator.p.next = function(){
    if(this.count !== this.list.length - 1){
      this.count += 1;
    } else if(this.isLoop){
      this.count = 0;
    }
    return this;
  };


  /**
   * <h4>前の位置へ</h4>
   *
   * @method prev
   * @return {Iterator}
   */
  Iterator.p.prev = function(){
    if(this.count !== 0){
      this.count -= 1;
    } else if(this.isLoop){
      this.count = this.list.length - 1;
    }
    return this;
  };


  /**
   * <h4>先頭へ</h4>
   *
   * @method first
   * @return {Iterator}
   */
  Iterator.p.first = function(){
    this.count = 0;
    return this;
  };


  /**
   * <h4>最後へ</h4>
   *
   * @method last
   * @return {Iterator}
   */
  Iterator.p.last = function(){
    this.count = this.list.length - 1;
    return this;
  };


  /**
   * <h4>指定位置まで移動</h4>
   *
   * @method setCount
   * @param {Number} num 指定位置
   * @return {Iterator}
   */
  Iterator.p.setCount = function(num){
    if(-1 < num && num < this.list.length){
      this.count = num;
    } else {
      this.count = num < 0 ? 0 : this.list.length - 1;
    }
    return this;
  };


  /**
   * <h4>次の位置があるか</h4>
   * Loop時は常にtrue
   *
   * @method hasNext
   * @return {Boolean}
   */
  Iterator.p.hasNext = function(){
    return this.isLoop ? true : this.count < this.list.length -1;
  };


  /**
   * <h4>前の位置があるか</h4>
   * Loop時は常にtrue
   *
   * @method hasPrev
   * @return {Boolean}
   */
  Iterator.p.hasPrev = function(){
    return this.isLoop ? true : this.count !== 0;
  };


  /**
   * <h4>現在地を返す</h4>
   *
   * @method getCount
   * @return {Number}
   */
  Iterator.p.getCount = function(){
    return this.count;
  };


  /**
   * <h4>listの長さを返す</h4>
   *
   * @method getLength
   * @return {Number}
   */
  Iterator.p.getLength = function(){
    return this.list.length;
  };


  /**
   * <h4>現在の値を返す</h4>
   *
   * @method getValue
   * @return {Any}
   */
  Iterator.p.getValue = function(){
    return this.list[this.count];
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Iterator.p.toString = function(){
    return '[object Iterator]';
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Iterator = Iterator;


}(window));

;(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベントを仲介します</h4>
   *
   * @class Mediator
   * @constructor
   * @return {Mediator}
   */
  var Mediator = function(){};



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
  Mediator.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Mediator.p = Mediator.prototype;


  /**
   * <h4>コールバックイベントを連想配列で格納します</h4>
   *
   * @private
   * @property _callbacks
   * @type {Object}
   */
  Mediator.p._callbacks = {};



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
  Mediator.extend = root.amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  Mediator.p.on = function(event, callback, context){
    var self = this;

    self._callbacks[event] = {
      callback: callback,
      context : context
    };

    return self;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  Mediator.p.one = function(event, callback, context){
    var self = this,
    once;

    once = _.once(function(){
      self.off(event, once);
      callback.apply(self, arguments);
    });

    self.on(event, once, context);

    return self;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  Mediator.p.off = function(event){
    if(this._callbacks[event]){
      this._callbacks[event] = null;

    } else if(!event){
      this._callbacks = {};
    }

    return this;
  };


  /**
   * <h4>イベントが登録されているか</h4>
   *
   * @method hasEvent
   * @param  {String} event イベント名
   * @return {Boolean}
   */
  Mediator.p.hasEvent = function(event){
    var key,
    flag = false;

    for(key in this._callbacks){
      if(key === event){
        flag = true;
        break;
      }
    }

    return flag;
  };


  /**
   * <h4>イベント発行</h4>
   * <p>第二引数以降に値を渡すとcallbackに引数として渡します</p>
   *
   * @method trigger
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  Mediator.p.trigger = function(event){
    if(this._callbacks[event]){
      this._callbacks[event].callback.apply(event.context, [].slice.apply(arguments).slice(1));
    }
    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Mediator.p.toString = function(){
    return '[object Mediator]';
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediator = Mediator;


}(window));

;(function(root){

  // 'use strict';


  /**
   * <h4>文字サイズ監視、文字サイズ変更イベント</h4>
   * シングルトンパターン
   *
   * @static
   * @class fontResize
   * @event fontResize
   * @param {Function} fn コールバック関数
   * @param  {String} key コールバックキー
   * @return {fontResize}
   * @example
   *  amp.fontResize.on('change', callback);
   */
  var fontResize = function(fn, key){
    // singleton
    if(!fontResize._callbacks){
      fontResize._callbacks = {};
      fontResize._init();
    }

    if(key){
      fontResize.add(fn, key);
    } else {
      fontResize.add(fn);
    }

    return fontResize;
  };


  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  fontResize.VERSION = '1.5';


  /**
   * <h4>設定値</h4>
   * config { <ul><li>
   *   elm    : null, 監視対象のDOM</li><li>
   *   size   : 0, {Number} 現在のフォントサイズ</li><li>
   *   count  : 0, {Number} コールバックインデックス</li><li>
   *   timerId: null {Number} タイマーID</li></ul>
   * }
   *
   * @static
   * @property config
   * @type {Object}
   */
  fontResize.config = {
    elm    : null,
    size   : 0,
    count  : 0,
    timerId: null
  };


  /**
   * <h4>コールバックオブジェクト</h4>
   *
   * @private
   * @static
   * @property _callbacks
   * @type {Object}
   */
  fontResize._callbacks = null;


  /**
   * <h4>初期化</h4>
   *
   * @private
   * @static
   * @method _init
   * @return {Void}
   */
  fontResize._init = function(){
    // 監視対象要素の追加
    fontResize.config.elm = document.createElement('ins');
    fontResize.config.elm.innerHTML = 'amp';
    fontResize.config.elm.setAttribute('id', 'amp_observer');
    fontResize.config.elm.setAttribute('style', 'display:block; visibility: hidden; position: absolute; top: 0; z-index: -1;');
    document.getElementsByTagName('body')[0].appendChild(fontResize.config.elm);

    fontResize.config.size = fontResize.config.elm.clientHeight;
    fontResize.on();
  };


  /**
   * <h4>フォント監視開始</h4>
   *
   * @static
   * @method on
   * @return {fontResize}
   */
  fontResize.on = function(){
    fontResize.off();
    fontResize.loop();
    return fontResize;
  };


  /**
   * <h4>フォント監視停止</h4>
   *
   * @static
   * @method off
   * @return {fontResize}
   */
  fontResize.off = function(){
    amp.cancelAnimationFrame(fontResize.config.timerId);
    return fontResize;
  };


  /**
   * <h4>再起処理</h4>
   *
   * @static
   * @method loop
   * @return {Void}
   */
  fontResize.loop = function(){
    var h = fontResize.config.elm.clientHeight;
    if(fontResize.config.size != h){
      fontResize.config.size = h;
      fontResize.trigger();
    }
    fontResize.config.timerId = amp.requestAnimationFrame(fontResize.loop);
  };


  /**
   * <h4>コールバック削除</h4>
   *
   * @static
   * @method clear
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.clear = function(key){
    if(key && fontResize._callbacks.key){
      fontResize._callbacks[key] = null;

    } else if(!key){
      fontResize._callbacks = {};
      fontResize.off();
    }
    return fontResize;
  };


  /**
   * <h4>コールバック追加</h4>
   *
   * @static
   * @method add
   * @param {Function} fn コールバック関数
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.add = function(fn, key){
    if(key){
      // 注意： コールバックオブジェクトが重複したとき上書きします。
      fontResize._callbacks[key] = fn;

    } else {
      fontResize._callbacks[fontResize.config.count] = fn;
      fontResize.config.count += 1;
    }
    return fontResize;
  };


  /**
   * <h4>イベント発行</h4>
   *
   * @static
   * @method trigger
   * @param {String} key コールバックキー 省略可
   * @return {fontResize}
   */
  fontResize.trigger = function(key){
    if(key){
      if(amp.isFunction(fontResize._callbacks[key])){
        fontResize._callbacks[key]();
      }

    } else {
      var k;
      for(k in fontResize._callbacks){
        if(amp.isFunction(fontResize._callbacks[k])){
          fontResize._callbacks[k]();
        }
      }
    }
    return fontResize;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  fontResize.toString = function(){
    return '[object fontResize]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.fontResize = fontResize;


}(window));
