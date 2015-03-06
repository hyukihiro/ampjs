(function (root, AMP) {

  // 'use strict';


  /*======================================================================
    配列処理
  ======================================================================*/



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * each処理を行います
   *
   * @method each
   * @param  {Object}   obj      イテレーションを行うオブジェクト
   * @param  {Function} callback イテレーション毎のコールバック関数
   * @return {Object} 第一引数に渡されたオブジェクト
   */
  AMP.each = function (obj, callback) {
    var isContinue,
    i;

    if (AMP.isArray(obj)) {
      var l = obj.length;
      i = 0;
      for (; i < l; i += 1) {
        isContinue = callback.call(obj[i], obj[i], i);
        if (isContinue === false) {
          break;
        }
      }

    } else {
      for (i in obj) {
        isContinue = callback.call(obj[i], obj[i], i);
        if (isContinue === false) {
          break;
        }
      }
    }

    return obj;
  };


	/*
	matchArray(array, args or list){
	};
	*/


	/*
	diffArray(array, args or list){
	}
	*/

}(window, AMP || {}));