(function(root, createjs){

  // 'use strict';

  var $, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Layeringを管理します</h4>
   *
   * @class XXX_Layer
   * @constructor
   * @return {Layer}
   */
  $ = function(selector){
    var isType = Selector = false,
    type;

    if(selector && amp.isFunction(selector.toString)){
      type = selector.toString();
      isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
    }

    if(isType){
      this.selector = selector;
    } else {
      new TypeError(selector + ' is not a Stage or Container');
    }
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/


  // var $, p;

  // $ = function(){
  //   this.DisplayObject_constructor();
  // };
  // p = createjs.extend($, createjs.DisplayObject);




  // export
  // amp.createjs.$ = createjs.promote($, "DisplayObject");





  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /*
  p._$ = {};

  // select
  p.eq = function(){};
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
  p.each = function(){};


  // tween, qeue, layer
  //  stage.setChildIndex(instance,(stage.getNumChildren())-1);









  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  // root.amp = root.amp || {};
  // root.amp.$ = $;


}(window, createjs));
