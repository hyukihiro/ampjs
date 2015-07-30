/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


var AMP = AMP || {};


(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>UIコントローラ</h4>
   * このクラスを継承する事でUIコントローラを提供します
   *
   * @protected
   * @class AMP.$.UIController
   * @extends AMP.BASE_CLASS
   * @constructor
   */
  function UIController(){}

  // 基底クラスを継承
  AMP.inherits(UIController, AMP.BASE_CLASS);

  // prototype
  var p = UIController.prototype;



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
  UIController.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'UIController';


  /**
   * <h4>パラメーター</h4>
   *
   * @property param
   * @type {Object}
   */
  /**
   * <h4>現在値</h4>
   *
   * @property param.current
   * @type {Number}
   */
  p.param = {
    current: 0
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Pagerボタンイベント登録</h4>
   *
   * @method addEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.addEventPager = function($pager){
    var self = this;
    $pager.on('click.' + self.className, function(){
      self.moveTo($pager.index(this));
      return false;
    });
    return this;
  };


  /**
   * <h4>Pagerボタンイベント削除</h4>
   *
   * @method removeEventPager
   * @param {jQuery} $pager Pagerトリガー要素
   * @return {Instance}
   */
  p.removeEventPager = function($pager){
    $pager.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Nextボタンイベント登録</h4>
   *
   * @method addEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.addEventNext = function($next){
    var self = this;
    $next.on('click.' + self.className, function(){
      self.next();
      return false;
    });
    return this;
  };


  /**
   * <h4>Nextボタンイベント削除</h4>
   *
   * @method removeEventNext
   * @param {jQuery} $next Nextリガー要素
   * @return {Instance}
   */
  p.removeEventNext = function($next){
    $next.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>Prevボタンイベント登録</h4>
   *
   * @method addEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.addEventPrev = function($prev){
    var self = this;
    $prev.on('click.' + self.className, function(){
      self.prev();
      return false;
    });
    return this;
  };


  /**
   * <h4>Prevボタンイベント削除</h4>
   *
   * @method removeEventPrev
   * @param {jQuery} $prev Prevトリガー要素
   * @return {Instance}
   */
  p.removeEventPrev = function($prev){
    $prev.off('click.' + this.className);
    return this;
  };


  /**
   * <h4>フリックイベント</h4>
   *
   * @method addEventFlick
   * @return {Slider}
   */
  p.addEventFlick = function($trigger){
    var self = this;

    $trigger.off('flickmoveX.Slider flickcancelX.Slider flickX.Slider')
    .on('flickmoveX.' + this.className, function(moveEvent){
      self._move(moveEvent.moveX);
    })
    .on('flickcancelX.' + this.className, function(){
      self._resetTween();
    })
    .on('flickX.' + this.className, function(flickEvent){
      if(0 < flickEvent.moveX){
        self.prev();
      } else {
        self.next();
      }
    });
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   * アニメート無
   *
   * @method current
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.current = function(index){
    this._controller(index, true);
    return this;
  };


  /**
   * <h4>指定インデックスへ</h4>
   *
   * @method moveTo
   * @param {jQuery} index index番号
   * @return {Instance}
   */
  p.moveTo = function(index){
    this._controller(index);
    return this;
  };


  /**
   * <h4>次へ</h4>
   *
   * @method next
   * @return {Instance}
   */
  p.next = function(){
    this._controller(this.param.current + 1);
    return this;
  };


  /**
   * <h4>前へ</h4>
   *
   * @method prev
   * @return {Instance}
   */
  p.prev = function(){
    this._controller(this.param.current -1);
    return this;
  };


  /**
   * <h4>コントローラー</h4>
   * 送られてきた値を制御します
   *
   * @protected
   * @private
   * @method _controller
   * @param {Number} index スライドインデック
   * @param {Boolean} noAnimate アニメート無
   * @return {Instance}
   */
  p._controller = function(index, noAnimate){};



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.UIController = UIController;


}(window, jQuery));
