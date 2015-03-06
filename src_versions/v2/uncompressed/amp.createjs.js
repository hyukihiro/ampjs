/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
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


(function(root, createjs){

  // 'use strict';

  var Ease, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   * amp.Easeをextendします
   * createjs.Easeをインストールして使用してください
   * see: http://www.createjs.com/Docs/TweenJS/files/tweenjs_p.js.html
   *
   * @class amp.Ease
   * @constructor
   * @return {Ease}
   */
  Ease = amp.Ease.extend();



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  // prototype
  p = Ease.prototype;


  /**
   * <h4>createjs easeing用ネームスペース</h4>
   *
   * @property createjs
   * @type {Object}
   */
  p.createjs = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property createjs._1_SINE_IN
   * @type {String}
   */
  p.createjs._1_SINE_IN = createjs.Ease.sineIn;

  /**
   * @property createjs._1_SINE_OUT
   * @type {String}
   */
  p.createjs._1_SINE_OUT = createjs.Ease.sineOut;

  /**
   * @property createjs._1_SINE_IN_OUT
   * @type {String}
   */
  p.createjs._1_SINE_IN_OUT = createjs.Ease.sineInOut;


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property createjs._2_QUAD_IN
   * @type {String}
   */
  p.createjs._2_QUAD_IN = createjs.Ease.quadIn;

  /**
   * @property createjs._2_QUAD_OUT
   * @type {String}
   */
  p.createjs._2_QUAD_OUT = createjs.Ease.quadOut;

  /**
   * @property createjs._2_QUAD_IN_OUT
   * @type {String}
   */
  p.createjs._2_QUAD_IN_OUT = createjs.Ease.quadInOut;


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property createjs._3_CUBIC_IN
   * @type {String}
   */
  p.createjs._3_CUBIC_IN = createjs.Ease.cubicIn;

  /**
   * @property createjs._3_CUBIC_OUT
   * @type {String}
   */
  p.createjs._3_CUBIC_OUT = createjs.Ease.cubicOut;

  /**
   * @property createjs._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.createjs._3_CUBIC_IN_OUT = createjs.Ease.cubicInOut;


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property createjs._4_QUART_IN
   * @type {String}
   */
  p.createjs._4_QUART_IN = createjs.Ease.quartIn;

  /**
   * @property createjs._4_QUART_OUT
   * @type {String}
   */
  p.createjs._4_QUART_OUT = createjs.Ease.quartOut;

  /**
   * @property createjs._4_QUART_IN_OUT
   * @type {String}
   */
  p.createjs._4_QUART_IN_OUT = createjs.Ease.quartInOut;


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property createjs._5_QUINT_IN
   * @type {String}
   */
  p.createjs._5_QUINT_IN = createjs.Ease.quintIn;

  /**
   * @property createjs._5_QUINT_OUT
   * @type {String}
   */
  p.createjs._5_QUINT_OUT = createjs.Ease.quintOut;

  /**
   * @property createjs._5_QUINT_IN_OUT
   * @type {String}
   */
  p.createjs._5_QUINT_IN_OUT = createjs.Ease.quintInOut;


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property createjs._6_EXPO_IN
   * @type {String}
   */
  p.createjs._6_EXPO_IN = createjs.Ease.getPowIn(6);

  /**
   * @property createjs._6_EXPO_OUT
   * @type {String}
   */
  p.createjs._6_EXPO_OUT = createjs.Ease.getPowOut(6);

  /**
   * @property createjs._6_EXPO_IN_OUT
   * @type {String}
   */
  p.createjs._6_EXPO_IN_OUT = createjs.Ease.getPowInOut(6);


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property createjs._7_CIRC_IN
   * @type {String}
   */
  p.createjs._7_CIRC_IN = createjs.Ease.circIn;

  /**
   * @property createjs._7_CIRC_OUT
   * @type {String}
   */
  p.createjs._7_CIRC_OUT = createjs.Ease.circOut;

  /**
   * @property createjs._7_CIRC_IN_OUT
   * @type {String}
   */
  p.createjs._7_CIRC_IN_OUT = createjs.Ease.circInOut;


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property createjs._LINEAR
   * @type {String}
   */
  p.createjs._LINEAR = createjs.Ease.linear;


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property createjs._BACK_IN
   * @type {String}
   */
  p.createjs._BACK_IN = createjs.Ease.backIn;

  /**
   * @property createjs._BACK_OUT
   * @type {String}
   */
  p.createjs._BACK_OUT = createjs.Ease.backOut;

  /**
   * @property createjs._BACK_IN_OUT
   * @type {String}
   */
  p.createjs._BACK_IN_OUT = createjs.Ease.backInOut;


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property createjs._ELASTIC_IN
   * @type {String}
   */
  p.createjs._ELASTIC_IN = createjs.Ease.elasticIn;

  /**
   * @property createjs._ELASTIC_OUT
   * @type {String}
   */
  p.createjs._ELASTIC_OUT = createjs.Ease.elasticOut;

  /**
   * @property createjs._ELASTIC_IN_OUT
   * @type {String}
   */
  p.createjs._ELASTIC_IN_OUT = createjs.Ease.elasticInOut;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property createjs._BOUNCE_IN
   * @type {String}
   */
  p.createjs._BOUNCE_IN = createjs.Ease.bounceIn;

  /**
   * @property createjs._BOUNCE_OUT
   * @type {String}
   */
  p.createjs._BOUNCE_OUT = createjs.Ease.bounceOut;

  /**
   * @property createjs._BOUNCE_IN_OUT
   * @type {String}
   */
  p.createjs._BOUNCE_IN_OUT = createjs.Ease.bounceInOut;




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Ease = Ease;
  root.amp.ease = new Ease();


}(window, createjs));

(function(root, createjs){

  // 'use strict';

  // see: http://qiita.com/nakajmg/items/65575d54cbed013ff2a5
  // see: http://kudox.jp/java-script/createjs-preloadjs-loadqueue


  var Loader, p, loader;


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * createrjs.Preloadクラスに依存します
   *
   * @class amp.createrjs.Loader
   * @constructor
   * @param  {Array} manifest 読み込みファイルリスト
   * @param  {Objecr} options 後日記述
   * @return {Instance}
   */
  Loader = function(manifest, options){
    this.manifest  = amp.isArray(manifest) ? manifest : [manifest];
    this.param     = amp.extend(true, {}, Loader.defaults, options);
    this.loadQueue = new createjs.LoadQueue(this.param.useXHR);
    this.loadQueue.setMaxConnections(this.param.loadMax);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * Loaderのショートハンド<br>
   * 処理Loader生成し、initを実行してインスタンスを返す
   *
   * @static
   * @method loader
   * @param  {DOM} elm 対象のimgを囲う要素 省略可
   * @return {Loader} Loader生成してインスタンスを返す
   */
  loader = function(manifest, options){
    var loader = new Loader(manifest, options);
    loader.init();
    return loader;
  };



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
  Loader.VERSION = '1.2';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Loader.prototype;


  /**
   * <h4>createjs.LoadQueueオプション値</h4>
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Loader.defaults = {
    useXHR: false,
    loadMax: 4
  };


  /**
   * <h4>manifestデータ</h4>
   *
   * @property manifest
   * @type {Array}
   */
  p.manifest = null;


  /**
   * <h4>createjs.LoadQueueインスタンス</h4>
   *
   * @property loadQueue
   * @type {createjs.LoadQueue}
   */
  p.loadQueue = null;


  /**
   * <h4>Loader.defaultsとコンストラクタ呼び出し時に第二引数に指定した値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;


  /**
   * <h4>loadCount完了した点数</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  p.loadCount = 0;


  /**
   * <h4>進捗カウント</h4>
   *
   * @property updateCount
   * @type {Number}
   */
  p.updateCount = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * amp._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Loader}
   */
   Loader.extend = amp._extend;


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
    if(amp.isNumber(self.updateCount)){
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

    amp.requestAnimationFrame(function(){
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

  root.amp = root.amp || {};
  root.amp.createjs = root.amp.createjs || {};
  root.amp.createjs.Loader = Loader;
  root.amp.createjs.loader = loader;


}(window, createjs));
