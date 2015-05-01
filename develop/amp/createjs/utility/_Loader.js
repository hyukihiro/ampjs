var AMP = AMP || {};

(function(root, CJS){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   *
   *
   * [Loader description]
   * @param {[type]} manifest [description]
   * @param {[type]} options  [description]
   */
  function Loader(manifest, options){

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = {};

    /**
     * <h4>manifestデータ</h4>
     *
     * @property param.manifest
     * @type {Array}
     */
    this.param.manifest = AMP.isArray(manifest) ? manifest : [manifest];

    /**
     * <h4>createjs.Preload LoadQueueオプション</h4>
     *
     * @property param.loadQueue
     * @type {Object}
     */
    this.param.loadQueue = AMP.mixin(true, {}, Loader.loadQueueOptions, options);

    /**
     * <h4>loadCount完了した点数</h4>
     *
     * @property loadCount
     * @type {Number}
     */
    this.param.loadCount = 0;

    /**
     * <h4>進捗カウント</h4>
     *
     * @property updateCount
     * @type {Number}
     */
    this.updateCount = null;

    /**
     * <h4>CJS.LoadQueueインスタンス</h4>
     *
     * @property loadQueue
     * @type {createjs.LoadQueue}
     */
    this.param.loadQueue = new CJS.LoadQueue(this.param.loadCount.useXHR);

    // 同時読み込み数の設定
    this.loadQueue.setMaxConnections(this.param.loadCount.loadMax);
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
  Loader.VERSION = '2.0.0';


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
    useXHR: false,
    loadMax: 4
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
  Loader.get = function(el){
    return new Loader(el);
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
    if(AMP.isNumber(self.updateCount)){
      return self;
    } else {
      self.updateCount = 0;
    }

    // progress
    self.loadQueue.addEventListener('progress', function(e){
      if(e.loaded !== 0){
        self.loadCount += 1;
        self.loadQueue.dispatchEvent('progressCallback');
      }
    });

    // complete
    self.loadQueue.addEventListener('complete', function(){
      self.loadQueue.dispatchEvent('completeCallbak');
    });

    // Loaderの状態を管理
    self._controller();

    // ロード開始
    self.loadQueue.loadManifest(self.manifest);

    return self;
  };


  /**
   * <h4>ファイルの読み込み毎に実行します</h4>
   *
   * @method done
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.done = function(callback){
    var self = this;

    self.loadQueue.addEventListener('fileload', function(){
      callback.apply(self, arguments);
    });

    return self;
  };


  /**
   * <h4>読み込み失敗時に実行します</h4>
   *
   * @method fail
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.fail = function(callback){
    var self = this;

    self.loadQueue.addEventListener('error', function(){
      callback.apply(self, arguments);
    });

    return self;
  };


  /**
   * <h4>進捗毎に実行します</h4>
   *
   * @method progress
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.progress = function(callback){
    var self = this;

    self.loadQueue.addEventListener('progressCallback', function(){
      callback.apply(self, arguments);
    });

    return self;
  };


  /**
   * <h4>フレーム毎に実行します</h4>
   *
   * @method update
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.update = function(callback){
    var self = this;

    self.loadQueue.addEventListener('update', function(){
      callback.apply(self, arguments);
    });

    return this;
  };


  /**
   * <h4>Loaderイベントを管理します</h4>
   * カウントの更新・updateイベントの発行
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this;

    AMP.requestAnimationFrame(function(){
      var current = self.loadCount / self.manifest.length * 100;

      // 100までカウントの更新
      if(self.updateCount < 100){
        self._controller();

      // 全ての処理が完了したら、updateCompleteイベントを発行して全てのイベントを削除
      } else {
        self.loadQueue.dispatchEvent('updateComplete');
        self.loadQueue.removeAllEventListeners();
      }

      // updateカウントが更新されるたびに、updateイベントを発行します
      if(self.updateCount < current){
        self.updateCount += 1;
        self.loadQueue.dispatchEvent({type: 'update', count: self.updateCount});
      }
    });
  };


  /**
   * <h4>読み込み完了時に実行します</h4>
   *
   * @method complete
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.complete = function(callback){
    var self = this;

    self.loadQueue.addEventListener('completeCallbak', function(){
      callback.apply(self, arguments);
    });

    return self;
  };


  /**
   * <h4>updateの処理が完了したら実行</h4>
   *
   * @method updateComplete
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  p.updateComplete = function(callback){
    this.loadQueue.addEventListener('updateComplete', callback);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.CJS = AMP.CJS || {};
  AMP.CJS.Loader = Loader;


}(window, createjs));
