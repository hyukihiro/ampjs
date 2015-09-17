/**
 * ╔═╗╔╦╗╔═╗ ┬┌─┐
 * ╠═╣║║║╠═╝ │└─┐
 * ╩ ╩╩ ╩╩  └┘└─┘
 * Javascript Library
 * AMPjs createjs Module File version 3.0.0
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 */


(function(root, AMP){

	/**
	 * @class AMP.cjs
	 */
	AMP.cjs = {};

	/**
	 * <h4>バージョン情報</h4>
	 *
	 * @static
	 * @property AMP.cjs.VERSION
	 * @type {String}
	 */
	AMP.cjs.VERSION = '3.0.0';


}(window, AMP));


(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   *
   * @class AMP.Ease
   * @extends AMP.Ease
   * @constructor
   */
  function Ease(){}

  // AMP.Easeクラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>createjs Easing用ネームスペース</h4>
   * <p><a href="http://www.createjs.com/demos/tweenjs/tween_sparktable" target="_blank">Easing一覧</a></p>
   *
   * @property createjs
   * @type {Object}
   */
  p.cjs = {};


  /**
   * <h4>バージョン情報</h4>
   *
   * @property cjs.VERSION
   * @type {String}
   */
  p.cjs.VERSION = '1.0.0';



  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property cjs._1_SINE_IN
   * @type {String}
   */
  p.cjs._1_SINE_IN = cjs.Ease.sineIn;

  /**
   * @property cjs._1_SINE_OUT
   * @type {String}
   */
  p.cjs._1_SINE_OUT = cjs.Ease.sineOut;

  /**
   * @property cjs._1_SINE_IN_OUT
   * @type {String}
   */
  p.cjs._1_SINE_IN_OUT = cjs.Ease.sineInOut;


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property cjs._2_QUAD_IN
   * @type {String}
   */
  p.cjs._2_QUAD_IN = cjs.Ease.quadIn;

  /**
   * @property cjs._2_QUAD_OUT
   * @type {String}
   */
  p.cjs._2_QUAD_OUT = cjs.Ease.quadOut;

  /**
   * @property cjs._2_QUAD_IN_OUT
   * @type {String}
   */
  p.cjs._2_QUAD_IN_OUT = cjs.Ease.quadInOut;


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property cjs._3_CUBIC_IN
   * @type {String}
   */
  p.cjs._3_CUBIC_IN = cjs.Ease.cubicIn;

  /**
   * @property cjs._3_CUBIC_OUT
   * @type {String}
   */
  p.cjs._3_CUBIC_OUT = cjs.Ease.cubicOut;

  /**
   * @property cjs._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.cjs._3_CUBIC_IN_OUT = cjs.Ease.cubicInOut;


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property cjs._4_QUART_IN
   * @type {String}
   */
  p.cjs._4_QUART_IN = cjs.Ease.quartIn;

  /**
   * @property cjs._4_QUART_OUT
   * @type {String}
   */
  p.cjs._4_QUART_OUT = cjs.Ease.quartOut;

  /**
   * @property cjs._4_QUART_IN_OUT
   * @type {String}
   */
  p.cjs._4_QUART_IN_OUT = cjs.Ease.quartInOut;


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property cjs._5_QUINT_IN
   * @type {String}
   */
  p.cjs._5_QUINT_IN = cjs.Ease.quintIn;

  /**
   * @property cjs._5_QUINT_OUT
   * @type {String}
   */
  p.cjs._5_QUINT_OUT = cjs.Ease.quintOut;

  /**
   * @property cjs._5_QUINT_IN_OUT
   * @type {String}
   */
  p.cjs._5_QUINT_IN_OUT = cjs.Ease.quintInOut;


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property cjs._6_EXPO_IN
   * @type {String}
   */
  p.cjs._6_EXPO_IN = cjs.Ease.getPowIn(6);

  /**
   * @property cjs._6_EXPO_OUT
   * @type {String}
   */
  p.cjs._6_EXPO_OUT = cjs.Ease.getPowOut(6);

  /**
   * @property cjs._6_EXPO_IN_OUT
   * @type {String}
   */
  p.cjs._6_EXPO_IN_OUT = cjs.Ease.getPowInOut(6);


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property cjs._7_CIRC_IN
   * @type {String}
   */
  p.cjs._7_CIRC_IN = cjs.Ease.circIn;

  /**
   * @property cjs._7_CIRC_OUT
   * @type {String}
   */
  p.cjs._7_CIRC_OUT = cjs.Ease.circOut;

  /**
   * @property cjs._7_CIRC_IN_OUT
   * @type {String}
   */
  p.cjs._7_CIRC_IN_OUT = cjs.Ease.circInOut;


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property cjs._LINEAR
   * @type {String}
   */
  p.cjs._LINEAR = cjs.Ease.linear;


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property cjs._BACK_IN
   * @type {String}
   */
  p.cjs._BACK_IN = cjs.Ease.backIn;

  /**
   * @property cjs._BACK_OUT
   * @type {String}
   */
  p.cjs._BACK_OUT = cjs.Ease.backOut;

  /**
   * @property cjs._BACK_IN_OUT
   * @type {String}
   */
  p.cjs._BACK_IN_OUT = cjs.Ease.backInOut;


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property cjs._ELASTIC_IN
   * @type {String}
   */
  p.cjs._ELASTIC_IN = cjs.Ease.elasticIn;

  /**
   * @property cjs._ELASTIC_OUT
   * @type {String}
   */
  p.cjs._ELASTIC_OUT = cjs.Ease.elasticOut;

  /**
   * @property cjs._ELASTIC_IN_OUT
   * @type {String}
   */
  p.cjs._ELASTIC_IN_OUT = cjs.Ease.elasticInOut;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property cjs._BOUNCE_IN
   * @type {String}
   */
  p.cjs._BOUNCE_IN = cjs.Ease.bounceIn;

  /**
   * @property cjs._BOUNCE_OUT
   * @type {String}
   */
  p.cjs._BOUNCE_OUT = cjs.Ease.bounceOut;

  /**
   * @property cjs._BOUNCE_IN_OUT
   * @type {String}
   */
  p.cjs._BOUNCE_IN_OUT = cjs.Ease.bounceInOut;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;
  AMP.ease = new Ease();



}(window, AMP, createjs));


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


(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   *
   * @class AMP.cjs.Shape
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Object} manifest
   * @param {Object} options
   */
  function Shape(graphics){
    this.Shape_constructor(graphics);
  }



  // 基底クラスを継承
  AMP.inherits(Shape, AMP.BASE_CLASS);

  // prototype
  var p = createjs.extend(Shape, cjs.Shape);


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
  Shape.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Shape';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Shapeインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param {DOM} el 対象のエリア要素
   * @return {Shape}
   */
  Shape.get = function(manifest, options){
    // return new Shape(manifest, options).init();
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Shape = createjs.promote(Shape, 'Shape');



}(window, AMP, createjs));


(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /// FIXME: βバージョン
  /**
   * <h4>Stage</h4>
   * <p>createjs.Stageクラスを拡張しています</p>
   *
   * @class AMP.cjs.Stage
   * @extends createjs.Stage
   * @constructor
   * @param {Object} manifest
   * @param {Object} options
   */
  function Stage(canvas, options){
    this.Stage_constructor(canvas);
    this.props = AMP.mixin(true, {}, Stage.options, options);
  }


  // 基底クラスを継承
  AMP.inherits(Stage, AMP.BASE_CLASS);

  // prototype
  var p = createjs.extend(Stage, cjs.Stage);


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
  Stage.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Stage';


  Stage.options = {
    // isCSS : true,
    raf   : cjs.Ticker.RAF,
    width : 300,
    height: 150
  };


  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * [get description]
   * @param  {[type]} canvas  [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  Stage.get = function(canvas, options){
    return new Stage(canvas, options);
  };


  /**
   * <h4>ステージのセットアップ開始</h4>
   *
   * @method on
   * @return {Stage}
   */
  p.on = function(){
    var self = this;

    // イベント重複回避
    this.off();

    this.setSize(this.props.width, this.props.height);

    cjs.Ticker.timingMode = this.props.raf;

    // ticker
    cjs.Ticker.on('tick', function(){
      self.update();
      self._updateStage();
    });

    // resize
    AMP.addEvent(root, 'resize', function(){
      self._resize();
    });

    return this;
  };


  /**
   * <h4>ステージ停止</h4>
   *
   * @method off
   * @return {Stage}
   */
  p.off = function(){
    cjs.Ticker.off('tick');
    AMP.removeEvent(root, 'resize');
    return this;
  };


  /**
   * <h4>リサイズイベント</h4>
   *
   * @method resize
   * @param  {Function} callback コールバック
   * @return {Stage}
   */
  p.resize = function(callback){
    this._resize = callback;
    return this;
  };


  /**
   * [_resize description]
   * @return {[type]} [description]
   */
  p._resize = function(){};


  /**
   * [updateStage description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  p.updateStage = function(callback){
    this._updateStage = callback;
    return this;
  };


  /**
   * [_updateStage description]
   * @return {[type]} [description]
   */
  p._updateStage = function(){};


  /**
   * <h4>キャンバスサイズを設定</h4>
   *
   * @method setSize
   * @param {Number|Object} width 横幅
   * @param {Number} height 高さ
   * @return {Stage}
   */
  p.setSize = function(width, height){
    var obj = {};

    if(AMP.isObject(width)){
      obj = width;
    } else {
      obj.width = width;
      obj.height = height;
    }

    this.canvas.width = AMP.isNumber(obj.width) ? obj.width : this.canvas.width;
    this.canvas.height = AMP.isNumber(obj.height) ? obj.height : this.canvas.height;

    return this;
  };


  /**
   * <h4>キャンバスサイズの取得</h4>
   *
   * @method getSize
   * @return {Object}
   */
  p.getSize = function(){
    return {
      width : this.canvas.width,
      height: this.canvas.height
    };
  };


  /**
   * <h4>ステージのセンターXY座標を返す</h4>
   *
   * @method getCenter
   * @return {Object}
   */
  p.getCenter = function(){
    return {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Stage = createjs.promote(Stage, 'Stage');



}(window, AMP, createjs));
