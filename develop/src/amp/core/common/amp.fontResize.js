;(function(root){

  // 'use strict';


  /**
   * <h4>文字サイズ監視、文字サイズ変更イベント</h4>
   * シングルトンパターン
   *
   * @static
   * @class fontResize
   * @event fontResize
   * @param {Function} fn コールバック関数
   * @param  {String} key コールバックキー
   * @return {fontResize}
   * @example
   *  amp.fontResize.on('change', callback);
   */
  var fontResize = function(fn, key){
    // singleton
    if(!fontResize._callbacks){
      fontResize._callbacks = {};
      fontResize._init();
    }

    if(key){
      fontResize.add(fn, key);
    } else {
      fontResize.add(fn);
    }

    return fontResize;
  };


  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  fontResize.VERSION = '1.5';


  /**
   * <h4>設定値</h4>
   * config { <ul><li>
   *   elm    : null, 監視対象のDOM</li><li>
   *   size   : 0, {Number} 現在のフォントサイズ</li><li>
   *   count  : 0, {Number} コールバックインデックス</li><li>
   *   timerId: null {Number} タイマーID</li></ul>
   * }
   *
   * @static
   * @property config
   * @type {Object}
   */
  fontResize.config = {
    elm    : null,
    size   : 0,
    count  : 0,
    timerId: null
  };


  /**
   * <h4>コールバックオブジェクト</h4>
   *
   * @private
   * @static
   * @property _callbacks
   * @type {Object}
   */
  fontResize._callbacks = null;


  /**
   * <h4>初期化</h4>
   *
   * @private
   * @static
   * @method _init
   * @return {Void}
   */
  fontResize._init = function(){
    // 監視対象要素の追加
    fontResize.config.elm = document.createElement('ins');
    fontResize.config.elm.innerHTML = 'amp';
    fontResize.config.elm.setAttribute('id', 'amp_observer');
    fontResize.config.elm.setAttribute('style', 'display:block; visibility: hidden; position: absolute; top: 0; z-index: -1;');
    document.getElementsByTagName('body')[0].appendChild(fontResize.config.elm);

    fontResize.config.size = fontResize.config.elm.clientHeight;
    fontResize.on();
  };


  /**
   * <h4>フォント監視開始</h4>
   *
   * @static
   * @method on
   * @return {fontResize}
   */
  fontResize.on = function(){
    fontResize.off();
    fontResize.loop();
    return fontResize;
  };


  /**
   * <h4>フォント監視停止</h4>
   *
   * @static
   * @method off
   * @return {fontResize}
   */
  fontResize.off = function(){
    amp.cancelAnimationFrame(fontResize.config.timerId);
    return fontResize;
  };


  /**
   * <h4>再起処理</h4>
   *
   * @static
   * @method loop
   * @return {Void}
   */
  fontResize.loop = function(){
    var h = fontResize.config.elm.clientHeight;
    if(fontResize.config.size != h){
      fontResize.config.size = h;
      fontResize.trigger();
    }
    fontResize.config.timerId = amp.requestAnimationFrame(fontResize.loop);
  };


  /**
   * <h4>コールバック削除</h4>
   *
   * @static
   * @method clear
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.clear = function(key){
    if(key && fontResize._callbacks.key){
      fontResize._callbacks[key] = null;

    } else if(!key){
      fontResize._callbacks = {};
      fontResize.off();
    }
    return fontResize;
  };


  /**
   * <h4>コールバック追加</h4>
   *
   * @static
   * @method add
   * @param {Function} fn コールバック関数
   * @param {String} key コールバックキー
   * @return {fontResize}
   */
  fontResize.add = function(fn, key){
    if(key){
      // 注意： コールバックオブジェクトが重複したとき上書きします。
      fontResize._callbacks[key] = fn;

    } else {
      fontResize._callbacks[fontResize.config.count] = fn;
      fontResize.config.count += 1;
    }
    return fontResize;
  };


  /**
   * <h4>イベント発行</h4>
   *
   * @static
   * @method trigger
   * @param {String} key コールバックキー 省略可
   * @return {fontResize}
   */
  fontResize.trigger = function(key){
    if(key){
      if(amp.isFunction(fontResize._callbacks[key])){
        fontResize._callbacks[key]();
      }

    } else {
      var k;
      for(k in fontResize._callbacks){
        if(amp.isFunction(fontResize._callbacks[k])){
          fontResize._callbacks[k]();
        }
      }
    }
    return fontResize;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  fontResize.toString = function(){
    return '[object fontResize]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.fontResize = fontResize;


}(window));
