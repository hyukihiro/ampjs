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
   * <p>!!! AMP.Mediaqueryを継承しています<br>
   * <a href="../../demo/AMP.$.MediaImageChange.html">DEMO</a></p>
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
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
		this.props = $.extend(true, {}, MediaImageChange.options, options);

    if(!$images || !($images instanceof jQuery)){
      $images = $('img[' + this.props.attrKey + ']');
    }

    /**
     * <h4>画像を書き換える要素</h4>
     *
     * @property props.$images
     * @type {jQuery}
     */
    this.props.$images = $images;

    /**
     * <h4>現在の状態</h4>
     *
     * @property props.current
     * @type {String}
     */
    this.props.current = null;

		// superClass constructor call
		MediaImageChange.Mediaquery_constructor.call(this, this.props.element);
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
  MediaImageChange.VERSION = '1.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'MediaImageChange';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>監視対象要素</h4>
   *
   * @static
   * @property options.element
   * @type {DOM}
   */
  /**
   * <h4>画像ファイルパス格納属性名</h4>
   *
   * @static
   * @property options.attrKey
   * @default 'data-media-img'
   * @type {String}
   */
  /**
   * <h4>画像ファイルに追加するprefix</h4>
   *
   * @static
   * @property options.imagePrefix
   * @default '_'
   * @type {String}
   */
  /**
   * <h4>対象要素監視しているか？</h4>
   *
   * @static
   * @property options.isObserver
   * @type {String}
   */
  MediaImageChange.options = {
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
			if(self.props.isObserver){
				self.props.current = event.mediaStyle;
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
    this.props.isObserver = AMP.isBoolean(isState) ? isState : this.props.isObserver;
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
		$images = this.props.$images,
		data,
		ext;

		$images.each(function(i){
			data = $images.eq(i).attr(self.props.attrKey);
			ext = data.substring(data.lastIndexOf('.'), data.length);
			$images[i].src = data.replace(ext, self.props.imagePrefix + self.props.current + ext);
    });

    return this;
  };



  /*----------------------------------------------------------------------
    export
  ----------------------------------------------------------------------*/

  AMP.$.MediaImageChange = MediaImageChange;


}(window, AMP, jQuery));
