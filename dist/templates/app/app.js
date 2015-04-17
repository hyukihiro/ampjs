(function(root, Backbone, _, $){

// 後日作成
// アプリケーションを管理します

	function App(){}

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
		}

		return this;
	};



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	root.app = app;


}(window, Backbone, _, jQuery));
