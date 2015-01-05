(function(root){

  // 'use strict';


  var ease;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Easeingを管理します</h4>
   *
   * @class ease
   * @constructor
   * @return {ease}
   */
  ease = {};



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
  ease.VERSION = '1.6';


  /*--------------------------------------------------------------------------
    jQuery
  --------------------------------------------------------------------------*/

  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _1_SINE_IN
   * @type {String}
   */
  ease._1_SINE_IN = 'easeInSine';

  /**
   * @static
   * @property _1_SINE_OUT
   * @type {String}
   */
  ease._1_SINE_OUT = 'easeOutSine';

  /**
   * @static
   * @property _1_SINE_IN_OUT
   * @type {String}
   */
  ease._1_SINE_IN_OUT = 'easeInOutSine';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _2_QUAD_IN
   * @type {String}
   */
  ease._2_QUAD_IN = 'easeInQuad';

  /**
   * @static
   * @property _2_QUAD_OUT
   * @type {String}
   */
  ease._2_QUAD_OUT = 'easeOutQuad';

  /**
   * @static
   * @property _2_QUAD_IN_OUT
   * @type {String}
   */
  ease._2_QUAD_IN_OUT = 'easeInOutQuad';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _3_CUBIC_IN
   * @type {String}
   */
  ease._3_CUBIC_IN = 'easeInCubic';

  /**
   * @static
   * @property _3_CUBIC_OUT
   * @type {String}
   */
  ease._3_CUBIC_OUT = 'easeOutCubic';

  /**
   * @static
   * @property _3_CUBIC_IN_OUT
   * @type {String}
   */
  ease._3_CUBIC_IN_OUT = 'easeInOutCubic';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _4_QUART_IN
   * @type {String}
   */
  ease._4_QUART_IN = 'easeInQuart';

  /**
   * @static
   * @property _4_QUART_OUT
   * @type {String}
   */
  ease._4_QUART_OUT = 'easeOutQuart';

  /**
   * @static
   * @property _4_QUART_IN_OUT
   * @type {String}
   */
  ease._4_QUART_IN_OUT = 'easeInOutQuart';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _5_QUINT_IN
   * @type {String}
   */
  ease._5_QUINT_IN = 'easeInQuint';

  /**
   * @static
   * @property _5_QUINT_OUT
   * @type {String}
   */
  ease._5_QUINT_OUT = 'easeOutQuint';

  /**
   * @static
   * @property _5_QUINT_IN_OUT
   * @type {String}
   */
  ease._5_QUINT_IN_OUT = 'easeInOutQuint';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _6_EXPO_IN
   * @type {String}
   */
  ease._6_EXPO_IN = 'easeInExpo';

  /**
   * @static
   * @property _6_EXPO_OUT
   * @type {String}
   */
  ease._6_EXPO_OUT = 'easeOutExpo';

  /**
   * @static
   * @property _6_EXPO_IN_OUT
   * @type {String}
   */
  ease._6_EXPO_IN_OUT = 'easeInOutExpo';


  /* 7 Circ
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _7_CIRC_IN
   * @type {String}
   */
  ease._7_CIRC_IN = 'easeInCirc';

  /**
   * @static
   * @property _7_CIRC_OUT
   * @type {String}
   */
  ease._7_CIRC_OUT = 'easeOutCirc';

  /**
   * @static
   * @property _7_CIRC_IN_OUT
   * @type {String}
   */
  ease._7_CIRC_IN_OUT = 'easeInOutCirc';


  /* Linear
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _LINEAR
   * @type {String}
   */
  ease._LINEAR = 'linear';


  /* Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _BACK_IN
   * @type {String}
   */
  ease._BACK_IN = 'easeInBack';

  /**
   * @static
   * @property _BACK_OUT
   * @type {String}
   */
  ease._BACK_OUT = 'easeOutBack';

  /**
   * @static
   * @property _BACK_IN_OUT
   * @type {String}
   */
  ease._BACK_IN_OUT = 'easeInOutBack';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _ELASTIC_IN
   * @type {String}
   */
  ease._ELASTIC_IN = 'easeInElastic';

  /**
   * @static
   * @property _ELASTIC_OUT
   * @type {String}
   */
  ease._ELASTIC_OUT = 'easeOutElastic';

  /**
   * @static
   * @property _ELASTIC_IN_OUT
   * @type {String}
   */
  ease._ELASTIC_IN_OUT = 'easeInOutElastic';


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property _BOUNCE_IN
   * @type {String}
   */
  ease._BOUNCE_IN = 'easeInBounce';

  /**
   * @static
   * @property _BOUNCE_OUT
   * @type {String}
   */
  ease._BOUNCE_OUT = 'easeOutBounce';

  /**
   * @static
   * @property _BOUNCE_IN_OUT
   * @type {String}
   */
  ease._BOUNCE_IN_OUT = 'easeInOutBounce';


  /*--------------------------------------------------------------------------
    createjs
  --------------------------------------------------------------------------*/

  /**
   * <h4>createjs.Easeをエクスポートしています</h4>
   * createjs.Easeをインストールして使用してください
   *
   * @static
   * @property createjs
   * @type {Object}
   */
  ease.createjs = (function(){
    var e = {},
    c = root.createjs || {};


    if(!c.Ease){
      return e;
    } else {
      c = createjs.Ease;
    }

    // see: http://www.createjs.com/Docs/TweenJS/files/tweenjs_ease.js.html

    /* 1 Sine
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._1_SINE_IN
     * @type {String}
     */
     e._1_SINE_IN = c.sineIn;

    /**
     * @static
     * @property createjs._1_SINE_OUT
     * @type {String}
     */
    e._1_SINE_OUT = c.sineOut;

    /**
     * @static
     * @property createjs._1_SINE_IN_OUT
     * @type {String}
     */
    e._1_SINE_IN_OUT = c.sineInOut;


    /* 2 Quad
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._2_QUAD_IN
     * @type {String}
     */
    e._2_QUAD_IN = c.quadIn;

    /**
     * @static
     * @property createjs._2_QUAD_OUT
     * @type {String}
     */
    e._2_QUAD_OUT = c.quadOut;

    /**
     * @static
     * @property createjs._2_QUAD_IN_OUT
     * @type {String}
     */
    e._2_QUAD_IN_OUT = c.quadInOut;


    /* 3 Cubic
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._3_CUBIC_IN
     * @type {String}
     */
    e._3_CUBIC_IN = c.cubicIn;

    /**
     * @static
     * @property createjs._3_CUBIC_OUT
     * @type {String}
     */
    e._3_CUBIC_OUT = c.cubicOut;

    /**
     * @static
     * @property createjs._3_CUBIC_IN_OUT
     * @type {String}
     */
    e._3_CUBIC_IN_OUT = c.cubicInOut;


    /* 4 Quart
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._4_QUART_IN
     * @type {String}
     */
    e._4_QUART_IN = c.quartIn;

    /**
     * @static
     * @property createjs._4_QUART_OUT
     * @type {String}
     */
    e._4_QUART_OUT = c.quartOut;

    /**
     * @static
     * @property createjs._4_QUART_IN_OUT
     * @type {String}
     */
    e._4_QUART_IN_OUT = c.quartInOut;


    /* 5 Quint
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._5_QUINT_IN
     * @type {String}
     */
    e._5_QUINT_IN = c.quintIn;

    /**
     * @static
     * @property createjs._5_QUINT_OUT
     * @type {String}
     */
    e._5_QUINT_OUT = c.quintOut;

    /**
     * @static
     * @property createjs._5_QUINT_IN_OUT
     * @type {String}
     */
    e._5_QUINT_IN_OUT = c.quintInOut;


    /* 6 Expo
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._6_EXPO_IN
     * @type {String}
     */
    e._6_EXPO_IN = c.getPowIn(6);

    /**
     * @static
     * @property createjs._6_EXPO_OUT
     * @type {String}
     */
    e._6_EXPO_OUT = c.getPowOut(6);

    /**
     * @static
     * @property createjs._6_EXPO_IN_OUT
     * @type {String}
     */
    e._6_EXPO_IN_OUT = c.getPowInOut(6);


    /* 7 Circ
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._7_CIRC_IN
     * @type {String}
     */
    e._7_CIRC_IN = c.circIn;

    /**
     * @static
     * @property createjs._7_CIRC_OUT
     * @type {String}
     */
    e._7_CIRC_OUT = c.circOut;

    /**
     * @static
     * @property createjs._7_CIRC_IN_OUT
     * @type {String}
     */
    e._7_CIRC_IN_OUT = c.circInOut;


    /* Linear
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._LINEAR
     * @type {String}
     */
    e._LINEAR = c.linear;


    /* Back
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._BACK_IN
     * @type {String}
     */
    e._BACK_IN = c.backIn;

    /**
     * @static
     * @property createjs._BACK_OUT
     * @type {String}
     */
    e._BACK_OUT = c.backOut;

    /**
     * @static
     * @property createjs._BACK_IN_OUT
     * @type {String}
     */
    e._BACK_IN_OUT = c.backInOut;


    /* Elastic
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._ELASTIC_IN
     * @type {String}
     */
    e._ELASTIC_IN = c.elasticIn;

    /**
     * @static
     * @property createjs._ELASTIC_OUT
     * @type {String}
     */
    e._ELASTIC_OUT = c.elasticOut;

    /**
     * @static
     * @property createjs._ELASTIC_IN_OUT
     * @type {String}
     */
    e._ELASTIC_IN_OUT = c.elasticInOut;


    /* Bounce
    -----------------------------------------------------------------*/
    /**
     * @static
     * @property createjs._BOUNCE_IN
     * @type {String}
     */
    e._BOUNCE_IN = c.bounceIn;

    /**
     * @static
     * @property createjs._BOUNCE_OUT
     * @type {String}
     */
    e._BOUNCE_OUT = c.bounceOut;

    /**
     * @static
     * @property createjs._BOUNCE_IN_OUT
     * @type {String}
     */
    e._BOUNCE_IN_OUT = c.bounceInOut;


    return e;

  }());



  /*--------------------------------------------------------------------------
    css3
  --------------------------------------------------------------------------*/

  /**
   * <h4>CSS3 easeing</h4>
   *
   * @static
   * @property css
   * @type {Object}
   */
  ease.css = {};


  /* 1 Sine
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  ease.css._1_SINE_IN = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @static
   * @property css._1_SINE_IN
   * @type {String}
   */
  ease.css._1_SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @static
   * @property css._1_SINE_IN_OUT
   * @type {String}
   */
  ease.css._1_SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._2_QUAD_IN
   * @type {String}
   */
  ease.css._2_QUAD_IN = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @static
   * @property css._2_QUAD_OUT
   * @type {String}
   */
  ease.css._2_QUAD_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @static
   * @property css._2_QUAD_IN_OUT
   * @type {String}
   */
  ease.css._2_QUAD_IN_OUT = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._3_CUBIC_IN
   * @type {String}
   */
  ease.css._3_CUBIC_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @static
   * @property css._3_CUBIC_OUT
   * @type {String}
   */
  ease.css._3_CUBIC_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @static
   * @property css._3_CUBIC_IN_OUT
   * @type {String}
   */
  ease.css._3_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._4_QUART_IN
   * @type {String}
   */
  ease.css._4_QUART_IN = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @static
   * @property css._4_QUART_OUT
   * @type {String}
   */
  ease.css._4_QUART_OUT = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @static
   * @property css._4_QUART_IN_OUT
   * @type {String}
   */
  ease.css._4_QUART_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._5_QUINT_IN
   * @type {String}
   */
  ease.css._5_QUINT_IN = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @static
   * @property css._5_QUINT_OUT
   * @type {String}
   */
  ease.css._5_QUINT_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @static
   * @property css._5_QUINT_IN_OUT
   * @type {String}
   */
  ease.css._5_QUINT_IN_OUT = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._6_EXPO_IN
   * @type {String}
   */
  ease.css._6_EXPO_IN = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @static
   * @property css._6_EXPO_OUT
   * @type {String}
   */
  ease.css._6_EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @static
   * @property css._6_EXPO_IN_OUT
   * @type {String}
   */
  ease.css._6_EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._7_CIRC_IN
   * @type {String}
   */
  ease.css._7_CIRC_IN = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @static
   * @property css._7_CIRC_OUT
   * @type {String}
   */
  ease.css._7_CIRC_OUT = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @static
   * @property css._7_CIRC_IN_OUT
   * @type {String}
   */
  ease.css._7_CIRC_IN_OUT = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BACK_IN
   * @type {String}
   */
  ease.css._BACK_IN = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @static
   * @property css._BACK_OUT
   * @type {String}
   */
  ease.css._BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @static
   * @property css._BACK_IN_OUT
   * @type {String}
   */
  ease.css._BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._ELASTIC_IN
   * @type {String}
   */
  ease.css._ELASTIC_IN = null;

  /**
   * @static
   * @property css._ELASTIC_OUT
   * @type {String}
   */
  ease.css._ELASTIC_OUT = null;

  /**
   * @static
   * @property css._ELASTIC_IN_OUT
   * @type {String}
   */
  ease.css._ELASTIC_IN_OUT = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @static
   * @property css._BOUNCE_IN
   * @type {String}
   */
  ease.css._BOUNCE_IN = null;

  /**
   * @static
   * @property css._BOUNCE_OUT
   * @type {String}
   */
  ease.css._BOUNCE_OUT = null;

  /**
   * @static
   * @property css._BOUNCE_IN_OUT
   * @type {String}
   */
  ease.css._BOUNCE_IN_OUT = null;



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.ease = ease;


}(window));
