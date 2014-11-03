;(function(root, $){

  // 'use strict';


  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight}
   */
  var FlatHeight = function($target, split, options){
    this.$target = $target;
    this.split   = $.isNumeric(split) ? split : $target.length;
    options      = $.isPlainObject(split) ? split : options;
    this.param   = $.extend(true, {}, FlatHeight.defaults, options);
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
  FlatHeight.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  FlatHeight.p = FlatHeight.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  FlatHeight.p._isInit = false;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  FlatHeight.p.$target = null;


  /**
   * <h4>高さを揃える要素の分割単位</h4>
   *
   * @property split
   * @type {Number}
   */
  FlatHeight.p.split = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults: { <ul><li>
   *   isResize: false, // {Boolean} リサイズ時、高さを揃えなおすか </li><li>
   *   key     : null, // {String} amp.fontResizeイベントに渡すコールバックキー </li><li>
   *   timer   : 100 // {Number} リサイズイベントタイミング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  FlatHeight.defaults = {
    isResize: false,
    key     : null,
    timer   : 50
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  FlatHeight.p.param = null;



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
   * @return {FlatHeight}
   */
  FlatHeight.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {FlatHeight}
   */
  FlatHeight.p.init = function(){
    if(!this._isInit){
      this._isInit = true;

      if(!this.param.key){
        this.param.key = amp.createId('FlatHeight');
      }
      this.setHeight();
      this.setEvent();
    }

    return this;
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method setEvent
   * @return {FlatHeight}
   */
  FlatHeight.p.setEvent = function(){
    var self = this;

    if(amp.isDevice('pc')){
      amp.fontResize(function(){
        self.setHeight();
      }, {key: self.param.key, timer: self.param.timer});
    }

    if(amp.isDevice('sd') || self.param.isResize){
      $(window).on('resizestop.FlatHeight', {timer: self.param.timer}, function(){
        self.setHeight();
      });
    }

    return this;
  };


  /**
   * <h4>区切りをセットして高さを揃える</h4>
   *
   * @method setSplit
   * @return {FlatHeight}
   */
  FlatHeight.p.setSplit = function(num){
    this.split = num;
    this.setHeight();
    return this;
  };


  /**
   * <h4>高さを揃える</h4>
   *
   * @method setHeight
   * @return {FlatHeight}
   */
  FlatHeight.p.setHeight = function(){
    var self = this,
    total = self.$target.length,
    rest = total % self.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.$target.height('auto');

    if(self.split < 2){
      return false;
    }

    for(; i < total; i += 1){
      // 一番高い高さを求める
      targetHeight = self.$target.eq(i).height();
      maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

      // 行の高さを揃える
      if((i + 1) % self.split === 0){
        self.$target.slice(rowCount * self.split, (rowCount += 1) * self.split).height(maxHeight);
        maxHeight = 0;

      // 最終行の高さを揃える
      } else if(1 < rest && finalRow <= i && i === total - 1){
        self.$target.slice(rowCount * self.split, total).height(maxHeight);
      }
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  FlatHeight.p.toString = function(){
    return '[object FlatHeight]';
  };


  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight} FlatHeight生成してインスタンスを返す
   */
  FlatHeight.create = function($target, split, options){
    var flatHeight = new FlatHeight($target, split, options);
    flatHeight.init();
    return flatHeight;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.FlatHeight = FlatHeight;


}(window, jQuery));
