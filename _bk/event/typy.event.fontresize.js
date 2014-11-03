;(function($, Typy){

  // 'use strict';


  /**
   * v0.2.0 - 2014.06.30
   * @class: observer
   * [Fontresize 文字サイズ監視、文字サイズ変更イベント]
   * @param {Function} fn      [コールバック]
   * @param {[type]}   options [オプション値]
   */
  var Fontresize = function(fn, options){
    // singleton
    if(!Fontresize.callbacks){
      Fontresize.callbacks = {};
      Fontresize.init();
    }

    if(options){
      if(options.timer){
        Fontresize.options.timer = options.timer;
      }
      Fontresize.add(fn, options.key);
    } else {
      Fontresize.add(fn);
    }

    return Fontresize;
  };

  /**
   * [config 初期値]
   * @type {Object}
   */
  Fontresize.config = {
    $ins   : $('<ins id="OBSERVER" />'),
    size   : 0,
    count  : 0,
    timerId: null
  };

  /**
   * [options オプション値]
   * @type {Object}
   */
  Fontresize.options = {
    key  : null,
    timer: 100
  };

  /**
   * [callbacks コールバックオブジェクト]
   * @type {Object}
   */
  Fontresize.callbacks = null;

  /**
   * [inti 初期化]
   */
  Fontresize.init = function(){
    // 監視対象要素の追加
    $('body').append(Fontresize.config.$ins.css({display: 'block', visibility: 'hidden', position: 'absolute', top: 0, zIndex: -1}));
    Fontresize.config.size = Fontresize.config.$ins.height();
    Fontresize.on();
  };

  /**
   * [on フォント監視開始]
   */
  Fontresize.on = function(){
    Fontresize.off();
    Fontresize.loop();
    return Fontresize;
  };

  /**
   * [off フォント監視停止]
   */
  Fontresize.off = function(){
    clearInterval(Fontresize.config.timerId);
    return Fontresize;
  };

  /**
   * [loop 再起処理]
   */
  Fontresize.loop = function(){
    var h = Fontresize.config.$ins.height();
    if(Fontresize.config.size != h){
      Fontresize.config.size = h;
      Fontresize.trigger();
    }
  };

  /**
   * [clear コールバック削除]
   * @param  {String} key [コールバックネーム] 省略可
   */
  Fontresize.clear = function(key){
    if(key && Fontresize.callbacks.key){
      Fontresize.callbacks[key] = null;

    } else if(!key){
      Fontresize.callbacks = {};
      Fontresize.off();
    }
    return Fontresize;
  };

  /**
   * [add コールバック追加]
   * @param {Function} fn  [コールバック]
   * @param {String} key [コールバックネーム] 省略可
   */
  Fontresize.add = function(fn, key){
    if(key){
      Fontresize.callbacks[key] = fn;
    } else {
      Fontresize.callbacks[Fontresize.config.count] = fn;
      Fontresize.config.count += 1;
    }
    return Fontresize;
  };

  /**
   * [trigger イベント発行]
   * @param  {String} key [コールバック関数名] 省略可
   */
  Fontresize.trigger = function(key){
    if(key){
      if($.isFunction(Fontresize.callbacks[key])){
        Fontresize.callbacks[key]();
      }

    } else {
      var key;
      for(key in Fontresize.callbacks){
        if($.isFunction(Fontresize.callbacks[key])){
          Fontresize.callbacks[key]();
        }
      }
    }
    return Fontresize;
  };





  /*--------------------------------------------------------------------------
    @export
  --------------------------------------------------------------------------*/

  Typy.Event = Typy.Event || {};
  Typy.Event.Fontresize = Fontresize;


}(jQuery, this.Typy = this.Typy || {}));
