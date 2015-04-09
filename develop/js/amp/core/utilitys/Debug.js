var AMP = AMP || {};

(function(root){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>デバッグ機能</h4>
   *
   * @class Debug
   * @constructor
   */
  function Debug(){}

  // 基底クラスを継承
  AMP.inherits(Debug, AMP.BASE_CLASS);

  // prototype
  var p = Debug.prototype;



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
  Debug.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>デバッグview要素</h4>
   *
   * @static
   * @property debugViews
   * @type {Object}
   */
  Debug.views = null;


  /**
   * <h4>デバッグviewの表示状態</h4>
   *
   * @static
   * @property isShow
   * @type {Boolean}
   */
  Debug.isShow = true;


  /**
   * <h4>デバッグログの有効・無効</h4>
   *
   * @static
   * @property isChangeLog
   * @type {Boolean}
   */
  Debug.isChangeLog = true;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  /**
   * <h4>view要素を生成</h4>
   *
   * @static
   * @method createView
   * @return {Void}
   */
  Debug.createView = function(){
    // view要素生成
    var childNode = '<div style="z-index:19791218;min-width:250px;font-size:12px;background:#41454e;">\n<div class="ttl" style="padding:5px;line-height:12px;font-weight:bold;color:#f9f9f9;text-align:center;background:#272a32;">DEBUG</div>\n<textarea id="AMP_DEBUG_TEXT" style="-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-height:150px;padding:10px;font-family:consolas;color:#272a32;font-size:14px;line-height:1.5;border:5px solid #41454e;"></textarea>\n</div>';

    // view要素の追加
    var el = document.createElement('div');

    el.id = 'AMP_DEBUG';
    el.setAttribute('style', 'position:fixed;left:10px;bottom:10px;');
    el.innerHTML = childNode;
    document.body.appendChild(el);

    //　controll elements
    Debug.views = {
      wrap : document.getElementById('AMP_DEBUG'),
      text : document.getElementById('AMP_DEBUG_TEXT')
    };

    //　viewイベント追加
    Debug.addEvent();
  };


  /**
   * <h4>viewイベント設定</h4>
   *
   * @static
   * @method addEvent
   * @return {Void}
   */
  Debug.addEvent = function(){
    var isDrag = false,
    x = null,
    y = null;

    // down
    Debug.views.wrap.onmousedown  = function(){
      isDrag = true;
    };

    // move
    document.onmousemove = function(){
      if(isDrag){
        var _x = event.clientX;
        _y = event.clientY;

        if(AMP.isNumber(x)){
          var diffX = _x - x;
          var diffY = _y - y;
          x = _x;
          y = _y;

          var position = 'position:fixed;';
          position += 'top:' + (Debug.views.wrap.offsetTop + diffY) + 'px;';
          position += 'left:' + (Debug.views.wrap.offsetLeft + diffX) + 'px;';
          Debug.views.wrap.setAttribute('style', position);

          return false;

        } else {
          x = _x;
          y = _y;
        }
      }
    };

    // up
    document.onmouseup = function(){
      isDrag = false;
      x = null;
      y = null;
    };

    // cancel
    Debug.views.text.onmousemove = function(){
      isDrag = false;
    };
    Debug.views.wrap.onscroll = function(){
      return false;
    };
  };


  /**
   * <h4>ログを出力します</h4>
   *
   * @method log
   * @return {Debug}
   */
  p.log = function(){
    if(!Debug.views){
      Debug.createView();
    }

    if(Debug.isChangeLog){
      AMP.each(AMP.argsToArray(arguments), function(data){
        // データタイプに合わせてログを出力
        if(AMP.isArray(data)){
          Debug.views.text.value += JSON.stringify(data) + '\n';
        } else if(AMP.isObject(data)){
          Debug.views.text.value += JSON.stringify(data, null, '\t') + '\n';
        } else {
          Debug.views.text.value += data + '\n';
        }
      });
    }

    return this;
  };


  /**
   * <h4>ログのクリア</h4>
   *
   * @method clear
   * @return {Debug}
   */
  p.clear = function(){
    if(Debug.views){
      Debug.views.text.value = '';
    }
    return this;
  };


  /**
   * <h4>ログの出力モードを有効にします</h4>
   *
   * @method　start
   * @return {Debug}
   */
  p.start = function(){
    Debug.isChangeLog　= true;
    return this;
  };


  /**
   * <h4>ログの出力モードを無効にします</h4>
   *
   * @method　stop
   * @return {Debug}
   */
  p.stop = function(){
    Debug.isChangeLog　= false;
    return this;
  };


  /**
   * <h4>ログを非表示にします</h4>
   *
   * @method hide
   * @return {Debug}
   */
  p.hide = function(){
    if(Debug.views && Debug.isShow){
      var style = Debug.views.wrap.getAttribute('style') + 'display:none;';
      Debug.views.wrap.setAttribute('style', style);
      Debug.isShow = false;
    }
    return this;
  };


  /**
   * <h4>ログを表示します</h4>
   *
   * @method show
   * @return {Debug}
   */
  p.show = function(){
    if(Debug.views && !Debug.isShow){
      var style = Debug.views.wrap.getAttribute('style') + 'display:block;';
      Debug.views.wrap.setAttribute('style', style);
      Debug.isShow = true;
    }
    return this;
  };


  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP._Debug = Debug;
  AMP.debug = new Debug();


}(window));
