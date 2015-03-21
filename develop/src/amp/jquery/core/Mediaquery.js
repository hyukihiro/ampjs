(function(root, $){

  // 'use strict';

  var Mediaquery, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>mediaqueryのブレイクポイントイベント</h4>
   *
   * @class AMP.Mediaquery
   * @constructor
   * @return {Mediaquery}
   */
  Mediaquery = function(){};



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
  Mediaquery.VERSION = '1.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = Mediaquery.prototype = $.extend({}, AMP.Mediator.prototype, Mediaquery.prototype);


  /**
   * <h4>スタイルを監視する要素</h4>
   *
   * @property $el
   * @default $('head')
   * @type {jQuery}
   */
  p.$el = null;


  /**
   * <h4>要素を監視しているか</h4>
   *
   * @property isObserver
   * @default false
   * @type {Boolean}
   */
  p.isObserver = true;


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



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * AMP._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {Mediaquery}
   */
  Mediaquery.extend = AMP._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @param  {jQuery}  $el 監視要素
   * @param  {Boolean} isObserver 監視フラグ
   * @return {Mediaquery}
   */
  p.init = function($el, isObserver){
    if(AMP.isBoolean($el)){
      isObserver = $el;
    }

    this.setElement($el);
    this.setObserver(isObserver);
    this._controller();

    return this;
  };


  /**
   * <h4>イベント登録</h4>
   * Override
   *
   * @method on
   * @param  {String} event イベント名
   * @param  {Function} callback コールバック
   * @param  {Object} context コンテキスト固定
   * @return {Mediator}
   */
  p.on = function(event, callback, context){
    this._addEvent(event, callback, context);

    // 初期化されていない場合
    if(!this.$el){
      this.init();
    }
    return this;
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
      this._getMediaEvents();

      var i = 0,
      l = handlers.length;

      for(; i < l; i += 1){
        if(!events.attr || handlers[i].attr === events.attr){
          handlers[i].callback.call(handlers[i].context, this.mediaTypes);
        }
      }
    }

    return this;
  };




  /**
   * <h4>状態を監視し、イベントを発行します</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this;

    $(root).on('resize.Mediaquery', function(){

      if(self.isObserver){
        var events = self._getMediaEvents();

        // イベント発行
        if(events[0]){
          _.each(events, function(event){
            self.trigger(event, self.mediaTypes);
          });
          self.trigger('change', self.mediaTypes);
        }
      }
    });
  };


  /**
   * <h4>イベントの取得</h4>
   * イベント名を配列で返す
   *
   * @private
   * @method _getMediaEvents
   * @return {Array}
   */
  p._getMediaEvents = function(){
    var self = this,
    mediaTypes = self.getCurrents(),
    events = [];

    // 変更されたイベントタイプの検索
    if(self.mediaTypes.current){
      events = _.difference(mediaTypes, self.mediaTypes.current);
    }

    // mediaTypes値の設定
    self.mediaTypes.prev = self.mediaTypes.current;
    self.mediaTypes.current = mediaTypes;

    return events;
  };




  /**
   * <h4>mediaqueryの監視、有無の設定</h4>
   *
   * @method setObserver
   * @param {Boolean} isObserver 監視有効か無効かセットする 有効:true
   * @return {Mediaquery}
   */
  p.setObserver = function(isObserver){
    this.isObserver = AMP.isBoolean(isObserver) ? isObserver : this.isObserver;
    if(this.isObserver){
      $(root).trigger('resize.Mediaquery');
    }

    return this;
  };


  /**
   * <h4>監視する要素を選択</h4>
   *
   * @method setElement
   * @param {jQuery} $el 監視する要素
   * @return {Mediaquery}
   */
  p.setElement = function($el){
    // 監視する要素が選択されていない場合はhead要素を選択
    if(!this.$el && !($el instanceof jQuery)){
      this.$el = $('head');
    } else {
      this.$el = $el;
    }
    return this;
  };


  /**
   * <h4>現在のタイプの取得</h4>
   * $elのfont-familyを配列にソートして返します
   *
   * @method getCurrents
   * @return {Array}
   */
  p.getCurrents = function(){
    return _.sortBy(AMP.removeSpaceChara(this.$el.css('fontFamily')).split(','));
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

  root.AMP = root.AMP || {};
  root.AMP.Mediaquery = Mediaquery;
  root.AMP.mediaquery = new Mediaquery();


}(window, jQuery));
