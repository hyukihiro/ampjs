/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>要素の高さを揃える</h4>
   * <p><a href="../../demo/AMP.$.FlatHeight.html">DEMO</a></p>
   *
   * @class AMP.$.FlatHeight
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {jQuery} $flatHeight 対象のエリア要素
   * @param {Number} split 区切る数 省略可
   * @param {Boolean} isResize リサイズ後に実行するか
   */
  function FlatHeight($flatHeight, split, isResize){

    // $flatHeight指定がない場合、初期値を設定
    if(!$flatHeight || !($flatHeight instanceof jQuery)){
      isResize = split;
      split = $flatHeight;
      $flatHeight = $('.flat_height');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     *
     * @property props
     * @type {Object}
     */
    this.props = {};

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.flat_height')
     * @property props.$flatHeight
     * @type {jQuery}
     */
    this.props.$flatHeight = $flatHeight;

    /**
     * <h4>高さを揃える要素の分割単位</h4>
     *
     * @default $flatHeight.length
     * @property props.split
     * @type {Number}
     */
    this.props.split = AMP.isNumber(split) ? split : $flatHeight.length;

    /**
     * <h4>リサイズ後、セットし直すか？</h4>
     *
     * @default true
     * @property props.isResize
     * @type {Boolean}
     */
    this.props.isResize = AMP.isBoolean(isResize) ? isResize : true;

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
  FlatHeight.VERSION = '3.1.0';


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
    $(root).on('resizestop.FlatHeight', function(){
      if(self.props.isResize){
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
    this.props.split = num;
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
    total = self.props.$flatHeight.length,
    rest = total % self.props.split,
    finalRow = total - rest,
    maxHeight = 0,
    targetHeight = 0,
    rowCount = 0,
    i = 0;

    self.props.$flatHeight.height('auto');

    if(1 < self.props.split){

      for(; i < total; i += 1){
        // 一番高い高さを求める
        targetHeight = self.props.$flatHeight.eq(i).height();
        maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;

        // 行の高さを揃える
        if((i + 1) % self.props.split === 0){
          var _start = rowCount * self.props.split,
          _end = (rowCount += 1) * self.props.split;

          self.props.$flatHeight.slice(_start, _end).height(maxHeight);
          maxHeight = 0;

        // 最終行の高さを揃える
        } else if(1 < rest && finalRow <= i && i === total - 1){
          self.props.$flatHeight.slice(rowCount * self.props.split, total).height(maxHeight);
        }
      }
    }

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.FlatHeight = FlatHeight;


}(window, AMP, jQuery));
