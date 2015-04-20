var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class FlatHeight
   * @constructor
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($target, split, isResize){

    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      isResize = split;
      split = $target;
      $target = $('.flat_height');
    }

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @property split
     * @type {Number}
     */
    this.param.split = AMP.isNumber(split) ? split : this.param.$target.length;


    /**
     * <h4>サイズ後、リセットしなおすか</h4>
     *
     * @property isResize
     * @type {Boolean}
     */
    this.param.isResize = AMP.isBoolean(isResize) ? isResize : true;
  }

  // 基底クラスを継承
  AMP.inherits(FlatHeight, AMP.BASE_CLASS);

  // prototype
  var p = FlatHeight.prototype;



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
  FlatHeight.VERSION = '3.0.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = FlatHeight.prototype;


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>要素の高さ揃え</h4>
   * FlatHeightのショートハンド
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   * @return {FlatHeight}
   */
  FlatHeight.get = function($target, split, isResize){
    var instance = new FlatHeight($target, split, isResize);
    instance.addEvent();
    instance.setHeight();
    return instance;
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @method addEvent
   * @return {FlatHeight}
   */
  p.addEvent = function(){
    var self = this;

    // fontresize
    if(AMP.isDevice('pc')){
      AMP.fontResize.on('change.FlatHeight', function(){
        self.setHeight();
      });
    }

    // window resize
    $(root).on('resizestop.FlatHeight', {timer: 50}, function(){
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
    if(!AMP.isNumber(num)){
      throw new TypeError(num + ' is not a Number');
    }
    this.param.split = num;
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
    total = self.param.$target.length,
    rest = total % self.param.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.param.$target.height('auto');

    if(1 < self.param.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.param.$target.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.param.split === 0){
          var _start = rowCount * self.param.split,
          _end = (rowCount += 1) * self.param.split;

          self.param.$target.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.param.$target.slice(rowCount * self.param.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.FlatHeight = FlatHeight;
  AMP.flatHeight = FlatHeight.get;



}(window, jQuery));
