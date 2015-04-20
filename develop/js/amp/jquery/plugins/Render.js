var AMP = AMP || {};


(function(root, $, Hogan){

  // 'use strict';


  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でデータ交換フォーマットを受け取りDOM生成します</h4>
   * 処理が完了したら、jQuery Deferred Objectを返します<br>
   * <b>Hogan.jsに依存します</b>
   *
   * @class AMP.Render
   * @constructor
   * @param  {jQuery} $template jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   */

  function Render($template, ajaxOptions){
    this.param.$template   = $template;
    this.param.template    = Hogan.compile($template.html());
    this.param.ajaxOptions = $.extend(true, {}, Render.ajaxOptions, ajaxOptions);
  }

  // 基底クラスを継承
  AMP.inherits(Render, AMP.BASE_CLASS);

  // prototype
  var p = Render.prototype;


  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>Renderインスタンスの生成</h4>
   * shorthand
   *
   * @static
   * @method render
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  Render.get = function($template, ajaxOptions){
    var inst = new Render($template, ajaxOptions);
    inst.start();
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
  Render.VERSION = '3.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Render';


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
   * <h4>パラメーター格納オブジェクト</h4>
   *
   * @default
   * defaults { <ul><li>
   *   $template   : null, {jQuery} js Template要素</li><li>
   *   $el         : null {jQuery} レンダリングエリアのラッパー要素</li><li>
   *   template    : null {Hogan} Hoganテンプレート</li><li>
   *   originalData: null {Object|Array} レンダーオリジナルデータ</li><li>
   *   renderData  : null {Object|Array} レンダーデータ</li><li>
   *   ajaxOptions : null {Object} Ajaxオプション値</li></ul>
   * }
   *
   * @property param
   * @type {Object}
   */
  p.param = {
    $template   : null,
    $el         : null,
    template    : null,
    originalData: null,
    renderData  : null,
    ajaxOptions : null
  };



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>初期化</h4>
   * 処理が完了したことを通知します
   *
   * @method start
   * @return {jQuery.Deferred}
   */
  p.start = function(){
    var self = this;

    // 縦列に処理します
    return $.stream(
      function(){
        return self.ajax();
      },
      function(){
        return self.setRenderData();
      },
      function(){
        return self.render();
      }
    );
  };


  /**
   * <h4>$.ajaxで、データを取得します</h4>
   *
   * @method getAjax
   * @return {jQuery.Deferred} 処理が、完了したことを通知します
   */
  p.ajax = function(){
    var self = this;

    return $.ajax(self.param.ajaxOptions)
    .fail(self.ajaxFail)
    .done(function(data){
      self.param.originalData = data;
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
  p.ajaxDone = function(){};


  /**
   * <h4>ajax通信失敗時、呼び出されます</h4>
   * 再度ページを読み込み直すか？
   *
   * @method ajaxFail
   * @return {Render}
   */
  p.ajaxFail = function(xhr, status, error){
    if(AMP.isDevelop){
      console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);
    }
    if(root.confirm('データの取得に失敗しました。\n再度、ページを読み込み直しますか？')){
      location.reload();
    }
    return this;
  };


  /**
   * <h4>Hoganに流し込む、データを生成して、tmplDataに格納します</h4>
   *
   * @method setRenderData
   * @param {Object} data JSTに流し込むデータ
   * @return {Render}
   */
  p.setRenderData = function(renderData){
    if(renderData){
      this.param.renderData = renderData;
    } else {
      if(AMP.isArray(this.param.originalData)){
        this.param.renderData = this.param.originalData.concat();

      } else {
        this.param.renderData = $.extend({}, this.param.originalData);
      }
    }

    return this;
  };


  /**
   * <h4>レンダーデータのフィルタリングの際使用します</h4>
   *
   * @method filtter
   * @return {Object}
   */
  p.filtter = function(data){
    return data;
  };


  /**
   * <h4>レンダリングされている場合、データを削除します</h4>
   * レンダリングされていない場合は、レンダーエリアをラップする要素を生成します
   *
   * @method removePrevHTML
   * @return {Render}
   */
  p.removePrevHTML = function(){
    if(!this.param.$el){
      this.param.$template.wrapAll('<div class="js_render" />');
      this.param.$el = this.param.$template.parent();
    } else {
      this.$el.children().remove();
    }
    return this;
  };


  /**
   * <h4>生成するHTMLデータがない場合呼び出されます</h4>
   *
   * @default '<p class="not_found">データを取得できませんでした。</p>'
   * @method notFound
   * @return {String}
   */
  p.notFound = function(){
    return '<p class="not_found">データを取得できませんでした。</p>';
  };


  /**
   * <h4>レンダリングするHTMLを生成します</h4>
   *
   * @method createHTML
   * @param  {Object|Array} data レンダリングデータ
   * @return {DOM}
   */
  p.createHTML = function(data){
    this.setRenderData(data);
    return this.param.template.render(this.param.renderData) || this.notFound();
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   *
   * @method render
   * @return {Render}
   */
  p.render = function(data){
    this.removePrevHTML();
    this.param.$el[0].innerHTML = this.createHTML(data);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Render = Render;
  AMP.render = Render.get;



}(window, jQuery, Hogan));
