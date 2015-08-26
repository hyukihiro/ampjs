/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, cjs){

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

  // AMP.Easeクラスを継承
  AMP.inherits(Ease, AMP.Ease);

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>createjs Easing用ネームスペース</h4>
   * <p><a href="http://www.createjs.com/demos/tweenjs/tween_sparktable" target="_blank">Easing一覧</a></p>
   *
   * @property createjs
   * @type {Object}
   */
  p.cjs = {};


  /**
   * <h4>バージョン情報</h4>
   *
   * @property cjs.VERSION
   * @type {String}
   */
  p.cjs.VERSION = '1.0.0';



  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property cjs._1_SINE_IN
   * @type {String}
   */
  p.cjs._1_SINE_IN = cjs.Ease.sineIn;

  /**
   * @property cjs._1_SINE_OUT
   * @type {String}
   */
  p.cjs._1_SINE_OUT = cjs.Ease.sineOut;

  /**
   * @property cjs._1_SINE_IN_OUT
   * @type {String}
   */
  p.cjs._1_SINE_IN_OUT = cjs.Ease.sineInOut;


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property cjs._2_QUAD_IN
   * @type {String}
   */
  p.cjs._2_QUAD_IN = cjs.Ease.quadIn;

  /**
   * @property cjs._2_QUAD_OUT
   * @type {String}
   */
  p.cjs._2_QUAD_OUT = cjs.Ease.quadOut;

  /**
   * @property cjs._2_QUAD_IN_OUT
   * @type {String}
   */
  p.cjs._2_QUAD_IN_OUT = cjs.Ease.quadInOut;


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property cjs._3_CUBIC_IN
   * @type {String}
   */
  p.cjs._3_CUBIC_IN = cjs.Ease.cubicIn;

  /**
   * @property cjs._3_CUBIC_OUT
   * @type {String}
   */
  p.cjs._3_CUBIC_OUT = cjs.Ease.cubicOut;

  /**
   * @property cjs._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.cjs._3_CUBIC_IN_OUT = cjs.Ease.cubicInOut;


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property cjs._4_QUART_IN
   * @type {String}
   */
  p.cjs._4_QUART_IN = cjs.Ease.quartIn;

  /**
   * @property cjs._4_QUART_OUT
   * @type {String}
   */
  p.cjs._4_QUART_OUT = cjs.Ease.quartOut;

  /**
   * @property cjs._4_QUART_IN_OUT
   * @type {String}
   */
  p.cjs._4_QUART_IN_OUT = cjs.Ease.quartInOut;


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property cjs._5_QUINT_IN
   * @type {String}
   */
  p.cjs._5_QUINT_IN = cjs.Ease.quintIn;

  /**
   * @property cjs._5_QUINT_OUT
   * @type {String}
   */
  p.cjs._5_QUINT_OUT = cjs.Ease.quintOut;

  /**
   * @property cjs._5_QUINT_IN_OUT
   * @type {String}
   */
  p.cjs._5_QUINT_IN_OUT = cjs.Ease.quintInOut;


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property cjs._6_EXPO_IN
   * @type {String}
   */
  p.cjs._6_EXPO_IN = cjs.Ease.getPowIn(6);

  /**
   * @property cjs._6_EXPO_OUT
   * @type {String}
   */
  p.cjs._6_EXPO_OUT = cjs.Ease.getPowOut(6);

  /**
   * @property cjs._6_EXPO_IN_OUT
   * @type {String}
   */
  p.cjs._6_EXPO_IN_OUT = cjs.Ease.getPowInOut(6);


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @property cjs._7_CIRC_IN
   * @type {String}
   */
  p.cjs._7_CIRC_IN = cjs.Ease.circIn;

  /**
   * @property cjs._7_CIRC_OUT
   * @type {String}
   */
  p.cjs._7_CIRC_OUT = cjs.Ease.circOut;

  /**
   * @property cjs._7_CIRC_IN_OUT
   * @type {String}
   */
  p.cjs._7_CIRC_IN_OUT = cjs.Ease.circInOut;


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @property cjs._LINEAR
   * @type {String}
   */
  p.cjs._LINEAR = cjs.Ease.linear;


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @property cjs._BACK_IN
   * @type {String}
   */
  p.cjs._BACK_IN = cjs.Ease.backIn;

  /**
   * @property cjs._BACK_OUT
   * @type {String}
   */
  p.cjs._BACK_OUT = cjs.Ease.backOut;

  /**
   * @property cjs._BACK_IN_OUT
   * @type {String}
   */
  p.cjs._BACK_IN_OUT = cjs.Ease.backInOut;


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property cjs._ELASTIC_IN
   * @type {String}
   */
  p.cjs._ELASTIC_IN = cjs.Ease.elasticIn;

  /**
   * @property cjs._ELASTIC_OUT
   * @type {String}
   */
  p.cjs._ELASTIC_OUT = cjs.Ease.elasticOut;

  /**
   * @property cjs._ELASTIC_IN_OUT
   * @type {String}
   */
  p.cjs._ELASTIC_IN_OUT = cjs.Ease.elasticInOut;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property cjs._BOUNCE_IN
   * @type {String}
   */
  p.cjs._BOUNCE_IN = cjs.Ease.bounceIn;

  /**
   * @property cjs._BOUNCE_OUT
   * @type {String}
   */
  p.cjs._BOUNCE_OUT = cjs.Ease.bounceOut;

  /**
   * @property cjs._BOUNCE_IN_OUT
   * @type {String}
   */
  p.cjs._BOUNCE_IN_OUT = cjs.Ease.bounceInOut;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease = Ease;
  AMP.ease = new Ease();



}(window, AMP, createjs));
