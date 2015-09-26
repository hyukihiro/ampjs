/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    数式
  ======================================================================*/

  /**
   * <h4>数式</h4>
   *
   * @class Math
   */


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
  AMP.PI = Math.PI;


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
   * <h4>ラジアンからに角度変換する積数</h4>
   *
   * @static
   * @property RAD_TO_DEG
   * @type {Number}
   */
  AMP.RAD_TO_DEG = 180 / AMP.PI;


  /**
   * <h4>角度からラジアンに変換する積数</h4>
   *
   * @static
   * @property DEG_TO_RAD
   * @type {Number}
   */
  AMP.DEG_TO_RAD = AMP.PI / 180;



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/
  /// Degree
  /// Radian
  /// Coord
  /// Arc
  /// Other

  /* Degree
  -----------------------------------------------------------------*/
  /**
   * <h4>角度と半径からx,y座標を求める</h4>
   *
   * @static
   * @method degTo2d
   * @param  {Number} deg    角度
   * @param  {Number} radius 半径
   * @return {Object} x,y座標
   */
  AMP.degTo2d = function(deg, radius){
    return {
      x: Math.cos(AMP.degToRad(deg)) * radius,
      y: Math.sin(AMP.degToRad(deg)) * radius
    };
  };


  /**
   * <h4>角度からラジアンを求める</h4>
   *
   * @static
   * @method degToRad
   * @param  {Number} deg 角度
   * @return {Number} ラジアン
   */
  AMP.degToRad = function(deg){
    return deg * AMP.DEG_TO_RAD;
  };


  /**
   * <h4>角度と半径から円弧を求める</h4>
   *
   * @static
   * @method degToArc
   * @param  {Number} deg    角度
   * @param  {Number} radius 半径
   * @return {Number} 円弧
   */
  AMP.degToArc = function(deg, radius){
    return AMP.degToRad(deg) * radius;
  };


  /* Radian
  -----------------------------------------------------------------*/
  /**
   * <h4>ラジアンと半径からx,y座標を求める</h4>
   *
   * @static
   * @method radTo2d
   * @param  {Number} rad    ラジアン
   * @param  {Number} radius 半径
   * @return {Object} x,y座標
   */
  AMP.radTo2d = function(rad, radius){
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    };
  };


  /**
   * <h4>ラジアンから角度を求める</h4>
   *
   * @static
   * @method radToDeg
   * @param  {Number} rad ラジアン
   * @return {Number} 角度
   */
  AMP.radToDeg = function(rad){
    return rad / AMP.RAD_TO_DEG;
  };


  /**
   * <h4>ラジアンと半径から円弧を求める</h4>
   *
   * @static
   * @method degToArc
   * @param  {Number} rad    ラジアン
   * @param  {Number} radius 半径
   * @return {Number} 円弧
   */
  AMP.radToArc = function(rad, radius){
    return rad * radius;
  };


  /* Coord
  -----------------------------------------------------------------*/
  /**
   * <h4>座標からラジアンを求める</h4>
   *
   * @static
   * @method coordToRad
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   * @return {Number}   ラジアン
   */
  AMP.coordToRad = function(x, y){
    return Math.atan(y, x);
  };


  /**
   * <h4>座標から角度を求める</h4>
   *
   * @static
   * @method coordToDeg
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   * @return {Number}   角度
   */
  AMP.coordToDeg = function(x, y){
    return Math.atan2(y, x) * AMP.RAD_TO_DEG;
  };


  AMP.coordToArc = function(x, y){
  };


  /* Arc
  -----------------------------------------------------------------*/
// 円弧からラジアンを求める

  AMP.arcToRad = function(arc, radius){
    return arc / radius;
  };


  AMP.arcToDeg = function(arc, radius){
    return arc / radius * radius;
  };


  AMP.arcTo2d = function(arc, radius){
  };





  /* Other
  -----------------------------------------------------------------*/

  /**
   * <h4>対角線の長さを求める</h4>
   *
   * @static
   * @method distance
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   * @return {Number} 対角線の長さ
   */
  AMP.distance = function(x, y){
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  };



}(window, AMP));
