(function(root, $){

  // 'use strict';

  var Loader, loader, p;


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
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Boolean} isStart ローダー開始するか
   * @return {Loader}
   */
  Loader = function(elm, isStart){
    this.elm = elm ? elm : this.elm;
    this.imagesloaded = imagesLoaded(this.elm);
    this.length = this.imagesloaded.images.length;
    this.$defer = new $.Deferred();

    if(amp.isBoolean(isStart) && isStart){
      this.start();
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * Loaderのショートハンド<br>
   * 処理が完了したら、jQuery Deferred Objectを返します
   *
   * @static
   * @method loader
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期: body
   * @return {Loader} Loader生成してインスタンスを返す
   */
  loader = function(elm){
    return new Loader(elm, true);
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
  Loader.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Loader.prototype;


  /**
   * <h4>対象のimgを囲う要素</h4>
   *
   * @property elm
   * @type {DOM}
   */
  p.elm = 'body';


  /**
   * <h4>imagesloadedオブジェクト</h4>
   *
   * @property imagesloaded
   * @type {imagesloaded}
   */
  p.imagesloaded = null;


  /**
   * <h4>jQuery Deferred Objectを格納</h4>
   * ローディングの状態をdone, fail, proglessに反映しています
   *
   * @property $defer
   * @type {jQuery.Deferred}
   */
  p.$defer = null;


  /**
   * <h4>$imagesとimagesをあわせた画像点数</h4>
   *
   * @property length
   * @type {Number}
   */
  p.length = 0;


  /**
   * <h4>画像が読み込まれた数をカウントします</h4>
   *
   * @property count
   * @type {Number}
   */
  p.count = 0;


  /**
   * <h4>読み込み度数をインクリメントします</h4>
   *
   * @property loadCount
   * @type {Number}
   */
  p.loadCount = 0;



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
   * <h4>ローター開始</h4>
   *
   * @method start
   * @return {jQuery.Deferred} jQuery.Deferred.promiseを返す
   */
  p.start = function(){
    var self = this;

    // 画像処理完了毎（成功・失敗）にインクリメントする
    self.imagesloaded.jqDeferred.progress(function(){
      self.count += 1;
    });

    // カウントを更新する
    self._update();

    return self.$defer.promise();
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
    current = self.count / self.length * 100;

    self.loadCount += self.loadCount < current ? 1 : 0;

    self.$defer.notify(Math.ceil(self.loadCount));

    if(self.loadCount >= 100){
      self.$defer.resolve(self.imagesloaded);
    } else {
      amp.requestAnimationFrame(function(){
        self._update();
      });
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Loader]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Loader = Loader;
  root.amp.loader = loader;


}(window, jQuery));
