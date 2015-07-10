var AMP = AMP || {};


(function(root){


  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Vectorを管理します</h4>
   *
   * @class AMP.Vector
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {Number|Object} x座標値もしくは、xyz座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   */
  function Vector(x, y, z){
    this.set(x, y, z);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Vector, AMP.BASE_CLASS);

  // prototype
  var p = Vector.prototype;



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
  Vector.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Vector';


  /**
   * <h4>X座標</h4>
   *
   * @property x
   * @type {Number}
   */
  p.x = 0;


  /**
   * <h4>Y座標</h4>
   *
   * @property y
   * @type {Number}
   */
  p.y = 0;


  /**
   * <h4>Z座標</h4>
   *
   * @property z
   * @type {Number}
   */
  p.z = 0;


  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Vectorインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {Number|Object} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  Vector.get = function(x, y, z){
    return new Vector(x, y, z);
  };


  /**
   * <h4>Vectorのクローンを生成します</h4>
   *
   * @method clone
   * @return {Vector}
   */
  p.clone = function(){
    return new Vector(this);
  };


  /**
   * <h4>座標のセット</h4>
   *
   * @method set
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.set = function(x, y, z){
    var offset = this._createOffset(x, y, z);
    this.x = offset.x;
    this.y = offset.y;
    this.z = offset.z;
    return this;
  };


  /**
   * <h4>ベクトルの大きさの取得</h4>
   *
   * @method getMag
   * @return {Number} ベクトルの大きさを返す
   */
  p.getMag = function(){
    return Math.sqrt(this.getMagSqrt());
  };


  /**
   * <h4>座標3点の累乗積</h4>
   *
   * @method getMagSqrt
   * @return {Number}
   */
  p.getMagSqrt = function(){
    return this.x * this.x + this.y * this.y + this.z * this.z;
  };


  /**
   * <h4>座標の加算</h4>
   *
   * @method add
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.add = function(x, y, z){
    var offset = this._createOffset(x, y, z);
    this.x += offset.x;
    this.y += offset.y;
    this.z += offset.z;
    return this;
  };


  /**
   * <h4>座標の減算</h4>
   *
   * @method sub
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Vector}
   */
  p.sub = function(x, y, z){
    var offset = this._createOffset(x, y, z);
    this.x -= offset.x;
    this.y -= offset.y;
    this.z -= offset.z;
    return this;
  };


  /**
   * <h4>座標の乗算</h4>
   *
   * @method mult
   * @param  {Number} num 乗数
   * @return {Vector}
   */
  p.mult = function(num){
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  };


  /**
   * <h4>座標の除算</h4>
   *
   * @method div
   * @param  {Number} num 除数
   * @return {Vector}
   */
  p.div = function(num){
    this.x /= num;
    this.y /= num;
    this.z /= num;
    return this;
  };


  /**
   * <h4>ベクトルの正規化</h4>
   *
   * @method normalize
   * @return {Vector}
   */
  p.normalize = function(){
    var mag = this.getMag2D();
    if(mag !== 0){
      this.div(mag);
    }
    return this;
  };


  /**
   * <h4>限界値の制限</h4>
   *
   * @method limit
   * @param  {Number} max 限界値
   * @return {Vector}
   */
  p.limit = function(max){
    var magSqrt = this.getMagSqrt();
    if(max * max < magSqrt) {
      this.div(Math.sqrt(magSqrt));
      this.mult(max);
    }
    return this;
  };


  /**
   * <h4>ベクトルの大きさの設定</h4>
   *
   * @method mag
   * @param {Number} num ベクトルの大きさ
   * @return {Vector}
   */
  p.mag = function(num){
    this.normalize().mult(num);
    return this;
  };


  /*
  p.heading = function(){};
  p.rotate = function(){};
  p.lerp = function(){};
  p.dist = function(){};
  p.angleBetween = function(){};
  p.dot = function(){};
  p.cross = function(){};
  p.random2D = function(){};
  p.random3D = function(){};
  */


  /**
   * <h4>座標オブジェクトを生成</h4>
   *
   * @private
   * @method _createOffset
   * @param  {Number|Object} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Object}   x,y,z座標を格納したオブジェクト
   */
  p._createOffset = function(x, y, z){
    if(AMP.isObject(x)){
      return x;
    } else if(AMP.isArray(x)){
      return {
        x: x[0] || 0,
        y: x[1] || 0,
        z: x[2] || 0
      };
    } else {
      return {
        x: x || 0,
        y: y || 0,
        z: z || 0
      };
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Vector = Vector;



}(window));
