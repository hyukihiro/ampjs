(function(root, Backbone, _, $){


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>モデルを管理します</h4>
   *
   * @class Model
   */
  var Model = {};



  /*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @property VERSION
   * @type {String}
   */
  Model.VERSION = '1.0';


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {String}
   */
  Model.name = 'Model';


	/**
	 * <h4>初期値</h4>
	 * 初期化されたときにオプション値とmixinします
	 *
	 * @property defaults
	 * @type {Object}
	 */
	Model.defaults = {
    /*
    ajax: {
      url     : '',
      dataType: 'json',
      chache  : false
    },
    _data: null
    */
  };



  /*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   *
   * @method initialize
   * @return {Model}
   */
  Model.initialize = function(options){
    var self = this;

		self.attributes = $.extend(true, {}, self.defaults, options);

    // コンテキスト固定
    // _.bindAll(self, 'methodName'...);

		return self;
  };


  /**
   * <h4>ajax通信でデータを取得します</h4>
   * 通信エラー時、failメソッドが呼び出されます
   *
   * @method getData
   * @return {jQuery.Deferred}
   */
  Model.getData = function(){
    var self;

    return $.ajax(self.get('ajax'))
    .done(function(data){
      self.set('_data', data);
    })
    .fail(self.fail);
  };


  /**
   * <h4>通信エラー時、呼び出されます</h4>
   *
   * @method fail
   * @return {Void}
   */
  Model.fail = function(xhr, status, error){
    console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);

    if(window.confirm('ファイルの取得に失敗しました。\nページをリロードしますか?')) {
      location.reload();
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Model.toString = function(){
    return '[object Model name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	root.app = root.app || {};
	root.app.Model = Backbone.Model.extend(Model);



}(window, Backbone, _, jQuery));
