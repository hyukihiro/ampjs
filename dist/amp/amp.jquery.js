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
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, BoxHover.boxHoverOptions, options);

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.box_hover')
     * @property param.$boxHover
     * @type {jQuery}
     */
    this.param.$boxHover = $boxHover;
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
  BoxHover.VERSION = '3.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'BoxHover';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
   *
   * @static
   * @property boxHoverOptions
   * @type {Object}
   */
  /**
   * <h4>ホバー時に、box要素に付与するクラス名</h4>
   *
   * @static
   * @property boxHoverOptions.hoverClass
   * @default hover
   * @type {String}
   */
  /**
   * <h4>Box内に複数リンクがある場合、優先対象に指定するリンククラス名</h4>
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

    this.param.$boxHover.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.param.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.param.hoverClass);
    })
    .on('click.BoxHover', function(){
      self._setLink();
    });

    // フォーム要素はイベント伝播をキャンセル
    this.param.$boxHover.find('label input select textarea').click(function(event){
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
    this.param.$boxHover.css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover');
    return this;
  };


  /**
   * <h4>ページ遷移</h4>
   *
   * @method transition
   * @return {Void}
   */
  p.transition = function(){
    var $link = this.param.$boxHover.find('.' + this.param.linkClass),
    $a = $link[0] ? $link : $target.find('a').eq(0);

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

  // AMP.Easeクラスを継承
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
     * @property param
     * @type {Object}
     */
    this.param = {};

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property param.$flatHeight
     * @type {jQuery}
     */
    this.param.$flatHeight = $flatHeight;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @default $flatHeight.length
     * @property param.split
     * @type {Number}
     */
    this.param.split = AMP.isNumber(split) ? split : $flatHeight.length;

    /**
     * <h4>リサイズ後、セットし直すか？</h4>
     *
     * @default true
     * @property param.isResize
     * @type {Boolean}
     */
    this.param.isResize = AMP.isBoolean(isResize) ? isResize : true;


    this._addEvent();
    this.setHeight();
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
  FlatHeight.VERSION = '3.0.1';


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
    return new FlatHeight($flatHeight, split, isResize);
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @private
   * @method addEvent
   * @return {FlatHeight}
   */
  p._addEvent = function(){
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
    total = self.param.$flatHeight.length,
    rest = total % self.param.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.param.$flatHeight.height('auto');

    if(1 < self.param.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.param.$flatHeight.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.param.split === 0){
          var _start = rowCount * self.param.split,
          _end = (rowCount += 1) * self.param.split;

          self.param.$flatHeight.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.param.$flatHeight.slice(rowCount * self.param.split, total).height(maxHeight);
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
   * @class AMP.$.Loader
   * @constructor
   * @param  {DOM} el 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Object} options オプション値
   */
  function Loader(el){
    /**
     * <h4>パラメーター格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = {};

    /**
     * <h4>対象のimgを囲う要素</h4>
     *
     * @property el
     * @type {DOM}
     */
    this.param.el = el || 'body';

    /**
     * <h4>imagesloadedオブジェクト</h4>
     *
     * @property imagesloaded
     * @type {imagesloaded}
     */
    this.param.imagesloaded = imagesLoaded(this.param.el);

    /**
     * <h4>画像数</h4>
     *
     * @property length
     * @type {Number}
     */
    this.param.length = this.param.imagesloaded.images.length;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property count
     * @type {Number}
     */
    this.param.updateCount = 0;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property loadCount
     * @type {Number}
     */
    this.param.loadCount = 0;

    // start
    this._start();
  }

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
   * <h4>Loaderインスタンス生成</h4>
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
    self.param.imagesloaded.on('progress', function(){
      self.param.updateCount += 1;
      self._progress.apply(self, AMP.argsToArray(arguments));
    });

    // fail: 読込み失敗毎
    self.param.imagesloaded.on('fail', function(){
      self._failCall.apply(self, AMP.argsToArray(arguments));
    });

    // done: 読込み成功毎
    self.param.imagesloaded.on('done', function(){
      self._doneCall.apply(self, AMP.argsToArray(arguments));
    });

    // always: 全ての読込み処理完了時
    self.param.imagesloaded.on('always', function(){
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
    current = self.param.updateCount / self.param.length * 100;

    // カウンターのインクリメント
    if(self.param.loadCount < current){
      self.param.loadCount += 1;
    }

    self._updateCall(Math.ceil(self.param.loadCount));

    if(100 <= self.param.loadCount){
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

  AMP.$ = AMP.$ || {};
  AMP.$.Loader = Loader;


}(window));

var AMP = AMP || {};


(function(root, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>メディアクエリのブレイクポイントに応じて、画像を書き換えます</h4>
   * !!! AMP.Mediaqueryを継承しています
   *
   * @class AMP.$.MediaImageChange
   * @extends AMP.Mediaquery
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @constructor
   */
	function MediaImageChange($images, options){
		if(!$images || !($images instanceof jQuery)){
      options = $images;
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
		this.param = $.extend(true,
      {},
      MediaImageChange.mediaImagesOptions,
      options
    );

    if(!$images || !($images instanceof jQuery)){
      $images = $('img[' + this.param.attrKey + ']');
    }

    /**
     * <h4>画像を書き換える要素</h4>
     *
     * @property param.$images
     * @type {jQuery}
     */
    this.param.$images = $images;

    /**
     * <h4>現在の状態</h4>
     *
     * @property param.current
     * @type {String}
     */
    this.param.current = null;

		// superClass constructor call
		MediaImageChange.Mediaquery_constructor.call(this, this.param.element);
	}

  // AMP.Mediaqueryクラスを継承
  AMP.inherits(MediaImageChange, AMP.Mediaquery);

  // prototype
  var p = MediaImageChange.prototype;



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  MediaImageChange.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'MediaImageChange';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   *
   * @static
   * @property mediaImagesOptions
   * @type {Object}
   */
  /**
   * <h4>監視対象要素</h4>
   *
   * @static
   * @property mediaImagesOptions.element
   * @type {DOM}
   */
  /**
   * <h4>画像ファイルパス格納属性名</h4>
   *
   * @static
   * @property mediaImagesOptions.attrKey
   * @default 'data-media-img'
   * @type {String}
   */
  /**
   * <h4>画像ファイルに追加するprefix</h4>
   *
   * @static
   * @property mediaImagesOptions.imagePrefix
   * @default '_'
   * @type {String}
   */
  /**
   * <h4>対象要素監視しているか？</h4>
   *
   * @static
   * @property mediaImagesOptions.isObserver
   * @type {String}
   */
  MediaImageChange.mediaImagesOptions = {
    element    : null,
    attrKey    : 'data-media-img',
    imagePrefix: '_',
    isObserver : true
  };



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>MediaImageChangeインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @return {MediaImageChange}
   */
  MediaImageChange.get = function($images, options){
    return new MediaImageChange($images, options).start();
  };


  /**
   * <h4>ブレイクポイントの監視を開始します</h4>
   *
   * @method start
   * @return {MediaImageChange}
   */
  p.start = function(){
		var self = this;

		this.on('change.MediaImageChange', function(event){
			if(self.param.isObserver){
				self.param.current = event.mediaStyle;
				self.change();
			}
		}).trigger('change.MediaImageChange');

    return this;
  };


  /**
   * <h4>ブレイクポイントの監視をストップします</h4>
   *
   * @method stop
   * @return {MediaImageChange}
   */
  p.stop = function(){
    this.off('change.MediaImageChange');
		return this;
  };


  /**
   * <h4>監視の状態を切り替えます</h4>
   *
   * @method setObserver
   * @param {Boolean} isState メディアクエリの変更を監視するか
   * @return {MediaImageChange}
   */
  p.setObserver = function(isState){
    this.param.isObserver = AMP.isBoolean(isState) ? isState : this.param.isObserver;
    return this;
  };


  /**
   * <h4>画像を変更します</h4>
   *
   * @method switch
   * @return {MediaImageChange}
   */
  p.change = function(){
		var self = this,
		$images = this.param.$images,
		data,
		ext;

		$images.each(function(i){
			data = $images.eq(i).attr(self.param.attrKey);
			ext = data.substring(data.lastIndexOf('.'), data.length);
			$images[i].src = data.replace(ext, self.param.imagePrefix + self.param.current + ext);
    });

    return this;
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.MediaImageChange = MediaImageChange;


}(window, jQuery));

var AMP = AMP || {};


(function(root, $, Hogan){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でJSONを受け取りDOM生成します</h4>
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
     * @property param
     * @type {Object}
     */
    /**
     * <h4>js Template要素</h4>
     *
     * @property param.$tmp
     * @type {jQuery}
     */
    /**
     * <h4>レンダリングエリアのラッパー要素</h4>
     *
     * 初回renderが呼び出されると、自動的にレンダリングエリアを囲う要素を生成します<br>
     * これは、jQueryでDOMを再構築するより、innerHTMLで再構築した方がパフォーマンスがいい為です
     *
     * @property param.$el
     * @type {Hogan}
     */
    /**
     * <h4>Hoganテンプレート</h4>
     *
     * @property param.template
     * @type {Hogan}
     */
    /**
     * <h4>レンダリングオリジナルデータ保管</h4>
     *
     * @property param.originalData
     * @type {Arrary|Object}
     */
    /**
     * <h4>レンダリングデータ</h4>
     *
     * @property param.renderData
     * @type {Arrary|Object}
     */
    /**
     * <h4>$.ajaxオプション値</h4>
     * Render.ajaxOptionsとajaxOptionsをmixinした値を格納します
     *
     * @property param.ajaxOptions
     * @type {Object}
     */
    this.param = {
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
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します<br>
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

    return $.ajax(self.param.ajaxOptions)
    .fail(self.ajaxFail)
    .done(function(data){
      self.param.originalData = data;
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
      this.param.renderData = renderData;
    } else {
      if(AMP.isArray(this.param.originalData)){
        this.param.renderData = this.param.originalData.concat();

      } else {
        this.param.renderData = $.extend({}, this.param.originalData);
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
    if(!this.param.$el){
      this.param.$tmp.wrapAll('<div class="js_render" />');
      this.param.$el = this.param.$tmp.parent();
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
    return this.param.template.render(this.param.renderData) || this.notFound();
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   *
   * @method render
   * @return {Render}
   */
  p.render = function(data){
    this.removePrevHTML();
    this.param.$el[0].innerHTML = this.createHTML(data);
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
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, Scroll.scrollOptions, {$html: $('html, body')}, options);

    /**
     * <h4>トリガーとなるa要素</h4>
     *
     * @property param.$scrollTrigger
     * @type {Object}
     */
    this.param.$scrollTrigger = $scrollTrigger;
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
  Scroll.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Scroll';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
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
   * @type {Number|Function}
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
   * <h4>スクロールアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property scrollOptions.tween
   * @default  {duration: 800, easing: 'easeOutQuint'}
   * @type {Object}
   */
  Scroll.scrollOptions = {
    $html        : null, // $('html, body'),
    adjust       : 0,
    noScrollClass: 'no_scroll',
    tween        : {
      duration   : 800,
      easing     : 'easeOutQuint'
    }
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

    self.param.$scrollTrigger.on('click.Scroll', function(){
      return self.tween(self.param.$scrollTrigger.index(this));
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
    this.param.$scrollTrigger.off('click.Scroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   * FIXME: Stringも対応予定
   *
   * @method tween
   * @param {Number} num トリガー要素のインデックス
   * @return {Void}
   */
  p.tween = function(num){
    var self = this,
    param = self.param,
    $scrollTrigger = param.$scrollTrigger.eq(num),
    $target = $($scrollTrigger.attr('href'));

    if($target[0] && !$scrollTrigger.hasClass(param.noScrollClass)){
      var adjust = AMP.isFunction(param.adjust) ? param.adjust() || 0 : param.adjust,
      moveTo = $target.offset().top - adjust;

      if($(root).scrollTop() !== moveTo){
        var tween = $.extend({offset: moveTo}, param.tween);
        param.$html.velocity('stop').velocity('scroll', tween);
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
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, ScrollToggle.scrollToggleOptions, options);

    /**
     * <h4>表示・非表示する要素</h4>
     *
     * @default $('.scroll_toggle')
     * @property param.$scrollToggle
     * @type {jQuery}
     */
    this.param.$scrollToggle = $scrollToggle;

    /**
     * <h4>window要素</h4>
     *
     * @property param.$window
     * @type {jQuery}
     */
    this.param.$window = $(window);

    /**
     * <h4>Displayスタイルの状態</h4>
     *
     * @property param.isDisplay
     * @type {Boolean}
     */
    this.param.isDisplay = $scrollToggle.css('display') !== 'none';
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
  ScrollToggle.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ScrollToggle';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
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
   * <h4>表示・非表示の座標判定を反転します</h4>
   * 初期は、Y座標300pxを超えると表示しますが、300px超えると非表示にします
   *
   * @static
   * @property isReverse
   * @default 300
   * @type {Number}
   */
  /**
   * <h4>表示のスタイル</h4>
   *
   * @static
   * @property show
   * @default { opacity : 1}
   * @type {Object}
   */
  /**
   * <h4>非表示のスタイル</h4>
   *
   * @static
   * @property hide
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
   * @property easing
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
    showY    : 300,
    isReverse: false,
    show     : { opacity : 1},
    hide     : { opacity : 0},
    duration : 500,
    easing   : 'easeInSine',
    showCall : $.noop,
    hideCall : $.noop
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
    var self = this;

    self.param.$window.off('scroll.ScrollToggle').on('scroll.ScrollToggle', function(){
      self._scrollController(self.param.$window.scrollTop());
    }).trigger('scroll.ScrollToggle');

    return this;
  };


  /**
   * <h4>スクロールイベントをコントロール</h4>
   *
   * @private
   * @method _scrollController
   * @param {Number} y スクロールY値
   * @return {Void}
   */
  p._scrollController = function(y){
    var self = this;

    if(this.param.isReverse){
      if(!this.param.isDislpay && this.param.showY > y){
        this.show();
        this.param.isDislpay = true;
      } else if(this.param.isDislpay && this.param.showY < y){
        this.hide();
        this.param.isDislpay = false;
      }
    } else {
      if(!this.param.isDislpay && this.param.showY < y){
        this.show();
        this.param.isDislpay = true;
      } else if(this.param.isDislpay && this.param.showY > y){
        this.hide();
        this.param.isDislpay = false;
      }
    }
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
    this.param.$scrollToggle
    .css({display: 'block'})
    .css(this.param.hide)
    .velocity('stop')
    .velocity(this.param.show, this.param.duration, this.param.easing, this.param.showCall);

    return this;
  };


  /**
   * <h4>非表示</h4>
   *
   * @method hide
   * @return {ScrollToggle}
   */
  p.hide = function(){
    this.param.$scrollToggle
    .velocity('stop')
    .velocity(this.param.hide, this.param.duration, this.param.easing, function(){
      this.param.$scrollToggle.css({display: 'none'});
      this.param.hideCall();
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
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true,
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
  SmoothScroll.VERSION = '3.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'SmoothScroll';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
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
   * @property smoothScrollOptions.easing
   * @default easeOutCubic
   * @type {String}
   */
  SmoothScroll.smoothScrollOptions = {
    $page   : null,
    amount  : 500,
    duration: 500,
    easing  : 'easeOutCubic'
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
    return new SmoothScroll(options).on();
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
      self.param.$page.off('mousewheel.SmoothScroll')
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
    this.param.$page.off('mousewheel.SmoothScroll');
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
    y = AMP.isWebkit() ? self.param.$page.eq(1).scrollTop() : self.param.$page.eq(0).scrollTop(),
    scrollY = move > 0 ? y - param.amount : y + param.amount;

    self.param.$page.velocity('stop')
    .velocity('scroll', {offset: scrollY, duration: param.duration, easing: param.easing});
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.SmoothScroll = SmoothScroll;


}(window, jQuery));

var AMP = AMP || {};


(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>UIコントローラ</h4>
   * このクラスを継承する事でUIコントローラを提供します
   *
   * @protected
   * @class AMP.$.UIController
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function UIController(){}

  // 基底クラスを継承
  AMP.inherits(UIController, AMP.BASE_CLASS);

  // prototype
  var p = UIController.prototype;



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
  UIController.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'UIController';


  /**
   * <h4>パラメーター</h4>
   *
   * @property param
   * @type {Object}
   */
  /**
   * <h4>現在値</h4>
   *
   * @property param.current
   * @type {Number}
   */
  p.param = {
    current: 0
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Pagerボタンイベント登録</h4>
   *
   * @method addEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.addEventPager = function($pager){
    var self = this;
    $pager.on('click.' + self.className, function(){
      self.moveTo($pager.index(this));
      return false;
    });
    return this;
  };


  /**
   * <h4>Pagerボタンイベント削除</h4>
   *
   * @method removeEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.removeEventPager = function($pager){
    $pager.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Nextボタンイベント登録</h4>
   *
   * @method addEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.addEventNext = function($next){
    var self = this;
    $next.on('click.' + self.className, function(){
      self.next();
      return false;
    });
    return this;
  };


  /**
   * <h4>Nextボタンイベント削除</h4>
   *
   * @method removeEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.removeEventNext = function($next){
    $next.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Prevボタンイベント登録</h4>
   *
   * @method addEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.addEventPrev = function($prev){
    var self = this;
    $prev.on('click.' + self.className, function(){
      self.prev();
      return false;
    });
    return this;
  };


  /**
   * <h4>Prevボタンイベント削除</h4>
   *
   * @method removeEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.removeEventPrev = function($prev){
    $prev.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>フリックイベント</h4>
   *
   * @method addEventFlick
   * @return {Slider}
   */
  p.addEventFlick = function($trigger){
    var self = this;

    $trigger.off('flickmoveX.Slider flickcancelX.Slider flickX.Slider')
    .on('flickmoveX.' + this.className, function(moveEvent){
      self._move(moveEvent.moveX);
    })
    .on('flickcancelX.' + this.className, function(){
      self._resetTween();
    })
    .on('flickX.' + this.className, function(flickEvent){
      if(0 < flickEvent.moveX){
        self.prev();
      } else {
        self.next();
      }
    });
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   * アニメート無
   *
   * @method current
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.current = function(index){
    this._controller(index, true);
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   *
   * @method moveTo
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.moveTo = function(index){
    this._controller(index);
    return this;
  };


  /**
   * <h4>次へ</h4>
   *
   * @method next
   * @return {Instance}
   */
  p.next = function(){
    this._controller(this.param.current + 1);
    return this;
  };


  /**
   * <h4>前へ</h4>
   *
   * @method prev
   * @return {Instance}
   */
  p.prev = function(){
    this._controller(this.param.current -1);
    return this;
  };


  /**
   * <h4>コントローラー</h4>
   * 送られてきた値を制御します
   *
   * @protected
   * @private
   * @method _controller
   * @param {Number} index スライドインデック
   * @param {Boolean} noAnimate アニメート無
   * @return {Instance}
   */
  p._controller = function(index, noAnimate){};



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.UIController = UIController;


}(window, jQuery));
