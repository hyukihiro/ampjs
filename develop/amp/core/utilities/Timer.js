var AMP = AMP || {};


(function(root){


  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Timerを管理します</h4>
   *
   * @class AMP.Timer
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param {Number} interval タイマー間隔
   */
  function Timer(interval){
    this.interval = AMP.isNumber(interval) ? interval : 0;
    this._timerId = null;
    this._callbacks = [];
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Timer, AMP.BASE_CLASS);

  // prototype
  var p = Timer.prototype;



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
  Timer.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Timer';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>タイマースタート</h4>
   *
   * @method start
   * @param {Number} interval タイマー間隔
   * @return {AMP.Timer} インスタンス
   */
  p.start = function(interval){
    var self = this;

    if(AMP.isNumber(interval) && 0 < interval){
      this.interval = interval;
    }

    this.stop();

    if(0 < this.interval){
      this._timerId = setTimeout(function(){
        self.callback();
      });
    }

    return this;
  };


  /**
   * <h4>タイマーストップ</h4>
   *
   * @method stop
   * @return {AMP.Timer} インスタンス
   */
  p.stop = function(){
    clearTimeout(this._timerId);
    return this;
  };


  /**
   * <h4>コールバックの追加</h4>
   *
   * @method addCallback
   * @param {Function} callback コールバック ※可変長引数可
   * @return {AMP.Timer} インスタンス
   */
  p.addCallback = function(callback){
    callback = AMP.argsToArray(callback);

    var i = 0,
    l = callback.length;

    for(; i < l; i += 1){
      if(AMP.isFunction(callback[i])){
        this._callbacks.push(callback[i]);
      }
    }

    return this;
  };


  /**
   * <h4>コールバック削除</h4>
   *
   * @method clearCallback
   * @return {AMP.Timer} インスタンス
   */
  p.clearCallback = function(){
    this._callbacks = [];
    return this;
  };


  /**
   * <h4>コールバックの実行</h4>
   *
   * @method callback
   * @return {AMP.Timer} インスタンス
   */
  p.callback = function(){
    var i = 0,
    l = this._callbacks.length;

    for(; i < l; i += 1){
      this._callbacks[i]();
    }
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Timer = Timer;



}(window));
