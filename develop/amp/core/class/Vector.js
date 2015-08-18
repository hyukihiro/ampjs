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

  /**
   * <h4>Vectorを管理します</h4>
   * <p>DEMO作成予定</p>
   *
   * @class AMP.Vector
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {Number|Object} x座標値もしくは、xyz座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   */
  function Vector(x, y, z){
    /// FIXME: 一旦仮
    this._angleMode = Vector.ANGLE_MODE_RADIANS;
    this.set(x, y, z);
  }

  // 基底クラスを継承
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
  Vector.VERSION = '1.0.3';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Vector';


  /**
   * <h4>π (半円)</h4>
   *
   *
   * @property PI
   * @type {Number}
   */
  Vector.PI = Math.PI;


  /**
   * <h4>π * 2 (円)</h4>
   *
   * @property PI_TWO
   * @type {Number}
   */
  Vector.PI_TWO = Vector.PI * 2;


  /**
   * <h4>π * 2 (1/4円)</h4>
   *
   * @property PI_HARF
   * @type {Number}
   */
  Vector.PI_HARF = Vector.PI / 2;


  /**
   * <h4>アングルモード、ラジアンモードタイプ名</h4>
   *
   * @static
   * @property ANGLE_MODE_RADIANS
   * @type {String}
   */
  Vector.ANGLE_MODE_RADIANS = 'radians';


  /**
   * <h4>アングルモード、角度モードタイプ名</h4>
   *
   * @static
   * @property ANGLE_MODE_DEGREES
   * @type {String}
   */
  Vector.ANGLE_MODE_DEGREES = 'degrees';


  /**
   * <h4>アングルモード</h4>
   *
   * @private
   * @property _angleMode
   * @type {String}
   */
  p._angleMode = 'radians';


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
   * <h4>ラジアンを角度に変換して返す</h4>
   *
   * @static
   * @method radToDeg
   * @param  {Number} rad ラジアン
   * @return {Number}
   */
  Vector.radToDeg = function(rad){
    return 360 * rad / (2 * Vector.PI);
  };


  /**
   * <h4>角度をラジアンに変換して返す</h4>
   *
   * @static
   * @method degToRad
   * @param  {Number} deg 角度
   * @return {Number}
   */
  Vector.degToRad = function(deg){
    return 2 * Vector.PI * deg / 360;
  };


  /**
   * <h4>角度から2Dベクトルを作成</h4>
   *
   * @static
   * @method fromDeg
   * @param  {Number} deg 角度
   * @return {Vector}
   */
  Vector.fromDeg = function(deg){
    var radians = Vector.degToRad(deg);
    return Vector.get(Math.cos(radians), Math.sin(radians), 0);
  };


  /**
   * <h4>ランダムな2Dベクトルを作成</h4>
   *
   * @static
   * @method random2D
   * @return {Vector}
   */
  Vector.random2D = function(){
    return Vector.fromAngle(AMP.random(360));
  };


  /**
   * <h4>ランダムな3Dベクトルを作成</h4>
   *
   * @static
   * @method random3D
   * @return {Vector}
   */
  Vector.random3D = function(){
    var deg = AMP.random(0, Vector.PI_TWO),
    z = AMP.random(-1, 1),
    x = Math.sqrt(1 - z * z) * Math.cos(deg),
    y = Math.sqrt(1 - z * z) * Math.sin(deg);
    return Vector.get(x, y, z);
  };


  /**
   * <h4>2つのベクターデータの中間角度を返す</h4>
   *
   * @method degBetween
   * @param  {Vector} vector1 Vectorインスタンス
   * @param  {Vector} vector2 Vectorインスタンス
   * @return {Number}
   */
  Vector.degBetween = function(vector1, vector2){
    var radians = Math.acos(vector1.dot(vector2) / (vector1.mag() * vector2.mag()));
    return Vector.radToDeg(radians);
  };


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
   * <h4>Vectorのcopyを生成します</h4>
   *
   * @method copy
   * @return {Vector}
   */
  p.copy = function(){
    return new Vector(this);
  };


  /**
   * <h4>アングルモードの設定</h4>
   *
   * @method setAngleMode
   * @param {String} type アングルモード名（radians or degrees）
   * @return {Vector}
   */
  p.setAngleMode = function(type){
    if(type === Vector.ANGLE_MODE_RADIANS){
      this._angleMode = Vector.ANGLE_MODE_RADIANS;
    } else if(type === Vector.ANGLE_MODE_DEGREES){
      this._angleMode = Vector.ANGLE_MODE_DEGREES;
    }
    return this;
  };


  /**
   * <h4>アングルモードの取得</h4>
   *
   * @method getAngleMode
   * @return {String} アングルモードを返す（radians or degrees）
   */
  p.getAngleMode = function(){
    return this._angleMode;
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
    var coord = this._createCoord(x, y, z);
    this.x = coord.x;
    this.y = coord.y;
    this.z = coord.z;
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
    var coord = this._createCoord(x, y, z);
    this.x += coord.x;
    this.y += coord.y;
    this.z += coord.z;
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
    var coord = this._createCoord(x, y, z);
    this.x -= coord.x;
    this.y -= coord.y;
    this.z -= coord.z;
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
   * <h4>ベクトルの大きさを返す</h4>
   *
   * @method mag
   * @param {Number} num ベクトルの大きさ
   * @return {Vector}
   */
  p.mag = function(){
    return Math.sqrt(this.magSqrt());
  };


  /**
   * <h4>ベクトル累乗積を返す</h4>
   *
   * @method magSqrt
   * @return {Number}
   */
  p.magSqrt = function(){
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
  };


  /**
   * <h4>ベクトルのドット積</h4>
   *
   * @method dot
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.dot = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    return this.x * coord.x + this.y * coord.y + this.z * coord.z;
  };


  /**
   * <h4>2つのベクトルのクロス積(3D)</h4>
   *
   * @method cross
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.cross = function(x, y, z){
    var coord = this._createCoord(x, y, z),
    _x = this.y * coord.z - this.z * coord.y,
    _y = this.z * coord.x - this.x * coord.z,
    _z = this.x * coord.y - this.y * coord.x;
    return new Vector(_x, _y, _z);
  };


  /**
   * <h4>2つのベクトル間のユーグリッド距離</h4>
   *
   * @method cross
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Number}
   */
  p.dist = function(x, y, z){
    return new Vector(x, y, z).sub(this).mag();
  };


  /**
   * <h4>ベクトルの正規化</h4>
   *
   * @method normalize
   * @return {Vector}
   */
  p.normalize = function(){
    var mag = this.mag();
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
    var magSqrt = this.magSqrt();
    if(max * max < magSqrt) {
      this.div(Math.sqrt(magSqrt));
      this.mult(max);
    }
    return this;
  };


  /**
   * <h4>ベクトルの大きさを設定</h4>
   *
   * @method setMag
   * @param {Number} num 乗数
   * @return {Vector}
   */
  p.setMag = function(num){
    this.normalize().mult(num);
    return this;
  };


  /**
   * <h4>角度で表される2Dベクトルの方向</h4>
   *
   * @method heading
   * @return {Number}
   */
  p.heading = function(){
    var h = Math.atan2(this.y, this.x);
    if(this._angleMode === Vector.RADIANS){
      return h;
    } else {
      return Vector.radToDeg(h);
    }
  };


  /**
   * <h4>指定した角度へ2Dベクトル回転</h4>
   *
   * @method rotate
   * @param  {Number} deg 回転する度数
   * @return {Vector}
   */
  p.rotate = function(deg) {
    if(this._angleMode === Vector.ANGLE_MODE_DEGREES) {
      deg = Vector.degToRad(deg);
    }

    var heading = this.heading() + deg,
    mag = this.mag();

    this.x = Math.cos(heading) * mag;
    this.y = Math.sin(heading) * mag;
    return this;
  };


  /**
   * <h4>別のベクトルに対する線形補間</h4>
   *
   * @method lerp
   * @param {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param {Number} y y座標値
   * @param {Number} z z座標値
   * @param {Number} amount 量
   *
   * @return {Vector}
   */
  p.lerp = function(x, y, z, amount){
    if(!AMP.isNumber(x)){
      var coord = this._createCoord(x);
      amount = y;
      x = coord.x;
      y = coord.y;
      z = coord.z;
    }

    this.x += (x - this.x) * amount || 0;
    this.y += (y - this.y) * amount || 0;
    this.z += (z - this.z) * amount || 0;
    return this;
  };


  /**
   * <h4>座標を配列にして返す</h4>
   *
   * @method toArray
   * @return {Array}
   */
  p.toArray = function(){
    return [this.x, this.y, this.z];
  };


  /**
   * <h4>座標オブジェクトを返します</h4>
   *
   * @method toJSON
   * @return {Object}
   */
  p.toJSON = function(){
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  };


  /**
   * <h4>座標が等しいか判定します</h4>
   *
   * @method isEquals
   * @param  {Number|Object|Array} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Boolean}
   */
  p.isEquals = function(x, y, z){
    var coord = this._createCoord(x, y, z);
    return this.x === coord.x && this.y === coord.y && this.z === coord.z;
  };


  /**
   * <h4>座標オブジェクトを生成</h4>
   *
   * @private
   * @method _createCoord
   * @param  {Number|Object} x x座標値もしくは、座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   * @return {Object}   x,y,z座標を格納したオブジェクト
   */
  p._createCoord = function(x, y, z){
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


}(window, AMP));
