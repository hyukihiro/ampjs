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


;(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>配列を操作します</h4>
   *
   * @class Iterator
   * @constructor
   * @param {Array} list 配列
   * @param {Boolean} isLoop ループ処理の有無
   * @return {Iterator}
   */
  var Iterator = function(list, isLoop){
    this.list = list;
    this.isLoop = isLoop ? true : false;
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
  Iterator.VERSION = '1.3';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  Iterator.p = Iterator.prototype;


  /**
   * <h4>イテレートする配列</h4>
   *
   * @property list
   * @type {Array}
   */
  Iterator.p.list = null;


  /**
   * <h4>現在の位置</h4>
   *
   * @property count
   * @default 0
   * @type {Number}
   */
  Iterator.p.count = 0;


  /**
   * <h4>配列をループさせるか</h4>
   *
   * @property isLoop
   * @default false
   * @type {Boolean}
   */
  Iterator.p.isLoop = false;



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
   * @return {Iterator}
   */
  Iterator.extend = root.amp._extend;


  /**
   * <h4>次の位置へ</h4>
   *
   * @method next
   * @return {Iterator}
   */
  Iterator.p.next = function(){
    if(this.count !== this.list.length - 1){
      this.count += 1;
    } else if(this.isLoop){
      this.count = 0;
    }
    return this;
  };


  /**
   * <h4>前の位置へ</h4>
   *
   * @method prev
   * @return {Iterator}
   */
  Iterator.p.prev = function(){
    if(this.count !== 0){
      this.count -= 1;
    } else if(this.isLoop){
      this.count = this.list.length - 1;
    }
    return this;
  };


  /**
   * <h4>先頭へ</h4>
   *
   * @method first
   * @return {Iterator}
   */
  Iterator.p.first = function(){
    this.count = 0;
    return this;
  };


  /**
   * <h4>最後へ</h4>
   *
   * @method last
   * @return {Iterator}
   */
  Iterator.p.last = function(){
    this.count = this.list.length - 1;
    return this;
  };


  /**
   * <h4>指定位置まで移動</h4>
   *
   * @method setCount
   * @param {Number} num 指定位置
   * @return {Iterator}
   */
  Iterator.p.setCount = function(num){
    if(-1 < num && num < this.list.length){
      this.count = num;
    } else {
      this.count = num < 0 ? 0 : this.list.length - 1;
    }
    return this;
  };


  /**
   * <h4>次の位置があるか</h4>
   * Loop時は常にtrue
   *
   * @method hasNext
   * @return {Boolean}
   */
  Iterator.p.hasNext = function(){
    return this.isLoop ? true : this.count < this.list.length -1;
  };


  /**
   * <h4>前の位置があるか</h4>
   * Loop時は常にtrue
   *
   * @method hasPrev
   * @return {Boolean}
   */
  Iterator.p.hasPrev = function(){
    return this.isLoop ? true : this.count !== 0;
  };


  /**
   * <h4>現在地を返す</h4>
   *
   * @method getCount
   * @return {Number}
   */
  Iterator.p.getCount = function(){
    return this.count;
  };


  /**
   * <h4>listの長さを返す</h4>
   *
   * @method getLength
   * @return {Number}
   */
  Iterator.p.getLength = function(){
    return this.list.length;
  };


  /**
   * <h4>現在の値を返す</h4>
   *
   * @method getValue
   * @return {Any}
   */
  Iterator.p.getValue = function(){
    return this.list[this.count];
  };


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  Iterator.p.toString = function(){
    return '[object Iterator]';
  };




  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Iterator = Iterator;


}(window));
