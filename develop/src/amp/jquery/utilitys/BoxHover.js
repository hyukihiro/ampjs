(function(root, $){

  // 'use strict';

  var BoxHover, boxHover, p;



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   *
   * @class AMP.BoxHover
   * @constructor
   * @param  {jQuery} $target 対象のbox要素
   * @param  {Object} options オプション値
   * @return {BoxHover}
   */
  BoxHover = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.box-hover');
    }

    this.$target = $target;
    this.param = $.extend(true, {}, BoxHover.defaults, options);
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ボックスホバー</h4>
   * BoxHoverショートハンド
   *
   * @static
   * @method boxHover
   * @param  {jQuery} $target 対象のbox要素 省略可 初期値 $('.box-hover')
   * @param  {Object} options オプション値 省略可
   * @return {BoxHover} BoxHoverインスタンスを返す
   */
  boxHover = function($target, options){
    var inst = new BoxHover($target, options);
    inst.on();
    return inst;
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
  BoxHover.VERSION = '2.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = BoxHover.prototype;


  /**
   * <h4>対象の要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  p.$target = null;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、optionsを指定するとparamオブジェクトにmixinします<br>
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
   * コンストラクタ呼び出し時の引数とBoxHover.optionsを、mixinして格納します<br>
   *
   * @property param
   * @type {Object}
   */
  p.param = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラスを拡張します</h4>
   * AMP._extendをエクスポートしています
   *
   * @static
   * @method extend
   * @param {Object} protoProp プロトタイプオブジェクト
   * @param {Object} staticProp staticオブジェクト
   * @return {BoxHover}
   */
  BoxHover.extend = AMP._extend;


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @param {jQuery} $target ターゲット要素 省略可
   * @return {BoxHover}
   */
  p.on = function($target){
    var self = this;

    $target = $target ? $target : this.$target;
    this.off($target);

    $target.css({cursor: 'pointer'})
      .on('mouseenter.BoxHover', function(){
        $(this).addClass(self.param.hoverClass);
      })
      .on('mouseleave.BoxHover', function(){
        $(this).removeClass(self.param.hoverClass);
      })
      .on('click.BoxHover', function(){
        self.setLink($(this));
      });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @param {jQuery} $target ターゲット要素 省略可
   * @return {BoxHover}
   */
  p.off = function($target){
    $target = $target ? $target : this.$target;
    $target.css({cursor: 'auto'}).off('mouseenter.BoxHover mouseleave.BoxHover click.BoxHover');
    return this;
  };


  /**
   * <h4>リンクの設定</h4>
   *
   * @method setLink
   * @param {Object} event イベントオブジェクト
   * @param {Object} param paramオブジェクト
   * @return {Boolean} false デフォルトのリンクの挙動のキャンセル
   */
  p.setLink = function($target){
    var self = this,
    $link = $target.find('.' + self.param.linkClass),
    $a = $target.find('a').eq(0);

    $a = $link[0] ? $link : $a;

    // リンク展開
    if($a.attr('target') === '_blank'){
      return window.open($a.attr('href'), '_blank');
    } else {
      location.href = $a.attr('href');
    }
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object BoxHover]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.AMP = root.AMP || {};
  root.AMP.BoxHover = BoxHover;
  root.AMP.boxHover = boxHover;


}(window, jQuery));
