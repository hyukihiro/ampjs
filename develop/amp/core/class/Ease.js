/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


(function(root, AMP){
	/*
	* Ease
	* Visit http://createjs.com/ for documentation, updates and examples.
	*
	* Copyright (c) 2010 gskinner.com, inc.
	* Released under the MIT license
	* http://opensource.org/licenses/mit-license.php
	*/

	// "use strict";


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/
	/**
	 * <h4>Easing</h4>
	 *
	 * @class Ease
	 * @static
	 **/
	function Ease(){
		throw "Ease cannot be instantiated.";
	}

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


	/**
	 * <h4>補完用ネームスペース</h4>
	 *
	 * @static
	 * @property COMPLETION
	 * @type {Object}
	 */
	Ease.COMPLETION = {
    _LINEAR        : 'linear',
    _1_SINE_IN     : 'sineIn',
    _1_SINE_OUT    : 'sineOut',
    _1_SINE_IN_OUT : 'sineInOut',
    _2_QUAD_IN     : 'quadIn',
    _2_QUAD_OUT    : 'quadOut',
    _2_QUAD_IN_OUT : 'quadInOut',
    _3_CUBIC_IN    : 'cubicIn',
    _3_CUBIC_OUT   : 'cubicOut',
    _3_CUBIC_IN_OUT: 'cubicInOut',
    _4_QUART_IN    : 'quartIn',
    _4_QUART_OUT   : 'quartOut',
    _4_QUART_IN_OUT: 'quartInOut',
    _5_QUINT_IN    : 'quintIn',
    _5_QUINT_OUT   : 'quintOut',
    _5_QUINT_IN_OUT: 'quintInOut',
    _6_EXPO_IN     : 'expoIn',
    _6_EXPO_OUT    : 'expoOut',
    _6_EXPO_IN_OUT : 'expoInOut',
    _7_CIRC_IN     : 'circIn',
    _7_CIRC_OUT    : 'circOut',
    _7_CIRC_IN_OUT : 'circInOut',
    _BACK_IN       : 'backIn',
    _BACK_OUT      : 'backOut',
    _BACK_IN_OUT   : 'backInOut',
    _BOUNCEI_N     : 'bounceIn',
    _BOUNCE_OUT    : 'bounceOut',
    _BOUNCE_IN_OUT : 'bounceInOut',
    _ELASTIC_IN    : 'elasticIn',
    _ELASTIC_OUT   : 'elasticOut',
    _ELASTIC_IN_OUT: 'elasticInOut'
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/


  Ease.addCompletionName = function(obj){
		AMP.each(Ease.COMPLETION, function(item, key){
			if(obj[item]){
				obj[key] = obj[item];
			}
		});
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Ease.toString = function(){
    return '[object ' + Ease.prototype.className + ']';
  };



	/*--------------------------------------------------------------------------
		default easing
	--------------------------------------------------------------------------*/

	/**
	 * @method linear
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.linear = function(t) { return t; };

	/**
	 * Identical to linear.
	 * @method none
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.none = Ease.linear;

	/**
	 * Mimics the simple -100 to 100 easing in Flash Pro.
	 * @method get
	 * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.get = function(amount) {
		if (amount < -1) { amount = -1; }
		if (amount > 1) { amount = 1; }
		return function(t) {
			if (amount===0) { return t; }
			if (amount<0) { return t*(t*-amount+1+amount); }
			return t*((2-t)*amount+(1-amount));
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowIn
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowIn = function(pow) {
		return function(t) {
			return Math.pow(t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowOut = function(pow) {
		return function(t) {
			return 1-Math.pow(1-t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowInOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowInOut = function(pow) {
		return function(t) {
			if ((t*=2)<1) return 0.5*Math.pow(t,pow);
			return 1-0.5*Math.abs(Math.pow(2-t,pow));
		};
	};

	/**
	 * @method quadIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadIn = Ease.getPowIn(2);
	/**
	 * @method quadOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadOut = Ease.getPowOut(2);
	/**
	 * @method quadInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadInOut = Ease.getPowInOut(2);

	/**
	 * @method cubicIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicIn = Ease.getPowIn(3);
	/**
	 * @method cubicOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicOut = Ease.getPowOut(3);
	/**
	 * @method cubicInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicInOut = Ease.getPowInOut(3);

	/**
	 * @method quartIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartIn = Ease.getPowIn(4);
	/**
	 * @method quartOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartOut = Ease.getPowOut(4);
	/**
	 * @method quartInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartInOut = Ease.getPowInOut(4);

	/**
	 * @method quintIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintIn = Ease.getPowIn(5);
	/**
	 * @method quintOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintOut = Ease.getPowOut(5);
	/**
	 * @method quintInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintInOut = Ease.getPowInOut(5);

	/**
	 * @method expoIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.expoIn = Ease.getPowIn(6);
	/**
	 * @method expoOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.expoOut = Ease.getPowOut(6);
	/**
	 * @method expoInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.expoInOut = Ease.getPowInOut(6);

	/**
	 * @method sineIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineIn = function(t) {
		return 1-Math.cos(t*Math.PI/2);
	};

	/**
	 * @method sineOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineOut = function(t) {
		return Math.sin(t*Math.PI/2);
	};

	/**
	 * @method sineInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineInOut = function(t) {
		return -0.5*(Math.cos(Math.PI*t) - 1);
	};

	/**
	 * Configurable "back in" ease.
	 * @method getBackIn
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackIn = function(amount) {
		return function(t) {
			return t*t*((amount+1)*t-amount);
		};
	};
	/**
	 * @method backIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backIn = Ease.getBackIn(1.7);

	/**
	 * Configurable "back out" ease.
	 * @method getBackOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackOut = function(amount) {
		return function(t) {
			return (--t*t*((amount+1)*t + amount) + 1);
		};
	};
	/**
	 * @method backOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backOut = Ease.getBackOut(1.7);

	/**
	 * Configurable "back in out" ease.
	 * @method getBackInOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackInOut = function(amount) {
		amount*=1.525;
		return function(t) {
			if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
			return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
		};
	};
	/**
	 * @method backInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backInOut = Ease.getBackInOut(1.7);

	/**
	 * @method circIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circIn = function(t) {
		return -(Math.sqrt(1-t*t)- 1);
	};

	/**
	 * @method circOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circOut = function(t) {
		return Math.sqrt(1-(--t)*t);
	};

	/**
	 * @method circInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circInOut = function(t) {
		if ((t*=2) < 1) return -0.5*(Math.sqrt(1-t*t)-1);
		return 0.5*(Math.sqrt(1-(t-=2)*t)+1);
	};

	/**
	 * @method bounceIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceIn = function(t) {
		return 1-Ease.bounceOut(1-t);
	};

	/**
	 * @method bounceOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceOut = function(t) {
		if (t < 1/2.75) {
			return (7.5625*t*t);
		} else if (t < 2/2.75) {
			return (7.5625*(t-=1.5/2.75)*t+0.75);
		} else if (t < 2.5/2.75) {
			return (7.5625*(t-=2.25/2.75)*t+0.9375);
		} else {
			return (7.5625*(t-=2.625/2.75)*t +0.984375);
		}
	};

	/**
	 * @method bounceInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceInOut = function(t) {
		if (t<0.5) return Ease.bounceIn (t*2) * 0.5;
		return Ease.bounceOut(t*2-1)*0.5+0.5;
	};

	/**
	 * Configurable elastic ease.
	 * @method getElasticIn
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticIn = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t===0 || t===1) return t;
			var s = period/pi2*Math.asin(1/amplitude);
			return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
		};
	};
	/**
	 * @method elasticIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticIn = Ease.getElasticIn(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t===0 || t===1) return t;
			var s = period/pi2 * Math.asin(1/amplitude);
			return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
		};
	};
	/**
	 * @method elasticOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticOut = Ease.getElasticOut(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticInOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticInOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			var s = period/pi2 * Math.asin(1/amplitude);
			if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
			return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
		};
	};
	/**
	 * @method elasticInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticInOut = Ease.getElasticInOut(1,0.3*1.5);



	Ease.addCompletionName(Ease);



	/*==========================================================================
    Ease for css
	==========================================================================*/

  /**
   * [css description]
   * @type {Object}
   */
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
   * @property css.sineIn
   * @type {String}
   */
  Ease.css.sineIn = 'cubic-bezier(0.47, 0, 0.745, 0.715)';

  /**
   * @property css.sineOut
   * @type {String}
   */
  Ease.css.sineOut = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  /**
   * @property css.sineInOut
   * @type {String}
   */
  Ease.css.sineInOut = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';


  /* 2 Quad
  -----------------------------------------------------------------*/
  /**
   * @property css.quadIn
   * @type {String}
   */
  Ease.css.quadIn = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';

  /**
   * @property css.quadOut
   * @type {String}
   */
  Ease.css.quadOut = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  /**
   * @property css.quadInOut
   * @type {String}
   */
  Ease.css.quadInOut = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';


  /* 3 Cubic
  -----------------------------------------------------------------*/
  /**
   * @property css.cubicIn
   * @type {String}
   */
  Ease.css.cubicIn = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

  /**
   * @property css.cubicOut
   * @type {String}
   */
  Ease.css.cubicOut = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

  /**
   * @property css.cubicInOut
   * @type {String}
   */
  Ease.css.cubicInOut = 'cubic-bezier(0.645, 0.045, 0.355, 1)';


  /* 4 Quart
  -----------------------------------------------------------------*/
  /**
   * @property css.quartIn
   * @type {String}
   */
  Ease.css.quartIn = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

  /**
   * @property css.quartOut
   * @type {String}
   */
  Ease.css.quartOut = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  /**
   * @property css.quartInOut
   * @type {String}
   */
  Ease.css.quartInOut = 'cubic-bezier(0.77, 0, 0.175, 1)';


  /* 5 Quint
  -----------------------------------------------------------------*/
  /**
   * @property css.quintIn
   * @type {String}
   */
  Ease.css.quintIn = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';

  /**
   * @property css.quintOut
   * @type {String}
   */
  Ease.css.quintOut = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /**
   * @property css.quintInOut
   * @type {String}
   */
  Ease.css.quintInOut = 'cubic-bezier(0.86, 0, 0.07, 1)';


  /* 6 Expo
  -----------------------------------------------------------------*/
  /**
   * @property css.expoIn
   * @type {String}
   */
  Ease.css.expoIn = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';

  /**
   * @property css.circOut
   * @type {String}
   */
  Ease.css.circOut = 'cubic-bezier(0.19, 1, 0.22, 1)';

  /**
   * @property css.expoInOut
   * @type {String}
   */
  Ease.css.expoInOut = 'cubic-bezier(1, 0, 0, 1)';


  /* 7 Cric
  -----------------------------------------------------------------*/
  /**
   * @property css.circIn
   * @type {String}
   */
  Ease.css.circIn = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

  /**
   * @property css.circOut
   * @type {String}
   */
  Ease.css.circOut = 'cubic-bezier(0.075, 0.82, 0.165, 1);';

  /**
   * @property css.circInOut
   * @type {String}
   */
  Ease.css.circInOut = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';


  /* 7 Back
  -----------------------------------------------------------------*/
  /**
   * @property css.backIn
   * @type {String}
   */
  Ease.css.backIn = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';

  /**
   * @property css.backOut
   * @type {String}
   */
  Ease.css.backOut = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  /**
   * @property css.backInOut
   * @type {String}
   */
  Ease.css.backInOut = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


  /* Elastic
  -----------------------------------------------------------------*/
  /**
   * @property css.elasticIn
   * @type {String}
   */
  Ease.css.elasticIn = null;

  /**
   * @property css.elasticOut
   * @type {String}
   */
  Ease.css.elasticOut = null;

  /**
   * @property css.elasticInOut
   * @type {String}
   */
  Ease.css.elasticInOut = null;


  /* Bounce
  -----------------------------------------------------------------*/
  /**
   * @property css.bounceIn
   * @type {String}
   */
  Ease.css.bounceIn = null;

  /**
   * @property css.bounceOut
   * @type {String}
   */
  Ease.css.bounceOut = null;

  /**
   * @property css.bounceInOut
   * @type {String}
   */
  Ease.css.bounceInOut = null;


	/* Export: COMPLETION
	-----------------------------------------------------------------*/
	Ease.addCompletionName(Ease.css);



	/*--------------------------------------------------------------------------
		export
	--------------------------------------------------------------------------*/

	AMP.Ease = Ease;



}(window, AMP));
