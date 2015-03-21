;(function($, Typy){

  // 'use strict';
  // αバージョン


  /*--------------------------------------------------------------------------
    Task
  --------------------------------------------------------------------------*/
  /*
    リキッドの調整
    クロスフェードレングス
    フリック処理
    リサイズ対応
    サムネイル対応

  <div id="CF">
  <div class="target">
  <ul class="list">
  <li><img src="" alt="" /></li>
  </ul>
  </div>


  </div>



   */


  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>クロスフェーダー</h4>
   *
   * @class Typy.Crossfader
   * @constructor Crossfader
   * @param  {jQuery} クロスフェード要素要素
   * @param  {Object} options オプション値 [defaults property参照]
   * @return {Instance}
   */
  var Crossfader = function($target, options){
    this.$target = $target;
    this.param = $.extend({}, Crossfader.defaults, {
      $list     : $target.find('.slide').children(),
      $thumb    : $target.find('.thumb a'),
      $pointer  : $target.find('.pointer li'),
      $prev     : $target.find('.prev > a'),
      $next     : $target.find('.next > a')
    }, options);
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
  Crossfader.version = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Crossfader.p = Crossfader.prototype;


  /**
   * <h4>デフォルト値</h4>
   * <p>コンストラクタが呼び出す際に、第二引数にoptionsを指定するとparamオブジェクトにmixinします</p><br>
   *
   * defaults: { <ul><li>
   *   $list      : $('.list').children(), クロスフェードする要素の子要素 </li><li>
   *   $thumb     : $('.thumb a'), サムネイル ※省略可 </li><li>
   *   $pointer   : $('.pointer li'), ポインタ要素 ※省略可 </li><li>
   *   $prev      : $('.prev > a'), ※省略可, </li><li>
   *   $next      : $('.next > a'), ※省略可, </li><li>
   *   activeClass: 'active', アクティブ時に付けるクラス名 </li><li>
   *   naviType   : 'rollover', サムネイルのロールオーバータイプ ['rollover', 'alpha', 'fade', 'slip', 'none'] </li><li>
   *   current    : 0, 初期表示にするシーン </li><li>
   *   timer      : 0, タイマー 0はoff </li><li>
   *   duration   : 400, クロスフェードduration </li><li>
   *   ease       : 'linear', クロスフェードイージング </li><li>
   *   isFlick    : false, フリックの有効 </li><li>
   *   isLiquid   : false, リキッドレイアウトモードの有効 </li><li>
   *   loop       : false loopの有効 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Crossfader.defaults = {
    $list      : null,
    $thumb     : null,
    $pointer   : null,
    $prev      : null,
    $next      : null,
    activeClass: 'active',
    naviType   : 'rollover',
    current    : 0,
    timer      : 0,
    duration   : 400,
    ease       : 'linear',
    isFlick    : false,
    isLiquid   : false,
    loop       : false
  };


  /**
   * <h4>第一引数で指定したスライダー要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  Crossfader.p.$target = null;


  /**
   * <h4>option値格納オブジェクト</h4>
   * <p>コンストラクタが呼び出されたら、defaultsと第二引数で設定したoptions値をmixinして格納します</p>
   *
   * @property param
   * @type {Object}
   */
  Crossfader.p.param = null;


  /**
   * <h4>クロスフェード要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Crossfader.p.length = null;


  /**
   * <h4>タイマーID</h4>
   *
   * @property timerId
   * @type {String}
   */
  Crossfader.p.timerId = null;


  /**
   * !important 使用していません
   * クロスフェードアニメーションフラグ
   *
   * @property isAnimate
   * @type {Boolean}
   */
  Crossfader.p.isAnimate = false;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @return {Instance}
   */
  Crossfader.p.init = function(){
    // DOM生成
    this.createPointer();
    this.cloneElement();

    // 値設定
    this.setParam();

    // スタイル設定
    this.controller(this.param.current, true);

    // イベント設定
    this.pagerNavi(this.param.$thumb);
    this.pagerNavi(this.param.$pointer.find('a'));
    this.prevNavi(this.param.$prev);
    this.nextNavi(this.param.$next);
    this.timerStart();
    // this.resize();

    return this;
  };


  /**
   * !important リキッド用の調整が必要です。
   * <h4>パラメーターを設定します</h4>
   *
   * @method setParam
   * @return {Instance}
   */
  Crossfader.p.setParam = function(){

    this.length = this.param.$slideList.length;

    return this;
  };


  /**
   * <h4>ポインターがあればを生成します</h4>
   *
   * @method createPointer
   * @return {Instance}
   */
  Crossfader.p.createPointer = function(){
    if(this.param.$pointer[0]){
      var frag = document.createDocumentFragment(),
      el = this.param.$pointer[0],
      i = 0,
      $el;

      for(; i < this.length; i += 1){
        frag.appendChild(el.cloneNode(true));
      }

      $el = $(frag).children();
      this.param.$pointer.replaceWith($el);
      this.param.$pointer = $el;
    }

    return this;
  };


  /**
   * <h4>pagerナビゲーションイベントの実装</h4>
   *
   * @method pagerNavi
   * @param {jQuery} $target pager要素
   * @return {Instance}
   */
  Crossfader.p.pagerNavi = function($target){
    var self = this;

    $target.on('click.crossfader', function(){
      self.controller($target.index(this));
      return false;
    });

    return this;
  };


  /**
   * <h4>戻るボタンイベントの実装</h4>
   *
   * @method prevNavi
   * @param {jQuery} $target 戻るボタン要素
   * @return {Instance}
   */
  Crossfader.p.prevNavi = function($target){
    var self = this;

    $target.on('click.crossfader', function(){
      self.prev();
      return false;
    });

    return this;
  };


  /**
   * <h4>次へボタンイベントの実装</h4>
   *
   * @method nextNavi
   * @param {jQuery} $target 次ぎへボタン要素
   * @return {Instance}
   */
  Crossfader.p.nextNavi = function($target){
    var self = this;

    $target.on('click.crossfader', function(){
      self.next();
      return false;
    });

    return this;
  };


  /**
   * <h4>タイマースタート</h4>
   *
   * @method timerStart
   * @param  {Number} timer? タイマーを時間をセットします。省略可
   * @return {Instance}
   */
  Crossfader.p.timerStart = function(timer){
    var self = this;

    self.timerStop();

    if($.isNumeric(timer)){
      self.param.timer = timer;
    }

    if(0 < self.param.timer){
      self.timerId = setTimeout(function(){
        self.next();
      }, self.param.timer + self.param.duration);
    }

    return this;
  };


  /**
   * <h4>タイマーストップ</h4>
   *
   * @method timerStop
   * @return {Instance}
   */
  Crossfader.p.timerStop = function(){
    clearTimeout(this.timerId);
    return this;
  };


  /**
   * !important 未実装
   * <h4>リサイズ時のイベント</h4>
   *
   * @method resize description]
   * @return {[type]} [description]
   */
  Crossfader.p.resize = function(){
    return this;
  };


  /**
   * <h4>前に戻るります</h4>
   *
   * @method prev
   * @return  {Instance}
   */
  Crossfader.p.prev = function(){
    if(0 < this.param.current){
      this.controller(this.param.current - 1);
    } else if(this.param.isLoop){
      this.controller(this.length - 1);
    }
    return this;
  };


  /**
   * <h4>次へ進みます</h4>
   *
   * @method next
   * @return  {Instance}
   */
  Crossfader.p.next = function(){
    if(this.param.current < this.length -1){
      this.controller(this.param.current + 1);
    } else if(this.param.isLoop){
      this.controller(0);
    }
    return this;
  };


  /**
   * <h4>スライダーを制御します</h4>
   * 値の更新、スタイルはここで決めています
   *
   * @method controller
   * @param  {Number} num クロスフェードナンバー
   * @param  {Boolean} isNonTween アニメーションの無し野場合は、true
   * @return {Instance}
   */
  Crossfader.p.controller = function(num, isNonTween){
    this.timerStart();

    if(num < this.length){
      this.param.current = num;
      this.setActive();

      if(isNonTween){
        this.setPosition();
      } else {
        this.tween();
      }
    }

    return this;
  };


  /**
   * <h4>ナビゲーションのアクティブ化</h4>
   *
   * @method setActive
   * @return {Instance}
   */
  Crossfader.p.setActive = function(){
    var param = this.param;

    // loopしない場合、$prev, $next表示・非表示する
    if(!param.isLoop){
      if(param.current === 0){
        param.$prev.css({display: 'none'});
        param.$next.css({display: 'block'});
      } else if(param.current === this.length-1){
        param.$prev.css({display: 'block'});
        param.$next.css({display: 'none'});
      } else {
        param.$prev.css({display: 'block'});
        param.$next.css({display: 'block'});
      }
    }

    // $pointerのアクティブ
    param.$pointer.removeClass(param.activeClass).eq(param.current).addClass(param.activeClass);

    // $thumbのアクティブ
    if(param.naviType && param.naviType !== 'none'){
      // rolloverの処理
    } else {
      param.$thumb.removeClass(param.activeClass).eq(param.current).addClass(param.activeClass);
    }

    return this;
  };


  /**
   * <h4>ポジションをセットします</h4>
   *
   * @method setPosition
   * @return {Instance}
   */
  Crossfader.p.setPosition = function(next, prev){
    param.$list.eq(prev).css({opacity: 0, zIndex: 0});
    param.$list.eq(next).css({zIndex: this.length, opacity: 1});
    return this;
  };


  /**
   * <h4>クロスフェードします</h4>
   *
   * @method tween
   * @return  {Instance}
   */
  Crossfader.p.tween = function(next, prev){
    var param = this.param;
    param.$list.eq(next).css({zIndex: this.length}).stop(true, false).animate({opacity: 1}, param.duration, param.ease);
    param.$list.eq(prev).stop(true, false).animate({opacity: 0}, param.duration, param.ease, function(){
      param.$list.eq(prev).css({zIndex: 0});
    });
    return this;
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  Typy.Crossfader = Crossfader;



}(jQuery, this.Typy = this.Typy || {}));
