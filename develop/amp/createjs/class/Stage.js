/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, cjs){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Stage</h4>
   * <p>createjs.Stageクラスを拡張しています</p>
   *
   * @class AMP.cjs.Stage
   * @extends createjs.Stage
   * @constructor
   * @param {Object} manifest
   * @param {Object} options
   */
  function Stage(canvas, options){
    this.Stage_constructor(canvas);
    this.props = AMP.mixin(true, {}, Stage.options, options);
  }


  // 基底クラスを継承
  AMP.inherits(Stage, AMP.BASE_CLASS);

  // prototype
  var p = createjs.extend(Stage, cjs.Stage);


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
  Stage.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Stage';


  Stage.options = {
    raf   : cjs.Ticker.RAF,
    width : 300,
    height: 150,
    isCssMode: true
  };


  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  /**
   * <h4>ステージのセットアップ開始</h4>
   *
   * @method on
   * @return {Stage}
   */
  p.on = function(){
    var self = this;

    // イベント重複回避
    this.off();

    this.setSize(this.props.width, this.props.height);

    cjs.Ticker.timingMode = this.props.raf;

    // ticker
    cjs.Ticker.on('tick', function(){
      self.update();
      self._updateStage();
    });

    // resize
    AMP.addEvent(root, 'resize', function(){
      self._resize();
    });

    return this;
  };


  /**
   * <h4>ステージ停止</h4>
   *
   * @method off
   * @return {Stage}
   */
  p.off = function(){
    cjs.Ticker.off('tick');
    AMP.removeEvent(root, 'resize');
    return this;
  };


  /**
   * <h4>リサイズイベント</h4>
   *
   * @method resize
   * @param  {Function} callback コールバック
   * @return {Stage}
   */
  p.resize = function(callback){
    this._resize = callback;
    return this;
  };


  /**
   * [_resize description]
   * @return {[type]} [description]
   */
  p._resize = function(){};


  /**
   * [updateStage description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  p.updateStage = function(callback){
    this._updateStage = callback;
    return this;
  };


  /**
   * [_updateStage description]
   * @return {[type]} [description]
   */
  p._updateStage = function(){};


  /**
   * <h4>キャンバスサイズを設定</h4>
   *
   * @method setSize
   * @param {Number|Object} width 横幅
   * @param {Number} height 高さ
   * @return {Stage}
   */
  p.setSize = function(width, height){
    var obj = {};

    if(this.props.isCssMode){

    }


    if(AMP.isObject(width)){
      obj = width;
    } else {
      obj.width = width;
      obj.height = height;
    }

    this.canvas.width = AMP.isNumber(obj.width) ? obj.width : this.canvas.width;
    this.canvas.height = AMP.isNumber(obj.height) ? obj.height : this.canvas.height;

    return this;
  };


  /**
   * <h4>キャンバスサイズの取得</h4>
   *
   * @method getSize
   * @return {Object}
   */
  p.getSize = function(){
    return {
      width: this.canvas.width,
      height: this.canvas.height
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.cjs.Stage = createjs.promote(Stage, 'Stage');



}(window, AMP, createjs));
