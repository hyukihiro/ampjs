;(function($, Typy){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

	/**
	 * <h4>ホバートゥイーン</h4>
	 *
   * @class Typy.HoverTween
   * @constructor HoverTween
   * @param  {jQuery} $images 対象のimg要素
   * @param  {Object} options? オプション値 値はdefaults参照 省略可
   * @return {Instance}
   */
	var HoverTween = function($images, options){
		var key, module;
		this.$images = $images;
		this.param = $.extemd(true, {}, HoverTween.defaults, options);

		// export
		module = HoverTween[this.param.type];
		if(module){
			for(key in module){
				this[key] = module[key];
			}
		} else {
			console.log(this.param.type + 'のtypeは、ありません。');
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
  HoverTween.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  HoverTween.p = HoverTween.prototype;


  /**
   * <h4>トリガーとなるimg要素</h4>
   *
   * @property $images
   * @type {jQuery}
   */
  HoverTween.p.$images = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults: { <ul><li>
   *   isResize: false, // {Boolean} リサイズ時、高さを揃えなおすか </li><li>
   *   key     : null, // {String} Typy.fontResizeイベントに渡すコールバックキー </li><li>
   *   timer   : 100 // {Number} リサイズイベントタイミング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
	HoverTween.defaults = {
	};


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
	HoverTween.p.param = null;


	/**
	 * <h4>rolloverモジュール</h4>
	 * インスタンス生成時、エクスポートします
	 *
	 * @property rollover
	 * @type {Object}
	 */
	HoverTween.rollover = {};


	/**
	 * <h4>alphaモジュール</h4>
	 * インスタンス生成時、エクスポートします
	 *
	 * @property alpha
	 * @type {Object}
	 */
	HoverTween.alpha = {};


	/**
	 * <h4>fadeモジュール</h4>
	 * インスタンス生成時、エクスポートします
	 *
	 * @property fade
	 * @type {Object}
	 */
	HoverTween.fade = {};


	/**
	 * <h4>slipモジュール</h4>
	 * インスタンス生成時、エクスポートします
	 *
	 * @property slip
	 * @type {Object}
	 */
	HoverTween.slip = {};



	/*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/**
	 * <h4>クラスを拡張します</h4>
	 * Typy.extendをエクスポートしています
	 *
	 * @static
	 * @method extend
	 * @param {Object} protoProp プロトタイプオブジェクト
	 * @param {Object} staticProp staticオブジェクト
	 * @return {Extend Class}
	 */
	HoverTween.extend = Typy.extend;


	/**
	 * <h4>初期化</h4>
	 *
	 * @method init
	 * @return {Instance} インスタンスを返す
	 */
	HoverTween.p.init = null;
	HoverTween.p.active = null;
	HoverTween.p.on = null;
	HoverTween.p.off = null;
	HoverTween.p.over = null;
	HoverTween.p.remove = null;
	HoverTween.p.createSlipStyle = null;


	/**
	 * <h4>スリップするスタイルを生成</h4>
	 *
	 * [createSlipStyle description]
	 * @param  {String} slip マウスアクションした方向
	 * @return {Object} スタイルを生成して返す
	 */
	HoverTween.createSlipStyle = function(slip){
		var style = {
			top : 0,
			left: 0
		};

		switch (slip){
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


	HoverTween.create = function(){
	};


	HoverTween.active = function(){
	};


	/*--------------------------------------------------------------------------
		@module rollover
	--------------------------------------------------------------------------*/
	HoverTween.rollover.init = function(){
		var i = 0,
		l = this.param.$images.length,
		$img, src, ext;

		for(; i < l; i += 1){
			$img = this.param.$images.eq(i);
			$img.rollover = {};

			// 画像データ設定
			src = $img.attr('src');
			ext = src.substring(src.lastIndexOf('.'), src.length);

			// 現在on画像の場合、off画像にする
			if(src.lastIndexOf(this.param.postfix + ext) > -1){
				$img.rollover.on = src;
				$img.rollover.off = src.replace(this.param.postfix + ext, ext);

				if(!$img.hasClass(this.param.activeClass)){
					$img[0].src = $img.rollover.off;
				}
			} else {
				$img.rollover.off = src;
				$img.rollover.on = src.replace(ext, this.param.postfix + ext);
				Typy.preload($img.rollover.on);
			}

			// スタイル設定
			if($img.hasClass(this.param.activeClass)){
				this.active($img);
			} else if($img.hasClass(this.param.noOverClass)){
				this.off($img);
			} else {
				this.on($img);
			}
		}

		return this;
	};


	HoverTween.rollover.active = function($img){
		if($img){
			this.off($img);
			$img.attr({src: $img.rollover.on}).addClass(this.param.activeClass);

		} else {
			var $target,
			i = 0,
			l = this.param.$images.length;

			this.off();
			for(; i < l; i += 1){
				$target = this.param.$images.eq(i);
				$target.attr({src: $target.rollover.on}).addClass(this.param.activeClass);
			}
		}

		return this;
	};

	HoverTween.rollover.off = function($img){
		var param = this.param,
				$trigger;

		$img.group = $img.closest('.' + param.groupClass);
		$trigger = $img.group[0] ? $img.group : $img.box[0] ? $img.box : $img;

		$img.removeClass(param.activeClass + ' ' + param.noOverClass);
		if(param.type === 'slip'){
			$trigger.off('slipin.' + param.type + ' slipout.' + param.type);
		} else {
			$trigger.off('mouseenter.' + param.type + ' mouseleave.' + param.type);
		}

		return this;
	};



	HoverTween.rollover.on = function(){};
	HoverTween.rollover.over = function(){};


	/*--------------------------------------------------------------------------
		@module alpha
	--------------------------------------------------------------------------*/
	HoverTween.alpha.init = function(){};
	HoverTween.alpha.active = function(){};
	HoverTween.alpha.on = function(){};
	HoverTween.alpha.off = function(){};
	HoverTween.alpha.over = function(){};


	/*--------------------------------------------------------------------------
		@module fade
	--------------------------------------------------------------------------*/
	HoverTween.fade.init = function(){};
	HoverTween.fade.active = function(){};
	HoverTween.fade.on = function(){};
	HoverTween.fade.off = function(){};
	HoverTween.fade.over = function(){};
	HoverTween.fade.remove = function(){};


	/*--------------------------------------------------------------------------
		@module slip
	--------------------------------------------------------------------------*/
	HoverTween.slip.init = function(){};
	HoverTween.slip.active = function(){};
	HoverTween.slip.on = function(){};
	HoverTween.slip.off = function(){};
	HoverTween.slip.over = function(){};
	HoverTween.slip.remove = function(){};
	HoverTween.slip.createSlipStyle = HoverTween.createSlipStyle;




	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	Typy.HoverTween = HoverTween;



}(jQuery, this.Typy = this.Typy || {}));
