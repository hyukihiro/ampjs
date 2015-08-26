/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   *
   * @class AMP.cjs.Loader
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Object} manifest <a href="http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html#method_loadManifest" target="_blank">manifest</a>
   * @param {Object} options
   */
  function Loader(manifest, options){

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property props
     * @type {Object}
     */
    this.props = {};

    /**
     * <h4>manifestデータ</h4>
     *
     * @property props.manifest
     * @type {Array}
     */
    this.props.manifest = AMP.isArray(manifest) ? manifest : [manifest];

    /**
     * <h4>createjs.Preload LoadQueueオプション</h4>
     *
     * @property props.loadQueue
     * @type {Object}
     */
    this.props.loadQueue = AMP.mixin(true, {}, Loader.loadQueueOptions, options);

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property props.loadCount
     * @type {Number}
     */
    this.props.loadCount = 0;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property props.updateCount
     * @type {Number}
     */
    this.props.updateCount = null;

    /**
     * <h4>createjs.LoadQueueインスタンス</h4>
     *
     * @property props.loadQueue
     * @type {createjs.LoadQueue}
     */
    this.props.loadQueue = new cjs.LoadQueue(this.props.loadCount.useXHR);

    // 同時読み込み数の設定
    this.props.loadQueue.setMaxConnections(this.props.loadCount.loadMax);
  }

  // 基底クラスを継承
  AMP.inherits(Loader, AMP.BASE_CLASS);

  // prototype
  var p = Loader.prototype;



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
  Loader.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Loader';


  /**
   * <h4>createjs.Preload.LoadQueueオプション値</h4>
   *
   * @static
   * @property loadQueueOptions
   * @type {Object}
   */
  Loader.loadQueueOptions = {
    useXHR : false,
    loadMax: 6 // android 4
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Loaderインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param {DOM} el 対象のエリア要素
   * @return {Loader}
   */
  Loader.get = function(manifest, options){
    return new Loader(manifest, options).init();
  };


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {Loader}
   */
  p.init = function(){
    var self = this;

    // updateCountをフラグにシングルトン
    if(AMP.isNumber(self.props.updateCount)){
      return self;
    } else {
      self.props.updateCount = 0;
    }

    // 画像処理完了毎（成功・失敗）にインクリメントする
    self.props.loadQueue.addEventListener('progress', function(){
      self.props.updateCount += 1;
      self._progress.apply(self, AMP.argsToArray(arguments));
    });

    // fail: 読込み失敗毎
    self.props.loadQueue.addEventListener('error', function(){
      self._failCall.apply(self, AMP.argsToArray(arguments));
    });

    // done: 読込み成功毎
    self.props.loadQueue.addEventListener('fileload', function(){
      self._doneCall.apply(self, AMP.argsToArray(arguments));
    });

    // always: 全ての読込み処理完了時
    self.props.loadQueue.addEventListener('complete', function(){
      self._alwaysCall.apply(self, AMP.argsToArray(arguments));
      self.props.loadQueue.removeAllEventListeners();
    });

    // ロード開始
    self.props.loadQueue.loadManifest(self.props.manifest);

    // Loaderの状態を管理
    self._update();

    return self;
  };


  /**
   * <h4>Loaderイベントを管理します</h4>
   * カウントの更新・updateイベントの発行
   *
   * @private
   * @method _update
   * @return {Void}
   */
  p._update = function(){
    var self = this,
    current = self.props.updateCount / self.props.manifest.length * 100;

    // カウンターのインクリメント
    if(self.props.loadCount < current){
      self.props.loadCount += 1;
    }

    self._updateCall(Math.ceil(self.props.loadCount));

    if(100 <= self.props.loadCount){
      self._compleatCall();
    } else {
      AMP.requestAnimationFrame(function(){
        self._update();
      });
    }
  };


  /**
   * <h4>画像読み込み処理毎に呼び出されます</h4>
   *
   * @method progress
   * @type {Function}
   */
  p.progress = function(callback){
    this._progress = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み処理毎に呼び出されます</h4>
   *
   * @private
   * @method _progress
   * @type {Function}
   */
  p._progress = AMP.noop;

  /**
   * <h4>画像読み込み失敗毎に呼び出されます</h4>
   *
   * @method fail
   * @type {Function}
   */
  p.fail = function(callback){
    this._failCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み失敗時に呼び出されます</h4>
   *
   * @private
   * @method _failCall
   * @type {Function}
   */
  p._failCall = AMP.noop;


  /**
   * <h4>画像読み込み成功時に呼び出されます</h4>
   *
   * @method done
   * @type {Function}
   */
  p.done = function(callback){
    this._doneCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み成功時に呼び出されます</h4>
   *
   * @private
   * @method _doneCall
   * @type {Function}
   */
  p._doneCall = AMP.noop;


  /**
   * <h4>画像読み込み処理完了時に呼び出されます</h4>
   *
   * @method always
   * @type {Function}
   */
  p.always = function(callback){
    this._alwaysCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み処理完了時に呼び出されます</h4>
   *
   * @private
   * @method _alwaysCall
   * @type {Function}
   */
  p._alwaysCall = AMP.noop;


  /**
   * <h4>カウントアップ時に呼び出されます</h4>
   *
   * @method update
   * @type {Function}
   */
  p.update = function(callback){
    this._updateCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>カウントアップ時に呼び出されます</h4>
   *
   * @private
   * @method _updateCall
   * @type {Function}
   */
  p._updateCall = AMP.noop;


  /**
   * <h4>カウント完了時に呼び出されます</h4>
   *
   * @method compleat
   * @type {Function}
   */
  p.compleat = function(callback){
    this._compleatCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>カウント完了時に呼び出されます</h4>
   *
   * @private
   * @method _compleatCall
   * @type {Function}
   */
  p._compleatCall = AMP.noop;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Loader = Loader;


}(window, AMP, createjs));
