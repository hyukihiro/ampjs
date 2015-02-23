(function(root, amp){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベントを仲介します</h4>
   *
   * @class Mediator
   * @constructor
   */
  function Mediator(){}

  // prototype
  var p = Mediator.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

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
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.on = function(event, callback, context){
    this._addEvent(event, callback, context);
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
    this._removeEvent(event);
    return this;
  };


  /**
   * <h4>イベント追加</h4>
   *
   * @private
   * @method _addEvent
   * @param {String} event イベント名
   * @param {Function} callback コールバック関数
   * @param {Object} context コンテキスト
   * @return {Void}
   */
  p._addEvent = function(event, callback, context){
    var events = event.split(' '),
    i = 0,
    l = events.length;

    for(; i < l; i += 1){
      var eventObj = this._getEventNameMap(events[i]);

      this._handlers[eventObj.name] = this._handlers[eventObj.name] || [];
      this._handlers[eventObj.name].push({
        attr    : eventObj.attr,
        callback: callback,
        context : context
      });
    }
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @private
   * @method _addEvent
   * @param {String} event イベント名 省略時、全てのイベント削除
   * @return {Void}
   */
  p._removeEvent = function(event){
    var events = event ? event.split(' ') : [],
    i = 0,
    l = events.length;

    for(; i < l; i += 1){
      var eventObj = this._getEventNameMap(events[i]);

      if(eventObj && eventObj.attr && this._handlers[eventObj.name]){
        var handlers = this._handlers[eventObj.name],
        ary = [],
        j = 0,
        k = handlers.length;

        for(; j < k; j += 1){
          if(handlers[j].attr === eventObj.attr){
            handlers[j].attr = null;
            continue;
          } else {
            ary.push(handlers[j]);
          }
        }

        this._handlers[eventObj.name] = ary;

      } else if(eventObj){
        this._handlers[eventObj.name] = null;
      } else {
        this._handlers = {};
      }
    }
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



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  amp.exportClass(Mediator, '3.0');


}(window, amp || {}));
