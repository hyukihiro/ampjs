/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * <em>imagesloaded.jsに依存します</em>
   *
   * @class AMP.$.Loader
   * @constructor
   * @param  {DOM} el 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Object} options オプション値
   */
  function Loader(el){
    /**
     * <h4>パラメーター格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = {};

    /**
     * <h4>対象のimgを囲う要素</h4>
     *
     * @property el
     * @type {DOM}
     */
    this.param.el = el || 'body';

    /**
     * <h4>imagesloadedオブジェクト</h4>
     *
     * @property imagesloaded
     * @type {imagesloaded}
     */
    this.param.imagesloaded = imagesLoaded(this.param.el);

    /**
     * <h4>画像数</h4>
     *
     * @property length
     * @type {Number}
     */
    this.param.length = this.param.imagesloaded.images.length;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property count
     * @type {Number}
     */
    this.param.updateCount = 0;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property loadCount
     * @type {Number}
     */
    this.param.loadCount = 0;

    // start
    this._start();
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
   * <h4>ローター開始</h4>
   *
   * @method _start
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  p._start = function(){
    var self = this;

    // 画像処理完了毎（成功・失敗）にインクリメントする
    self.param.imagesloaded.on('progress', function(){
      self.param.updateCount += 1;
      self._progress.apply(self, AMP.argsToArray(arguments));
    });

    // fail: 読込み失敗毎
    self.param.imagesloaded.on('fail', function(){
      self._failCall.apply(self, AMP.argsToArray(arguments));
    });

    // done: 読込み成功毎
    self.param.imagesloaded.on('done', function(){
      self._doneCall.apply(self, AMP.argsToArray(arguments));
    });

    // always: 全ての読込み処理完了時
    self.param.imagesloaded.on('always', function(){
      self._alwaysCall.apply(self, AMP.argsToArray(arguments));
    });


    // カウントを更新する
    self._update();

    return this;
  };


  /**
   * <h4>カウントのアップデート</h4>
   *
   * @private
   * @method _update
   * @return {Void}
   */
  p._update = function(){
    var self = this,
    current = self.param.updateCount / self.param.length * 100;

    // カウンターのインクリメント
    if(self.param.loadCount < current){
      self.param.loadCount += 1;
    }

    self._updateCall(Math.ceil(self.param.loadCount));

    if(100 <= self.param.loadCount){
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
   * <h4>画像読み込み失敗毎に呼び出されます</h4>
   *
   * @private
   * @method _failCall
   * @type {Function}
   */
  p._failCall = AMP.noop;


  /**
   * <h4>画像読み込み毎に呼び出されます</h4>
   *
   * @method done
   * @type {Function}
   */
  p.done = function(callback){
    this._doneCall = callback || AMP.noop;
    return this;
  };


  /**
   * <h4>画像読み込み毎に呼び出されます</h4>
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

  AMP.$ = AMP.$ || {};
  AMP.$.Loader = Loader;


}(window));
