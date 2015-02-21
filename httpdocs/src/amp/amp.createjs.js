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

  var Asset, p;



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
  Asset = function(container){
    if(Asset.isDisplayObjectInherit(container)){
      this.container = container;
      // underscoreで一時的に対応
      // _.extend(this, container);
    } else {
      throw new TypeError('Please select DisplayObject');
    }
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
  Asset.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = Asset.prototype;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/



  /**
   * <h4>指定したnemeプロパティを持つオブジェクトを検索して配列で返します</h4>
   *
   * @static
   * @public
   * @method findName
   * @param  {String} name 検索nemeプロパティ値
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Array}
   */
  p.findName = Asset.findName = function(name, children){
    children = children || this.container.children;
    name = name.replace(/^\./, '');

    var elms = [],
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(children[i].name === name){
        elms.push(children[i]);
      }
      if(children[i].children){
        var result = Asset.findName(name, children[i].children);
        if(result[0]){
          // 配列連結
          Array.prototype.push.apply(elms, result);
        }
      }
    }

    return elms;
  };


  /**
   * <h4>指定id名のオブジェクトを返す</h4>
   *
   * @static
   * @public
   * @method findId
   * @param  {String} id 検索id名
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Object}
   */
  p.findId = Asset.findId = function(id, children){
    children = children || this.container.children;
    id = id.replace(/^#/, '');

    var elm,
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(children[i].id === id){
        elm = children[i];
      } else if(children[i].children){
        elm = Asset.findId(id, children[i].children);
      }

      if(elm){
        break;
      }
    }

    return elm;
  };


  /**
   * <h4>指定したタイプオブジェクトを検索して配列で返します</h4>
   *
   * findObject description]
   * @param  {String} type     検索オブジェクトタイプ名
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Array}
   */
  p.findObject = Asset.findObject = function(type, children){
    children = children || this.container.children;

    var elms = [],
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(Asset.isType(type, children[i])){
        elms.push(children[i]);
      }
      if(children[i].children){
        var result = Asset.findObject(type, children[i].children);
        if(result[0]){
          // 配列連結
          Array.prototype.push.apply(elms, result);
        }
      }
    }

    return elms;
  };


  /**
   * <h4>オブジェクトが指定した型かチェックします</h4>
   *
   * @static
   * @public
   * @method isType
   * @param  {String}  type タイプ名
   * @param  {Object}  object  判定する対象オブジェクト
   * @return {Boolean}
   */
  Asset.isType = function(type, object){
    return object.toString().toLowerCase().indexOf('[' + type + ' ') === 0;
  };


  /**
   * <h4>DisplayObjectを継承しているかチェックします</h4>
   *
   * @static
   * @method isDisplayInherit
   * @param  {Object}  instance 評価するインスタンスオブジェクト
   * @return {Boolean}
   */
  Asset.isDisplayObjectInherit = function(instance){
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


  p.size = function(){
    var bounds = this.container.getBounds();

    if(!bounds){

    }
    console.log(this.container);
    return;
    return {
      width: bounds.width,
      height: bounds.height
    };
  };


  /**
   * <h4>each処理</h4>
   *
   * @method each
   * @param  {Function} callback 繰り返し毎に関数が呼び出されます
   * @return {Array}
   */
  p.each = function(callback){
    var i = 0,
    l = this.container.children.length,
    value;

    for(; i < l; i += 1){
      value = callback.call( this.container.children[i], i, this.container.children[i]);
      if(value === false){
        break;
      }
    }

    return this.container.children;
  };




/*--------------------------------------------------------------------------
  未定
--------------------------------------------------------------------------*/

/*
  // select
  p.eq = function(){};
  // p.find = function(){};
  p.first = function(){};
  p.last = function(){};


  // prop
  p.prop = function(){};
  p.hasProp = function(){};

  p.offset = function(){}; // local or global
  p.size = function(){};

  // util
  p.each = function(){};







  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.createjs = root.amp.createjs || {};
  root.amp.createjs.Asset = Asset;


}(window, createjs));

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

  root.amp = root.amp || {};
  root.amp.$ = $;


}(window, createjs));
