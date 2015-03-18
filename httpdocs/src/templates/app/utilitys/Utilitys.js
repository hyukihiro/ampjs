/**
 * AMP.JS JavaScript Library
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


(function(root){

  // 'use strict';

  // public
  var p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>有用クラス</h4>
   * スニペット的なコードは、ここで管理します
   *
   * @constructor
   * @class Utilitys
   * @return {Utilitys}
   */
  function Utilitys(){};



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
  Utilitys.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Utilitys.prototype;


  /**
   * <h4>クラスネーム</h4>
   *
   * @property name
   * @type {Object}
   */
  p.name = 'Utilitys';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Utilitys name=' + this.name + ']';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.app = root.app || {};
  root.app.Utilitys = Utilitys;
  root.app.utilitys = new Utilitys();


}(window));
