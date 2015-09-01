/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  function Ease(){}

  // 基底クラスを継承
  AMP.inherits(Ease, AMP.BASE_CLASS);

  // prototype
  var p = Ease.prototype;



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
  Ease.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Ease';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Ease.toString = function(){
    return '[object ' + Ease.prototype.className + ']';
  };


  /**
   * <h4>PowIn</h4>
   *
   * @static
   * @method PowIn
   * @param {Number} pow power：累乗値
   * @return {Function}
   **/
  Ease.powIn = function(pow){
    return function(t) {
      return Math.pow(t, pow);
    };
  };


  /**
   * <h4>powOut</h4>
   *
   * @static
   * @method powOut
   * @param {Number} pow power：累乗値
   * @return {Function}
   **/
  Ease.powOut = function(pow){
    return function(t) {
      return 1 - Math.pow(t, pow);
    };
  };


  /**
   * <h4>powInOut</h4>
   *
   * @static
   * @method powOut
   * @param {Number} pow power：累乗値
   * @return {Function}
   **/
  Ease.powInOut = function(pow){
    return function(t){
      t = t * 2;
      if (t < 1){
        return Math.pow(t, pow) / 2;
      } else {
        return 1 - Math.abs(Math.pow(2-t, pow)) / 2;
      }
    };
  };









  /*--------------------------------------------------------------------------

  --------------------------------------------------------------------------*/

  //
  // Ease.get(name, type){}
  // Ease.custom = function(){};

  // 0
  // linear

  // 1
  // InSine
  // OutSine
  // InOutSine

  // 2
  // InQuad
  // OutQuad
  // InOutQuad

  // 3
  // InCubic
  // OutCubic
  // InOutCubic

  // 4
  // InQuart
  // OutQuart
  // InOutQuart

  // 5
  // InQuint
  // OutQuint
  // InOutQuint

  // 6
  // InExpo
  // OutExpo
  // InOutExpo

  // 7
  // InCirc
  // OutCirc
  // InOutCirc

  // 8
  // InBack
  // OutBack
  // InOutBack

  // 9
  // InElastic
  // OutElastic
  // InOutElastic

  // 10
  // InBounce
  // OutBounce
  // InOutBounce



  /*--------------------------------------------------------------------------
    css
  --------------------------------------------------------------------------*/

  Ease.css = {};


  /* linear
  -----------------------------------------------------------------*/
  /**
   * @property css.linear
   * @type {String}
   */
  Ease.css.linear = 'linear';


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @property css._1_SINE_IN
   * @type {String}
   */
  Ease.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  Ease.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property css._2_QUAD_IN
   * @type {String}
   */
  Ease.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  Ease.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  Ease.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  Ease.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property css._4_QUART_IN
   * @type {String}
   */
  Ease.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @property css._4_QUART_OUT
   * @type {String}
   */
  Ease.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  Ease.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property css._5_QUINT_IN
   * @type {String}
   */
  Ease.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  Ease.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property css._6_EXPO_IN
   * @type {String}
   */
  Ease.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  Ease.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @property css._7_CIRC_IN
   * @type {String}
   */
  Ease.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  Ease.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @property css._BACK_IN
   * @type {String}
   */
  Ease.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @property css._BACK_OUT
   * @type {String}
   */
  Ease.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  Ease.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property css._ELASTIC_IN
   * @type {String}
   */
  Ease.css._ELASTIC_IN = null;

  /**
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_OUT = null;

  /**
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  Ease.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property css._BOUNCE_IN
   * @type {String}
   */
  Ease.css._BOUNCE_IN = null;

  /**
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_OUT = null;

  /**
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  Ease.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Ease2 = Ease;



}(window, AMP));
