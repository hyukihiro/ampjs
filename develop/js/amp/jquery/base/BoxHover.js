var AMP = AMP || {};

(function(root, $){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class BoxHover
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   */
  function BoxHover($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.box_hover');
    }

    this.param = $.extend(true, {}, BoxHover.defaults, options);

    /**
     * <h4>ターゲット要素</h4>
     * @property param.$target
     * @type {jQuery}
     */
    this.param.$target = $target;
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
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
   *
   * @default
   * defaults { <ul><li>
   *   hoverClass: 'hover', {String} ホバー時に付けるクラス名</li><li>
   *   linkClass : 'link' {String} 複数リンクがある場合、優先するリンククラス</li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  BoxHover.defaults = {
    hoverClass: 'hover',
    linkClass : 'link'
  };


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタ呼び出し時の引数とBoxHover.defaultsを、mixinして格納します<br>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>BoxHoverインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover}
   */
  BoxHover.get = function($target, options){
    var instance = new BoxHover($target, options);
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

    this.param.$target.css({cursor: 'pointer'})
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
    this.param.$target.find('label input select textarea').click(function(event){
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
    this.param.$target.css({cursor: 'auto'})
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

  AMP.BoxHover = BoxHover;
  AMP.boxHover = BoxHover.get;


}(window, jQuery));
