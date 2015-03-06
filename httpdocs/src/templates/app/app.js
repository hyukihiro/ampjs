/**
 * AMP JavaScript Library
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

// 後日作成
// アプリケーションを管理します

	function App(){};

	p = App.prototype;


	/**
	 *
	 * @module
	 * @return {[type]} [description]
	 */
	var app = {};


	/**
	 * [state description]
	 * @type {String}
	 */
	app.state = 'preparation';


	app.isDevelop = false;

	app.manage = null;

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	app.init = function(){
		if(app.state !== 'preparation'){
			app.state = 'start';

			app.manage = new app.View();
        app.Mediator.on('sort', function(event) {
            self.sortRenderTween(event);
        });

        // URLの監視開始
        Backbone.history.start({
            root: '/matcollection/',
            pushState: false
        });




		};

		return this;
	};



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	root.app = app;


}(window, Backbone, _, jQuery));
