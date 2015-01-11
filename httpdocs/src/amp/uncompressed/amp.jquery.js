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


(function(root, $){

  // 'use strict';

  var Ease, p;



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
  Ease = amp.Ease.extend();



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  // prototype
  p = Ease.prototype;


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

  root.amp = root.amp || {};
  root.amp.Ease = Ease;
  root.amp.ease = new Ease();


}(window, jQuery));

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
  FontResize = function(){};



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
  p = FontResize.prototype = amp.extend({}, amp.Mediator.prototype, FontResize.prototype);


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

(function(root, $){

  // 'use strict';

  var Mediaquery, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>mediaqueryのブレイクポイントイベント</h4>
   *
   * @class amp.Mediaquery
   * @constructor
   * @return {Mediaquery}
   */
  Mediaquery = function(){};



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
  Mediaquery.VERSION = '1.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = Mediaquery.prototype = $.extend({}, amp.Mediator.prototype, Mediaquery.prototype);


  /**
   * <h4>スタイルを監視する要素</h4>
   *
   * @property $el
   * @default $('head')
   * @type {jQuery}
   */
  p.$el = null;


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = true;


  /**
   * <h4>mediaTypesの保管オブジェクト</h4>
   * cssのfont-familyの文字列を保管します
   *
   * @property mediaTypes
   * @type {Object}
   */
  p.mediaTypes = {
    current: null,
    prev   : null
  };



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
   * @return {Mediaquery}
   */
  Mediaquery.extend = amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @param  {jQuery}  $el 監視要素
   * @param  {Boolean} isObserver 監視フラグ
   * @return {Mediaquery}
   */
  p.init = function($el, isObserver){
    if(amp.isBoolean($el)){
      isObserver = $el;
    }

    this.setElement($el);
    this.setObserver(isObserver);
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
    this._addEvent(event, callback, context);

    // 初期化されていない場合
    if(!this.$el){
      this.init();
    }
    return this;
  };


  /**
   * <h4>状態を監視し、イベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    mediaTypes;

    $(root).on('resize.Mediaquery', function(){

      if(self.isObserver){
        var mediaTypes = self.getCurrents(),
        events = [];

        // 変更されたイベントタイプの検索
        if(self.mediaTypes.current){
          events = _.difference(mediaTypes, self.mediaTypes.current);
        }

        // mediaTypes値の設定
        self.mediaTypes.prev = self.mediaTypes.current;
        self.mediaTypes.current = mediaTypes;

        // イベント発行
        if(events[0]){
          _.each(events, function(event){
            self.trigger(event, self.mediaTypes);
          });
          self.trigger('change', self.mediaTypes);
        }
      }
    });
  };


  /**
   * <h4>mediaqueryの監視、有無の設定</h4>
   *
   * @method setObserver
   * @param {Boolean} isObserver 監視有効か無効かセットする 有効:true
   * @return {Mediaquery}
   */
  p.setObserver = function(isObserver){
    this.isObserver = amp.isBoolean(isObserver) ? isObserver : this.isObserver;
    if(this.isObserver){
      $(root).trigger('resize.Mediaquery');
    }

    return this;
  };


  /**
   * <h4>監視する要素を選択</h4>
   *
   * @method setElement
   * @param {jQuery} $el 監視する要素
   * @return {Mediaquery}
   */
  p.setElement = function($el){
    // 監視する要素が選択されていない場合はhead要素を選択
    if(!this.$el && !($el instanceof jQuery)){
      this.$el = $('head');
    } else {
      this.$el = $el;
    }
    return this;
  };


  /**
   * <h4>現在のタイプの取得</h4>
   * $elのfont-familyを配列にソートして返します
   *
   * @method getCurrents
   * @return {Array}
   */
  p.getCurrents = function(){
    return _.sortBy(amp.removeSpaceChara(this.$el.css('fontFamily')).split(','));
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object Mediaquery]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediaquery = Mediaquery;
  root.amp.mediaquery = new Mediaquery();


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var Active, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>アクティブ化</h4>
   *
   * @class amp.Active
   * @constructor
   * @return {Active}
   */
  Active = function(){};



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
  Active.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Active.prototype;


  /**
   * <h4>アクティブタイプリスト</h4>
   *
   * @ static
   * @property types
   * @type {Array}
   */
  Active.types = ['text', 'rollover', 'alphaover'];



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
  Active.extend = amp._extend;


  /**
   * 要素のアクティブ化
   *
   * @static
   * @public
   * @method active
   * @param {jQuery} $target 対象の要素
   * @param {String} type アクティブタイプ
   * @param {Object} options アクティブオプション
   * @return {RolloverInstance}
   */
  Active.active = p.active = function($target, type, options){
    if(!($target instanceof jQuery)){
      throw new TypeError('Please select the jQuery element');
    }

    // optionsチェック
    if($.isPlainObject(type)){
      options = type;
      type = null;
    }

    // typeの大文字表記チェック
    if(amp.isString(type)){
      type = type.toLowerCase();
    }

    // type判定
    var flag = false,
    i = 0,
    l = Active.types.length;
    for(; i < l; i += 1){
      if(type === Active.types[i]){
        flag = true;
        break;
      }
    }

    // type判定エラー時
    if(!flag){
      type = $target[0].nodeName === 'IMG' ? Active.types[1] : Active.types[0];
    }

    // text
    if(type === Active.types[0]){
      return $target.addClass(options || 'active');

    // rollover
    } else if(type === Active.types[1]){
      options = $.extend(true, {}, amp.Rollover.defaults, options);
      return amp.rollover($target.addClass(options.activeClass), options);

    // alphaover
    } else if(type === Active.types[2]){
      options = $.extend(true, {}, amp.Alphaover.defaults, options);
      return amp.alphaover($target.addClass(options.activeClass), options);
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Active]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Active = Active;
  root.amp.active = Active.active;



}(window, jQuery));

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

(function(root, $){

  // 'use strict';

  var BoxHover, boxHover, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class amp.BoxHover
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   * @return {BoxHover}
   */
  BoxHover = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.box-hover');
    }

    this.$target = $target;
    this.param = $.extend(true, {}, BoxHover.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   * BoxHoverショートハンド
   *
   * @static
   * @method boxHover
   * @param  {jQuery} $target 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover} BoxHoverインスタンスを返す
   */
  boxHover = function($target, options){
    var inst = new BoxHover($target, options);
    inst.on();
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
  BoxHover.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = BoxHover.prototype;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults { <ul><li>
   *   hoverClass: 'hover', {String} ホバー時に付けるクラス名</li><li>
   *   linkClass : 'link' {String} 複数リンクがある場合、優先するリンククラス</li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  BoxHover.defaults = {
    hoverClass: 'hover',
    linkClass : 'link'
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタ呼び出し時の引数とBoxHover.optionsを、mixinして格納します<br>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



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
   * @return {BoxHover}
   */
  BoxHover.extend = amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param {jQuery} $target ターゲット要素 省略可
   * @return {BoxHover}
   */
  p.on = function($target){
    var self = this;

    $target = $target ? $target : this.$target;
    this.off($target);

    $target.css({cursor: 'pointer'})
      .on('mouseenter.BoxHover', function(){
        $(this).addClass(self.param.hoverClass);
      })
      .on('mouseleave.BoxHover', function(){
        $(this).removeClass(self.param.hoverClass);
      })
      .on('click.BoxHover', function(){
        self.setLink($(this));
      });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param {jQuery} $target ターゲット要素 省略可
   * @return {BoxHover}
   */
  p.off = function($target){
    $target = $target ? $target : this.$target;
    $target.css({cursor: 'auto'}).off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover');
    return this;
  };


  /**
   * <h4>リンクの設定</h4>
   *
   * @method setLink
   * @param {Object} event イベントオブジェクト
   * @param {Object} param paramオブジェクト
   * @return {Boolean} false デフォルトのリンクの挙動のキャンセル
   */
  p.setLink = function($target){
    var self = this,
    $link = $target.find('.' + self.param.linkClass),
    $a = $target.find('a').eq(0);

    $a = $link[0] ? $link : $a;

    // リンク展開
    if($a.attr('target') === '_blank'){
      return window.open($a.attr('href'), '_blank');
    } else {
      location.href = $a.attr('href');
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object BoxHover]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.BoxHover = BoxHover;
  root.amp.boxHover = boxHover;


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var FlatHeight, flatHeight, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class amp.FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight}
   */
  FlatHeight = function($target, split, options){
    this.$target   = $target;
    this.split     = $.isNumeric(split) ? split : $target.length;
    options        = $.isPlainObject(split) ? split : options;
    this.param     = $.extend(true, {}, FlatHeight.defaults, options);
    this.param.isResize = amp.isDevice('sd') ? true : this.param.isResize;
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method flatHeight
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight} FlatHeight生成してインスタンスを返す
   */
  flatHeight = function($target, split, options){
    var inst = new FlatHeight($target, split, options);
    inst.setEvent();
    inst.setHeight();
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
  FlatHeight.VERSION = '2.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = FlatHeight.prototype;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>高さを揃える要素の分割単位</h4>
   *
   * @property split
   * @type {Number}
   */
  p.split = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults: { <ul><li>
   *   isResize: false, // {Boolean} リサイズ時、高さを揃えなおすか (スマートデバイスはtrueに設定されます)</li><li>
   *   timer   : 100 // {Number} リサイズイベントタイミング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  FlatHeight.defaults = {
    isResize: false,
    timer   : 50
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



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
   * @return {FlatHeight}
   */
  FlatHeight.extend = amp._extend;


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method setEvent
   * @return {FlatHeight}
   */
  p.setEvent = function(){
    var self = this;

    // font resize
    if(amp.isDevice('pc')){
      amp.fontResize.on('change.FlatHeight', function(){
        self.setHeight();
      });
    }

    // window resize
    $(window).on('resizestop.FlatHeight', {timer: self.param.timer}, function(){
      if(self.param.isResize){
        self.setHeight();
      }
    });

    return this;
  };


  /**
   * <h4>区切りをセットして高さを揃える</h4>
   *
   * @method setSplit
   * @return {FlatHeight}
   */
  p.setSplit = function(num){
    this.split = num;
    this.setHeight();
    return this;
  };


  /**
   * <h4>高さを揃える</h4>
   *
   * @method setHeight
   * @return {FlatHeight}
   */
  p.setHeight = function(){
    var self = this,
    total = self.$target.length,
    rest = total % self.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.$target.height('auto');

    if(1 < self.split){
      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.$target.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.split === 0){
          self.$target.slice(rowCount * self.split, (rowCount += 1) * self.split).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.$target.slice(rowCount * self.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object FlatHeight]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.FlatHeight = FlatHeight;
  root.amp.flatHeight = flatHeight;



}(window, jQuery));

(function(root, $){

  // 'use strict';

  var Loader, loader, p;


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>imagesloaded.jsに依存します</b>
   *
   * @class amp.Loader
   * @constructor
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Boolean} isStart ローダー開始するか
   * @return {Loader}
   */
  Loader = function(elm, isStart){
    this.elm = elm ? elm : this.elm;
    this.imagesloaded = imagesLoaded(this.elm);
    this.length = this.imagesloaded.images.length;
    this.$defer = new $.Deferred();

    if(amp.isBoolean(isStart) && isStart){
      this.start();
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * Loaderのショートハンド<br>
   * 処理が完了したら、jQuery Deferred Objectを返します
   *
   * @static
   * @method loader
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期: body
   * @return {Loader} Loader生成してインスタンスを返す
   */
  loader = function(elm){
    return new Loader(elm, true);
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
  Loader.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Loader.prototype;


  /**
   * <h4>対象のimgを囲う要素</h4>
   *
   * @property elm
   * @type {DOM}
   */
  p.elm = 'body';


  /**
   * <h4>imagesloadedオブジェクト</h4>
   *
   * @property imagesloaded
   * @type {imagesloaded}
   */
  p.imagesloaded = null;


  /**
   * <h4>jQuery Deferred Objectを格納</h4>
   * ローディングの状態をdone, fail, proglessに反映しています
   *
   * @property $defer
   * @type {jQuery.Deferred}
   */
  p.$defer = null;


  /**
   * <h4>$imagesとimagesをあわせた画像点数</h4>
   *
   * @property length
   * @type {Number}
   */
  p.length = 0;


  /**
   * <h4>画像が読み込まれた数をカウントします</h4>
   *
   * @property count
   * @type {Number}
   */
  p.count = 0;


  /**
   * <h4>読み込み度数をインクリメントします</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  p.loadCount = 0;



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
   * @return {Loader}
   */
   Loader.extend = amp._extend;


  /**
   * <h4>ローター開始</h4>
   *
   * @method start
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  p.start = function(){
    var self = this;

    // 画像処理完了毎（成功・失敗）にインクリメントする
    self.imagesloaded.jqDeferred.progress(function(){
      self.count += 1;
    });

    // カウントを更新する
    self._update();

    return self.$defer.promise();
  };


  /**
   * <h4>カウントのアップデート</h4>
   *
   * @private
   * @method _update
   * @return {Void}
   */
  p._update = function(){
    var self = this,
    current = self.count / self.length * 100;

    self.loadCount += self.loadCount < current ? 1 : 0;

    self.$defer.notify(Math.ceil(self.loadCount));

    if(self.loadCount >= 100){
      self.$defer.resolve(self.imagesloaded);
    } else {
      amp.requestAnimationFrame(function(){
        self._update();
      });
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Loader]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Loader = Loader;
  root.amp.loader = loader;


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var Render, render, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>Hogan.jsに依存します</b>
   *
   * @class amp.Render
   * @constructor
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  Render = function($tmpl, ajaxOptions){
    this.$tmpl = $tmpl;
    this.tmpl  = Hogan.compile($tmpl.html());
    this.ajaxOptions = $.extend(true, {}, Render.ajaxOptions, ajaxOptions);

    // コンテキスト固定
    _.bindAll(this, 'getData', 'createTemplate', 'render');
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * Renderのショートハンド
   *
   * @static
   * @method render
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render} Renderインスタンスを返す
   */
  render = function($tmpl, ajaxOptions){
    var inst = new Render($tmpl, ajaxOptions);
    inst.init();
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
  Render.VERSION = '2.0';


  /**
   * <h4>$.ajaxのoption値</h4>
   * コンストラクタが呼び出されたときに、第二引数で指定したoptionsをmixinします<br>
   * jQuery Ajax API: http://api.jquery.com/jquery.ajax/<br>
   * ajaxOptions: { <ul><li>
   *   url     : null, {String} リクエストURL</li><li>
   *   chace   : false, {Boolean} キャッシュの有効</li><li>
   *   dataType: 'json' {String} データタイプ</li></ul>
   * }
   *
   * @static
   * @property ajaxOptions
   * @type {Object}
   */
  Render.ajaxOptions = {
    url     : null,
    chace   : false,
    dataType: 'json'
  };


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Render.prototype;


  /**
   * <h4>JSTemplate要素</h4>
   *
   * @property $tmpl
   * @type {jQuery}
   */
  p.$tmpl = null;


  /**
   * <h4>$tmplをHogan.jsでコンパイルしたデータ</h4>
   *
   * @property tmpl
   * @type {Object}
   */
  p.tmpl = null;


  /**
   * <h4>$.ajaxで取得したデータ</h4>
   *
   * @property data
   * @type {Object}
   */
  p.data = null;


  /**
   * <h4>jsTemplate要素に流し込むデータ</h4>
   *
   * @property tmplData
   * @type {Object}
   */
  p.tmplData = null;


  /**
   * <h4>DOM生成したあと、挿入された要素</h4>
   *
   * @property $el
   * @type {jQuery}
   */
  p.$el = null;


  /**
   * <h4>initが実行されたら、jQuery.Deferredオブジェクトを代入します</h4>
   *
   * @property $defer
   * @type {jQuery}
   */
  p.$defer = null;



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
   * @return {Render}
   */
   Render.extend = amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @return {jQuery.Deferred} 処理が完了したことを通知します
   */
  p.init = function(){
    var self = this;

    // 縦列に処理します
    this.$defer = $.stream(
      self.getData,
      self.createTemplate,
      self.render
    );

    return this.$defer;
  };


  /**
   * <h4>$.ajaxで、データを取得します</h4>
   *
   * @method getData
   * @return {jQuery.Deferred} 処理が、完了したことを通知します
   */
  p.getData = function(){
    var self = this;

    return $.ajax(self.ajaxOptions)
      .fail(self.ajaxFail)
      .done(function(data){
        self.data = data;
        self.ajaxDone(data);
      });
  };


  /**
   * <h4>ajax通信成功時、呼び出されます</h4>
   *
   * @method ajaxDone
   * @param {Object} data ajax通信の取得データ
   * @return {Render}
   */
  p.ajaxDone = function(){
    return this;
  };


  /**
   * <h4>ajax通信失敗時、呼び出されます。再度ページを読み込み直すか？</h4>
   *
   * @method ajaxFail
   * @param {Object} xhr
   * @param {Object} status
   * @param {Object} error
   * @return {Render}
   */
  p.ajaxFail = function(xhr, status, error){
    if(amp.isDevelop){
      console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
    if(root.confirm('データの取得に失敗しました。\n再度、ページを読み込み直しますか？')){
      location.reload();
    }
    return this;
  };


  /**
   * <h4>Hoganに流し込む、データを生成して、tmplDataに格納します</h4>
   * データ成型が必要な場合は、ここをExtendします
   *
   * @method createTemplate
   * @param {Object} data JSTに流し込むデータ
   * @return {Render}
   */
  p.createTemplate = function(data){
    this.tmplData = data || this.data;
    return this;
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   *
   * @method render
   * @return {Render}
   */
  p.render = function(){
    this.$el = $(this.tmpl.render(this.tmplData));
    this.$tmpl.replaceWith(this.$el);
    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Render]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Render = Render;
  root.amp.render = render;


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var Rollover, rollover, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>画像のロールオーバー</h4>
   *
   * @class amp.Rollover
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

(function(root, $){

  // 'use strict';

  var Scroll, scroll, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class amp.Scroll
   * @constructor
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可 初期： $('a[href^=#]')
   * @param  {Object} options オプション値 省略可 初期： Scroll.defaults
   * @return {Scroll}
   */
  Scroll = function($trigger, options){
    // $trigger指定がない場合、初期値を設定
    if(!$trigger || !($trigger instanceof jQuery)){
      options = $trigger;
      $trigger = $('a[href^=#]');
    }
    this.$trigger = $trigger;
    this.param = $.extend(true, {}, Scroll.defaults, {$page: $('html, body')}, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   * Scrollのショートハンド
   *
   * @static
   * @method scroll
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll} Scrollインスタンスを返す
   */
  scroll = function($trigger, options){
    var inst = new Scroll($trigger, options);
    inst.on();
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
  Scroll.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Scroll.prototype;


  /**
   * <h4>トリガーとなるa要素</h4>
   *
   * @property $trigger
   * @type {Object}
   */
  p.$trigger = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   $page        : null, // {jQuery} ラッパー要素 初期値: $('html, body') </li><li>
   *   adjust       : 0, // {Number} スクロール停止位置の調整値 </li><li>
   *   noScrollClass: 'no-scroll', // {String} スクロールキャンセルするクラス </li><li>
   *   duration     : 600, // {Number} スクロールスピード </li><li>
   *   easing       : 'easeOutExpo', // {String} イージング </li><li>
   *   begin        : $.noop, // {Function} スクロール開始前のコールバック </li><li>
   *   complete     : $.noop, // {Function} スクロール完了時のコールバック </li><ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Scroll.defaults = {
    $page        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no-scroll',
    duration     : 600,
    easing       : 'easeOutExpo',
    begin        : $.noop,
    complete     : $.noop
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



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
   * @return {Scroll}
   */
   Scroll.extend = amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Scroll}
   */
  p.on = function(){
    var self = this;

    // スクロールイベントの重複回避
    this.off();

    self.$trigger.on('click.Scroll', function(){
      return self.tween(self.$trigger.index(this));
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Scroll}
   */
  p.off = function(){
    this.$trigger.off('click.Scroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(num){
    var self = this,
    param = self.param,
    $trigger = self.$trigger.eq(num),
    $target = $($trigger.attr('href')),
    moveTo;

    if($target[0] && !$trigger.hasClass(param.noScrollClass)){
      moveTo = $target.offset().top - param.adjust;
      if($(window).scrollTop() !== moveTo){
        // 縦列処理します
        $.stream(
          param.begin,
          function(){
            return param.$page.stop(true, false).animate({scrollTop: moveTo}, param.duration, param.easing);
          },
          param.complete
        );
      }
      return false;
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object Scroll]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Scroll = Scroll;
  root.amp.scroll = scroll;


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var ScrollToggle, scrollToggle, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してのToggle処理</h4>
   *
   * @class amp.ScrollToggle
   * @constructor
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値
   * @return {ScrollToggle}
   */
  ScrollToggle = function($target, options){
    this.$target = $target;
    this.isShow  = $target.css('display') === 'block';
    this.param   = $.extend(true, {}, ScrollToggle.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してのToggle処理</h4>
   * ScrollToggleのショートハンド
   *
   * @static
   * @method scrollToggle
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  scrollToggle = function($target, options){
    var inst = new ScrollToggle($target, options);
    inst.on();
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
  ScrollToggle.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = ScrollToggle.prototype;


  /**
   * <h4>window要素</h4>
   *
   * @property $window
   * @type {jQuery}
   */
  p.$window = $(root);


  /**
   * <h4>表示・非表示する要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>表示されているか?</h4>
   *
   * @property isShow
   * @type {Boolean}
   */
  p.isShow = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   showY    : 300, // {Number} 表示されるoffsetY値 </li><li>
   *   show     : { opacity : 1}, // {Object} 表示アニメーション時のcssプロパティ </li><li>
   *   hide     : { opacity : 0}, // {Object} 非表示アニメーション時のcssプロパティ </li><li>
   *   duration : 400, // デュレーション </li><li>
   *   easing   : 'easeOutCubic', // イージング </li><li>
   *   showCall : $.noop // 表示されたときに呼び出す関数 </li><li>
   *   hideCall : $.noop // 非表示されたときに呼び出す関数 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  ScrollToggle.defaults = {
    showY    : 300,
    show     : { opacity : 1},
    hide     : { opacity : 0},
    duration : 400,
    easing   : 'easeOutCubic',
    showCall : $.noop,
    hideCall : $.noop
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



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
   * @return {ScrollToggle}
   */
   ScrollToggle.extend = amp._extend;


  /**
   * <h4>イベントオン</h4>
   *
   * @method on
   * @return {ScrollToggle}
   */
  p.on = function(){
    var self = this,
    param = self.param,
    offsetY;

    self.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.$window.scrollTop();

      // 表示・非表示
      if(!self.isShow && param.showY < offsetY){
        self.show();
      } else if(self.isShow && param.showY > offsetY){
        self.hide();
      }
    }).trigger('scroll.ScrollToggle');

    return this;
  };


  /**
   * <h4>イベントオフ</h4>
   *
   * @method off
   * @return {ScrollToggle}
   */
  p.off = function(){
    self.$window.off('scroll.ScrollToggle');
    return this;
  };



  /**
   * <h4>表示</h4>
   *
   * @method show
   * @return {ScrollToggle}
   */
  p.show = function(){
    var self = this;
    self.isShow = true;
    self.$target.css({display: 'block'}).css(self.param.hide)
    .stop(true, false).animate(self.param.show, self.param.duration, self.param.ease, self.param.showCall);

    return this;
  };


  /**
   * <h4>非表示</h4>
   *
   * @method hide
   * @return {ScrollToggle}
   */
  p.hide = function(){
    var self = this;
    self.isShow = false;
    self.$target.stop(true, false).animate(self.param.hide, self.param.duration, self.param.ease, function(){
      self.$target.css({display: 'none'});
      self.param.hideCall();
    });

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object ScrollToggle]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.ScrollToggle = ScrollToggle;
  root.amp.scrollToggle = scrollToggle;


}(window, jQuery));

(function(root, $){

  // 'use strict';

  var SmoothScroll, smoothScroll, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>スムーススクロール</h4>
   * WindowsPCのみ有効
   *
   * @class amp.SmoothScroll
   * @constructor
   * @param  {Object} options オプション値
   * @return {SmoothScroll}
   */
  SmoothScroll = function(options){
    this.$target = $('html, body');
    this.param = $.extend(true, {}, SmoothScroll.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>マウスホイールのスムーススクロール</h4>
   *
   * @static
   * @method smoothScroll
   * @param  {Object} options? オプション値 省略可
   * @return {SmoothScroll} SmoothScrollインスタンスを返す
   */
  smoothScroll = function(options){
    var smoothScroll = new SmoothScroll(options);
    smoothScroll.on();
    return smoothScroll;
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
  SmoothScroll.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = SmoothScroll.prototype;


  /**
   * <h4>スムーススクロールエリア</h4>
   * コンストラクタが呼び出し時に、$('html, body')が渡されます
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


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
  p.param = null;



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
  SmoothScroll.extend = amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method on
   * @return {SmoothScroll}
   */
  p.on = function(){
    var self = this;

    if(amp.isWindows()){
      self.$target.off('mousewheel.SmoothScroll')
      .on('mousewheel.SmoothScroll', function(event, move){
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
  p.off = function(){
    this.$target.off('mousewheel.SmoothScroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(event, move){
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
  p.toString = function(){
    return '[object SmoothScroll]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.SmoothScroll = SmoothScroll;
  root.amp.smoothScroll = smoothScroll;


}(window, jQuery));
