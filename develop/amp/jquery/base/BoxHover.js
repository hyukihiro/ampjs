var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class AMP.$.BoxHover
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   */
  function BoxHover($boxHover, options){

    // $boxHover指定がない場合、初期値を設定
    if(!$boxHover || !($boxHover instanceof jQuery)){
      options = $boxHover;
      $boxHover = $('.box_hover');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, BoxHover.boxHoverOptions, options);

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.box_hover')
     * @property param.$boxHover
     * @type {jQuery}
     */
    this.param.$boxHover = $boxHover;
  }

  // 基底クラスを継承
  AMP.inherits(BoxHover, AMP.BASE_CLASS);

  // prototype
  var p = BoxHover.prototype;



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
  BoxHover.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'BoxHover';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
   *
   * @static
   * @property boxHoverOptions
   * @type {Object}
   */
  /**
   * <h4>ホバー時に付けるクラス名</h4>
   *
   * @static
   * @property boxHoverOptions.hoverClass
   * @default hover
   * @type {String}
   */
  /**
   * <h4>複数リンクがある場合、優先するリンククラス</h4>
   *
   * @static
   * @property boxHoverOptions.linkClass
   * @default link
   * @type {String}
   */
  BoxHover.boxHoverOptions = {
    hoverClass: 'hover',
    linkClass : 'link'
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>BoxHoverインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $boxHover 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover}
   */
  BoxHover.get = function($boxHover, options){
    var instance = new BoxHover($boxHover, options);
    instance.on();
    return instance;
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {BoxHover}
   */
  p.on = function(){
    var self = this;

    this.off();

    this.param.$boxHover.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.param.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.param.hoverClass);
    })
    .on('click.BoxHover', function(){
      self._setLink($(this));
    });

    // フォーム要素はイベント伝播をキャンセル
    this.param.$boxHover.find('label input select textarea').click(function(event){
      event.stopPropagation();
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {BoxHover}
   */
  p.off = function(){
    this.param.$boxHover.css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover');
    return this;
  };


  /**
   * <h4>リンクの設定</h4>
   *
   * @private
   * @method _setLink
   * @param {Object} event イベントオブジェクト
   * @param {Object} param paramオブジェクト
   * @return {Void}
   */
  p._setLink = function($target){
    var $link = $target.find('.' + this.param.linkClass),
    $a = $target.find('a').eq(0);

    $a = $link[0] ? $link : $a;

    // リンク展開
    if($a.attr('target') === '_blank'){
      window.open($a.attr('href'), '_blank');
    } else {
      location.href = $a.attr('href');
    }
  };



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ = {};
  AMP.$.BoxHover = BoxHover;


}(window, jQuery));
