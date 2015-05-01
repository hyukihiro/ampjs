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
   * @class AMP.$.BoxHover
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   */
  function BoxHover($boxHover, options){

    // $boxHover指定がない場合、初期値を設定
    if(!$boxHover || !($boxHover instanceof jQuery)){
      options = $boxHover;
      $boxHover = $('.box_hover');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = $.extend(true, {}, BoxHover.boxHoverOptions, options);

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.box_hover')
     * @property params.$boxHover
     * @type {jQuery}
     */
    this.params.$boxHover = $boxHover;
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
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します
   *
   * @static
   * @property boxHoverOptions
   * @type {Object}
   */
  /**
   * <h4>ホバー時に付けるクラス名</h4>
   *
   * @static
   * @property boxHoverOptions.hoverClass
   * @default hover
   * @type {String}
   */
  /**
   * <h4>複数リンクがある場合、優先するリンククラス</h4>
   *
   * @static
   * @property boxHoverOptions.linkClass
   * @default link
   * @type {String}
   */
  BoxHover.boxHoverOptions = {
    hoverClass: 'hover',
    linkClass : 'link'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>BoxHoverインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $boxHover 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover}
   */
  BoxHover.get = function($boxHover, options){
    var instance = new BoxHover($boxHover, options);
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

    this.params.$boxHover.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.params.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.params.hoverClass);
    })
    .on('click.BoxHover', function(){
      self._setLink($(this));
    });

    // フォーム要素はイベント伝播をキャンセル
    this.params.$boxHover.find('label input select textarea').click(function(event){
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
    this.params.$boxHover.css({cursor: 'auto'})
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
    var $link = $target.find('.' + this.params.linkClass),
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

  AMP.$ = AMP.$ = {};
  AMP.$.BoxHover = BoxHover;


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   *
   * @class AMP.Ease
   * @extends AMP.Ease
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
   * <h4>jQuery Easing用ネームスペース</h4>
   * <a href="http://easings.net/ja" target="_blank">Easingサンプルサイト</a>
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

  AMP.Ease = Ease;
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
   * @class AMP.$.FlatHeight
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $flatHeight 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($flatHeight, split, isResize){

    // $flatHeight指定がない場合、初期値を設定
    if(!$flatHeight || !($flatHeight instanceof jQuery)){
      isResize = split;
      split = $flatHeight;
      $flatHeight = $('.flat_height');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = {};

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property params.$flatHeight
     * @type {jQuery}
     */
    this.params.$flatHeight = $flatHeight;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @default $flatHeight.length
     * @property params.split
     * @type {Number}
     */
    this.params.split = AMP.isNumber(split) ? split : $flatHeight.length;

    /**
     * <h4>サイズ後、リセットしなおすか</h4>
     *
     * @default true
     * @property params.isResize
     * @type {Boolean}
     */
    this.params.isResize = AMP.isBoolean(isResize) ? isResize : true;
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
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'FlatHeight';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>FlatHeightインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $flatHeight 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   * @return {FlatHeight}
   */
  FlatHeight.get = function($flatHeight, split, isResize){
    var instance = new FlatHeight($flatHeight, split, isResize);
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
      if(self.params.isResize){
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
    this.params.split = num;
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
    total = self.params.$flatHeight.length,
    rest = total % self.params.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.params.$flatHeight.height('auto');

    if(1 < self.params.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.params.$flatHeight.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.params.split === 0){
          var _start = rowCount * self.params.split,
          _end = (rowCount += 1) * self.params.split;

          self.params.$flatHeight.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.params.$flatHeight.slice(rowCount * self.params.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.FlatHeight = FlatHeight;



}(window, jQuery));

var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * <em>imagesloaded.jsに依存します</em>
   *
   * @class AMP.Loader
   * @constructor
   * @param  {DOM} el 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Object} options オプション値
   */
  function Loader(el){
    /**
     * <h4>パラメーター格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = {};

    /**
     * <h4>対象のimgを囲う要素</h4>
     *
     * @property el
     * @type {DOM}
     */
    this.params.el = el || 'body';

    /**
     * <h4>imagesloadedオブジェクト</h4>
     *
     * @property imagesloaded
     * @type {imagesloaded}
     */
    this.params.imagesloaded = imagesLoaded(this.params.el);

    /**
     * <h4>画像数</h4>
     *
     * @property length
     * @type {Number}
     */
    this.params.length = this.params.imagesloaded.images.length;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property count
     * @type {Number}
     */
    this.params.updateCount = 0;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property loadCount
     * @type {Number}
     */
    this.params.loadCount = 0;

    // start
    this._start();
  };

  // 基底クラスを継承
  AMP.inherits(Loader, AMP.BASE_CLASS);

  // prototype
  var p = Loader.prototype;



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
  Loader.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Loader';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>FlatHeightインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param {DOM} el 対象のエリア要素
   * @return {Loader}
   */
  Loader.get = function(el){
    return new Loader(el);
  };


  /**
   * <h4>ローター開始</h4>
   *
   * @method _start
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  p._start = function(){
    var self = this;

    // 画像処理完了毎（成功・失敗）にインクリメントする
    self.params.imagesloaded.on('progress', function(){
      self.params.updateCount += 1;
      self._progress.apply(self, AMP.argsToArray(arguments));
    });

    // fail: 読込み失敗毎
    self.params.imagesloaded.on('fail', function(){
      self._failCall.apply(self, AMP.argsToArray(arguments));
    });

    // done: 読込み成功毎
    self.params.imagesloaded.on('done', function(){
      self._doneCall.apply(self, AMP.argsToArray(arguments));
    });

    // always: 全ての読込み処理完了時
    self.params.imagesloaded.on('always', function(e){
      self._alwaysCall.apply(self, AMP.argsToArray(arguments));
    });


    // カウントを更新する
    self._update();

    return this;
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
    current = self.params.updateCount / self.params.length * 100;

    // カウンターのインクリメント
    if(self.params.loadCount < current){
      self.params.loadCount += 1;
    }

    self._updateCall(Math.ceil(self.params.loadCount));

    if(100 <= self.params.loadCount){
      self._compleatCall();
    } else {
      AMP.requestAnimationFrame(function(){
        self._update();
      });
    }
  };


  /**
   * <h4>画像読み込み処理毎に呼び出されます</h4>
   *
   * @method progress
   * @type {Function}
   */

  p.progress = function(callback){
    this._progress = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み処理毎に呼び出されます</h4>
   *
   * @private
   * @method _progress
   * @type {Function}
   */
  p._progress = AMP.noop;


  /**
   * <h4>画像読み込み失敗毎に呼び出されます</h4>
   *
   * @method fail
   * @type {Function}
   */
  p.fail = function(callback){
    this._failCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み失敗毎に呼び出されます</h4>
   *
   * @private
   * @method _failCall
   * @type {Function}
   */
  p._failCall = AMP.noop;


  /**
   * <h4>画像読み込み毎に呼び出されます</h4>
   *
   * @method done
   * @type {Function}
   */
  p.done = function(callback){
    this._doneCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み毎に呼び出されます</h4>
   *
   * @private
   * @method _doneCall
   * @type {Function}
   */
  p._doneCall = AMP.noop;


  /**
   * <h4>画像読み込み処理完了時に呼び出されます</h4>
   *
   * @method always
   * @type {Function}
   */
  p.always = function(callback){
    this._alwaysCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み処理完了時に呼び出されます</h4>
   *
   * @private
   * @method _alwaysCall
   * @type {Function}
   */
  p._alwaysCall = AMP.noop;


  /**
   * <h4>カウントアップ時に呼び出されます</h4>
   *
   * @method update
   * @type {Function}
   */
  p.update = function(callback){
    this._updateCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>カウントアップ時に呼び出されます</h4>
   *
   * @private
   * @method _updateCall
   * @type {Function}
   */
  p._updateCall = AMP.noop;


  /**
   * <h4>カウント完了時に呼び出されます</h4>
   *
   * @method compleat
   * @type {Function}
   */
  p.compleat = function(callback){
    this._compleatCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>カウント完了時に呼び出されます</h4>
   *
   * @private
   * @method _compleatCall
   * @type {Function}
   */
  p._compleatCall = AMP.noop;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Loader = Loader;


}(window));

var AMP = AMP || {};


(function(root, $, Hogan){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <em>Hogan.jsに依存します</em>
   *
   * @class AMP.$.Render
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $tmp jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   */
  function Render($tmp, ajaxOptions){

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    /**
     * <h4>js Template要素</h4>
     *
     * @property params.$tmp
     * @type {jQuery}
     */
    /**
     * <h4>レンダリングエリアのラッパー要素</h4>
     *
     * 初回renderが呼び出されると、自動的にレンダリングエリアを囲う要素を生成します<br>
     * これは、jQueryでDOMを再構築するより、innerHTMLで再構築した方がパフォーマンスがいい為です
     *
     * @property params.$el
     * @type {Hogan}
     */
    /**
     * <h4>Hoganテンプレート</h4>
     *
     * @property params.template
     * @type {Hogan}
     */
    /**
     * <h4>レンダリングオリジナルデータ保管</h4>
     *
     * @property params.originalData
     * @type {Arrary|Object}
     */
    /**
     * <h4>レンダリングデータ</h4>
     *
     * @property params.renderData
     * @type {Arrary|Object}
     */
    /**
     * <h4>$.ajaxオプション値</h4>
     * Render.ajaxOptionsとajaxOptionsをmixinした値を格納します
     *
     * @property params.ajaxOptions
     * @type {Object}
     */
    this.params = {
      $tmp        : $tmp,
      $el         : null,
      template    : Hogan.compile($tmp.html()),
      originalData: null,
      renderData  : null,
      ajaxOptions : $.extend(true, {}, Render.ajaxOptions, ajaxOptions)
    };
  }

  // 基底クラスを継承
  AMP.inherits(Render, AMP.BASE_CLASS);

  // prototype
  var p = Render.prototype;


  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>Renderインスタンスの生成</h4>
   *
   * @static
   * @method render
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  Render.get = function($tmp, ajaxOptions){
    var inst = new Render($tmp, ajaxOptions);
    inst.start();
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
  Render.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Render';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します<br>
   * <a href="http://api.jquery.com/jquery.ajax/" target="_blank">jQuery Ajax API</a>
   *
   * @static
   * @property ajaxOptions
   * @type {Object}
   */
  /**
   * <h4>リクエストURL</h4>
   *
   * @property ajaxOptions.url
   * @type {String}
   */
  /**
   * <h4>キャッシュの有効化</h4>
   *
   * @property ajaxOptions.chace
   * @default false
   * @type {String}
   */
  /**
   * <h4>取得するデータタイプ</h4>
   *
   * @property ajaxOptions.dataType
   * @default json
   * @type {String}
   */
  Render.ajaxOptions = {
    url     : null,
    chace   : false,
    dataType: 'json'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   * 処理が完了したことを通知します
   *
   * @method start
   * @return {jQuery.Deferred}
   */
  p.start = function(){
    var self = this;

    // 縦列に処理します
    return $.stream(
      function(){
        return self.ajax();
      },
      function(){
        return self.setRenderData();
      },
      function(){
        return self.render();
      }
    );
  };


  /**
   * <h4>$.ajaxで、データを取得します</h4>
   *
   * @method getAjax
   * @return {jQuery.Deferred} 処理が、完了したことを通知します
   */
  p.ajax = function(){
    var self = this;

    return $.ajax(self.params.ajaxOptions)
    .fail(self.ajaxFail)
    .done(function(data){
      self.params.originalData = data;
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
  p.ajaxDone = function(){};


  /**
   * <h4>ajax通信失敗時、呼び出されます</h4>
   * 再度ページを読み込み直すか？
   *
   * @method ajaxFail
   * @return {Render}
   */
  p.ajaxFail = function(xhr, status, error){
    if(AMP.isDevelop){
      console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
    if(root.confirm('データの取得に失敗しました。\n再度、ページを読み込み直しますか？')){
      location.reload();
    }
    return this;
  };


  /**
   * <h4>Hoganに流し込む、データを生成して、tmplDataに格納します</h4>
   *
   * @method setRenderData
   * @param {Object} data JSTに流し込むデータ
   * @return {Render}
   */
  p.setRenderData = function(renderData){
    if(renderData){
      this.params.renderData = renderData;
    } else {
      if(AMP.isArray(this.params.originalData)){
        this.params.renderData = this.params.originalData.concat();

      } else {
        this.params.renderData = $.extend({}, this.params.originalData);
      }
    }

    return this;
  };


  /**
   * <h4>レンダーデータのフィルタリングの際使用します</h4>
   *
   * @method filtter
   * @return {Object}
   */
  p.filtter = function(data){
    return data;
  };


  /**
   * <h4>レンダリングされている場合、データを削除します</h4>
   * レンダリングされていない場合は、レンダーエリアをラップする要素を生成します
   *
   * @method removePrevHTML
   * @return {Render}
   */
  p.removePrevHTML = function(){
    if(!this.params.$el){
      this.params.$tmp.wrapAll('<div class="js_render" />');
      this.params.$el = this.params.$tmp.parent();
    } else {
      this.$el.children().remove();
    }
    return this;
  };


  /**
   * <h4>生成するHTMLデータがない場合呼び出されます</h4>
   *
   * @default '<p class="not_found">データを取得できませんでした。</p>'
   * @method notFound
   * @return {String}
   */
  p.notFound = function(){
    return '<p class="not_found">データを取得できませんでした。</p>';
  };


  /**
   * <h4>レンダリングするHTMLを生成します</h4>
   *
   * @method createHTML
   * @param  {Object|Array} data レンダリングデータ
   * @return {DOM}
   */
  p.createHTML = function(data){
    this.setRenderData(data);
    return this.params.template.render(this.params.renderData) || this.notFound();
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   *
   * @method render
   * @return {Render}
   */
  p.render = function(data){
    this.removePrevHTML();
    this.params.$el[0].innerHTML = this.createHTML(data);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Render = Render;



}(window, jQuery, Hogan));

var AMP = AMP || {};

(function(root, $){

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

  AMP.$ = AMP.$ || {};
  AMP.$.Rollover = Rollover;
  AMP.$.rollover = new Rollover();



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
   * @class AMP.$.Scroll
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $scrollTrigger トリガーとなるa要素
   * @param  {Object} options オプション値
   */
  function Scroll($scrollTrigger, options){
    // $scrollTrigger指定がない場合、初期値を設定
    if(!$scrollTrigger || !($scrollTrigger instanceof jQuery)){
      options = $scrollTrigger;
      $scrollTrigger = $('a[href^=#]');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = $.extend(true, {}, Scroll.scrollOptions, {$html: $('html, body')}, options);

    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property params.$scrollTrigger
     * @type {Object}
     */
    this.params.$scrollTrigger = $scrollTrigger;
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
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します
   *
   * @static
   * @property scrollOptions
   * @type {Object}
   */
  /**
   * <h4>ページ要素</h4>
   *
   * @static
   * @property scrollOptions.$html
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>停止位置調整値</h4>
   *
   * @static
   * @property scrollOptions.adjust
   * @default 0
   * @type {Number}
   */
  /**
   * <h4>スクロールしないトリガークラス名</h4>
   *
   * @static
   * @property scrollOptions.noScrollClass
   * @default no_scroll
   * @type {String}
   */
  /**
   * <h4>duration</h4>
   *
   * @static
   * @property scrollOptions.duration
   * @default 800
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @static
   * @property scrollOptions.ease
   * @default easeOutQuint
   * @type {String}
   */
  /**
   * <h4>スクロール前のコールバック</h4>
   *
   * @static
   * @property beginCall
   * @default $.noop
   * @type {String}
   */
  /**
   * <h4>スクロール後のコールバック</h4>
   *
   * @static
   * @property compCall
   * @default $.noop
   * @type {String}
   */
  Scroll.scrollOptions = {
    $html        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no-scroll',
    duration     : 800,
    ease         : 'easeOutQuint',
    beginCall    : $.noop,
    compCall     : $.noop
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Scrollインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $scrollTrigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll}
   */
  Scroll.get = function($scrollTrigger, options){
    var instance = new Scroll($scrollTrigger, options);
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

    self.params.$scrollTrigger.on('click.Scroll', function(){
      return self.tween(self.params.$scrollTrigger.index(this));
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
    this.params.$scrollTrigger.off('click.Scroll');
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
    param = self.params,
    $scrollTrigger = self.params.$scrollTrigger.eq(num),
    $target = $($scrollTrigger.attr('href'));

    if($target[0] && !$scrollTrigger.hasClass(param.noScrollClass)){
      var moveTo = $target.offset().top - param.adjust;

      if($(root).scrollTop() !== moveTo){
        $.stream(
          param.beginCall,
          function(){
            return param.$html.velocity('stop')
            .velocity('scroll', {offset: moveTo, duration: param.duration, easing: param.ease});
          },
          param.compCall
        );
      }

      return false;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Scroll = Scroll;


}(window, jQuery));

var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スクロール時、座標を判定してToggle処理をします</h4>
   *
   * @class AMP.$.ScrollToggle
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $scrollToggle 表示・非表示する要素
   * @param  {Object} options オプション値
   */
  function ScrollToggle($scrollToggle, options){

    // $scrollToggle指定がない場合、初期値を設定
    if(!$scrollToggle || !($scrollToggle instanceof jQuery)){
      options = $scrollToggle;
      $scrollToggle = $('.scroll_toggle');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = $.extend(true, {}, ScrollToggle.scrollToggleOptions, options);

    /**
     * <h4>表示・非表示する要素</h4>
     *
     * @default $('.scroll_toggle')
     * @property params.$scrollToggle
     * @type {jQuery}
     */
    this.params.$scrollToggle = $scrollToggle;

    /**
     * <h4>window要素</h4>
     *
     * @property params.$window
     * @type {jQuery}
     */
    this.params.$window = $(window);

    /**
     * <h4>Display:Block表示の状態</h4>
     *
     * @property params.isDisplay
     * @type {Boolean}
     */
    this.params.isDisplay = $scrollToggle.css('display') !== 'none';
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
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します
   *
   * @static
   * @property scrollToggleOptions
   * @type {Object}
   */
  /**
   * <h4>表示されるY値</h4>
   *
   * @static
   * @property showY
   * @default 300
   * @type {Number}
   */
  /**
   * <h4>表示のスタイル</h4>
   *
   * @static
   * @property showY
   * @default { opacity : 1}
   * @type {Object}
   */
  /**
   * <h4>非表示のスタイル</h4>
   *
   * @static
   * @property showY
   * @default { opacity : 0}
   * @type {Object}
   */
  /**
   * <h4>duration</h4>
   *
   * @static
   * @property duration
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @static
   * @property ease
   * @default easeInSine
   * @type {String}
   */
  /**
   * <h4>表示後のコールバック</h4>
   *
   * @static
   * @property showCall
   * @default $.noop
   * @type {String}
   */
  /**
   * <h4>非表示後のコールバック</h4>
   *
   * @static
   * @property hideCall
   * @default $.noop
   * @type {String}
   */
  ScrollToggle.scrollToggleOptions = {
    showY   : 300,
    show    : { opacity : 1},
    hide    : { opacity : 0},
    duration: 500,
    ease    : 'easeInSine',
    showCall: $.noop,
    hideCall: $.noop
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ScrollToggleインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $scrollToggle 表示・非表示する要素
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  ScrollToggle.get = function($scrollToggle, options){
    var instance = new ScrollToggle($scrollToggle, options);
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
    param = self.params,
    offsetY;

    self.params.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      offsetY = self.params.$window.scrollTop();

      // 表示・非表示
      if(!self.params.isDislpay && param.showY < offsetY){
        self.show();
      } else if(self.params.isDislpay && param.showY > offsetY){
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
    this.params.$window.off('scroll.ScrollToggle');
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

    self.params.isDislpay = true;

    self.params.$scrollToggle.css({display: 'block'}).css(self.params.hide)
    .velocity('stop')
    .velocity(self.params.show, self.params.duration, self.params.ease, self.params.showCall);

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

    self.params.isDislpay = false;

    self.params.$scrollToggle
    .velocity('stop')
    .velocity(self.params.hide, self.params.duration, self.params.ease, function(){
      self.params.$scrollToggle.css({display: 'none'});
      self.params.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.ScrollToggle = ScrollToggle;


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
   * @class AMP.$.SmoothScroll
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function SmoothScroll(options){

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property params
     * @type {Object}
     */
    this.params = $.extend(true,
      {},
      SmoothScroll.smoothScrollOptions,
      {$page: $('html, body')},
      options
    );
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
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamsオブジェクトに格納します
   *
   * @static
   * @property smoothScrollOptions
   * @type {Object}
   */
    /**
   * <h4>スムーススクロールエリア</h4>
   *
   * @property smoothScrollOptions.$page
   * @default $('html, body')
   * @type {jQuery}
   */
  /**
   * <h4>スクロール量</h4>
   *
   * @property smoothScrollOptions.amount
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>duration</h4>
   *
   * @property smoothScrollOptions.duration
   * @default 500
   * @type {Number}
   */
  /**
   * <h4>easing</h4>
   *
   * @property smoothScrollOptions.ease
   * @default easeOutCubic
   * @type {String}
   */
  SmoothScroll.smoothScrollOptions = {
    $page   : null,
    amount  : 500,
    duration: 500,
    ease    : 'easeOutCubic'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>SmoothScrollインスタンスの生成</h4>
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
      self.params.$page.off('mousewheel.SmoothScroll')
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
    this.params.$page.off('mousewheel.SmoothScroll');
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
    param = self.params,
    y = AMP.isWebkit() ? self.params.$page.eq(1).scrollTop() : self.params.$page.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.params.$page.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: param.duration, easing: param.ease});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.SmoothScroll = SmoothScroll;


}(window, jQuery));
