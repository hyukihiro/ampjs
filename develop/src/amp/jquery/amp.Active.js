(function(root, $){

  // 'use strict';

  var Active, p;



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>アクティブ化</h4>
   *
   * @class amp.Active
   * @constructor
   * @return {Active}
   */
  Active = function(){};



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
  Active.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Active.prototype;


  /**
   * <h4>アクティブタイプリスト</h4>
   *
   * @ static
   * @property types
   * @type {Array}
   */
  Active.types = [
    'textover',
    'rollover',
    // 'slipover',
    'alphaover'
  ];


  /**
   * <h4>オプションのデフォルト値</h4>
   *
   * @property defaults
   * @type {Object}
   */
  Active.defaults = {
    groupClass : 'group-over',
    activeClass: 'active',
    noOverClass: 'no-over',
    postfix    : '_on'
  };



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
   * @return {Rollover}
   */
  Active.extend = amp._extend;


  /**
   * 要素のアクティブ化
   *
   * @static
   * @public
   * @method active
   * @param {jQuery} $target 対象の要素
   * @param {String} type アクティブタイプ
   * @param {Object} options アクティブオプション
   * @return {RolloverInstance}
   */
  Active.active = p.active = function($target, type, options){
    if(!($target instanceof jQuery)){
      throw new TypeError('Please select the jQuery element');
    }

    // optionsチェック
    if($.isPlainObject(type)){
      options = type;
      type = null;
    }

    // typeの大文字表記チェック
    if(amp.isString(type)){
      type = type.toLowerCase();
    }

    // type判定
    var flag = false,
    i = 0,
    l = Active.types.length;
    for(; i < l; i += 1){
      if(type === Active.types[i]){
        flag = true;
        break;
      }
    }

    // type判定エラー時
    if(!flag){
      type = $target[0].nodeName === 'IMG' ? Active.types[1] : Active.types[0];
    }

    // テキスト
    if(Active.types[0] === type){
      return $target.addClass(options.activeClass);

    } else {
    // 画像
      options = $.extend(true, Active.defaults, options);
      return amp[type]($target.addClass(options.activeClass), options);
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Active]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Active = Active;
  root.amp.active = Active.active;



}(window, jQuery));
