(function(root, $){

  // 'use strict';

  var FlatHeight, flatHeight, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class amp.FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight}
   */
  FlatHeight = function($target, split, options){
    this.$target   = $target;
    this.split     = $.isNumeric(split) ? split : $target.length;
    options        = $.isPlainObject(split) ? split : options;
    this.param     = $.extend(true, {}, FlatHeight.defaults, options);
    this.param.isResize = amp.isDevice('sd') ? true : this.param.isResize;
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method flatHeight
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Object} options オプション値 省略可
   * @return {FlatHeight} FlatHeight生成してインスタンスを返す
   */
  flatHeight = function($target, split, options){
    var inst = new FlatHeight($target, split, options);
    inst.setEvent();
    inst.setHeight();
    return inst;
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
  FlatHeight.VERSION = '2.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = FlatHeight.prototype;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>高さを揃える要素の分割単位</h4>
   *
   * @property split
   * @type {Number}
   */
  p.split = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   * defaults: { <ul><li>
   *   isResize: false, // {Boolean} リサイズ時、高さを揃えなおすか (スマートデバイスはtrueに設定されます)</li><li>
   *   timer   : 100 // {Number} リサイズイベントタイミング </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  FlatHeight.defaults = {
    isResize: false,
    timer   : 50
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



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
  FlatHeight.extend = amp._extend;


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method setEvent
   * @return {FlatHeight}
   */
  p.setEvent = function(){
    var self = this;

    // font resize
    if(amp.isDevice('pc')){
      amp.fontResize.on('change.FlatHeight', function(){
        self.setHeight();
      });
    }

    // window resize
    $(window).on('resizestop.FlatHeight', {timer: self.param.timer}, function(){
      if(self.param.isResize){
        self.setHeight();
      }
    });

    return this;
  };


  /**
   * <h4>区切りをセットして高さを揃える</h4>
   *
   * @method setSplit
   * @return {FlatHeight}
   */
  p.setSplit = function(num){
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
  p.setHeight = function(){
    var self = this,
    total = self.$target.length,
    rest = total % self.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.$target.height('auto');

    if(1 < self.split){
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
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object FlatHeight]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.FlatHeight = FlatHeight;
  root.amp.flatHeight = flatHeight;



}(window, jQuery));
