var AMP = AMP || {};

(function(root, $){

  // 'use strict';

  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>勝訴のアクティブ化</h4>
   *
   * @class Active
   * @constructor
   */
  function Active($target, activeClass){
    this.$target = $target;
    if(AMP.isString(activeClass)){
      this.activeClass = activeClass;
    }
  }

  // 基底クラスを継承
  AMP.inherits(Active, AMP.BASE_CLASS);

  // prototype
  var p = Active.prototype;



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
  Active.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Active';


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>アクティブ要素に付与するクラス名</h4>
   *
   * @property activeClass
   * @type {String}
   */
  p.activeClass = 'active';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Activeインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {String} className クラス名
   * @return {Active}
   */
  Active.get = function($target, className){
    var instance = new Active($target, className);
    instance.active();
    return instance;
  };


  /**
   * <h4>要素のアクティブ化</h4>
   *
   * @method active
   * @param {Object} rolloverOptions ロールオーバーオプション
   * @return {Active}
   */
  p.active = function(rolloverOptions){
    var self = this;

    self.$target.each(function(i){
      var isImg = self.$target[i].nodeName === 'IMG';

      self.$target.eq(i).addClass(self.activeClass);

      if(isImg){
        AMP.rollover(self.$target.eq(i), rolloverOptions);
      }
    });

    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Active = Active;
  AMP.active = Active.get;



}(window, jQuery));
