var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>フォントリサイズイベント</h4>
   * Eventsクラスを継承しています Eventsクラスを参照してください
   *
   * @class AMP.FontResize
   * @constructor
   * @extends AMP.Events
   */
  function FontResize(){}

  // AMP.Eventsクラスを継承
  AMP.inherits(FontResize, AMP.Events);

  // prototype
  var p = FontResize.prototype;



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
  FontResize.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'FontResize';


  /**
   * <h4>フォントサイズ変更時の発行するイベントタイプ</h4>
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  FontResize.eventType = 'change';


  /**
   * <h4>要素を監視有効・無効の判定フラグ</h4>
   *
   * @property isFontResize
   * @default true
   * @type {Boolean}
   */
  p.isFontResize = true;


  /**
   * <h4>監視する要素</h4>
   *
   * @property el
   * @type {DOM}
   */
  p.el = null;


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
   * <h4>監視するフォント要素生成</h4>
   *
   * @private
   * @method _createElement
   * @return {Void}
   */
  p._createElement = function(){

    var key = 'AMP_FONT_RESIZE',
    el = document.createElement('ins'),
    text = document.createTextNode(key);

    el.id = key;
    el.setAttribute('style', 'display:block;visibility:hidden;position:absolute;top:0;left:0;zIndex:-1;');
    el.appendChild(text);
    document.body.appendChild(el);

    // property
    this.el = document.getElementById(key);
    this.height = this.el.clientHeight;

    // set controller
    this._controller();
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
    height = self.el.clientHeight;

    if(self.isFontResize){
      // フォントサイズに変更があれば
      if(self.height !== height){
        self.height = height;
        this.trigger(FontResize.eventType);
      }

      // 再起処理
      AMP.requestAnimationFrame(function(){
        self._controller();
      });
    }
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
    // 監視要素がない場合、要素を追加する
    if(!this.el){
      this._createElement();
    }
    this._addEvent(type, listener, context);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.FontResize = FontResize;
  AMP.fontResize = new FontResize();


}(window));
