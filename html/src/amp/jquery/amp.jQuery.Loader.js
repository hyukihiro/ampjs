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


;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>imagesloaded.jsに依存します</b>
   *
   * @class Loader
   * @constructor
   * @param  {DOM} elm? 対象のimgを囲う要素 省略可 初期値： 'body'
   * @return {Loader}
   */
  var Loader = function(elm){
    this.elm = elm ? elm : this.elm;
    this.imagesloaded = imagesLoaded(this.elm);
    this.length = this.imagesloaded.images.length;
    this.$defer = new $.Deferred();
    return this;
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
  Loader.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Loader.p = Loader.prototype;


  /**
   * <h4>対象のimgを囲う要素</h4>
   *
   * @property elm
   * @type {DOM}
   */
  Loader.p.elm = 'body';


  /**
   * <h4>imagesloadedオブジェクト</h4>
   *
   * @property imagesloaded
   * @type {imagesloaded}
   */
  Loader.p.imagesloaded = null;


  /**
   * <h4>jQuery Deferred Objectを格納</h4>
   * ローディングの状態をdone, fail, proglessに反映しています
   *
   * @property $defer
   * @type {jQuery.Deferred}
   */
  Loader.p.$defer = null;


  /**
   * <h4>$imagesとimagesをあわせた画像点数</h4>
   *
   * @property length
   * @type {Number}
   */
  Loader.p.length = 0;


  /**
   * <h4>画像が読み込まれた数をカウントします</h4>
   *
   * @property count
   * @type {Number}
   */
  Loader.p.count = 0;


  /**
   * <h4>読み込み度数をインクリメントします</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  Loader.p.loadCount = 0;


  /**
   * <h4>タイマーID</h4>
   *
   * @property timerID
   * @type {String}
   */
  Loader.p.timerID = null;


  /**
   * <h4>エラー処理を監視するタイマーID</h4>
   *
   * @property checkID
   * @type {String}
   */
  Loader.p.checkID = null;


  /**
   * <h4>タイムスタンプ</h4>
   *
   * @private
   * @property _timeStamp
   * @type {Number} ミリ秒
   */
  Loader.p._timeStamp = null;


  /**
   * <h4>処理が止まっていないかチェックする間隔</h4>
   *
   * @property checkTime
   * @type {Number} ミリ秒
   */
  Loader.p.checkTime = 5000;



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
   Loader.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  Loader.p.init = function(){
    var self = this;

    if(!self._timeStamp){
      // タイムスタンプ
      self._timeStamp = amp.now();

      // 画像の読み込まれたらインクリメントする
      self.imagesloaded.jqDeferred.progress(function(){
        self.count += 1;
      });

      // カウントを更新する
      self.update();

      // 5秒間処理が止まれば自動的にカウントを更新
      self.check();
    }

    return self.$defer.promise();
  };


  /**
   * <h4>カウントのアップデート</h4>
   *
   * @method update
   * @return {Void}
   */
  Loader.p.update = function(){
    var self = this;
    current = self.count / self.length * 100;
    self.loadCount += (current - self.loadCount) * 0.1;

    // progress
    self.$defer.notify(Math.ceil(self.loadCount));

    // done
    if(self.loadCount >= 100){
      // 監視解除
      clearTimeout(self.checkID);
      self.$defer.resolve(self.imagesloaded);

    } else {
      self.timerID = amp.requestAnimationFrame(function(){
        self.update();
      });
    }

    if(self.loadCount > 99){
      self.loadCount = 100;
    }
  };


  /**
   * <h4>処理が止まっていないか監視します</h4>
   *
   * @method check
   * @return {Void}
   */
  Loader.p.check = function(){
    var self = this,
    count = self.count;

    self.checkID = setTimeout(function(){

      if(self.count === count){
        self.checkID = setInterval(function(){
          if(self.count !== self.length){
            self.count += 1;
          }
        }, 1000 / 60);

      } else {
        self.check();
      }
    }, self.checkTime);
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Loader.p.toString = function(){
    return '[object Loader]';
  };


  /**
   * <h4>ローダー</h4>
   * Loaderのショートハンド<br>
   * 処理が完了したら、jQuery Deferred Objectを返します
   *
   * @static
   * @method create
   * @param  {DOM} elm 対象のimgを囲う要素 省略可
   * @return {Loader} Loader生成してインスタンスを返す
   */
  Loader.create = function(elm){
    var loader = new Loader(elm);
    loader.init();
    return loader;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Loader = Loader;


}(window, jQuery));
