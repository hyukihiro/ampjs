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
   * <h4>MotionPathを管理します</h4>
   * <p>DEMO作成予定</p>
   *
   * @class AMP.MotionPath
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {Number|Object} x座標値もしくは、xyz座標オブジェクト
   * @param  {Number} y y座標値
   * @param  {Number} z z座標値
   */
  function MotionPath(mover){}

  // 基底クラスを継承
  AMP.inherits(MotionPath, AMP.BASE_CLASS);

  // prototype
  var p = MotionPath.prototype;



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
  MotionPath.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'MotionPath';



  MotionPath.spiral = function(x, y, progress, options){
  }

  p.spiral = function(progress, options){
    return MotionPath.spiral(this.x, this.y, progress, options);
  };







  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.MotionPath = MotionPath;


}(window, AMP));
