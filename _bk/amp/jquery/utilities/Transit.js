var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class AMP.$.Transit
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   */
  function Transit(){
    /**
     * <h4>TransitTweenを格納します</h4>
     *
     * @private
     * @property _tweens
     * @type {Object}
     */
    this._tweens = {};
  }

  // 基底クラスを継承
  AMP.inherits(Transit, AMP.BASE_CLASS);

  // prototype
  var p = Transit.prototype;



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
  Transit.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Transit';


  /**
   * <h4>Transit要素の属性名</h4>
   *
   * @strict
   * @property attrName
   * @type {String}
   */
  Transit.attrName = 'data-amp-transit';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Transitインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $boxHover 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {Transit}
   */
  // Transit.get = function($boxHover, options){
  //   var instance = new Transit($boxHover, options);
  //   instance.on();
  //   return instance;
  // };


  /**
   * <h4>Tween追加</h4>
   *
   * @method addTween
   * @param  {String|Object} name Tween名 ※Tween格納オブジェクト指定可
   * @param  {Function} tween tween関数
   * @return {Transit}
   */
  p.addTween = function(name, tween){
    var self = this;

    if(AMP.isString(name) && AMP.isFunction(tween)){
      this._tweens[name] = tween;

    } else if(AMP.isObject(name)){
      AMP.each(name, function(tween, tweenName){
        if(AMP.isFunction(tween)){
          self._tweens[tweenName] = tween;
        }
      });
    }

    return this;
  };


  /**
   * <h4>Tween削除</h4>
   * ※可変長引数可
   *
   * @method removeTween
   * @param  {String|Array} name Tween名
   * @return {Transit}
   */
  p.removeTween = function(name){
    var self = this,
    names = AMP.isArray(name) ? name : AMP.argsToArray(name);

    for(var key in self._tweens){
      AMP.each(names, function(nameItem){
        if(key === nameItem){
          self._tweens[key] = null;
        }
      });
    }

    return this;
  };


  /**
   * <h4>指定のTween名のTweenが存在するか</h4>
   *
   * @method hasTween
   * @param  {String}  name Tween名
   * @return {Boolean}
   */
  p.hasTween = function(name){
    var has = false;

    for(var key in this._tweens){
      if(key === name && this._tweens[key]){
        has = true;
        break;
      }
    }

    return has;
  };




  p.on = function($target, tweenName, tweenFn){
    if(AMP.isFunction(tweenFn)){
      this.addTween();


    }

    if(this._tweens[tweenName]){
      this._tweens[tweenName]($target);
    }
    return this;
  };




  p.off = function($target, tweenName){


  };



  addTween({
    hoverTween: function($target){
      $target.hover(fn,fn);
    }
  })



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ = {};
  AMP.$.Transit = Transit;


}(window, jQuery));
