(function(root){

  // 'use strict';

  var Mediator, mediator, p;



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
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベントを仲介します</h4>
   * Mediatorショートハンド
   *
   * @static mediator
   * @return {Mediator}
   */
  mediator = function(){
    return new Mediator();
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
  Mediator.VERSION = '2.2';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Mediator.prototype;


  /**
   * <h4>イベントハンドラーを連想配列で格納します</h4>
   *
   * @private
   * @property _handlers
   * @type {Object}
   */
  p._handlers = {};



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
  Mediator.extend = amp._extend;


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
    this._setHandler(event, callback, context);
    return this;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method one
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.one = function(event, callback, context){
    var self = this;

    /* underscore ver
    var once = _.once(function(){
      self.off(event);
      callback.apply(self, arguments);
    });
    self.on(event, once, context);
    */

    self.on(event, function(){
      self.off(event);
      callback.apply(self, arguments);
    }, context);

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} event イベント名
   * @return {Mediator}
   */
  p.off = function(event){
    this._setHandler(event);
    return this;
  };


 /**
  * <h4>ハンドラーの追加・削除</h4>
  *
  * @private
  * @method _setHandler
  * @param {String} event イベント名
  * @param {Function} callback コールバック関数
  * @param {Object} context コンテキスト
  */
  p._setHandler = function(event, callback, context){
    var events = (event && this._getEventNameMap(event));

    // addEvent
    if(callback){
      this._handlers[events.name] = this._handlers[events.name] || [];
      this._handlers[events.name].push({
        attr    : events.attr,
        callback: callback,
        context : context
      });

    // removeEvent
    } else {
      if(events && events.attr && this._handlers[events.name]){
        var handlers = this._handlers[events.name],
        ary = [],
        i = 0,
        l = handlers.length;

        for(; i < l; i += 1){
          if(handlers[i].attr === events.attr){
            handlers[i].attr = null;
            continue;
          } else {
            ary.push(handlers[i]);
          }
        }

        this._handlers[events.name] = ary;

      } else if(events){
        this._handlers[events.name] = null;
      } else {
        this._handlers = {};
      }
    }

    return this;
  };


  /**
   * <h4>イベント名、イベント属性を連想配列にして返す</h4>
   *
   * @private
   * @method _getEventNameMap
   * @param  {String} event イベント名
   * @return {Object}
   */
  p._getEventNameMap = function(event){
    var num = event.indexOf('.'),
    val;

    if(num !== -1){
      val = event.substr(num);
      event = event.substr(0, num);
    }

    return {
      name: event,
      attr : val
    };
  };


  /**
   * <h4>イベントが登録されているか</h4>
   *
   * @method hasEvent
   * @param  {String} event イベント名
   * @return {Boolean}
   */
  p.hasEvent = function(event){
    var handlers,
    events = this._getEventNameMap(event),
    flag = false;

    handlers = this._handlers[events.name];

    if(handlers){
      if(events.attr){
        var i = 0,
        l = handlers.length;

        for(; i < l; i += 1){
          if(handlers[i].attr === events.attr){
            flag = true;
            break;
          }
        }

      } else {
        flag = true;
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
    var events = this._getEventNameMap(event),
    handlers = this._handlers[events.name];

    if(handlers){
      var i = 0,
      l = handlers.length;

      for(; i < l; i += 1){
        if(!events.attr || handlers[i].attr === events.attr){
          handlers[i].callback.apply(handlers[i].context, [].slice.apply(arguments).slice(1));
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
    return '[object Mediator]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediator = Mediator;
  root.amp.mediator = mediator;


}(window));
