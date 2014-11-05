/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author  Yoshihito Fujiwara
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


;(function(root, createjs){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * createrjs.Preloadクラスに依存します
   *
   * @class Loader
   * @constructor
   * @param  {Array} manifest 読み込むファイル
   * @param  {Objecr} options
   * @return {Instance}
   */
  var Loader = function(manifest, options){
    this.manifest  = amp.isArray(manifest) ? manifest : [manifest];
    this.param     = amp.extend(true, {}, Loader.defaults, options);
    this.loadQueue = new createjs.LoadQueue(this.param.useXHR);
    this.mediator  = new amp.Mediator();
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
  Loader.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Loader.p = Loader.prototype;


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
  Loader.p.manifest = null;


  /**
   * <h4>createjs.LoadQueueインスタンス</h4>
   *
   * @property loadQueue
   * @type {createjs.LoadQueue}
   */
  Loader.p.loadQueue = null;


  /**
   * <h4>Loaderイベントを管理します</h4>
   *
   * @mathod mediator
   * @type {amp.Mediator}
   */
  Loader.p.mediator = null;


  /**
   * <h4>Loader.defaultsとコンストラクタ呼び出し時に第二引数に指定した値をmixin</h4>
   *
   * @property param
   * @type {Object}
   */
  Loader.p.param = null;


  /**
   * <h4>loadCount完了した点数</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  Loader.p.loadCount = 0;


  /**
   * <h4>進捗カウント</h4>
   *
   * @property updateCount
   * @type {Number}
   */
  Loader.p.updateCount = null;


  /**
   * <h4>$imagesとimagesをあわせた画像点数</h4>
   *
   * @property allComplete
   * @type {Boolean}
   */
  Loader.p.allComplete = false;



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
   * @return {Extend Class}
   */
   Loader.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {Loader}
   */
  Loader.p.init = function(){
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
        self.mediator.trigger('progress', arguments);
      }
    });

    // complete
    self.loadQueue.addEventListener('complete', function(){
      self.loadQueue.removeAllEventListeners();
      self.mediator.trigger('complete', arguments);

      // if(!self.mediator.hasEvent('update')){
      //   self.mediator.trigger('allcomplete');
      // }
    });

    // アップデートカウント
    self._updateCount();

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
  Loader.p.done = function(callback){
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
  Loader.p.fail = function(callback){
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
  Loader.p.progress = function(callback){
    var self = this;

    self.mediator.on('progress', function(){
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
  Loader.p.update = function(callback){
    var self = this;

    self.mediator.on('update', function(){
      callback.apply(self, arguments);
    });

    return this;
  };


  /**
   * <h4>カウントの更新・updateイベントの発行</h4>
   *
   * @private
   * @method _updateCount
   * @return {Void}
   */
  Loader.p._updateCount = function(){
    var self = this;

    amp.requestAnimationFrame(function(){
      var current = self.loadCount / self.manifest.length * 100;

      if(self.updateCount < current){
        self.updateCount += 1;
        self.mediator.trigger('update', self.updateCount);
      }

      // 100までカウントの更新
      if(self.updateCount < 100){
        self._updateCount();
      } else {
        self.mediator.trigger('allcomplete');
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
  Loader.p.complete = function(callback){
    var self = this;

    self.mediator.on('complete', function(){
      callback.apply(self, arguments);
    });

    return self;
  };



  /**
   * <h4>全ての処理が完了したら実行</h4>
   *
   * @method allComplete
   * @param  {Function} callback コールバック
   * @return {Loader}
   */
  Loader.p.allComplete = function(callback){
    this.mediator.on('allcomplete', callback);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.createjs = root.amp.createjs || {};
  root.amp.createjs.Loader = Loader;


}(window, createjs));
