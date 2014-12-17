;(function(root){

  // 'use strict';


  var Mediator, p;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベントを仲介します</h4>
   *
   * @class Mediator
   * @constructor
   * @return {Mediator}
   */
  Mediator = function(){};



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
  Mediator.VERSION = '1.5';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Mediator.prototype;


  /**
   * <h4>コールバックイベントを連想配列で格納します</h4>
   *
   * @private
   * @property _callbacks
   * @type {Object}
   */
  p._callbacks = {};



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
   * @return {Extend Class}
   */
  Mediator.extend = root.amp._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.on = function(event, callback, context){
    var self = this;

    self._callbacks[event] = {
      callback: callback,
      context : context
    };

    return self;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.one = function(event, callback, context){
    var self = this,
    once;

    /* underscore ver
    once = _.once(function(){
      self.off(event, once);
      callback.apply(self, arguments);
    });
    */

    once = function(){
      self.off(event, once);
      callback.apply(self, arguments);
    };

    self.on(event, once, context);

    return self;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  p.off = function(event){
    if(this._callbacks[event]){
      this._callbacks[event] = null;

    } else if(!event){
      this._callbacks = {};
    }

    return this;
  };


  /**
   * <h4>イベントが登録されているか</h4>
   *
   * @method hasEvent
   * @param  {String} event イベント名
   * @return {Boolean}
   */
  p.hasEvent = function(event){
    var key,
    flag = false;

    for(key in this._callbacks){
      if(key === event){
        flag = true;
        break;
      }
    }

    return flag;
  };


  /**
   * <h4>イベント発行</h4>
   * <p>第二引数以降に値を渡すとcallbackに引数として渡します</p>
   *
   * @method trigger
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  p.trigger = function(event){
    if(this._callbacks[event]){
      this._callbacks[event].callback.apply(event.context, [].slice.apply(arguments).slice(1));
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
    return '[object Mediator]';
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediator = Mediator;


}(window));
