/**
 * AMPjs Javascript Library
 * AMPjs Core File version 3.0.7
 *
 * The MIT License (MIT)
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/yoshihitofujiwara/ampjs
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

(function(root, AMP, imagesLoaded){

  // 'use strict';


  if(!imagesLoaded){
    throw new Error('imagesLoaded is not found');
  }


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * <p>
   * 画像の読み込み通知を行います<br>
   * <a href="http://imagesloaded.desandro.com/" target="_blank">imagesloaded.js</a>
   * に依存します<br>
   * <a href="../../demo/AMP.Loader.html">DEMO</a></p>
   *
   * @class AMP.Loader
   * @constructor
   * @param {DOM} elm 対象のエリア要素 省略可 初期値： 'body'
   * @param {Object} options オプション値
   */
  function Loader(elm){
    /**
     * <h4>プロパティオブジェクト</h4>
     *
     * @property props
     * @type {Object}
     */
    this.props = {};

    /**
     * <h4>読み込み対象wrap要素</h4>
     *
     * @property props.elm
     * @type {DOM}
     */
    this.props.elm = elm || 'body';

    /**
     * <h4>imagesloadedオブジェクト</h4>
     *
     * @property props.imagesLoaded
     * @type {imagesloaded}
     */
    this.props.imagesLoaded = imagesLoaded(this.props.elm);

    /**
     * <h4>画像数</h4>
     *
     * @property props.length
     * @type {Number}
     */
    this.props.length = this.props.imagesLoaded.images.length;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property props.count
     * @type {Number}
     */
    this.props.updateCount = 0;

    /**
     * <h4>画像が読み込まれた数をカウントします</h4>
     *
     * @property props.loadCount
     * @type {Number}
     */
    this.props.loadCount = 0;

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
  Loader.VERSION = '3.2.1';


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
   * @param {DOM} elm 対象のエリア要素
   * @return {Loader}
   */
  Loader.get = function(elm){
    return new Loader(elm);
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
    self.props.imagesLoaded.on('progress', function(){
      self.props.updateCount += 1;
      self._progress.apply(self, AMP.argsToArray(arguments));
    });

    // fail: 読込み失敗毎
    self.props.imagesLoaded.on('fail', function(){
      self._failCall.apply(self, AMP.argsToArray(arguments));
    });

    // done: 読込み成功毎
    self.props.imagesLoaded.on('done', function(){
      self._doneCall.apply(self, AMP.argsToArray(arguments));
    });

    // always: 全ての読込み処理完了時
    self.props.imagesLoaded.on('always', function(){
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
    current = self.props.updateCount / self.props.length * 100;

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

  AMP.Loader = Loader;


}(window, AMP, imagesLoaded));
