/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function(root, amp){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class Ease
   * @constructor
   */
  function Ease(){}

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>CSS3 easeing用ネームスペース</h4>
   *
   * @property css
   * @type {Object}
   */
  p.css = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  p.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property css._2_QUAD_IN
   * @type {String}
   */
  p.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  p.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  p.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  p.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  p.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property css._4_QUART_IN
   * @type {String}
   */
  p.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @property css._4_QUART_OUT
   * @type {String}
   */
  p.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  p.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property css._5_QUINT_IN
   * @type {String}
   */
  p.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  p.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  p.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property css._6_EXPO_IN
   * @type {String}
   */
  p.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  p.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  p.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @property css._7_CIRC_IN
   * @type {String}
   */
  p.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  p.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  p.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @property css._BACK_IN
   * @type {String}
   */
  p.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @property css._BACK_OUT
   * @type {String}
   */
  p.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  p.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property css._ELASTIC_IN
   * @type {String}
   */
  p.css._ELASTIC_IN = null;

  /**
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  p.css._ELASTIC_OUT = null;

  /**
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  p.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property css._BOUNCE_IN
   * @type {String}
   */
  p.css._BOUNCE_IN = null;

  /**
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  p.css._BOUNCE_OUT = null;

  /**
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  p.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  amp.exportClass(Ease, '3.0');
  amp.ease = new Ease();


}(window, amp || {}));

(function(root, amp){

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

  // prototype
  var p = Event.prototype;



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
   * @return {Event}
   */
  p.on = function(event, callback, context){
    this._addEvent(event, callback, context);
    return this;
  };


  /**
   * <h4>1度だけ実行するイベント登録</h4>
   *
   * @method onece
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Event}
   */
  p.onece = function(event, callback, context){
    var self = this;

    self.on(event, function(){
      self.off(event);
      callback.apply(self, arguments);
    }, context);

    return this;
  };


  /**
   * !important 時期バージョンでcallback追加予定
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param  {String} event イベント名
   * @return {Event}
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
    var self = this,
    events = event.split(' ');

    amp.each(events, function(item){
      var eventObj = self._getEventNameMap(item);
      self._handlers[eventObj.name] = self._handlers[eventObj.name] || [];
      self._handlers[eventObj.name].push({
        attr    : eventObj.attr,
        callback: callback,
        context : context
      });
    });
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
    var self = this,
    events = event ? event.split(' ') : [];

    amp.each(events, function(event){
      var eventObj = self._getEventNameMap(event);

      if(eventObj && eventObj.attr && self._handlers[eventObj.name]){
        var handlers = self._handlers[eventObj.name],
        ary = [];

        amp.each(handlers, function(handler){
          if(handler.attr === eventObj.attr){
            handler.attr = null;
            return true;
          } else {
            ary.push(handler);
          }
        });

        self._handlers[eventObj.name] = ary;

      } else if(eventObj){
        self._handlers[eventObj.name] = null;
      } else {
        self._handlers = {};
      }
    });

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
      attr: val
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
        amp.each(handlers, function(handler){
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
   * @param  {String} event イベント名
   * @return {Event}
   */
  p.trigger = function(event){
    var self = this,
    events = this._getEventNameMap(event),
    handlers = this._handlers[events.name];

    if(handlers){
      amp.each(handlers, function(handler){
        if(!events.attr || handler.attr === events.attr){
          handler.callback.apply(handler.context, [].slice.apply(arguments).slice(1));
        }
      });
    }

    return self;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  amp.exportClass(Event, '3.0');


}(window, amp || {}));

(function(root, amp){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ストレージ管理</h4>
   *
   * @class Storage
   * @constructor
   * @param {Boolean} isLocalStorage ローカルストレージを使用するか？
   */
  function Storage(isLocalStorage){
    if(amp.hasStorage()){
      if(isLocalStorage){
        this.type     = 'localStorage';
        this._storage = localStorage;

      } else {
        this.type     = 'sessionStorage';
        this._storage = sessionStorage;
      }
    }
  }

  // prototype
  var p = Storage.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>ストレージタイプ</h4>
   *
   * @default 'sessionStorage'
   * @property type
   * @type {String}
   */
  p.type = 'sessionStorage';


  /**
   * <h4>ストレージを保管</h4>
   *
   * @private
   * @property _storage
   * @type {Object}
   */
  p._storage = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>値のセット</h4>
   *
   * @method setItem
   * @param {String | Object} key セットするキー オブジェクトを渡すと、一括で値をセットします
   * @param {Any} val セットする値
   * @return {Storage}
   */
  p.setItem = function(key, val){
    var self = this;

    if(self._storage){
      if(amp.isObject(key)){
        amp.each(key, function(item, index){
          self._storage.setItem(index, item);
        });
      } else {
        self._storage.setItem(key, val);
      }
    }

    return self;
  };


  /**
   * <h4>アイテム、ストレージデータの削除</h4>
   *
   * @method removeItem
   * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
   * @return {Storage}
   */
  p.removeItem = function(key){
    var self = this;

    if(this._storage){
      if(amp.isUndefined(key)){
        this._storage.clear();

      } else {
        amp.each(arguments, function(item){
          self._storage.removeItem(item);
        });
      }
    }

    return this;
  };


  /**
   * <h4>レングスを返す</h4>
   *
   * @method getLength
   * @return {Number}
   */
  p.getLength = function(){
    return this._storage && this._storage.length;
  };


  /**
   * <h4>アイテムの取得</h4>
   *
   * @method getItem
   * @param  {String} key 取得するキー 省略時は、ストレージオブジェクトを返す
   * @return {Any}
   */
  p.getItem = function(key){
    if(this._storage){
      if(amp.isUndefined(key)){
        if(this._storage.length){
          return this._storage;
        }
      } else {
        return this._storage.getItem(key);
      }
    }
  };


  /**
   * <h4>アイテムがあるか判定</h4>
   *
   * @method hasItem
   * @param  {String}  key 判定するキー
   * @return {Boolean}
   */
  p.hasItem = function(key){
    if(this._storage){
      return this._storage.getItem(key) !== null;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  amp.exportClass(Storage, '2.0');


}(window, amp || {}));
