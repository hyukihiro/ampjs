var AMP = AMP || {};

(function(root, $){

  // 'use strict';

  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ローダー</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>imagesloaded.jsに依存します</b>
   *
   * @class AMP.Loader
   * @constructor
   * @param  {DOM} elm 対象のimgを囲う要素 省略可 初期値： 'body'
   * @param {Boolean} isStart ローダー開始するか
   * @return {Loader}
   */
  function Loader(elm, isStart){
    this.elm = elm ? elm : this.elm;
    this.imagesloaded = imagesLoaded(this.elm);
    this.length = this.imagesloaded.images.length;
    this.$defer = new $.Deferred();

    if(AMP.isBoolean(isStart) && isStart){
      this.start();
    }

    return this;
  };

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
   * <h4>パラメーター格納オブジェクト</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;


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
      AMP.requestAnimationFrame(function(){
        self._update();
      });
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Loader = Loader;
  AMP.loader = Loader.get;


}(window, jQuery));
