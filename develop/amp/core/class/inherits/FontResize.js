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
   * <h4>フォントリサイズイベント</h4>
   * <p>!!!: シングルトン コンストラクタを呼び出しで使用しません<br>
   * <em>AMP.fontResize</em>にインスタンスをエクスポートしていますので、そちらを使用してください<br>
   * <a href="../../demo/AMP.FontResize.html">DEMO</a></p>
   *
   * @class AMP.FontResize
   * @extends AMP.Events
   * @constructor
   */
  function FontResize(){
    /**
     * <h4>要素を監視有効・無効の判定フラグ</h4>
     *
     * @property isFontResize
     * @default true
     * @type {Boolean}
     */
    this.isFontResize = true;

    /**
     * <h4>監視する要素</h4>
     *
     * @property elm
     * @type {DOM}
     */
    this.elm = null;

    /**
     * <h4>監視要素の高さ</h4>
     *
     * @property height
     * @type {Number}
     */
    this.height = null;

    // superClass constructor call
    FontResize.Events_constructor.call(this);
  }

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
  FontResize.VERSION = '3.0.2';


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
    elm = document.createElement('ins'),
    text = document.createTextNode(key);

    elm.id = key;
    elm.setAttribute('style', 'display:block;visibility:hidden;position:absolute;top:0;left:0;zIndex:-1;');
    elm.appendChild(text);
    document.body.appendChild(elm);

    // property
    this.elm = document.getElementById(key);
    this.height = this.elm.clientHeight;

    // set controller
    this._controller();
  };


  /**
   * <h4>イベントコントローラー</h4>
   * <p>状態を監視し、フォトサイズに変更があればイベントを発行します</p>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(){
    var self = this,
    height = self.elm.clientHeight;

    if(self.isFontResize){
      // フォントサイズに変更があれば
      if(self.height !== height){
        self.height = height;
        this.trigger(FontResize.eventType);
      }

      // 再起処理
      if(AMP.hasRAF()){
        AMP.requestAnimationFrame(function(){
          self._controller();
        });
      } else {
        setTimeout(function(){
          self._controller();
        }, 50);
      }
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
    if(!this.elm){
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


}(window, AMP));
