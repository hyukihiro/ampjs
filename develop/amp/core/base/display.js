var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    表示
  ======================================================================*/

  /**
   * <h4>表示</h4>
   *
   * @class AMP.Display
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>RAD</h4>
   *
   * @static
   * @property RAD
   * @type {Number}
   */
  AMP.RAD = Math.PI / 180;


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


  /**
   * <h4>現在と過去の位置から角度を算出</h4>
   *
   * @static
   * @method deg
   * @param  {Number} x     現在のx座標
   * @param  {Number} y     現在のy座標
   * @param  {Number} prevX 前のx座標
   * @param  {Number} PrevY 前のx座標
   * @return {Number}
   */
  AMP.deg = function(x, y, prevX, PrevY){
    return Math.atan2(PrevY - y, prevX - x) * 180 / Math.PI;
  };


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
