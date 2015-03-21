(function(root){

  // 'use strict';


  /*======================================================================
    ブラウザ対応していない機能をフォールバックします
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>forEach</h4>
   * 配列の各要素に対して、指定された処理を実行します
   * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @static
   * @method Array.forEach
   * @type {Void}
   */
  Array.prototype.forEach = Array.prototype.forEach || function(callback, context){
    if(this === null){
      throw new TypeError('this is null or not defined');
    }
    var i = 0, l = this.length;
    for(; i < l; i += 1){
      callback.call(context || null, this[i], i, this);
    }
  };


  /**
   * <h4>連想配列の要素数取得</h4>
   * Object.keys未実装のブラウザに、フォールバックして処理を追加しています
   *
   * @method Object.keys
   * @param  {Object} obj
   * @return {Void}
   */
  Object.keys =  Object.keys || function(obj){
    if(AMP.isObject(obj)){
      var placeHolder = {
        length: 0
      },
      prop;

      for(prop in obj){
        if(obj.hasOwnProperty(prop)){
          placeHolder.length += 1;
        }
      }
      return placeHolder;
    }
  };



}(window));
