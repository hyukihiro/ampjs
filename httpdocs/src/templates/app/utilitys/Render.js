/**
 * AMP JavaScript Library
 *
 * Author: Yoshihito Fujiwara
 * Source: https://bitbucket.org/cutupworks/ampjs
 *
 * @licence MIT Licence
 *
 * Copyright (c) 2015 Yoshihito Fujiwara
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


(function(root, $, Hogan){

  // 'use strict';

  // public
  var p;



  /*--------------------------------------------------------------------------
    SAMPLE
  --------------------------------------------------------------------------*/
  /* 余計な文字列が入らないように、つめつめで。
  <script type="text/template" id="JST_Sample">{{#item}}
  <p><a href="detail/{{id}}.html"><span class="no">{{id}}</span></a></p>
  {{/item}}</script>
  */



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>有用クラス</h4>
   * Hogan(MactacheペースのJSTプラグイン)に依存します
   *
   * @constructor
   * @class Render
   * @return {Render}
   */
  function Render($template){
    this.hogan = Hogan.compile($template.html());
    this.$template = $template;
    this.$wrap = this.$template.wrapAll('<div class="_jst_wrap" />');
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
  Render.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Render.prototype;


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {Object}
   */
  p.name = 'Render';


  /**
   * <h4>JSTemplate要素</h4>
   *
   * @property $tmpl
   * @type {jQuery}
   */
  p.$template = null;


  /**
   * <h4>レンダリングエリアをラップする要素</h4>
   * コンストラクタが呼び出されたときに、生成してラップします
   *
   * @property $wrap
   * @type {jQuery}
   */
  p.$wrap = null;


  /**
   * <h4>Hoganインスタンス</h4>
   * JSレンダリングエンジン
   *
   * @property jsRender
   * @type {Hogan}
   */
  p.hogan = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>レンダリングします</h4>
   *
   * @method render
   * @param  {Object} data レンダリングデータ
   * @return {Render}
   */
  p.render = function(data) {
    // メモリリーク回避為、一旦remove
    this.$wrap.children().remove();
    this.$wrap[0].innerHTML = this.hogan.render(data) || this.notFound();
    return this;
  };


  /**
   * <h4>レンダリングする要素がない情報を記載したHTMLを返します</h4>
   *
   * @method notFound
   * @return {String} '<p class="not-found">該当するデータはありません</p>'
   */
  p.notFound = function() {
    return '<p class="not-found">該当するデータはありません</p>';
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Render name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.app = root.app || {};
  root.app.Render = Render;



}(window, jQuery, Hogan));
