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
   * [ImageLoad description]
   * @param {createjs.Container} container [description]
   */
	function ImageLoad(image, width, height){

    /**
     * [image description]
     * @type {Image}
     */
    this.image = new Image();

    // size
    if(AMP.isNumber(width)){
      this.image.width = width;
    }
    if(AMP.isNumber(height)){
      this.image.height = height;
    }

    /**
     * [src description]
     * @type {[type]}
     */
    this.src = image.src ? image.src : image;

    /**
     * [state description]
     * @type {[type]}
     */
    this.state = ImageLoad.STATE_STANDBY;

    /**
     * [_callbacks description]
     * @type {Object}
     */
    this._callbacks = {};
    this._callbacks.progress = [];
    this._callbacks.dones = [];
    this._callbacks.fails = [];
    this._callbacks.always = [];
	}

  // 基底クラスを継承
  AMP.inherits(ImageLoad, AMP.BASE_CLASS);

  // prototype
  var p = ImageLoad.prototype;


  ImageLoad.STATE_STANDBY = 'satanbay';
  ImageLoad.STATE_PROGRESS = 'progress';
  ImageLoad.STATE_ERROR = 'error';
  ImageLoad.STATE_LOADED = 'loaded';




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
  ImageLoad.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'ImageLoad';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  p.load = function(callback){
    var self = this;

    if(this.state !== ImageLoad.STATE_STANDBY){
      return this;
    }

    this.state = ImageLoad.STATE_PROGRESS;

    callback();

    AMP.addEvent(this.image, 'load', function(){
      this.state = ImageLoad.STATE_LOADED;
      self._removeEvent();
      self._calls(this._callbacks.dones);
      self._calls(this._callbacks.always);
    });

    AMP.addEvent(this.image, 'error', function(){
      this.state = ImageLoad.STATE_ERROR;
      self._removeEvent();
      self._calls(this._callbacks.fails);
      self._calls(this._callbacks.always);
    });

    this.image.src = this.src;

    self._progressLoop();

    return this;
  };



  p._progressLoop = function(){
    var self = this;

    AMP.requestAnimationFrame(function(){
      if(!self.image.complete && self.state === ImageLoad.STATE_PROGRESS){
        self._calls(this._callbacks.progress);
        self._progressLoop();
      }
    });
  };


  p._calls = function(callbacks){
    if(AMP.isArrary(callbacks)){
      AMP.each(callbacks, function(fn){
        if(AMP.isFunction(fn)){
          fn();
        }
      });
    }
  };


  p._removeEvent = function(){
    AMP.removeEvent(this.image, 'load');
    AMP.removeEvent(this.image, 'error');

    AMP.each(this._callbacks, function(callback){
      callback = null;
    });
  };


  p.progress = function(callback){
    this._callbacks.progress.push(callback);
  };


  p.done = function(callback){
    this._callbacks.dones.push(callback);
  };


  p.fail = function(callback){
    this._callbacks.fails.push(callback);
  };


  p.always = function(callback){
    this._callbacks.always.push(callback);
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.ImageLoad = ImageLoad;



}(window, AMP));
