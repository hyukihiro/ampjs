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
   * @constructor
   * @class AMP.$.UIController
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
  UIController.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'UIController';



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
    $prev.on('click.' + this.className);
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
    this._controller(index, true);
    return this;
  };


  /**
   * <h4>次へ</h4>
   *
   * @method next
   * @return {Instance}
   */
  p.next = function(){
    this._controller(1);
    return this;
  };


  /**
   * <h4>前へ</h4>
   *
   * @method prev
   * @return {Instance}
   */
  p.prev = function(){
    this._controller(-1);
    return this;
  };


  /**
   * <h4>コントローラー</h4>
   * 送られてきた値を制御します
   *
   * @protected
   * @private
   * @method _controller
   * @return {Instance}
   */
  p._controller = function(num, isIndex){};



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.UIController = UIController;


}(window, jQuery));
