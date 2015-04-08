(function(root, $){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>デバッグ機能</h4>
   *
   * @class Log
   * @constructor
   */
  function Debug(){}

  // 基底クラスを継承
  AMP.inherits(Debug, AMP._AMP);

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
   * @private
   * @property name
   * @type {String}
   */
  p.className = 'Debug';


  /**
   * <h4>デバッグview</h4>
   *
   * @property css
   * @type {Object}
   */
  p._debugViews = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  // Log.hsaLog = !(root.console._defaultLog);
  Debug.createView = function(){
    // view?p?[?c?v‘f?d?¶?￢
    var childNode = '';
    childNode += '<div style="z-index:19791218;min-width:250px;font-size:12px;background:#41454e;">';
    childNode += '<div class="ttl" style="padding:5px;line-height:12px;font-weight:bold;color:#f9f9f9;text-align:center;background:#272a32;">DEBUG</div>';
    childNode += '<textarea id="AMP_DEBUG_TEXT" style="-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-height:150px;padding:10px;font-family:consolas;color:#272a32;font-size:14px;line-height:1.5;border:5px solid #41454e;"></textarea>';
    childNode += '</div>';

    // view?v‘f?d?¶?￢
    var doc = document,
    el = doc.createElement('div');

    el.id = 'AMP_DEBUG';
    el.innerHTML = childNode;
    doc.body.appendChild(el);

    //?@controll elms
    Debug.views = {
      wrap : doc.getElementById('AMP_DEBUG'),
      text : doc.getElementById('AMP_DEBUG_TEXT')
    };

    Debug.views.wrap.setAttribute('style', 'position:fixed;left:10px;bottom:10px;');

    //
    Debug.addEvent();
  };


  Debug.addEvent = function(){
   // move
    var isDrag = false,
    x = null,
    y = null;

    // down
    Debug.views.wrap.onmousedown  = function(){
      isDrag = true;
    };

    // cancel
    Debug.views.text.onmousemove = function(){
      isDrag = false;
    };

    // move
    Debug.views.wrap.onmousemove = function(){
      if(isDrag){
        var _x = event.clientX;
        _y = event.clientY;

        if(AMP.isNumber(x)){
          var diffX = _x - x;
          var diffY = _y - y;
          x = _x;
          y = _y;

          var offset = 'position:fixed;';
          offset += 'top:' + (Debug.views.wrap.offsetTop + diffY) + 'px;';
          offset += 'left:' + (Debug.views.wrap.offsetLeft + diffX) + 'px;';
          Debug.views.wrap.setAttribute('style', offset);

        } else {
          x = _x;
          y = _y;
        }

        return false;
      }
    };

    // up
    document.onmouseup = function(){
      isDrag = false;
      x = null;
      y = null;
    };
  };





  /**
   * <h4>ログを出力します</h4>
   *
   * @method log
   * @return {Debug}
   */
  p.log = function(){
    if(!this.views){
      Debug.createView();
    }

    // データタイプに合わせてログを出力
    AMP.each(AMP.argsToArray(arguments), function(data){
      if(AMP.isArray(data)){
        this.views.text.value += JSON.stringify(data) + '\n';
      } else if(AMP.isObject(data)){
        this.views.text.value += JSON.stringify(data, null, '\t') + '\n';
      } else {
        this.views.text.value += data + '\n';
      }
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP._Debug = Debug;
  AMP.debug = new Debug();


}(window, jQuery));
