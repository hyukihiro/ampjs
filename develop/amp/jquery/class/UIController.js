/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>UIコントローラ</h4>
   * <p>UIコントローラクラスを継承する事でUIコントローラを提供します</p>
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
  UIController.VERSION = '1.2.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'UIController';


  /**
   * <h4>プロパティオブジェクト</h4>
   *
   * @property props
   * @type {Object}
   */
  /**
   * <h4>現在値</h4>
   *
   * @property props.current
   * @type {Number}
   */
  p.props = {
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
   * @return {Instance}
   */
  p.addEventFlick = function($trigger){
    var self = this;

    $trigger.off('flickmoveX.' + this.className + ' flickcancelX.' + this.className + ' flickX.' + this.className)
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
    this._controller(this.props.current + 1);
    return this;
  };


  /**
   * <h4>前へ</h4>
   *
   * @method prev
   * @return {Instance}
   */
  p.prev = function(){
    this._controller(this.props.current -1);
    return this;
  };


  /**
   * <h4>コントローラー</h4>
   * 送られてきた値を制御します
   *
   * @interface
   * @protected
   * @private
   * @method _controller
   * @param {Number} index スライドインデック
   * @param {Boolean} nonAnimate アニメーション無
   * @return {Void}
   */
  p._controller = function(index, nonAnimate){};


  /**
   * <h4>フリックキャンセル時呼び出されます</h4>
   *
   * @interface
   * @protected
   * @private
   * @method _resetTween
   * @return {Void}
   */
  p._resetTween = function(){};


   /**
   * <h4>フリック中呼び出します</h4>
   *
   * @interface
   * @protected
   * @private
   * @method _move
   * @param {Number} x フリック中の移動距離
   * @return {Void}
   */
  p._move = function(x){};



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.UIController = UIController;


}(window, AMP, jQuery));
