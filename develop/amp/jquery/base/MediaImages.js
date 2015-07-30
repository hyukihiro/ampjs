/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>メディアクエリのブレイクポイントに応じて、画像を書き換えます</h4>
   * !!! AMP.Mediaqueryを継承しています
   *
   * @class AMP.$.MediaImageChange
   * @extends AMP.Mediaquery
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @constructor
   */
	function MediaImageChange($images, options){
		if(!$images || !($images instanceof jQuery)){
      options = $images;
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
		this.param = $.extend(true,
      {},
      MediaImageChange.mediaImagesOptions,
      options
    );

    if(!$images || !($images instanceof jQuery)){
      $images = $('img[' + this.param.attrKey + ']');
    }

    /**
     * <h4>画像を書き換える要素</h4>
     *
     * @property param.$images
     * @type {jQuery}
     */
    this.param.$images = $images;

    /**
     * <h4>現在の状態</h4>
     *
     * @property param.current
     * @type {String}
     */
    this.param.current = null;

		// superClass constructor call
		MediaImageChange.Mediaquery_constructor.call(this, this.param.element);
	}

  // AMP.Mediaqueryクラスを継承
  AMP.inherits(MediaImageChange, AMP.Mediaquery);

  // prototype
  var p = MediaImageChange.prototype;



  /*----------------------------------------------------------------------
    @property
  ----------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  MediaImageChange.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'MediaImageChange';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   *
   * @static
   * @property mediaImagesOptions
   * @type {Object}
   */
  /**
   * <h4>監視対象要素</h4>
   *
   * @static
   * @property mediaImagesOptions.element
   * @type {DOM}
   */
  /**
   * <h4>画像ファイルパス格納属性名</h4>
   *
   * @static
   * @property mediaImagesOptions.attrKey
   * @default 'data-media-img'
   * @type {String}
   */
  /**
   * <h4>画像ファイルに追加するprefix</h4>
   *
   * @static
   * @property mediaImagesOptions.imagePrefix
   * @default '_'
   * @type {String}
   */
  /**
   * <h4>対象要素監視しているか？</h4>
   *
   * @static
   * @property mediaImagesOptions.isObserver
   * @type {String}
   */
  MediaImageChange.mediaImagesOptions = {
    element    : null,
    attrKey    : 'data-media-img',
    imagePrefix: '_',
    isObserver : true
  };



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>MediaImageChangeインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param {jQuery} $images 画像を書き換える要素
   * @param {Object} options オプション値
   * @return {MediaImageChange}
   */
  MediaImageChange.get = function($images, options){
    return new MediaImageChange($images, options).start();
  };


  /**
   * <h4>ブレイクポイントの監視を開始します</h4>
   *
   * @method start
   * @return {MediaImageChange}
   */
  p.start = function(){
		var self = this;

		this.on('change.MediaImageChange', function(event){
			if(self.param.isObserver){
				self.param.current = event.mediaStyle;
				self.change();
			}
		}).trigger('change.MediaImageChange');

    return this;
  };


  /**
   * <h4>ブレイクポイントの監視をストップします</h4>
   *
   * @method stop
   * @return {MediaImageChange}
   */
  p.stop = function(){
    this.off('change.MediaImageChange');
		return this;
  };


  /**
   * <h4>監視の状態を切り替えます</h4>
   *
   * @method setObserver
   * @param {Boolean} isState メディアクエリの変更を監視するか
   * @return {MediaImageChange}
   */
  p.setObserver = function(isState){
    this.param.isObserver = AMP.isBoolean(isState) ? isState : this.param.isObserver;
    return this;
  };


  /**
   * <h4>画像を変更します</h4>
   *
   * @method switch
   * @return {MediaImageChange}
   */
  p.change = function(){
		var self = this,
		$images = this.param.$images,
		data,
		ext;

		$images.each(function(i){
			data = $images.eq(i).attr(self.param.attrKey);
			ext = data.substring(data.lastIndexOf('.'), data.length);
			$images[i].src = data.replace(ext, self.param.imagePrefix + self.param.current + ext);
    });

    return this;
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.MediaImageChange = MediaImageChange;


}(window, AMP, jQuery));
