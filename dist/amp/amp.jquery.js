/**
 * AMP JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
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


var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class BoxHover
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   */
  function BoxHover($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.box_hover');
    }

    this.param = $.extend(true, {}, BoxHover.defaults, options);

    /**
     * <h4>ターゲット要素</h4>
     * @property param.$target
     * @type {jQuery}
     */
    this.param.$target = $target;
  }

  // 基底クラスを継承
  AMP.inherits(BoxHover, AMP.BASE_CLASS);

  // prototype
  var p = BoxHover.prototype;



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
  BoxHover.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'BoxHover';


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   *
   * @default
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
   * コンストラクタ呼び出し時の引数とBoxHover.defaultsを、mixinして格納します<br>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>BoxHoverインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover}
   */
  BoxHover.get = function($target, options){
    var instance = new BoxHover($target, options);
    instance.on();
    return instance;
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {BoxHover}
   */
  p.on = function(){
    var self = this;

    this.off();

    this.param.$target.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.param.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.param.hoverClass);
    })
    .on('click.BoxHover', function(){
      self._setLink($(this));
    });

    // フォーム要素はイベント伝播をキャンセル
    this.param.$target.find('label input select textarea').click(function(event){
      event.stopPropagation();
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {BoxHover}
   */
  p.off = function(){
    this.param.$target.css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover');
    return this;
  };


  /**
   * <h4>リンクの設定</h4>
   *
   * @private
   * @method _setLink
   * @param {Object} event イベントオブジェクト
   * @param {Object} param paramオブジェクト
   * @return {Void}
   */
  p._setLink = function($target){
    var $link = $target.find('.' + this.param.linkClass),
    $a = $target.find('a').eq(0);

    $a = $link[0] ? $link : $a;

    // リンク展開
    if($a.attr('target') === '_blank'){
      window.open($a.attr('href'), '_blank');
    } else {
      location.href = $a.attr('href');
    }
  };



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.BoxHover = BoxHover;
  AMP.boxHover = BoxHover.get;


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   * AMP.Easeをextendします
   *
   * @class Ease
   * @constructor
   */
  function Ease(){}

  // 基底クラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>jQuery easeing用ネームスペース</h4>
   *
   * @property $
   * @type {Object}
   */
  p.$ = {};


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

  AMP.Ease　= Ease;
  AMP.ease = new Ease();


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($target, split, isResize){

    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      isResize = split;
      split = $target;
      $target = $('.flat_height');
    }

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @property split
     * @type {Number}
     */
    this.param.split = AMP.isNumber(split) ? split : this.param.$target.length;


    /**
     * <h4>サイズ後、リセットしなおすか</h4>
     *
     * @property isResize
     * @type {Boolean}
     */
    this.param.isResize = AMP.isBoolean(isResize) ? isResize : true;
  }

  // 基底クラスを継承
  AMP.inherits(FlatHeight, AMP.BASE_CLASS);

  // prototype
  var p = FlatHeight.prototype;



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
  FlatHeight.VERSION = '3.0.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = FlatHeight.prototype;


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   * @return {FlatHeight}
   */
  FlatHeight.get = function($target, split, isResize){
    var instance = new FlatHeight($target, split, isResize);
    instance.addEvent();
    instance.setHeight();
    return instance;
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method addEvent
   * @return {FlatHeight}
   */
  p.addEvent = function(){
    var self = this;

    // fontresize
    if(AMP.isDevice('pc')){
      AMP.fontResize.on('change.FlatHeight', function(){
        self.setHeight();
      });
    }

    // window resize
    $(root).on('resizestop.FlatHeight', {timer: 50}, function(){
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
    if(!AMP.isNumber(num)){
      throw new TypeError(num + ' is not a Number');
    }
    this.param.split = num;
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
    total = self.param.$target.length,
    rest = total % self.param.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.param.$target.height('auto');

    if(1 < self.param.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.param.$target.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.param.split === 0){
          var _start = rowCount * self.param.split,
          _end = (rowCount += 1) * self.param.split;

          self.param.$target.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.param.$target.slice(rowCount * self.param.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.FlatHeight = FlatHeight;
  AMP.flatHeight = FlatHeight.get;



}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ロールオーバー</h4>
   *
   * @class Rollover
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
   * @property defaults
   * @type {Object}
   */
  Rollover.defaults = {
    groupClass : 'group_rover',
    activeClass: 'active',
    noOverClass: 'no_rover',
    postfix    : '_on'
  };


  /**
   * <h4>ロールオーバー要素の初期値</h4>
   *
   * @property imageClass
   * @type {String}
   */
  p.imageClass = 'img.rover, input.rover, .all_rover img';



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
      $images = $(self.imageClass);
    }

    var param = $.extend(true, {}, Rollover.defaults, options);

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
      $images = $(this.imageClass);
    }

    var param = $.extend(true, {}, Rollover.defaults, options);

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
    param = $.extend(true, {}, Rollover.defaults, options);

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
    param = $.extend(true, {}, Rollover.defaults, options);

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
   * @method _getImageSrc
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

  AMP.Rollover = Rollover;
  AMP.rollover = new Rollover();



}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class AMP.Scroll
   * @constructor
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可 初期： $('a[href^=#]')
   * @param  {Object} options オプション値 省略可 初期： Scroll.defaults
   */
  function Scroll($trigger, options){
    // $trigger指定がない場合、初期値を設定
    if(!$trigger || !($trigger instanceof jQuery)){
      options = $trigger;
      $trigger = $('a[href^=#]');
    }

    this.param = $.extend(true, {}, Scroll.defaults, {$html: $('html, body')}, options);

    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property param.$trigger
     * @type {Object}
     */
    this.param.$trigger = $trigger;
  }

  // 基底クラスを継承
  AMP.inherits(Scroll, AMP.BASE_CLASS);

  // prototype
  var p = Scroll.prototype;



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
  Scroll.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Scroll';


  /**
   * <h4>オプション値</h4>
   *
   * @default
   * defaults: { <ul><li>
   *   $html        : null, // {jQuery} ラッパー要素 初期値: $('html, body') </li><li>
   *   adjust       : 0, // {Number} スクロール停止位置の調整値 </li><li>
   *   noScrollClass: 'no-scroll', // {String} スクロールキャンセルするクラス </li><li>
   *   duration     : 600, // {Number} スクロールスピード </li><li>
   *   ease         : 'easeOutExpo', // {String} イージング </li><li>
   *   begin        : $.noop, // {Function} スクロール開始前のコールバック </li><li>
   *   complete     : $.noop, // {Function} スクロール完了時のコールバック </li><ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Scroll.defaults = {
    $html        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no-scroll',
    duration     : 800,
    ease         : 'easeOutQuint',
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
   * <h4>Scrollインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll}
   */
  Scroll.get = function($trigger, options){
    var instance = new Scroll($trigger, options);
    instance.on();
    return instance;
  };


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

    self.param.$trigger.on('click.Scroll', function(){
      return self.tween(self.param.$trigger.index(this));
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
    this.param.$trigger.off('click.Scroll');
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
    $trigger = self.param.$trigger.eq(num),
    $target = $($trigger.attr('href')),
    moveTo;

    if($target[0] && !$trigger.hasClass(param.noScrollClass)){
      moveTo = $target.offset().top - param.adjust;
      if($(root).scrollTop() !== moveTo){
        // 縦列処理します
        $.stream(
          param.begin,
          function(){
            return param.$html.velocity('stop')
            .velocity('scroll', {offset: moveTo, duration: param.duration, easing: param.ease});
          },
          param.complete
        );
      }
      return false;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Scroll = Scroll;
  AMP.scroll = Scroll.get;


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してのToggle処理</h4>
   *
   * @class ScrollToggle
   * @constructor
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値
   */
  function ScrollToggle($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.scroll_toggle');
    }

    this.param   = $.extend(true, {}, ScrollToggle.defaults, options);

    /**
     * <h4>表示・非表示する要素</h4>
     *
     * @property $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>window要素</h4>
     *
     * @property $window
     * @type {jQuery}
     */
    this.param.$window = $(root);

    /**
     * <h4>Display:Block表示されているか?</h4>
     *
     * @property isDisplay
     * @type {Boolean}
     */
    this.param.isDisplay = $target.css('display') === 'block';
  }

  // 基底クラスを継承
  AMP.inherits(ScrollToggle, AMP.BASE_CLASS);

  // prototype
  var p = ScrollToggle.prototype;



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
  ScrollToggle.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ScrollToggle';


  /**
   * <h4>オプション初期値</h4>
   *
   * @default
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
    showY   : 300,
    show    : { opacity : 1},
    hide    : { opacity : 0},
    duration: 500,
    easing  : 'easeInSine',
    showCall: $.noop,
    hideCall: $.noop,
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
   * <h4>ScrollToggleインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $target 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  ScrollToggle.get = function($target, options){
    var instance = new ScrollToggle($target, options);
    instance.on();
    return instance;
  };


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

    self.param.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.param.$window.scrollTop();

      // 表示・非表示
      if(!self.param.isDislpay && param.showY < offsetY){
        self.show();
      } else if(self.param.isDislpay && param.showY > offsetY){
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
    this.param.$window.off('scroll.ScrollToggle');
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

    self.param.isDislpay = true;

    self.param.$target.css({display: 'block'}).css(self.param.hide)
    .velocity('stop')
    .velocity(self.param.show, self.param.duration, self.param.ease, self.param.showCall);

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

    self.param.isDislpay = false;

    self.param.$target
    .velocity('stop')
    .velocity(self.param.hide, self.param.duration, self.param.ease, function(){
      self.param.$target.css({display: 'none'});
      self.param.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.ScrollToggle = ScrollToggle;
  AMP.scrollToggle = ScrollToggle.get;


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スムーススクロール</h4>
   * WindowsPCのみ有効
   *
   * @class SmoothScroll
   * @constructor
   */
  function SmoothScroll(options){
    /**
     * <h4>スムーススクロールエリア</h4>
     * コンストラクタが呼び出し時に、$('html, body')が渡されます
     *
     * @property param.$target
     * @type {jQuery}
     */
    var _param = {
      $target: $('html, body')
    };

    this.param = $.extend(true, SmoothScroll.defaults, _param, options);
  }

  // 基底クラスを継承
  AMP.inherits(SmoothScroll, AMP.BASE_CLASS);

  // prototype
  var p = SmoothScroll.prototype;



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
  SmoothScroll.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'SmoothScroll';


  /**
   * <h4>オプション初期値</h4>
   *
   * @default
   * defaults: { <ul><li>
   *   $target : $('html, body'), // {jQuery} ターゲット要素 </li><li>
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
    $target : null,
    amount  : 500,
    duration: 500,
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
   * <h4>SmoothScrollインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {Object} options? オプション値 省略可
   * @return {SmoothScroll}
   */
  SmoothScroll.get = function(options){
    var instance = new SmoothScroll(options);
    instance.on();
    return instance;
  };


  /**
   * <h4>初期化</h4>
   *
   * @method on
   * @return {SmoothScroll}
   */
  p.on = function(){
    var self = this;

    // WindowsPCのみ有効
    if(AMP.isWindows()){
      self.param.$target.off('mousewheel.SmoothScroll')
      .on('mousewheel.SmoothScroll', function(){
        self.tween(arguments[1]);
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
    this.param.$target.off('mousewheel.SmoothScroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  p.tween = function(move){
    var self = this,
    param = self.param,
    y = AMP.isWebkit() ? self.param.$target.eq(1).scrollTop() : self.param.$target.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.param.$target.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: param.duration, easing: param.ease});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.SmoothScroll = SmoothScroll;
  AMP.smoothScroll = SmoothScroll.get;


}(window, jQuery));
