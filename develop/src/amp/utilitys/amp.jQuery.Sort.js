;(function(root, $){

  // 'use strict';



  /*--------------------------------------------------------------------------
     @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>ソート</h4>
   * Renderクラスと組み合わせて使います
   *
   * @class Sort
   * @constructor
   * @param  {jQuery} トリガーa要素 hrefにフィルター値(先頭に#付けた)をセットする
   * @param  {Render} render レンダーインスタンス
   * @return {Sort}
   */
  var Sort = function($trigger, render){
    this.$trigger = $trigger;
    this.render = render;
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
  Sort.VERSION = '1.6';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Sort.p = Sort.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  Sort.p._isInit = false;


  /**
   * <h4>トリガーa要素</h4>
   * href値に先頭に#付けた検索キーを与えてください
   *
   * @property $trigger
   * @type {jQuery}
   */
  Sort.p.$trigger = null;


  /**
   * <h4>amp Render Sortを格納します</h4>
   *
   * @property $render
   * @type {amp Render Sort}
   */
  Sort.p.render = null;


  /**
   * <h4>現在のフィルター値</h4>
   * トリガーのhref値（ハッシュを省いた値）が格納されます<br>
   * all値はフィルタリング処理を行いません
   *
   * @property current
   * @default 'all'
   * @type {String}
   */
  Sort.p.current = 'all';


  /**
   * <h4>トリガーのアクティブ時のクラス名</h4>
   *
   * @property activeClass
   * @default 'active'
   * @type {String}
   */
  Sort.p.activeClass = 'active';


  /**
   * <h4>アニメーションの状態を管理するフラグ</h4>
   *
   * @property isAnimate
   * @default false
   * @type {Boolean}
   */
  Sort.p.isAnimate = false;



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
   * @return {Sort}
   */
  Sort.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {Sort}
   */
  Sort.p.init = function(){
    if(!this._isInit){
      this._isInit = true;
      this.active();
      this.setTrigger(this.$trigger);
    }
    return this;
  };


  /**
   * <h4>トリガー要素のイベント登録</h4>
   *
   * @method setTrigger
   * @return {Sort}
   */
  Sort.p.setTrigger = function($trigger){
    var self = this;

    $trigger.on('click.Sort', function(){
      self.controller($(this).attr('href'));
      return false;
    });

    return this;
  };


  /**
   * <h4>処理のコントロール</h4>
   * ここでパラメータの変更を行います
   *
   * @method controller
   * @param  {String} current フィルター値
   * @return {jQuery.Deferred} 処理が完了したことを通知します
   */
  Sort.p.controller = function(current){
    var self = this;
    current = current.replace(/#/, '');

    if(this.current === current || this.isAnimate){
      return $.stream();
    }

    // 縦列処理します
    return $.stream(
      function(){
        // 検索結果を設定
        self.isAnimate = true;
        self.current = current;
        self.active();
        self.render.createTemplate(self.findItem(self.current));
      },
      function(){
        // 現在表示している要素を消す
        return self.hide();
      },
      function(){
        // DOMを入れ替え
        return self.resetHTML();
      },
      function(){
        // 追加した要素を表示
        return self.show();
      },
      function(){
        // 待機状態に戻す
        self.isAnimate = false;
      }
    );
  };


  /**
   * <h4>ナビゲーションのアクティブ</h4>
   *
   * @method active
   * @return {Sort}
   */
  Sort.p.active = function(){
    var self = this;
    self.$trigger.removeClass(self.activeClass).each(function(){
      if($(this).attr('href') === '#' + self.current){
        $(this).addClass(self.activeClass);
        return false;
      }
    });

    return this;
  };


  /**
   * <h4>検索処理</h4>
   *
   * @method findItem
   * @param  {String} current フィルター値
   * @return {Array | String} 検索結果（配列）を返す。見つからない場合は、notFoundを返す。
   */
  Sort.p.findItem = function(current){
    var self = this,
    sort = {};

    if(current === 'all'){
      sort = self.render.data;
    } else {
      sort = _.filter(self.render.data, function(list){
        return list === current;
      });
    }

    return sort;
  };


  /**
   * <h4>検索結果が無い場合、文字列を返す</h4>
   *
   * @method notFound
   * @return {DOM} '<p class="not-found">検索結果は0件です。</p>'
   */
  Sort.p.notFound = function(){
    return '<p class="not-found">検索結果は0件です。</p>';
  };


  /**
   * <h4>HTMLの入れ替え</h4>
   *
   * @method resetHTML
   * @return {jQuery} 新しくセットしたDOM
   */
  Sort.p.resetHTML = function(){
    var self = this,
    $el;

    if(typeof self.render.tmplData === 'string'){
      $el = $(self.notFound());
    } else {
      $el = $(self.render.tmpl.render(self.render.tmplData));
    }

    self.render.$el.replaceWith($el.css({opacity: 0}));
    self.render.$el = $el;
    return self.render.$el;
  };


  /**
   * <h4>現在表示の要素を消す</h4>
   *
   * @method hide
   * @return {jQuery} 要素が非表示になったことを通知します
   */
  Sort.p.hide = function(){
    return this.render.$el.stop(true, false).animate({opacity: 0});
  };


  /**
   * <h4>新しくセットされた要素の表示</h4>
   *
   * @method show
   * @return {jQuery} 要素が表示されたことを通知します
   */
  Sort.p.show = function(){
    return this.render.$el.stop(true, false).animate({opacity: 1});
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Sort.p.toString = function(){
    return '[object Sort]';
  };


  /**
   * <h4>ソート</h4>
   * ソートショートハンド
   *
   * @method create
   * @param  {jQuery} トリガーa要素 hrefにフィルター値(先頭に#付けた)をセットする
   * @param  {Render Instance} render レンダーインスタンス
   * @return {Sort} Sortインスタンスを返す
   */
  Sort.create = function($trigger, render){
    var sort = new Sort($trigger, render);
    sort.init();
    return sort;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Sort = Sort;


}(window, jQuery));
