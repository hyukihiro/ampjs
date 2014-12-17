;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ページトップのtoggle処理</h4>
   *
   * @class PagetopToggle
   * @constructor
   * @param  {jQuery} $target pagetop要素
   * @param  {Object} options オプション値
   * @return {PagetopToggle}
   */
  var PagetopToggle = function($target, options){
    this.$target = $target;
    if($target.css('display') === 'none'){
      $target.css({display: 'block', visibility: 'hidden'});
    }
    this.isShow = $target.css('visibility') === 'visible';
    this.isFixed = $target.css('position') === 'fixed';
    this.param = $.extend(true, {}, PagetopToggle.defaults, options);
  };



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
  PagetopToggle.VERSION = '1.4';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  PagetopToggle.p = PagetopToggle.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  PagetopToggle.p._isInit = false;


  /**
   * <h4>window要素</h4>
   *
   * @property $window
   * @type {jQuery}
   */
  PagetopToggle.p.$window = $(root);


  /**
   * <h4>pagetop要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  PagetopToggle.p.$target = null;


  /**
   * <h4>表示されているか?</h4>
   *
   * @property isShow
   * @type {Boolean}
   */
  PagetopToggle.p.isShow = null;


  /**
   * <h4>Fixedポジションか?</h4>
   *
   * @property isFixed
   * @type {Boolean}
   */
  PagetopToggle.p.isFixed = null;


  /**
   * <h4>オプション値</h4>
   * defaults: { <ul><li>
   *   showY    : 300, // {Number} 表示されるoffsetY値 </li><li>
   *   absoluteY: null, // {Number} ポジションabsoluteに切り替えるoffsetY値 </li><li>
   *   show     : { opacity : 1}, // {Object} 表示アニメーション時のcssプロパティ </li><li>
   *   hide     : { opacity : 0}, // {Object} 非表示アニメーション時のcssプロパティ </li><li>
   *   absolute : { position : 'absolute'}, // {Object} ポジションabsoluteのcssプロパティ </li><li>
   *   animate  : { // {Object} 表示・非表示のアニメートプロパティ <ul><li>
   *     duration : 400, </li><li>
   *     easing   : 'easeOutCubic', </li><li>
   *     complete : $.noop </li></ul>
   *    } </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  PagetopToggle.defaults = {
    showY    : 300,
    absoluteY: null,
    show     : { opacity : 1},
    hide     : { opacity : 0},
    absolute : { position: 'absolute'},
    animate  : {
      duration: 400,
      easing  : 'easeOutCubic',
      complete: $.noop
    }
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsとoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  PagetopToggle.p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * amp._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {PagetopToggle}
   */
   PagetopToggle.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {PagetopToggle}
   */
  PagetopToggle.p.init = function(){
    if(!this._isInit){
      this._isInit = true;
      this.toggle();
      this.setEvent();
    }
    return this;
  };


  /**
   * <h4>イベント設定</h4>
   *
   * @method setEvent
   * @return {PagetopToggle}
   */
  PagetopToggle.p.setEvent = function(){
    var self = this;
    self.$window.on('scroll.PagetopToggle', function(){
      self.toggle();
    });
    return this;
  };


  /**
   * <h4>要素の表示・非表示、ポジションモードの切り替え</h4>
   *
   * @method toggle
   * @return {PagetopToggle}
   */
  PagetopToggle.p.toggle = function(){
    var self = this,
    param = self.param,
    offsetY = self.$window.scrollTop();

    // 表示・非表示
    if(!self.isShow && param.showY < offsetY){
      self.isShow = true;
      self.$target.css({visibility: 'visible'}).css(param.hide)
      .stop(true, false).animate(param.show, param.animate);

    } else if(self.isShow && param.showY > offsetY){
      self.isShow = false;
      self.$target.stop(true, false).animate(param.hide, param.animate, function(){
        self.$target.css({visibility: 'hidden'});
      });
    }

    // fixed・absolute
    if(param.absoluteY){
      if(!self.isFixed && offsetY < param.absoluteY){
        self.isFixed = true;
        self.$target.css({position: 'fixed'});

      } else if(self.isFixed && offsetY > param.absoluteY){
        self.isFixed = false;
        self.$target.css(param.absolute);
      }
    }

    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String}
   */
  PagetopToggle.p.toString = function(){
    return '[object PagetopToggle]';
  };


  /**
   * <h4>ページトップボタンのToggle処理</h4>
   * PagetopToggleのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $target pagetop要素 省略可 初期値 $('#Pagetop')
   * @param  {Object} options オプション値 省略可
   * @return {Pagetop} Pagetopインスタンスを返す
   */
  PagetopToggle.create = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !$target instanceof jQuery){
      options = $target;
      $target = $('#Pagetop');
    }

    var pagetop = new PagetopToggle($target, options);
    pagetop.init();
    return pagetop;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.PagetopToggle = PagetopToggle;


}(window, jQuery));
