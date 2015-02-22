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
