/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>イベント</h4>
   * <p>イベントクラスの継承して使用出来ます<br>
   * メディエーターとしても使用すことも可能です<br>
   * <a href="../../demo/AMP.Events.html">DEMO</a></p>
   *
   *
   * @class AMP.Events
   * @extends AMP.BASE_CLASS
   * @constructor
   * @example
   *   var events = new AMP.Events();
   *
   *   // on<br>
   *   events.on('change', function(){...});<br>
   *   events.on('change.type', typeCall);<br>
   *
   *   // off<br>
   *   events.off('change');<br>
   *   events.off('change', funcName);<br>
   *   events.off();<br>
   *
   *   // tigger<br>
   *   events.tigger('change');<br>
   *   events.tigger('change.type');
   */
  function Events(){
    /**
     * <h4>イベントリスナーを連想配列で格納します</h4>
     *
     * @private
     * @property _listeners
     * @type {Object}
     * @example
     *   _listeners = {
     *      attr    : eventObj.attr, <br>
     *      func    : listener, <br>
     *      context : context <br>
     *   }
     */
    this._listeners = {};
  }

  // 基底クラスを継承
  AMP.inherits(Events, AMP.BASE_CLASS);

  // prototype
  var p = Events.prototype;



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
  Events.VERSION = '2.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Events';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベント登録</h4>
   * <p>イベント名に属性名を付与するも可能</p>
   *
   * @method on
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
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
   * @return {Events}
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
   * @return {Events}
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

    // listenerが関数かチェック
    if(AMP.isFunction(listener)){
      AMP.each(events, function(item){
        var eventObj = self._getEventNameMap(item);
        self._listeners[eventObj.type] = self._listeners[eventObj.type] || [];
        self._listeners[eventObj.type].push({
          attr   : eventObj.attr,
          func   : listener,
          context: context
        });
      });
    }
  };


  /**
   * <h4>イベント削除</h4>
   * FIXME: 内部処理最適化予定
   *
   * @private
   * @method _removeEvent
   * @param {String} type イベントタイプ
   * @param {Function} listener コールバック関数
   * @return {Void}
   */
  p._removeEvent = function(type, listener){
    var self = this,
    events = type ? type.split(' ') : [],
    ary = null,
    listeners;

    listener = AMP.getFunctionName(listener);

    AMP.each(events, function(event){
      var eventObj = self._getEventNameMap(event);

      // イベント属性指定がある場合
      if(eventObj && eventObj.attr && self._listeners[eventObj.type]){
        listeners = self._listeners[eventObj.type];

        AMP.each(listeners, function(item){
          if(item.attr !== eventObj.attr){
            if(listener){
              if(listener !== AMP.getFunctionName(item.func)){
                ary = ary || [];
                ary.push(item);
              }
            } else {
              ary = ary || [];
              ary.push(item);
            }
          }
        });

        self._listeners[eventObj.type] = ary;

      // イベントタイプ指定ある場合
      } else if(eventObj){
        if(listener){
          listeners = self._listeners[eventObj.type];

          AMP.each(listeners, function(item){
            if(listener !== AMP.getFunctionName(item.func)){
              ary = ary || [];
              ary.push(item);
            }
          });
        }
        self._listeners[eventObj.type] = ary;

      // イベント全て削除
      } else {
        self._listeners = null;
        self._listeners = {};
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
    var events = type.split('.');
    return {
      type: events[0],
      attr: events[1]
    };
  };


  /**
   * <h4>登録イベントがあるか判定します</h4>
   *
   * @method hasEvent
   * @param  {String} type イベントタイプ
   * @return {Boolean}
   */
  p.hasEvent = function(type){
    var flag = false,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type];

    // イベントリスナーの有無
    if(listeners){
      // 属性指定がある場合
      if(events.attr){
        AMP.each(listeners, function(item){
          if(item.attr === events.attr){
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
   * @return {Events}
   */
  p.trigger = function(type){
    var self = this,
    events = this._getEventNameMap(type),
    listeners = this._listeners[events.type],
    args = AMP.argsToArray(arguments, 1);

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          item.func.apply(item.context, args);
        }
      });
    }

    return self;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Events = Events;


}(window, AMP));
