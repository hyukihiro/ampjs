/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function(root, createjs){

  // 'use strict';

  var Ease, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   * amp.Easeをextendします
   * createjs.Easeをインストールして使用してください
   * see: http://www.createjs.com/Docs/TweenJS/files/tweenjs_p.js.html
   *
   * @class amp.Ease
   * @constructor
   * @return {Ease}
   */
  Ease = amp.Ease.extend();



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  // prototype
  p = Ease.prototype;


  /**
   * <h4>createjs easeing用ネームスペース</h4>
   *
   * @property createjs
   * @type {Object}
   */
  p.createjs = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property createjs._1_SINE_IN
   * @type {String}
   */
  p.createjs._1_SINE_IN = createjs.Ease.sineIn;

  /**
   * @property createjs._1_SINE_OUT
   * @type {String}
   */
  p.createjs._1_SINE_OUT = createjs.Ease.sineOut;

  /**
   * @property createjs._1_SINE_IN_OUT
   * @type {String}
   */
  p.createjs._1_SINE_IN_OUT = createjs.Ease.sineInOut;


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property createjs._2_QUAD_IN
   * @type {String}
   */
  p.createjs._2_QUAD_IN = createjs.Ease.quadIn;

  /**
   * @property createjs._2_QUAD_OUT
   * @type {String}
   */
  p.createjs._2_QUAD_OUT = createjs.Ease.quadOut;

  /**
   * @property createjs._2_QUAD_IN_OUT
   * @type {String}
   */
  p.createjs._2_QUAD_IN_OUT = createjs.Ease.quadInOut;


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property createjs._3_CUBIC_IN
   * @type {String}
   */
  p.createjs._3_CUBIC_IN = createjs.Ease.cubicIn;

  /**
   * @property createjs._3_CUBIC_OUT
   * @type {String}
   */
  p.createjs._3_CUBIC_OUT = createjs.Ease.cubicOut;

  /**
   * @property createjs._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.createjs._3_CUBIC_IN_OUT = createjs.Ease.cubicInOut;


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property createjs._4_QUART_IN
   * @type {String}
   */
  p.createjs._4_QUART_IN = createjs.Ease.quartIn;

  /**
   * @property createjs._4_QUART_OUT
   * @type {String}
   */
  p.createjs._4_QUART_OUT = createjs.Ease.quartOut;

  /**
   * @property createjs._4_QUART_IN_OUT
   * @type {String}
   */
  p.createjs._4_QUART_IN_OUT = createjs.Ease.quartInOut;


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property createjs._5_QUINT_IN
   * @type {String}
   */
  p.createjs._5_QUINT_IN = createjs.Ease.quintIn;

  /**
   * @property createjs._5_QUINT_OUT
   * @type {String}
   */
  p.createjs._5_QUINT_OUT = createjs.Ease.quintOut;

  /**
   * @property createjs._5_QUINT_IN_OUT
   * @type {String}
   */
  p.createjs._5_QUINT_IN_OUT = createjs.Ease.quintInOut;


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property createjs._6_EXPO_IN
   * @type {String}
   */
  p.createjs._6_EXPO_IN = createjs.Ease.getPowIn(6);

  /**
   * @property createjs._6_EXPO_OUT
   * @type {String}
   */
  p.createjs._6_EXPO_OUT = createjs.Ease.getPowOut(6);

  /**
   * @property createjs._6_EXPO_IN_OUT
   * @type {String}
   */
  p.createjs._6_EXPO_IN_OUT = createjs.Ease.getPowInOut(6);


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property createjs._7_CIRC_IN
   * @type {String}
   */
  p.createjs._7_CIRC_IN = createjs.Ease.circIn;

  /**
   * @property createjs._7_CIRC_OUT
   * @type {String}
   */
  p.createjs._7_CIRC_OUT = createjs.Ease.circOut;

  /**
   * @property createjs._7_CIRC_IN_OUT
   * @type {String}
   */
  p.createjs._7_CIRC_IN_OUT = createjs.Ease.circInOut;


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property createjs._LINEAR
   * @type {String}
   */
  p.createjs._LINEAR = createjs.Ease.linear;


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property createjs._BACK_IN
   * @type {String}
   */
  p.createjs._BACK_IN = createjs.Ease.backIn;

  /**
   * @property createjs._BACK_OUT
   * @type {String}
   */
  p.createjs._BACK_OUT = createjs.Ease.backOut;

  /**
   * @property createjs._BACK_IN_OUT
   * @type {String}
   */
  p.createjs._BACK_IN_OUT = createjs.Ease.backInOut;


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property createjs._ELASTIC_IN
   * @type {String}
   */
  p.createjs._ELASTIC_IN = createjs.Ease.elasticIn;

  /**
   * @property createjs._ELASTIC_OUT
   * @type {String}
   */
  p.createjs._ELASTIC_OUT = createjs.Ease.elasticOut;

  /**
   * @property createjs._ELASTIC_IN_OUT
   * @type {String}
   */
  p.createjs._ELASTIC_IN_OUT = createjs.Ease.elasticInOut;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property createjs._BOUNCE_IN
   * @type {String}
   */
  p.createjs._BOUNCE_IN = createjs.Ease.bounceIn;

  /**
   * @property createjs._BOUNCE_OUT
   * @type {String}
   */
  p.createjs._BOUNCE_OUT = createjs.Ease.bounceOut;

  /**
   * @property createjs._BOUNCE_IN_OUT
   * @type {String}
   */
  p.createjs._BOUNCE_IN_OUT = createjs.Ease.bounceInOut;




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Ease = Ease;
  root.amp.ease = new Ease();


}(window, createjs));

(function(root, createjs){

  // 'use strict';

  var Layer, p;



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
  Layer = function(container){
    this.setLayerContainer(container);
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>引数に渡られた型をチェック</h4>
   *
   * @method _isType
   * @param  {Object}  container オブジェクト(Container or Stageのインスタンス)
   * @return {Boolean}
   */
  Layer._isType = function(container){
    var isType = false,
    type;

    if(container){
      // 型チェック
      if(container.toString){
        type = container.toString();
        isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
      }

      if(!isType){
        new TypeError('Please select Stage or Container');
      }
    }

    return isType;
  };

  // prototype
  p = Layer.prototype;


  p.container = null;




  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>引数に渡られた型をチェック</h4>
   *
   * @private
   * @static
   * @method _isType
   * @param  {Object}  container オブジェクト(Container or Stageのインスタンス)
   * @return {Boolean}
   */
  Layer._isType = function(container){
    var isType = false,
    type;

    if(container){
      // 型チェック
      if(container.toString){
        type = container.toString();
        isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
      }

      if(!isType){
        new TypeError('Please select Stage or Container');
      }
    }

    return isType;
  };


  /**
   * [setContainer description]
   * @param {[type]} container [description]
   */
  p.setContainer = function(container){
    if(Layer._isType(container)){
      this.container = container;
    }
  };


  /**
   * [getLayer description]
   * @param  {[type]} selecter [description]
   * @return {[type]}          [description]
   */
  p.getLayer = function(selecter){
  };


  /**
   * [getindex description]
   * @return {[type]} [description]
   */
  p.getindex = function(){
  };


  /**
   * [getLength description]
   * @return {[type]} [description]
   */
  p.getLength = function(){
    return this.container.getNumChildren();
  };


  /**
   * [setLayer description]
   * @param {String} selecter id or name
   * @param {Number} index    インデックス番号
   * @return {Layer}
   */
  p.setLayer = function(selecter, index){
  };





  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Layer = Layer;


}(window, createjs));

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
    var isType = Selector = false,
    type;

    if(selector && amp.isFunction(selector.toString)){
      type = selector.toString();
      isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
    }

    if(isType){
      this.selector = selector;
    } else {
      new TypeError('Please select Stage or Container');
    }
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/






  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

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

  root.amp = root.amp || {};
  root.amp.$ = $;


}(window, createjs));
