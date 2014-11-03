;(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class Ease
   * @constructor
   * @return {Instance}
   */
  var Ease = function(){};



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
  Ease.VERSION = '1.1';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Ease.p = Ease.prototype;


  /**
   * <h4>jQuery easeing</h4>
   *
   * @static
   * @property $
   * @type {Object}
   */
  Ease.jQuery = {};


  /**
   * <h4>CSS3 easeing</h4>
   *
   * @static
   * @property css
   * @type {Object}
   */
  Ease.css = {};



  /*--------------------------------------------------------------------------
    jQuery
  --------------------------------------------------------------------------*/

  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._1_SINE_IN
   * @type {String}
   */
  Ease.jQuery._1_SINE_IN = 'easeInSine';

  /**
   * @static
   * @property $._1_SINE_OUT
   * @type {String}
   */
  Ease.jQuery._1_SINE_OUT = 'easeOutSine';

  /**
   * @static
   * @property $._1_SINE_IN_OUT
   * @type {String}
   */
  Ease.jQuery._1_SINE_IN_OUT = 'easeInOutSine';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._2_QUAD_IN
   * @type {String}
   */
  Ease.jQuery._2_QUAD_IN = 'easeInQuad';

  /**
   * @static
   * @property $._2_QUAD_OUT
   * @type {String}
   */
  Ease.jQuery._2_QUAD_OUT = 'easeOutQuad';

  /**
   * @static
   * @property $._2_QUAD_IN_OUT
   * @type {String}
   */
  Ease.jQuery._2_QUAD_IN_OUT = 'easeInOutQuad';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._3_CUBIC_IN
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_IN = 'easeInCubic';

  /**
   * @static
   * @property $._3_CUBIC_OUT
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_OUT = 'easeOutCubic';

  /**
   * @static
   * @property $._3_CUBIC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._3_CUBIC_IN_OUT = 'easeInOutCubic';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._4_QUART_IN
   * @type {String}
   */
  Ease.jQuery._4_QUART_IN = 'easeInQuart';

  /**
   * @static
   * @property $._4_QUART_OUT
   * @type {String}
   */
  Ease.jQuery._4_QUART_OUT = 'easeOutQuart';

  /**
   * @static
   * @property $._4_QUART_IN_OUT
   * @type {String}
   */
  Ease.jQuery._4_QUART_IN_OUT = 'easeInOutQuart';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._5_QUINT_IN
   * @type {String}
   */
  Ease.jQuery._5_QUINT_IN = 'easeInQuint';

  /**
   * @static
   * @property $._5_QUINT_OUT
   * @type {String}
   */
  Ease.jQuery._5_QUINT_OUT = 'easeOutQuint';

  /**
   * @static
   * @property $._5_QUINT_IN_OUT
   * @type {String}
   */
  Ease.jQuery._5_QUINT_IN_OUT = 'easeInOutQuint';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._6_EXPO_IN
   * @type {String}
   */
  Ease.jQuery._6_EXPO_IN = 'easeInExpo';

  /**
   * @static
   * @property $._6_EXPO_OUT
   * @type {String}
   */
  Ease.jQuery._6_EXPO_OUT = 'easeOutExpo';

  /**
   * @static
   * @property $._6_EXPO_IN_OUT
   * @type {String}
   */
  Ease.jQuery._6_EXPO_IN_OUT = 'easeInOutExpo';


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._7_CIRC_IN
   * @type {String}
   */
  Ease.jQuery._7_CIRC_IN = 'easeInCirc';

  /**
   * @static
   * @property $._7_CIRC_OUT
   * @type {String}
   */
  Ease.jQuery._7_CIRC_OUT = 'easeOutCirc';

  /**
   * @static
   * @property $._7_CIRC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._7_CIRC_IN_OUT = 'easeInOutCirc';


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._LINEAR
   * @type {String}
   */
  Ease.jQuery._LINEAR = 'linear';


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._BACK_IN
   * @type {String}
   */
  Ease.jQuery._BACK_IN = 'easeInBack';

  /**
   * @static
   * @property $._BACK_OUT
   * @type {String}
   */
  Ease.jQuery._BACK_OUT = 'easeOutBack';

  /**
   * @static
   * @property $._BACK_IN_OUT
   * @type {String}
   */
  Ease.jQuery._BACK_IN_OUT = 'easeInOutBack';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._ELASTIC_IN
   * @type {String}
   */
  Ease.jQuery._ELASTIC_IN = 'easeInElastic';

  /**
   * @static
   * @property $._ELASTIC_OUT
   * @type {String}
   */
  Ease.jQuery._ELASTIC_OUT = 'easeOutElastic';

  /**
   * @static
   * @property $._ELASTIC_IN_OUT
   * @type {String}
   */
  Ease.jQuery._ELASTIC_IN_OUT = 'easeInOutElastic';


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property $._BOUNCE_IN
   * @type {String}
   */
  Ease.jQuery._BOUNCE_IN = 'easeInBounce';

  /**
   * @static
   * @property $._BOUNCE_OUT
   * @type {String}
   */
  Ease.jQuery._BOUNCE_OUT = 'easeOutBounce';

  /**
   * @static
   * @property $._BOUNCE_IN_OUT
   * @type {String}
   */
  Ease.jQuery._BOUNCE_IN_OUT = 'easeInOutBounce';




  /*--------------------------------------------------------------------------
    css3
  --------------------------------------------------------------------------*/

  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @static
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  Ease.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._2_QUAD_IN
   * @type {String}
   */
  Ease.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @static
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @static
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  Ease.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @static
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @static
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._4_QUART_IN
   * @type {String}
   */
  Ease.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @static
   * @property css._4_QUART_OUT
   * @type {String}
   */
  Ease.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @static
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  Ease.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._5_QUINT_IN
   * @type {String}
   */
  Ease.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @static
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @static
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._6_EXPO_IN
   * @type {String}
   */
  Ease.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @static
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @static
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._7_CIRC_IN
   * @type {String}
   */
  Ease.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @static
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @static
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BACK_IN
   * @type {String}
   */
  Ease.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @static
   * @property css._BACK_OUT
   * @type {String}
   */
  Ease.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @static
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  Ease.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._ELASTIC_IN
   * @type {String}
   */
  Ease.css._ELASTIC_IN = null;

  /**
   * @static
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_OUT = null;

  /**
   * @static
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BOUNCE_IN
   * @type {String}
   */
  Ease.css._BOUNCE_IN = null;

  /**
   * @static
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_OUT = null;

  /**
   * @static
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Ease.p.toString = function(){
    return '[object Ease]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Ease = Ease;


}(window, jQuery));
