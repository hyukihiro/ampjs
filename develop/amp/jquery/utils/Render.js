/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP, $, Hogan){

  // 'use strict';


  if(!Hogan){
    throw new Error('Hogan is not found');
  }



  /*--------------------------------------------------------------------------
    @constructor
  --------------------------------------------------------------------------*/

  /**
   * <h4>Ajax通信でJSONを受け取りDOM生成します</h4>
   * <p>処理が完了したら、jQuery Deferred Objectを返します<br>
   * <em>Hogan.jsに依存します</em><br>
   * <a href="../../demo/AMP.$.Render.html">DEMO</a></p>
   *
   * @class AMP.$.Render
   * @extends AMP.BASE_CLASS
   * @constructor
   * @param  {jQuery} $tmp jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   */
  function Render($tmp, ajaxOptions){

    /**
     * <h4>プロパティオブジェクト</h4>
     * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します</p>
     *
     * @property props
     * @type {Object}
     */
    /**
     * <h4>js Template要素</h4>
     *
     * @property props.$tmp
     * @type {jQuery}
     */
    /**
     * <h4>レンダリングエリアのラッパー要素</h4>
     *
     * 初回renderが呼び出されると、自動的にレンダリングエリアを囲う要素を生成します<br>
     * これは、jQueryでDOMを再構築するより、innerHTMLで再構築した方がパフォーマンスがいい為です
     *
     * @property props.$el
     * @type {Hogan}
     */
    /**
     * <h4>Hoganテンプレート</h4>
     *
     * @property props.template
     * @type {Hogan}
     */
    /**
     * <h4>レンダリングオリジナルデータ保管</h4>
     *
     * @property props.originalData
     * @type {Arrary|Object}
     */
    /**
     * <h4>レンダリングデータ</h4>
     *
     * @property props.renderData
     * @type {Arrary|Object}
     */
    /**
     * <h4>$.ajaxオプション値</h4>
     * Render.ajaxOptionsとajaxOptionsをmixinした値を格納します
     *
     * @property props.ajaxOptions
     * @type {Object}
     */
    this.props = {
      $tmp        : $tmp,
      $el         : null,
      template    : Hogan.compile($tmp.html()),
      originalData: null,
      renderData  : null,
      ajaxOptions : $.extend(true, {}, Render.ajaxOptions, ajaxOptions)
    };
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
   *
   * @static
   * @method render
   * @param  {jQuery} $tepl jsTemplate要素
   * @param  {Object} ajaxOptions $.ajax options
   * @return {Render}
   */
  Render.get = function($tmp, ajaxOptions){
    var instance = new Render($tmp, ajaxOptions);
    instance.start();
    return instance;
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
  Render.VERSION = '3.1.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Render';


  /**
   * <h4>デフォルト値オブジェクト</h4>
   * <p>コンストラクタが呼び出し時に、引数とoptionsをmixinしてpropsオブジェクトに格納します<br>
   * <a href="http://api.jquery.com/jquery.ajax/" target="_blank">jQuery Ajax API</a></p>
   *
   * @static
   * @property ajaxOptions
   * @type {Object}
   */
  /**
   * <h4>リクエストURL</h4>
   *
   * @property ajaxOptions.url
   * @type {String}
   */
  /**
   * <h4>キャッシュの有効化</h4>
   *
   * @property ajaxOptions.chace
   * @default false
   * @type {String}
   */
  /**
   * <h4>取得するデータタイプ</h4>
   *
   * @property ajaxOptions.dataType
   * @default json
   * @type {String}
   */
  Render.ajaxOptions = {
    url     : null,
    chace   : false,
    dataType: 'json'
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

    return $.ajax(self.props.ajaxOptions)
    .fail(self.ajaxFail)
    .done(function(data){
      self.props.originalData = data;
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
    // console.log('xhr:' + xhr + '\nstatus: ' + status + '\nerror: ' + error);

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
      this.props.renderData = renderData;
    } else {
      if(AMP.isArray(this.props.originalData)){
        this.props.renderData = this.props.originalData.concat();

      } else {
        this.props.renderData = $.extend({}, this.props.originalData);
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
    if(!this.props.$el){
      this.props.$tmp.wrapAll('<div class="js_render" />');
      this.props.$el = this.props.$tmp.parent();
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
    return this.props.template.render(this.props.renderData) || this.notFound();
  };


  /**
   * <h4>DOM生成して、HTMLに挿入します</h4>
   *
   * @method render
   * @return {Render}
   */
  p.render = function(data){
    this.removePrevHTML();
    this.props.$el[0].innerHTML = this.createHTML(data);
    return this;
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.$.Render = Render;


}(window, AMP, jQuery, Hogan));
