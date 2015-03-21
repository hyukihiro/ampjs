var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class Ease
   * @constructor
   */
  function Ease(){}

  // prototype
  var p = Ease.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>CSS3 easeing用ネームスペース</h4>
   *
   * @property css
   * @type {Object}
   */
  p.css = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  p.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  p.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property css._2_QUAD_IN
   * @type {String}
   */
  p.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  p.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  p.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  p.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  p.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  p.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property css._4_QUART_IN
   * @type {String}
   */
  p.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @property css._4_QUART_OUT
   * @type {String}
   */
  p.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  p.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property css._5_QUINT_IN
   * @type {String}
   */
  p.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  p.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  p.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property css._6_EXPO_IN
   * @type {String}
   */
  p.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  p.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  p.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @property css._7_CIRC_IN
   * @type {String}
   */
  p.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  p.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  p.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @property css._BACK_IN
   * @type {String}
   */
  p.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @property css._BACK_OUT
   * @type {String}
   */
  p.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  p.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property css._ELASTIC_IN
   * @type {String}
   */
  p.css._ELASTIC_IN = null;

  /**
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  p.css._ELASTIC_OUT = null;

  /**
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  p.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property css._BOUNCE_IN
   * @type {String}
   */
  p.css._BOUNCE_IN = null;

  /**
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  p.css._BOUNCE_OUT = null;

  /**
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  p.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.exportClass(Ease, '3.0');
  AMP.ease = new Ease();


}(window));
