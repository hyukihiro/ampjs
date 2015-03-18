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


(function(root, Backbone, _) {


  /*----------------------------------------------------------------------
    ### SAMPLE CODE ###
  ----------------------------------------------------------------------*/
  /*
	var router = new app.Router();

	// URLの監視開始
	Backbone.history.start({
		root: '',
		pushState: false
	});

	router.navigate('url', {trigger: true});
	*/



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ルータイベントを管理します</h4>
   * イベントハンドリングは、MEDIATORでします
   *
   * @class Router
   */
  var Router = {};



  /*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @property VERSION
   * @type {String}
   */
  Router.VERSION = '1.0';


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {String}
   */
  Router.name = 'Router';


	/**
	 * <h4>ルータイベント設定</h4>
	 *
	 * @property routes
	 * @type {Object}
	 */
	Router.routes = {
		'': 'trigger'
	};



  /*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/**
	 * <h4>イベントを発行します</h4>
	 *
	 * @method trigger
	 * @param  {String} event イベント名
	 * @return {Void}
	 */
	Router.trigger = function(event) {
		// app.MEDIATOR.trigger(イベントキー, イベントオブジェクト);
	};


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Router.toString = function(){
    return '[object Router name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	root.app = root.app || {};
	root.app.Router = Backbone.Router.extend(Router);



}(window, Backbone, _));
