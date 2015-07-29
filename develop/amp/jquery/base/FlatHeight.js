var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   *
   * @class AMP.$.FlatHeight
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $flatHeight 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($flatHeight, split, isResize){

    // $flatHeight指定がない場合、初期値を設定
    if(!$flatHeight || !($flatHeight instanceof jQuery)){
      isResize = split;
      split = $flatHeight;
      $flatHeight = $('.flat_height');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = {};

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property param.$flatHeight
     * @type {jQuery}
     */
    this.param.$flatHeight = $flatHeight;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @default $flatHeight.length
     * @property param.split
     * @type {Number}
     */
    this.param.split = AMP.isNumber(split) ? split : $flatHeight.length;

    /**
     * <h4>リサイズ後、セットし直すか？</h4>
     *
     * @default true
     * @property param.isResize
     * @type {Boolean}
     */
    this.param.isResize = AMP.isBoolean(isResize) ? isResize : true;


    this._addEvent();
    this.setHeight();
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
  FlatHeight.VERSION = '3.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'FlatHeight';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>FlatHeightインスタンス生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $flatHeight 対象のエリア要素
   * @param  {Number} split 区切る数 省略可
   * @param  {Boolean} isResize リサイズ後に実行するか
   * @return {FlatHeight}
   */
  FlatHeight.get = function($flatHeight, split, isResize){
    return new FlatHeight($flatHeight, split, isResize);
  };


  /**
   * <h4>イベント設定</h4>
   * リサイズイベント、フォントリサイズイベント
   *
   * @private
   * @method addEvent
   * @return {FlatHeight}
   */
  p._addEvent = function(){
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
    total = self.param.$flatHeight.length,
    rest = total % self.param.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.param.$flatHeight.height('auto');

    if(1 < self.param.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.param.$flatHeight.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.param.split === 0){
          var _start = rowCount * self.param.split,
          _end = (rowCount += 1) * self.param.split;

          self.param.$flatHeight.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.param.$flatHeight.slice(rowCount * self.param.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.FlatHeight = FlatHeight;



}(window, jQuery));
