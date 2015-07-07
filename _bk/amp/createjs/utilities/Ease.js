var AMP = AMP || {};

(function(root, CJS){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easingを管理します</h4>
   *
   * @class AMP.Ease
   * @extends AMP.Ease
   * @constructor
   */
  function Ease(){}

  // 基底クラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>createjs Easing用ネームスペース</h4>
   * see: http://www.CJS.com/Docs/TweenJS/files/tweenjs_p.js.html
   *
   * @property createjs
   * @type {Object}
   */
  p.CJS = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property CJS._1_SINE_IN
   * @type {String}
   */
  p.CJS._1_SINE_IN = CJS.Ease.sineIn;

  /**
   * @property CJS._1_SINE_OUT
   * @type {String}
   */
  p.CJS._1_SINE_OUT = CJS.Ease.sineOut;

  /**
   * @property CJS._1_SINE_IN_OUT
   * @type {String}
   */
  p.CJS._1_SINE_IN_OUT = CJS.Ease.sineInOut;


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property CJS._2_QUAD_IN
   * @type {String}
   */
  p.CJS._2_QUAD_IN = CJS.Ease.quadIn;

  /**
   * @property CJS._2_QUAD_OUT
   * @type {String}
   */
  p.CJS._2_QUAD_OUT = CJS.Ease.quadOut;

  /**
   * @property CJS._2_QUAD_IN_OUT
   * @type {String}
   */
  p.CJS._2_QUAD_IN_OUT = CJS.Ease.quadInOut;


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property CJS._3_CUBIC_IN
   * @type {String}
   */
  p.CJS._3_CUBIC_IN = CJS.Ease.cubicIn;

  /**
   * @property CJS._3_CUBIC_OUT
   * @type {String}
   */
  p.CJS._3_CUBIC_OUT = CJS.Ease.cubicOut;

  /**
   * @property CJS._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.CJS._3_CUBIC_IN_OUT = CJS.Ease.cubicInOut;


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property CJS._4_QUART_IN
   * @type {String}
   */
  p.CJS._4_QUART_IN = CJS.Ease.quartIn;

  /**
   * @property CJS._4_QUART_OUT
   * @type {String}
   */
  p.CJS._4_QUART_OUT = CJS.Ease.quartOut;

  /**
   * @property CJS._4_QUART_IN_OUT
   * @type {String}
   */
  p.CJS._4_QUART_IN_OUT = CJS.Ease.quartInOut;


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property CJS._5_QUINT_IN
   * @type {String}
   */
  p.CJS._5_QUINT_IN = CJS.Ease.quintIn;

  /**
   * @property CJS._5_QUINT_OUT
   * @type {String}
   */
  p.CJS._5_QUINT_OUT = CJS.Ease.quintOut;

  /**
   * @property CJS._5_QUINT_IN_OUT
   * @type {String}
   */
  p.CJS._5_QUINT_IN_OUT = CJS.Ease.quintInOut;


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property CJS._6_EXPO_IN
   * @type {String}
   */
  p.CJS._6_EXPO_IN = CJS.Ease.getPowIn(6);

  /**
   * @property CJS._6_EXPO_OUT
   * @type {String}
   */
  p.CJS._6_EXPO_OUT = CJS.Ease.getPowOut(6);

  /**
   * @property CJS._6_EXPO_IN_OUT
   * @type {String}
   */
  p.CJS._6_EXPO_IN_OUT = CJS.Ease.getPowInOut(6);


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property CJS._7_CIRC_IN
   * @type {String}
   */
  p.CJS._7_CIRC_IN = CJS.Ease.circIn;

  /**
   * @property CJS._7_CIRC_OUT
   * @type {String}
   */
  p.CJS._7_CIRC_OUT = CJS.Ease.circOut;

  /**
   * @property CJS._7_CIRC_IN_OUT
   * @type {String}
   */
  p.CJS._7_CIRC_IN_OUT = CJS.Ease.circInOut;


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property CJS._LINEAR
   * @type {String}
   */
  p.CJS._LINEAR = CJS.Ease.linear;


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property CJS._BACK_IN
   * @type {String}
   */
  p.CJS._BACK_IN = CJS.Ease.backIn;

  /**
   * @property CJS._BACK_OUT
   * @type {String}
   */
  p.CJS._BACK_OUT = CJS.Ease.backOut;

  /**
   * @property CJS._BACK_IN_OUT
   * @type {String}
   */
  p.CJS._BACK_IN_OUT = CJS.Ease.backInOut;


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property CJS._ELASTIC_IN
   * @type {String}
   */
  p.CJS._ELASTIC_IN = CJS.Ease.elasticIn;

  /**
   * @property CJS._ELASTIC_OUT
   * @type {String}
   */
  p.CJS._ELASTIC_OUT = CJS.Ease.elasticOut;

  /**
   * @property CJS._ELASTIC_IN_OUT
   * @type {String}
   */
  p.CJS._ELASTIC_IN_OUT = CJS.Ease.elasticInOut;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property CJS._BOUNCE_IN
   * @type {String}
   */
  p.CJS._BOUNCE_IN = CJS.Ease.bounceIn;

  /**
   * @property CJS._BOUNCE_OUT
   * @type {String}
   */
  p.CJS._BOUNCE_OUT = CJS.Ease.bounceOut;

  /**
   * @property CJS._BOUNCE_IN_OUT
   * @type {String}
   */
  p.CJS._BOUNCE_IN_OUT = CJS.Ease.bounceInOut;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;
  AMP.ease = new Ease();



}(window, createjs));
