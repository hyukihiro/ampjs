/**
 * AMPjs Javascript Library
 * AMPjs jQuery Module File version 3.0.2
 *
 * The MIT License (MIT)
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


(function(root, AMP){

	// module AMP.$
	AMP.$ = {};

	/**
	 * <h4>バージョン情報</h4>
	 *
	 * @static
	 * @property AMP.$.VERSION
	 * @type {String}
	 */
	AMP.$.VERSION = '3.0.2';


}(window, AMP));


(function(root, AMP, $){

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


}(window, AMP, jQuery));


(function(root, AMP, $){

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
  BoxHover.VERSION = '3.0.2';


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
      self.transition($(this));
    })
    .find('a')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
    });

    // フォーム要素はイベント伝播をキャンセル
    this.param.$boxHover.find('label input select textarea')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
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
    this.param.$boxHover
    .css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover')
    .find('a').off('click.BoxHover');

    this.param.$boxHover.find('label input select textarea').off('click.BoxHover');

    return this;
  };


  /**
   * <h4>リンクページへ遷移</h4>
   *
   * @method transition
   * @return {Void}
   */
  p.transition = function($box){
    var $link = $box.find('.' + this.param.linkClass);

    $link = $link[0] ? $link : $box.find('a').eq(0);

    // リンク展開
    if($link.attr('target') === '_blank'){
      window.open($link.attr('href'), '_blank');
    } else {
      location.href = $link.attr('href');
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.BoxHover = BoxHover;


}(window, AMP, jQuery));


(function(root, AMP, $){

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

  AMP.$.FlatHeight = FlatHeight;


}(window, AMP, jQuery));


(function(root, AMP, $){

	// 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ホバーの3Dアクション</h4>
   * ※IE10以上対象
   *
   * @example  要素構成: .float > .float_frame > .float_inner
   *
   * @class AMP.$.Float3d
   * @constructor
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   */
	function Float3d($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.float');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, Float3d.float3dOptions, options);

    /**
     * <h4>float要素</h4>
     *
     * @propaty $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>html要素</h4>
     *
     * @propaty $html
     * @type {jQuery}
     */
		this.param.$html = $('html');

    /**
     * <h4>float要素</h4>
     *
     * @private
     * @propaty _isFloating
     * @type {Boolean}
     */
    this.param._isFloating = false;
	}

  // 基底クラスを継承
  AMP.inherits(Float3d, AMP.BASE_CLASS);

	// prototype
	var p = Float3d.prototype;



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
  Float3d.VERSION = '1.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Float3d';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
   *
   * @static
   * @property float3dOptions
   * @type {Object}
   */
  /**
   * <h4>3D変形の奥行きの深さを指定する値</h4>
   *
   * @static
   * @property float3dOptions.perspective
   * @type {Number}
   */
  /**
   * <h4>Z方向の距離で移動を指定する値</h4>
   *
   * @static
   * @property float3dOptions.translateZ
   * @type {Number}
   */
  /**
   * <h4>回転表示を指定する値</h4>
   *
   * @static
   * @property float3dOptions.rotate
   * @type {Number}
   */
  /**
   * <h4>floating時に回転する幅く</h4>
   *
   * @static
   * @property float3dOptions.range
   * @type {Number}
   */
  /**
   * <h4>floating時の回転するスピードく</h4>
   *
   * @static
   * @property float3dOptions.speed
   * @type {Number}
   */
  /**
   * <h4>hover時のdurationく</h4>
   *
   * @static
   * @property float3dOptions.duration
   * @type {Number}
   */
  /**
   * <h4>hover時のeasingく</h4>
   *
   * @static
   * @property float3dOptions.easing
   * @type {String}
   */
	Float3d.float3dOptions = {
    perspective: 400,
    translateZ : -150,
    rotate     : 7.5,
    range      : 5,
    speed      : 150,
    duration   : 400,
    easing     : 'easeOutExpo'
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Float3dインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   * @return {Float3d}
   */
  Float3d.get = function($target, options){
    return new Float3d($target, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Float3d}
   */
  p.on = function(){
    var self = this;

    // イベント重複回避
    self.off();

    self.param.$target.css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective});

    self.param.$target
    .on('mouseenter.Float3d', function(onEvent){
      self.onTween(this, onEvent);
      self.param._isFloating = true;
      self.floatTween($(this).children(), 0);

      // moveEvent登録
      $(this).on('mousemove.Float3d', function(moveEvent){
        self.onTween(this, moveEvent);
      });
    })
    .on('mouseleave.Float3d', function(outEvent){
      self.param._isFloating = false;
      self.outTween(this, outEvent);

      // moveEvent削除
      $(this).off('mousemove.Float3d');
    });

     // moveEvent削除
    this.param.$html.on('mouseleave.Float3d', function(){
      self.param.$target.parent().off('mousemove.Float3d');
      self.param._isFloating = false;
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Float3d}
   */
  p.off = function(){
    this.param.$target.off('.Float3d').css({perspective: 0})
    .children().css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective});

    this.param.$html.off('.Float3d');

    return this;
  };


  /**
   * <h4>マウスオンTween</h4>
   *
   * @method onTween
   * @param  {DOM} target 対象の要素
   * @param  {Object} event イベントオブジェクト
   * @return {Void}
   */
  p.onTween = function(target, event){
    var $target = $(target).children(),
    offset = this.offsetRatio(target, event);

    $target.velocity('stop')
    .velocity({
      translateZ: this.param.translateZ,
      rotateX   : this.param.rotate * offset.y,
      rotateY   : this.param.rotate * offset.x,
      rotateZ   : this.param.rotate * offset.x
    }, {
      duration: this.param.duration,
      easing  : this.param.easing
    });
  };


  /**
   * <h4>選択中のTween</h4>
   * 再起処理します
   *
   * @method floatTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.floatTween = function($target, angle){
    var self = this;

    angle = typeof angle === 'number' ? angle : 0;
    angle += Math.PI / self.param.speed;

    $target.children()
    .velocity('stop')
    .velocity({
      rotateX: (self.param.range * Math.cos(angle + Math.PI)),
      rotateY: (self.param.range * Math.sin(angle + Math.PI)),
      rotateZ: (self.param.range * Math.sin(angle + Math.PI))
    }, {
      duration: 1000 / 60,
      easing  : 'linear',
      complete: function(){
        // 再起処理
        if(self.param._isFloating){
          self.floatTween($target, angle);
        }
      }
    });
  };


  /**
   * <h4>マウスアウトTween</h4>
   *
   * @method outTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.outTween = function(target){
    var self = this;

    $(target).children()
    .velocity('stop')
    .velocity({
      translateZ: 0,
      rotateX   : 0,
      rotateY   : 0,
      rotateZ   : 0
    }, {
      duration: self.param.duration,
      easing  : self.param.ease
    })
    .children()
    .velocity('stop')
    .velocity({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }, {
      duration: self.param.duration,
      easing  : self.param.easing
    });
  };


  /**
   * <h4>エリアセンター中心に座標位置の比率を返す</h4>
   * 比率は0を中心に-1から1までの小数点2桁の数値
   *
   * @method offsetRatio
   * @param  {DOM} target 対象の要素
   * @param  {Object} event  イベントオブジェクト
   * @return {Object}  x,y座標比を格納したオブジェクト
   */
  p.offsetRatio = function(target, event){
    var $target = $(target);

    var center = {
      x: $target.width() / 2,
      y: $target.height() / 2
    };

    var offset = {
      x: event.pageX - $target.offset().left,
      y: event.pageY - $target.offset().top
    };

    // return offset
    return {
      x: ((offset.x - center.x) / center.x).toFixed(2),
      y: ((center.y - offset.y) / center.y).toFixed(2)
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Float3d = Float3d;


}(window, AMP, jQuery));


(function(root, AMP, $){

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

  AMP.$.MediaImageChange = MediaImageChange;


}(window, AMP, jQuery));


(function(root, AMP, $){

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
    exports
  --------------------------------------------------------------------------*/

  AMP.$.Rollover = Rollover;
  AMP.$.rollover = new Rollover();


}(window, AMP, jQuery));


(function(root, AMP, $){

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
  Scroll.VERSION = '3.1.1';


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
    return new Scroll($scrollTrigger, options).on();
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

  AMP.$.Scroll = Scroll;


}(window, AMP, jQuery));


(function(root, AMP, $){

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
  ScrollToggle.VERSION = '3.1.1';


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
    return new ScrollToggle($scrollToggle, options).on();
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
    var self = this;
    this.param.$scrollToggle
    .velocity('stop')
    .velocity(this.param.hide, this.param.duration, this.param.easing, function(){
      self.param.$scrollToggle.css({display: 'none'});
      self.param.hideCall();
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.ScrollToggle = ScrollToggle;


}(window, AMP, jQuery));


(function(root, AMP, $){

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
    amount  : 400,
    duration: 600,
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

  AMP.$.SmoothScroll = SmoothScroll;


}(window, AMP, jQuery));


(function(root, AMP, $){

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
    export
  --------------------------------------------------------------------------*/

  AMP.$.UIController = UIController;


}(window, AMP, jQuery));


(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>スライダー</h4>
   * velocity.jsに依存しています
   *
   * @constructor
   * @class AMP.$.Slider
   * @extends AMP.$.UIController
   * @param {jQuery} $slider スライダー要素
   * @param {Object} options オプション値
   */
  function Slider($slider, options){
    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    /**
     * <h4>スライダー要素</h4>
     *
     * @property param.$wrap
     * @type {jQuery}
     */
    /**
     * <h4>スライダーアイテム要素数</h4>
     *
     * @property param.length
     * @type {Number}
     */
    /**
     * <h4>スライドで進むアイテム数</h4>
     *
     * @private
     * @default null
     * @property param._stepLength
     * @type {Number}
     */
    /**
     * <h4>スライドカウントのMAX値</h4>
     *
     * @property param.slideMaxLength
     * @type {Number}
     */
    /**
     * <h4>スライドする距離</h4>
     *
     * @property param.distance
     * @type {Number}
     */
    /**
     * <h4>left値</h4>
     *
     * @property param.left
     * @type {Number}
     */
    /**
     * <h4>タイマーID</h4>
     *
     * @private
     * @property param._timerId
     * @type {String}
     */
    /**
     * <h4>アニメーション状態管理フラグ</h4>
     *
     * @private
     * @property param._isAnimate
     * @type {Boolean}
     */
		this.param = $.extend(
			true,
			{},
			Slider.sliderOptions,
			{
        $wrap         : $slider,
        $frame        : $slider.find('.frame'),
        $slide        : $slider.find('.slide'),
        $slideItems   : $slider.find('.slide').children(),
        $pointer      : $slider.find('.pointer'),
        $thumbnail    : $slider.find('.thumbnail a'),
        $prev         : $slider.find('.prev a'),
        $next         : $slider.find('.next a'),
        length        : $slider.find('.slide').children().length,
        _stepLength   : null,
        _liquidLength : null,
        slideMaxLength: 0,
        distance      : 0,
        left          : 0,
        _liquidClone  : 2,
        _adjustLeft   : 0,
        _timerId      : null,
        _isAnimate    : false
			},
			options
		);

		if(this.param.isInit){
			this.init();
		}
  }

  // 基底クラスを継承
  AMP.inherits(Slider, AMP.$.UIController);

  // prototype
  var p = Slider.prototype;



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
  Slider.VERSION = '1.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Slider';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出された際に、option値とmixinしてparamに格納します。
   *
   * @static
   * @property sliderOptions
   * @type {Object}
   */
  /**
   * <h4>スライダーフレーム要素</h4>
   *
   * @static
   * @property sliderOptions.$frame
   * @type {jQuery}
   */
  /**
   * <h4>スライドする要素</h4>
   *
   * @static
   * @property sliderOptions.$slide
   * @type {jQuery}
   */
  /**
   * <h4>スライドする子要素</h4>
   *
   * @static
   * @property sliderOptions.$slideItems
   * @type {jQuery}
   */
  /**
   * <h4>ポインター要素</h4>
   *
   * @static
   * @property sliderOptions.$pointer
   * @type {jQuery}
   */
  /**
   * <h4>サムネイル要素</h4>
   *
   * @static
   * @property sliderOptions.$thumbnail
   * @type {jQuery}
   */
  /**
   * <h4>prevナビ要素</h4>
   *
   * @static
   * @property sliderOptions.$prev
   * @type {jQuery}
   */
  /**
   * <h4>nextナビ要素</h4>
   *
   * @static
   * @property sliderOptions.$next
   * @type {jQuery}
   */
  /**
   * <h4>コンストラクタ呼び出されたときに、スライダーを初期化するか</h4>
   *
   * @static
   * @property sliderOptions.isInit
   * @type {Boolean}
   */
  /**
   * <h4>フリックイベントを有効にするか</h4>
   *
   * @static
   * @property sliderOptions.isFlick
   * @type {Boolean}
   */
  /**
   * <h4>スライダー要素にマウスオンされたときタイマーを無効にするか</h4>
   *
   * @static
   * @property sliderOptions.isTimerCancel
   * @type {Boolean}
   */
  /**
   * <h4>現在アクティブなスライドアイテムインデックス</h4>
   *
   * @static
   * @property sliderOptions.current
   * @type {Number}
   */
  /**
   * <h4>スライドステップ数を固定したい場合、ステップ数の指定</h4>
   *
   * @static
   * @property sliderOptions.slideStep
   * @type {Number}
   */
  /**
   * <h4>スライドタイマーの間隔</h4>
   *
   * @static
   * @property sliderOptions.timer
   * @type {Number}
   */
  /**
   * <h4>アクティブ要素に付与するクラス名</h4>
   *
   * @static
   * @property sliderOptions.activeClass
   * @type {String}
   */
  /**
   * <h4>リサイズ時に実行する関数</h4>
   *
   * @static
   * @property sliderOptions.resizeCall
   * @type {Function}
   */
  /**
   * <h4>リサイズに完了時に実行する関数</h4>
   *
   * @static
   * @property sliderOptions.resizeStopCall
   * @type {Function}
   */
  /**
   * <h4>スライドアニメーションのオプション値</h4>
   * <p>参照： <a href="http://julian.com/research/velocity/#arguments" target="_blank">オプション値</a></p>
   *
   * @static
   * @property sliderOptions.tween
   * @type {Object}
   */
  Slider.sliderOptions = {
    $frame        : null,
    $slide        : null,
    $slideItems   : null,
    $pointer      : null,
    $thumbnail    : null,
    $prev         : null,
    $next         : null,
    isInit        : true,
    isFlick       : true,
    isResize      : true,
    isTimerCancel : true,
    isLiquid      : false,
    current       : 0,
    slideStep     : 0,
    timer         : 0,
    activeClass   : 'active',
    resizeCall    : $.noop,
    resizeStopCall: $.noop,
    tween         : {
      easing      : 'easeOutQuart',
      duration    : 500,
      begin       : $.noop,
      progress    : $.noop,
      complete    : $.noop
    }
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Sliderインスタンスの生成</h4>
   *
   * @static
   * @class AMP.$.Slider
   * @param {jQuery} $wrap   スライダー要素
   * @param {Object} options オプション値
   * @return {Slider}
   */
  Slider.get = function($slider, options){
    return new Slider($slider, options);
  };


  /**
   * <h4>初期化</h4>
   * Singleton
   *
   * @method  init
   * @return {Slider}
   */
  p.init = function(){
    // 初期化フラグ
    if(this._isInit){
      return this;
    }
    this._isInit = true;

    // param
    this.setParam();

    // view
    this.createPointer();
    this.setPosition();
    this.active();

    // event
    this.addEventResize();
    this.addEventTimerCancel();
    this.addEventThumbnail(this.param.$thumbnail);
    this.addEventFlick(this.param.$slide);
    this.addEventNext(this.param.$next);
    this.addEventPrev(this.param.$prev);
    this.addEventPager(this.param.$pointer.find('a'));

    // timer
    this.timerStart();

    return this;
  };


  /**
   * <h4>パラメーターの設定</h4>
   *
   * @method setParam
   * @return {Slider}
   */
  p.setParam = function(){
    /// if(this.param.isLiquid){
    /// }

    // ステージの幅
		var stageWidth = this.param.$frame.width();

		// アイテム要素の幅
		var itemWidth = this.param.$slideItems.outerWidth(true);

		// 表示エリアにある要素数
		var visibleLength = ~~(stageWidth / itemWidth);

    // ステップ数
    var step = this.param.slideStep && this.param.slideStep < visibleLength? this.param.slideStep : visibleLength;

    // 初期値が無い場合はセット
    if(!this.param._stepLength){
      this.param._stepLength = step;
    }

    // 現在値をセット
    this.param.current = ~~(this.param._stepLength * this.param.current / step);

    // スライドアイテムのステップ数
    this.param._stepLength = step;

		// 移動距離
		this.param.distance = step * itemWidth;

    // スライド最大数
    this.param.slideMaxLength = Math.ceil(this._getDisplayLength() / step);

    // フレームのセンタリング
    if(this.param.distance < stageWidth){
      this.param._adjustLeft = ~~((this.param.distance - stageWidth) / -2);
    } else {
      this.param._adjustLeft = 0;
    }

    // 現在地
    this.param.left = this.param.current * this.param.distance * -1;

    return this;
  };


	/* Events
	-----------------------------------------------------------------*/
	/**
	 * <h4>リサイズイベント</h4>
	 *
	 * @method addEventResize
	 * @return {Slider}
	 */
	p.addEventResize = function(){
		var self = this;

		$(window).off('resize.Slider resizestop.Slider')
		.on('resize.Slider', function(){
      if(self.param.isResize){
        self.timerStop();
        self.param.resizeCall();
      }
    })
    .on('resizestop.Slider', function(){
      if(self.param.isResize){
        self.setParam();
        self.setPosition();
        self.createPointer();
        self.addEventPager(self.param.$pointer.find('a'));
        self.active();
        self.timerStart();
        self.param.resizeStopCall();
      }
		});

		return this;
  };


  /**
   * <h4>Thumbnailボタンイベント追加</h4>
   *
   * @method addEventThumbnail
   * @param {jQuery} $thumbnail Thumbnailトリガー要素
   * @return {Slider}
   */
  p.addEventThumbnail = function($thumbnail){
    var self = this;

    $thumbnail.on('click.Slider', function(){
      var index = ~~($thumbnail.index(this) / self.param._stepLength);
      self.moveTo(index);
      return false;
    });

    return this;
  };


  /**
   * <h4>タイマーキャンセルイベント</h4>
   * スライダーにマウスオンされた状態の時、タイマー処理をキャンセルします
   *
	 * @method addEventTimerCancel
	 * @return {Slider}
   */
  p.addEventTimerCancel = function(){
		var self = this;

		self.param.$wrap.off('mouseenter.Slider mouseleave.Slider')
		.on('mouseenter.Slider', function(){
			if(self.param.isTimerCancel){
				self.timerStop();
			}
		})
		.on('mouseleave.Slider', function(){
			if(self.param.isTimerCancel){
				self.timerStart();
			}
		});

		return this;
  };



  /* Controllers
  -----------------------------------------------------------------*/
	/**
	 * <h4>タイマースタート</h4>
	 *
	 * @method timerStart
	 * @param  {Number} num セットするタイマー値(省略可)
	 * @return {Slider}
	 */
	p.timerStart = function(num){
		var self = this;

		if(AMP.isNumber(num)){
			self.param.timer = num;
		}

		// タイマーをクリア
		self.timerStop();

		if(0 < self.param.timer){
			self.param._timerId = setTimeout(function(){
				self.next();
			}, self.param.timer + self.param.tween.duration);
		}

		return this;
	};


	/**
	 * タイマー停止
	 * @method timerStop
	 * @return {Slider}
	 */
	p.timerStop = function(){
		clearTimeout(this.param._timerId);
		return this;
	};


	/**
	 *<h4> コントローラー</h4>
	 *
   * @private
	 * @method _controller
	 * @param  {Number} index スライドする位置
	 * @return {Void}
	 */
  p._controller = function(index, noAnimate){
		var self = this;

		if(self.param._isAnimate){
			return void 0;
		}

    // indexの調整
    if(index < 0){
      index = self.param.slideMaxLength - 1;
    } else if(index >= self.param.slideMaxLength){
      index = 0;
    }

    // パラメータ更新
    self.param.current = index;
    self.param.left = self.param.current * self.param.distance * -1;

    // アニメート判定
    if(noAnimate){
      self.setPosition();
    } else {
      $.sequence(
        function(){
          // スライド前
          self.param._isAnimate = true;
          self.timerStop();
          self.active();
        },
        function(){
          // スライド
          return self._tween();
        },
        function(){
          // スライド後
          self.timerStart();
          self.param._isAnimate = false;
        }
      );
    }
  };


	/* Views
	-----------------------------------------------------------------*/
  /**
   * <h4>表示可能な要素の数を取得</h4>
   *
   * @private
   * @method _getDisplayLength
   * @return {Number}
   */
  p._getDisplayLength = function(){
    var count = 0;
    this.param.$slideItems.each(function(){
      if($(this).css('display') !== 'none'){
        count += 1;
      }
    });
    return count;
  };


  /// FIXME: 追加予定
  /// p.setLiquidItem = function(){};


	/**
	 * <h4>ポインターの生成</h4>
	 *
	 * @method createPointer
	 * @return {Slider}
	 */
  p.createPointer = function(){
		if(this.param.$pointer[0]){
			var pointerHTML = this.param.$pointer.find('>')[0].outerHTML,
			print = '',
			i = 0;

        print += pointerHTML;
			for(; i < this.param.slideMaxLength; i += 1){
			}
			this.param.$pointer[0].innerHTML = print;
		}

		return this;
  };


 /**
  * <h4>スライドスタイルのセット</h4>
  *
  * @method setPosition
  * @return {Slider}
  */
  p.setPosition = function(){
    this.param.$slide.css({
      width: this._getDisplayLength() * this.param.$slideItems.outerWidth(true),
      left : this.param.left + this.param._adjustLeft
    });
		return this;
  };


  /**
   * <h4>要素のアクティブ化</h4>
   *
   * @method active
   * @return {Slider}
   */
  p.active = function(){
    var index = this.param.current * this.param._stepLength;

    // $slideItems
    this.param.$slideItems.removeClass(this.param.activeClass)
    .slice(index, index + this.param._stepLength)
    .addClass(this.param.activeClass);

    // $thumbnail
    if(this.param.$thumbnail[0]){
      this.param.$thumbnail.removeClass(this.param.activeClass)
      .slice(index, index + this.param._stepLength).addClass(this.param.activeClass);
    }

		// $pointer
		if(this.param.$pointer[0]){
			this.param.$pointer.children().removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		}

		// $next
		if(this.param.current === this.param.slideMaxLength - 1){
      this.param.$next.addClass(this.param.activeClass);
		} else {
			this.param.$next.removeClass(this.param.activeClass);
		}

		// $prev
		if(this.param.current === 0){
			this.param.$prev.addClass(this.param.activeClass);
		} else {
			this.param.$prev.removeClass(this.param.activeClass);
		}

		return this;
  };


  /**
   * <h4>指定x座標分移動</h4>
   *
   * @private
   * @method _move
   * @param  {Number} x 移動するx座標値
   * @return {Void}
   */
  p._move = function(x){
		this.param.$slide.velocity('stop')
    .css({left: this.param.left + this.param._adjustLeft + x});
  };


  /**
   * <h4>スライド位置を戻す</h4>
   *
   * @private
   * @method _resetTween
   * @return {jQuery.Deferred}
   */
  p._resetTween = function(){
		return this.param.$slide.velocity('stop')
    .velocity({
      left: this.param.left + this.param._adjustLeft
    }, this.param.tween.duration / 2, this.param.tween.easing);
  };


	/**
	 * <h4>スライドアニメーションを実行</h4>
	 *
	 * @private
	 * @method _tween
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(){
		return this.param.$slide.velocity('stop')
    .velocity({left: this.param.left + this.param._adjustLeft}, this.param.tween);
	};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Slider = Slider;


}(window, AMP, jQuery));
