var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベント管理</h4>
   *
   * @class Event
   * @constructor
   */
  function Event(){}

  // 基底クラスを継承
  AMP.inherits(Event, AMP._AMP);

  // prototype
  var p = Event.prototype;



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
  Event.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  p.className = 'Event';


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
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Event}
   */
  p.on = function(type, listener, context){
    this._addEvent(type, listener, context);
    return this;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method onece
   * @param  {String} type イベントタイプ
   * @param  {Function} listener  イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Event}
   */
  p.onece = function(type, listener, context){
    var self = this;

    self.on(type, function(){
      self.off(type);
      listener.apply(self, arguments);
    }, context);

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} type イベントタイプ
   * @param  {Function} listener  イベントリスナー
   * @return {Event}
   */
  p.off = function(type, listener){
    this._removeEvent(type, listener);
    return this;
  };


  /**
   * <h4>イベント追加</h4>
   *
   * @private
   * @method _addEvent
   * @param {String} type イベントタイプ
   * @param {Function} listener コールバック関数
   * @param {Object} context コンテキスト
   * @return {Void}
   */
  p._addEvent = function(type, listener, context){
    var self = this,
    events = type.split(' ');

    AMP.each(events, function(item){
      var eventObj = self._getEventNameMap(item);
      self._handlers[eventObj.type] = self._handlers[eventObj.type] || [];
      self._handlers[eventObj.type].push({
        attr    : eventObj.attr,
        listener: listener,
        context : context
      });
    });
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @private
   * @method _addEvent
   * @param {String} type イベントタイプ
   * @param {Function} listener コールバック関数
   * @return {Void}
   */
  p._removeEvent = function(type, listener){
    var self = this,
    events = type ? type.split(' ') : [];

    listener = AMP.getFunctionName(listener);

    AMP.each(events, function(event){
      var eventObj = self._getEventNameMap(event);

      // イベント属性指定がある場合
      if(eventObj && eventObj.attr && self._handlers[eventObj.type]){
        var handlers = self._handlers[eventObj.type],
        ary = null;

        AMP.each(handlers, function(handler){
          if(handler.attr !== eventObj.attr){
            if(listener){
              if(listener !== AMP.getFunctionName(handler.listener)){
                ary = ary || [];
                ary.push(handler);
              }
            } else {
              ary = ary || [];
              ary.push(handler);
            }
          }
        });

        self._handlers[eventObj.type] = ary;

      // イベントタイプ指定ある場合
      } else if(eventObj){
        var ary = null;

        if(listener){
          var handlers = self._handlers[eventObj.type],
          AMP.each(handlers, function(handler){
            if(listener !== AMP.getFunctionName(handler.listener)){
              ary = ary || [];
              ary.push(handler);
            }
          });
        }
        self._handlers[eventObj.type] = ary;

      // イベント全て削除
      } else {
        self._handlers = null;
        self._handlers = {};
      }
    });
  };


  /**
   * <h4>イベント名、イベント属性を連想配列にして返す</h4>
   *
   * @private
   * @method _getEventNameMap
   * @param  {String} type イベントタイプ
   * @return {Object}
   */
  p._getEventNameMap = function(type){
    var num = type.indexOf('.'),
    attr;

    if(num !== -1){
      attr = type.substr(num);
      type = type.substr(0, num);
    }

    return {
      type: type,
      attr: attr
    };
  };


  /**
   * <h4>イベントが登録されているか</h4>
   *
   * @method hasEvent
   * @param  {String} type イベントタイプ
   * @return {Boolean}
   */
  p.hasEvent = function(type){
    var handlers,
    events = this._getEventNameMap(type),
    flag = false;

    handlers = this._handlers[events.type];

    if(handlers){
      if(events.attr){
        AMP.each(handlers, function(handler){
          if(handler.attr === events.attr){
            flag = true;
            return false;
          }
        });
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
   * @param  {String} type イベントタイプ
   * @return {Event}
   */
  p.trigger = function(type){
    var self = this,
    events = this._getEventNameMap(type),
    handlers = this._handlers[events.type];

    if(handlers){
      AMP.each(handlers, function(handler){
        if(!events.attr || handler.attr === events.attr){
          handler.listener.apply(handler.context, AMP.argsToArray(arguments, 1));
        }
      });
    }

    return self;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Event = Event;


}(window));
