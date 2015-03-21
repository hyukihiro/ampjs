(function(root){



  amp.createKlass = function(name, ver){
    var Klass, p;

    Klass = function(){};
    Klass.VERSION = ver;
    p = Klass.prototype;
    p.name = name;

    // クラス名を返す
    p.toString = function(){
      return '[object ' + name + ' name=' + name + ']';
    };

    return Klass;
  };


  var Klass = new app.Klass(name, ver);

  app.Klass = function(name, ver){
  };




  // 'use strict';

  // public
  var p;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>トゥイーン</h4>
   *
   * @constructor
   * @class Tween
   * @return {Tween}
   */
  function Tween(){};



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
  Tween.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Tween.prototype;


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {String}
   */
  p.name = 'Tween';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Tween name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.app = root.app || {};
  root.app.Tween = Tween;


}(window));
