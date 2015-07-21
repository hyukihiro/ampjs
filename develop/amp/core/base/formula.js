var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    公式
  ======================================================================*/

  /**
   * <h4>公式</h4>
   *
   * @class AMP.Formula
   */


  /*----------------------------------------------------------------------
    config
  ----------------------------------------------------------------------*/

  var PI = Math.PI;



	/*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

	/**
	 * <h4>π (半円)</h4>
	 *
	 * @static
	 * @property PI
	 * @type {Number}
	 */
	AMP.PI = PI;


	/**
	 * <h4>π * 2 (円)</h4>
	 *
	 * @static
	 * @property PI_TWO
	 * @type {Number}
	 */
	AMP.PI_TWO = AMP.PI * 2;


	/**
	 * <h4>π * 2 (1/4円)</h4>
	 *
	 * @static
	 * @property PI_HARF
	 * @type {Number}
	 */
	AMP.PI_HARF = AMP.PI / 2;


  /**
   * <h4>ラジアン</h4>
   *
   * @static
   * @property RAD
   * @type {Number}
   */
  AMP.RAD = 180 / Math.PI;



	/*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/**
	 * <h4>角度からラジアンを取得</h4>
	 *
	 * @static
	 * @method degToRad
	 * @param  {Number} deg 角度
	 * @return {Number}
	 */
	AMP.degToRad = function(deg){
    return AMP.PI_TWO * (deg / 360);
	};


	/**
	 * <h4>角度の取得</h4>
	 *
	 * @static
	 * @method coordToDeg
	 * @param  {Number|Object} x座標値 x,y座標を格納したオブジェクト
	 * @param  {Number} y y座標値
	 * @return {Number} 角度を返す
	 */
  AMP.coordToDeg = function(x, y){
    if(AMP.isObject(x)){
      y = x.y;
      x = x.x;
    }
    return Math.atan2(y, x) * AMP.RAD;
  };








/* 以下β
-----------------------------------------------------------------*/




  /**
   * <h4>角度、距離からxy座標を返す </h4>
   *
   * @static
   * @method coords
   * @param  {Number} deg    角度
   * @param  {Number} distanceX 距離
   * @param  {Number} distanceY 距離
   * @return {Object}
   */
  AMP.coords = function(deg, distanceX, distanceY){
    return {
      x: AMP.coordX(deg, distanceX),
      y: AMP.coordY(deg, distanceY)
    };
  };


  /**
   * <h4>角度、距離からx座標を算出</h4>
   *
   * @static
   * @method coordX
   * @param  {Number} deg   角度
   * @param  {Number} distanceX 距離
   * @return {Number}
   */
  AMP.coordX = function(deg, distanceX){
    return Math.cos(deg * AMP.RAD) * distanceX;
  };


  /**
   * <h4>角度、距離からy座標を算出</h4>
   *
   * @static
   * @method coordY
   * @param  {Number} deg   角度
   * @param  {Number} distanceY 距離
   * @return {Number}
   */
  AMP.coordY = function(deg, distanceY){
    return Mas.sin(deg * AMP.RAD) * distanceY;
  };



	/*--------------------------------------------------------------------------
		Color
	--------------------------------------------------------------------------*/

  /**
   * <h4>16進数カラーをRGBに変換します</h4>
   *
   * @static
   * @method hexToRGB
   * @param {String} hex 16進数カラー
   * @return {Object} RGB Object
   */
  AMP.hexToRGB = function(hex){
    hex = hex.replace(/^#/, '');

    // hex shorthand時、成型しなおす
    if(hex.length === 3){
      var _hex = '';
      AMP.each(hex, function(chara){
        _hex += chara + chara;
      });
      hex = _hex;
    }

    // hex値の簡易チェック
    if (hex.length !== 6) {
      throw new TypeError('arguments is not a HEX');
    }

    // RGB Object
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  };


  /**
   * <h4>RGBカラーを16進数カラーに変換</h4>
   *
   * @static
   * @method rgbToHex
   * @param  {Number} r レッド値
   * @param  {Number} g グリーン値
   * @param  {Number} b ブルー値
   * @return {String} 16進数カラー
   */
  AMP.rgbToHex = function(r, g, b){
    var hex = '#';

    AMP.each(AMP.argsToArray(arguments), function(color){
      var _color = Number(color).toString(16);

      // RGB値チェック
      if(2 < _color.length){
        throw new TypeError('arguments is not a RGB');
      }

      hex += _color.length === 1 ? '0' + _color : _color;
    });

    return hex;
  };

}(window));
