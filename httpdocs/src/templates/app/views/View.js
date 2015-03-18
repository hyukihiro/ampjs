/**
 * AMP.JS JavaScript Library
 *
 * Author: Yoshihito Fujiwara
 * Source: https://bitbucket.org/cutupworks/ampjs
 *
 * @licence MIT Licence
 *
 * Copyright (c) 2015 Yoshihito Fujiwara
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


(function(root, Backbone, _, $){


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ビューを管理します</h4>
   *
   * @class View
   */
  var View = {};



  /*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @property VERSION
   * @type {String}
   */
  View.VERSION = '1.0';


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {String}
   */
  View.name = 'View';


	/**
	 * <h4>初期値</h4>
	 * 初期化されたときにオプション値とmixinします
	 *
	 * @property defaults
	 * @type {Object}
	 */
	View.defaults = {};


  /**
   * <h4>ビューのルート要素</h4>
   * 初期化後、jQueryオブジェクトとして$elに格納されます
   *
   * @property defaults
   * @type {Object}
   */
  View.el = 'body';


  /**
   * <h4>ビューモデル</h4>
   *
   * @property model
   * @type {Model}
   */
  View.model = null;


  /**
   * <h4>ビュートゥイーン</h4>
   *
   * @property tween
   * @type {Tween}
   */
  View.tween = null;


  /**
   * <h4>イベントを設定します</h4>
   *
   * @property events
   * @type {Object}
   */
  View.events = {
    // 'eventName .el': 'triggerName'
  };



  /*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   *
   * @method initialize
   * @return {View}
   */
  View.initialize = function(options){
    var self = this;

		self.attributes = $.extend(true, {}, self.defaults, options);
    // self.model   = new app.Model(options);
    // self.tween   = new app.Tween();
    // self.render  = new app.Render($('#JST'));

    // コンテキスト固定
    // _.bindAll(self, 'methodName'...);

		return self;
  };


  /**
   * <h4>レンダリングします</h4>
   *
   * @method render
   * @return {View}
   */
  View.render = function(){
    var self = this;
    // somecode...
    return self;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  View.toString = function(){
    return '[object View name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	root.app = root.app || {};
	root.app.View = Backbone.View.extend(View);



}(window, Backbone, _, jQuery));
