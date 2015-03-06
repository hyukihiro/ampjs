;(function($, Typy){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>アコーディオン</h4>
   *
   * @class Typy.Accordion
   * @constructor Accordion
   * @param  {jQuery} アコーディオントリガー要素
   * @param  {Object} options オプション値 [defaults property参照]
   * @return {Instance}
   */
  var Accordion = function($trigger, options){
    this.$trigger = $trigger;
    this.param = $.extend({}, Accordion.defaults, options);
    this.state = {};
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property version
   * @type {String}
   */
  Accordion.version = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Accordion.p = Accordion.prototype;


  /**
   * <h4>トリガー要素</h4>
   *
   * @property $trigger
   * @type {jQuery}
   */
  Accordion.p.$trigger = null;


  /**
   * <h4>デフォルト値</h4>
   * <p>コンストラクタが呼び出す際に、第二引数にoptionsを指定するとparamオブジェクトにmixinします</p>
   *
   * @static
   * @property defaults
   * @type {Object}
   */
	Accordion.defaults = {
		duration: 400,
		ease    : 'easeOutExpo',
		scroll  : false,
		isOpen  : false,
		naviType: 'rollover' // rover, toggle, alpha, text
	};


  /**
   * <h4>option値格納オブジェクト</h4>
   * <p>コンストラクタが呼び出されたら、defaultsと第二引数で設定したoptions値をmixinして格納します</p>
   *
   * @property param
   * @type {Object}
   */
  Accordion.p.param = null;


  /**
   * <h4>Open時のクラス</h4>
   *
   * @property openClass
   * @type {String}
   */
	Accordion.p.openClass = 'accordion-open';


  /**
   * <h4>Close時のクラス</h4>
   *
   * @property closeClass
   * @type {String}
   */
	Accordion.p.closeClass = 'accordion-close';


	/**
   * <h4>状態を管理するオブジェクト</h4>
   * $triger href値（ハッシュ削除）をキーにした連想配列で管理
   *
   * @example
   * state = {
   *    key: {
   *      height: {Number},
   *      isOpen: {Boolean}
   *    }
   * }
	 * @property state
	 * @type {Object}
	 */
  Accordion.p.state = null;





  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  Accordion.p.init = function(){
    var self = this,
    id, $target;

    self.$trigger.each(function(){
      id = $(this).attr('href');
      $target = $(id);

      if($target[0]){
        self.state[id.replace(/#/, '')] = {
          height: $target.css({display: 'block'}).height(),
          isOpen: self.param.isOpen
        };

        if(!self.param.isOpen){
          $target.css({display: 'none'});
        }
      }
    });

    this.setEvent(this.$trigger);
  };



  /**
   * [state description]
   * @type {[type]}
   */
  Accordion.p.setEvent = function($trigger){
    var self = this;

    $trigger.on('click.accordion', function(){
      self.controller($(this).attr('href'));
      return false;
    });
  };



  Accordion.p.controller = function(id){
    var self = this,
    $target = $(id);
    self.state[id.replace(/#/, '')];
  };



  Accordion.p.open = function($target, ){
  };

  Accordion.p.close = function(){
  };


  Accordion.p.scroll = function(){
  };







	/*----------------------------------------------------------------------
		@shorthand
	----------------------------------------------------------------------*/
  var accordion = function(){
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/
	Typy.Accordion = Accordion;
	Typy.accordion = accordion;




}(jQuery, this.Typy = this.Typy || {}));
