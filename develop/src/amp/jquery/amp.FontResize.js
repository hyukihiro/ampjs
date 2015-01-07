(function(root, $){

  // 'use strict';

  var FontResize, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>フォントサイズ変更イベント</h4>
   *
   * @class FontResize
   * @constructor
   * @return {FontResize}
   */
  FontResize = function(){};



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
  FontResize.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = FontResize.prototype = amp.extend({}, amp.Mediator.prototype, FontResize.prototype);


  /**
   * <h4>フォントサイズ変更時の発行するイベント名</h4>
   *
   * @private
   * @static
   * @property _event 'change'
   * [_event description]
   * @type {String}
   */
  FontResize._event = 'change';


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = true;


  /**
   * <h4>監視する要素</h4>
   *
   * @property $el
   * @type {jQuery}
   */
  p.$el = null;


  /**
   * <h4>監視要素の高さ</h4>
   *
   * @property height
   * @type {Number}
   */
  p.height = null;



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
  FontResize.extend = amp._extend;


  /**
   * <h4>監視するフォントの設置</h4>
   *
   * @private
   * @method _init
   * @return {FontResize}
   */
  p._init = function(){
    this.$el = $('<ins id="FontResize">F</ins>').css({
      display   : 'block',
      visibility: 'hidden',
      position  : 'absolute',
      top       : 0,
      left      : 0,
      zIndex    : -1
    });

    $('body').append(this.$el);
    this.height = this.$el.height();
    this._controller();

    return this;
  };


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
    if(!this.$el){
      this._init();
    }

    this._setHandler(event, callback, context);
    return this;
  };


  /**
   * <h4>フォントの監視、有無の設定</h4>
   *
   * @method setObserver
   * @param {Boolean} isObserver 監視有効か無効かセットする 有効:true
   * @return {FontResize}
   */
  p.setObserver = function(isObserver){
    var flag = amp.isBoolean(isObserver) ? isObserver : this.isObserver;

    if(flag !== this.isObserver && flag){
      this._controller();
    }

    this.isObserver = flag;

    return this;
  };


  /**
   * <h4>状態を監視し、フォトサイズに変更があればイベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    h = self.$el.height();

    if(self.height !== h){
      self.height = h;
      this.trigger(FontResize._event);
    }

    if(self.isObserver){
      amp.requestAnimationFrame(function(){
        self._controller();
      });
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @static
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object FontResize]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.FontResize = FontResize;
  root.amp.fontResize = new FontResize();


}(window, jQuery));
