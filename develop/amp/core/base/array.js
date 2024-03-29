/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    配列
  ======================================================================*/

  /**
   * <h4>配列</h4>
   * <p><a href="../../demo/AMP.Base.html#array">DEMO</a></p>
   *
   * @class AMP.Array
   */


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>イテレート処理</h4>
   *
   * @static
   * @method each
   * @param  {Array|Object}   obj イテレーションを行うオブジェクト
   * @param  {Function} callback  イテレーション毎のコールバック関数
   * @return {Object} 第一引数に渡されたオブジェクト
   */
	AMP.each = function(obj, callback){
		var isContinue,
		i;

		if(AMP.isArray(obj)){
			var l = obj.length;
			i = 0;
			for(; i < l; i += 1){
				isContinue = callback.call(obj[i], obj[i], i);
				if(isContinue === false){
					break;
				}
			}

		} else {
			for(i in obj){
				isContinue = callback.call(obj[i], obj[i], i);
				if(isContinue === false){
					break;
				}
			}
		}

		return obj;
	};


  /**
   * <h4>argumentsを配列に変換</h4>
   * <p>スライス位置を指定して切り取り可能</p>
   *
   * @static
   * @method argsToArray
   * @param {arguments} args arguments
   * @param {Number} index スライスする切り取り開始位置
   * @param {Number} lastIndex スライスする切り取り終了位置
   * @type {Array}
   */
  AMP.argsToArray = (function(){
  	var slice = Array.prototype.slice;

  	return function(args, index, lastIndex){
  		index = index || 0;
  		lastIndex = lastIndex || args.length;
  		return slice.call(args, index, lastIndex);
  	};
  }());


  /**
   * <h4>配列をシャッフルして新しい配列を返す</h4>
   *
   * @method shuffle
   * @param  {Arrary} ary シャッフルする配列
   * @return {Arrary}
   */
  AMP.shuffle = function(ary){
    return ary.slice().sort(function(){
      return Math.random() - 0.5;
    });
  };


}(window, AMP));
