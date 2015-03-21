(function(root, createjs){

  // 'use strict';

  var Ease, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   * AMP.Easeをextendします
   * createjs.Easeをインストールして使用してください
   * see: http://www.createjs.com/Docs/TweenJS/files/tweenjs_p.js.html
   *
   * @class AMP.Ease
   * @constructor
   * @return {Ease}
   */
  Ease = AMP.Ease.extend();



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

  root.AMP = root.AMP || {};
  root.AMP.Ease = Ease;
  root.AMP.ease = new Ease();


}(window, createjs));