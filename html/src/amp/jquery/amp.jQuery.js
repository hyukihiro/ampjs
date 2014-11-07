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
   * <h4>ボックスホバー</h4>
   *
   * @class BoxHover
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   * @return {BoxHover}
   */
  var BoxHover = function($target, options){
    this.$target = $target;
    this.param = $.extend(true, {}, BoxHover.defaults, options);
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
  BoxHover.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  BoxHover.p = BoxHover.prototype;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  BoxHover.p.$target = null;


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
  BoxHover.p.param = null;



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
  BoxHover.extend = root.amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param {jQuery} $target ターゲット要素 省略可
   * @return {BoxHover}
   */
  BoxHover.p.on = function($target){
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
  BoxHover.p.off = function($target){
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
  BoxHover.p.setLink = function($target){
    var self = this,
    $link = $target.find('.' + self.param.linkClass),
    $a = $target.find('a').eq(0);

    $a = $link[0] ? $link : $a;

    // リンク展開
    if($a.attr('target') === '_blank'){
      return window.open($a.attr('href'), '_blank');
    } else {
      return location.href = $a.attr('href');
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  BoxHover.p.toString = function(){
    return '[object BoxHover]';
  };


  /**
   * <h4>ボックスホバー</h4>
   * BoxHoverショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $target 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover} BoxHoverインスタンスを返す
   */
  BoxHover.create = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !$target instanceof jQuery){
      options = $target;
      $target = $('.box-hover');
    }

    var boxHover = new BoxHover($target, options);
    boxHover.on();
    return boxHover;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.BoxHover = BoxHover;


}(window, jQuery));

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

	/**
	 * <h4>レスポンシブのブレイクポイントで画像を切り替えます</h4>
	 *
   * @class Crossfader
   * @constructor
   * @param  {jQuery} $images 対象のimg要素
   * @param  {Object} breaks ブレークポイント値と画像に付加する文字列 値はdefaults参照
   * @return {BoxHover}
   */
	var Crossfader = function($target, options){
    this.$target = $target;
    this.param = $.extend({}, Crossfader.defaults, {
      $listWrap : $target.find('.list'),
      $list     : $target.find('.list').children(),
      $thumb    : $target.find('.thumb a'),
      $pointer  : $target.find('.pointer li'),
      $prev     : $target.find('.prev > a'),
      $next     : $target.find('.next > a')
    }, options);
    this.length = this.param.$list.length;
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
  Crossfader.VERSION = '1.2';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Crossfader.p = Crossfader.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  Crossfader.p._isInit = false;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、第二引数にoptionsを指定するとparamオブジェクトにmixinします<br>
   *
   * defaults: { <ul><li>
   *   $listWrap  : $('.list'), スライドする要素 </li><li>
   *   $list      : $('.list').children(), スライドする要素の子要素 </li><li>
   *   $thumb     : $('.thumb a'), サムネイル ※省略可 </li><li>
   *   $pointer   : $('.pointer li'), ポインタ要素 ※省略可 </li><li>
   *   $prev      : $('.prev > a'), ※省略可, </li><li>
   *   $next      : $('.next > a'), ※省略可, </li><li>
   *   activeClass: 'active', アクティブ時に付けるクラス名 </li><li>
   *   naviType   : 'rollover', サムネイルのロールオーバータイプ ['rollover', 'alpha', 'fade', 'slip', 'none'] </li><li>
   *   current    : 0, 初期表示にするシーン </li><li>
   *   timer      : 0, タイマー 0はoff </li><li>
   *   duration   : 400, スライドduration </li><li>
   *   easeing    : 'linear', スライドイージング </li><li>
   *   isLiquid   : false, リキッドレイアウトモードの有効 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Crossfader.defaults = {
    $listWrap  : null,
    $list      : null,
    $thumb     : null,
    $pointer   : null,
    $prev      : null,
    $next      : null,
    activeClass: 'active',
    naviType   : 'rollover',
    current    : 0,
    timer      : 0,
    duration   : 400,
    easeing    : 'linear'
    // isFlick    : false
  };


  /**
   * <h4>第一引数で指定したスライダー要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  Crossfader.p.$target = null;


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsと第二引数で設定したoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  Crossfader.p.param = null;


  /**
   * <h4>スライド要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Crossfader.p.length = null;


  /**
   * <h4>タイマーID</h4>
   *
   * @private
   * @property _timerId
   * @type {String}
   */
  Crossfader.p._timerId = null;



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
   Crossfader.extend = root.amp._extend;


	/**
	 * <h4>初期化</h4>
	 * シングルトンパターン
	 *
	 * @method init
	 * @return {BoxHover}
	 */
	Crossfader.p.init = function(){
		if(!this._isInit){
			// DOM生成
			this.createPointer();

			// スタイル設定
			this.setStyle();

			// イベント設定
			this.pagerNavi(this.param.$thumb);
			this.pagerNavi(this.param.$pointer.find('a'));
			this.prevNavi(this.param.$prev);
			this.nextNavi(this.param.$next);
			this.timerStart();
		}
		return this;
	};


  /**
   * <h4>ポインターがあればを生成します</h4>
   *
   * @method createPointer
   * @return {BoxHover}
   */
  Crossfader.p.createPointer = function(){
    if(this.param.$pointer[0]){
      var frag = document.createDocumentFragment(),
      el = this.param.$pointer[0],
      i = 0,
      $el;

      for(; i < this.length; i += 1){
        frag.appendChild(el.cloneNode(true));
      }

      $el = $(frag).children();
      this.param.$pointer.replaceWith($el);
      this.param.$pointer = $el;
    }

    return this;
  };


  /**
   * <h4>pagerナビゲーションイベントの実装</h4>
   *
   * @method pagerNavi
   * @param {jQuery} $target pager要素
   * @return {BoxHover}
   */
  Crossfader.p.pagerNavi = function($target){
    var self = this;

    $target.on('click.Crossfader', function(){
      self.controller($target.index(this));
      return false;
    });

    return this;
  };


  /**
   * <h4>戻るボタンイベントの実装</h4>
   *
   * @method prevNavi
   * @param {jQuery} $target 戻るボタン要素
   * @return {BoxHover}
   */
  Crossfader.p.prevNavi = function($target){
    var self = this;

    $target.on('click.Crossfader', function(){
      self.prev();
      return false;
    });

    return this;
  };


  /**
   * <h4>次へボタンイベントの実装</h4>
   *
   * @method nextNavi
   * @param {jQuery} $target 次ぎへボタン要素
   * @return {BoxHover}
   */
  Crossfader.p.nextNavi = function($target){
    var self = this;

    $target.on('click.Crossfader', function(){
      self.next();
      return false;
    });

    return this;
  };


  /**
   * <h4>タイマースタート</h4>
   *
   * @method timerStart
   * @param  {Number} timer? タイマーを時間をセットします。省略可
   * @return {BoxHover}
   */
  Crossfader.p.timerStart = function(timer){
    var self = this;

    self.timerStop();

    if($.isNumeric(timer)){
      self.param.timer = timer;
    }

    if(0 < self.param.timer){
      self._timerId = setTimeout(function(){
        self.next();
      }, self.param.timer + self.param.duration);
    }

    return this;
  };


  /**
   * <h4>タイマーストップ</h4>
   *
   * @method timerStop
   * @return {BoxHover}
   */
  Crossfader.p.timerStop = function(){
    clearTimeout(this._timerId);
    return this;
  };


  /**
   * <h4>前に戻るります</h4>
   *
   * @method prev
   * @return {BoxHover}
   */
  Crossfader.p.prev = function(){
		var num = 0 < this.param.current ? this.param.current - 1 : this.length;
		this.controller(num);
    return this;
  };


  /**
   * <h4>次へ進みます</h4>
   *
   * @method next
   * @return {BoxHover}
   */
  Crossfader.p.next = function(){
		var num = this.param.current < this.length -1 ? this.param.current + 1 : 0;
    this.controller(num);
    return this;
  };


  /**
   * <h4>スライダーを制御します</h4>
   * 値の更新、スタイルはここで決めています
   *
   * @method controller
   * @param  {Number} num スライドナンバー
   * @return {BoxHover}
   */
  Crossfader.p.controller = function(num){
    this.timerStart();
    this.fade(this.param.current, num);
    this.param.current = num;
    this.setActive();
    return this;
  };


  /**
   * <h4>ナビゲーションのアクティブ化</h4>
   *
   * @method setActive
   * @return {BoxHover}
   */
  Crossfader.p.setActive = function(){
    var param = this.param;

    // $pointerのアクティブ
    param.$pointer.removeClass(param.activeClass).eq(param.current).addClass(param.activeClass);

    // $thumbのアクティブ
    if(param.naviType && param.naviType !== 'none'){
      // rolloverの処理
      console.log();
    } else {
      param.$thumb.removeClass(param.activeClass).eq(param.current).addClass(param.activeClass);
    }

    return this;
  };


  /**
   * <h4>ポジションをセットします</h4>
   *
   * @method setStyle
   * @return {BoxHover}
   */
  Crossfader.p.setStyle = function(){
		this.param.$list.eq(0).css({position: 'reletive'});
		this.param.$list.css({zIndex: 0, opacity: 0})
			.eq(this.param.current).css({zIndex: this.length, opacity: 1});
    return this;
  };


  /**
   * <h4>スライドします</h4>
   *
   * @method fade
   * @return {BoxHover}
   */
  Crossfader.p.fade = function(prev, next){
		var self = this,
		param = self.param;

		// prev
		param.$list.eq(prev).css({zIndex: 0}).stop(true, false).animate({opacity: 0}, param.duration, param.easeing);

		// next
		param.$list.eq(next).css({zIndex: self.length}).stop(true, false).animate({opacity: 1}, param.duration, param.easeing);

    return self;
  };


  /**
	 * <h4>ブレイクポイントで画像を切り替えます</h4>
	 * Crossfaderショートハンド
   *
   * @method create
   * @param  {jQuery} $target 対象のimg要素
   * @param  {Object} breaks ブレークポイント値と画像に付加する文字列 値はdefaults参照
   * @return {Crossfader} Crossfaderインスタンスを返す
   */
  Crossfader.create = function($target, options){
		var crossfader = new Crossfader($target, options);
		crossfader.init();
		return crossfader;
	};




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Crossfader = Crossfader;


}(window, jQuery));

;(function(root, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight}
   */
  var FlatHeight = function($target, split, options){
    this.$target = $target;
    this.split   = $.isNumeric(split) ? split : $target.length;
    options      = $.isPlainObject(split) ? split : options;
    this.param   = $.extend(true, {}, FlatHeight.defaults, options);
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
  FlatHeight.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  FlatHeight.p = FlatHeight.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  FlatHeight.p._isInit = false;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  FlatHeight.p.$target = null;


  /**
   * <h4>高さを揃える要素の分割単位</h4>
   *
   * @property split
   * @type {Number}
   */
  FlatHeight.p.split = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults: { <ul><li>
   *   isResize: false, // {Boolean} リサイズ時、高さを揃えなおすか </li><li>
   *   key     : null, // {String} amp.fontResizeイベントに渡すコールバックキー </li><li>
   *   timer   : 100 // {Number} リサイズイベントタイミング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  FlatHeight.defaults = {
    isResize: false,
    key     : null,
    timer   : 50
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  FlatHeight.p.param = null;



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
  FlatHeight.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {FlatHeight}
   */
  FlatHeight.p.init = function(){
    if(!this._isInit){
      this._isInit = true;

      if(!this.param.key){
        this.param.key = amp.createId('FlatHeight');
      }
      this.setHeight();
      this.setEvent();
    }

    return this;
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method setEvent
   * @return {FlatHeight}
   */
  FlatHeight.p.setEvent = function(){
    var self = this;

    if(amp.isDevice('pc')){
      amp.fontResize(function(){
        self.setHeight();
      }, {key: self.param.key, timer: self.param.timer});
    }

    if(amp.isDevice('sd') || self.param.isResize){
      $(window).on('resizestop.FlatHeight', {timer: self.param.timer}, function(){
        self.setHeight();
      });
    }

    return this;
  };


  /**
   * <h4>区切りをセットして高さを揃える</h4>
   *
   * @method setSplit
   * @return {FlatHeight}
   */
  FlatHeight.p.setSplit = function(num){
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
  FlatHeight.p.setHeight = function(){
    var self = this,
    total = self.$target.length,
    rest = total % self.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.$target.height('auto');

    if(self.split < 2){
      return false;
    }

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

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  FlatHeight.p.toString = function(){
    return '[object FlatHeight]';
  };


  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight} FlatHeight生成してインスタンスを返す
   */
  FlatHeight.create = function($target, split, options){
    var flatHeight = new FlatHeight($target, split, options);
    flatHeight.init();
    return flatHeight;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.FlatHeight = FlatHeight;


}(window, jQuery));

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>imagesloaded.jsに依存します</b>
   *
   * @class Loader
   * @constructor
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期値： 'body'
   * @return {Loader}
   */
  var Loader = function(elm){
    this.elm = elm ? elm : this.elm;
    this.imagesloaded = imagesLoaded(this.elm);
    this.length = this.imagesloaded.images.length;
    this.$defer = new $.Deferred();
    return this;
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
  Loader.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Loader.p = Loader.prototype;


  /**
   * <h4>対象のimgを囲う要素</h4>
   *
   * @property elm
   * @type {DOM}
   */
  Loader.p.elm = 'body';


  /**
   * <h4>imagesloadedオブジェクト</h4>
   *
   * @property imagesloaded
   * @type {imagesloaded}
   */
  Loader.p.imagesloaded = null;


  /**
   * <h4>jQuery Deferred Objectを格納</h4>
   * ローディングの状態をdone, fail, proglessに反映しています
   *
   * @property $defer
   * @type {jQuery.Deferred}
   */
  Loader.p.$defer = null;


  /**
   * <h4>$imagesとimagesをあわせた画像点数</h4>
   *
   * @property length
   * @type {Number}
   */
  Loader.p.length = 0;


  /**
   * <h4>画像が読み込まれた数をカウントします</h4>
   *
   * @property count
   * @type {Number}
   */
  Loader.p.count = 0;


  /**
   * <h4>読み込み度数をインクリメントします</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  Loader.p.loadCount = 0;


  /**
   * <h4>タイマーID</h4>
   *
   * @property timerID
   * @type {String}
   */
  Loader.p.timerID = null;


  /**
   * <h4>エラー処理を監視するタイマーID</h4>
   *
   * @property checkID
   * @type {String}
   */
  Loader.p.checkID = null;


  /**
   * <h4>タイムスタンプ</h4>
   *
   * @private
   * @property _timeStamp
   * @type {Number} ミリ秒
   */
  Loader.p._timeStamp = null;


  /**
   * <h4>処理が止まっていないかチェックする間隔</h4>
   *
   * @property checkTime
   * @type {Number} ミリ秒
   */
  Loader.p.checkTime = 5000;



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
   Loader.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  Loader.p.init = function(){
    var self = this;

    if(!self._timeStamp){
      // タイムスタンプ
      self._timeStamp = amp.now();

      // 画像の読み込まれたらインクリメントする
      self.imagesloaded.jqDeferred.progress(function(){
        self.count += 1;
      });

      // カウントを更新する
      self.update();

      // 5秒間処理が止まれば自動的にカウントを更新
      self.check();
    }

    return self.$defer.promise();
  };


  /**
   * <h4>カウントのアップデート</h4>
   *
   * @method update
   * @return {Void}
   */
  Loader.p.update = function(){
    var self = this;
    current = self.count / self.length * 100;
    self.loadCount += (current - self.loadCount) * 0.1;

    // progress
    self.$defer.notify(Math.ceil(self.loadCount));

    // done
    if(self.loadCount >= 100){
      // 監視解除
      clearTimeout(self.checkID);
      self.$defer.resolve(self.imagesloaded);

    } else {
      self.timerID = amp.requestAnimationFrame(function(){
        self.update();
      });
    }

    if(self.loadCount > 99){
      self.loadCount = 100;
    }
  };


  /**
   * <h4>処理が止まっていないか監視します</h4>
   *
   * @method check
   * @return {Void}
   */
  Loader.p.check = function(){
    var self = this,
    count = self.count;

    self.checkID = setTimeout(function(){

      if(self.count === count){
        self.checkID = setInterval(function(){
          if(self.count !== self.length){
            self.count += 1;
          }
        }, 1000 / 60);

      } else {
        self.check();
      }
    }, self.checkTime);
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Loader.p.toString = function(){
    return '[object Loader]';
  };


  /**
   * <h4>ローダー</h4>
   * Loaderのショートハンド<br>
   * 処理が完了したら、jQuery Deferred Objectを返します
   *
   * @static
   * @method create
   * @param  {DOM} elm 対象のimgを囲う要素 省略可
   * @return {Loader} Loader生成してインスタンスを返す
   */
  Loader.create = function(elm){
    var loader = new Loader(elm);
    loader.init();
    return loader;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Loader = Loader;


}(window, jQuery));

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページトップのtoggle処理</h4>
   *
   * @class PagetopToggle
   * @constructor
   * @param  {jQuery} $target pagetop要素
   * @param  {Object} options オプション値
   * @return {PagetopToggle}
   */
  var PagetopToggle = function($target, options){
    this.$target = $target;
    if($target.css('display') === 'none'){
      $target.css({display: 'block', visibility: 'hidden'});
    }
    this.isShow = $target.css('visibility') === 'visible';
    this.isFixed = $target.css('position') === 'fixed';
    this.param = $.extend(true, {}, PagetopToggle.defaults, options);
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
  PagetopToggle.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  PagetopToggle.p = PagetopToggle.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  PagetopToggle.p._isInit = false;


  /**
   * <h4>window要素</h4>
   *
   * @property $window
   * @type {jQuery}
   */
  PagetopToggle.p.$window = $(root);


  /**
   * <h4>pagetop要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  PagetopToggle.p.$target = null;


  /**
   * <h4>表示されているか?</h4>
   *
   * @property isShow
   * @type {Boolean}
   */
  PagetopToggle.p.isShow = null;


  /**
   * <h4>Fixedポジションか?</h4>
   *
   * @property isFixed
   * @type {Boolean}
   */
  PagetopToggle.p.isFixed = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   showY    : 300, // {Number} 表示されるoffsetY値 </li><li>
   *   absoluteY: null, // {Number} ポジションabsoluteに切り替えるoffsetY値 </li><li>
   *   show     : { opacity : 1}, // {Object} 表示アニメーション時のcssプロパティ </li><li>
   *   hide     : { opacity : 0}, // {Object} 非表示アニメーション時のcssプロパティ </li><li>
   *   absolute : { position : 'absolute'}, // {Object} ポジションabsoluteのcssプロパティ </li><li>
   *   animate  : { // {Object} 表示・非表示のアニメートプロパティ <ul><li>
   *     duration : 400, </li><li>
   *     easing   : 'easeOutCubic', </li><li>
   *     complete : $.noop </li></ul>
   *    } </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  PagetopToggle.defaults = {
    showY    : 300,
    absoluteY: null,
    show     : { opacity : 1},
    hide     : { opacity : 0},
    absolute : { position: 'absolute'},
    animate  : {
      duration: 400,
      easing  : 'easeOutCubic',
      complete: $.noop
    }
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  PagetopToggle.p.param = null;



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
   * @return {PagetopToggle}
   */
   PagetopToggle.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {PagetopToggle}
   */
  PagetopToggle.p.init = function(){
    if(!this._isInit){
      this._isInit = true;
      this.toggle();
      this.setEvent();
    }
    return this;
  };


  /**
   * <h4>イベント設定</h4>
   *
   * @method setEvent
   * @return {PagetopToggle}
   */
  PagetopToggle.p.setEvent = function(){
    var self = this;
    self.$window.on('scroll.PagetopToggle', function(){
      self.toggle();
    });
    return this;
  };


  /**
   * <h4>要素の表示・非表示、ポジションモードの切り替え</h4>
   *
   * @method toggle
   * @return {PagetopToggle}
   */
  PagetopToggle.p.toggle = function(){
    var self = this,
    param = self.param,
    offsetY = self.$window.scrollTop();

    // 表示・非表示
    if(!self.isShow && param.showY < offsetY){
      self.isShow = true;
      self.$target.css({visibility: 'visible'}).css(param.hide)
      .stop(true, false).animate(param.show, param.animate);

    } else if(self.isShow && param.showY > offsetY){
      self.isShow = false;
      self.$target.stop(true, false).animate(param.hide, param.animate, function(){
        self.$target.css({visibility: 'hidden'});
      });
    }

    // fixed・absolute
    if(param.absoluteY){
      if(!self.isFixed && offsetY < param.absoluteY){
        self.isFixed = true;
        self.$target.css({position: 'fixed'});

      } else if(self.isFixed && offsetY > param.absoluteY){
        self.isFixed = false;
        self.$target.css(param.absolute);
      }
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  PagetopToggle.p.toString = function(){
    return '[object PagetopToggle]';
  };


  /**
   * <h4>ページトップボタンのToggle処理</h4>
   * PagetopToggleのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $target pagetop要素 省略可 初期値 $('#Pagetop')
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  PagetopToggle.create = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !$target instanceof jQuery){
      options = $target;
      $target = $('#Pagetop');
    }

    var pagetop = new PagetopToggle($target, options);
    pagetop.init();
    return pagetop;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.PagetopToggle = PagetopToggle;


}(window, jQuery));

;(function(root, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>Hogan.jsに依存します</b>
   *
   * @class Render
   * @constructor
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  var Render = function($tmpl, ajaxOptions){
    this.$tmpl = $tmpl;
    this.tmpl  = Hogan.compile($tmpl.html());
    this.ajaxOptions = $.extend(true, {}, Render.ajaxOptions, ajaxOptions);

    // コンテキスト固定
    _.bindAll(this, 'getData', 'createTemplate', 'render');
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
  Render.VERSION = '1.7';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Render.p = Render.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  Render.p._isInit = false;


  /**
   * <h4>JSTemplate要素</h4>
   *
   * @property $tmpl
   * @type {jQuery}
   */
  Render.p.$tmpl = null;


  /**
   * <h4>$tmplをHogan.jsでコンパイルしたデータ</h4>
   *
   * @property tmpl
   * @type {Object}
   */
  Render.p.tmpl = null;


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
   * <h4>$.ajaxで取得したデータ</h4>
   *
   * @property data
   * @type {Object}
   */
  Render.p.data = null;


  /**
   * <h4>jsTemplate要素に流し込むデータ</h4>
   *
   * @property tmplData
   * @type {Object}
   */
  Render.p.tmplData = null;


  /**
   * <h4>DOM生成したあと、挿入された要素</h4>
   *
   * @property $el
   * @type {jQuery}
   */
  Render.p.$el = null;



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
   Render.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {jQuery.Deferred} 処理が完了したことを通知します
   */
  Render.p.init = function(){
    var self = this;

    if(!this._isInit){
      this._isInit = true;
      // 縦列に処理します
      return $.stream(
        self.getData,
        self.createTemplate,
        self.render
      );
    }
  };


  /**
   * <h4>$.ajaxで、データを取得します</h4>
   *
   * @method getData
   * @return {jQuery.Deferred} 処理が、完了したことを通知します
   */
  Render.p.getData = function(){
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
  Render.p.ajaxDone = function(){
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
  Render.p.ajaxFail = function(xhr, status, error){
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
  Render.p.createTemplate = function(data){
    this.tmplData = data || this.data;
    return this;
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   * 文字列を返した場合、<p class="not-found" />を生成します。
   *
   * @method render
   * @return {Render}
   */
  Render.p.render = function(){
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
  Render.p.toString = function(){
    return '[object Render]';
  };


  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * Renderのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render} Renderインスタンスを返す
   */
  Render.create = function($tmpl, ajaxOptions){
    var render = new Render($tmpl, ajaxOptions);
    render.init();
    return render;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Render = Render;


}(window, jQuery));

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

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class Scroll
   * @constructor
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可 初期： $('a[href^=#]')
   * @param  {Object} options オプション値 省略可 初期： Scroll.defaults
   * @return {Scroll}
   */
  var Scroll = function($trigger, options){
    // $trigger指定がない場合、初期値を設定
    if(!$trigger || !$trigger instanceof jQuery){
      options = $trigger;
      $trigger = $('a[href^=#]');
    }
    this.$trigger = $trigger;
    this.param = $.extend(true, {}, Scroll.defaults, {$page: $('html, body')}, options);
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
  Scroll.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Scroll.p = Scroll.prototype;


  /**
   * <h4>トリガーとなるa要素</h4>
   *
   * @property $trigger
   * @type {Object}
   */
  Scroll.p.$trigger = null;


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
  Scroll.p.param = null;



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
   Scroll.extend = root.amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Scroll}
   */
  Scroll.p.on = function(){
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
  Scroll.p.off = function(){
    this.$trigger.off('click.Scroll');
    return this;
  };


  /**
   * <h4>スクロールアニメーション</h4>
   *
   * @method tween
   * @return {Void}
   */
  Scroll.p.tween = function(num){
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
  Scroll.p.toString = function(){
    return '[object Scroll]';
  };


  /**
   * <h4>ページ内リンクのスクロール</h4>
   * Scrollのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $trigger トリガーとなるa要素 省略可
   * @param  {Object} options オプション値 省略可
   * @return {Scroll} Scrollインスタンスを返す
   */
  Scroll.create = function($trigger, options){
    var scroll = new Scroll($trigger, options);
    scroll.on();
    return scroll;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Scroll = Scroll;


}(window, jQuery));

;(function(root, $){

  // 'use strict';

  // αバージョン

  /*--------------------------------------------------------------------------
    Task
  --------------------------------------------------------------------------*/
  /*
    リサイズ対応
    サムネイル対応
    css3対応
    コールバック関数
   */


  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>スライダー</h4>
   *
   * @class Slider
   * @constructor
   * @param  {jQuery} スライダー要素
   * @param  {Object} options オプション値 [defaults property参照]
   * @return {Slider}
   */
  var Slider = function($target, options){
    this.$target = $target;

    this.param = $.extend({}, Slider.defaults, {
      $slide  : $target.find('.slide'),
      $list   : $target.find('.slide').children(),
      $thumb  : $target.find('.thumb a'),
      $pointer: $target.find('.pointer li'),
      $prev   : $target.find('.prev > a'),
      $next   : $target.find('.next > a')
    }, options);
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
  Slider.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Slider.p = Slider.prototype;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、第二引数にoptionsを指定するとparamオブジェクトにmixinします<br>
   *
   * defaults: { <ul><li>
   *   $slide     : $('.slide'), スライドする要素 </li><li>
   *   $list      : $('.slide').children(), スライドする要素の子要素 </li><li>
   *   $thumb     : $('.thumb a'), サムネイル ※省略可 </li><li>
   *   $pointer   : $('.pointer li'), ポインタ要素 ※省略可 </li><li>
   *   $prev      : $('.prev > a'), ※省略可, </li><li>
   *   $next      : $('.next > a'), ※省略可, </li><li>
   *   activeClass: 'active', アクティブ時に付けるクラス名 </li><li>
   *   naviType   : 'rollover', サムネイルのロールオーバータイプ ['rollover', 'alpha', 'fade', 'slip', 'none'] </li><li>
   *   current    : 0, 初期表示にするシーン </li><li>
   *   timer      : 0, タイマー 0はoff </li><li>
   *   duration   : 400, スライドduration </li><li>
   *   ease       : 'easeOutExpo', スライドイージング </li><li>
   *   isFlick    : false, フリックの有効 </li><li>
   *   isLiquid   : false, リキッドレイアウトモードの有効 </li><li>
   *   loop       : false loopの有効 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Slider.defaults = {
    $slide     : null,
    $list      : null,
    $thumb     : null,
    $pointer   : null,
    $prev      : null,
    $next      : null,
    activeClass: 'active',
    // naviType   : 'rollover',
    current    : 0,
    timer      : 0,
    duration   : 400,
    ease       : 'easeOutQuart',
    isFlick    : true,
    flickHit   : 80,
    isLiquid   : false,
    loop       : false
  };


  /**
   * <h4>第一引数で指定したスライダー要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  Slider.p.$target = null;


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsと第二引数で設定したoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  Slider.p.param = null;


  /**
   * <h4>スライドのステージ幅</h4>
   *
   * @property stageWidth
   * @type {Number}
   */
  Slider.p.stageWidth = null;


  /**
   * <h4>スライド移動する距離</h4>
   *
   * @property distance
   * @type {Number}
   */
  Slider.p.distance = null;


  /**
   * <h4>スライドに表示されているリストの数</h4>
   *
   * @property shuoNum
   * @type {Number}
   */
  Slider.p.showListNum = null;


  /**
   * <h4>スライド要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Slider.p.length = null;


  /**
   * <h4>リキッド時のスライド要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Slider.p.liquidLength = null;


 /**
   * <h4>スライド回数のmax値</h4>
   *
   * @property countMax
   * @type {Number}
   */
  Slider.p.countMax = null;


  /**
   * <h4>スライド移動するステップ数</h4>
   *
   * @property step
   * @type {Number}
   */
  Slider.p.step = null;


  /**
   * <h4>タイマーID</h4>
   *
   * @property timerId
   * @type {String}
   */
  Slider.p.timerId = null;


  /**
   * <h4>リキッドモード時に、クローン生成する数</h4>
   *
   * @property clone
   * @type {Number}
   */
  Slider.p.clone = 3;


  /**
   * !important 使用していません
   * スライドアニメーションフラグ
   *
   * @property isAnimate
   * @type {Boolean}
   */
  Slider.p.isAnimate = false;



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
   * @return {Slider}
   */
   Slider.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @return {Slider}
   */
  Slider.p.init = function(){
    // 値設定
    this.setParam();

    // DOM生成
    this.createPointer();
    this.cloneElement();

    // スタイル設定
    this.setPosition();

    // イベント設定
    this.thumbNavi(this.param.$thumb);
    this.pointerNavi(this.param.$pointer.find('a'));
    this.prevNavi(this.param.$prev);
    this.nextNavi(this.param.$next);
    this.flickNavi();
    this.timerStart();
    this.resize();

    return this;
  };


  /**
   * <h4>パラメーターを設定します</h4>
   *
   * @method setParam
   * @return {Slider}
   */
  Slider.p.setParam = function(){
    var listWidth = this.param.$list.outerWidth(true); // リストの幅

    this.step         = this.param.current;
    this.length       = this.length || this.param.$list.length; // スライド素数
    this.liquidLength = this.length * this.clone; // リキッド時のスライド素数
    this.stageWidth   = this.param.$slide.parent().width(); // スライドエリア幅
    this.showListNum  = this.param.isLiquid ? 1 : Math.floor(this.stageWidth / listWidth); // 表示数(リキッド時は1)
    this.distance     = this.showListNum * listWidth; // スライド距離
    this.countMax     = Math.ceil(this.length / this.showListNum); // スライドカウント最大数

    // 高さはいるのか？

    return this;
  };


  /* CreateElements
  -----------------------------------------------------------------*/

  /**
   * <h4>ポインター要素があればをポインターを生成します</h4>
   *
   * @method createPointer
   * @return {Slider}
   */
  Slider.p.createPointer = function(){
    if(this.param.$pointer[0]){
      var frag = document.createDocumentFragment(),
      el = this.param.$pointer[0],
      i = 0,
      $el;

      for(; i < this.countMax; i += 1){
        frag.appendChild(el.cloneNode(true));
      }

      $el = $(frag).children();
      this.param.$pointer.replaceWith($el);
      this.param.$pointer = $el;
    }

    return this;
  };


  /**
   * <h4>リキッド時、スライド要素をクローンします</h4>
   *
   * @method cloneElement
   * @return {Slider}
   */
  Slider.p.cloneElement = function(){
    var param = this.param;

    if(param.isLiquid && this.liquidLength !== param.$list.length){
      var copy = param.$slide.html(),
      print = '',
      i = 0;

      for(; i < this.clone; i += 1){
        print += copy;
      }

      param.$list = param.$slide.html(print).children();
    }

    return this;
  };


  /* Navigations
  -----------------------------------------------------------------*/

  /**
   * <h4>pointerナビゲーションイベントの実装</h4>
   *
   * @method pointerNavi
   * @param {jQuery} $target pager要素
   * @return {Slider}
   */
  Slider.p.pointerNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      self.controller($target.index(this));
      return false;
    });

    return this;
  };


  /**
   * <h4>サムネイルナビゲーションイベントの実装</h4>
   *
   * @method thumbNavi
   * @param {jQuery} $target pager要素
   * @return {Slider}
   */
  Slider.p.thumbNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      var current = Math.floor($target.index(this) / self.showListNum);
      self.controller(current);
      return false;
    });

    return this;
  };


  /**
   * <h4>戻るボタンイベントの実装</h4>
   *
   * @method prevNavi
   * @param {jQuery} $target 戻るボタン要素
   * @return {Slider}
   */
  Slider.p.prevNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      self.prev();
      return false;
    });

    return this;
  };


  /**
   * <h4>次へボタンイベントの実装</h4>
   *
   * @method nextNavi
   * @param {jQuery} $target 次ぎへボタン要素
   * @return {Slider}
   */
  Slider.p.nextNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      self.next();
      return false;
    });

    return this;
  };


  /**
   * <h4>フリックナビゲーション</h4>
   *
   * @method flickNavi
   * @return {Slider}
   */
  Slider.p.flickNavi = function(){
    var self = this,
    isClick = true,
    isFlick = self.param.isFlick;

    self.param.$slide.hammer()
      // touchmove
      .on('pan', function(event){
        if(!isFlick) return false;

        var x = Number(event.gesture.deltaX);

        if(10 < Math.abs(x)){
          isClick = false;
          self.timerStop();
          self.flickMove(x);
        }
      })
      // touchend
      .on('panend', function(event){
        if(!isFlick) return false;

        var x = Number(event.gesture.deltaX),
        hit = self.param.flickHit;

        if(hit < x){
          self.prev();

        } else if((hit * -1) > x){
          self.next();

        } else {
          // 元の位置に戻す
          self.controller(self.param.current);
        }
        setTimeout(function(){
          isClick = true;
        }, 50);
      })
      // click キャンセル・有効の判定処理
      .find('a').on('click', function(){
        return isClick;
      });

    return this;
  };


  /**
   * <h4>フリックモードのON・OFFの切り替え</h4>
   *
   * @method flickMode
   * @param {Boolean} isMode フリックONは、true
   * @return {Slider}
   */
  Slider.p.flickMode = function(isMode){
    this.param.isFlick = !!isMode;
    return this;
  };


  /**
   * <h4>タイマースタート</h4>
   *
   * @method timerStart
   * @param  {Number} timer タイマーを時間をセットします。省略可
   * @return {Slider}
   */
  Slider.p.timerStart = function(timer){
    var self = this;

    self.timerStop();

    if($.isNumeric(timer)){
      self.param.timer = timer;
    }

    if(0 < self.param.timer){
      self.timerId = setTimeout(function(){
        self.next();
      }, self.param.timer + self.param.duration);
    }

    return this;
  };


  /**
   * <h4>タイマーストップ</h4>
   *
   * @method timerStop
   * @return {Slider}
   */
  Slider.p.timerStop = function(){
    clearTimeout(this.timerId);
    return this;
  };


  /**
   * !important 実装中
   * <h4>リサイズ時のイベント</h4>
   *
   * @method resize
   * @return {Slider}
   */
  Slider.p.resize = function(){
    var self = this;

    $(root).on('resize.Slider', function(){
      self.setParam();
      self.setPosition();
    });

    return this;
  };


  /* Controllers
  -----------------------------------------------------------------*/

  /**
   * <h4>前に戻るります</h4>
   *
   * @method prev
   * @return {Slider}
   */
  Slider.p.prev = function(){
    var current = 0 < this.param.current ? this.param.current : this.countMax;
    this.controller(current - 1);
    return this;
  };


  /**
   * <h4>次へ進みます</h4>
   *
   * @method next
   * @return {Slider}
   */
  Slider.p.next = function(){
    var next = this.param.current < this.countMax -1 ? this.param.current + 1 : 0;
    this.controller(next);
    return this;
  };


  /**
   * <h4>スライダーを制御します</h4>
   * 値の更新、スタイルはここで決めています
   *
   * @method controller
   * @param  {Number} num スライドナンバー
   * @return {Slider}
   */
  Slider.p.controller = function(num){
    var param =  this.param,
    diff,
    current;

    this.timerStart();

    if(num < this.length){
      current = param.current;
      param.current = num;
      diff = param.current - current;
      this.step = Math.abs(diff) < this.countMax / 2 ? diff : 0 < diff ? diff - this.length : this.length + diff;

      this.tween();
    }

    return this;
  };


  /* Views
  -----------------------------------------------------------------*/
  /**
   * <h4>ナビゲーションのアクティブ化</h4>
   *
   * @method setActive
   * @return {Slider}
   */
  Slider.p.setActive = function(){
    var param = this.param,
    num = param.current * this.showListNum;

    // loopしない場合、$prev, $next表示・非表示する
    if(!param.loop){
      if(param.current === 0){
        param.$prev.css({display: 'none'});
        param.$next.css({display: 'block'});

      } else if(param.current === this.countMax -1){
        param.$prev.css({display: 'block'});
        param.$next.css({display: 'none'});

      } else {
        param.$prev.css({display: 'block'});
        param.$next.css({display: 'block'});
      }
    }

    // $pointerのアクティブ
    param.$pointer.removeClass(param.activeClass).eq(param.current).addClass(param.activeClass);

    // $thumbのアクティブ
    if(param.naviType && param.naviType !== 'none'){
      // rolloverの処理
    } else {
      param.$thumb.removeClass(param.activeClass)
        .slice(num, num + this.showListNum).addClass(param.activeClass);
    }

    return this;
  };


  /* Tweens
  -----------------------------------------------------------------*/
  /**
   * <h4>left値の取得</h4>
   *
   * @method getOffsetX
   * @param {Number} num? 指定要素のセンター位置
   * @return {Number} 現在のleft値を返す
   */
  Slider.p.getOffsetX = function(num){
    var self = this,
    param = self.param,
    left;

    if(param.isLiquid){
      num = $.isNumeric(num) ? num : self.step;
      // 中央位置 = 要素の半分サイズ + 現在アクティブ要素の位置
      left = (self.stageWidth - self.distance) / 2 + (self.distance * (num + self.length)) * -1;
    } else {
      left = self.distance * param.current * -1;
    }

    return left;
  };


  /**
   * <h4>ポジションをセットします</h4>
   *
   * @method setPosition
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.setPosition = function(){
    var width = this.param.isLiquid ? this.distance * this.liquidLength : this.distance * this.length;
    this.setActive();
    return this.param.$slide.css({width: width, left: this.getOffsetX()});
  };


  /**
   * <h4>タッチした距離動かす</h4>
   *
   * @method flickMove
   * @param  {Number} x 動いた分の座標
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.flickMove = function(x){
    return this.param.$slide.css({left: this.getOffsetX() + x});
  };


  /**
   * <h4>スライドします</h4>
   *
   * @method tween
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.tween = function(){
    var self = this;
    param = this.param;

    $.stream(
      function(){
        // スライド
        self.setActive();
        return param.$slide.stop(true, false).animate({left: self.getOffsetX()}, param.duration, param.ease);
      },
      function(){
        // リッキド時ポジションを初期位置に戻す
        if(self.param.isLiquid){
          return param.$slide.qCss({left: self.getOffsetX(0)}, function(){
            if(0 < self.step){
              param.$slide.append(param.$slide.children().slice(0, self.step));
            } else {
              param.$slide.prepend(param.$slide.children().slice(self.length + self.step));
            }
          });
        }
      }
    );
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Slider = Slider;


}(window, jQuery));

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

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ソート</h4>
   * Renderクラスと組み合わせて使います
   *
   * @class Sort
   * @constructor
   * @param  {jQuery} トリガーa要素 hrefにフィルター値(先頭に#付けた)をセットする
   * @param  {Render} render レンダーインスタンス
   * @return {Sort}
   */
  var Sort = function($trigger, render){
    this.$trigger = $trigger;
    this.render = render;
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
  Sort.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Sort.p = Sort.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  Sort.p._isInit = false;


  /**
   * <h4>トリガーa要素</h4>
   * href値に先頭に#付けた検索キーを与えてください
   *
   * @property $trigger
   * @type {jQuery}
   */
  Sort.p.$trigger = null;


  /**
   * <h4>amp Render Sortを格納します</h4>
   *
   * @property $render
   * @type {amp Render Sort}
   */
  Sort.p.render = null;


  /**
   * <h4>現在のフィルター値</h4>
   * トリガーのhref値（ハッシュを省いた値）が格納されます<br>
   * all値はフィルタリング処理を行いません
   *
   * @property current
   * @default 'all'
   * @type {String}
   */
  Sort.p.current = 'all';


  /**
   * <h4>トリガーのアクティブ時のクラス名</h4>
   *
   * @property activeClass
   * @default 'active'
   * @type {String}
   */
  Sort.p.activeClass = 'active';


  /**
   * <h4>アニメーションの状態を管理するフラグ</h4>
   *
   * @property isAnimate
   * @default false
   * @type {Boolean}
   */
  Sort.p.isAnimate = false;



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
   * @return {Sort}
   */
  Sort.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {Sort}
   */
  Sort.p.init = function(){
    if(!this._isInit){
      this._isInit = true;
      this.active();
      this.setTrigger(this.$trigger);
    }
    return this;
  };


  /**
   * <h4>トリガー要素のイベント登録</h4>
   *
   * @method setTrigger
   * @return {Sort}
   */
  Sort.p.setTrigger = function($trigger){
    var self = this;

    $trigger.on('click.Sort', function(){
      self.controller($(this).attr('href'));
      return false;
    });

    return this;
  };


  /**
   * <h4>処理のコントロール</h4>
   * ここでパラメータの変更を行います
   *
   * @method controller
   * @param  {String} current フィルター値
   * @return {jQuery.Deferred} 処理が完了したことを通知します
   */
  Sort.p.controller = function(current){
    var self = this;
    current = current.replace(/#/, '');

    if(this.current === current || this.isAnimate){
      return $.stream();
    }

    // 縦列処理します
    return $.stream(
      function(){
        // 検索結果を設定
        self.isAnimate = true;
        self.current = current;
        self.active();
        self.render.createTemplate(self.findItem(self.current));
      },
      function(){
        // 現在表示している要素を消す
        return self.hide();
      },
      function(){
        // DOMを入れ替え
        return self.resetHTML();
      },
      function(){
        // 追加した要素を表示
        return self.show();
      },
      function(){
        // 待機状態に戻す
        self.isAnimate = false;
      }
    );
  };


  /**
   * <h4>ナビゲーションのアクティブ</h4>
   *
   * @method active
   * @return {Sort}
   */
  Sort.p.active = function(){
    var self = this;
    self.$trigger.removeClass(self.activeClass).each(function(){
      if($(this).attr('href') === '#' + self.current){
        $(this).addClass(self.activeClass);
        return false;
      }
    });

    return this;
  };


  /**
   * <h4>検索処理</h4>
   *
   * @method findItem
   * @param  {String} current フィルター値
   * @return {Array | String} 検索結果（配列）を返す。見つからない場合は、notFoundを返す。
   */
  Sort.p.findItem = function(current){
    var self = this,
    sort = {};

    if(current === 'all'){
      sort = self.render.data;
    } else {
      sort = _.filter(self.render.data, function(list){
        return list === current;
      });
    }

    return sort;
  };


  /**
   * <h4>検索結果が無い場合、文字列を返す</h4>
   *
   * @method notFound
   * @return {DOM} '<p class="not-found">検索結果は0件です。</p>'
   */
  Sort.p.notFound = function(){
    return '<p class="not-found">検索結果は0件です。</p>';
  };


  /**
   * <h4>HTMLの入れ替え</h4>
   *
   * @method resetHTML
   * @return {jQuery} 新しくセットしたDOM
   */
  Sort.p.resetHTML = function(){
    var self = this,
    $el;

    if(typeof self.render.tmplData === 'string'){
      $el = $(self.notFound());
    } else {
      $el = $(self.render.tmpl.render(self.render.tmplData));
    }

    self.render.$el.replaceWith($el.css({opacity: 0}));
    self.render.$el = $el;
    return self.render.$el;
  };


  /**
   * <h4>現在表示の要素を消す</h4>
   *
   * @method hide
   * @return {jQuery} 要素が非表示になったことを通知します
   */
  Sort.p.hide = function(){
    return this.render.$el.stop(true, false).animate({opacity: 0});
  };


  /**
   * <h4>新しくセットされた要素の表示</h4>
   *
   * @method show
   * @return {jQuery} 要素が表示されたことを通知します
   */
  Sort.p.show = function(){
    return this.render.$el.stop(true, false).animate({opacity: 1});
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Sort.p.toString = function(){
    return '[object Sort]';
  };


  /**
   * <h4>ソート</h4>
   * ソートショートハンド
   *
   * @method create
   * @param  {jQuery} トリガーa要素 hrefにフィルター値(先頭に#付けた)をセットする
   * @param  {Render Instance} render レンダーインスタンス
   * @return {Sort} Sortインスタンスを返す
   */
  Sort.create = function($trigger, render){
    var sort = new Sort($trigger, render);
    sort.init();
    return sort;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Sort = Sort;


}(window, jQuery));

;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

	/**
	 * <h4>レスポンシブのブレイクポイントで画像を切り替えます</h4>
	 * PC基準で設計しています。<br>
	 * <b>※IE8以下は、機能しません</b>
	 *
   * @class SwichImage
   * @constructor
   * @param  {jQuery} $images 対象のimg要素
   * @param  {Object} breaks ブレークポイント値と画像に付加する文字列 値はdefaults参照
   * @return {SwichImage}
   */
	var SwichImage = function($images, breaks){
		this.$images = $images;
		this.breaks = breaks || SwichImage.defaults;
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
  SwichImage.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  SwichImage.p = SwichImage.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  SwichImage.p._isInit = false;


  /**
   * <h4>対象のimg要素</h4>
   *
   * @property $images
   * @type {jQuery}
   */
  SwichImage.p.$images = null;


  /**
   * <h4>切り替える画像リスト</h4>
   *
   * @property images
   * @type {Arrary}
   */
  SwichImage.p.images = null;


  /**
   * <h4>表示中の画像リストナンバー</h4>
   *
   * @property current
   * @type {Number}
   */
  SwichImage.p.current = 0;


  /**
   * <h4>ブレークポイントのデフォルト値</h4>
   * コンストラクタが呼び出す際に、第二引数指定が無い場合breaksに引き渡します<br>
   * 第二引数に複数ブレークポイント追加する際は、同様の内容を配列に追加<br>
   * defaults: [{ <ul><li>
   *   x  : 768, // {Number} ブレークポイント </li><li>
   *   add: '_sp' // {String} 追加する文字列 </li><li>
   *   ext: null // {String} 拡張子 変更する場合指定</li></ul>
   * }];
   *
   * @static
   * @property defaults
   * @type {Array}
   */
  SwichImage.defaults = [{
		x  : 768,
		add: '_sp',
		ext: null
	}];


  /**
   * <h4>ブレークポイント</h4>
   *
   * @property breaks
   * @type {Number}
   */
	SwichImage.p.breaks = null;



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
   * @return {SwichImage}
   */
   SwichImage.extend = root.amp._extend;


	/**
	 * <h4>初期化</h4>
	 * シングルトンパターン
	 *
	 * @method init
	 * @return {SwichImage}
	 */
	SwichImage.p.init = function(){
		if(!this._isInit){
			this._isInit = true;
			this.sort();
			this.createImages();
			this.on();
		}
		return this;
	};


	/**
	 * <h4>ブレークポイントを小さい順に並び変える</h4>
	 *
	 * @method sort
	 * @return {SwichImage}
	 */
	SwichImage.p.sort = function(){
		this.breaks.sort(function(a, b){
			return a.x > b.x;
		});
		return this;
	};


	/**
	 * <h4>切り替える画像を生成します</h4>
	 * 生成後、exchangeメソッドで最適な画像を割り当てます
	 *
	 * @method createImages
	 * @return {SwichImage}
	 */
	SwichImage.p.createImages = function(){
		var img, preload, src, ext,
		i = 0,
		l = this.breaks.length;

		for(; i < l; i += 1){
			src = this.$images.eq(i).attr('src');
			ext = src.substring(src.lastIndexOf('.'), src.length);
			img = src.replace(ext, this.breaks[i].add + ext);

			preload =	new Image();
			preload.src = img;
			this.images.push(img);
		}

		this.exchange();

		return this;
	};


	/**
	 * <h4>イベント登録</h4>
	 *
	 * @method on
	 * @return {SwichImage}
	 */
	SwichImage.p.on = function(){
		var self = this;
		if(!amp.isBrowser('ie', 8, 'prev')){
			this.off();
			$(window).on('resize.SwichImage', function(){
				self.exchange();
			});
		}

		return this;
	};


	/**
	 * <h4>イベント削除</h4>
	 *
	 * @method off
	 * @return {SwichImage}
	 */
	SwichImage.p.off = function(){
		if(!amp.isBrowser('ie', 8, 'prev')){
			$(window).off('resize.SwichImage');
		}
		return this;
	};


	/**
	 * <h4>画面サイズを判定して最適な画像を割り当てます</h4>
	 *
	 * @method exchange
	 * @return {SwichImage}
	 */
	SwichImage.p.exchange = function(){
		var num,
		width = window.innerWidth,
		i = 0,
		l = this.breaks.length;

		// ブレークポイントを調べる
		for(; i < l; i += 1){
			if(width <= this.breaks[i].x){
				num = i + 1;
				break;
			}
		}

		num = num ? num : 0;

		// 画像を入れ替える
		if(this.current !== num){
		// if(typeof this.current !== 'number' || this.current !== num){
			this.current = num;
			this.$images.attr({src: this.images[num]});
		}

		return this;
	};


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  SwichImage.p.toString = function(){
    return '[object SwichImage]';
  };


  /**
	 * <h4>ブレイクポイントで画像を切り替えます</h4>
	 * SwichImageショートハンド
	 * <b>※IE8以下は、機能しません</b>
   *
   * @method create
   * @param  {jQuery} $images 対象のimg要素
   * @param  {Object} breaks ブレークポイント値と画像に付加する文字列 値はdefaults参照
   * @return {SwichImage} SwichImageインスタンスを返す
   */
  SwichImage.create = function($images, breaks){
		var swichImage = new SwichImage($images, breaks);
		swichImage.on();
		return swichImage;
	};




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.SwichImage = SwichImage;


}(window, jQuery));
