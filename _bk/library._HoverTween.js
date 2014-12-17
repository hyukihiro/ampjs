;(function(root, $){


  /*--------------------------------------------------------------------------
    HoverTween
  --------------------------------------------------------------------------*/
  /**
   * <h4>ホバーアクションクラス</h4>
   *
   * @class Library.HoverTween
   * @constructor HoverTween
   * @param  {jQuery} $target 対象のimg要素
   * @param  {Object} options オプション値
   * @return {Instance}
   */
  Library.HoverTween = (function(){

    var HoverTween = function($target, options){
      this.param = $.extend(true, {}, HoverTween.options, HoverTween.config, options, {$target: $target});
    };


    /**
     * <h4>プロトタイプオブジェクト</h4>
     *
     * @property p
     * @type {Object}
     */
    HoverTween.p = HoverTween.prototype;


    /**
     * <h4>設定値</h4>
     *
     * @static
     * @property config
     * @type {Object}
     */
    HoverTween.config = {
      $target: null
    };


    /**
     * <h4>オプション値</h4>
     *
     * @static
     * @property options
     * @type {Object}
     */
    HoverTween.options = {
      type       : 'rollover', // [rollover, alpha, fade, slip]
      groupClass : 'group-over',
      activeClass: 'active',
      noOverClass: 'no-over',
      boxClass   : 'hover-box',
      opacity    : .7,
      duration   : 400,
      ease       : 'linear',
      postfix    : '_on',
      direction  : 'all' // all, top, bottom, right, left
    };


    /**
     * <h4>初期化</h4>
     *
     * @method init
     */
    HoverTween.p.init = function(){
      $window.unload(this.init);

      var fn;
      switch (this.param.type){
      case 'rollover':
        fn = 'setRollover';
        break;

      case 'alpha':
        fn = 'setAlpha';
        break;

      default:
        fn = 'setTransition';
        break;
      }

      var i = 0,
      l = this.param.$target.length;
      for(; i < l; i += 1){
        this[fn](this.param.$target.eq(i));
      }
    };


    /**
     * <h4>ロールオーバー初期設定</h4>
     *
     * @method setRollover
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.setRollover = function($img){
      if($img.hasClass(this.param.noOverClass)){
        return this.off($img);
      }

      // 画像データ設定
      var src = $img.attr('src');
      $img.ext = src.substring(src.lastIndexOf('.'), src.length);

      // 現在on画像の場合
      if(src.lastIndexOf(this.param.postfix + $img.ext) > -1){
        $img.onSrc = src;
        $img.offSrc = src.replace(this.param.postfix + $img.ext, $img.ext);

        if(!$img.hasClass(this.param.activeClass)){
          $img[0].src = $img.offSrc;
        }
      } else {
        $img.offSrc = src;
        $img.onSrc = src.replace($img.ext, this.param.postfix + $img.ext);
        Library.preload($img.onSrc);
      }

      // イベント設定
      if($img.hasClass(this.param.activeClass)){
        this.rolloverActive($img);
      } else {
        this.rollover($img);
      }
    };


    /**
     * <h4>ロールオーバーアクティブ</h4>
     *
     * @method rolloverActive
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.rolloverActive = function($img){
      this.off($img);
      $img.attr({src: $img.onSrc}).addClass(this.param.activeClass);
    };


    /**
     * <h4>ロールオーバー</h4>
     *
     * @method rollover
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.rollover = function($img){
      $img.group = $img.closest('.' + this.param.groupClass);
      var $trigger = $img.group[0] ? $img.group : $img;

      $img.removeClass(this.param.activeClass + ' ' + this.param.noOverClass);

      $trigger.on({
        'mouseenter.rollover': function(){ $img.attr({src: $img.onSrc})},
        'mouseleave.rollover': function(){ $img.attr({src: $img.offSrc})}
      });
    };


    /**
     * <h4>アルファ初期設定</h4>
     *
     * @method setAlpha
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.setAlpha = function($img){
      if($img.hasClass(this.param.noOverClass)){
        this.off($img).css({opacity: 1});
      } else if($img.hasClass(this.param.activeClass)){
        this.alphaActive($img);
      } else {
        this.alpha($img);
      }
    };


    /**
     * <h4>アルファアクティブ</h4>
     *
     * @method alphaActive
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.alphaActive = function($img){
      this.off($img.css({opacity: this.param.opacity}).addClass(this.param.activeClass));
      return $img;
    };


    /**
     * <h4>アルファホバー</h4>
     *
     * @method alpha
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.alpha = function($img){
      var param = this.param,
      $trigger;

      $img.group = $img.closest('.' + param.groupClass);
      $trigger = $img.group[0] ? $img.group : $img;

      $trigger.on({
        'mouseenter.alpha': function(){
          if(param.duration){
            $img.stop(true, false).animate({opacity: param.opacity}, param.duration, param.ease);
          } else {
            $img.css({'opacity': param.opacity});
          }
        },
        'mouseleave.alpha': function(){
          if(param.duration){
            $img.stop(true, false).animate({opacity: 1}, param.duration, param.ease);
          } else {
            $img.css({'opacity': 1});
          }
        }
      });

      return $img;
    };


    /**
     * <h4>slip,fade初期設定</h4>
     *
     * @method setTransition
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.setTransition = function($img){
      var param = this.param;

      if($img.hasClass(param.noOverClass)){
        return this.off($img);
      }

      // 画像データ設定
      var src = $img.attr('src'),
      ext = src.substring(src.lastIndexOf('.'), src.length),
      onImg = src.replace(ext, param.postfix + ext),
      width = $img.width(),
      height = $img.height(),
      boxCss = {
        display : 'block',
        position: 'relative',
        overflow: 'hidden',
        width   : width,
        height  : height
      },
      onCss = {
        position: 'absolute',
        zIndex  : param.type === 'fade' ? 0 : 2,
        top     : param.type === 'fade' ? 0 : '100%',
        left    : 0
      };

      $img.box = $img.closest('.' + param.boxClass);

      if($img.box[0]){
        $img.onImg = $img.box.children().first();

      } else {
        // 要素の追加: 画像を囲う要素 [on画像, off画像]
        var box = $('<span />', {'class': param.boxClass}).css(boxCss);
        $img.onImg = $('<img src="' + onImg + '" alt="" />').css(onCss);
        $img.box = $img.css({position: 'relative'}).wrap(box).parent().prepend($img.onImg);
      }

      // fade
      if(param.type === 'fade'){
        if($img.hasClass(param.activeClass)){
          this.fadeActive($img);
        } else {
          this.fade($img);
        }
      // slip
      } else {
        if($img.hasClass(param.activeClass)){
          this.slipActive($img);
        } else {
          this.slip($img);
        }
      }
    };


    /**
     * <h4>fadeアクティブ</h4>
     *
     * @method fadeActive
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.fadeActive = function($img){
      this.off($img.css({opacity: 0}).addClass(this.param.activeClass));
    };


    /**
     * <h4>fadeホバー</h4>
     *
     * @method fade
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.fade = function($img){
      var param =  this.param,
      $trigger;

      $img.group = $img.closest('.' + param.groupClass);
      $trigger = $img.group[0] ? $img.group : $img.box;

      $trigger.on({
        'mouseenter.fade': function(){
          $img.stop(true, false).animate({opacity: 0}, param.duration, param.ease);
        },
        'mouseleave.fade': function(){
          $img.stop(true, false).animate({opacity: 1}, param.duration, param.ease);
        }
      });
    };


    /**
     * <h4>fadeアクティブ</h4>
     *
     * @method slipActive
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.slipActive = function($img){
      $img.onImg.css({top: 0, left: 0});
      this.off($img).addClass(this.param.activeClass);
    };


    /**
     * <h4>slipホバー</h4>
     *
     * @method slipActive
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.slip = function($img){
      var param =  this.param,
      $trigger,
      direction;

      $img.group = $img.closest('.' + param.groupClass);
      $trigger = $img.group[0] ? $img.group : $img.box;

      $trigger.on({
        'slipin.slip': function(e){
          direction = param.direction === 'all' ? e.direction : param.direction;

          $img.onImg.stop(true, false).css(HoverTween.p.creatSlipStyle(direction))
          .animate({top: 0, left: 0}, param.duration, param.ease);
        },
        'slipout.slip': function(e){
          direction = param.direction === 'all' ? e.direction : param.direction;

          $img.onImg.stop(true, false)
          .animate(HoverTween.p.creatSlipStyle(direction), param.duration, param.ease);
        }
      });
    };


    /**
     * <h4>マウスアクションの方向からスタイルを生成して返す</h4>
     *
     * @method creatSlipStyle
     * @param {String} slip イベントの起こった向
     */
    HoverTween.p.creatSlipStyle = function(slip){
      var style = {
        top : 0,
        left: 0
      };

      switch (slip){
      case 'top':
        style.top = '-100%';
        break;

      case 'bottom':
        style.top = '100%';
        break;

      case 'left':
        style.left = '-100%';
        break;

      case 'right':
        style.left = '100%';
        break;
      }

      return style;
    };


    /**
     * <h4>イベントの削除</h4>
     *
     * @method off
     * @param {jQuery} $img イメージ要素
     */
    HoverTween.p.off = function($img){
      var param = this.param,
      $trigger;

      $img.group = $img.closest('.' + param.groupClass);
      $trigger = $img.group[0] ? $img.group : $img.box ? $img.box : $img;

      $img.removeClass(param.activeClass + ' ' + param.noOverClass);
      if(param.type === 'slip'){
        $trigger.off('slipin.' + param.type + ' slipout.' + param.type);
      } else {
        $trigger.off('mouseenter.' + param.type + ' mouseleave.' + param.type);
      }

      return $img;
    };

    // return HoverTween
    return HoverTween;
  }());


  /**
   * <h4>ロールオーバー</h4>
   *
   * @static
   * @metod rollover
   * @param  {jQuery} $target? 対象img要素、指定の無い場合はデフォルトの$targetが指定される 省略可
   * @param  {Object} options? オプションの設定 省略可
   * @return {Library.HoverTween} インスタンスを返す
   */
  Library.rollover = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!($target instanceof jQuery)){
      options = $target;
      $target = $('img.rover, input.rover, .all-rover img');
    }

    var opt = $.extend(true, {
      type       : 'rollover',
      activeClass: 'active',
      groupClass : 'group-over',
      noOverClass: 'no-over',
      postfix    : '_on'
    }, options);

    var hoverTween = new Library.HoverTween($target, opt);
    hoverTween.init();

    // return instance
    return hoverTween;
  };


  /**
   * <h4>アルファホバー</h4>
   *
   * @static
   * @metod alpha
   * @param  {jQuery} $target? 対象img要素、指定の無い場合はデフォルトの$targetが指定される 省略可
   * @param  {Object} options? オプションの設定 省略可
   * @return {Library.HoverTween} インスタンスを返す
   */
  Library.alpha = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!($target instanceof jQuery)){
      options = $target;
      $target = $('img.alpha, input.alpha, .all-alpha img');
    }

    var opt = $.extend(true, {
      type       : 'alpha',
      groupClass : 'group-over',
      activeClass: 'active',
      noOverClass: 'no-over',
      opacity    : .6,
      duration   : 0,
      ease       : 'linear'
    }, options);

    var hoverTween = new Library.HoverTween($target, opt);
    hoverTween.init();

    // return instance
    return hoverTween;
  };


  /**
   * <h4>フェードホバー</h4>
   *
   * @static
   * @metod fade
   * @param  {jQuery} $target? 対象img要素、指定の無い場合はデフォルトの$targetが指定される 省略可
   * @param  {Object} options? オプションの設定 省略可
   * @return {Library.HoverTween} インスタンスを返す
   */
  Library.fade = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!($target instanceof jQuery)){
      options = $target;
      $target = $('img.fade, .all-fade img');
    }

    var opt = $.extend(true, {
      type       : 'fade',
      groupClass : 'group-over',
      activeClass: 'active',
      noOverClass: 'no-over',
      boxClass   : 'hover-box',
      duration   : 400,
      ease       : 'linear',
      postfix    : '_on'
    }, options);

    var hoverTween = new Library.HoverTween($target, opt);
    hoverTween.init();

    // return instance
    return hoverTween;
  };


  /**
   * <h4>スリップホバー</h4>
   *
   * @static
   * @metod slip
   * @param  {jQuery} $target? 対象img要素、指定の無い場合はデフォルトの$targetが指定される 省略可
   * @param  {Object} options? オプションの設定 省略可
   * @return {Library.HoverTween} インスタンスを返す
   */
  Library.slip = function($target, options){
    // $target指定がない場合、初期値を設定
    if(!($target instanceof jQuery)){
      options = $target;
      $target = $('img.slip, .all-slip img');
    }

    var opt = $.extend(true, {
      type       : 'slip',
      groupClass : 'group-over',
      activeClass: 'active',
      noOverClass: 'no-over',
      boxClass   : 'hover-box',
      duration   : 200,
      ease       : 'easeOutExpo',
      postfix    : '_on',
      direction  : 'all' // [all, top, bottom, left, right]
    }, options);

    var hoverTween = new Library.HoverTween($target, opt);
    hoverTween.init();

    // return instance
    return hoverTween;
  };


  /**
   * <h4>ホバースタイルのアクティブ化</h4>
   *
   * @static
   * @metod slip
   * @param  {jQuery} $target? 対象img要素、指定の無い場合はデフォルトの$targetが指定される 省略可
   * @param  {Object} options? オプションの設定 省略可
   * @return {Library.HoverTween} インスタンスを返す
   */
  Library.active = function($target, options){
    var opt = $.extend({
      type       : 'rollover', // [rollover, alpha, fade, slip]
      postfix    : '_on',
      activeClass: 'active'
    }, options);

    $target.addClass(options.activeClass);

    if(Library[options.type] && $target[0].nodeName === 'IMG'){
      // return instance
      return Library[options.type]($target, opt);
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/



}(window, jQuery));
