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
   * <h4>AMP.$.BoxHover</h4>
   * <p>リンクエリアを、BOXエリアまで拡大させます<br>
   * <a href="../../demo/AMP.$.BoxHover.html">DEMO</a></p>
   *
   * @class AMP.$.BoxHover
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値 (BoxHover.options参照)
   */
  function BoxHover($boxHover, options){

    // $boxHover指定がない場合、初期値を設定
    if(!$boxHover || !($boxHover instanceof jQuery)){
      options = $boxHover;
      $boxHover = $('.box_hover');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, BoxHover.options, options);

    /**
     * <h4>ターゲット要素</h4>
     *
     * @default $('.box_hover')
     * @property props.$boxHover
     * @type {jQuery}
     */
    this.props.$boxHover = $boxHover;
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
  BoxHover.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'BoxHover';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>ホバー時に、box要素に付与するクラス名</h4>
   *
   * @static
   * @property options.hoverClass
   * @default hover
   * @type {String}
   */
  /**
   * <h4>Box内に複数リンクがある場合、優先対象に指定するリンククラス名</h4>
   *
   * @static
   * @property options.linkClass
   * @default link
   * @type {String}
   */
  BoxHover.options = {
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
    return new BoxHover($boxHover, options).on();
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

    this.props.$boxHover.css({cursor: 'pointer'})
    .on('mouseenter.BoxHover', function(){
      $(this).addClass(self.props.hoverClass);
    })
    .on('mouseleave.BoxHover', function(){
      $(this).removeClass(self.props.hoverClass);
    })
    .on('click.BoxHover', function(){
      self.transition($(this));
    })
    .find('a')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
    });

    // フォーム要素はイベント伝播をキャンセル
    this.props.$boxHover.find('label input select textarea')
    .on('click.BoxHover', function(clickEvent){
      clickEvent.stopPropagation();
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
    this.props.$boxHover
    .css({cursor: 'auto'})
    .off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover')
    .find('a').off('click.BoxHover');

    this.props.$boxHover.find('label input select textarea').off('click.BoxHover');

    return this;
  };


  /**
   * <h4>リンクページへ遷移</h4>
   *
   * @method transition
   * @return {Void}
   */
  p.transition = function($box){
    var $link = $box.find('.' + this.props.linkClass);
    $link = $link[0] ? $link : $box.find('a').eq(0);

    // リンク展開
    if($link.attr('target') === '_blank'){
      window.open($link.attr('href'), '_blank');
    } else {
      location.href = $link.attr('href');
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.BoxHover = BoxHover;


}(window, AMP, jQuery));
