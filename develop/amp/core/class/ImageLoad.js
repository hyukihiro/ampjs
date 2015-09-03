/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>画像読み込み処理</h4>
   * <!--<p><a href="../../demo/AMP.ImageLoad.html">DEMO</a></p>-->
   *
   * @class AMP.ImageLoad
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {String|ImageObject} image 画像パスもしくはイメージオブジェクト
   * @param {Number} width 画像サイズ 横幅
   * @param {Number} height 画像サイズ 高さ
   */
	function ImageLoad(image, width, height){
    /**
     * <h4>イメージオブジェクト</h4>
     *
     * @property image
     * @type {Image}
     */
    this.image = new Image();

    // size
    if(AMP.isNumber(width)){
      this.image.width = width;
    }
    if(AMP.isNumber(height)){
      this.image.height = height;
    }

    /**
     * <h4>画像パス</h4>
     *
     * @property src
     * @type {String}
     */
    this.src = image.src ? image.src : image;

    /**
     * <h4>読み込み状態</h4>
     *
     * @property state
     * @type {String}
     */
    this.state = ImageLoad.STATE_STANDBY;

    /**
     * <h4>各イベントのコールバックキューを格納</h4>
     *
     * @private
     * @property _callbacks
     * @type {Object}
     */
    /**
     * <h4>progressイベントのコールバックキューを格納</h4>
     *
     * @private
     * @property _callbacks.progress
     * @type {Arrary}
     */
    /**
     * <h4>doneイベントのコールバックキューを格納</h4>
     *
     * @private
     * @property _callbacks.done
     * @type {Arrary}
     */
    /**
     * <h4>failイベントのコールバックキューを格納</h4>
     *
     * @private
     * @property _callbacks.fail
     * @type {Arrary}
     */
    /**
     * <h4>alwaysイベントのコールバックキューを格納</h4>
     *
     * @private
     * @property _callbacks.always
     * @type {Arrary}
     */
    this._callbacks = {
      progress: [],
      done    : [],
      fail    : [],
      always  : []
    };
  }

  // 基底クラスを継承
  AMP.inherits(ImageLoad, AMP.BASE_CLASS);

  // prototype
  var p = ImageLoad.prototype;



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
  ImageLoad.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ImageLoad';


  /**
   * <h4>Load前ステート</h4>
   *
   * @static
   * @property STATE_STANDBY
   * @default satanbay
   * @type {String}
   */
  ImageLoad.STATE_STANDBY = 'satanbay';


  /**
   * <h4>Load中ステート</h4>
   *
   * @static
   * @property STATE_PROGRESS
   * @default progress
   * @type {String}
   */
  ImageLoad.STATE_PROGRESS = 'progress';


  /**
   * <h4>Load失敗ステート</h4>
   *
   * @static
   * @property STATE_ERROR
   * @default error
   * @type {String}
   */
  ImageLoad.STATE_ERROR = 'error';


  /**
   * <h4>Load成功ステート</h4>
   *
   * @static
   * @property STATE_LOADED
   * @default loaded
   * @type {String}
   */
  ImageLoad.STATE_LOADED = 'loaded';


  /**
   * <h4>Progress Request Id</h4>
   *
   * @private
   * @property _progressRequestId
   * @type {String}
   */
  p._progressRequestId = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>ImageLoadインスタンスの生成</h4>
   *
   * @param {String|ImageObject} image 画像パスもしくはイメージオブジェクト
   * @param {Number} width 画像サイズ 横幅
   * @param {Number} height 画像サイズ 高さ
   * @return {ImageLoad}
   */
  ImageLoad.get = function(image, width, height){
    return new ImageLoad(image, width, height);
  };


  /**
   * <h4>画像の読み込みを開始します</h4>
   *
   * @method load
   * @param  {Function} callback 読み込み開始時のコールバック関数
   * @return {ImageLoad}
   */
  p.load = function(callback){
    var self = this;

    // 呼び出し重複回避
    if(this.state !== ImageLoad.STATE_STANDBY){
      return this;
    }

    // state update
    this.state = ImageLoad.STATE_PROGRESS;

    // event: load
    if(AMP.isFunction(callback)){
      callback();
    }

    // event: progress
    self._progressLoop();

    // event: loaded
    AMP.addEvent(this.image, 'load', function(){
      self.state = ImageLoad.STATE_LOADED;
      self._removeEvent();
      self._calls(self._callbacks.done);
      self._calls(self._callbacks.always);
    });

    // event: error
    AMP.addEvent(this.image, 'error', function(){
      self.state = ImageLoad.STATE_ERROR;
      self._removeEvent();
      self._calls(self._callbacks.fail);
      self._calls(self._callbacks.always);
    });

    // set src
    self.image.src = self.src;
    // 初回progressコールバックを実行する為に、タイミングをずらしています
    // AMP.requestAnimationFrame(function(){
      // self.image.src = self.src;
    // });

    return this;
  };


  /**
   * <h4>画像読み込み中に実行</h4>
   *
   * @method progress
   * @param  {Function} callback コールバック関数
   * @return {ImageLoad}
   */
  p.progress = function(callback){
    this._callbacks.progress.push(callback);
    return this;
  };


  /**
   * <h4>画像読み込み成功時に実行</h4>
   *
   * @method done
   * @param  {Function} callback コールバック関数
   * @return {ImageLoad}
   */
  p.done = function(callback){
    this._callbacks.done.push(callback);
    return this;
  };


  /**
   * <h4>画像読み込み失敗時に実行</h4>
   *
   * @method fail
   * @param  {Function} callback コールバック関数
   * @return {ImageLoad}
   */
  p.fail = function(callback){
    this._callbacks.fail.push(callback);
    return this;
  };


  /**
   * <h4>画像読み込み処理完了後実行</h4>
   * <p>失敗・成功のいずれの場合でも、実行します</p>
   *
   * @method always
   * @param  {Function} callback コールバック関数
   * @return {ImageLoad}
   */
  p.always = function(callback){
    this._callbacks.always.push(callback);
    return this;
  };


  /**
   * <h4>読み込み中を監視し、再起処理を行います</h4>
   *
   * @private
   * @method _progressLoop
   * @return {Void}
   */
  p._progressLoop = function(){
    var self = this;
    if(this.image.naturalWidth === 0 && this.state === ImageLoad.STATE_PROGRESS){
      this._calls(this._callbacks.progress);

      this._progressRequestId = AMP.requestAnimationFrame(function(){
        self._progressLoop();
      });
    }
  };


  /**
   * <h4>コールバックキューを実行します</h4>
   *
   * @private
   * @method _calls
   * @return {Void}
   */
  p._calls = function(callbacks){
    var self = this;
    if(AMP.isArray(callbacks)){
      AMP.each(callbacks, function(fn){
        if(AMP.isFunction(fn)){
          fn(self);
        }
      });
    }
  };


  /**
   * <h4>イベントの削除</h4>
   *
   * @private
   * @method _removeEvent
   * @return {Void}
   */
  p._removeEvent = function(){
    AMP.cancelAnimationFrame(this._progressRequestId);
    AMP.removeEvent(this.image, 'load');
    AMP.removeEvent(this.image, 'error');

    AMP.each(this._callbacks, function(callback){
      callback = null;
    });
  };


  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.ImageLoad = ImageLoad;



}(window, AMP));
