(function(root, $){

  // 'use strict';

  var Mediaquery, mediaquery, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   *
   * @class Mediaquery
   * @constructor
   * @param  {jQuery} スタイルの監視対象要素
   * @param  {Boolean} isObserver 要素を監視しするか
   * @return {Mediaquery}
   */
  Mediaquery = function($el, isObserver){
    if($el instanceof jQuery){
      this.$el = $el;
    }

    this._event = amp.isPC() ? 'resize.Mediaquery' : 'orientationchange.Mediaquery';
    this.setObserver(isObserver);
    this._controller();
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページ内リンクのスクロール</h4>
   * Mediaqueryのショートハンド
   *
   * @static
   * @method scroll
   * @param  {jQuery} $el スタイルの監視対象要素
   * @param  {Boolean} isObserver 要素を監視しするか
   * @return {Mediaquery} Mediaqueryインスタンスを返す
   */
  mediaquery = function($el, isObserver){
    return new Mediaquery($el, isObserver);
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
  Mediaquery.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします。Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = Mediaquery.prototype = amp.extend({}, amp.Mediator.prototype, Mediaquery.prototype);


  /**
   * <h4>スタイルを監視する要素</h4>
   *
   * @property $el
   * @default $('head')
   * @type {jQuery}
   */
  p.$el = $('head');


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = false;


  /**
   * <h4>mediaTypesの保管オブジェクト</h4>
   * cssのfont-familyの文字列を保管します
   *
   * @property mediaTypes
   * @type {Object}
   */
  p.mediaTypes = {
    current: null,
    prev   : null
  };


  /**
   * <h4>監視イベント</h4>
   *
   * @private
   * @property _event
   * @type {String}
   */
  p._event = null;



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
   * @return {Mediaquery}
   */
  Mediaquery.extend = root.amp._extend;


  /**
   * <h4>状態を監視し、イベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    mediaType;

    $(root).on(self._event, function(){
      if(self.isObserver){
        mediaType = self.getCurrent();

        if(mediaType !== self.mediaTypes.current){
          self.mediaTypes.prev = self.mediaTypes.current;
          self.mediaTypes.current = mediaType;

          self.trigger(mediaType);
          self.trigger('change', self.mediaTypes);
        }
      }
    }).trigger(this._event);
  };


  /**
   * <h4>mediaqueryの監視、有無の設定</h4>
   *
   * @method setObserver
   * @param {Boolean} isObserver 監視有効か無効かセットする 有効:true
   * @return {Mediaquery}
   */
  p.setObserver = function(isObserver){
    this.isObserver = amp.isBoolean(isObserver) ? isObserver : this.isObserver;
    if(this.isObserver){
      $(root).trigger(this._event);
    }

    return this;
  };


  /**
   * <h4>現在のタイプの取得</h4>
   * $elのfont-familyを取得します
   *
   * @method getCurrent
   * @return {String}
   */
  p.getCurrent = function(){
    return this.$el.css('fontFamily');
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  p.toString = function(){
    return '[object Mediaquery]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Mediaquery = Mediaquery;
  root.amp.mediaquery = mediaquery;


}(window, jQuery));
