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
   * <h4>ホバースライドアニメーション</h4>
   * <a href="../../demo/AMP.$.Slip.html">DEMO</a></p>
   *
   * @class AMP.$.Slip
   * @constructor
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   */
	function Slip($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.slip');
    }

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    this.props = $.extend(true, {}, Slip.options, options);

    /**
     * <h4>float要素</h4>
     *
     * @propaty $target
     * @type {jQuery}
     */
    this.props.$target = $target;
	}

  // 基底クラスを継承
  AMP.inherits(Slip, AMP.BASE_CLASS);

	// prototype
	var p = Slip.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Slip.VERSION = '1.0.1';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Slip';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
   *
   * @static
   * @property options
   * @type {Object}
   */
  /**
   * <h4>マウスイン時のアニメーション方向</h4>
   * <p>以下7タイプ (allはデフォルト4方向)<br>
   * all, side, updown, up, down, left, right</p>
   *
   * @static
   * @property options.inDirection
   * @default all
   * @type {String}
   */
  /**
   * <h4>マウスアウト時のアニメーション方向</h4>
   * <p>以下7タイプ (allはデフォルト4方向)<br>
   * all, side, updown, up, down, left, right</p>
   *
   * @static
   * @property options.outDirection
   * @default all
   * @type {String}
   */
  /**
   * <h4>スライドする子要素のクラス名</h4>
   *
   * @static
   * @property options.slipClass
   * @default slip_tween
   * @type {String}
   */
  /**
   * <h4>アクティブ時に付与するクラス名</h4>
   *
   * @static
   * @property options.activeClass
   * @default .activeClass
   * @type {String}
   */
  /**
   * <h4>スライドしない要素に付与するクラス名</h4>
   *
   * @static
   * @property options.noSlipClass
   * @default .no_slip
   * @type {String}
   */
  /**
   * <h4>Tween option</h4>
   * <p><a href="http://julian.com/research/velocity/" target="_blank">velocity.js オプション参照</a></p>
   *
   * @static
   * @property options.tween
   * @default .no_slip
   * @type {Object}
   */
	Slip.options = {
    inDirection : 'all', // all, side, updown, up, down, left, right
    outDirection: 'all', // all, side, updown, up, down, left, right
    slipClass   : 'slip_tween',
    activeClass : 'active',
    noSlipClass : 'no_slip',
    tween       : {
      duration  : 400,
      easing    : 'easeOutExpo'
    }
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Slipインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   * @return {Slip}
   */
  Slip.get = function($target, options){
    return new Slip($target, options).on();
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Slip}
   */
  p.on = function(){
    var self = this;

    // 二重登録回避
    this.off();

    self.props.$target
    .on('slipin.Slip', function(inEvent){
      self._tween(self.props.$target.index(this), inEvent);
    })
    .on('slipout.Slip', function(outEvent){
      self._tween(self.props.$target.index(this), outEvent);
    })
    .each(function(i){
      if($(this).hasClass(self.props.noSlipClass)){
        self.passive(i);

      } else if($(this).hasClass(self.props.activeClass)){
        self.active(i);
      }
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Slip}
   */
  p.off = function(){
    this.props.$target.off('slipin.Slip slipin.Slip');
    return this;
  };


  /**
   * <h4>アクティブ</h4>
   *
   * @method active
   * @param  {Number} num 要素のインデックス
   * @return {Slip}
   */
  p.active = function(num){
    var $target = AMP.isNumber(num) ? this.props.$target.eq(num) : this.props.$target;

    $target
    .addClass(this.props.activeClass)
    .find('.' + this.props.slipClass)
    .velocity('stop').css({top: 0, left: 0});

    return this;
  };


  /**
   * <h4>待機状態のスタイル</h4>
   *
   * @method passive
   * @param  {Number} num 要素のインデックス
   * @return {Slip}
   */
  p.passive = function(num){
    var $target = AMP.isNumber(num) ? this.props.$target.eq(num) : this.props.$target;

    $target
    .removeClass(this.props.activeClass)
    .find('.' + this.props.slipClass)
    .velocity('stop').css({top: '-100%'});

    return this;
  };


  /**
   * <h4>アニメーション</h4>
   *
   * @private
   * @method _tween
   * @param  {Number} num   要素のインデックス
   * @param  {Object} event イベントオブジェクト
   * @return {Void}
   */
  p._tween = function(num, event){
    var style = this._createTweenStyle(event),
    $target = this.props.$target.eq(num);

    if(!$target.hasClass(this.props.activeClass) && !$target.hasClass(this.props.noSlipClass)){
      $target.find('.' + this.props.slipClass)
      .velocity('stop')
      .velocity(style.start, 0)
      .velocity(style.end, this.props.tween);
    }
  };


  /**
   * <h4>Tweenスタイルの生成</h4>
   *
   * @private
   * @method _createTweenStyle
   * @param  {Object} event イベントオブジェクト
   * @return {Object}
   */
  p._createTweenStyle = function(event){
    var isSlipin = event.type === 'slipin',
    direction = isSlipin ? this.props.inDirection : this.props.outDirection,
    style01 = {left: 0, top : 0},
    style02 = $.extend({}, style01),
    style = isSlipin ? style01 : style02;

    if(direction === 'side'){
      style.left = event.x < 0 ? '-100%' : '100%';

    } else if(direction === 'updown'){
      style.top = event.y < 0 ? '-100%' : '100%';

    } else if(direction === 'up'){
      style.top = '-100%';

    } else if(direction === 'down'){
      style.top = '100%';

    } else if(direction === 'left'){
      style.left = '-100%';

    } else if(direction === 'right'){
      style.left = '100%';

    } else {
      // direction All
      if(event.direction === 'top'){
        style.top = '-100%';
      } else if(event.direction === 'bottom'){
        style.top = '100%';
      } else if(event.direction === 'left'){
        style.left = '-100%';
      } else {
        style.left = '100%';
      }
    }

    return {
      start: style01,
      end  : style02
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Slip = Slip;


}(window, AMP, jQuery));
