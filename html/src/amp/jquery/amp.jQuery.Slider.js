/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author  Yoshihito Fujiwara
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


;(function(root, $){

  // 'use strict';

  // αバージョン

  /*--------------------------------------------------------------------------
    Task
  --------------------------------------------------------------------------*/
  /*
    リサイズ対応
    サムネイル対応
    css3対応
    コールバック関数
   */


  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>スライダー</h4>
   *
   * @class Slider
   * @constructor
   * @param  {jQuery} スライダー要素
   * @param  {Object} options オプション値 [defaults property参照]
   * @return {Slider}
   */
  var Slider = function($target, options){
    this.$target = $target;

    this.param = $.extend({}, Slider.defaults, {
      $slide  : $target.find('.slide'),
      $list   : $target.find('.slide').children(),
      $thumb  : $target.find('.thumb a'),
      $pointer: $target.find('.pointer li'),
      $prev   : $target.find('.prev > a'),
      $next   : $target.find('.next > a')
    }, options);
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
  Slider.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Slider.p = Slider.prototype;


  /**
   * <h4>デフォルト値</h4>
   * コンストラクタが呼び出す際に、第二引数にoptionsを指定するとparamオブジェクトにmixinします<br>
   *
   * defaults: { <ul><li>
   *   $slide     : $('.slide'), スライドする要素 </li><li>
   *   $list      : $('.slide').children(), スライドする要素の子要素 </li><li>
   *   $thumb     : $('.thumb a'), サムネイル ※省略可 </li><li>
   *   $pointer   : $('.pointer li'), ポインタ要素 ※省略可 </li><li>
   *   $prev      : $('.prev > a'), ※省略可, </li><li>
   *   $next      : $('.next > a'), ※省略可, </li><li>
   *   activeClass: 'active', アクティブ時に付けるクラス名 </li><li>
   *   naviType   : 'rollover', サムネイルのロールオーバータイプ ['rollover', 'alpha', 'fade', 'slip', 'none'] </li><li>
   *   current    : 0, 初期表示にするシーン </li><li>
   *   timer      : 0, タイマー 0はoff </li><li>
   *   duration   : 400, スライドduration </li><li>
   *   ease       : 'easeOutExpo', スライドイージング </li><li>
   *   isFlick    : false, フリックの有効 </li><li>
   *   isLiquid   : false, リキッドレイアウトモードの有効 </li><li>
   *   loop       : false loopの有効 </li></ul>
   * }
   *
   * @static
   * @property defaults
   * @type {Object}
   */
  Slider.defaults = {
    $slide     : null,
    $list      : null,
    $thumb     : null,
    $pointer   : null,
    $prev      : null,
    $next      : null,
    activeClass: 'active',
    // naviType   : 'rollover',
    current    : 0,
    timer      : 0,
    duration   : 400,
    ease       : 'easeOutQuart',
    isFlick    : true,
    flickHit   : 80,
    isLiquid   : false,
    loop       : false
  };


  /**
   * <h4>第一引数で指定したスライダー要素</h4>
   *
   * @property $target
   * @type {jQuery}
   */
  Slider.p.$target = null;


  /**
   * <h4>パラメーター格納オブジェクト</h4>
   * コンストラクタが呼び出されたら、defaultsと第二引数で設定したoptions値をmixinして格納します
   *
   * @property param
   * @type {Object}
   */
  Slider.p.param = null;


  /**
   * <h4>スライドのステージ幅</h4>
   *
   * @property stageWidth
   * @type {Number}
   */
  Slider.p.stageWidth = null;


  /**
   * <h4>スライド移動する距離</h4>
   *
   * @property distance
   * @type {Number}
   */
  Slider.p.distance = null;


  /**
   * <h4>スライドに表示されているリストの数</h4>
   *
   * @property shuoNum
   * @type {Number}
   */
  Slider.p.showListNum = null;


  /**
   * <h4>スライド要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Slider.p.length = null;


  /**
   * <h4>リキッド時のスライド要素の数</h4>
   *
   * @property length
   * @type {Number}
   */
  Slider.p.liquidLength = null;


 /**
   * <h4>スライド回数のmax値</h4>
   *
   * @property countMax
   * @type {Number}
   */
  Slider.p.countMax = null;


  /**
   * <h4>スライド移動するステップ数</h4>
   *
   * @property step
   * @type {Number}
   */
  Slider.p.step = null;


  /**
   * <h4>タイマーID</h4>
   *
   * @property timerId
   * @type {String}
   */
  Slider.p.timerId = null;


  /**
   * <h4>リキッドモード時に、クローン生成する数</h4>
   *
   * @property clone
   * @type {Number}
   */
  Slider.p.clone = 3;


  /**
   * !important 使用していません
   * スライドアニメーションフラグ
   *
   * @property isAnimate
   * @type {Boolean}
   */
  Slider.p.isAnimate = false;



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
   * @return {Slider}
   */
   Slider.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   *
   * @method init
   * @return {Slider}
   */
  Slider.p.init = function(){
    // 値設定
    this.setParam();

    // DOM生成
    this.createPointer();
    this.cloneElement();

    // スタイル設定
    this.setPosition();

    // イベント設定
    this.thumbNavi(this.param.$thumb);
    this.pointerNavi(this.param.$pointer.find('a'));
    this.prevNavi(this.param.$prev);
    this.nextNavi(this.param.$next);
    this.flickNavi();
    this.timerStart();
    this.resize();

    return this;
  };


  /**
   * <h4>パラメーターを設定します</h4>
   *
   * @method setParam
   * @return {Slider}
   */
  Slider.p.setParam = function(){
    var listWidth = this.param.$list.outerWidth(true); // リストの幅

    this.step         = this.param.current;
    this.length       = this.length || this.param.$list.length; // スライド素数
    this.liquidLength = this.length * this.clone; // リキッド時のスライド素数
    this.stageWidth   = this.param.$slide.parent().width(); // スライドエリア幅
    this.showListNum  = this.param.isLiquid ? 1 : Math.floor(this.stageWidth / listWidth); // 表示数(リキッド時は1)
    this.distance     = this.showListNum * listWidth; // スライド距離
    this.countMax     = Math.ceil(this.length / this.showListNum); // スライドカウント最大数

    // 高さはいるのか？

    return this;
  };


  /* CreateElements
  -----------------------------------------------------------------*/

  /**
   * <h4>ポインター要素があればをポインターを生成します</h4>
   *
   * @method createPointer
   * @return {Slider}
   */
  Slider.p.createPointer = function(){
    if(this.param.$pointer[0]){
      var frag = document.createDocumentFragment(),
      el = this.param.$pointer[0],
      i = 0,
      $el;

      for(; i < this.countMax; i += 1){
        frag.appendChild(el.cloneNode(true));
      }

      $el = $(frag).children();
      this.param.$pointer.replaceWith($el);
      this.param.$pointer = $el;
    }

    return this;
  };


  /**
   * <h4>リキッド時、スライド要素をクローンします</h4>
   *
   * @method cloneElement
   * @return {Slider}
   */
  Slider.p.cloneElement = function(){
    var param = this.param;

    if(param.isLiquid && this.liquidLength !== param.$list.length){
      var copy = param.$slide.html(),
      print = '',
      i = 0;

      for(; i < this.clone; i += 1){
        print += copy;
      }

      param.$list = param.$slide.html(print).children();
    }

    return this;
  };


  /* Navigations
  -----------------------------------------------------------------*/

  /**
   * <h4>pointerナビゲーションイベントの実装</h4>
   *
   * @method pointerNavi
   * @param {jQuery} $target pager要素
   * @return {Slider}
   */
  Slider.p.pointerNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      self.controller($target.index(this));
      return false;
    });

    return this;
  };


  /**
   * <h4>サムネイルナビゲーションイベントの実装</h4>
   *
   * @method thumbNavi
   * @param {jQuery} $target pager要素
   * @return {Slider}
   */
  Slider.p.thumbNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      var current = Math.floor($target.index(this) / self.showListNum);
      self.controller(current);
      return false;
    });

    return this;
  };


  /**
   * <h4>戻るボタンイベントの実装</h4>
   *
   * @method prevNavi
   * @param {jQuery} $target 戻るボタン要素
   * @return {Slider}
   */
  Slider.p.prevNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
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
   * @return {Slider}
   */
  Slider.p.nextNavi = function($target){
    var self = this;

    $target.on('click.Slider', function(){
      self.next();
      return false;
    });

    return this;
  };


  /**
   * <h4>フリックナビゲーション</h4>
   *
   * @method flickNavi
   * @return {Slider}
   */
  Slider.p.flickNavi = function(){
    var self = this,
    isClick = true,
    isFlick = self.param.isFlick;

    self.param.$slide.hammer()
      // touchmove
      .on('pan', function(event){
        if(!isFlick) return false;

        var x = Number(event.gesture.deltaX);

        if(10 < Math.abs(x)){
          isClick = false;
          self.timerStop();
          self.flickMove(x);
        }
      })
      // touchend
      .on('panend', function(event){
        if(!isFlick) return false;

        var x = Number(event.gesture.deltaX),
        hit = self.param.flickHit;

        if(hit < x){
          self.prev();

        } else if((hit * -1) > x){
          self.next();

        } else {
          // 元の位置に戻す
          self.controller(self.param.current);
        }
        setTimeout(function(){
          isClick = true;
        }, 50);
      })
      // click キャンセル・有効の判定処理
      .find('a').on('click', function(){
        return isClick;
      });

    return this;
  };


  /**
   * <h4>フリックモードのON・OFFの切り替え</h4>
   *
   * @method flickMode
   * @param {Boolean} isMode フリックONは、true
   * @return {Slider}
   */
  Slider.p.flickMode = function(isMode){
    this.param.isFlick = !!isMode;
    return this;
  };


  /**
   * <h4>タイマースタート</h4>
   *
   * @method timerStart
   * @param  {Number} timer タイマーを時間をセットします。省略可
   * @return {Slider}
   */
  Slider.p.timerStart = function(timer){
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
   * @return {Slider}
   */
  Slider.p.timerStop = function(){
    clearTimeout(this.timerId);
    return this;
  };


  /**
   * !important 実装中
   * <h4>リサイズ時のイベント</h4>
   *
   * @method resize
   * @return {Slider}
   */
  Slider.p.resize = function(){
    var self = this;

    $(root).on('resize.Slider', function(){
      self.setParam();
      self.setPosition();
    });

    return this;
  };


  /* Controllers
  -----------------------------------------------------------------*/

  /**
   * <h4>前に戻るります</h4>
   *
   * @method prev
   * @return {Slider}
   */
  Slider.p.prev = function(){
    var current = 0 < this.param.current ? this.param.current : this.countMax;
    this.controller(current - 1);
    return this;
  };


  /**
   * <h4>次へ進みます</h4>
   *
   * @method next
   * @return {Slider}
   */
  Slider.p.next = function(){
    var next = this.param.current < this.countMax -1 ? this.param.current + 1 : 0;
    this.controller(next);
    return this;
  };


  /**
   * <h4>スライダーを制御します</h4>
   * 値の更新、スタイルはここで決めています
   *
   * @method controller
   * @param  {Number} num スライドナンバー
   * @return {Slider}
   */
  Slider.p.controller = function(num){
    var param =  this.param,
    diff,
    current;

    this.timerStart();

    if(num < this.length){
      current = param.current;
      param.current = num;
      diff = param.current - current;
      this.step = Math.abs(diff) < this.countMax / 2 ? diff : 0 < diff ? diff - this.length : this.length + diff;

      this.tween();
    }

    return this;
  };


  /* Views
  -----------------------------------------------------------------*/
  /**
   * <h4>ナビゲーションのアクティブ化</h4>
   *
   * @method setActive
   * @return {Slider}
   */
  Slider.p.setActive = function(){
    var param = this.param,
    num = param.current * this.showListNum;

    // loopしない場合、$prev, $next表示・非表示する
    if(!param.loop){
      if(param.current === 0){
        param.$prev.css({display: 'none'});
        param.$next.css({display: 'block'});

      } else if(param.current === this.countMax -1){
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
      param.$thumb.removeClass(param.activeClass)
        .slice(num, num + this.showListNum).addClass(param.activeClass);
    }

    return this;
  };


  /* Tweens
  -----------------------------------------------------------------*/
  /**
   * <h4>left値の取得</h4>
   *
   * @method getOffsetX
   * @param {Number} num? 指定要素のセンター位置
   * @return {Number} 現在のleft値を返す
   */
  Slider.p.getOffsetX = function(num){
    var self = this,
    param = self.param,
    left;

    if(param.isLiquid){
      num = $.isNumeric(num) ? num : self.step;
      // 中央位置 = 要素の半分サイズ + 現在アクティブ要素の位置
      left = (self.stageWidth - self.distance) / 2 + (self.distance * (num + self.length)) * -1;
    } else {
      left = self.distance * param.current * -1;
    }

    return left;
  };


  /**
   * <h4>ポジションをセットします</h4>
   *
   * @method setPosition
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.setPosition = function(){
    var width = this.param.isLiquid ? this.distance * this.liquidLength : this.distance * this.length;
    this.setActive();
    return this.param.$slide.css({width: width, left: this.getOffsetX()});
  };


  /**
   * <h4>タッチした距離動かす</h4>
   *
   * @method flickMove
   * @param  {Number} x 動いた分の座標
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.flickMove = function(x){
    return this.param.$slide.css({left: this.getOffsetX() + x});
  };


  /**
   * <h4>スライドします</h4>
   *
   * @method tween
   * @return {jQuery} スライド要素を返す
   */
  Slider.p.tween = function(){
    var self = this;
    param = this.param;

    $.stream(
      function(){
        // スライド
        self.setActive();
        return param.$slide.stop(true, false).animate({left: self.getOffsetX()}, param.duration, param.ease);
      },
      function(){
        // リッキド時ポジションを初期位置に戻す
        if(self.param.isLiquid){
          return param.$slide.qCss({left: self.getOffsetX(0)}, function(){
            if(0 < self.step){
              param.$slide.append(param.$slide.children().slice(0, self.step));
            } else {
              param.$slide.prepend(param.$slide.children().slice(self.length + self.step));
            }
          });
        }
      }
    );
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Slider = Slider;


}(window, jQuery));
