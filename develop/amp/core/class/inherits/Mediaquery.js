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
   * <h4>Mediaqueryのブレイクポイントイベント</h4>
   * <p>!!!: 対象の要素(head)にcssでフォントファミリーを指定してください<br>
   * シングルトン: コンストラクタを呼び出しで使用しません<br>
   * <em>AMP.mediaquery</em>にインスタンスをエクスポートしていますので、そちらを使用してください</p>
   *
   * @class AMP.Mediaquery
   * @extends AMP.Events
   * @constructor
   * @param {DOM} elm 監視対象要素
   */
  function Mediaquery(elm){
    /**
     * <h4>スタイルを監視する要素</h4>
     *
     * @property elm
     * @default head
     * @type {DOM}
     */
    if(elm && elm.nodeType === 1){
      this.elm = elm;
    } else {
      this.elm = document.getElementsByTagName('head')[0];
    }

    /**
     * <h4>要素を監視しているか</h4>
     *
     * @property isObserver
     * @default false
     * @type {Boolean}
     */
    this.isObserver = false;

    /**
     * <h4>要素の現在のスタイルを保管します</h4>
     *
     * @property mediaStyle
     * @type {String}
     */
    this.mediaStyle = null;

    // superClass constructor call
    Mediaquery.Events_constructor.call(this);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Mediaquery, AMP.Events);

  // prototype
  var p = Mediaquery.prototype;



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
  Mediaquery.VERSION = '2.0.3';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Mediaquery';


  /**
   * <h4>フォントサイズ変更時の発行するイベントタイプ</h4>
   * FIXME: イベント属性追加予定
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  Mediaquery.eventType = 'change';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>イベントコントローラー</h4>
   * <p>状態を監視し、フォトサイズに変更があればイベントを発行します</p>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this;

    // set property
    this.isObserver = true;
    this.mediaStyle = this.getStyle();

    // event
    AMP.addEvent(root, 'resize', function(){
      if(self.mediaStyle !== self.getStyle()){
        self.mediaStyle = self.getStyle();
        self.trigger(Mediaquery.eventType);
      }
    });
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param  {String} type イベントタイプ
   * @param  {Function} listener イベントリスナー
   * @param  {Object} context コンテキスト
   * @return {Events}
   */
  p.on = function(type, listener, context){
    if(!this.isObserver){
      this._controller();
    }
    this._addEvent(type, listener, context);
    return this;
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

    args.unshift({mediaStyle: self.mediaStyle, eventType: type});

    if(listeners){
      AMP.each(listeners, function(item){
        if(!events.attr || item.attr === events.attr){
          // item.func.call(item.context, {mediaStyle: self.mediaStyle});
          item.func.apply(item.context, args);
        }
      });
    }
    return self;
  };


  /**
   * <h4>要素のスタイルを返します</h4>
   *
   * @method getStyle
   * @return {String}
   */
  p.getStyle = function(){
    if(root.getComputedStyle){
      return getComputedStyle(this.elm).getPropertyValue('font-family');
    } else {
      // !!!: jshintのチェックを緩和します
      /* jshint -W069 */
      return this.elm.currentStyle['fontFamily'];
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Mediaquery = Mediaquery;
  AMP.mediaquery = new Mediaquery();


}(window, AMP));
