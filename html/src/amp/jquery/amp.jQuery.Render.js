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


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>Hogan.jsに依存します</b>
   *
   * @class Render
   * @constructor
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  var Render = function($tmpl, ajaxOptions){
    this.$tmpl = $tmpl;
    this.tmpl  = Hogan.compile($tmpl.html());
    this.ajaxOptions = $.extend(true, {}, Render.ajaxOptions, ajaxOptions);

    // コンテキスト固定
    _.bindAll(this, 'getData', 'createTemplate', 'render');
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
  Render.VERSION = '1.7';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Render.p = Render.prototype;


  /**
   * <h4>initで初期化したか</h4>
   *
   * @private
   * @property _isInit
   * @type {Boolean}
   */
  Render.p._isInit = false;


  /**
   * <h4>JSTemplate要素</h4>
   *
   * @property $tmpl
   * @type {jQuery}
   */
  Render.p.$tmpl = null;


  /**
   * <h4>$tmplをHogan.jsでコンパイルしたデータ</h4>
   *
   * @property tmpl
   * @type {Object}
   */
  Render.p.tmpl = null;


  /**
   * <h4>$.ajaxのoption値</h4>
   * コンストラクタが呼び出されたときに、第二引数で指定したoptionsをmixinします<br>
   * jQuery Ajax API: http://api.jquery.com/jquery.ajax/<br>
   * ajaxOptions: { <ul><li>
   *   url     : null, {String} リクエストURL</li><li>
   *   chace   : false, {Boolean} キャッシュの有効</li><li>
   *   dataType: 'json' {String} データタイプ</li></ul>
   * }
   *
   * @static
   * @property ajaxOptions
   * @type {Object}
   */
  Render.ajaxOptions = {
    url     : null,
    chace   : false,
    dataType: 'json'
  };


  /**
   * <h4>$.ajaxで取得したデータ</h4>
   *
   * @property data
   * @type {Object}
   */
  Render.p.data = null;


  /**
   * <h4>jsTemplate要素に流し込むデータ</h4>
   *
   * @property tmplData
   * @type {Object}
   */
  Render.p.tmplData = null;


  /**
   * <h4>DOM生成したあと、挿入された要素</h4>
   *
   * @property $el
   * @type {jQuery}
   */
  Render.p.$el = null;



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
   * @return {Render}
   */
   Render.extend = root.amp._extend;


  /**
   * <h4>初期化</h4>
   * シングルトンパターン
   *
   * @method init
   * @return {jQuery.Deferred} 処理が完了したことを通知します
   */
  Render.p.init = function(){
    var self = this;

    if(!this._isInit){
      this._isInit = true;
      // 縦列に処理します
      return $.stream(
        self.getData,
        self.createTemplate,
        self.render
      );
    }
  };


  /**
   * <h4>$.ajaxで、データを取得します</h4>
   *
   * @method getData
   * @return {jQuery.Deferred} 処理が、完了したことを通知します
   */
  Render.p.getData = function(){
    var self = this;

    return $.ajax(self.ajaxOptions)
    .fail(self.ajaxFail)
    .done(function(data){
      self.data = data;
      self.ajaxDone(data);
    });
  };


  /**
   * <h4>ajax通信成功時、呼び出されます</h4>
   *
   * @method ajaxDone
   * @param {Object} data ajax通信の取得データ
   * @return {Render}
   */
  Render.p.ajaxDone = function(){
    return this;
  };


  /**
   * <h4>ajax通信失敗時、呼び出されます。再度ページを読み込み直すか？</h4>
   *
   * @method ajaxFail
   * @param {Object} xhr
   * @param {Object} status
   * @param {Object} error
   * @return {Render}
   */
  Render.p.ajaxFail = function(xhr, status, error){
    if(amp.isDevelop){
      console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
    if(root.confirm('データの取得に失敗しました。\n再度、ページを読み込み直しますか？')){
      location.reload();
    }
    return this;
  };


  /**
   * <h4>Hoganに流し込む、データを生成して、tmplDataに格納します</h4>
   * データ成型が必要な場合は、ここをExtendします
   *
   * @method createTemplate
   * @param {Object} data JSTに流し込むデータ
   * @return {Render}
   */
  Render.p.createTemplate = function(data){
    this.tmplData = data || this.data;
    return this;
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   * 文字列を返した場合、<p class="not-found" />を生成します。
   *
   * @method render
   * @return {Render}
   */
  Render.p.render = function(){
    this.$el = $(this.tmpl.render(this.tmplData));
    this.$tmpl.replaceWith(this.$el);
    return this;
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Render.p.toString = function(){
    return '[object Render]';
  };


  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * Renderのショートハンド
   *
   * @static
   * @method create
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render} Renderインスタンスを返す
   */
  Render.create = function($tmpl, ajaxOptions){
    var render = new Render($tmpl, ajaxOptions);
    render.init();
    return render;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.jQuery = root.amp.jQuery || {};
  root.amp.jQuery.Render = Render;


}(window, jQuery));
