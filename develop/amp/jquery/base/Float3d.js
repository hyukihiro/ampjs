/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


var AMP = AMP || {};


(function(root, $){

	// 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ホバーの3Dアクション</h4>
   * ※IE10以上対象
   *
   * @example  要素構成: .float > .float_frame > .float_inner
   *
   * @class AMP.$.Float3d
   * @constructor
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   */
	function Float3d($target, options){
    // $target指定がない場合、初期値を設定
    if(!$target || !($target instanceof jQuery)){
      options = $target;
      $target = $('.float');
    }

    /**
     * <h4>プロパティ格納オブジェクト</h4>
     *
     * @property param
     * @type {Object}
     */
    this.param = $.extend(true, {}, Float3d.float3dOptions, options);

    /**
     * <h4>float要素</h4>
     *
     * @propaty $target
     * @type {jQuery}
     */
    this.param.$target = $target;

    /**
     * <h4>html要素</h4>
     *
     * @propaty $html
     * @type {jQuery}
     */
		this.param.$html = $('html');

    /**
     * <h4>float要素</h4>
     *
     * @private
     * @propaty _isFloating
     * @type {Boolean}
     */
    this.param._isFloating = false;
	}

  // 基底クラスを継承
  AMP.inherits(Float3d, AMP.BASE_CLASS);

	// prototype
	var p = Float3d.prototype;



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
  Float3d.VERSION = '1.0.2';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Float3d';


  /**
   * <h4>デフォルト値、格納オブジェクト</h4>
   * コンストラクタが呼び出し時に、optionsとmixinしてparamオブジェクトに格納します
   *
   * @static
   * @property float3dOptions
   * @type {Object}
   */
  /**
   * <h4>3D変形の奥行きの深さを指定する値</h4>
   *
   * @static
   * @property float3dOptions.perspective
   * @type {Number}
   */
  /**
   * <h4>Z方向の距離で移動を指定する値</h4>
   *
   * @static
   * @property float3dOptions.translateZ
   * @type {Number}
   */
  /**
   * <h4>回転表示を指定する値</h4>
   *
   * @static
   * @property float3dOptions.rotate
   * @type {Number}
   */
  /**
   * <h4>floating時に回転する幅く</h4>
   *
   * @static
   * @property float3dOptions.range
   * @type {Number}
   */
  /**
   * <h4>floating時の回転するスピードく</h4>
   *
   * @static
   * @property float3dOptions.speed
   * @type {Number}
   */
  /**
   * <h4>hover時のdurationく</h4>
   *
   * @static
   * @property float3dOptions.duration
   * @type {Number}
   */
  /**
   * <h4>hover時のeasingく</h4>
   *
   * @static
   * @property float3dOptions.easing
   * @type {String}
   */
	Float3d.float3dOptions = {
    perspective: 400,
    translateZ : -150,
    rotate     : 7.5,
    range      : 5,
    speed      : 150,
    duration   : 400,
    easing     : 'easeOutExpo'
	};



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>Float3dインスタンスの生成</h4>
   *
   * @static
   * @method get
   * @param  {jQuery} $target 対象の要素
   * @param  {Object} options オプション値
   * @return {Float3d}
   */
  Float3d.get = function($target, options){
    var instance = new Float3d($target, options);
    instance.on();
    return instance;
  };


  /**
   * <h4>イベント登録</h4>
   *
   * @method on
   * @return {Float3d}
   */
  p.on = function(){
    var self = this;

    // イベント重複回避
    self.off();

    self.param.$target.css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective});

    self.param.$target
    .on('mouseenter.Float3d', function(onEvent){
      self.onTween(this, onEvent);
      self.param._isFloating = true;
      self.floatTween($(this).children(), 0);

      // moveEvent登録
      $(this).on('mousemove.Float3d', function(moveEvent){
        self.onTween(this, moveEvent);
      });
    })
    .on('mouseleave.Float3d', function(outEvent){
      self.param._isFloating = false;
      self.outTween(this, outEvent);

      // moveEvent削除
      $(this).off('mousemove.Float3d');
    });

     // moveEvent削除
    this.param.$html.on('mouseleave.Float3d', function(){
      self.param.$target.parent().off('mousemove.Float3d');
      self.param._isFloating = false;
    });

    return this;
  };


  /**
   * <h4>イベント削除</h4>
   *
   * @method off
   * @return {Float3d}
   */
  p.off = function(){
    this.param.$target.off('.Float3d').css({perspective: 0})
    .children().css({perspective: this.param.perspective})
    .children().css({perspective: this.param.perspective});

    this.param.$html.off('.Float3d');

    return this;
  };


  /**
   * <h4>マウスオンTween</h4>
   *
   * @method onTween
   * @param  {DOM} target 対象の要素
   * @param  {Object} event イベントオブジェクト
   * @return {Void}
   */
  p.onTween = function(target, event){
    var $target = $(target).children(),
    offset = this.offsetRatio(target, event);

    $target.velocity('stop')
    .velocity({
      translateZ: this.param.translateZ,
      rotateX   : this.param.rotate * offset.y,
      rotateY   : this.param.rotate * offset.x,
      rotateZ   : this.param.rotate * offset.x
    }, {
      duration: this.param.duration,
      easing  : this.param.easing
    });
  };


  /**
   * <h4>選択中のTween</h4>
   * 再起処理します
   *
   * @method floatTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.floatTween = function($target, angle){
    var self = this;

    angle = typeof angle === 'number' ? angle : 0;
    angle += Math.PI / self.param.speed;

    $target.children()
    .velocity('stop')
    .velocity({
      rotateX: (self.param.range * Math.cos(angle + Math.PI)),
      rotateY: (self.param.range * Math.sin(angle + Math.PI)),
      rotateZ: (self.param.range * Math.sin(angle + Math.PI))
    }, {
      duration: 1000 / 60,
      easing  : 'linear',
      complete: function(){
        // 再起処理
        if(self.param._isFloating){
          self.floatTween($target, angle);
        }
      }
    });
  };


  /**
   * <h4>マウスアウトTween</h4>
   *
   * @method outTween
   * @param  {DOM} target 対象の要素
   * @return {Void}
   */
  p.outTween = function(target){
    var self = this;

    $(target).children()
    .velocity('stop')
    .velocity({
      translateZ: 0,
      rotateX   : 0,
      rotateY   : 0,
      rotateZ   : 0
    }, {
      duration: self.param.duration,
      easing  : self.param.ease
    })
    .children()
    .velocity('stop')
    .velocity({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }, {
      duration: self.param.duration,
      easing  : self.param.easing
    });
  };


  /**
   * <h4>エリアセンター中心に座標位置の比率を返す</h4>
   * 比率は0を中心に-1から1までの小数点2桁の数値
   *
   * @method offsetRatio
   * @param  {DOM} target 対象の要素
   * @param  {Object} event  イベントオブジェクト
   * @return {Object}  x,y座標比を格納したオブジェクト
   */
  p.offsetRatio = function(target, event){
    var $target = $(target);

    var center = {
      x: $target.width() / 2,
      y: $target.height() / 2
    };

    var offset = {
      x: event.pageX - $target.offset().left,
      y: event.pageY - $target.offset().top
    };

    // return offset
    return {
      x: ((offset.x - center.x) / center.x).toFixed(2),
      y: ((center.y - offset.y) / center.y).toFixed(2)
    };
  };



  /*--------------------------------------------------------------------------
    exports
  --------------------------------------------------------------------------*/

  AMP.$ = AMP.$ || {};
  AMP.$.Float3d = Float3d;



}(window, jQuery));
