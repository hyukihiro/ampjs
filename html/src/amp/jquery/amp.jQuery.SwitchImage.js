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
