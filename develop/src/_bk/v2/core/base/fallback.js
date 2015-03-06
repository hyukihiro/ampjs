(function (root, amp) {

  // 'use strict';


  /*======================================================================
    ブラウザ対応していない機能をフォールバックします
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * forEach
   * 配列の各要素に対して、指定された処理を実行します
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @static
   * @method Array.forEach
   * @type {Void}
   */
  Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }
    var i = 0, l = this.length;
    for (; i < l; i += 1) {
      callback.call(context || null, this[i], i, this);
    }
  };


  /**
   * 連想配列の要素数取得
   * Object.keys未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @method Object.keys
   * @param  {Object} obj
   * @return {Void}
   */
  Object.keys = Object.keys || function (obj) {
    if (amp.isObject(obj)) {
      var size = 0,
      prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop) && prop !== 'length') {
          size += 1;
        }
      }
      obj.length = size;
    }
  };


}(window));
