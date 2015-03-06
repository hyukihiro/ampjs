(function(root, createjs){

  // 'use strict';

  var $, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Layeringを管理します</h4>
   *
   * @class amp.Layer
   * @constructor
   * @return {Layer}
   */
  $ = function(selector){
    return new p.init(selector);
  };



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
  $.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = $.prototype;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * [init description]
   * @return {[type]} [description]
   */
  p.init = function(selector){
    this.selector = selector;

    if(amp.isString(selector)){
      this.elements = $.getElements(selector);
    } else if($.isDisplayObjectInherit(selector)){
      this.elements = [selector];
    }
  };

  /**
   * [getElement description]
   * @return {[type]} [description]
   */
  $.getElements = function(selector){
    var elements = [];

    console.log(selector.split(' '));
    // console.log(selector);
    // var selectrs = selector.split(' ');

    // console.log(selectrs);
    // if()

    // var isType = Selector = false,
    // type;

    // if(selector && amp.isFunction(selector.toString)){
    //   type = selector.toString();
    //   isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
    // }

    // if(isType){
    // } else {
    //   throw new TypeError('Please select DisplayObject');
    // }

    // return selectr;
  };


  $.getElementsByName = function(name){
  };

  $.getElementById = function(id){
  };

  $.getObjectsByName = function(id){
  };


  /**
   * DisplayObjectを継承しているかチェック
   *
   * [isDisplayInherit description]
   * @param  {[type]}  instance [description]
   * @return {Boolean}          [description]
   */
  $.isDisplayObjectInherit = function(instance){
    var isInherit = false,
    type;

    if(instance && amp.isFunction(instance.toString)){
      type = instance.toString();
      if(type.indexOf('[Bitmap ') === 0 ||
        type.indexOf('[Container ') === 0 ||
        type.indexOf('[DisplayObject ') === 0 ||
        type.indexOf('[MovieClip ') === 0 ||
        type.indexOf('[Rectangle ') === 0 ||
        type.indexOf('[Shape ') === 0 ||
        type.indexOf('[Sprite ') === 0 ||
        type.indexOf('[Stage ') === 0 ||
        type.indexOf('[Text ') === 0){
        isInherit = true;
      }
    }

    return isInherit;
  };


  // select
  p.eq = function(){
  };
  p.find = function(){};
  p.first = function(){};
  p.last = function(){};
  p.parent = function(){};
  p.children = function(){};

  // prop
  p.prop = function(){};
  p.hasProp = function(){};

  p.offset = function(){}; // local or global
  p.size = function(){};

  // util
  p.each = function(){
    var self = this;


    // self.children

    // this
    // return jQuery.each( this, callback, args );
  };
/*
  each: function( obj, callback, args ) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj );

    if ( args ) {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      }
    }

    return obj;
  },
*/
  // tween, qeue, layer
  //  stage.setChildIndex(instance,(stage.getNumChildren())-1);


  p.init.prototype = p;
// init.prototype = jQuery.fn;






  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.createjs = root.amp.createjs || {};
  root.amp.createjs.$ = $;


}(window, createjs));
