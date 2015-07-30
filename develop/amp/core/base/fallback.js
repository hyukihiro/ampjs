/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    フォールバック
  ======================================================================*/

  /**
   * <h4>ブラウザサポートされていない場合、代替処理を行います</h4>
   *
   * @class Fallback
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /* window
  -----------------------------------------------------------------*/

  /**
   * <h4>consoleがなければ空の関数を返す</h4>
   *
   * @method console.log
   * @return {Void}
   */
  if(!('console' in root)){
    root.console = {
      log: function(){}
    };
  }


  /* Array
  -----------------------------------------------------------------*/

  /**
   * <h4>forEach</h4>
   * 配列の各要素に対して、指定された処理を実行します<br>
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @method Array.prototype.forEach
   * @type {Void}
   */
  Array.prototype.forEach = Array.prototype.forEach || function(callback, context){
    if(this === null){
      throw new TypeError(this + ' is null or not defined');
    }
    var i = 0, l = this.length;
    for(; i < l; i += 1){
      callback.call(context || null, this[i], i, this);
    }
  };


  /* Function
  -----------------------------------------------------------------*/

  /**
   * <h4>束縛された関数生成</h4>
   * FIXME: βバージョンです。検証していません
   *
   * @beta
   * @method Function.prototype.bind
   * @param  {Function} context this値としてターゲット関数に渡される値
   * @param  {Any} Argments 関数に渡す引数
   * @return {Function}
   */
  Function.prototype.bind = Function.prototype.bind || function(context){
    if (!AMP.isFunction(this)) {
      throw new TypeError(this + ' is not a callable');
    }

    var self = this,
    args = AMP.argsToArray(arguments, 1),
    F = function(){},
    B = function(){
      var ctx = this instanceof F ? this : context;
      return self.apply(ctx, args.concat(AMP.argsToArray(arguments)));
    };

    F.prototype = this.prototype;
    B.prototype = new F();
    return B;
  };


  /* Object
  -----------------------------------------------------------------*/

  /**
   * <h4>新しいprototypeオブジェクトの生成</h4>
   *
   * @static
   * @method Object.create
   * @param  {Object} proto プロトタイプオブジェクト
   * @return {Object}
   */
  Object.create = Object.create || function(proto){
    function Obj(){}
    Obj.prototype = proto;
    return new Obj();
  };


  /**
   * <h4>連想配列の要素数取得</h4>
   * Object.keysの処理を追加
   *
   * @static
   * @method Object.keys
   * @param  {Object} obj
   * @return {Void}
   */
  Object.keys =  Object.keys || function(obj){
    if(AMP.isObject(obj)){
      var placeHolder = {
        length: 0
      },
      prop;

      for(prop in obj){
        if(obj.hasOwnProperty(prop)){
          placeHolder.length += 1;
        }
      }
      return placeHolder;
    }
  };


  /* String
  -----------------------------------------------------------------*/

  /**
   * <h4>両端の空白を取り除いた文字列を返す</h4>
   *
   * @method String.prototype.trim
   * @return {String}
   */
  String.prototype.trim = String.prototype.trim || function(){
    return this.replace(/^\s+|\s+$/g, '');
  };


  /* DOM
  -----------------------------------------------------------------*/

  /**
   * <h4>DOMイベント追加</h4>
   *
   * @static
   * @method addEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.addEvent = function(element, type, listener){
    if(element.addEventListener){
      element.addEventListener(type, listener, false);
    } else {
      element.attachEvent('on' + type, listener);
    }
    return element;
  };


  /**
   * <h4>DOMイベント削除</h4>
   *
   * @static
   * @method removeEvent
   * @param  {DOM} element  ターゲット要素
   * @param  {String} type     イベント名
   * @param  {Function} listener 実行する関数
   * @return {DOM}
   */
  AMP.removeEvent = function(element, type, listener){
    if(element.addEventListener){
      element.removeEventListener(type, listener, false);
    } else {
      element.detachEvent('on' + type, listener);
    }
    return element;
  };


}(window, AMP));
