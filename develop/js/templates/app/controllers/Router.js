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
